import React, { FC, useContext } from "react";
import { CodeContext } from "../../context/CodeContext";
import getSrcDoc from "./getSrcDoc";

const CanvasIFrame: FC = () => {
  const [code] = useContext(CodeContext);
  return <iframe className="flex-auto" srcDoc={getSrcDoc(code)}></iframe>;
};

export default CanvasIFrame;