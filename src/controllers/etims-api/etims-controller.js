import axios from "axios";
import { config } from "dotenv";
import { generateRandom8DigitNumber } from "../../utils/helpers.js";
import Transactions from "../../databases/transactions.js";
import Company from "../../databases/companies.js";
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
      const { dvcSrlNo } = req.body;
      const data = await this.makeApiRequest("selectInitOsdcInfo", {
        dvcSrlNo: dvcSrlNo,
      });
      return res.status(200).json({ response: data });
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
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async selectCustomerReq(req, res) {
    try {
      const { custmTin } = req.body;

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
      const { lastReqDt } = req.body;
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
      const { lastReqDt } = req.body;

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
      } = req.body;
      const payload = {
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
      };
      const data = await this.makeApiRequest("saveItem", payload);
      return res.status(200).json({ response: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async itemSearchReq(req, res) {
    try {
      const { lastReqDt } = req.body;
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
      const { lastReqDt } = req.body;
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
      } = req.body;
      const payload = {
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
      };
      const data = await this.makeApiRequest("saveBhfCustomer", payload);
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
      const {
        isrccCd,
        isrccNm,
        isrcRt,
        useYn,
        regrId,
        regrNm,
        modrId,
        modrNm,
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
      const data = await this.makeApiRequest("saveBhfInsurance", payload);
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
        company,
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
      const { role, email } = req.user;
      let _user;
      if (role === "Superadmin") {
        _user = await users.Superadmin.findOne({ email: email });
      } else if (role === "Admin") {
        _user = await users.CompanyUser.findOne({ email: email });
      } else {
        _user = await users.CompanyUser.findOne({ email: email });
      }
      const _company = await Company.findById(company);
      const newTransaction = await Transactions.create({
        user: _user,
        company: _company,
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
      const data = await this.makeApiRequest("saveTrnsSalesOsdc", payload);
      return res
        .status(200)
        .json({ response: data, transaction: newTransaction });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async trnsPurchaseSalesReq(req, res) {
    try {
      const { lastReqDt } = req.body;
      const data = await this.makeApiRequest("selectTrnsPurchaseSalesList", {
        lastReqDt,
      });
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

      const data = await this.makeApiRequest("insertTrnsPurchase", payload);

      return res
        .status(200)
        .json({ response: data, transactions: newTransaction });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchTransactions(req, res) {
    try {
      const { email, role } = req.user;
      let transactions;
      if (role === "Superadmin") {
        transactions = await Transactions.find({});
      } else if (role === "Normal_user") {
        console.log(email);
        const { userId } = await users.User.findOne({ email: email });
        transactions = await Transactions.find({ user: userId });
      } else {
        console.log("null");
      }

      return res.status(200).json({ transactions: transactions });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

const etimsController = new EtimsController();
export default etimsController;
