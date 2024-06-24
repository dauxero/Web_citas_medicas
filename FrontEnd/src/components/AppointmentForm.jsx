import { useState } from "react";

const AppointmentForm = () => {
    //? estados
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  //? submit del formulario
  const handleApoointment = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appoinment</h2>
        <form onSubmit={handleApoointment}></form>
      </div>
    </>
  );
};

export default AppointmentForm;
