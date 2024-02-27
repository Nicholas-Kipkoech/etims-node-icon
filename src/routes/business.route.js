import { Router } from "express";
import businessController from "../controllers/business.controller";

const businessRouter = Router();

businessRouter.post("/create", (req, res) => {
  businessController.createBusiness(req, res);
});

businessRouter.get("/create", (req, res) => {
  businessController.fetchBusiness(req, res);
});

export default businessRouter;
