import { Request, Response } from "express";
import Superadmin from "../databases/Superadmin.ts";

const createSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Fields are required for registration!!" });
    }
    const existing = await Superadmin.findOne({ email: email });
    if (existing) {
      return res.status(400).json({ error: `${email} already exists!!!` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
