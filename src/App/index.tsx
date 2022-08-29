import React, { FC, useState } from "react";
import CanvasIFrame from "../CanvasIFrame";
import SideBar from "../Sidebar";
import TitleBar from "../TitleBar";

export const CodeContext = React.createContext<[string, (_: string) => void]>([
  "",
  () => {},
]);

const App: FC = () => {
  const codeState = useState("");

  return (
    <CodeContext.Provider value={codeState}>
      <div className="bg-neutral-900 h-screen w-screen flex flex-col md:flex-row">
        <div className="w-full h-2/3 md:w-1/2 md:h-full flex flex-col">
          <TitleBar />
          <CanvasIFrame />
        </div>

        <SideBar />
      </div>
    </CodeContext.Provider>
  );
};

export default App;
