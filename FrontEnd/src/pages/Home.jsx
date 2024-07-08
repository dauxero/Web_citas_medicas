import React from "react";

//nota componentes
import Hero from "../components/Hero";
import Departments from "../components/Departments";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to a Medical center | Medical Clinic"}
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/biography.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
