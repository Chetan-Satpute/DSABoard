import React, { FC } from "react";
import CanvasIFrame from "../CanvasIFrame";
import SideBar from "../Sidebar";
import TitleBar from "../TitleBar";

const App: FC = () => {
  return (
    <div className="bg-neutral-900 h-screen w-screen flex flex-col md:flex-row">
      <div className="w-full h-2/3 md:w-2/3 md:h-full flex flex-col">
        <TitleBar />
        <CanvasIFrame />
      </div>

      <SideBar />
    </div>
  );
};

export default App;
