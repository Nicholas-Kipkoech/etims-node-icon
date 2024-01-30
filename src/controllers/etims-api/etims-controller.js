import axios from "axios";
import { config } from "dotenv";
import { generateRandom8DigitNumber } from "../../utils/helpers.js";
import transactionsDb from "../../databases/transactions.js";
import OrganizationDTO from "../../databases/organizations.js";
import { io } from "../../index.js";

config();

class EtimsController {
  constructor() {
    this.apiUrl = process.env.ETIMS_URL;
    this.ngrok_url = "https://6d7e-105-27-207-82.ngrok-free.app";
    this.defaultHeaders = {
      cmcKey: process.env.CMCKEY,
      tin: process.env.TIN,
      bhfId: process.env.BHFID,
    };
  }
  async makeApiRequest(endpoint, requestData, headers) {
    try {
      const payload = {
        ...requestData,
      };

      const response = await axios.post(`${this.apiUrl}/${endpoint}`, payload, {
        headers: headers,
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
      const response = await axios.post(`${this.apiUrl}/selectInitOsdcInfo`, {
        dvcSrlNo: dvcSrlNo,
        tin: tin,
        bhfId: bhfId,
      });
      const notification = new transactionsDb.Notification({
        from: "Device Initialization",
        message: "Device has been initialized!!!",
        send_date: Date.now(),
      });
      await notification.save();
      io.emit("notification");

      await this.returnResponse(response.data);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async returnResponse(payload) {
    console.log(payload);
    try {
      // sendCustomEmail(
      //   "ckipkorir@iconsoft.co",
      //   "KRA CREDENTIALS",
      //   payload.data?.info.cmcKey,
      //   payload.data?.info.tin
      // );
      console.log("request sent to BIMA");
      console.log("Response from server:");
    } catch (error) {
      console.error(error);
    }
  }

  async getCodeList(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest(
        "selectCodeList",
        {
          lastReqDt: lastReqDt,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async selectCustomerReq(req, res) {
    try {
      const { custmTin, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest(
        "selectCustomer",
        {
          custmTin: custmTin,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
      );
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async noticeSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest(
        "selectNoticeList",
        {
          lastReqDt: lastReqDt,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
      );
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async itemClsSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest(
        "selectItemClsList",
        {
          lastReqDt: lastReqDt,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
      );
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async itemSaveReq(req, res) {
    try {
      const data = await this.makeApiRequest("saveItem", req.body, {
        cmcKey: req.body.cmcKey,
        tin: req.body.tin,
        bhfId: req.body.bhfId,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async saveItemComposition(req, res) {
    try {
      const data = await this.makeApiRequest("saveItemComposition", req.body, {
        cmcKey: req.body.cmcKey,
        tin: req.body.tin,
        bhfId: req.body.bhfId,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async itemSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest(
        "selectItemList",
        {
          lastReqDt,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
      );
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async bhfSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest(
        "selectBhfList",
        {
          lastReqDt,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
      );
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async bhfCustSaveReq(req, res) {
    try {
      const {
        custNo,
        custTin,
        custNm,
        adrs,
        telNo,
        email,
        faxNo,
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

      const data = await this.makeApiRequest("saveBhfCustomer", req.body, {
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
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
      const data = await this.makeApiRequest("saveBhfUser", payload, {
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async bhfInsuranceSaveReq(req, res) {
    try {
      const {
        isrccCd,
        isrccNm,
        isrcRt,
        useYn,
        regrId,
        regrNm,
        modrId,
        modrNm,
        cmcKey,
        tin,
        bhfId,
      } = req.body;
      const payload = {
        isrcRt,
        useYn,
        isrccCd,
        isrccNm,
        regrId,
        regrNm,
        modrId,
        modrNm,
      };
      const data = await this.makeApiRequest("saveBhfInsurance", payload, {
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async importItemSearchReq(req, res) {
    try {
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;

      const data = await this.makeApiRequest(
        "selectImportItemList",
        {
          lastReqDt,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
      );
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async importItemUpdateReq(req, res) {
    try {
      const data = await this.makeApiRequest("updateImportItem", req.body, {
        cmcKey: req.body.cmcKey,
        tin: req.body.tin,
        bhfId: req.body.bhfId,
      });
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
        clientKey,
      } = req.body;

      const client_key = await OrganizationDTO.APICredentials.findOne({
        clientKey: clientKey,
      });
      if (!client_key) {
        return res.status(404).json({ error: "Client key not found" });
      }

      const organization = await OrganizationDTO.Organization.findById(
        client_key.organization
      );
      if (!organization) {
        return res.status(404).json({ error: "Organization doesn't exist" });
      }
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
      const data = await this.makeApiRequest("saveTrnsSalesOsdc", payload, {
        cmcKey: process.env.CMCKEY,
        tin: process.env.TIN,
        bhfId: process.env.BHFID,
      });

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

      const newNotification = new transactionsDb.Notification({
        organization: organization._id,
        from: organization.organization_name,
        message: `A new invoice has been submitted: invoice number ${newTransaction?.invcNo}`,
        send_date: Date.now(),
      });
      io.emit("notification");
      await newNotification.save();
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
      const { lastReqDt, cmcKey, tin, bhfId } = req.body;
      const data = await this.makeApiRequest(
        "selectTrnsPurchaseSalesList",
        {
          lastReqDt,
        },
        {
          cmcKey: cmcKey,
          tin: tin,
          bhfId: bhfId,
        }
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
        cmcKey,
        tin,
        bhfId,
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

      const data = await this.makeApiRequest("insertTrnsPurchase", payload, {
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });

      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async saveStockMaster(req, res) {
    try {
      const data = await this.makeApiRequest("saveStockMaster", req.body, {
        cmcKey: req.body.cmcKey,
        tin: req.body.tin,
        bhfId: req.body.bhfId,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async lookupStockMaster(req, res) {
    try {
      const data = await this.makeApiRequest("selectStockMoveList", req.body, {
        cmcKey: req.body.cmcKey,
        tin: req.body.tin,
        bhfId: req.body.bhfId,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async saveStockIO(req, res) {
    try {
      const data = await this.makeApiRequest("insertStockIO", req.body, {
        cmcKey: req.body.cmcKey,
        tin: req.body.tin,
        bhfId: req.body.bhfId,
      });
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchTransactions(req, res) {
    try {
      const { role } = req.user;

      let txResponse;
      if (role === "Superadmin") {
        txResponse = await transactionsDb.TxResponse.find({}).sort({
          dateSent: -1,
        });
      } else {
        txResponse = await transactionsDb.TxResponse.find({
          organization: req.user.organization_id,
        }).sort({ dateSent: -1 });
      }
      return res.status(200).json({ response: txResponse });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async openSaveTransSales(req, res) {
    try {
      const payload = req.body;

      const data = await this.makeApiRequest("saveTrnsSalesOsdc", payload, {
        cmcKey: payload.cmcKey,
        tin: payload.tin,
        bhfId: payload.bhfId,
      });

      await apiResponseLog.save();
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error("Error in openSaveTransSales:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const etimsController = new EtimsController();
export default etimsController;
