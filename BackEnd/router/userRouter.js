import express from "express";
import {
  addNewAdmin,
  login,
  patientRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

//?post de registro de patient
router.post("/patient/register", patientRegister);

//?post de validacion de login controller
router.post("/login", login);

//?Post de registro de Admin / auth token
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
export default router;
