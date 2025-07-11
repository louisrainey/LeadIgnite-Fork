Animated Tabs

Tabs to switch content, click on a tab to check background animation.
hero
features
product
utility

"use client";

import { Tabs } from "../ui/tabs";

export function TabsDemo() {
const tabs = [
{
title: "Product",
value: "product",
content: (
<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
<p>Product Tab</p>
<DummyContent />
</div>
),
},
{
title: "Services",
value: "services",
content: (
<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
<p>Services tab</p>
<DummyContent />
</div>
),
},
{
title: "Playground",
value: "playground",
content: (
<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
<p>Playground tab</p>
<DummyContent />
</div>
),
},
{
title: "Content",
value: "content",
content: (
<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
<p>Content tab</p>
<DummyContent />
</div>
),
},
{
title: "Random",
value: "random",
content: (
<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
<p>Random tab</p>
<DummyContent />
</div>
),
},
];

return (
<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
<Tabs tabs={tabs} />
</div>
);
}

const DummyContent = () => {
return (
<img
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
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

components/ui/tabs.tsx

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/\_utils";

type Tab = {
title: string;
value: string;
content?: string | React.ReactNode | any;
};

export const Tabs = ({
tabs: propTabs,
containerClassName,
activeTabClassName,
tabClassName,
contentClassName,
}: {
tabs: Tab[];
containerClassName?: string;
activeTabClassName?: string;
tabClassName?: string;
contentClassName?: string;
}) => {
const [active, setActive] = useState<Tab>(propTabs[0]);
const [tabs, setTabs] = useState<Tab[]>(propTabs);

const moveSelectedTabToTop = (idx: number) => {
const newTabs = [...propTabs];
const selectedTab = newTabs.splice(idx, 1);
newTabs.unshift(selectedTab[0]);
setTabs(newTabs);
setActive(newTabs[0]);
};

const [hovering, setHovering] = useState(false);

return (
<>
<div
className={cn(
"flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
containerClassName
)} >
{propTabs.map((tab, idx) => (
<button
key={tab.title}
onClick={() => {
moveSelectedTabToTop(idx);
}}
onMouseEnter={() => setHovering(true)}
onMouseLeave={() => setHovering(false)}
className={cn("relative px-4 py-2 rounded-full", tabClassName)}
style={{
              transformStyle: "preserve-3d",
            }} >
{active.value === tab.value && (
<motion.div
layoutId="clickedbutton"
transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
className={cn(
"absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
activeTabClassName
)}
/>
)}

            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>

);
};

export const FadeInDiv = ({
className,
tabs,
hovering,
}: {
className?: string;
key?: string;
tabs: Tab[];
active: Tab;
hovering?: boolean;
}) => {
const isActive = (tab: Tab) => {
return tab.value === tabs[0].value;
};
return (
<div className="relative w-full h-full">
{tabs.map((tab, idx) => (
<motion.div
key={tab.value}
layoutId={tab.value}
style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
className={cn("w-full h-full absolute top-0 left-0", className)} >
{tab.content}
</motion.div>
))}
</div>
);
};

Copy to globals.css to hide scrollbar (optional)
globals.css

.no-visible-scrollbar {
scrollbar-width: none;
-ms-overflow-style: none;
-webkit-overflow-scrolling: touch;
}

.no-visible-scrollbar::-webkit-scrollbar {
display: none;
}

Props
Prop Type Description
tabs Tab[] An array of Tab objects. Each Tab object has title, value, and content properties.
containerClassName string Optional. CSS class name for the container div.
activeTabClassName string Optional. CSS class name for the active tab.
tabClassName string Optional. CSS class name for the tab.
contentClassName string Optional. CSS class name for the content div.

FadeInDiv Component
Prop Type Description
className string Optional. CSS class name for the FadeInDiv.
tabs Tab[] An array of Tab objects. Each Tab object has title, value, and content properties.
active Tab The currently active Tab object.
hovering boolean Optional. A boolean indicating whether the mouse is hovering over the component.
Build websites faster and 10x better than your competitors with Aceternity UI Pro

With the best in class components and templates, stand out from the crowd and get more attention to your website. Trusted by founders and entrepreneurs from all over the world.
Go Pro
