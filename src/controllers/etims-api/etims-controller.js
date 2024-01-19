import axios from "axios";
import { config } from "dotenv";
import { generateRandom8DigitNumber } from "../../utils/helpers.js";
import transactionsDb from "../../databases/transactions.js";
import users from "../../databases/users.js";

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
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json(error);
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
      const {
        itemClsCd,
        itemCd,
        itemTyCd,
        itemNm,
        itemStdNm,
        orgnNatCd,
        pkgUnitCd,
        qtyUnitCd,
        taxTyCd,
        btchNo,
        bcd,
        dftPrc,
        grpPrcL1,
        grpPrcL2,
        grpPrcL3,
        grpPrcL4,
        grpPrcL5,
        addInfo,
        sftyQty,
        isrcAplcbYn,
        useYn,
        regrId,
        regrNm,
        modrId,
        modrNm,
        cmcKey,
        tin,
        bhfId,
      } = req.body;

      const data = await this.makeApiRequest("saveItem", req.body, {
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
      const invcNo = generateRandom8DigitNumber();
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
        });
        await newTransaction.save();
      } else {
        // Handle the case where resultCd is not "000"
        console.error("API request failed with resultCd:", data.resultCd);
        return res.status(500).json({ error: "API request failed", data });
      }
      const { resultCd, resultMsg, resultDt, data: _data } = data;

      const txResponse = new transactionsDb.TxResponse({
        transactionID: newTransaction.transactionID,
        resultCd: resultCd,
        resultMsg: resultMsg,
        resultDt: resultDt,
        intrlData: _data.intrlData,
        rcptSign: _data.rcptSign,
        sdcDateTime: _data.sdcDateTime,
      });
      await txResponse.save();
      return res
        .status(200)
        .json({ txResponse: txResponse, transaction: newTransaction });
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
        itemList,
        cmcKey,
        tin,
        bhfId,
      } = req.body;
      const invcNo = generateRandom8DigitNumber();
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
        tin: cmcKey,
        bhfId: cmcKey,
      });

      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchTransactions(req, res) {
    try {
      let transactions;
      let txResponse;
      transactions = await transactionsDb.Transactions.find({});
      txResponse = await transactionsDb.TxResponse.find({});

      return res
        .status(200)
        .json({ transactions: transactions, txResponse: txResponse });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async fetchTransactionsById(req, res) {
    try {
      const { transactionID } = req.params;
      const transaction = await transactionsDb.Transactions.findById(
        transactionID
      );
      const transactionResponse = await transactionsDb.TxResponse.findOne({
        transactionID: transaction.transactionID,
      });
      return res.status(200).json({
        transaction: transaction,
        transactionResponse: transactionResponse,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async openSaveTransSales(req, res) {
    try {
      const payload = req.body;
      const request_id = payload?.invcNo;
      const bimaTransactionPayload = new transactionsDb.BimaTransaction({
        requestID: request_id,
        request: JSON.stringify(payload),
        message: "Recieved response from BIMA",
        response: null,
      });
      await bimaTransactionPayload.save();

      const apiRequestLog = new transactionsDb.ApiLog({
        request_type: "sales transaction request",
        status: "Pending",
        request: JSON.stringify(payload),
      });
      await apiRequestLog.save();

      const data = await this.makeApiRequest("saveTrnsSalesOsdc", payload, {
        cmcKey: payload.cmcKey,
        tin: payload.tin,
        bhfId: payload.bhfId,
      });
      // save response from KRA
      const bimaTransactionEtimsResponse = new transactionsDb.BimaTransaction({
        requestID: bimaTransactionPayload?.requestID,
        request: bimaTransactionPayload?.request,
        message: "Recieved response from ETIMS",
        response: JSON.stringify(data),
        created_at: Date.now(),
      });
      await bimaTransactionEtimsResponse.save();
      // api response log from etims
      const apiResponseLog = new transactionsDb.ApiLog({
        request_type: "sales transaction response",
        status: "Recieved",
        request: JSON.stringify(data),
      });
      await apiResponseLog.save();
      return res.status(200).json({ response: data });
    } catch (error) {
      const apiErrorLog = new transactionsDb.ApiLog({
        request_type: "Sales transaction error",
        status: "Error",
        request: JSON.stringify(error),
      });
      await apiErrorLog.save();
      console.error("Error in openSaveTransSales:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async fetchApiLogs(req, res) {
    try {
      const infoLogs = await transactionsDb.ApiLog.find({}).exec();
      if (infoLogs) {
        return res.status(200).json({ apiLogs: infoLogs });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async fetchBimaTransactions(req, res) {
    try {
      const bimaTransactions = await transactionsDb.BimaTransaction.find(
        {}
      ).exec();
      if (bimaTransactions) {
        return res.status(200).json({ bimaTransactions: bimaTransactions });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

const etimsController = new EtimsController();
export default etimsController;
