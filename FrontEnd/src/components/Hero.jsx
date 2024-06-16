import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container  max-w-full ">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis architecto voluptatum, quisquam maxime explicabo fuga
            aperiam ratione quo perferendis eaque cum excepturi eum. Officiis,
            saepe! Saepe aut adipisci autem quisquam. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Reprehenderit quae omnis
            assumenda dignissimos soluta, quia
          </p>
        </div>
        <div className="banner ">
          <img
            src={imageUrl}
            alt="hero"
            className="animated-image h-[250px] sm:h-[600px]"
          />
          <span>
            <img src="/vector.png" alt="vector" className="md:w-[600px] " />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
