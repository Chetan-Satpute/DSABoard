import Array from "..";
import Color from "../../Node/Color";

const InsertionSort = async (arr: Array) => {
  let array = arr.array;

  for (let i = 0; i < array.length; i++) {
    array[i].color = Color.Orange;
  }

  for (let i = 1; i < array.length; i++) {
    array[i].color = Color.Blue;
    await arr.board.wait();

    let j = i;
    for (j = i; j > 0; j--) {
      
      array[j - 1].color = Color.Grey;
      await arr.board.wait();

      if (array[j].value < array[j - 1].value) {

        // Swap nodes
        [array[j], array[j - 1]] = [array[j - 1], array[j]];

        await arr.board.wait();

        array[j].color = Color.Transparent;
      } else {
        array[j - 1].color = Color.Transparent;
        break;
      }
    }

    await arr.board.wait();
    array[j].color = Color.Transparent;
  }
};

export default InsertionSort;
