import React, { FC, useContext, useEffect, useState } from "react";
import { CodeContext } from "../../context/CodeContext";
import BounceBall from "../BouncingBall";
import getSrcDoc from "./getSrcDoc";

const CanvasIFrame: FC = () => {
  const [code] = useContext(CodeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(true), [code]);

  const loadingOffWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(false);
  };

  return (
    <div className="relative flex-auto flex">
      {loading && (
        <div className="absolute bg-neutral-900 top-0 left-0 h-full w-full flex justify-center items-center">
          <BounceBall />
        </div>
      )}

      <iframe
        className="flex-auto"
        srcDoc={getSrcDoc(code)}
        onLoad={loadingOffWithDelay}
      />
    </div>
  );
};

export default CanvasIFrame;
