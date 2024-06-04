export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  //? como hay dos interfaces y tiene roles entonces creara un cookki de admin o de patient
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  //? lo que hace es dar un respuesta de 200, generar el token y cookkie y que tendra una
  //? expiracion de 7 dias
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
