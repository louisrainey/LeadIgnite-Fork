Floating Dock

A floating dock mac os style component, acts as a navigation bar.
form
special

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
IconBrandGithub,
IconBrandX,
IconExchange,
IconHome,
IconNewSection,
IconTerminal2,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
const links = [
{
title: "Home",
icon: (
<IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
),
href: "#",
},

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

];
return (
<div className="flex items-center justify-center h-[35rem] w-full">
<FloatingDock
mobileClassName="translate-y-20" // only for demo, remove for production
items={links}
/>
</div>
);
}

Installation
Install dependencies

npm i motion clsx tailwind-merge @tabler/icons-react

Add util file
lib/utils.ts

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

Copy the source code

components/ui/floating-dock.tsx

/\*\*

- Note: Use position fixed according to your needs
- Desktop navbar is better positioned at the bottom
- Mobile navbar is better positioned at bottom right.
  \*\*/

import { cn } from "@/lib/\_utils";

import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
AnimatePresence,
MotionValue,
motion,
useMotionValue,
useSpring,
useTransform,
} from "motion/react";

import { useRef, useState } from "react";

export const FloatingDock = ({
items,
desktopClassName,
mobileClassName,
}: {
items: { title: string; icon: React.ReactNode; href: string }[];
desktopClassName?: string;
mobileClassName?: string;
}) => {
return (
<>
<FloatingDockDesktop items={items} className={desktopClassName} />
<FloatingDockMobile items={items} className={mobileClassName} />
</>
);
};

const FloatingDockMobile = ({
items,
className,
}: {
items: { title: string; icon: React.ReactNode; href: string }[];
className?: string;
}) => {
const [open, setOpen] = useState(false);
return (
<div className={cn("relative block md:hidden", className)}>
<AnimatePresence>
{open && (
<motion.div
layoutId="nav"
className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2" >
{items.map((item, idx) => (
<motion.div
key={item.title}
initial={{ opacity: 0, y: 10 }}
animate={{
                  opacity: 1,
                  y: 0,
                }}
exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
transition={{ delay: (items.length - 1 - idx) * 0.05 }} >
<a
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
<div className="h-4 w-4">{item.icon}</div>
</a>
</motion.div>
))}
</motion.div>
)}
</AnimatePresence>
<button
onClick={() => setOpen(!open)}
className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800" >
<IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
</button>
</div>
);
};

const FloatingDockDesktop = ({
items,
className,
}: {
items: { title: string; icon: React.ReactNode; href: string }[];
className?: string;
}) => {
let mouseX = useMotionValue(Infinity);
return (
<motion.div
onMouseMove={(e) => mouseX.set(e.pageX)}
onMouseLeave={() => mouseX.set(Infinity)}
className={cn(
"mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
className,
)} >
{items.map((item) => (
<IconContainer mouseX={mouseX} key={item.title} {...item} />
))}
</motion.div>
);
};

function IconContainer({
mouseX,
title,
icon,
href,
}: {
mouseX: MotionValue;
title: string;
icon: React.ReactNode;
href: string;
}) {
let ref = useRef<HTMLDivElement>(null);

let distance = useTransform(mouseX, (val) => {
let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;

});

let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
let heightTransformIcon = useTransform(
distance,
[-150, 0, 150],
[20, 40, 20],
);

let width = useSpring(widthTransform, {
mass: 0.1,
stiffness: 150,
damping: 12,
});
let height = useSpring(heightTransform, {
mass: 0.1,
stiffness: 150,
damping: 12,
});

let widthIcon = useSpring(widthTransformIcon, {
mass: 0.1,
stiffness: 150,
damping: 12,
});
let heightIcon = useSpring(heightTransformIcon, {
mass: 0.1,
stiffness: 150,
damping: 12,
});

const [hovered, setHovered] = useState(false);

return (
<a href={href}>
<motion.div
ref={ref}
style={{ width, height }}
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800" >
<AnimatePresence>
{hovered && (
<motion.div
initial={{ opacity: 0, y: 10, x: "-50%" }}
animate={{ opacity: 1, y: 0, x: "-50%" }}
exit={{ opacity: 0, y: 2, x: "-50%" }}
className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white" >
{title}
</motion.div>
)}
</AnimatePresence>
<motion.div
style={{ width: widthIcon, height: heightIcon }}
className="flex items-center justify-center" >
{icon}
</motion.div>
</motion.div>
</a>
);
}

Props
Floating Dock
Prop Name Type Description
items { title: string; icon: React.ReactNode; href: string }[] Array of items to display in the dock.
desktopClassName string Optional class name for the desktop dock.
mobileClassName string Optional class name for the mobile dock.
Floating Dock Mobile
Prop Name Type Description
items { title: string; icon: React.ReactNode; href: string }[] Array of items to display in the mobile dock.
className string Optional class name for the mobile dock.
Floating Dock Desktop
Prop Name Type Description
items { title: string; icon: React.ReactNode; href: string }[] Array of items to display in the desktop dock.
className string Optional class name for the desktop dock.
IconContainer Component
Prop Name Type Description
mouseX MotionValue Motion value for the mouse X position.
title string Title of the item.
icon React.ReactNode Icon to display for the item.
href string URL to navigate to when the item is clicked.

This component is inspired by floating dock on menu on Rauno's website and it's implementation on Build UI.
