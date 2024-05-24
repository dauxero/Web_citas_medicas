import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";

const app = express();
config({ path: "./config/config.env" });

//nota cors frontend and admin managet
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//nota cors cookies
app.use(cookieParser());

//nota analysis format json
app.use(express.json());

//nota It parses incoming requests with URL-encoded payloads and is based on a body parser
app.use(express.urlencoded({ extended: true }));

//nota fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//nota
app.use("/api/v1/message", messageRouter);

//nota connection database mongodb
dbConnection();

export default app;
