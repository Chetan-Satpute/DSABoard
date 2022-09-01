import Edge from "../Edge";
import Structure from "../Structure";
import Canvas from "./canvas";
import State from "./state";

class Board {
  container: HTMLDivElement;
  canvas: Canvas;

  /** Structures to draw on canvas */
  state: State;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.canvas = new Canvas(this.render);

    this.container.appendChild(this.canvas.canvas);
    this.resizeCanvas();

    // Resize canvas whenever container size changes
    new ResizeObserver(this.render).observe(this.container);

    this.state = new State();
  }

  /** Add a structure to board */
  add = (...args: Structure[]) => this.state.addStruct(...args);

  /** Remove a structure from board */
  remove = (...args: Structure[]) => this.state.removeStruct(...args);

  /** Add a edge to board */
  addEdge = (...args: Edge[]) => this.state.addEdge(...args);

  /** Remove a edge from board */
  removeEdge = (...args: Edge[]) => this.state.removeEdge(...args);

  resizeCanvas = () =>
    this.canvas.resize(this.container.clientWidth, this.container.clientHeight);

  render = () => {
    const ctx = this.canvas.canvas.getContext("2d");

    // To resize canvas
    // Also to clear canvas
    this.resizeCanvas();

    ctx.setTransform(this.canvas.matrix);

    // Draw logic
    this.state.draw(ctx);
  };
}

export default Board;
