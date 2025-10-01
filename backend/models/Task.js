import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dueDate: Date,
  dueTime: String,
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  conversation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conversation" }],
  createdAt: { type: Date, default: Date.now },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  submissionType: { type: String, enum: ["file", "link", "text"], default: "file" },
  attachments: [String], // Array of file URLs or paths
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  submissions: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    submissionDate: Date,
    submitted: Boolean,
    file: {type: mongoose.Schema.Types.ObjectId, ref: "File"}
  }],
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task