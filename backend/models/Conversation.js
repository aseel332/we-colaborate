import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  
  }],
  projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
  taskId: {type: mongoose.Schema.Types.ObjectId, ref: "Task", required: false},
  branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: false},
  projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
});

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;