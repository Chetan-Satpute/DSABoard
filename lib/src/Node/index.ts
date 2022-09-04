import Structure from "../Structure";
import Color from "./Color";

class Node extends Structure {
  value: number;
  color: Color;

  /** Which corner of the node should be rounded */
  roundedCorners: {
    topLeft: boolean;
    topRight: boolean;
    bottomLeft: boolean;
    bottomRight: boolean;
  };

  static WIDTH = 60;
  static HEIGHT = 30;
  private static BORDER = 2;

  constructor(value: number) {
    super();

    this.value = value;
    this.color = Color.Transparent;

    this.roundedCorners = {
      topLeft: true,
      topRight: true,
      bottomLeft: true,
      bottomRight: true,
    };

    this.box = { x: 0, y: 0, width: Node.WIDTH, height: Node.HEIGHT };
  }

  setRoundedCorners(
    topLeft: boolean,
    topRight: boolean,
    bottomLeft: boolean,
    bottomRight: boolean
  ) {
    this.roundedCorners = {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    };
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    let cornerRadius = Node.HEIGHT / 4;

    let x = this.box.x + Node.BORDER / 2;
    let y = this.box.y + Node.BORDER / 2;

    ctx.beginPath();

    // Top Left
    ctx.moveTo(x, y + cornerRadius);
    if (this.roundedCorners.topLeft) {
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x + cornerRadius, y);
    }

    x += Node.WIDTH - Node.BORDER;
    ctx.lineTo(x - cornerRadius, y);

    // Top Right
    if (this.roundedCorners.topRight) {
      ctx.quadraticCurveTo(x, y, x, y + cornerRadius);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + cornerRadius);
    }

    y += Node.HEIGHT - Node.BORDER;
    ctx.lineTo(x, y - cornerRadius);

    // Bottom Right
    if (this.roundedCorners.bottomRight) {
      ctx.quadraticCurveTo(x, y, x - cornerRadius, y);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x - cornerRadius, y);
    }

    x -= Node.WIDTH - Node.BORDER;
    ctx.lineTo(x + cornerRadius, y);

    // Bottom Left
    if (this.roundedCorners.bottomLeft) {
      ctx.quadraticCurveTo(x, y, x, y - cornerRadius);
    } else {
      ctx.lineTo(x, y);
      ctx.lineTo(x, y - cornerRadius);
    }

    ctx.closePath();

    if (this.color != Color.Transparent) {
      // Fill background color
      const gradient = ctx.createRadialGradient(
        this.box.x + this.box.width / 2,
        this.box.y + this.box.height / 2,
        Math.sqrt((this.box.width / 2) ** 2 + (this.box.height / 2) ** 2),
        this.box.x + this.box.width / 2,
        this.box.y + this.box.height / 2,
        0
      );

      gradient.addColorStop(0, Color.Border);
      gradient.addColorStop(0.4, this.color);
      gradient.addColorStop(1, Color.Transparent);

      ctx.fillStyle = gradient;
      ctx.fill();
    }

    ctx.strokeStyle = Color.Border;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Value of node in center
    ctx.font = `${(Node.HEIGHT * 3) / 5}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(
      Number.isNaN(this.value) ? "-" : this.value.toString(),
      this.box.x + Node.WIDTH / 2,
      this.box.y + Node.HEIGHT / 2
    );
  };
}

export default Node;
