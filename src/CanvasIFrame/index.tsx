import React, { FC } from "react";
import getSrcDoc from "./getSrcDoc";

const CanvasIFrame: FC = () => {
  return <iframe className="flex-auto" srcDoc={getSrcDoc("")}></iframe>;
};

export default CanvasIFrame;
