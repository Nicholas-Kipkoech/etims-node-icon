import express from "express";
import { config } from "dotenv";

import usersRouter from "./routes/users.route.js";
import companyRouter from "./routes/company.route.js";
import cors from "cors";
import etimsAPIRouter from "./routes/etims/etims.route.js";
import { connectToDb } from "./config/db.js";

config();
connectToDb();
const app = express();
app.use(express.json());
app.use(cors());

const mongoose_url = process.env.MONGO_URL;

const port = process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is live...." });
});

app.use("/api/user", usersRouter);
app.use("/api/company", companyRouter);
app.use("/api/etims", etimsAPIRouter);

app.listen(port, () => console.log(`Server is running at port ${port}`));
