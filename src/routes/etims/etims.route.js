import { Router } from "express";
import etimsController from "../../controllers/etims-api/etims-controller.js";
const etimsAPIRouter = Router();

etimsAPIRouter.post("/initialize", (req, res) => {
  etimsController.initializeDevice(req, res);
});
etimsAPIRouter.post("/selectCodeList", (req, res) => {
  etimsController.getCodeList(req, res);
});
etimsAPIRouter.post("/selectCustomer", (req, res) => {
  etimsController.selectCustomerReq(req, res);
});
etimsAPIRouter.post("/selectNoticeList", (req, res) => {
  etimsController.noticeSearchReq(req, res);
});
etimsAPIRouter.post("/selectItemClsList", (req, res) => {
  etimsController.itemClsSearchReq(req, res);
});
etimsAPIRouter.post("/saveItem", (req, res) => {
  etimsController.itemSaveReq(req, res);
});
etimsAPIRouter.post("/selectItemList", (req, res) => {
  etimsController.itemSearchReq(req, res);
});
etimsAPIRouter.post("/selectBhfList", (req, res) => {
  etimsController.bhfSearchReq(req, res);
});
etimsAPIRouter.post("/saveBhfCustomer", (req, res) => {
  etimsController.bhfCustSaveReq(req, res);
});
etimsAPIRouter.post("/saveBhfUser", (req, res) => {
  etimsController.bhfUserSaveReq(req, res);
});
etimsAPIRouter.post("/saveBhfInsurance", (req, res) => {
  etimsController.bhfInsuranceSaveReq(req, res);
});
etimsAPIRouter.post("/selectImportItemList", (req, res) => {
  etimsController.importItemSearchReq(req, res);
});
etimsAPIRouter.post("/updateImportItem", (req, res) => {
  etimsController.importItemUpdateReq(req, res);
});
etimsAPIRouter.post("/saveTrnsSalesOsdc", (req, res) => {
  etimsController.trnsSalesSaveWrReq(req, res);
});
etimsAPIRouter.post("/selectTrnsPurchaseSalesList", (req, res) => {
  etimsController.trnsPurchaseSalesReq(req, res);
});
etimsAPIRouter.post("/insertTrnsPurchase", (req, res) => {
  etimsController.trnsPurchaseSaveReq(req, res);
});

export default etimsAPIRouter;
