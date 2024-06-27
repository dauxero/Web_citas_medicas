import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { User } from "../model/userSchema.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

//nota funcion de autentificacion de Admin
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;

  //? autentificacion de token
  if (!token) {
    return next(new ErrorHandler("Dashboard User is not authenticated!", 400));
  }

  //?verificacion si el toque es generado por medio del sitio
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //? se obtiene el id por medio del metodo generaciontoken / si no cumple niega la autorizacion
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resources!`,
        403
      )
    );
  }

  next();
});

export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;

    //? autentificacion de token
    if (!token) {
      return next(new ErrorHandler("Patient Not Authenticated"), 400);
    }

    //?Decodificación y verificación del token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //? Obtención del usuario a partir del ID decodificado
    req.user = await User.findById(decoded.id);
    //? Verificación del rol del usuario
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resources!`,
          403
        )
      );
    }

    next();
  }
);

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};
