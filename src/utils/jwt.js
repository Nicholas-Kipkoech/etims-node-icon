import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwt_secret = process.env.JWT_SECRET;

const createToken = (
  email,
  role,
  name,
  business_class,

  business_family,
  business_segment
) => {
  const token = jwt.sign(
    {
      name: name,
      role: role,
      email: email,
      business_class: business_class,
      business_segment: business_segment,
      business_family: business_family,
    },
    jwt_secret,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

export default createToken;
