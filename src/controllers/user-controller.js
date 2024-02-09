import UsersDTO from "../databases/users.js";
import { validateUserLogin } from "../middlewares/validation.js";
import createToken from "../utils/jwt.js";
import passHash from "../utils/passHash.js";

class UserController {
  constructor() {}
  async createSuperAdmin(req, res) {
    try {
      const {
        name,
        email,
        title,
        about,
        company,
        password,
        dob,
        phone_number,
      } = req.body;
      const existingUser = await UsersDTO.Superadmin.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: `${email} already exists!` });
      }
      const hashPass = await passHash.encrypt(password);
      const newSuperAdmin = new UsersDTO.Superadmin({
        email,
        title,
        about,
        company,
        password: hashPass,
        name,
        phone_number,
        dob,
      });
      await UsersDTO.User.create({
        name: newSuperAdmin.name,
        userId: newSuperAdmin._id,
        role: newSuperAdmin.role,
        email: newSuperAdmin.email,
        password: newSuperAdmin.password,
        created_at: newSuperAdmin.created_at,
      });
      await newSuperAdmin.save();
      return res.status(200).json({ superadmin: newSuperAdmin });
    } catch (error) {
      console.error(error);
      return res.status(200).json(error);
    }
  }

  async fetchSuperAdmin(req, res) {
    try {
      const { email } = req.params;
      const superadmin = await UsersDTO.Superadmin.findOne({ email: email });
      return res.status(200).json({ superadmin });
    } catch (error) {
      console.error(error);
      return res.status(200).json(error);
    }
  }

  async updateSuperAdmin(req, res) {
    try {
      const { email } = req.params;
      const superadmin = await UsersDTO.Superadmin.findOneAndUpdate(
        { email },
        req.body,
        { new: true }
      );
      const user = await UsersDTO.User.findOne({ email: superadmin.email });
      if (user) {
        user.name = superadmin.name;
      }
      await user.save();
      await superadmin.save();
      return res.status(200).json({
        message: "superadmin updated successfully!",
        user: superadmin,
      });
    } catch (error) {
      console.error(error);
      return res.status(200).json(error);
    }
  }

  async userLogin(req, res) {
    try {
      const { password, email } = req.body;

      const { error } = validateUserLogin(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const user = await UsersDTO.User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: `${email} doesn't exist!!` });
      }
      const isValidPass = await passHash.compare(password, user.password);
      if (!isValidPass) {
        return res.status(401).json({ error: "Invalid password!!" });
      }
      const token = createToken(
        user.email,
        user.role,
        user.name,
        user?.business_class,
        user?.organization_id,
        user?.business_family,
        user?.business_segment
      );
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
  async updateUserPassword(req, res) {
    try {
      const { email } = req.user; // Assuming the user's email is in the req.user object
      const { newPassword } = req.body;
      // Fetch the user from the database
      const user = await UsersDTO.User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Update the user's information

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

  async fetchUsers(req, res) {
    try {
      const { role } = req.user;
      let users;
      if (role === "Superadmin") {
        users = (await UsersDTO.User.find({})).filter(
          (user) => user.role !== "Superadmin"
        );
      } else {
        users = await UsersDTO.User.find({
          organization_id: req.user.organization_id,
        });
      }
      return res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
}

const userController = new UserController();
export default userController;
