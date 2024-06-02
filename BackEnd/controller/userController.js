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