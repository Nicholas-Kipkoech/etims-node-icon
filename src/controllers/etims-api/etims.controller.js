import axios from "axios";

const apiUrl = `https://etims-api-sbx.kra.go.ke/etims-api`;

const initializeDevice = async (req, res) => {
  try {
    const response = await axios.post(`${apiUrl}/selectInitOsdcInfo`, {
      tin: "A123456789Z",
      bhfId: "00",
      dvcSrlNo: "dvcv1130",
    });
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const getCodeList = async (req, res) => {
  try {
    const response = await axios.post(`${apiUrl}/selectCodeList`, {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "f0b9831bd2334874b7ec815e40347bc4",
      lastReqDt: "20180520000000",
    });
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const selectCustomerReq = async (req, res) => {
  try {
    const { custmTin } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      custmTin,
    };
    const response = await axios.post(`${apiUrl}/selectCustomer`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const noticeSearchReq = async (req, res) => {
  try {
    const { lastReqDt } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      lastReqDt: lastReqDt,
    };
    const response = await axios.post(`${apiUrl}/selectNoticeList`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const itemClsSearchReq = async (req, res) => {
  try {
    const { lastReqDt } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      lastReqDt: lastReqDt,
    };
    const response = await axios.post(`${apiUrl}/selectItemClsList`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const itemSaveReq = async (req, res) => {
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
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
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
    const response = await axios.post(`${apiUrl}/saveItem`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
  }
};

const itemSearchReq = async (req, res) => {
  try {
    const { lastReqDt } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      lastReqDt: lastReqDt,
    };
    const response = await axios.post(`${apiUrl}/selectItemList`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
const bhfSearchReq = async (req, res) => {
  try {
    const { lastReqDt } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      lastReqDt: lastReqDt,
    };
    const response = await axios.post(`${apiUrl}/selectBhfList`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const bhfCustSaveReq = async (req, res) => {
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
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
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
    const response = await axios.post(`${apiUrl}/saveBhfCustomer`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const bhfUserSaveReq = async (req, res) => {
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
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
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
    const response = await axios.post(`${apiUrl}/saveBhfUser`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const bhfInsuranceSaveReq = async (req, res) => {
  try {
    const { isrccCd, isrccNm, isrcRt, useYn, regrId, regrNm, modrId, modrNm } =
      req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      isrcRt,
      useYn,
      isrccCd,
      isrccNm,
      regrId,
      regrNm,
      modrId,
      modrNm,
    };
    const response = await axios.post(`${apiUrl}/saveBhfInsurance`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
const importItemSearchReq = async (req, res) => {
  try {
    const { lastReqDt } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      lastReqDt: lastReqDt,
    };
    const response = await axios.post(
      `${apiUrl}/selectImportItemList`,
      payload
    );
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
const importItemUpdateReq = async (req, res) => {
  try {
    const {
      taskCd,
      dclDe,
      itemSeq,
      hsCd,
      itemClCd,
      itemCd,
      imptItemsttsCd,
      remark,
      modrId,
      modrNm,
    } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      taskCd,
      dclDe,
      itemSeq,
      hsCd,
      itemClCd,
      itemCd,
      imptItemsttsCd,
      remark,
      modrId,
      modrNm,
    };
    const response = await axios.post(`${apiUrl}/updateImportItem`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
const trnsSalesSaveWrReq = async (req, res) => {
  try {
    const requestData = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      requestData,
    };
    const response = await axios.post(`${apiUrl}/saveTrnsSalesOsdc`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const trnsPurchaseSalesReq = async (req, res) => {
  try {
    const requestData = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      requestData,
    };
    const response = await axios.post(
      `${apiUrl}/selectTrnsPurchaseSalesList`,
      payload
    );
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const trnsPurchaseSaveReq = async (req, res) => {
  try {
    const requestData = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      requestData,
    };
    const response = await axios.post(`${apiUrl}/insertTrnsPurchase`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export default {
  initializeDevice,
  getCodeList,
  selectCustomerReq,
  noticeSearchReq,
  itemClsSearchReq,
  itemSaveReq,
  itemSearchReq,
  bhfSearchReq,
  bhfCustSaveReq,
  bhfUserSaveReq,
  bhfInsuranceSaveReq,
  importItemSearchReq,
  importItemUpdateReq,
  trnsSalesSaveWrReq,
  trnsPurchaseSalesReq,
  trnsPurchaseSaveReq,
};
