import { Schema } from "mongoose";
import mongoose from "mongoose";

// Folder schema definition
const FolderSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  branchId: { type: Schema.Types.ObjectId, ref: "Branch", default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }], // Array of file IDs
});

const Folder = mongoose.model("Folder", FolderSchema);
export default Folder;