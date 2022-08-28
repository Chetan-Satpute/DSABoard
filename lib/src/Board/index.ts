
class Board {

  container: HTMLDivElement;
  canvas: HTMLCanvasElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');

    this.container.appendChild(this.canvas);
    this.resizeCanvas();

    const ctx = this.canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.closePath();

    ctx.strokeStyle="#e5e5e5";
    ctx.stroke();
  }

  resizeCanvas() {
    const padding = 10;

    this.canvas.width = this.container.clientWidth - padding;
    this.canvas.height = this.container.clientHeight - padding;
  }
}

export default Board;
