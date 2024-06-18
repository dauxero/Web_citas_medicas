import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  //nota props context
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault;
  };
  return (
    <>
      <div className="container form-content register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
          ipsum accusamus maxime odio quam delectus, fugit laudantium
          reprehenderit voluptatibus iste animi aperiam nesciunt sit magni
          ullam, asperiores in omnis quod. adipisci ut hic.
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input type="text" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
