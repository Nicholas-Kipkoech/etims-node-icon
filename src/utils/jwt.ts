import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwt_secret: any = process.env.JWT_SECRET;

const createToken = (email: string, role: string, name: string) => {
  const token = jwt.sign({ name: name, role: role, email: email }, jwt_secret, {
    expiresIn: "24h",
  });
  return token;
};

export default createToken;
