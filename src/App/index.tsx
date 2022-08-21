import React, { FC, useState } from "react";
import Canvas from "../Canvas";
import Board from "../lib/Board";
import SideBar from "../Sidebar";
import TitleBar from "../TitleBar";

const App: FC = () => {
  const [board] = useState(new Board());

  return (
    <div className="bg-neutral-900 h-screen w-screen flex flex-col md:flex-row">
      <div className="w-full h-2/3 md:w-2/3 md:h-full flex flex-col">
        <TitleBar />
        <Canvas init={board.init} />
      </div>

      <SideBar board={board} />

    </div>
  );
};

export default App;
