import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwt_secret = process.env.JWT_SECRET;

const createToken = (email, role, name) => {
  const token = jwt.sign({ name: name, role: role, email: email }, jwt_secret, {
    expiresIn: "24h",
  });
  return token;
};

export default createToken;
