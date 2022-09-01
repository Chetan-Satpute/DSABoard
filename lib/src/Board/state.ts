import Edge from "../Edge";
import Structure from "../Structure";

class State {
  private structs: {
    [id: number]: Structure;
  };

  private edges: {
    [id: number]: Edge;
  };

  private newStructId: number;
  private newEdgeId: number;

  constructor() {
    this.structs = {};
    this.edges = {};

    this.newStructId = 0;
    this.newEdgeId = 0;
  }

  /** Add a structure to board */
  addStruct = (...args: Structure[]) => {
    for (let struct of args) {
      struct._id = this.newStructId++;
      this.structs[struct._id] = struct;
    }
  };

  /** Remove a structure from board */
  removeStruct = (...args: Structure[]) => {
    for (let struct of args) {
      if (this.structs[struct._id] !== undefined) {
        delete this.structs[struct._id];
      }
    }
  };

  /** Add a edge to board */
  addEdge = (...args: Edge[]) => {
    for (let edge of args) {
      edge._id = this.newEdgeId++;
      this.edges[edge._id] = edge;
    }
  };

  /** Remove a edge from board */
  removeEdge = (...args: Edge[]) => {
    for (let edge of args) {
      if (this.edges[edge._id] !== undefined) {
        delete this.edges[edge._id];
      }
    }
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    // Draw structures
    for (let id in this.structs) {
      this.structs[id].draw(ctx);
    }

    for (let id in this.edges) {
      this.edges[id].draw(ctx);
    }
  };
}

export default State;
