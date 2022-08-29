import React, { FC } from "react";

interface IProps {
  handleRun: () => void;
}

const ToolBar: FC<IProps> = ({ handleRun }) => {
  return (
    <div className="px-3 py-2 flex justify-between items-center">
      <Button
        lable="API Reference"
        icon="description"
        color="bg-blue-500 hover:bg-blue-700"
        onClick={handleRun}
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
      className={`flex text-neutral-200 p-1 px-2 rounded-md ${color}`}
      onClick={onClick}
    >
      <span className="font-semibold">{lable}</span>
      <span className="material-icons">{icon}</span>
    </button>
  );
};

export default ToolBar;
