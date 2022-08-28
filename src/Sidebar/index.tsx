import React, { FC } from "react";

const SideBar: FC = () => {
  return (
    <div className="w-full h-1/3 md:w-1/3 md:h-full p-2 bg-neutral-800 border-t-2 border-neutral-200 md:border-t-transparent md:border-l-2 md:border-l-neutral-200">
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
