import users from "../databases/users.js";
import createToken from "../utils/jwt.js";
import passHash from "../utils/passHash.js";

class UserController {
  constructor() {}
  async createSuperAdmin(req, res) {
    try {
      const { name, email, password, role, dob, phone_number, status } =
        req.body;
      const existingUser = await users.Superadmin.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: `${email} already exists!` });
      }
      const hashPass = await passHash.encrypt(password);
      const newSuperAdmin = new users.Superadmin({
        email,
        role,
        password: hashPass,
        name,
        phone_number,
        dob,
        status,
      });
      await users.User.create({
        name: newSuperAdmin.name,
        userId: newSuperAdmin._id,
        role: newSuperAdmin.role,
        email: newSuperAdmin.email,
        status: newSuperAdmin.status,
        password: newSuperAdmin.password,
      });
      await newSuperAdmin.save();
      return res.status(200).json({ superadmin: newSuperAdmin });
    } catch (error) {
      console.error(error);
      return res.status(200).json(error);
    }
  }
  async userLogin(req, res) {
    try {
      const { password, email } = req.body;

      const user = await users.User.findOne({ email: email });
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
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async updateUser(req, res) {
    try {
      const { email } = req.user; // Assuming the user's email is in the req.user object
      const { name, newPassword } = req.body;
      // Fetch the user from the database
      const user = await users.User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Update the user's information
      user.name = name;
      // If a new password is provided, update the password
      if (newPassword) {
        user.password = await passHash.encrypt(newPassword);
      }

      // Save the updated user information
      await user.save();
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
      return res.status(500).json(error);
    }
  }
}

const userController = new UserController();
export default userController;
