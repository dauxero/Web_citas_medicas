import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../model/userSchema.js";

//nota funcion de creacion de patient registro
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

  res.status(200).json({
    success: true,
    message: "User Registered!",
  });
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

  res.status(200).json({
    success: true,
    message: "User Logged In Suu!",
  });
});
