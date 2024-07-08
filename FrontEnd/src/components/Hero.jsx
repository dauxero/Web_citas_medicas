import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container max-w-full ">
        <div className="banner">
          <h1>{title}</h1>
          <p className="text-[18px]">
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
            className="animated-image h-[250px] md:h-[400px]"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
