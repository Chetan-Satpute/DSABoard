import Edge from "../Edge";
import Structure from "../Structure";
import Canvas from "./canvas";
import RenderQueue from "./renderQueue";

export type RenderFunction = (func: () => Promise<void>) => void;
export type DrawFunction = () => Promise<void>;

class Board {
  container: HTMLDivElement;
  canvas: Canvas;

  /** Structures to draw on canvas */
  renderQueue: RenderQueue;

  private structs: {
    [id: number]: Structure;
  };

  private edges: {
    [id: number]: Edge;
  };

  private newStructId: number;
  private newEdgeId: number;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.canvas = new Canvas(this.priorityRender, this.draw);

    this.container.appendChild(this.canvas.canvas);
    this.resizeCanvas();

    // Resize canvas whenever container size changes
    new ResizeObserver(this.draw).observe(this.container);

    this.structs = {};
    this.edges = {};

    this.newStructId = 0;
    this.newEdgeId = 0;

    this.renderQueue = new RenderQueue();
  }

  /** Add a structure to board */
  add = (...args: Structure[]) => {
    for (let struct of args) {
      struct._id = this.newStructId++;
      struct.board = this;
      this.structs[struct._id] = struct;
    }
  };

  /** Remove a structure from board */
  remove = (...args: Structure[]) => {
    for (let struct of args) {
      if (this.structs[struct._id] !== undefined) {
        this.structs[struct._id].board = undefined;
        delete this.structs[struct._id];
      }
    }
  };

  /** Add a edge to board */
  addEdge = (...args: Edge[]) => {
    for (let edge of args) {
      edge._id = this.newEdgeId++;
      edge.board = this;
      this.edges[edge._id] = edge;
    }
  };

  /** Remove a edge from board */
  removeEdge = (...args: Edge[]) => {
    for (let edge of args) {
      if (this.edges[edge._id] !== undefined) {
        this.edges[edge._id] = undefined;
        delete this.edges[edge._id];
      }
    }
  };

  resizeCanvas = () =>
    this.canvas.resize(this.container.clientWidth, this.container.clientHeight);

  draw = async () => {
    // Wait for next animation frame
    await new Promise(resolve => window.requestAnimationFrame(resolve));

    const ctx = this.canvas.canvas.getContext("2d");

    // To resize canvas
    // Also to clear canvas
    this.resizeCanvas();

    ctx.setTransform(this.canvas.matrix);

    // Draw structures
    for (let id in this.structs) {
      this.structs[id].draw(ctx);
    }

    // Draw edges
    for (let id in this.edges) {
      this.edges[id].draw(ctx);
    }
  };

  render = (func: () => Promise<void>) => {
    this.renderQueue.push(func);
  };

  priorityRender = (func: () => Promise<void>) => {
    this.renderQueue.priorityPush(func);
  };
}

export default Board;
