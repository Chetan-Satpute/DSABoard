export interface Box {
  x: number;
  y: number;

  height: number;
  width: number;
}

class Structure {
  _id: number;
  box: Box;

  constructor() {
    this.box = { x: 0, y: 0, width: 0, height: 0 };
  }

  draw(ctx: CanvasRenderingContext2D) {}
}

export default Structure;
