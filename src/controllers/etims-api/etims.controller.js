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
  }
};

const selectCustomerReq = async (req, res) => {
  try {
    const { custmTin } = req.body;
    const payload = {
      tin: "A123456789Z",
      bhfId: "00",
      cmckey: "hello",
      custmTin: custmTin,
    };
    const response = await axios.post(`${apiUrl}/selectCustomer`, payload);
    const data = response.data;
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error(error);
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
  }
};

export default {
  initializeDevice,
  getCodeList,
  selectCustomerReq,
  noticeSearchReq,
};
