Navbar Menu

A navbar menu that animates its children on hover, makes a beautiful bignav
navbar
utility

"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/\_utils";

export function NavbarDemo() {
return (
<div className="relative w-full flex items-center justify-center">
<Navbar className="top-2" />
<p className="text-black dark:text-white">
The Navbar will show on top of the page
</p>
</div>
);
}

function Navbar({ className }: { className?: string }) {
const [active, setActive] = useState<string | null>(null);
return (
<div
className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)} >
<Menu setActive={setActive}>
<MenuItem setActive={setActive} active={active} item="Services">
<div className="flex flex-col space-y-4 text-sm">
<HoveredLink href="/web-dev">Web Development</HoveredLink>
<HoveredLink href="/interface-design">Interface Design</HoveredLink>
<HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
<HoveredLink href="/branding">Branding</HoveredLink>
</div>
</MenuItem>
<MenuItem setActive={setActive} active={active} item="Products">
<div className="  text-sm grid grid-cols-2 gap-10 p-4">
<ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
<ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
<ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
<ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
</div>
</MenuItem>
<MenuItem setActive={setActive} active={active} item="Pricing">
<div className="flex flex-col space-y-4 text-sm">
<HoveredLink href="/hobby">Hobby</HoveredLink>
<HoveredLink href="/individual">Individual</HoveredLink>
<HoveredLink href="/team">Team</HoveredLink>
<HoveredLink href="/enterprise">Enterprise</HoveredLink>
</div>
</MenuItem>
</Menu>
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

components/ui/navbar-menu.tsx

"use client";
import React from "react";
import { motion } from "motion/react";

const transition = {
type: "spring",
mass: 0.5,
damping: 11.5,
stiffness: 100,
restDelta: 0.001,
restSpeed: 0.001,
};

export const MenuItem = ({
setActive,
active,
item,
children,
}: {
setActive: (item: string) => void;
active: string | null;
item: string;
children?: React.ReactNode;
}) => {
return (
<div onMouseEnter={() => setActive(item)} className="relative ">
<motion.p
transition={{ duration: 0.3 }}
className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white" >
{item}
</motion.p>
{active !== null && (
<motion.div
initial={{ opacity: 0, scale: 0.85, y: 10 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={transition} >
{active === item && (
<div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
<motion.div
transition={transition}
layoutId="active" // layoutId ensures smooth animation
className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl" >
<motion.div
layout // layout ensures smooth animation
className="w-max h-full p-4" >
{children}
</motion.div>
</motion.div>
</div>
)}
</motion.div>
)}
</div>
);
};

export const Menu = ({
setActive,
children,
}: {
setActive: (item: string | null) => void;
children: React.ReactNode;
}) => {
return (
<nav
onMouseLeave={() => setActive(null)} // resets the state
className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 " >
{children}
</nav>
);
};

export const ProductItem = ({
title,
description,
href,
src,
}: {
title: string;
description: string;
href: string;
src: string;
}) => {
return (
<a href={href} className="flex space-x-2">
<img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
<div>
<h4 className="text-xl font-bold mb-1 text-black dark:text-white">
{title}
</h4>
<p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
{description}
</p>
</div>
</a>
);
};

export const HoveredLink = ({ children, ...rest }: any) => {
return (
<a
{...rest}
className="text-neutral-700 dark:text-neutral-200 hover:text-black " >
{children}
</a>
);
};

Props
Prop name Type Description
className string The class name of the child component.
