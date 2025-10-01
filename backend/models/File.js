import { Schema } from "mongoose";
import mongoose from "mongoose";
// File schema definition
const FileSchema = new Schema({
  originalname: { type: String, required: true },
  folderId: { type: Schema.Types.ObjectId, ref: "Folder", required: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  branchId: { type: Schema.Types.ObjectId, ref: "Branch", default: null },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  taskId: { type: Schema.Types.ObjectId, ref: "Task", default: null },
}, { timestamps: true });

const File = mongoose.model("File", FileSchema);
export default File;
