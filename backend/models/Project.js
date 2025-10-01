import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admin: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
  assets: [{ type: String }],
  img: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
  branches: [{ _id: { type: Schema.Types.ObjectId, ref: "Branch" }, name: String }],
  projectLink: String,
  adminLink: String,
  password: String,
  adminPassword: String,

}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
