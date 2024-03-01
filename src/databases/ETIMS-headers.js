import mongoose from "mongoose";

const etimsHeadersSchema = new mongoose.Schema({
  business: { type: mongoose.Types.ObjectId, ref: "Business" },
  cmcKey: { type: String },
  pin: { type: String },
  bhfId: { type: String },
  companyName: { type: String },
  createdAt: { type: Date },
});

const ETIMSheaders = mongoose.model("ETIMSheaders", etimsHeadersSchema);
export default ETIMSheaders;
