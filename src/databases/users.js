import mongoose from "mongoose";

const superadminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    default: "Superadmin",
  },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const userSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  organization_id: { type: String },
  business_class: { type: String },
  business_segment: { type: String },
  business_family: { type: String },
  created_at: { type: Date },
});

const Superadmin = mongoose.model("Superadmin", superadminSchema);

const User = mongoose.model("User", userSchema);

export default { Superadmin, User };
