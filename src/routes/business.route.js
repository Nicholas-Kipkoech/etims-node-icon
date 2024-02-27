import { Router } from "express";
import businessController from "../controllers/business.controller.js";

const businessRouter = Router();

businessRouter.post("/create", (req, res) => {
  businessController.createBusiness(req, res);
});

businessRouter.get("/fetch/:organizationId", (req, res) => {
  businessController.fetchBusiness(req, res);
});

export default businessRouter;
