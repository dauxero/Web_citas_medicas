export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  //? asignacion del tipo de cookie
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  //? expiracion de 7 dias
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
