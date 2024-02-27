import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwt_secret = process.env.JWT_SECRET;

const createToken = (
  firstName,
  lastName,
  email,
  role,
  phoneNumber,
  isVerified
) => {
  const token = jwt.sign(
    {
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      isVerified,
    },
    jwt_secret,
    {
      expiresIn: "36h",
    }
  );
  return token;
};

export default createToken;
