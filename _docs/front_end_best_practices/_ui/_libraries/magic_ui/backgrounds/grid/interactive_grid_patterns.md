Interactive Grid Pattern

A interactive background grid pattern made with SVGs, fully customizable using Tailwind CSS.

"use client";

import { cn } from "@/lib/\_utils";

import { InteractiveGridPattern } from "@/registry/magicui/interactive-grid-pattern";

export function InteractiveGridPatternDemo() {
return (
<div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
<InteractiveGridPattern
className={cn(
"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
)}
/>
</div>
);
}

Installation
Copy and paste the following code into your project.

"use client";

import { cn } from "@/lib/\_utils";

import React, { useState } from "react";

/\*\*

- InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
-
- @param width - The width of each square.
- @param height - The height of each square.
- @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
- @param className - The class name of the grid.
- @param squaresClassName - The class name of the squares.
  \*/
  interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
  }

/\*\*

- The InteractiveGridPattern component.
-
- @see InteractiveGridPatternProps for the props interface.
- @returns A React component.
  \*/
  export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
  }: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

return (
<svg
width={width _ horizontal}
height={height _ vertical}
className={cn(
"absolute inset-0 h-full w-full border border-gray-400/30",
className,
)}
{...props} >
{Array.from({ length: horizontal _ vertical }).map((\_, index) => {
const x = (index % horizontal) _ width;
const y = Math.floor(index / horizontal) \* height;
return (
<rect
key={index}
x={x}
y={y}
width={width}
height={height}
className={cn(
"stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
squaresClassName,
)}
onMouseEnter={() => setHoveredSquare(index)}
onMouseLeave={() => setHoveredSquare(null)}
/>
);
})}
</svg>
);
}

Update the import paths to match your project setup.
Examples
Colorful

"use client";

import { cn } from "@/lib/\_utils";

import { InteractiveGridPattern } from "@/registry/magicui/interactive-grid-pattern";

export function InteractiveGridPatternDemo() {
return (
<div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
<InteractiveGridPattern
className={cn(
"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
)}
width={20}
height={20}
squares={[80, 80]}
squaresClassName="hover:fill-blue-500"
/>
</div>
);
}

Usage

import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

<div className="relative h-[500px] w-full overflow-hidden">
  <InteractiveGridPattern />
</div>

Props
Prop Type Description Default
width number Width of each square in the grid 40
height number Height of each square in the grid 40
squares [number, number] Number of squares in the grid. First number is horizontal squares, second is vertical squares [24,24]
className string Class name applied to the grid container -
squaresClassName string Class name applied to individual squares in the grid -
