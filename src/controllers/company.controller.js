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

const fetchCompanyUsers = async (req, res) => {
  try {
    const { email, role } = req.user;

    if (role !== "Admin" && role !== "Superadmin") {
      return res.status(403).json({
        error: "Only admin or superadmin can access this resource!!",
      });
    }
    let companyUsers;
    if (role === "Superadmin") {
      // If the user is a superadmin, fetch all company users
      companyUsers = await users.CompanyUser.find({});
    } else if (role === "Admin") {
      // If the user is an admin, check if they are an admin in any company
      const isAdmin = await Company.findOne({
        admins: { $elemMatch: { email } },
      });
      if (!isAdmin) {
        return res.status(403).json({
          error: "Access forbidden. You are not an admin of any company.",
        });
      }
      console.log(isAdmin);

      const companyId = isAdmin?._id;
      companyUsers = await users.CompanyUser.find({ company: companyId });
    }

    return res.status(200).json({ users: companyUsers });
  } catch (error) {
    console.log(error);
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
  fetchCompanyUsers,
  fetchCompanyById,
};
