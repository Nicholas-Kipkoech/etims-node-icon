import express from "express";
import userController from "../controllers/users.controller.js";
import authenticateJWT from "../middlewares/middleware.js";

const usersRouter = express.Router();

usersRouter.post(
  "/company/create",
  authenticateJWT,
  userController.createCompanyUser
);
usersRouter.post("/superadmin/create", userController.createSuperAdmin);
usersRouter.post("/login", userController.userLogin);
usersRouter.post("/update", authenticateJWT, userController.updateUser);

export default usersRouter;
