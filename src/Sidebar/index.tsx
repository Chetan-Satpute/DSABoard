import React, { FC } from "react";
import type Board from "../lib/Board";

interface IProps {
  board: Board;
}

const SideBar: FC<IProps> = ({ board }) => {
  return (
    <div className="w-full h-1/3 md:w-1/3 md:h-full bg-neutral-800">
      <button
        className="bg-violet-500 rounded-md p-2 w-full"
        onClick={async () => {}}
      >
        Click Here!
      </button>
    </div>
  );
};

export default SideBar;
