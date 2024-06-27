import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../model/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

//nota funcion de creacion de patient rol registro
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  //? extraccion de datos
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
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  //? validacion de user creado por email registrado
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  //? creacion del usuario / si no existe crea un nuevo usuario y genera un token
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Patient",
    nic,
  });
  generateToken(user, "User Registered!", 200, res);
});

//nota funcion de iniciar sesion

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  //? validacion de campos
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Form!"), 400);
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
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  //? Comparación de contraseñas del bd
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  //? validacion de rol
  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }

  generateToken(user, "User Login Successfully!", 200, res);
});

//nota creacion de admin rol
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
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
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  //? si el email esta utilziado
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  //? creacion de admin / especificando que el role seria admin
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });

  //? respuesta
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

//? get de mostrar si hay un doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

//nota  get de mostar la informacion de los usuarios tanto como patient y admin
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  //auth
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//nota desconexion de usuario / eliminacion de tokens admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully",
    });
});

//? desconexion de patient / eliminacion del token de patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully",
    });
});

//nota agregar un nuevo doctor
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  // cuando no recibe un archivo o un objeto que sea v-0
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required", 400));
  }

  const { docAvatar } = req.files;

  //? validacion de formato de imagen
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported"), 400);
  }

  //? validacion de campos vacios
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    nic,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !nic ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Provide Full Details! "), 400);
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    new ErrorHandler(
      `${isRegistered.role} Already Registered with this email!`,
      400
    );
  }

  //? validacion de carga archivo cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknow Cloudinary Error"
    );
  }

  //? creacion de doctor json
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});
