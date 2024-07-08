
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";
const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | Medical Center"}
        imageUrl={"/signin.jpg"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
