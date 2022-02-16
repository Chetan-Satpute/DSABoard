import PriorityQueue from ".";
import { pause } from "../../utils/animation";
import board from "../Board";
import Color from "../Colors";
import Heap from "../Heap";

export async function MinHeapify(heap: PriorityQueue, i: number = 0) {
  let smallest = i;

  heap.array[i].color = Color.Cyan;
  await board.draw();
  await pause();

  if (Heap.LEFT(i) < heap.array.length) {
    heap.array[Heap.LEFT(i)].color = Color.Violet;
    await board.draw();
    await pause();
    if (heap.array[Heap.LEFT(i)].value < heap.array[smallest].value) {
      smallest = Heap.LEFT(i);
    } else {
      heap.array[Heap.LEFT(i)].color = Color.Transparent;
      await board.draw();
      await pause();
    }
  }

  if (Heap.RIGHT(i) < heap.array.length) {
    heap.array[Heap.RIGHT(i)].color = Color.Violet;
    await board.draw();
    await pause();
    if (heap.array[Heap.RIGHT(i)].value < heap.array[smallest].value) {
      smallest = Heap.RIGHT(i);
      
      heap.array[Heap.LEFT(i)].color = Color.Transparent;
      await board.draw();
      await pause();
    } else {
      heap.array[Heap.RIGHT(i)].color = Color.Transparent;
      await board.draw();
      await pause();
    }
  }

  if (smallest !== i) {
    [heap.array[i].value, heap.array[smallest].value] = [
      heap.array[smallest].value,
      heap.array[i].value,
    ];

    heap.array[i].color = Color.Violet;
    heap.array[smallest].color = Color.Cyan;
    await board.draw();
    await pause();

    heap.array[i].color = Color.Transparent;
    await board.draw();
    await pause();

    await MinHeapify(heap, smallest);

    heap.array[smallest].color = Color.Transparent;
    await board.draw();
    await pause();
  }
}
