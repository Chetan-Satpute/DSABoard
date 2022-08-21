import React, { FC, useEffect, useLayoutEffect, useRef } from "react";

type DrawFunction = (ctx: CanvasRenderingContext2D) => Promise<void>;
export type RenderFunction = (draw: DrawFunction) => Promise<void>;
type InitFunction = (render: RenderFunction) => Promise<void>;

interface IProps {
  init: InitFunction;
}

const Canvas: FC<IProps> = ({ init }) => {
  const containerRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  const resizeCanvas = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    canvas.height = container.clientHeight;
    canvas.width = container.clientWidth;
  };

  const render: RenderFunction = async (draw) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    resizeCanvas();
    await draw(ctx);
  };

  useEffect(() => {
    init(render);
  }, []);

  useLayoutEffect(() => {
    resizeCanvas();
  }, []);

  return (
    <div ref={containerRef} className="flex-auto">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
