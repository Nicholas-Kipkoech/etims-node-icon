import Company from "../databases/companies.js";
import users from "../databases/users.js";
import passHash from "../utils/passHash.js";
import { sendEmail } from "../utils/sendEmail.js";

const createCompany = async (req, res) => {
  try {
    const {
      company_name,
      company_code,
      status,
      logo_url,
      company_email,
      admins,
    } = req.body;
    const { email, role } = req.user;
    if (role !== "Superadmin") {
      return res
        .status(403)
        .json({ error: "Only superadmin can create a company!!" });
    }

    // Check if any admin email already exists in the admins array
    const duplicateAdmin = admins.find(
      (admin, index) => admins.indexOf(admin) !== index
    );
    if (duplicateAdmin) {
      return res
        .status(400)
        .json({ error: `Duplicate admin email: ${duplicateAdmin}` });
    }
    // Check if any admin email already exists in users.User
    const existingAdmin = await users.User.findOne({ email: { $in: admins } });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: `Admin email already exists: ${existingAdmin.email}` });
    }
    //generate passwords for each admins

    const adminWithPasswords = await Promise.all(
      admins?.map(async (adminEmail) => {
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await passHash.encrypt(password);
        return {
          email: adminEmail,
          password: password,
          hashedPassword: hashedPassword,
        };
      })
    );

    const newCompany = new Company({
      company_name,
      company_code,
      status,
      logo_url,
      company_email,
      admins: adminWithPasswords,
      created_by: email,
    });
    await newCompany.save();

    adminWithPasswords.forEach((admin) => {
      users.User.create({
        name: null,
        role: "Admin",
        email: admin.email,
        password: admin.hashedPassword,
      });
      users.CompanyUser.create({
        name: null,
        role: "Admin",
        email: admin?.email,
        status: newCompany?.status,
        company: newCompany?._id,
      });
    });

    adminWithPasswords.forEach((admin) => {
      sendEmail(
        admin?.email,
        "Admin Registration",
        `Your account was created by ${company_name} and your password is ${admin?.password} Please login and update your password as soon as possible!!`
      );
    });

    return res.status(200).json({ company: newCompany });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const fetchCompanys = async (req, res) => {
  try {
    const { email, role } = req.user;
    if (role !== "Superadmin" && role !== "Admin") {
      return res
        .status(403)
        .json({ error: "Only superadmin can access this resource!!" });
    }

    const companies = await Company.find({
      $or: [{ created_by: email }, { "admins.email": email }],
    });

    if (companies) {
      return res.status(200).json({ companies: companies });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const fetchCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    if (company) {
      return res.status(200).json({ company: company });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  createCompany,
  fetchCompanys,
  fetchCompanyById,
};
