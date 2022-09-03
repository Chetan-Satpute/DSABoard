import Edge, { Point } from ".";
import Structure from "../Structure";

export const getEndPoints = (A: Structure, B: Structure): [Point, Point] => {
  const ACenter: Point = {
    x: A.box.x + A.box.width / 2,
    y: A.box.y + A.box.height / 2,
  };

  const BCenter: Point = {
    x: B.box.x + B.box.width / 2,
    y: B.box.y + B.box.height / 2,
  };

  const xDiff = Math.abs(ACenter.x - BCenter.x);
  const yDiff = Math.abs(ACenter.y - BCenter.y);

  const xSign = (BCenter.x - ACenter.x) / xDiff;
  const ySign = (BCenter.y - ACenter.y) / yDiff;

  if (xDiff === 0) {
    return [
      { x: ACenter.x, y: ACenter.y + (A.box.height / 2) * ySign },
      { x: BCenter.x, y: BCenter.y - (B.box.height / 2) * ySign },
    ];
  }

  if (yDiff === 0) {
    return [
      { x: ACenter.x + (A.box.width / 2) * xSign, y: ACenter.y },
      { x: BCenter.x - (B.box.width / 2) * xSign, y: BCenter.y },
    ];
  }

  const APoint = { ...ACenter };
  const BPoint = { ...BCenter };

  if (yDiff / xDiff < A.box.height / A.box.width) {
    APoint.x += (A.box.width / 2) * xSign;
    APoint.y += (yDiff / xDiff) * (A.box.width / 2) * ySign;
  } else {
    APoint.x += (xDiff / yDiff) * (A.box.height / 2) * xSign;
    APoint.y += (A.box.height / 2) * ySign;
  }

  if (yDiff / xDiff < B.box.height / B.box.width) {
    BPoint.x -= (B.box.width / 2) * xSign;
    BPoint.y -= (yDiff / xDiff) * (B.box.width / 2) * ySign;
  } else {
    BPoint.x -= (xDiff / yDiff) * (B.box.height / 2) * xSign;
    BPoint.y -= (B.box.height / 2) * ySign;
  }

  return [APoint, BPoint];
};

export const drawSegment = (
  ctx: CanvasRenderingContext2D,
  startPoint: Point,
  endPoint: Point
) => {
  ctx.beginPath();

  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);

  ctx.closePath();

  ctx.stroke();
};

export const drawHead = (
  ctx: CanvasRenderingContext2D,
  startPoint: Point,
  endPoint: Point
) => {
  const angle = Math.atan2(
    endPoint.y - startPoint.y,
    endPoint.x - startPoint.x
  );

  const tan30 = Math.tan(Math.PI / 6);
  const sinAngle = Math.sin(angle);
  const cosAngle = Math.cos(angle);

  ctx.beginPath();

  ctx.moveTo(endPoint.x, endPoint.y);
  ctx.lineTo(
    endPoint.x + Edge.HEAD_LENGTH * tan30 * sinAngle,
    endPoint.y - Edge.HEAD_LENGTH * tan30 * cosAngle
  );

  ctx.lineTo(
    endPoint.x + Edge.HEAD_LENGTH * cosAngle,
    endPoint.y + Edge.HEAD_LENGTH * sinAngle
  );

  ctx.lineTo(
    endPoint.x - Edge.HEAD_LENGTH * tan30 * sinAngle,
    endPoint.y + Edge.HEAD_LENGTH * tan30 * cosAngle
  );

  ctx.closePath();

  ctx.fill();
};

export const calculateLength = (a: Point, b: Point, percent: number) => {
  let xDiff = b.x - a.x;
  let yDiff = b.y - a.y;

  let length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

  return length * percent / 100;
};

