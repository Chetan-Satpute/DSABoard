import React, { useContext, useState } from "react";
import { CodeContext } from "../../context/CodeContext";
import Editor from "../Editor";
import ToolBar from "./ToolBar";

function SideBar() {
  const [editorValue, setEditorValue] = useState("// Hello World!");
  const [_, setCode] = useContext(CodeContext);

  const handleRun = () => {
    setCode(editorValue);
  };

  return (
    <div
      className={`
        w-full h-1/3 md:w-1/2 md:h-full 
        border-t-2 border-neutral-200 
        md:border-t-transparent 
        md:border-l-neutral-200 
        md:border-l-2 
        flex flex-col 
        space-y-2 
        bg-[#1e1e1e]
      `}
    >
      <ToolBar handleRun={handleRun} />
      <Editor onChange={setEditorValue} />
    </div>
  );
}

export default SideBar;
