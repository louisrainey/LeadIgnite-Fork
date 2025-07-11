Layout Grid

A layout effect that animates the grid item on click, powered by framer motion layout
section
features
special
product

"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../ui/layout-grid";

export function LayoutGridDemo() {
return (
<div className="h-screen py-20 w-full">
<LayoutGrid cards={cards} />
</div>
);
}

const SkeletonOne = () => {
return (
<div>
<p className="font-bold md:text-4xl text-xl text-white">
House in the woods
</p>
<p className="font-normal text-base text-white"></p>
<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
A serene and tranquil retreat, this house in the woods offers a peaceful
escape from the hustle and bustle of city life.
</p>
</div>
);
};

const SkeletonTwo = () => {
return (
<div>
<p className="font-bold md:text-4xl text-xl text-white">
House above the clouds
</p>
<p className="font-normal text-base text-white"></p>
<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
Perched high above the world, this house offers breathtaking views and a
unique living experience. It&apos;s a place where the sky meets home,
and tranquility is a way of life.
</p>
</div>
);
};
const SkeletonThree = () => {
return (
<div>
<p className="font-bold md:text-4xl text-xl text-white">
Greens all over
</p>
<p className="font-normal text-base text-white"></p>
<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
perfect place to relax, unwind, and enjoy life.
</p>
</div>
);
};
const SkeletonFour = () => {
return (
<div>
<p className="font-bold md:text-4xl text-xl text-white">
Rivers are serene
</p>
<p className="font-normal text-base text-white"></p>
<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
A house by the river is a place of peace and tranquility. It&apos;s the
perfect place to relax, unwind, and enjoy life.
</p>
</div>
);
};

const cards = [
{
id: 1,
content: <SkeletonOne />,
className: "md:col-span-2",
thumbnail:
"https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
{
id: 2,
content: <SkeletonTwo />,
className: "col-span-1",
thumbnail:
"https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
{
id: 3,
content: <SkeletonThree />,
className: "col-span-1",
thumbnail:
"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
{
id: 4,
content: <SkeletonFour />,
className: "md:col-span-2",
thumbnail:
"https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
];

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

components/ui/layout-grid.tsx

"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/\_utils";

type Card = {
id: number;
content: JSX.Element | React.ReactNode | string;
className: string;
thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
const [selected, setSelected] = useState<Card | null>(null);
const [lastSelected, setLastSelected] = useState<Card | null>(null);

const handleClick = (card: Card) => {
setLastSelected(selected);
setSelected(card);
};

const handleOutsideClick = () => {
setLastSelected(selected);
setSelected(null);
};

return (
<div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4 relative">
{cards.map((card, i) => (
<div key={i} className={cn(card.className, "")}>
<motion.div
onClick={() => handleClick(card)}
className={cn(
card.className,
"relative overflow-hidden",
selected?.id === card.id
? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
: lastSelected?.id === card.id
? "z-40 bg-white rounded-xl h-full w-full"
: "bg-white rounded-xl h-full w-full"
)}
layoutId={`card-${card.id}`} >
{selected?.id === card.id && <SelectedCard selected={selected} />}
<ImageComponent card={card} />
</motion.div>
</div>
))}
<motion.div
onClick={handleOutsideClick}
className={cn(
"absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
selected?.id ? "pointer-events-auto" : "pointer-events-none"
)}
animate={{ opacity: selected?.id ? 0.3 : 0 }}
/>
</div>
);
};

const ImageComponent = ({ card }: { card: Card }) => {
return (
<motion.img
layoutId={`image-${card.id}-image`}
src={card.thumbnail}
height="500"
width="500"
className={cn(
"object-cover object-top absolute inset-0 h-full w-full transition duration-200"
)}
alt="thumbnail"
/>
);
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
return (
<div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
<motion.div
initial={{
          opacity: 0,
        }}
animate={{
          opacity: 0.6,
        }}
className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
/>
<motion.div
layoutId={`content-${selected?.id}`}
initial={{
          opacity: 0,
          y: 100,
        }}
animate={{
          opacity: 1,
          y: 0,
        }}
exit={{
          opacity: 0,
          y: 100,
        }}
transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
className="relative px-8 pb-4 z-[70]" >
{selected?.content}
</motion.div>
</div>
);
};

Props
Prop Type Description
cards Card[] An array of Card objects. Each Card object should have the following properties: id (a unique identifier), content (the JSX.Element to be displayed), className (the CSS class name for the card), and thumbnail (the URL of the thumbnail image).

The Card type is defined as follows:
Property Type Description
id number A unique identifier for the card.
content JSX.Element | React.ReactNode | string The content to be displayed in the card.
className string The CSS class name for the card.
thumbnail string The URL of the thumbnail image for the card.
