import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//nota pages
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";

//nota react toastify / mensajes de alerta o notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* colocamos la posicion de donde va salir las notificaciones o alerta*/}
        <ToastContainer position='top-center' />
      </Router>
    </>
  );
};

export default App;
