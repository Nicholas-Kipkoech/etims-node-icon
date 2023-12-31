import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  custTin: { type: String, required: false },
  custMblNo: { type: String, default: null },
  rcptPbctDt: { type: String, required: true },
  trdeNm: { type: String, default: null },
  adrs: { type: String, default: null },
  topMsg: { type: String, default: null },
  btmMsg: { type: String, default: null },
  prchrAcptcYn: { type: String, default: "N" },
});

const itemSchema = new mongoose.Schema({
  itemSeq: { type: Number, required: true },
  itemCd: { type: String },
  itemClsCd: { type: String, required: true },
  itemNm: { type: String, required: true },
  bcd: { type: String, default: null },
  pkgUnitCd: { type: String, required: true },
  pkg: { type: Number, required: true },
  qtyUnitCd: { type: String, required: true },
  qty: { type: Number, required: true },
  prc: { type: Number, required: true },
  splyAmt: { type: Number, required: true },
  dcRt: { type: Number, default: 0 },
  dcAmt: { type: Number, default: 0 },
  isrccCd: { type: String, default: null },
  isrccNm: { type: String, default: null },
  isrcRt: { type: Number, default: null },
  isrcAmt: { type: Number, default: null },
  taxTyCd: { type: String, required: true },
  taxblAmt: { type: Number, required: true },
  taxAmt: { type: Number, required: true },
  totAmt: { type: Number, required: true },
});

const transactionSchema = mongoose.Schema({
  transactionID: { type: String },
  company: { type: mongoose.Types.ObjectId, ref: "Company" },
  trdInvcNo: { type: String, required: true },
  invcNo: { type: Number, required: true },
  orgInvcNo: { type: Number, required: true },
  custTin: { type: String },
  custNm: { type: String },
  rcptTyCd: { type: String, required: true },
  pmtTyCd: { type: String },
  salesSttsCd: { type: String, required: true },
  cfmDt: { type: String, required: true },
  salesDt: { type: String, required: true },
  stockRlsDt: { type: String },
  cnclReqDt: { type: String },
  cnclDt: { type: String },
  rfdDt: { type: String },
  rfdRsnCd: { type: String },
  totItemCnt: { type: Number, required: true },
  taxblAmtA: { type: Number, required: true },
  taxblAmtB: { type: Number, required: true },
  taxblAmtC: { type: Number, required: true },
  taxblAmtD: { type: Number, required: true },
  taxblAmtE: { type: Number, required: true },
  taxRtA: { type: Number, required: true },
  taxRtB: { type: Number, required: true },
  taxRtC: { type: Number, required: true },
  taxRtD: { type: Number, required: true },
  taxRtE: { type: Number, required: true },
  taxAmtA: { type: Number, required: true },
  taxAmtB: { type: Number, required: true },
  taxAmtC: { type: Number, required: true },
  taxAmtD: { type: Number, required: true },
  taxAmtE: { type: Number, required: true },
  totTaxblAmt: { type: Number, required: true },
  totTaxAmt: { type: Number, required: true },
  totAmt: { type: Number, required: true },
  prchrAcptcYn: { type: String, required: true },
  remark: { type: String },
  regrId: { type: String, required: true },
  regrNm: { type: String, required: true },
  modrId: { type: String, required: true },
  modrNm: { type: String, required: true },
  receipt: { type: receiptSchema, default: {} },
  itemList: [itemSchema],
});

const transactionResponse = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "CompanyUser" },
  company: { type: mongoose.Types.ObjectId, ref: "Company" },
  transactionID: { type: String },
  resultCd: { type: String },
  resultMsg: { type: String },
  resultDt: { type: String },
  intrlData: { type: String },
  rcptSign: { type: String },
  sdcDateTime: { type: String },
});

const companyEtimsDetails = new mongoose.Schema({
  companyID: { type: String },
  kraPIN: { type: String },
  branchId: { type: String },
  taxPayerName: { type: String },
  managerName: { type: String },
  branchName: { type: String },
  cmcKey: { type: String },
  deviceId: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const apiLogSchema = new mongoose.Schema({
  request_type: String,
  request: String,
  status: String,
  created_at: { type: Date, default: Date.now() },
});

const BIMAtransactionSchema = new mongoose.Schema({
  requestID: String,
  request: String,
  message: String,
  response: String,
  created_at: { type: Date, default: Date.now() },
});

const TxResponse = mongoose.model("TxResponse", transactionResponse);
const Transactions = mongoose.model("Transactions", transactionSchema);
const CompanyDetails = mongoose.model("CompanyDetails", companyEtimsDetails);
const BimaTransaction = mongoose.model(
  "BimaTransaction",
  BIMAtransactionSchema
);

const ApiLog = mongoose.model("ApiLog", apiLogSchema);

export default {
  Transactions,
  TxResponse,
  CompanyDetails,
  ApiLog,
  BimaTransaction,
};
