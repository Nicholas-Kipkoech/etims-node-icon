import { Router } from "express";
import etimsController from "../../controllers/etims-api/etims.controller.js";
const etimsAPIRouter = Router();

etimsAPIRouter.post("/initialize", etimsController.initializeDevice);
etimsAPIRouter.post("/selectCodeList", etimsController.getCodeList);
etimsAPIRouter.post("/selectCustomer", etimsController.selectCustomerReq);
etimsAPIRouter.post("/selectNoticeList", etimsController.noticeSearchReq);

export default etimsAPIRouter;
