import { Router } from "express";
import organizationController from "../controllers/organization.controller.js";

const organizationRouter = Router();

organizationRouter.post("/create", (req, res) => {
  organizationController.createOrganization(req, res);
});
organizationRouter.post("/add/segment", (req, res) => {
  organizationController.addSegment(req, res);
});
organizationRouter.get("/fetch/segment", (req, res) => {
  organizationController.fetchSegments(req, res);
});
organizationRouter.post("/add/family", (req, res) => {
  organizationController.addFamily(req, res);
});
organizationRouter.get("/fetch/family/:segment_code", (req, res) => {
  organizationController.fetchFamilies(req, res);
});

organizationRouter.post("/add/class", (req, res) => {
  organizationController.addClass(req, res);
});
organizationRouter.get("/fetch/classes/:family_code", (req, res) => {
  organizationController.fetchClasses(req, res);
});
export default organizationRouter;
