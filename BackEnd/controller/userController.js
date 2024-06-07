import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../model/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

//nota funcion de creacion de patient rol registro
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  //? extraccion de datos
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
    nic,
  } = req.body;

  //? validacion de campos
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!"), 400);
  }

  //? validacion de user creado por email registrado
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered"), 400);
  }

  //? creacion del usuario / si no existe crea un nuevo usuario y genera un token
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
    nic,
  });
  generateToken(user, "User Registered!", 200, res);
});

//nota funcion de iniciar sesion

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  //? validacion de campos
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All Details!"), 400);
  }

  //? Verificación de coincidencia de contraseñas
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password do not match!", 400)
    );
  }

  //? Verificación de usuario existente
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password Or Email", 400));
  }

  //? Comparación de contraseñas del bd
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password Or Email", 400));
  }

  //? validacion de rol
  if (role !== user.role) {
    return next(new ErrorHandler("User With This Tole Not Found", 400));
  }

  generateToken(user, "User Login Successfully!", 200, res);
});

//nota creacion de admin rol
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password, nic } =
    req.body;

  //? validacion de campos
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!"), 400);
  }

  //? si el email esta utilziado
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`)
    );
  }

  //? creacion de admin / especificando que el role seria admin
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    nic,
    role: "Admin",
  });

  //? respuesta
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});
