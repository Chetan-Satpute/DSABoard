import Array from "..";
import Color from "../../Node/Color";

const BubbleSort = async (arr: Array) => {
  let changed = true;
  let array = arr.array;

  while (changed) {
    changed = false;

    for (let i = 1; i < array.length; i++) {
      array[i].color = Color.Blue;
      array[i - 1].color = Color.Grey;

      await arr.board.wait();

      if (array[i].value < array[i - 1].value) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        changed = true;

        await arr.board.wait();
      }

      array[i].color = Color.Transparent;
      array[i - 1].color = Color.Transparent;

      await arr.board.wait();
    }
  }
};

export default BubbleSort;
