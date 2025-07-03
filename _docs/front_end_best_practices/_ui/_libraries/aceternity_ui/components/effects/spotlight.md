Spotlight

A spotlight effect with Tailwind CSS, good for drawing attention to a particular element on the page.
hero
footer
section
special

import React from "react";
import { cn } from "@/lib/\_utils";

import { Spotlight } from "../ui/spotlight";

export function SpotlightPreview() {
return (
<div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
<div
className={cn(
"pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
"[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
)}
/>

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Spotlight <br /> is the new trend.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>
      </div>
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

components/ui/Spotlight.tsx

import React from "react";
import { cn } from "@/lib/\_utils";

type SpotlightProps = {
className?: string;
fill?: string;
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
return (
<svg
className={cn(
"animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
className
)}
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 3787 2842"
fill="none" >
<g filter="url(#filter)">
<ellipse
cx="1924.71"
cy="273.501"
rx="1924.71"
ry="273.501"
transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
fill={fill || "white"}
fillOpacity="0.21" ></ellipse>
</g>
<defs>
<filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
<feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
<feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
</filter>
</defs>
</svg>
);
};

Update your CSS configuration
app/globals.css

@import "tailwindcss";

@theme inline {
--animate-spotlight: spotlight 2s ease 0.75s 1 forwards;
}

@keyframes spotlight {
0% {
opacity: 0;
transform: translate(-72%, -62%) scale(0.5);
}
100% {
opacity: 1;
transform: translate(-50%, -40%) scale(1);
}
}

Props
Prop name Type Description
className string The class name of the spotlight component.
fill string Hex color for the spotlight fill.

This component is inspired from TypeHero's landing page
