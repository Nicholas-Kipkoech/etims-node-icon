import express from "express";
import { config } from "dotenv";
import http from "http";
import { Server } from "socket.io";
import usersRouter from "./routes/users.route.js";
import cors from "cors";
import etimsAPIRouter from "./routes/etims/etims.route.js";
import { connectToDb } from "./config/db.js";
import organizationRouter from "./routes/organization.route.js";

config();
connectToDb();
const app = express();

app.use(express.json());

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`Server is running at port ${port}`)
);

const io = new Server(server, {
  serveClient: true,
  cors: {
    origin: "*",
  },
  methods: ["GET", "POST"],
  // other options...
});

io.on("connection", (socket) => {
  console.log("A user connected..");

  socket.on("notification", (notification) => {
    io.emit("notification", notification);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is live...." });
});

app.use("/api/user", usersRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/etims", etimsAPIRouter);

export { io };
