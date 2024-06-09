import express from "express";
import {
  addNewAdmin,
  login,
  patientRegister,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
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

//? get all doctors
router.get("/doctors", getAllDoctors);

//? user details
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
export default router;
