import express from "express";
import { login, patientRegister } from "../controller/userController.js";

const router = express.Router();

//?post de registro de patient
router.post("/patient/register", patientRegister);

//?post de validacion de login controller
router.post("/login", login);
export default router;
