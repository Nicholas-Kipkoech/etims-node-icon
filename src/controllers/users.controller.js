import Users from "../databases/users.js";
import passHash from "../utils/passHash.js";
import createToken from "../utils/jwt.js";
import Company from "../databases/companies.js";
import users from "../databases/users.js";

const createCompanyUser = async (req, res) => {
  try {
    const { name, email, password, role, dob, phone_number, status, company } =
      req.body;

    const { role: admin } = req.user;

    if (admin !== "Admin" && admin !== "Superadmin") {
      return res.status(403).json({
        error: "Only company admins or superadmins can create users!!",
      });
    }
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

const createSuperAdmin = async (req, res) => {
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

const userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await Users.User.findOne({ email: email });
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
      user: user,
      message: "User logged in successfully",
      access_token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email } = req.user; // Assuming the user's email is in the req.user object
    const { name, newPassword } = req.body;

    // Fetch the user from the database
    const user = await Users.User.findOne({ email });
    const companyUser = await Users.CompanyUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's information
    user.name = name;
    companyUser.name = name;

    // If a new password is provided, update the password
    if (newPassword) {
      user.password = await passHash.encrypt(newPassword);
    }

    // Save the updated user information
    await user.save();
    await companyUser.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
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

const updateCompanyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await Users.CompanyUser.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "couldn't get the company" });
    }
    const user = await Users.User.findById(userId);
    if (user) {
      user.name = updatedUser.name;
      user.email = updatedUser.email;
      user.password = updatedUser.password;
      user.role = updatedUser.role;
    }
    await user.save();
    await updatedUser.save();
    return res
      .status(200)
      .json({ message: "updated", updatedUser: updatedUser });
  } catch (error) {
    return res.status(200).json(error);
  }
};
const deleteCompanyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await Users.CompanyUser.findOneAndRemove({
      _id: userId,
    });
    if (!deletedUser) {
      return res.status(404).json({ error: "couldn't get the user" });
    }
    await Users.User.findOneAndRemove({ _id: userId });
    return res
      .status(200)
      .json({ message: "deleted", deletedUser: deletedUser });
  } catch (error) {
    return res.status(200).json(error);
  }
};

export default {
  createCompanyUser,
  userLogin,
  createSuperAdmin,
  updateUser,
  fetchCompanyUsers,
  updateCompanyUser,
  deleteCompanyUser,
};
