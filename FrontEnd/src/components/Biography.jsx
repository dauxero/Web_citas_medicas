import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography max-w-full">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner justify-center">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
            consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
          </p>
          <p>We are working React.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            assumenda exercitationem accusamus sit repellendus quo optio dolorum
            corporis corrupti. Quas similique vel minima veniam tenetur
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
