import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, min: 3, max: 20 },
  lastName: { type: String, required: true, trim: true, min: 3, max: 20 },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  email_confirmed: {
    type: Boolean,
    default: false
  },
  hash_password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profile_pic: { type: String },
  creation_date: { type: Date, default: Date.now },
});

export default mongoose.model("User", usersSchema);
