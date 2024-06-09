import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";

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

//nota Analiza solicitudes entrantes con cargas útiles codificadas en URL y se basa en un analizador de cuerpo.
app.use(express.urlencoded({ extended: true }));

//nota fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//nota api url of message, user table - post
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

//nota connection database mongodb
dbConnection();

//
app.use(errorMiddleware);

export default app;
