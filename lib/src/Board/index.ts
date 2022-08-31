interface Point {
  x: number;
  y: number;
}

type MouseEventHandler = (this: HTMLCanvasElement, ev: MouseEvent) => void;
type WheelEventHandler = (this: HTMLCanvasElement, ev: WheelEvent) => void;

class Board {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;

  /** Transform Matrix for canvas */
  matrix: DOMMatrix;

  // Helpers for pan and zoom
  start: Point;
  isDragging: boolean;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.canvas = document.createElement("canvas");

    this.container.appendChild(this.canvas);
    this.resizeCanvas();

    this.matrix = new DOMMatrix();

    this.attachEventListners();
  }

  attachEventListners = () => {
    // Resize canvas whenever container size changes
    new ResizeObserver(this.render).observe(this.container);

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

  resizeCanvas = () => {
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  };

  render = () => {
    const ctx = this.canvas.getContext("2d");

    // To resize canvas
    // Also to clear canvas
    this.resizeCanvas();

    ctx.setTransform(this.matrix);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.canvas.width, this.canvas.height);
    ctx.closePath();

    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#e5e5e5";
    ctx.fillRect(150, 50, 70, 30);
  };
}

export default Board;
