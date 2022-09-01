import Structure from "../Structure";
import Canvas from "./canvas";

class Board {
  container: HTMLDivElement;
  canvas: Canvas;

  /** Structures to draw on canvas */
  state: {
    structs: { [id: number]: Structure };
  };
  currentId: number;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.canvas = new Canvas(this.render);

    this.container.appendChild(this.canvas.canvas);
    this.resizeCanvas();

    // Resize canvas whenever container size changes
    new ResizeObserver(this.render).observe(this.container);

    this.currentId = 0;
    this.state = {
      structs: {},
    };
  }

  /** Get unique ID */
  getID = () => this.currentId++;

  /** Add a structure to board */
  add = (...args: Structure[]) => {
    for (let struct of args) {
      struct._id = this.getID();
      this.state.structs[struct._id] = struct;
    }
  };

  /** Remove a structure from board */
  remove = (...args: Structure[]) => {
    for (let struct of args) {
      if (this.state.structs[struct._id] !== undefined) {
        delete this.state.structs[struct._id];
      }
    }
  };

  resizeCanvas = () => {
    this.canvas.resize(this.container.clientWidth, this.container.clientHeight);
  };

  render = () => {
    const ctx = this.canvas.canvas.getContext("2d");

    // To resize canvas
    // Also to clear canvas
    this.resizeCanvas();

    ctx.setTransform(this.canvas.matrix);

    // Draw logic
    for (let id in this.state.structs) {
      this.state.structs[id].draw(ctx);
    }
  };
}

export default Board;
