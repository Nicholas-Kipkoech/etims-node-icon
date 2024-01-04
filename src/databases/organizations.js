import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  organization_name: { type: String, required: true },
  organization_email: { type: String, required: true },
  organization_phone: { type: String, required: true },
  business_segment: { type: String, required: true },
  business_family: { type: String, required: true },
  business_class: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;
