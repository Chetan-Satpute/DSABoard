type RenderFunction = () => Promise<void>;
type PriorityFunction = () => void;

class RenderQueue {

  private queue: RenderFunction[];
  private priorityQueue: PriorityFunction[]; // For canvas event handlers

  constructor() {
    this.queue = [];
    this.priorityQueue = [];

    this.setLoop();
  }

  setLoop = async () => {

    while (true) {
      await new Promise(resolve => window.requestAnimationFrame(resolve));

      if (this.priorityQueue.length !== 0) {
        let priorityFunction = this.priorityQueue.shift();
        priorityFunction();
      } else if (this.queue.length !== 0) {
        let renderFunction = this.queue.shift();
        await renderFunction();
      }
    }

  }

  push = (func: RenderFunction) => {
    this.queue.push(func);
  }

  priorityPush = (func: PriorityFunction) => {
    this.priorityQueue.push(func);
  }
  
}

export default RenderQueue;
