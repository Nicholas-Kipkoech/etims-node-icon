import { Response, Request } from "express";
import Company from "../databases/companies";
import users from "../databases/users";

interface AuthenticatedRequest extends Request {
  user?: { email: string };
}

const createCompany = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      company_name,
      company_code,
      status,
      logo_url,
      company_email,
      superadmin_email,
    } = req.body;
    const { email, role }: any = req.user;
    if (role !== "Superadmin") {
      return res
        .status(403)
        .json({ error: "Only superadmin can create a company!!" });
    }
    const newCompany = new Company({
      company_name,
      company_code,
      status,
      logo_url,
      company_email,
      superadmin_email,
      created_by: email,
    });
    await newCompany.save();
    return res.status(200).json({ company: newCompany });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const fetchCompanys = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, role }: any = req.user;
    if (role !== "Superadmin") {
      return res
        .status(403)
        .json({ error: "Only superadmin can access this resource!!" });
    }
    const companies = await Company.find({ created_by: email });
    if (companies) {
      return res.status(200).json({ companies: companies });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const fetchCompanyUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, role }: any = req.user;

    if (role !== "Admin") {
      return res.status(403).json({
        error: "Only admin can access this resource!!",
      });
    }

    const admin = await users.CompanyUser.findOne({ email });

    if (!admin) {
      return res.status(403).json({
        error: "Admin not found!!",
      });
    }
    const companyId = admin.company;
    const companyUsers = await users.CompanyUser.find({ company: companyId });

    return res.status(200).json({ users: companyUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export default { createCompany, fetchCompanys, fetchCompanyUsers };
