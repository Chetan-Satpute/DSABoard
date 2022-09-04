import Array from "..";
import Color from "../../Node/Color";

const SelectionSort = async (arr: Array) => {
  let array = arr.array;

  for (let i = 0; i < array.length; i++) {
    let nodeIndex = i;

    array[i].color = Color.Blue;
    await arr.board.wait();

    for (let j = i + 1; j < array.length; j++) {
      array[j].color = Color.Grey;
      await arr.board.wait();

      if (array[j].value < array[nodeIndex].value) {
        if (nodeIndex !== i) {
          array[nodeIndex].color = Color.Transparent;
        }

        nodeIndex = j;

        array[nodeIndex].color = Color.Green;
        await arr.board.wait();
      } else {
        array[j].color = Color.Transparent;
      }
    }

    await arr.board.wait();
    [array[i], array[nodeIndex]] = [array[nodeIndex], array[i]];
    await arr.board.wait();

    array[i].color = Color.Green;

    if (nodeIndex !== i) {
      array[nodeIndex].color = Color.Transparent;
    }
  }

  await arr.board.wait();

  for (let i = 0; i < arr.length; i++) {
    array[i].color = Color.Transparent;
  }
}

export default SelectionSort;
