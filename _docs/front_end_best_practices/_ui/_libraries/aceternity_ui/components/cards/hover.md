Hover Effect

Hover over the cards and the effect slides to the currently hovered card.
card
special

import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
return (
<div className="max-w-5xl mx-auto px-8">
<HoverEffect items={projects} />
</div>
);
}
export const projects = [
{
title: "Stripe",
description:
"A technology company that builds economic infrastructure for the internet.",
link: "https://stripe.com",
},
{
title: "Netflix",
description:
"A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
link: "https://netflix.com",
},
{
title: "Google",
description:
"A multinational technology company that specializes in Internet-related services and products.",
link: "https://google.com",
},
{
title: "Meta",
description:
"A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
link: "https://meta.com",
},
{
title: "Amazon",
description:
"A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
link: "https://amazon.com",
},
{
title: "Microsoft",
description:
"A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
link: "https://microsoft.com",
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

components/ui/card-hover-effect.tsx

import { cn } from "@/lib/\_utils";

import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({
items,
className,
}: {
items: {
title: string;
description: string;
link: string;
}[];
className?: string;
}) => {
let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

return (
<div
className={cn(
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
className
)} >
{items.map((item, idx) => (
<a
href={item?.link}
key={item?.link}
className="relative group block p-2 h-full w-full"
onMouseEnter={() => setHoveredIndex(idx)}
onMouseLeave={() => setHoveredIndex(null)} >
<AnimatePresence>
{hoveredIndex === idx && (
<motion.span
className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
layoutId="hoverBackground"
initial={{ opacity: 0 }}
animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
/>
)}
</AnimatePresence>
<Card>
<CardTitle>{item.title}</CardTitle>
<CardDescription>{item.description}</CardDescription>
</Card>
</a>
))}
</div>
);
};

export const Card = ({
className,
children,
}: {
className?: string;
children: React.ReactNode;
}) => {
return (
<div
className={cn(
"rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
className
)} >
<div className="relative z-50">
<div className="p-4">{children}</div>
</div>
</div>
);
};
export const CardTitle = ({
className,
children,
}: {
className?: string;
children: React.ReactNode;
}) => {
return (
<h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
{children}
</h4>
);
};
export const CardDescription = ({
className,
children,
}: {
className?: string;
children: React.ReactNode;
}) => {
return (
<p
className={cn(
"mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
className
)} >
{children}
</p>
);
};

Props
Prop name Type Description
className string The class name of the child component.
items {title: string, description: string, link: ReactNode} items that you can map through, passed as props to the HoverEffect component
children ReactNode Children to the Card CardTitle and CardDescription component
Build websites faster and 10x better than your competitors with Aceternity UI Pro

With the best in class components and templates, stand out from the crowd and get more attention to your website. Trusted by founders and entrepreneurs from all over the world.
Go Pro
Excellent
