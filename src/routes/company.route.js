import express from "express";
import companyController from "../controllers/company.controller.js";
import authenticateJWT from "../middlewares/middleware.js";

const companyRouter = express.Router();

companyRouter.post("/create", authenticateJWT, companyController.createCompany);
companyRouter.get("/fetch", authenticateJWT, companyController.fetchCompanys);
companyRouter.get(
  "/fetch/users",
  authenticateJWT,
  companyController.fetchCompanyUsers
);

export default companyRouter;