Glowing Background Stars Card

Card background stars that animate on hover and animate anyway
hero
card
section
special

"use client";
import React from "react";
import {
GlowingStarsBackgroundCard,
GlowingStarsDescription,
GlowingStarsTitle,
} from "../ui/glowing-stars";

export function GlowingStarsBackgroundCardPreview() {
return (
<div className="flex py-20 items-center justify-center antialiased">
<GlowingStarsBackgroundCard>
<GlowingStarsTitle>Next.js 14</GlowingStarsTitle>
<div className="flex justify-between items-end">
<GlowingStarsDescription>
The power of full-stack to the frontend. Read the release notes.
</GlowingStarsDescription>
<div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
<Icon />
</div>
</div>
</GlowingStarsBackgroundCard>
</div>
);
}

const Icon = () => {
return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
<path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
</svg>
);
};

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

components/ui/glowing-stars.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/\_utils";

export const GlowingStarsBackgroundCard = ({
className,
children,
}: {
className?: string;
children?: React.ReactNode;
}) => {
const [mouseEnter, setMouseEnter] = useState(false);

return (
<div
onMouseEnter={() => {
setMouseEnter(true);
}}
onMouseLeave={() => {
setMouseEnter(false);
}}
className={cn(
"bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md max-h-[20rem] h-full w-full rounded-xl border border-[#eaeaea] dark:border-neutral-600",
className
)} >
<div className="flex justify-center items-center">
<Illustration mouseEnter={mouseEnter} />
</div>
<div className="px-2 pb-6">{children}</div>
</div>
);
};

export const GlowingStarsDescription = ({
className,
children,
}: {
className?: string;
children?: React.ReactNode;
}) => {
return (
<p className={cn("text-base text-white max-w-[16rem]", className)}>
{children}
</p>
);
};

export const GlowingStarsTitle = ({
className,
children,
}: {
className?: string;
children?: React.ReactNode;
}) => {
return (
<h2 className={cn("font-bold text-2xl text-[#eaeaea]", className)}>
{children}
</h2>
);
};

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
const stars = 108;
const columns = 18;

const [glowingStars, setGlowingStars] = useState<number[]>([]);

const highlightedStars = useRef<number[]>([]);

useEffect(() => {
const interval = setInterval(() => {
highlightedStars.current = Array.from({ length: 5 }, () =>
Math.floor(Math.random() \* stars)
);
setGlowingStars([...highlightedStars.current]);
}, 3000);

    return () => clearInterval(interval);

}, []);

return (
<div
className="h-48 p-1 w-full"
style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }} >
{[...Array(stars)].map((\_, starIdx) => {
const isGlowing = glowingStars.includes(starIdx);
const delay = (starIdx % 10) _ 0.1;
const staticDelay = starIdx _ 0.01;
return (
<div
key={`matrix-col-${starIdx}}`}
className="relative flex items-center justify-center" >
<Star
isGlowing={mouseEnter ? true : isGlowing}
delay={mouseEnter ? staticDelay : delay}
/>
{mouseEnter && <Glow delay={staticDelay} />}
<AnimatePresence mode="wait">
{isGlowing && <Glow delay={delay} />}
</AnimatePresence>
</div>
);
})}
</div>
);
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
return (
<motion.div
key={delay}
initial={{
        scale: 1,
      }}
animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")} ></motion.div>
);
};

const Glow = ({ delay }: { delay: number }) => {
return (
<motion.div
initial={{
        opacity: 0,
      }}
animate={{
        opacity: 1,
      }}
transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
exit={{
        opacity: 0,
      }}
className="absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
/>
);
};

Props
Prop name Type Description
className string The class name of the GlowingStars componen
