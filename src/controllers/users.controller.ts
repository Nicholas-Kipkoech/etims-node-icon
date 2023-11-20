import { Request, Response } from "express";
import Users from "../databases/users.ts";
import passHash from "../utils/passHash.ts";
import createToken from "../utils/jwt.ts";
import Company from "../databases/companies.ts";

const createCompanyUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, dob, phone_number, status, company } =
      req.body;

    const existing = await Users.CompanyUser.findOne({ email: email });
    if (existing) {
      return res.status(400).json({ error: `${email} already exists!!!` });
    }
    const _company = await Company.findOne({ _id: company });
    const hashPass = await passHash.encrypt(password);

    const newCompanyUser = new Users.CompanyUser({
      email,
      role,
      company: _company,
      password: hashPass,
      name,
      phone_number,
      dob,
      status,
    });
    if (_company && role === "Admin") {
      _company.superadmin_email = email;
    }
    await _company?.save();
    await Users.User.create({
      userId: newCompanyUser._id,
      name: newCompanyUser.name,
      role: newCompanyUser.role,
      email: newCompanyUser.email,
      status: newCompanyUser.status,
      password: newCompanyUser.password,
    });
    await newCompanyUser.save();
    return res.status(200).json({ user: newCompanyUser });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, dob, phone_number, status } = req.body;

    const existing = await Users.Superadmin.findOne({ email: email });
    if (existing) {
      return res.status(400).json({ error: `${email} already exists!!!` });
    }
    const hashPass = await passHash.encrypt(password);
    const newSuperAdmin = new Users.Superadmin({
      email,
      role,
      password: hashPass,
      name,
      phone_number,
      dob,
      status,
    });
    await Users.User.create({
      name: newSuperAdmin.name,
      userId: newSuperAdmin._id,
      role: newSuperAdmin.role,
      email: newSuperAdmin.email,
      status: newSuperAdmin.status,
      password: newSuperAdmin.password,
    });
    await newSuperAdmin.save();
    return res.status(200).json({ user: newSuperAdmin });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user: any = await Users.User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: `${email} doesn't exist!!` });
    }
    const isValidPass = await passHash.compare(password, user.password);
    if (!isValidPass) {
      return res.status(401).json({ error: "Invalid password!!" });
    }
    const token = createToken(user.email, user.role, user.name);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      access_token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default { createCompanyUser, userLogin, createSuperAdmin };
