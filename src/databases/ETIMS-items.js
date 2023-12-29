import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema({
  segment_code: { type: String },
  segment_name: { type: String },
});

const familySchema = new mongoose.Schema({
  segment: { type: mongoose.Types.ObjectId, ref: "Segment" },
  family_code: { type: String },
  family_name: { type: String },
});
const classSchema = new mongoose.Schema({
  family: { type: mongoose.Types.ObjectId, ref: "Family" },
  class_code: { type: String },
  class_name: { type: String },
});

const comoditySchema = new mongoose.Schema({
  class: { type: mongoose.Types.ObjectId, ref: "Class" },
  comodity_code: { type: String },
  comodity_name: { type: String },
});

const Segment = mongoose.model("Segment", segmentSchema);
const Family = mongoose.model("Family", familySchema);
const Class = mongoose.model("Class", classSchema);
const Comodity = mongoose.model("Comodity", comoditySchema);

export default { Segment, Family, Class, Comodity };
