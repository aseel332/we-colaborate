import Task from "../models/Task.js";
import Branch from "../models/Branch.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
export const createTask = async (req, res) => {
  try {
    const { projectId, branchId } = req.params;
    const { title, description, assignedTo, dueDate, submissionType, attachments, priority, dueTime } = req.body;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    if (branch.projectId.toString() !== projectId) {
      return res.status(400).json({ message: "Branch does not belong to the specified project" });
    }
    if(!(branch.admin.toString() === req.userId) && !branch.leader.toString() === req.userId){
      return res.status(403).json({ message: "Only branch admin or leader can create tasks" });
    }

    const submissions = assignedTo ? assignedTo.map(userId => ({
      user: userId,
      submissionDate: null,
      submitted: false,
      file: null
    })) : [];
    console.log(submissions);

    const task = new Task({
      title,
      description: description || "No description provided",
      assignedTo: assignedTo || [],
      dueDate,
      status: "pending",
      branch: branchId,
      project: projectId,
      submissionType,
      attachments,
      priority,
      createdBy: req.userId,
      dueTime,
      submissions
    });
 
    
    const savedTask = await task.save();
    const conversation = new Conversation({
      messages: [{ sender: req.userId, content: "Task created", timestamp: Date.now() }],
      projectId: projectId,
      taskId: task._id,

    });
    await conversation.save();
    savedTask.conversation.push(conversation._id);
    await savedTask.save();
    // push task to branch tasks array
    
    const io = req.app.get("io");
    io.to(`branch_${branchId}`).emit("branch:newTask", savedTask);
    

    branch.tasks.push({_id: savedTask._id, title: savedTask.title});
    await branch.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  } 
}

export const loadTaskUserIn = async (req, res) => {
  try {
    const { projectId, branchId } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    if (branch.projectId.toString() !== projectId) {
      return res.status(400).json({ message: "Branch does not belong to the specified project" });
    }
    // if admin or leader of branch then return all tasks
    let tasks;
    console.log(branch.admin.toString(), branch.leader.toString(), req.userId);
    if(branch.admin.toString() === req.userId || branch.leader.toString() === req.userId){

      tasks = await Task.find({branch: branchId})
        .populate('assignedTo', 'name email img')
        .populate('createdBy', 'name email img')
        .select('-conversation -attachments -submission -submissionType -updatedAt -__v')
        .then(tasks => tasks)
        .catch(err => null);
    }
    else{
      // findding user id in assignedTo array
      tasks = await Task.find({branch: branchId, assignedTo: req.userId})
        .populate('assignedTo', 'name email img')
        .populate('createdBy', 'name email img')
        // removing conversation field from tasks
        .select('-conversation -attachments -submission -submissionType -updatedAt -__v')
        
        .then(tasks => tasks)
        .catch(err => null);
    }
    if (tasks === null) {
      return res.status(500).json({ message: "Error loading tasks" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    const task = await Task.findById(taskId)
      .populate('assignedTo', 'name email img')
      .populate('createdBy', 'name email img')
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const removeMemberFromTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { memberId } = req.body;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    task.assignedTo = task.assignedTo.filter(_id => _id.toString() !== memberId);
    console.log(task.assignedTo);
    await task.save();
    return res.status(200).json({ message: "Member removed from task" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const addMembersToTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { memberIds } = req.body; // array of user IDs
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // add only unique member IDs
    memberIds.forEach(memberId => {
      if (!task.assignedTo.includes(memberId)) {
        task.assignedTo.push(memberId);
      }
    });
    await task.save();
    return res.status(200).json({ message: "Members added to task", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const modifyTaskDetails = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, submissionType, attachments, priority, status } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (submissionType) task.submissionType = submissionType;
    if (attachments) task.attachments = attachments;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    task.updatedAt = Date.now();
    await task.save();
    return res.status(200).json({ message: "Task details updated", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}


export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await Task.findByIdAndDelete(taskId);
    // remove task from branch tasks array
    const branch = await Branch.findById(task.branch);
    if (branch) {
      branch.tasks = branch.tasks.filter(t => t._id.toString() !== taskId);
      await branch.save();
    }
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
