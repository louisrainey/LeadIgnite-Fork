Text Hover Effect

A text hover effect that animates and outlines gradient on hover, as seen on x.ai
hover
special
text

import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function TextHoverEffectDemo() {
return (
<div className="h-[40rem] flex items-center justify-center">
<TextHoverEffect text="ACET" />
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

components/ui/text-hover-effect.tsx

"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
text,
duration,
}: {
text: string;
duration?: number;
automatic?: boolean;
}) => {
const svgRef = useRef<SVGSVGElement>(null);
const [cursor, setCursor] = useState({ x: 0, y: 0 });
const [hovered, setHovered] = useState(false);
const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

useEffect(() => {
if (svgRef.current && cursor.x !== null && cursor.y !== null) {
const svgRect = svgRef.current.getBoundingClientRect();
const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) _ 100;
const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) _ 100;
setMaskPosition({
cx: `${cxPercentage}%`,
cy: `${cyPercentage}%`,
});
}
}, [cursor]);

return (
<svg
ref={svgRef}
width="100%"
height="100%"
viewBox="0 0 300 100"
xmlns="http://www.w3.org/2000/svg"
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
className="select-none" >
<defs>
<linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
{hovered && (
<>
<stop offset="0%" stopColor="#eab308" />
<stop offset="25%" stopColor="#ef4444" />
<stop offset="50%" stopColor="#3b82f6" />
<stop offset="75%" stopColor="#06b6d4" />
<stop offset="100%" stopColor="#8b5cf6" />
</>
)}
</linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}

          // example for a smoother animation below

          //   transition={{
          //     type: "spring",
          //     stiffness: 300,
          //     damping: 50,
          //   }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>

);
};

Props
Prop Type Default Description
text string Required The text to be displayed with the hover effect
duration number 0 The duration of the mask transition animation in seconds

The initial code of this component is contributed by Sudhanshu Mishra
