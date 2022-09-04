import Array from '..';
import Color from '../../Node/Color';

const QuickSort = async (arr: Array) => {
  await _quicksort(arr, 0, arr.length - 1);

  for (let i = 0; i < arr.length; i++) {
    arr.array[i].color = Color.Transparent;
  }
}

const _quicksort = async (arr: Array, l: number, r: number) => {
  if (l === r) {
    arr.array[l].color = Color.Green;
    await arr.board.wait();
  }

  if (l < r) {
    let pos = await partition(arr, l, r);

    arr.array[pos].color = Color.Green;
    await arr.board.wait();

    await _quicksort(arr, l, pos - 1);
    await _quicksort(arr, pos + 1, r);
  }
}

const partition = async (arr: Array, l: number, r: number) => {
  const array = arr.array;

  array[r].color = Color.Grey;
  await arr.board.wait();

  let i = l - 1, j = l;
  for (i = l - 1, j = l; j < r; j++) {
    array[j].color = Color.Blue;
    await arr.board.wait();

    if (array[j].value < array[r].value) {
      [array[j], array[i + 1]] = [array[i + 1], array[j]];
      i += 1;

      array[i].color = Color.Purple;
    } else {
      array[j].color = Color.Orange;
    }
  }

  await arr.board.wait();

  [array[i + 1], array[r]] = [array[r], array[i + 1]];
  i += 1;

  await arr.board.wait();

  for (let k = l; k <= r; k++) {
    array[k].color = Color.Transparent;
  }

  return i;
}

export default QuickSort;
