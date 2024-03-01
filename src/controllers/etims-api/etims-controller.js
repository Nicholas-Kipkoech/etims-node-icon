import axios from "axios";
import { config } from "dotenv";
import { generateRandom8DigitNumber } from "../../utils/helpers.js";
import transactionsDb from "../../databases/transactions.js";
import OrganizationDTO from "../../databases/organizations.js";
import ETIMSheaders from "../../databases/ETIMS-headers.js";
import Business from "../../databases/business.js";

config();

class EtimsController {
  constructor() {
    this.apiUrl = process.env.ETIMS_URL;
    this.defaultHeaders = {
      cmcKey: process.env.CMCKEY,
      tin: process.env.TIN,
      bhfId: process.env.BHFID,
    };
  }

  async getEtimsHeaders(businessId) {
    try {
      const etimsHeaders = await ETIMSheaders.findOne({ business: businessId });
      if (etimsHeaders) {
        return {
          cmcKey: etimsHeaders.cmcKey,
          pin: etimsHeaders.pin,
          bhfId: etimsHeaders.bhfId,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async makeApiRequest(endpoint, requestData) {
    try {
      const payload = {
        ...requestData,
      };
      const response = await axios.post(`${this.apiUrl}/${endpoint}`, payload, {
        headers: this.defaultHeaders,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async initializeDevice(req, res) {
    try {
      const { dvcSrlNo, tin, bhfId } = req.body;
      const { businessId } = req.params;
      const business = await Business.findById(businessId);

      const { data: response } = await axios.post(
        `${this.apiUrl}/selectInitOsdcInfo`,
        {
          dvcSrlNo: dvcSrlNo,
          tin: tin,
          bhfId: bhfId,
        }
      );
      const etimsHeaders = new ETIMSheaders({
        business: business,
        cmcKey: response?.data.info.cmcKey,
        pin: response?.data.info.tin,
        bhfId: response?.data.info.bhfId,
        companyName: response?.data.info.taxprNm,
        createdAt: Date.now(),
      });
      await etimsHeaders.save();
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCodeList(req, res) {
    try {
      const { lastReqDt } = req.body;
      const data = await this.makeApiRequest("selectCodeList", {
        lastReqDt: lastReqDt,
      });
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async selectCustomerReq(req, res) {
    try {
      const { custmTin, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest("selectCustomer", {
        custmTin: custmTin,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async noticeSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest("selectNoticeList", {
        lastReqDt: lastReqDt,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async itemClsSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest("selectItemClsList", {
        lastReqDt: lastReqDt,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async itemSaveReq(req, res) {
    try {
      const data = await this.makeApiRequest("saveItem", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async saveItemComposition(req, res) {
    try {
      const data = await this.makeApiRequest("saveItemComposition", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async itemSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest("selectItemList", {
        lastReqDt,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async bhfSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest("selectBhfList", {
        lastReqDt,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async bhfCustSaveReq(req, res) {
    try {
      const data = await this.makeApiRequest("saveBhfCustomer", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async bhfUserSaveReq(req, res) {
    try {
      const {
        userId,
        userNm,
        pwd,
        adrs,
        cntc,
        authCd,
        useYn,
        remark,
        regrId,
        regrNm,
        modrId,
        modrNm,
        cmcKey,
        tin,
        bhfId,
      } = req.body;
      const payload = {
        userId,
        userNm,
        pwd,
        adrs,
        cntc,
        authCd,
        useYn,
        remark,
        regrId,
        regrNm,
        modrId,
        modrNm,
      };
      const data = await this.makeApiRequest("saveBhfUser", payload);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async bhfInsuranceSaveReq(req, res) {
    try {
      const data = await this.makeApiRequest("saveBhfInsurance", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async importItemSearchReq(req, res) {
    try {
      const { lastReqDt } = req.body;

      const data = await this.makeApiRequest("selectImportItemList", {
        lastReqDt,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async importItemUpdateReq(req, res) {
    try {
      const data = await this.makeApiRequest("updateImportItem", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async trnsSalesSaveWrReq(req, res) {
    try {
      const {
        invcNo,
        trdInvcNo,
        orgInvcNo,
        custTin,
        custNm,
        salesTyCd,
        rcptTyCd,
        pmtTyCd,
        salesSttsCd,
        cfmDt,
        salesDt,
        stockRlsDt,
        cnclReqDt,
        cnclDt,
        rfdDt,
        rfdRsnCd,
        totItemCnt,
        taxblAmtA,
        taxblAmtB,
        taxblAmtC,
        taxblAmtD,
        taxblAmtE,
        taxRtA,
        taxRtB,
        taxRtC,
        taxRtD,
        taxRtE,
        taxAmtA,
        taxAmtB,
        taxAmtC,
        taxAmtD,
        taxAmtE,
        totTaxblAmt,
        totTaxAmt,
        totAmt,
        prchrAcptcYn,
        remark,
        regrId,
        regrNm,
        modrId,
        modrNm,
        receipt,
        itemList,
      } = req.body;

      let organization;

      const payload = {
        trdInvcNo,
        invcNo,
        orgInvcNo,
        custTin,
        custNm,
        salesTyCd,
        rcptTyCd,
        pmtTyCd,
        salesSttsCd,
        cfmDt,
        salesDt,
        stockRlsDt,
        cnclReqDt,
        cnclDt,
        rfdDt,
        rfdRsnCd,
        totItemCnt,
        taxblAmtA,
        taxblAmtB,
        taxblAmtC,
        taxblAmtD,
        taxblAmtE,
        taxRtA,
        taxRtB,
        taxRtC,
        taxRtD,
        taxRtE,
        taxAmtA,
        taxAmtB,
        taxAmtC,
        taxAmtD,
        taxAmtE,
        totTaxblAmt,
        totTaxAmt,
        totAmt,
        prchrAcptcYn,
        remark,
        regrId,
        regrNm,
        modrId,
        modrNm,
        receipt,
        itemList,
      };

      let newTransaction;

      const transactionID = generateRandom8DigitNumber().toString();
      const data = await this.makeApiRequest("saveTrnsSalesOsdc", payload);

      if (data && data.resultCd === "000") {
        newTransaction = await transactionsDb.Transactions.create({
          organization: organization,
          transactionID: transactionID,
          trdInvcNo,
          invcNo,
          orgInvcNo,
          custTin,
          custNm,
          salesTyCd,
          rcptTyCd,
          pmtTyCd,
          salesSttsCd,
          cfmDt,
          salesDt,
          stockRlsDt,
          cnclReqDt,
          cnclDt,
          rfdDt,
          rfdRsnCd,
          totItemCnt,
          taxblAmtA,
          taxblAmtB,
          taxblAmtC,
          taxblAmtD,
          taxblAmtE,
          taxRtA,
          taxRtB,
          taxRtC,
          taxRtD,
          taxRtE,
          taxAmtA,
          taxAmtB,
          taxAmtC,
          taxAmtD,
          taxAmtE,
          totTaxblAmt,
          totTaxAmt,
          totAmt,
          prchrAcptcYn,
          remark,
          regrId,
          regrNm,
          modrId,
          modrNm,
          receipt,
          itemList,
          createdAt: Date.now(),
        });

        await newTransaction.save();
      } else {
        // Handle the case where resultCd is not "000"
        console.error("API request failed with resultCd:", data.resultCd);
        return res.status(500).json({ error: "API request failed", data });
      }
      const { resultCd, resultMsg, resultDt, data: _data } = data;

      const txResponse = new transactionsDb.TxResponse({
        organization: newTransaction.organization,
        transactionID: newTransaction.transactionID,
        resultCd: resultCd,
        resultMsg: resultMsg,
        resultDt: resultDt,
        invoiceNumber: newTransaction.invcNo,
        invoiceAmt: newTransaction.totAmt,
        taxAmt: newTransaction.totTaxAmt,
        clientName: newTransaction?.custNm,
        dateSent: newTransaction.createdAt,
        status: "Success",
        intrlData: _data.intrlData,
        rcptSign: _data.rcptSign,
        sdcDateTime: _data.sdcDateTime,
      });
      await txResponse.save();

      return res.status(200).json({
        etimsResponse: txResponse,
        transaction: newTransaction,
        response: data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchNotifications(req, res) {
    try {
      const { role } = req.user;
      let notifications;
      if (role === "Superadmin") {
        notifications = await transactionsDb.Notification.find({}).sort({
          read_status: 1,
          send_date: -1,
        });
      } else {
        notifications = await transactionsDb.Notification.find({
          organization: req.user.organization_id,
        }).sort({
          read_status: 1,
          send_date: -1,
        });
      }

      return res.status(200).json({ notifications });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchBimaResponse(req, res) {
    try {
      const { invoiceNumber } = req.params;
      const response = await transactionsDb.BimaResponse.findOne({
        invoiceNumber: invoiceNumber,
      });
      if (response) {
        return res.status(200).json({ response });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async trnsPurchaseSalesReq(req, res) {
    try {
      const { lastReqDt } = req.body;
      const data = await this.makeApiRequest(
        "selectTrnsPurchaseSalesList",
        lastReqDt
      );
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async trnsPurchaseSaveReq(req, res) {
    try {
      const {
        orgInvcNo,
        spplrTin,
        spplrBhfId,
        spplrNm,
        spplrInvcNo,
        regTyCd,
        pchsTyCd,
        rcptTyCd,
        pmtTyCd,
        pchsSttsCd,
        cfmDt,
        pchsDt,
        wrhsDt,
        cnclReqDt,
        cnclDt,
        rfdDt,
        totItemCnt,
        taxblAmtA,
        taxblAmtB,
        taxblAmtC,
        taxblAmtD,
        taxblAmtE,
        taxRtA,
        taxRtB,
        taxRtC,
        taxRtD,
        taxRtE,
        taxAmtA,
        taxAmtB,
        taxAmtC,
        taxAmtD,
        taxAmtE,
        totTaxblAmt,
        totTaxAmt,
        totAmt,
        remark,
        regrId,
        regrNm,
        modrId,
        modrNm,
        receipt,
        invcNo,
        itemList,
      } = req.body;

      const payload = {
        orgInvcNo,
        invcNo,
        spplrTin,
        spplrBhfId,
        spplrNm,
        spplrInvcNo,
        regTyCd,
        pchsTyCd,
        rcptTyCd,
        pmtTyCd,
        pchsSttsCd,
        cfmDt,
        pchsDt,
        wrhsDt,
        cnclReqDt,
        cnclDt,
        rfdDt,
        totItemCnt,
        taxblAmtA,
        taxblAmtB,
        taxblAmtC,
        taxblAmtD,
        taxblAmtE,
        taxRtA,
        taxRtB,
        taxRtC,
        taxRtD,
        taxRtE,
        taxAmtA,
        taxAmtB,
        taxAmtC,
        taxAmtD,
        taxAmtE,
        totTaxblAmt,
        totTaxAmt,
        totAmt,
        remark,
        regrId,
        regrNm,
        modrId,
        modrNm,
        itemList,
      };

      const data = await this.makeApiRequest("insertTrnsPurchase", payload);

      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async saveStockMaster(req, res) {
    try {
      const data = await this.makeApiRequest("saveStockMaster", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async lookupStockMaster(req, res) {
    try {
      const data = await this.makeApiRequest("selectStockMoveList", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async saveStockIO(req, res) {
    try {
      const data = await this.makeApiRequest("insertStockIO", req.body);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchTransactions(req, res) {
    try {
      const { role } = req.user;
      const { invoiceNumber, status, invoiceAmount } = req.query;

      let txResponseQuery = {};

      if (role === "Superadmin") {
        txResponseQuery = {};
      } else {
        txResponseQuery.organization = req.user.organization_id;
      }

      // Add additional filters based on query parameters
      if (invoiceNumber) {
        txResponseQuery.invoiceNumber = invoiceNumber;
      }
      if (status) {
        txResponseQuery.status = status;
      }
      if (invoiceAmount) {
        // Assuming invoiceAmount is a numeric field
        txResponseQuery.invoiceAmt = { $eq: parseFloat(invoiceAmount) };
      }

      const txResponse = await transactionsDb.TxResponse.find(
        txResponseQuery
      ).sort({ dateSent: -1 });
      const transactions = await transactionsDb.Transactions.find(
        txResponseQuery
      ).sort({ dateSent: -1 });

      return res
        .status(200)
        .json({ response: txResponse, transactions: transactions });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async openSaveTransSales(req, res) {
    try {
      const payload = req.body;

      const data = await this.makeApiRequest("saveTrnsSalesOsdc", payload);

      await apiResponseLog.save();
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error("Error in openSaveTransSales:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async fetchEtimsCred(req, res) {
    try {
      const { organizationId } = req.params;
      const credentials = await OrganizationDTO.ETIMSCredentials.findOne({
        organizationId: organizationId,
      });
      return res.status(200).json({ credentials });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

const etimsController = new EtimsController();
export default etimsController;
