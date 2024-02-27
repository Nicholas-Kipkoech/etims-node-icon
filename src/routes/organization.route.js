import { Router } from "express";
import organizationController from "../controllers/organization.controller.js";

const organizationRouter = Router();

organizationRouter.post("/create", (req, res) => {
  organizationController.createOrganization(req, res);
});
organizationRouter.get("/fetch", (req, res) => {
  organizationController.fetchOrganizations(req, res);
});

export default organizationRouter;
