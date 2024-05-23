import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
config({ path: "./config/config.env" });

//?cors frontend and admin managet
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//? cors cookies
app.use(cookieParser());

//? analysis format json
app.use(express.json());

//? It parses incoming requests with URL-encoded payloads and is based on a body parser
app.use(express.urlencoded({ extended: true }));

//? fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

dbConnection();

export default app;
