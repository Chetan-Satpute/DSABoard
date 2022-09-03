import Board from "../Board";
import Structure from "../Structure";
import { calculateLength, drawHead, drawSegment, getEndPoints } from "./utils";

export interface Point {
  x: number;
  y: number;
}

enum EdgeType {
  UNDIRECTED = "UNDIRECTED",
  DIRECTED = "DIRECTED",
  DOUBLE_DIRECTED = "DOUBLE_DIRECTED",
}

class Edge {
  _id: number;

  start: Structure;
  end: Structure;

  type: EdgeType;

  board: Board;

  percent: number;

  static HEAD_LENGTH = 10;

  constructor(a: Structure, b: Structure) {
    this.start = a;
    this.end = b;

    this.percent = 100;

    this.type = EdgeType.UNDIRECTED;
  }

  draw(ctx: CanvasRenderingContext2D) {
    let [startPoint, endPoint] = getEndPoints(this.start, this.end);

    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );

    const sinAngle = Math.sin(angle);
    const cosAngle = Math.cos(angle);

    let length = calculateLength(startPoint, endPoint, this.percent);

    if (this.type === EdgeType.UNDIRECTED) {
      endPoint.x = startPoint.x + length * cosAngle;
      endPoint.y = startPoint.y + length * sinAngle;

      drawSegment(ctx, startPoint, endPoint);
    }

    if (this.type === EdgeType.DIRECTED && length > Edge.HEAD_LENGTH) {
      endPoint.x = startPoint.x + length * cosAngle;
      endPoint.y = startPoint.y + length * sinAngle;

      endPoint.x -= Edge.HEAD_LENGTH * cosAngle;
      endPoint.y -= Edge.HEAD_LENGTH * sinAngle;

      drawSegment(ctx, startPoint, endPoint);
      drawHead(ctx, startPoint, endPoint);
    }

    if (
      this.type === EdgeType.DOUBLE_DIRECTED &&
      length > Edge.HEAD_LENGTH * 2
    ) {
      // Displacement between original start point and drawing start point
      let offLength = (calculateLength(startPoint, endPoint, 100) - length) / 2;

      startPoint.x += offLength * cosAngle;
      startPoint.y += offLength * sinAngle;

      endPoint.x -= offLength * cosAngle;
      endPoint.y -= offLength * sinAngle;

      startPoint.x += Edge.HEAD_LENGTH * cosAngle;
      startPoint.y += Edge.HEAD_LENGTH * sinAngle;

      endPoint.x -= Edge.HEAD_LENGTH * cosAngle;
      endPoint.y -= Edge.HEAD_LENGTH * sinAngle;

      drawSegment(ctx, startPoint, endPoint);
      drawHead(ctx, startPoint, endPoint);
      drawHead(ctx, endPoint, startPoint);
    }
  }

  grow = () => {
    this.board?.render(async () => {
      for (let i = this.percent; i <= 100; i++) {
        this.percent = i;
        await this.board.draw();
      }
    });
  };

  shrink = () => {
    this.board?.render(async () => {
      for (let i = this.percent; i >= 0; i--) {
        this.percent = i;
        await this.board.draw();
      }
    });
  };
}

export default Edge;
