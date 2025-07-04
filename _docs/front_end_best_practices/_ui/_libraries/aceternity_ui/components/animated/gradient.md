Background Gradient Animation

A smooth and elegant background gradient animation that changes the gradient position over time.
card
background
gradient
special
call to action

import React from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

export function BackgroundGradientAnimationDemo() {
return (
<BackgroundGradientAnimation>
<div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
<p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
Gradients X Animations
</p>
</div>
</BackgroundGradientAnimation>
);
}

Installation
Install dependencies

npm i motion clsx tailwind-merge

Add these animations to your CSS file

Add these animations to your CSS file:

@import "tailwindcss";

@theme inline {
--animate-first: moveVertical 30s ease infinite;
--animate-second: moveInCircle 20s reverse infinite;
--animate-third: moveInCircle 40s linear infinite;
--animate-fourth: moveHorizontal 40s ease infinite;
--animate-fifth: moveInCircle 20s ease infinite;

@keyframes moveHorizontal {
0% {
transform: translateX(-50%) translateY(-10%);
}
50% {
transform: translateX(50%) translateY(10%);
}
100% {
transform: translateX(-50%) translateY(-10%);
}
}

@keyframes moveInCircle {
0% {
transform: rotate(0deg);
}
50% {
transform: rotate(180deg);
}
100% {
transform: rotate(360deg);
}
}

@keyframes moveVertical {
0% {
transform: translateY(-50%);
}
50% {
transform: translateY(50%);
}
100% {
transform: translateY(-50%);
}
}
}

lib/utils.ts

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

Add these animations and keyframes to your tailwind.config.ts file
Copy the source code

components/ui/background-gradient-animation.tsx

"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
gradientBackgroundStart = "rgb(108, 0, 162)",
gradientBackgroundEnd = "rgb(0, 17, 82)",
firstColor = "18, 113, 255",
secondColor = "221, 74, 255",
thirdColor = "100, 220, 255",
fourthColor = "200, 50, 50",
fifthColor = "180, 180, 50",
pointerColor = "140, 100, 255",
size = "80%",
blendingValue = "hard-light",
children,
className,
interactive = true,
containerClassName,
}: {
gradientBackgroundStart?: string;
gradientBackgroundEnd?: string;
firstColor?: string;
secondColor?: string;
thirdColor?: string;
fourthColor?: string;
fifthColor?: string;
pointerColor?: string;
size?: string;
blendingValue?: string;
children?: React.ReactNode;
className?: string;
interactive?: boolean;
containerClassName?: string;
}) => {
const interactiveRef = useRef<HTMLDivElement>(null);

const [curX, setCurX] = useState(0);
const [curY, setCurY] = useState(0);
const [tgX, setTgX] = useState(0);
const [tgY, setTgY] = useState(0);
useEffect(() => {
document.body.style.setProperty(
"--gradient-background-start",
gradientBackgroundStart
);
document.body.style.setProperty(
"--gradient-background-end",
gradientBackgroundEnd
);
document.body.style.setProperty("--first-color", firstColor);
document.body.style.setProperty("--second-color", secondColor);
document.body.style.setProperty("--third-color", thirdColor);
document.body.style.setProperty("--fourth-color", fourthColor);
document.body.style.setProperty("--fifth-color", fifthColor);
document.body.style.setProperty("--pointer-color", pointerColor);
document.body.style.setProperty("--size", size);
document.body.style.setProperty("--blending-value", blendingValue);
}, []);

useEffect(() => {
function move() {
if (!interactiveRef.current) {
return;
}
setCurX(curX + (tgX - curX) / 20);
setCurY(curY + (tgY - curY) / 20);
interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
}

    move();

}, [tgX, tgY]);

const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
if (interactiveRef.current) {
const rect = interactiveRef.current.getBoundingClientRect();
setTgX(event.clientX - rect.left);
setTgY(event.clientY - rect.top);
}
};

const [isSafari, setIsSafari] = useState(false);
useEffect(() => {
setIsSafari(/^((?!chrome|android).)\*safari/i.test(navigator.userAgent));
}, []);

return (
<div
className={cn(
"h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
containerClassName
)} >
<svg className="hidden">
<defs>
<filter id="blurMe">
<feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
<feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
<feBlend in="SourceGraphic" in2="goo" />
</filter>
</defs>
</svg>
<div className={cn("", className)}>{children}</div>
<div
className={cn(
"gradients-container h-full w-full blur-lg",
isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
)} >
<div
className={cn(
`absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
`[transform-origin:center_center]`,
`animate-first`,
`opacity-100`
)} ></div>
<div
className={cn(
`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
`[transform-origin:calc(50%-400px)]`,
`animate-second`,
`opacity-100`
)} ></div>
<div
className={cn(
`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
`[transform-origin:calc(50%+400px)]`,
`animate-third`,
`opacity-100`
)} ></div>
<div
className={cn(
`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
`[transform-origin:calc(50%-200px)]`,
`animate-fourth`,
`opacity-70`
)} ></div>
<div
className={cn(
`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
`[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
`[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
`animate-fifth`,
`opacity-100`
)} ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>

);
};

Props
Prop Name Type Default Value Description
gradientBackgroundStart string "rgb(108, 0, 162)" The starting color of the background gradient, specified as an RGB value.
gradientBackgroundEnd string "rgb(0, 17, 82)" The ending color of the background gradient, specified as an RGB value.
firstColor string "18, 113, 255" The first color used in the animation, specified as an RGB value without the rgb tag.
secondColor string "221, 74, 255" The second color used in the animation, specified as an RGB value without the rgb tag.
thirdColor string "100, 220, 255" The third color used in the animation, specified as an RGB value without the rgb tag.
fourthColor string "200, 50, 50" The fourth color used in the animation, specified as an RGB value without the rgb tag.
fifthColor string "180, 180, 50" The fifth color used in the animation, specified as an RGB value without the rgb tag.
pointerColor string "140, 100, 255" The color of the pointer, specified as an RGB value without the rgb tag.
size string "80%" The size of the animated elements.
blendingValue string "hard-light" The blending mode used for the animated elements.
children React.ReactNode undefined Children components to be rendered inside the component.
className string undefined Additional CSS class for styling.
interactive boolean true Determines if the animation is interactive or not.
containerClassName string undefined Additional CSS class for the con
