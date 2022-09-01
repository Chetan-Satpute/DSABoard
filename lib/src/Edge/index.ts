import Structure from "../Structure";
import { drawHead, drawSegment, getEndPoints } from "./utils";

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

  percent: number;

  static HEAD_LENGTH = 10;

  constructor(a: Structure, b: Structure) {
    this.start = a;
    this.end = b;

    this.type = EdgeType.UNDIRECTED;
  }

  draw(ctx: CanvasRenderingContext2D) {
    let [startPoint, endPoint] = getEndPoints(this.start, this.end);

    if (this.type === EdgeType.UNDIRECTED) {
      drawSegment(ctx, startPoint, endPoint);
    }

    if (this.type === EdgeType.DIRECTED) {
      const angle = Math.atan2(
        endPoint.y - startPoint.y,
        endPoint.x - startPoint.x
      );

      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);

      endPoint.x -= Edge.HEAD_LENGTH * cosAngle;
      endPoint.y -= Edge.HEAD_LENGTH * sinAngle;

      drawSegment(ctx, startPoint, endPoint);
      drawHead(ctx, startPoint, endPoint);
    }

    if (this.type === EdgeType.DOUBLE_DIRECTED) {
      const angle = Math.atan2(
        endPoint.y - startPoint.y,
        endPoint.x - startPoint.x
      );

      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);

      startPoint.x += Edge.HEAD_LENGTH * cosAngle;
      startPoint.y += Edge.HEAD_LENGTH * sinAngle;

      endPoint.x -= Edge.HEAD_LENGTH * cosAngle;
      endPoint.y -= Edge.HEAD_LENGTH * sinAngle;

      drawSegment(ctx, startPoint, endPoint);
      drawHead(ctx, startPoint, endPoint);
      drawHead(ctx, endPoint, startPoint);
    }
  }

}

export default Edge;

