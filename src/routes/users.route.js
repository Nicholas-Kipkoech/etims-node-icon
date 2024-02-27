import { Router } from "express";
import authenticateJWT from "../middlewares/middleware.js";
import userController from "../controllers/user-controller.js";

const usersRouter = Router();

usersRouter.post("/create", (req, res) => {
  userController.createUser(req, res);
});

usersRouter.post("/login", (req, res) => {
  userController.userLogin(req, res);
});
usersRouter.patch("/password/update", authenticateJWT, (req, res) => {
  userController.updateUserPassword(req, res);
});
// usersRouter.get("/fetch", authenticateJWT, (req, res) => {
//   userController.fetchUsers(req, res);
// });
export default usersRouter;
