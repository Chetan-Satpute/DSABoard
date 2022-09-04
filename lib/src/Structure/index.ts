import Board from "../Board";

export interface Box {
  x: number;
  y: number;

  height: number;
  width: number;
}

class Structure {
  _id: number;
  box: Box;

  board: Board;

  constructor() {
    this.box = { x: 0, y: 0, width: 0, height: 0 };
  }

  draw = (ctx: CanvasRenderingContext2D) => {}

  moveTo = (x: number, y: number) => {
    this.box.x = x;
    this.box.y = y;
  };
}

export default Structure;
