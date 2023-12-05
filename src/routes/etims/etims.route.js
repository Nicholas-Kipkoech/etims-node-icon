import { Router } from "express";
import etimsController from "../../controllers/etims-api/etims.controller.js";
const etimsAPIRouter = Router();

etimsAPIRouter.post("/initialize", etimsController.initializeDevice);
etimsAPIRouter.post("/selectCodeList", etimsController.getCodeList);
etimsAPIRouter.post("/selectCustomer", etimsController.selectCustomerReq);
etimsAPIRouter.post("/selectNoticeList", etimsController.noticeSearchReq);
etimsAPIRouter.post("/selectItemClsList", etimsController.itemClsSearchReq);
etimsAPIRouter.post("/saveItem", etimsController.itemSaveReq);
etimsAPIRouter.post("/selectItemList", etimsController.itemSearchReq);
etimsAPIRouter.post("/selectBhfList", etimsController.bhfSearchReq);
etimsAPIRouter.post("/saveBhfCustomer", etimsController.bhfCustSaveReq);
etimsAPIRouter.post("/saveBhfUser", etimsController.bhfUserSaveReq);
etimsAPIRouter.post("/saveBhfInsurance", etimsController.bhfInsuranceSaveReq);
etimsAPIRouter.post(
  "/selectImportItemList",
  etimsController.importItemSearchReq
);
etimsAPIRouter.post("/updateImportItem", etimsController.importItemUpdateReq);
etimsAPIRouter.post("/saveTrnsSalesOsdc", etimsController.trnsSalesSaveWrReq);
etimsAPIRouter.post(
  "/selectTrnsPurchaseSalesList",
  etimsController.trnsPurchaseSalesReq
);
etimsAPIRouter.post("/insertTrnsPurchase", etimsController.trnsPurchaseSaveReq);

export default etimsAPIRouter;
