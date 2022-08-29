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
    <div className="px-3 py-2 flex justify-between items-center">
      <Button
        lable="API Reference"
        icon="description"
        color="bg-blue-500 hover:bg-blue-700"
        onClick={() => navigate('/docs')}
      />

      <Button
        lable={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        icon={fullscreen ? "fullscreen_exit" : "fullscreen"}
        color="bg-violet-500 hover:bg-violet-700"
        onClick={toggleFullscreen}
      />

      <Button
        lable="Run"
        icon="play_arrow"
        color="bg-green-500 hover:bg-green-700"
        onClick={handleRun}
      />
    </div>
  );
};

interface ButtonProps {
  lable: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ lable, icon, color, onClick }) => {
  return (
    <button
      className={`flex text-neutral-200 p-1 px-2 rounded-md space-x-1 ${color}`}
      onClick={onClick}
    >
      <span className="font-semibold">{lable}</span>
      <span className="material-icons">{icon}</span>
    </button>
  );
};

export default ToolBar;