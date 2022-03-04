import React, { FC } from "react";

interface IProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AlgoButton: FC<IProps> = ({ title, onClick }) => {
  return (
    <button
      className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default AlgoButton;
      // className="w-full my-1 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
