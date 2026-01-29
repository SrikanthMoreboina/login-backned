import mongoose, { Schema, model } from "mongoose";

const UserSchema = new mongoose.Schema({
  empId: { type: String, unique: true },
  name: String,
  designation: String,
  email: String,
  password: String,
  year: Number
});


export default model("User", UserSchema);
