type RenderFunction = () => Promise<void>;

class RenderQueue {

  private queue: RenderFunction[];
  private priorityQueue: RenderFunction[]; // For canvas event handlers

  constructor() {
    this.queue = [];
    this.priorityQueue = [];

    this.setLoop();
  }

  setLoop = async () => {

    while (true) {
      if (this.priorityQueue.length !== 0) {
        let priorityFunction = this.priorityQueue.shift();
        await priorityFunction();
      } else if (this.queue.length !== 0) {
        let renderFunction = this.queue.shift();
        await renderFunction();
      } else {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

  }

  push = (func: RenderFunction) => {
    this.queue.push(func);
  }

  priorityPush = (func: RenderFunction) => {
    this.priorityQueue.push(func);
  }
  
}

export default RenderQueue;
