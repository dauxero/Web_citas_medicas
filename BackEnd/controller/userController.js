import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../model/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

//nota funcion de creacion de patient rol registro
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
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

  //? validacion de null
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

  //? validacion de user en el email ya registrado
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered"), 400);
  }

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
  //? valides del body del form
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All Details!"), 400);
  }

  //? valides de password and confirm password coincidencia
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password do not match!", 400)
    );
  }

  //? email o password incorrecto
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password Or Email", 400));
  }

  //? comparacion de password la encriptad y de serie
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

  //? validacion de campos vacios
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

  //? creacion de admin
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

  res.status(200).json({
    success: true,
    message: "New Admin Registered",
  });
});
