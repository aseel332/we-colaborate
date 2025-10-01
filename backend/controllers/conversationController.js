import { send } from "process";
import Conversation from "../models/Conversation.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const loadConversationByTaskId = async (req, res) => {
  try {
    const { projectId, branchId, taskId } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.branch.toString() !== branchId) {
      return res.status(400).json({ message: "Task does not belong to the specified branch" });
    }
    if (task.project.toString() !== projectId) {
      return res.status(400).json({ message: "Task does not belong to the specified project" });
    }
    // i
    const conversations = await Conversation.find({ taskId: taskId })
      .populate('messages.sender', 'name email img')

      .sort({ 'messages.timestamp': 1 });

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ message: "No conversations found for this task" });
    }

    // Return conversation as an object
    return res.status(200).json(conversations[0]);



  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addMessageToConversation = async (req, res) => {
  try {
    const {  taskId } = req.params;
    const { content } = req.body;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!content) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const conversation = await Conversation.findOne({ taskId: taskId });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    conversation.messages.push({
      sender: req.userId,
      content: content,
      timestamp: Date.now()
    });
    await conversation.save();

    // Finding user by req.userId
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const io = req.app.get("io");
    console.log("Emitting new message to room:", `conversation_${taskId}`);
    io.to(`conversation_${taskId}`).emit("chat:newMessage", {
      sender: {
        _id: req.userId,  
        name: user.name,
        email: user.email,
        img: user.img
      },
      content: content,
      timestamp: Date.now()
    });

    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const loadAllConversationsByBranchId = async (req, res) => {
  try {
    const { projectId, branchId } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const branchConversations = await Conversation.find({ branchId: branchId, projectId: projectId })
      .populate('messages.sender', 'name email img')
      .sort({ 'messages.timestamp': 1 });
    if (!branchConversations || branchConversations.length === 0) {
      return res.status(404).json({ message: "No conversations found for this branch" });
    }


    return res.status(200).json(branchConversations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addMessageToConversationInBranch = async (req, res) => {
  try {
    const { branchId, projectId } = req.params;
    const { content } = req.body;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!content ) {
      return res.status(400).json({ message: "Message content is required" });
    }
    let conversation = await Conversation.findOne({ branchId: branchId });
    if (!conversation) {
      // create new conversation if not found
      conversation = new Conversation({
        branchId: branchId,
        projectId: projectId,
        messages: []
      });
    }
    console.log("Adding message to branch conversation:", conversation);
    conversation.messages.push({
      sender: req.userId,
      content: content,
      timestamp: Date.now()
    });
    await conversation.save();

    // Finding user by req.userId
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Socket.io integration
    const io = req.app.get("io");
    console.log("Emitting new message to room:", `branch_conversation_${branchId}`);
    io.to(`branch_conversation_${branchId}`).emit("chat:newBranchMessage", {
      sender: {
        _id: req.userId,
        name: user.name,
        email: user.email,
        img: user.img
      },
      content: content,
      timestamp: Date.now()
    });
    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }

}