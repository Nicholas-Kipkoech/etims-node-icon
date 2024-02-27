import { Router } from "express";
import organizationController from "../controllers/organization.controller.js";
import authenticateJWT from "../middlewares/middleware.js";

const organizationRouter = Router();

organizationRouter.post("/create", authenticateJWT, (req, res) => {
  organizationController.createOrganization(req, res);
});
organizationRouter.get("/fetch", (req, res) => {
  organizationController.fetchOrganizations(req, res);
});

export default organizationRouter;
