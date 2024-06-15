import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Appointment } from "../model/appointmentSchema.js";
import { User } from "../model/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    deparment,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  //? validacion de campos form
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !deparment ||
    !doctor_firstName ||
    !doctor_lastName ||
    !hasVisited ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form! "), 400);
  }

  //? identificar el medico que exista
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: deparment,
  });
  //? cuando no encuentra datos del doctor
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not Found"), 400);
  }
  //? Verifica si se encontraron múltiples documentos que coincidan con los criterios de búsqueda, lo que indica un conflicto porque se esperaba solo un doctor
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!"
      ),
      400
    );
  }

  //? obtener los id de doctor y patient
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  //? crear
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    deparment,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Sent Success",
  });
});
