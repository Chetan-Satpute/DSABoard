import Array from "..";
import Node from "../../Node";
import Color from "../../Node/Color";

const MergeSort = async (arr: Array) => {
  if (arr.length > 1) {
    let array = arr.array;

    const L = new Array();
    const R = new Array();

    let mid = Math.floor(array.length / 2);

    for (let i = 0; i < mid; i++) {
      L.push(array[i].value);
    }

    for (let i = mid; i < array.length; i++) {
      R.push(array[i].value);
    }

    L.moveTo(arr.box.x, arr.box.y + 2 * arr.box.height);
    R.moveTo(L.box.x + L.box.width + Node.WIDTH, L.box.y);

    arr.board.add(L, R);
    await arr.board.wait();

    await MergeSort(L);
    await MergeSort(R);

    await merge(arr, L, R);

    arr.board.remove(L, R);
  }
};

const merge = async (arr: Array, L: Array, R: Array) => {
  let array = arr.array;

  await arr.board.wait();

  for (let i = 0; i < arr.length; i++) {
    array[i].value = NaN;
    array[i].color = Color.Grey;
  }

  let i = 0;
  let j = 0;

  await arr.board.wait();

  for (let k = 0; k < array.length; k++) {

    if (i === L.length) {
      [array[k], R.array[j]] = [R.array[j], array[k]];
      j += 1;
    } else if (j === R.length) {
      [array[k], L.array[i]] = [L.array[i], array[k]];
      i += 1;
    } else {
      if (L.array[i].value < R.array[j].value) {
        [array[k], L.array[i]] = [L.array[i], array[k]];
        i += 1;
      } else {
        [array[k], R.array[j]] = [R.array[j], array[k]];
        j += 1;
      }
    }

    await arr.board.wait();
  }

  arr.board.remove(L, R);
};

export default MergeSort;
