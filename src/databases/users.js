import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  isVerified: { type: Boolean, default: false },
  created_at: { type: Date },
});

const User = mongoose.model("User", userSchema);

export default { User };
