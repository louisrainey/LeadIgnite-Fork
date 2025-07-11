Direction Aware Hover

A direction aware hover effect using Framer Motion, Tailwindcss and good old javascript.
card
features
hover
product

"use client";
import { DirectionAwareHover } from "../ui/direction-aware-hover";

export function DirectionAwareHoverDemo() {
const imageUrl =
"https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
return (
<div className="h-[40rem] relative  flex items-center justify-center">
<DirectionAwareHover imageUrl={imageUrl}>
<p className="font-bold text-xl">In the mountains</p>
<p className="font-normal text-sm">$1299 / night</p>
</DirectionAwareHover>
</div>
);
}

Installation
Install dependencies

npm i motion clsx tailwind-merge

Add util file
lib/utils.ts

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

Copy the source code

components/ui/direction-aware-hover.tsx

"use client";

import { useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
imageUrl,
children,
childrenClassName,
imageClassName,
className,
}: {
imageUrl: string;
children: React.ReactNode | string;
childrenClassName?: string;
imageClassName?: string;
className?: string;
}) => {
const ref = useRef<HTMLDivElement>(null);

const [direction, setDirection] = useState<
"top" | "bottom" | "left" | "right" | string

> ("left");

const handleMouseEnter = (
event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
if (!ref.current) return;

    const direction = getDirection(event, ref.current);
    console.log("direction", direction);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }

};

const getDirection = (
ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
obj: HTMLElement
) => {
const { width: w, height: h, left, top } = obj.getBoundingClientRect();
const x = ev.clientX - left - (w / 2) _ (w > h ? h / w : 1);
const y = ev.clientY - top - (h / 2) _ (h > w ? w / h : 1);
const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
return d;
};

return (
<motion.div
onMouseEnter={handleMouseEnter}
ref={ref}
className={cn(
"md:h-96 w-60 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden group/card relative",
className
)} >
<AnimatePresence mode="wait">
<motion.div
className="relative h-full w-full"
initial="initial"
whileHover={direction}
exit="exit" >
<motion.div className="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500" />
<motion.div
variants={variants}
className="h-full w-full relative bg-gray-50 dark:bg-black"
transition={{
              duration: 0.2,
              ease: "easeOut",
            }} >
<img
alt="image"
className={cn(
"h-full w-full object-cover scale-[1.15]",
imageClassName
)}
width="1000"
height="1000"
src={imageUrl}
/>
</motion.div>
<motion.div
variants={textVariants}
transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
className={cn(
"text-white absolute bottom-4 left-4 z-40",
childrenClassName
)} >
{children}
</motion.div>
</motion.div>
</AnimatePresence>
</motion.div>
);
};

const variants = {
initial: {
x: 0,
},

exit: {
x: 0,
y: 0,
},
top: {
y: 20,
},
bottom: {
y: -20,
},
left: {
x: 20,
},
right: {
x: -20,
},
};

const textVariants = {
initial: {
y: 0,
x: 0,
opacity: 0,
},
exit: {
y: 0,
x: 0,
opacity: 0,
},
top: {
y: -20,
opacity: 1,
},
bottom: {
y: 2,
opacity: 1,
},
left: {
x: -2,
opacity: 1,
},
right: {
x: 20,
opacity: 1,
},
};

Props
Prop Type Description
imageUrl string The URL of the image to be displayed.
children React.ReactNode or string The content to be displayed over the image.
childrenClassName string (optional) The CSS class to be applied to the children.
imageClassName string (optional) The CSS class to be applied to the image.
