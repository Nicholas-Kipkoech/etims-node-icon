import { Router } from "express";
import organizationController from "../controllers/organization.controller.js";

const organizationRouter = Router();

organizationRouter.post("/create", (req, res) => {
  organizationController.createOrganization(req, res);
});
organizationRouter.get("/fetch", (req, res) => {
  organizationController.fetchOrganizations(req, res);
});
organizationRouter.post("/add/segment", (req, res) => {
  organizationController.addSegment(req, res);
});
organizationRouter.get("/fetch/segment", (req, res) => {
  organizationController.fetchSegments(req, res);
});
organizationRouter.get("/fetch/segment/:code", (req, res) => {
  organizationController.fetchSegment(req, res);
});
organizationRouter.post("/add/family", (req, res) => {
  organizationController.addFamily(req, res);
});
organizationRouter.get("/fetch/family/:code", (req, res) => {
  organizationController.fetchFamily(req, res);
});
organizationRouter.get("/fetch/families/:segment_code", (req, res) => {
  organizationController.fetchFamilies(req, res);
});

organizationRouter.post("/add/class", (req, res) => {
  organizationController.addClass(req, res);
});
organizationRouter.get("/fetch/class/:code", (req, res) => {
  organizationController.fetchClass(req, res);
});
organizationRouter.get("/fetch/classes/:family_code", (req, res) => {
  organizationController.fetchClasses(req, res);
});
organizationRouter.post("/add/comodity", (req, res) => {
  organizationController.addComodity(req, res);
});
organizationRouter.get("/fetch/comodities/:class_code", (req, res) => {
  organizationController.fetchComidities(req, res);
});
export default organizationRouter;
