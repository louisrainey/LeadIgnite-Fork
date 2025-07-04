Neon Gradient Card

A beautiful neon card effect

import { NeonGradientCard } from "@/registry/magicui/neon-gradient-card";

export function NeonGradientCardDemo() {
return (
<NeonGradientCard className="max-w-sm items-center justify-center text-center">
<span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
Neon Gradient Card
</span>
</NeonGradientCard>
);
}

Installation
Copy and paste the following code into your project.

"use client";

import {
CSSProperties,
ReactElement,
ReactNode,
useEffect,
useRef,
useState,
} from "react";

import { cn } from "@/lib/\_utils";

interface NeonColorsProps {
firstColor: string;
secondColor: string;
}

interface NeonGradientCardProps {
/\*\*

- @default <div />
- @type ReactElement
- @description
- The component to be rendered as the card
- \*/
  as?: ReactElement;
  /\*\*
- @default ""
- @type string
- @description
- The className of the card
  \*/
  className?: string;

/\*\*

- @default ""
- @type ReactNode
- @description
- The children of the card
- \*/
  children?: ReactNode;

/\*\*

- @default 5
- @type number
- @description
- The size of the border in pixels
- \*/
  borderSize?: number;

/\*\*

- @default 20
- @type number
- @description
- The size of the radius in pixels
- \*/
  borderRadius?: number;

/\*\*

- @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
- @type string
- @description
- The colors of the neon gradient
- \*/
  neonColors?: NeonColorsProps;

[key: string]: any;

}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
className,
children,
borderSize = 2,
borderRadius = 20,
neonColors = {
firstColor: "#ff00aa",
secondColor: "#00FFF1",
},
...props
}) => {
const containerRef = useRef<HTMLDivElement>(null);
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

useEffect(() => {
const updateDimensions = () => {
if (containerRef.current) {
const { offsetWidth, offsetHeight } = containerRef.current;
setDimensions({ width: offsetWidth, height: offsetHeight });
}
};

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };

}, []);

useEffect(() => {
if (containerRef.current) {
const { offsetWidth, offsetHeight } = containerRef.current;
setDimensions({ width: offsetWidth, height: offsetHeight });
}
}, [children]);

return (
<div
ref={containerRef}
style={
{
"--border-size": `${borderSize}px`,
"--border-radius": `${borderRadius}px`,
"--neon-first-color": neonColors.firstColor,
"--neon-second-color": neonColors.secondColor,
"--card-width": `${dimensions.width}px`,
"--card-height": `${dimensions.height}px`,
"--card-content-radius": `${borderRadius - borderSize}px`,
"--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
"--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
"--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
"--after-blur": `${dimensions.width / 3}px`,
} as CSSProperties
}
className={cn(
"relative z-10 size-full rounded-[var(--border-radius)]",
className,
)}
{...props} >
<div
className={cn(
"relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-gray-100 p-6",
"before:absolute before:-left-[var(--border-size)] before:-top-[var(--border-size)] before:-z-10 before:block",
"before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:content-['']",
"before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%]",
"before:animate-background-position-spin",
"after:absolute after:-left-[var(--border-size)] after:-top-[var(--border-size)] after:-z-10 after:block",
"after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-['']",
"after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%] after:opacity-80",
"after:animate-background-position-spin",
"dark:bg-neutral-900",
)} >
{children}
</div>
</div>
);
};

Update the import paths to match your project setup.
Add the required CSS animations

Add the following animations to your global CSS file .
app/globals.css

@theme inline {
--animate-background-position-spin: background-position-spin 3000ms infinite
alternate;

@keyframes background-position-spin {
0% {
background-position: top center;
}
100% {
background-position: bottom center;
}
}
}

Usage

import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

<NeonGradientCard>
  <div className="p-4">
    <p>Hello</p>
    <span>Hover me</span>
  </div>
</NeonGradientCard>

Props
Prop Type Default Description
className string - The class name to be applied to the component
children ReactNode - Children elements
borderSize number 5 The size of the border
borderRadius number 20 The size of the radius
neonColors object { firstColor: "#ff00aa", secondColor: "#00FFF1" } The colors of the neon gradient
Credits
