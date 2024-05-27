import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../model/userSchema.js";
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dbo,
    gender,
    password,
    role,
    doctorDeparment,
    docAvatar,
    nic,
  } = req.body;

  //? validacion de null
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dbo ||
    !gender ||
    !password ||
    !role ||
    !doctorDeparment ||
    !docAvatar ||
    !nic
  ) {
    return next(new ErrorHandler("Please Fill Full Form!"), 400);
  }

  //? validacion de user en el email ya registrado
  let User = await User.findOne({ email });
  if (User) {
    return next(new ErrorHandler("User Already Registered"), 400);
  }

  User = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dbo,
    gender,
    password,
    role,
    doctorDeparment,
    docAvatar,
    nic,
  });

  res.status(200).json({
    success: true,
    message: "User Registered!",
  });
});
