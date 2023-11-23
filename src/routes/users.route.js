import express from "express";
import userController from "../controllers/users.controller.js";
import authenticateJWT from "../middlewares/middleware.js";

const usersRouter = express.Router();

usersRouter.post(
  "/company/create",
  authenticateJWT,
  userController.createCompanyUser
);
usersRouter.patch(
  "/company/update/:userId",
  authenticateJWT,
  userController.updateCompanyUser
);
usersRouter.delete(
  "/company/delete/:userId",
  authenticateJWT,
  userController.deleteCompanyUser
);
usersRouter.post("/superadmin/create", userController.createSuperAdmin);
usersRouter.post("/login", userController.userLogin);
usersRouter.patch("/update", authenticateJWT, userController.updateUser);
usersRouter.get(
  "/companyUsers/fetch",
  authenticateJWT,
  userController.fetchCompanyUsers
);

export default usersRouter;
