import express from "express";
import { config } from "dotenv";
import connectDb from "./config/db";
import usersRouter from "./routes/users.route.ts";
import companyRouter from "./routes/company.route.ts";

config();
const app = express();
app.use(express.json());
const mongoose_url: any = process.env.MONGO_URL;

connectDb(mongoose_url);

const port = process.env.PORT;

app.use("/api/user", usersRouter);
app.use("/api/company", companyRouter);

app.listen(port, () => console.log(`Server is running at port ${port}`));
