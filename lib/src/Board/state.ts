import Structure from "../Structure";

class State {
  private structs: {
    [id: number]: Structure;
  }

  private newStructId: number;
  private newEdgeId: number;

  constructor() {
    this.structs = {};

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

  draw = (ctx: CanvasRenderingContext2D) => {

    // Draw structures
    for (let id in this.structs) {
      this.structs[id].draw(ctx);
    }
  }

}

export default State;
