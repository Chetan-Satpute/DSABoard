import React, { FC, useState } from "react";
import CanvasIFrame from "../../components/CanvasIFrame";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";
import { CodeContext } from "../../context/CodeContext";

const App: FC = () => {
  const codeState = useState("");

  return (
    <CodeContext.Provider value={codeState}>
      <div className="bg-neutral-900 h-screen w-screen flex">
        <div className="w-1/2 flex flex-col">
          <TitleBar />
          <CanvasIFrame />
        </div>

        <SideBar />
      </div>
    </CodeContext.Provider>
  );
};

export default App;
