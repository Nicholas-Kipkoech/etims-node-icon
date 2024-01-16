import { Router } from "express";
import authenticateJWT from "../middlewares/middleware.js";
import userController from "../controllers/user-controller.js";

const usersRouter = Router();

usersRouter.post("/superadmin/create", (req, res) => {
  userController.createSuperAdmin(req, res);
});
usersRouter.patch("/password/update", authenticateJWT, (req, res) => {
  userController.updateUserPassword(req, res);
});
usersRouter.post("/login", (req, res) => {
  userController.userLogin(req, res);
});
usersRouter.get("/users", (req, res) => {
  userController.fetchUsers(req, res);
});
export default usersRouter;
