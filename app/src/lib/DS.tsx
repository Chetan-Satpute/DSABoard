import React, { FC } from "react";
import { Link } from "react-router-dom";

enum DS {
  NodeArray = "Node Array",
  BinarySearchTree = "Binary Search Tree",
  MaxHeap = "Max Heap",
  PriorityQueue = "Priority Queue"
}

export const DSList: FC = () => {
  const list = Object.entries(DS);
  const buttonList = list.map(([key, value], index) => (
    <Link key={key} to={`/${value.split(" ").join("-")}`}>
      <button className="text-white w-full my-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        {value}
      </button>
    </Link>
  ));

  return <div className="mt-2">{buttonList}</div>;
};

export default DS;
