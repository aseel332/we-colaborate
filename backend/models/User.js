import mogoose, { Schema } from "mongoose";

const UserSchema = new mogoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
  tasks: { type: Array, default: [] },
  img: { type: String, default: "" }
}, { timestamps: true }); 

const User = mogoose.model("User", UserSchema);

export default User;