import mongoose from "mongoose";

const companyUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: mongoose.Types.ObjectId, ref: "Company" },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  phone_number: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Normal_user"],
    default: "Normal_user",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Deleted"],
    default: "Active",
  },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const superadminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  phone_number: { type: String, required: true },
  role: {
    type: String,
    default: "Superadmin",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Deleted"],
    default: "Active",
  },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const userSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String },
  status: { type: String },
});

const Superadmin = mongoose.model("Superadmin", superadminSchema);
const CompanyUser = mongoose.model("CompanyUser", companyUserSchema);
const User = mongoose.model("User", userSchema);

export default { CompanyUser, Superadmin, User };
