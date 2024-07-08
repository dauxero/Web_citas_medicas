import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Appointment } from "../model/appointmentSchema.js";
import { User } from "../model/userSchema.js";

//nota crear una cita
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
    department,
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
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form! "), 400);
  }

  //? identificar el medico que exista
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  //? cuando no encuentra datos del doctor
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }
  //? Verifica si se encontraron múltiples documentos que coincidan con los criterios de búsqueda, lo que indica un conflicto porque se esperaba solo un doctor
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
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
    department,
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
    message: "Appointment Send Successfully!",
  });
});

//nota obtener todas las citas por medio del admin
export const gettAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

//nota actualizar el estado de la sita o datos

export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    //? validacion de que exista la cita por medio del id
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found", 400));
    }

    //? actualizar el body osea form
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Appoint Status Updated! ",
      appointment,
    });
  }
);

//nota deleted cita
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  //? validacion si no encuentra la cita
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found"), 400);
  }

  //? deleted de cita
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted",
  });
});
