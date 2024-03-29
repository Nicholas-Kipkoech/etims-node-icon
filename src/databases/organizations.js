import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  organization_name: { type: String, required: true },
  organization_type: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
