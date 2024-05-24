import express from "express";
import { sendMessage } from "../controller/messageController.js";

const router = express.Router();

//? creating the publication route and calling the message controller
router.post("/send", sendMessage);

export default router;
