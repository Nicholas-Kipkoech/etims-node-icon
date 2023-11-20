import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_code: { type: String, required: true },
  status: { type: String, required: false },
  logo_url: { type: String, required: false },
  company_email: { type: String, required: false },
  superadmin_email: { type: String, required: false },
  created_by: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

const Company = mongoose.model("Company", companySchema);
export default Company;
