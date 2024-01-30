import { Router } from "express";
import etimsController from "../../controllers/etims-api/etims-controller.js";
import authenticateJWT from "../../middlewares/middleware.js";

const etimsAPIRouter = Router();

etimsAPIRouter.post("/initialize", (req, res) => {
  etimsController.initializeDevice(req, res);
});
etimsAPIRouter.post("/cb", (req, res) => {
  etimsController.returnResponse(req, res);
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
etimsAPIRouter.post("/saveItemComposition", (req, res) => {
  etimsController.saveItemComposition(req, res);
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
etimsAPIRouter.get("/getResponse/:invoiceNumber", (req, res) => {
  etimsController.fetchBimaResponse(req, res);
});
etimsAPIRouter.post("/selectTrnsPurchaseSalesList", (req, res) => {
  etimsController.trnsPurchaseSalesReq(req, res);
});
etimsAPIRouter.post("/insertTrnsPurchase", (req, res) => {
  etimsController.trnsPurchaseSaveReq(req, res);
});
etimsAPIRouter.post("/saveStockMaster", (req, res) => {
  etimsController.saveStockMaster(req, res);
});

etimsAPIRouter.post("/selectStockMoveList", (req, res) => {
  etimsController.lookupStockMaster(req, res);
});
etimsAPIRouter.post("/insertStockIO", (req, res) => {
  etimsController.saveStockIO(req, res);
});
etimsAPIRouter.post("/saveTrnsSale", (req, res) => {
  etimsController.openSaveTransSales(req, res);
});
etimsAPIRouter.get("/fetch-transactions", authenticateJWT, (req, res) => {
  etimsController.fetchTransactions(req, res);
});

etimsAPIRouter.get("/notifications", (req, res) => {
  etimsController.fetchNotifications(req, res);
});
etimsAPIRouter.get("/notifications/:organizationID", (req, res) => {
  etimsController.fetchNotificationsById(req, res);
});

export default etimsAPIRouter;
