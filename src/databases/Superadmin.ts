import mongoose from "mongoose";

const superadminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "Superadmin" },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const Superadmin = mongoose.model("Superadmin", superadminSchema);
export default Superadmin;
