Flickering Grid

A flickering grid background made with SVGs, fully customizable using Tailwind CSS.

import { FlickeringGrid } from "@/registry/magicui/flickering-grid";

export function FlickeringGridDemo() {
return (
<div className="relative h-[500px] w-full overflow-hidden rounded-lg border bg-background">
<FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      />
</div>
);
}

Installation
Copy and paste the following code into your project.

"use client";

import { cn } from "@/lib/\_utils";

import React, {
useCallback,
useEffect,
useMemo,
useRef,
useState,
} from "react";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
squareSize?: number;
gridGap?: number;
flickerChance?: number;
color?: string;
width?: number;
height?: number;
className?: string;
maxOpacity?: number;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
squareSize = 4,
gridGap = 6,
flickerChance = 0.3,
color = "rgb(0, 0, 0)",
width,
height,
className,
maxOpacity = 0.3,
...props
}) => {
const canvasRef = useRef<HTMLCanvasElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
const [isInView, setIsInView] = useState(false);
const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

const memoizedColor = useMemo(() => {
const toRGBA = (color: string) => {
if (typeof window === "undefined") {
return `rgba(0, 0, 0,`;
}
const canvas = document.createElement("canvas");
canvas.width = canvas.height = 1;
const ctx = canvas.getContext("2d");
if (!ctx) return "rgba(255, 0, 0,";
ctx.fillStyle = color;
ctx.fillRect(0, 0, 1, 1);
const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
return `rgba(${r}, ${g}, ${b},`;
};
return toRGBA(color);
}, [color]);

const setupCanvas = useCallback(
(canvas: HTMLCanvasElement, width: number, height: number) => {
const dpr = window.devicePixelRatio || 1;
canvas.width = width _ dpr;
canvas.height = height _ dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
const cols = Math.floor(width / (squareSize + gridGap));
const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],

);

const updateSquares = useCallback(
(squares: Float32Array, deltaTime: number) => {
for (let i = 0; i < squares.length; i++) {
if (Math.random() < flickerChance _ deltaTime) {
squares[i] = Math.random() _ maxOpacity;
}
}
},
[flickerChance, maxOpacity],
);

const drawGrid = useCallback(
(
ctx: CanvasRenderingContext2D,
width: number,
height: number,
cols: number,
rows: number,
squares: Float32Array,
dpr: number,
) => {
ctx.clearRect(0, 0, width, height);
ctx.fillStyle = "transparent";
ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap],

);

useEffect(() => {
const canvas = canvasRef.current;
const container = containerRef.current;
if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };

}, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

return (
<div
ref={containerRef}
className={cn(`h-full w-full ${className}`)}
{...props} >
<canvas
ref={canvasRef}
className="pointer-events-none"
style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
/>
</div>
);
};

Update the import paths to match your project setup.
Examples
Rounded

import { FlickeringGrid } from "@/registry/magicui/flickering-grid";

export function FlickeringGridRoundedDemo() {
return (
<div className="relative size-[600px] w-full overflow-hidden rounded-lg border bg-background">
<FlickeringGrid
        className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      />
</div>
);
}

Usage

import { FlickeringGrid } from "@/components/magicui/flickering-grid";

<FlickeringGrid />

Props
Prop Type Default Description
squareSize number 4 Size of each square in the grid
gridGap number 6 Gap between squares in the grid
flickerChance number 0.3 Probability of a square flickering
color string "rgb(0, 0, 0)" Color of the squares
width number - Width of the canvas
height number - Height of the canvas
className string - Additional CSS classes for the canvas
maxOpacity number 0.2 Maximum opacity of the squares
