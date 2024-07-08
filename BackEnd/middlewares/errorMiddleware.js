//? manejador de errores

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//? manejador de errores especificos

export const errorMiddleware = (err, req, res, next) => {
  //?Asignación de valores por defecto
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  //? Error de duplicados en MongoDB
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //? errores de jwt
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid, Try Again!";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpired") {
    const message = "Json Web Token is Expired, Try Again!";
    err = new ErrorHandler(message, 400);
  }

  //? Error de conversión de Mongoose
  if (err.name === "CastError") {
    const message = `'Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //? Construcción del mensaje de error
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  //?respuesta al cliente
  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
