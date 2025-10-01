import Branch from "../models/Branch.js";
import File from "../models/File.js";
import supabase from "../supaBaseClient.js";
import Folder from "../models/Folder.js";
import Task from "../models/Task.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const file = req.file; // single file
    const { branchId, folderId, taskId } = req.params;

    if (!branchId || !file) {
      return res.status(400).json({ message: "Branch ID and file are required" });
    }

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Generate safe file name (timestamp + original name with underscores)
    const fileExt = file.originalname.split(".").pop();
    const safeName = file.originalname.replace(/\s+/g, "_");
    const fileName = `${Date.now()}_${safeName}`;

    // ✅ Place file inside branchFiles/{branchId}/
    const filePath = `branchFiles/${branchId}/${fileName}`;

    // Upload file buffer to Supabase
    const { error } = await supabase.storage
      .from("project-files") // bucket name
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ message: "Error uploading file" });
    }

    // Get public URL (works only if bucket is public)
    const { data: publicUrlData } = supabase
      .storage
      .from("project-files")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    // Save file metadata in MongoDB
    const newFile = new File({
      originalname: file.originalname,
      createdBy: req.userId,
      url: fileUrl,
      size: file.size,
      mimetype: file.mimetype,
      branchId,
    });

    await newFile.save();

    branch.files.push(newFile._id);
    await branch.save();

    res.status(200).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (err) {
    console.error("UploadFile Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const uploadFileToFolder = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const file = req.file; // single file
    const {  folderId } = req.params;
    if (!folderId || !file) {
      return res.status(400).json({ message: "Folder ID and file are required" });
    }
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    const fileExt = file.originalname.split(".").pop();
    const safeName = file.originalname.replace(/\s+/g, "_");
    const fileName = `${Date.now()}_${safeName}`; 
    const filePath = `folderFiles/${folder.branchId}/${fileName}`;
    const { error } = await supabase.storage
      .from("project-files") // bucket name
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });
    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ message: "Error uploading file" });
    }
    const { data: publicUrlData } = supabase
      .storage
      .from("project-files")
      .getPublicUrl(filePath);
    const fileUrl = publicUrlData.publicUrl;
    const newFile = new File({
      originalname: file.originalname,
      createdBy: req.userId,
      url: fileUrl,
      size: file.size,
      mimetype: file.mimetype,
      folderId,
    });

    await newFile.save();

    folder.files.push(newFile._id);
    await folder.save();

    res.status(200).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (err) {
    console.error("UploadFile Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const uploadFileToTask = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const file = req.file; // single file
    const { taskId } = req.params;
    if (!taskId || !file) {
      return res.status(400).json({ message: "Task ID and file are required" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const fileExt = file.originalname.split(".").pop();
    const safeName = file.originalname.replace(/\s+/g, "_");
    const fileName = `${Date.now()}_${safeName}`;
    const filePath = `taskFiles/${taskId}/${fileName}`;
    const { error } = await supabase.storage
      .from("project-files") // bucket name
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });
    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ message: "Error uploading file" });
    }
    const { data: publicUrlData } = supabase
      .storage
      .from("project-files")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    const newFile = new File({
      originalname: file.originalname,
      createdBy: req.userId,
      url: fileUrl,
      size: file.size,
      mimetype: file.mimetype,
      taskId: taskId,
    });

    await newFile.save();

    task.submission.push({
      submittedBy: req.userId,
      submissionDate: new Date(),
      content: fileUrl,
    });
    await task.save();

    res.status(200).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (err) {
    console.error("UploadFile Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getFilesByBranch = async (req, res) => {
  try {
    const { branchId, folderId, taskId } = req.params;
    if (!(branchId || folderId || taskId)) {
      return res.status(400).json({ message: "Branch ID, Folder ID and Task ID are required" });
    }
    let files = [];
    if(branchId) {
     files = await File.find({ branchId });
    }
    if(folderId) {
       files = await File.find({ folderId });
    }
    if(taskId) {
       files = await File.find({ taskId });
    }

    // Populate createdBy field with user details
    files = await File.populate(files, { path: "createdBy", select: "name email" });
 
    res.status(200).json(files);
  } catch (err) {
    console.error("GetFilesByBranch Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Creating folders in MongoDB 
export const createFolderInBranch = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { branchId } = req.params;
    const { folderName } = req.body;

    if (!branchId || !folderName) {
      return res.status(400).json({ message: "Branch ID and folder name are required" });
    }

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const folder = new Folder({
      name: folderName,
      createdBy: req.userId,
      branchId,
      createdAt: Date.now(),
      files: [],
      projectId: branch.projectId
    });

    await folder.save();

    branch.folders.push(folder._id);
    await branch.save();

    res.status(201).json({ message: "Folder created successfully", folder });
  } catch (err) {
    console.error("CreateFolderInBranch Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// load all teh folder inside a branch
export const getFoldersByBranch = async (req, res) => {
  try {
    const { branchId } = req.params;
    if (!branchId) {
      return res.status(400).json({ message: "Branch ID is required" });
    }

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    try {
      const folders = await Folder.find({ branchId });

      res.status(200).json(folders);
    } catch (err) {
      console.error("GetFoldersByBranch Error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    } 
  } catch (err) {
    console.error("GetFoldersByBranch Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};