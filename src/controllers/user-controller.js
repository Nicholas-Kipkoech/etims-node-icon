import { validateUserAccount } from "../middlewares/validation.js";
import User from "../databases/users.js";
import passHash from "../utils/passHash.js";
import createToken from "../utils/jwt.js";
import { sendEmail } from "../utils/sendEmail.js";

class UserController {
  constructor() {}

  async createUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        role,
        phoneNumber,
        isVerified,
      } = req.body;

      const user = await User({ email: email });
      if (user) {
        return res.status(404).json({ error: `${email} already exist!` });
      }
      const { error } = validateUserAccount(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const hashPassword = await passHash.encrypt(password);
      const new_user = new User({
        firstName,
        lastName,
        role,
        email,
        password: hashPassword,
        phoneNumber,
        isVerified,
        created_at: Date.now(),
      });
      sendEmail(
        new_user?.firstName,
        new_user?.lastName,
        new_user?.email,
        "Account creation"
      );
      await new_user.save();
      return res.status(200).json({ message: "User created successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: `${email} doesn't exist!` });
      }
      const isValidPass = await passHash.compare(password, user.password);
      if (!isValidPass) {
        return res.status(401).json({ error: "Invalid password! " });
      }
      const token = createToken(
        user.firstName,
        user.lastName,
        user.email,
        user.role,
        user.phoneNumber,
        user.isVerified
      );
      return res.status(200).json({
        success: true,
        message: "User logged in successfully!",
        access_token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async updateUserPassword(req, res) {
    try {
      const { password } = req.body;
      const { email } = req.user;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
      if (password) {
        user.password = await passHash.encrypt(password);
      }
      await user.save();
      return res.status(200).json({ message: "Account updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

const userController = new UserController();
export default userController;
