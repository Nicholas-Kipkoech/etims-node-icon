import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();

const secretKey: any = process.env.JWT_SECRET;
interface AuthenticatedRequest extends Request {
  user?: any;
}

function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    // Make the user information available in req.user
    req.user = user;
    next();
  });
}

export default authenticateJWT;
