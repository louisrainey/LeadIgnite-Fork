[text](glowing_stars_main.md) [text](glowing_affect.md) [text](following_pointer.md)Following Pointer

A custom pointer that follows mouse arrow and animates in pointer and content.
feature
utility
special

import { FollowerPointerCard } from "../ui/following-pointer";

export function FollowingPointerDemo() {
return (
<div className="mx-auto w-80">
<FollowerPointerCard
title={
<TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
} >
<div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl">
<div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100">
<img
              src={blogContent.image}
              alt="thumbnail"
              className="h-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
            />
</div>
<div className="p-4">
<h2 className="my-4 text-lg font-bold text-zinc-700">
{blogContent.title}
</h2>
<h2 className="my-4 text-sm font-normal text-zinc-500">
{blogContent.description}
</h2>
<div className="mt-10 flex flex-row items-center justify-between">
<span className="text-sm text-gray-500">{blogContent.date}</span>
<div className="relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white">
Read More
</div>
</div>
</div>
</div>
</FollowerPointerCard>
</div>
);
}

const blogContent = {
slug: "amazing-tailwindcss-grid-layouts",
author: "Manu Arora",
date: "28th March, 2023",
title: "Amazing Tailwindcss Grid Layout Examples",
description:
"Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
image: "/demo/thumbnail.png",
authorAvatar: "/manu.png",
};

const TitleComponent = ({
title,
avatar,
}: {
title: string;
avatar: string;
}) => (

  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);

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

components/ui/following-pointer.tsx

// Core component that receives mouse positions and renders pointer and content

import React, { useEffect, useState } from "react";

import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/\_utils";

export const FollowerPointerCard = ({
children,
className,
title,
}: {
children: React.ReactNode;
className?: string;
title?: string | React.ReactNode;
}) => {
const x = useMotionValue(0);
const y = useMotionValue(0);
const ref = React.useRef<HTMLDivElement>(null);
const [rect, setRect] = useState<DOMRect | null>(null);
const [isInside, setIsInside] = useState<boolean>(false); // Add this line

useEffect(() => {
if (ref.current) {
setRect(ref.current.getBoundingClientRect());
}
}, []);

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
if (rect) {
const scrollX = window.scrollX;
const scrollY = window.scrollY;
x.set(e.clientX - rect.left + scrollX);
y.set(e.clientY - rect.top + scrollY);
}
};
const handleMouseLeave = () => {
setIsInside(false);
};

const handleMouseEnter = () => {
setIsInside(true);
};
return (
<div
onMouseLeave={handleMouseLeave}
onMouseEnter={handleMouseEnter}
onMouseMove={handleMouseMove}
style={{
        cursor: "none",
      }}
ref={ref}
className={cn("relative", className)} >
<AnimatePresence>
{isInside && <FollowPointer x={x} y={y} title={title} />}
</AnimatePresence>
{children}
</div>
);
};

export const FollowPointer = ({
x,
y,
title,
}: {
x: any;
y: any;
title?: string | React.ReactNode;
}) => {
const colors = [
"#0ea5e9",
"#737373",
"#14b8a6",
"#22c55e",
"#3b82f6",
"#ef4444",
"#eab308",
];
return (
<motion.div
className="absolute z-50 h-4 w-4 rounded-full"
style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
initial={{
        scale: 1,
        opacity: 1,
      }}
animate={{
        scale: 1,
        opacity: 1,
      }}
exit={{
        scale: 0,
        opacity: 0,
      }} >
<svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
</svg>
<motion.div
style={{
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
initial={{
          scale: 0.5,
          opacity: 0,
        }}
animate={{
          scale: 1,
          opacity: 1,
        }}
exit={{
          scale: 0.5,
          opacity: 0,
        }}
className={
"min-w-max rounded-full bg-neutral-200 px-2 py-2 text-xs whitespace-nowrap text-white"
} >
{title || `William Shakespeare`}
</motion.div>
</motion.div>
);
};

Props
FollowerPointerCard Props
Prop name Type Description
children React.ReactNode The content to be rendered inside the component.
className string (optional) The class name of the FollowerPointerCard component.
title string or ReactNode (optional) The title to be displayed on the pointer.
