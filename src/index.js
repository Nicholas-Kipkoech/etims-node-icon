import express from "express";
import { config } from "dotenv";
import usersRouter from "./routes/users.route.js";
import cors from "cors";
import etimsAPIRouter from "./routes/etims/etims.route.js";
import { connectToDb } from "./config/db.js";
import organizationRouter from "./routes/organization.route.js";
import businessRouter from "./routes/business.route.js";

config();
connectToDb();
const app = express();

app.use(express.json());

app.use(cors());
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running at port ${port}`));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is live...." });
});

app.use("/api/user", usersRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/etims", etimsAPIRouter);
app.use("/api/business", businessRouter);
