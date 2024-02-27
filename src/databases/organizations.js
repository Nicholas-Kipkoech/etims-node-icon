import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  organization_name: { type: String, required: true },
  organization_email: { type: String, required: true },
  organization_phone: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const organizationAPICredentials = new mongoose.Schema({
  organization: { type: mongoose.Types.ObjectId, ref: "Organization" },
  clientKey: { type: String, unique: true },
  created_at: { type: Date, default: Date.now() },
});

const etimsCredentials = new mongoose.Schema({
  organizationId: { type: String },
  pin: { type: String },
  branchId: { type: String },
  taxpayerName: { type: String },
  cmcKey: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const Organization = mongoose.model("Organization", organizationSchema);
const APICredentials = mongoose.model(
  "APICredentials",
  organizationAPICredentials
);
const ETIMSCredentials = mongoose.model("ETIMSCredentials", etimsCredentials);
export default { Organization, APICredentials, ETIMSCredentials };
