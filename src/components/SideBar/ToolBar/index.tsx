import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import useFullscreen from "../../../hooks/useFullscreen";

interface IProps {
  handleRun: () => void;
}

const ToolBar: FC<IProps> = ({ handleRun }) => {
  const [fullscreen, toggleFullscreen] = useFullscreen();
  const navigate = useNavigate();

  return (
    <div className="px-3 py-2 flex w-full">
      <Button
        lable="API Reference"
        icon="description"
        className="bg-blue-500 hover:bg-blue-700 rounded-l-md"
        onClick={() => navigate("/docs")}
      />

      <Button
        lable={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        icon={fullscreen ? "fullscreen_exit" : "fullscreen"}
        className="bg-violet-500 hover:bg-violet-700 border-l-2 border-r-2 border-l-neutral-200 border-r-neutral-200"
        onClick={toggleFullscreen}
      />

      <Button
        lable="Run"
        icon="play_arrow"
        className="bg-green-500 hover:bg-green-700 rounded-r-md"
        onClick={handleRun}
      />
    </div>
  );
};

interface ButtonProps {
  lable: string;
  icon: string;
  className: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ lable, icon, className, onClick }) => {
  return (
    <button
      className={`w-1/3 flex justify-center text-neutral-200 p-1 px-2 space-x-1 ${className}`}
      onClick={onClick}
    >
      <span className="font-semibold">{lable}</span>
      <span className="material-icons">{icon}</span>
    </button>
  );
};

export default ToolBar;
