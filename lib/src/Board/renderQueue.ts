type RenderFunction = () => Promise<void>;

class RenderQueue {

  private queue: RenderFunction[];

  constructor() {
    this.queue = [];
  }

  renderAll = async () => {
    for (let i = 0; i < this.queue.length; i++) {
      await this.queue[i]();
    }

    this.queue = [];
  }

  push = (func: RenderFunction) => {
    this.queue.push(func);
  }
}

export default RenderQueue;
