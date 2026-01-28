import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  empId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
});

export default model("User", UserSchema);
