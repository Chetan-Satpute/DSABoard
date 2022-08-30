import React, { FC } from "react";

const BounceBall: FC = () => {
  return (
    <div className="flex justify-center">
      <div className="h-3 w-3 my-12 mx-1 rounded-full bg-cyan-500 animate-loader" />
      <div className="h-3 w-3 my-12 mx-1 rounded-full bg-cyan-500 animate-loader animation-delay-200" />
      <div className="h-3 w-3 my-12 mx-1 rounded-full bg-cyan-500 animate-loader animation-delay-400" />
    </div>
  );
};

export default BounceBall;
