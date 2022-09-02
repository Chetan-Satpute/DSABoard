import Edge from "../Edge";
import Structure from "../Structure";
import Canvas from "./canvas";
import RenderQueue from "./renderQueue";
import State from "./state";

export type RenderFunction = (func: () => Promise<void>) => void;
export type DrawFunction = () => void;

class Board {
  container: HTMLDivElement;
  canvas: Canvas;

  /** Structures to draw on canvas */
  state: State;
  renderQueue: RenderQueue;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.canvas = new Canvas(this.priorityRender, this.draw);

    this.container.appendChild(this.canvas.canvas);
    this.resizeCanvas();

    // Resize canvas whenever container size changes
    new ResizeObserver(this.draw).observe(this.container);

    this.state = new State();
    this.renderQueue = new RenderQueue();
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

  draw = () => {
    const ctx = this.canvas.canvas.getContext("2d");

    // To resize canvas
    // Also to clear canvas
    this.resizeCanvas();

    ctx.setTransform(this.canvas.matrix);

    // Draw logic
    this.state.draw(ctx);
  };

  render = (func: () => Promise<void>) => {
    this.renderQueue.push(func);
  };

  priorityRender = (func: () => Promise<void>) => {
    this.renderQueue.priorityPush(func);
  };
}

export default Board;
