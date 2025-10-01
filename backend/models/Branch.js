import mongoose from "mongoose";
const { Schema } = mongoose;
const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  leader: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
  projectId: String,
  folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
  description: String,
}, { timestamps: true });

const Branch = mongoose.model("Branch", BranchSchema);
export default Branch;