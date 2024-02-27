import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  organization: { type: mongoose.Types.ObjectId, ref: "Organization" },
  pin: { type: String },
  businessName: { type: String },
  businessType: { type: String },
  created_at: { type: Date },
});

const Business = mongoose.model("Business", businessSchema);
export default Business;
