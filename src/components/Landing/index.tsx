import React, { FC } from "react";
import BounceBall from "../BouncingBall";

const Landing: FC = () => {
  return (
    <div className="h-screen w-screen bg-neutral-900 flex justify-center items-center">
      <BounceBall />
    </div>
  );
};

export default Landing;
