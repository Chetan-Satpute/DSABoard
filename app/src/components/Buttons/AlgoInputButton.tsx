import React, { FC, useState } from "react";

interface IProps {
  title: string;
  onClick: (value: any) => Promise<void>;
}

const AlgoInputButton: FC<IProps> = ({ title, onClick }) => {
  const [searchValue, setSearchValue] = useState(0);

  return (
    <div className="flex items-center justify-between my-2">
      <input
        className="shadow flex-shrink appearance-none w-1/3 border mr-2 py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
        type="string"
        placeholder="Value to Search"
        value={searchValue}
        onChange={(e) => setSearchValue(+e.target.value)}
      />

      <button
        className="w-2/3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2 "
        onClick={() => onClick(searchValue)}
      >
        {title}
      </button>
    </div>
  );
};

export default AlgoInputButton;
        // className="my-1 font-semibold flex-auto w-2/3 leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
