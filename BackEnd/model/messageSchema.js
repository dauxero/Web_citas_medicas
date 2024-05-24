import mongoose from "mongoose";
import validator from "validator";

//? create table messageChame  and columns

//NOTA el phone coloca el tipo string para validar que sea de 11 caracteres por eso no se pone number
const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
    maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message Must Contain At Least 10 characters!"],
  },
});

//? export variable message = name table, function create columns model from the table Message
export const Message = mongoose.model("Message", messageSchema);
