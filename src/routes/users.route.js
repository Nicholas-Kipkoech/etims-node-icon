import express from "express";
import userController from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post("/company/create", userController.createCompanyUser);
usersRouter.post("/superadmin/create", userController.createSuperAdmin);
usersRouter.post("/login", userController.userLogin);

export default usersRouter;
