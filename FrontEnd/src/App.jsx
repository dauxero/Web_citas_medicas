import React, { useContext, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

//nota pages
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import { Context } from "./main";

//nota react toastify / mensajes de alerta o notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const App = () => {
  // nota creamos un context que traera los props
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  //nota Se establece el estado de autenticación como true obtiene los datos de lo contrario si es false dara un vacio
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* colocamos la posicion de donde va salir las notificaciones o alerta*/}
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
