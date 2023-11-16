import express from "express";
import { config } from "dotenv";
import connectDb from "./config/db";

config();
const app = express();
const mongoose_url: any = process.env.MONGO_URL;

connectDb(mongoose_url);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running at port ${port}`));
