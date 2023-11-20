import express from "express";
import { config } from "dotenv";
import connectDb from "./config/db.js";
import usersRouter from "./routes/users.route.js";
import companyRouter from "./routes/company.route.js";
import cors from "cors";
config();
const app = express();
app.use(express.json());
app.use(cors());

const mongoose_url = process.env.MONGO_URL;

connectDb(mongoose_url);

const port = process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is live...." });
});

app.use("/api/user", usersRouter);
app.use("/api/company", companyRouter);

app.listen(port, () => console.log(`Server is running at port ${port}`));
