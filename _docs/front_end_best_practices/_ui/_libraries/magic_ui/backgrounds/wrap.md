Warp Background

A card with a time warping background effect.

import {
Card,
CardContent,
CardDescription,
CardTitle,
} from "@/components/ui/card";
import { WarpBackground } from "@/registry/magicui/warp-background";

export function ExampleComponentDemo() {
return (
<WarpBackground>
<Card className="w-80">
<CardContent className="flex flex-col gap-2 p-4">
<CardTitle>Congratulations on Your Promotion!</CardTitle>
<CardDescription>
Your hard work and dedication have paid off. We&apos;re thrilled to
see you take this next step in your career. Keep up the fantastic
work!
</CardDescription>
</CardContent>
</Card>
</WarpBackground>
);
}

Installation
Copy and paste the following code into your project.

"use client";

import { cn } from "@/lib/\_utils";

import { motion } from "motion/react";
import React, { HTMLAttributes, useCallback, useMemo } from "react";

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
children: React.ReactNode;
perspective?: number;
beamsPerSide?: number;
beamSize?: number;
beamDelayMax?: number;
beamDelayMin?: number;
beamDuration?: number;
gridColor?: string;
}

const Beam = ({
width,
x,
delay,
duration,
}: {
width: string | number;
x: string | number;
delay: number;
duration: number;
}) => {
const hue = Math.floor(Math.random() _ 360);
const ar = Math.floor(Math.random() _ 10) + 1;

return (
<motion.div
style={
{
"--x": `${x}`,
"--width": `${width}`,
"--aspect-ratio": `${ar}`,
"--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
} as React.CSSProperties
}
className={`absolute left-[var(--x)] top-0 [aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)]`}
initial={{ y: "100cqmax", x: "-50%" }}
animate={{ y: "-100%", x: "-50%" }}
transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
/>
);
};

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
children,
perspective = 100,
className,
beamsPerSide = 3,
beamSize = 5,
beamDelayMax = 3,
beamDelayMin = 0,
beamDuration = 3,
gridColor = "var(--border)",
...props
}) => {
const generateBeams = useCallback(() => {
const beams = [];
const cellsPerSide = Math.floor(100 / beamSize);
const step = cellsPerSide / beamsPerSide;

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      const delay =
        Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
      beams.push({ x, delay });
    }
    return beams;

}, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);

const topBeams = useMemo(() => generateBeams(), [generateBeams]);
const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
const leftBeams = useMemo(() => generateBeams(), [generateBeams]);

return (
<div className={cn("relative rounded border p-20", className)} {...props}>
<div
style={
{
"--perspective": `${perspective}px`,
"--grid-color": gridColor,
"--beam-size": `${beamSize}%`,
} as React.CSSProperties
}
className={
"pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clipPath:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
} >
{/_ top side _/}
<div className="absolute z-20 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
{topBeams.map((beam, index) => (
<Beam
key={`top-${index}`}
width={`${beamSize}%`}
x={`${beam.x * beamSize}%`}
delay={beam.delay}
duration={beamDuration}
/>
))}
</div>
{/_ bottom side _/}
<div className="absolute top-full [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
{bottomBeams.map((beam, index) => (
<Beam
key={`bottom-${index}`}
width={`${beamSize}%`}
x={`${beam.x * beamSize}%`}
delay={beam.delay}
duration={beamDuration}
/>
))}
</div>
{/_ left side _/}
<div className="absolute left-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]">
{leftBeams.map((beam, index) => (
<Beam
key={`left-${index}`}
width={`${beamSize}%`}
x={`${beam.x * beamSize}%`}
delay={beam.delay}
duration={beamDuration}
/>
))}
</div>
{/_ right side _/}
<div className="absolute right-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]">
{rightBeams.map((beam, index) => (
<Beam
key={`right-${index}`}
width={`${beamSize}%`}
x={`${beam.x * beamSize}%`}
delay={beam.delay}
duration={beamDuration}
/>
))}
</div>
</div>
<div className="relative">{children}</div>
</div>
);
};

Update the import paths to match your project setup.
Usage

import { WarpBackground } from "@/components/magicui/warp-background";

<WarpBackground>
  <div className="w-80">
    <p>Warp Background</p>
    <p>This is a component that creates a warp background effect.</p>
  </div>
</WarpBackground>

Props
Prop Type Default Description
children React.ReactNode - The content to be put inside the warp animation
perspective number 100 The perspective of the warp animation
beamsPerSide number 3 The number of beams per side
beamSize number 5 The size of the beams
beamDelayMax number 3 The maximum delay of the beams
beamDelayMin number 0 The minimum delay of the beams
beamDuration number 3 The duration of the beams
gridColor string "var(--border)" The color of the grid lines
