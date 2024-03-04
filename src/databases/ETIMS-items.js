import mongoose from "mongoose";

const itemsClsCodeSchema = new mongoose.Schema({
  itemClassCode: { type: String, unique: true },
  itemClassName: { type: String },
});

const ETIMSItems = mongoose.model("ETIMSItems", itemsClsCodeSchema);
export default ETIMSItems;
