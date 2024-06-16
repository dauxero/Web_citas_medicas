import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container  max-w-full ">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Quo quae dolores voluptatibus id incidunt repellat veritatis
            laborum, libero velit pariatur eum, quibusdam quisquam fugiat magni
            amet? Modi debitis, soluta accusamus laborum veniam eaque ipsa
            cupiditate a omnis repellat! Odit quidem ut ipsa aspernatur
            cupiditate iusto quod distinctio, voluptate quasi natus eum
            quibusdam numquam sapiente iure tenetur magni facilis molestias
            quaerat consectetur tempore nam rem, vitae eos voluptatem. Tempora.
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
