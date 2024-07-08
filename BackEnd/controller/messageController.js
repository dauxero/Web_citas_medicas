import { Message } from "../model/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

//
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  //? will get the body values
  const { firstName, lastName, email, phone, message } = req.body;

  //? null value conditional / message errors
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  //? creation of column data, message table
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Send Successfully",
  });
});

//? estos mensajes solo se mostraran al admin
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
