interface Point {
  x: number;
  y: number;
}

type MouseEventHandler = (this: HTMLCanvasElement, ev: MouseEvent) => void;
type WheelEventHandler = (this: HTMLCanvasElement, ev: WheelEvent) => void;

class Canvas {
  canvas: HTMLCanvasElement;

  /** Transform Matrix for canvas */
  matrix: DOMMatrix;

  // Helpers for pan and zoom
  start: Point;
  isDragging: boolean;

  render: () => void;

  constructor(render: () => void) {
    this.canvas = document.createElement("canvas");

    this.matrix = new DOMMatrix();
    this.attachEventListners();

    this.render = render;
  }

  resize = (width: number, height: number) => {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  attachEventListners = () => {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("wheel", this.wheelHandler);
  };

  mouseDownHandler: MouseEventHandler = (event) => {
    this.start = { x: event.clientX, y: event.clientY };
    this.isDragging = true;
  };

  mouseMoveHandler: MouseEventHandler = (event) => {
    if (this.isDragging) {
      const diff = {
        x: event.clientX - this.start.x,
        y: event.clientY - this.start.y,
      };

      this.matrix.e += diff.x;
      this.matrix.f += diff.y;

      this.render();

      this.matrix.e -= diff.x;
      this.matrix.f -= diff.y;
    }
  };

  mouseUpHandler: MouseEventHandler = (event) => {
    this.isDragging = false;

    this.matrix.e += event.clientX - this.start.x;
    this.matrix.f += event.clientY - this.start.y;
  };

  wheelHandler: WheelEventHandler = (event) => {
    let position: Point = {
      x: event.clientX - this.matrix.e,
      y: event.clientY - this.matrix.f,
    };

    let prevScale = {
      x: this.matrix.a,
      y: this.matrix.d,
    };

    this.matrix.a -= event.deltaY * 0.001;
    this.matrix.d -= event.deltaY * 0.001;

    // Lower Bound
    this.matrix.a = this.matrix.a >= 0.5 ? this.matrix.a : 0.5;
    this.matrix.d = this.matrix.d >= 0.5 ? this.matrix.d : 0.5;

    // Upper Bound
    this.matrix.a = this.matrix.a <= 1.5 ? this.matrix.a : 1.5;
    this.matrix.d = this.matrix.d <= 1.5 ? this.matrix.d : 1.5;

    let newPosition: Point = {
      x: (position.x / prevScale.x) * this.matrix.a,
      y: (position.y / prevScale.y) * this.matrix.d,
    };

    this.matrix.e -= newPosition.x - position.x;
    this.matrix.f -= newPosition.y - position.y;

    this.render();
  };
}

export default Canvas;