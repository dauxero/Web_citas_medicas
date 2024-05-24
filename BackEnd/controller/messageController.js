import { Message } from "../model/messageSchema.js";

export const sendMessage = async (req, res, next) => {
  //? will get the body values
  const { firstName, lastName, email, phone, message } = req.body;

  //? null value conditional / message errors
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please Fill Full Form",
    });
  }

  //? creation of column data, message table
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Send Successfully",
  });
};
