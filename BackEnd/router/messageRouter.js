import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

//? creating the publication route and calling the message controller
router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);
export default router;
