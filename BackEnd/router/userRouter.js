import express from "express";
import {
  addNewAdmin,
  login,
  patientRegister,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addNewDoctor,
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
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
//? vista de todos los doctores
router.get("/doctors", getAllDoctors);

//? detaller de los usuario patient  o admin
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);

//? Desconexion de roles
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

//? agregar un doctor / el admin es el que agrega un doctor

export default router;
