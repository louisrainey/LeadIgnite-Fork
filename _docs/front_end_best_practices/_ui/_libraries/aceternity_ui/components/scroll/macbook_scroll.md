Fey.com Macbook Scroll

Scroll through the page and see the image come out of the screen, as seen on Fey.com website.
hero
footer
section
special
parallax

import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export function MacbookScrollDemo() {
return (
<div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
<MacbookScroll
title={
<span>
This Macbook is built with Tailwindcss. <br /> No kidding.
</span>
}
badge={
<a href="https://peerlist.io/manuarora">
<Badge className="h-10 w-10 transform -rotate-12" />
</a>
}
src={`/linear.webp`}
showGradient={false}
/>
</div>
);
}
// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
return (
<svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
<path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
<path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
<path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
<path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      ></path>
<path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      ></path>
</svg>
);
};

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

components/ui/macbook-scroll.tsx

"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/\_utils";

import {
IconBrightnessDown,
IconBrightnessUp,
IconCaretRightFilled,
IconCaretUpFilled,
IconChevronUp,
IconMicrophone,
IconMoon,
IconPlayerSkipForward,
IconPlayerTrackNext,
IconPlayerTrackPrev,
IconTable,
IconVolume,
IconVolume2,
IconVolume3,
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";

export const MacbookScroll = ({
src,
showGradient,
title,
badge,
}: {
src?: string;
showGradient?: boolean;
title?: string | React.ReactNode;
badge?: React.ReactNode;
}) => {
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
target: ref,
offset: ["start start", "end start"],
});

const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
if (window && window.innerWidth < 768) {
setIsMobile(true);
}
}, []);

const scaleX = useTransform(
scrollYProgress,
[0, 0.3],
[1.2, isMobile ? 1 : 1.5],
);
const scaleY = useTransform(
scrollYProgress,
[0, 0.3],
[0.6, isMobile ? 1 : 1.5],
);
const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

return (
<div
      ref={ref}
      className="flex min-h-[200vh] shrink-0 scale-[0.35] transform flex-col items-center justify-start py-0 [perspective:800px] sm:scale-50 md:scale-100 md:py-80"
    >
<motion.h2
style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
className="mb-20 text-center text-3xl font-bold text-neutral-800 dark:text-white" >
{title || (
<span>
This Macbook is built with Tailwindcss. <br /> No kidding.
</span>
)}
</motion.h2>
{/_ Lid _/}
<Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
{/_ Base area _/}
<div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
{/_ above keyboard bar _/}
<div className="relative h-10 w-full">
<div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
</div>
<div className="relative flex">
<div className="mx-auto h-full w-[10%] overflow-hidden">
<SpeakerGrid />
</div>
<div className="mx-auto h-full w-[80%]">
<Keypad />
</div>
<div className="mx-auto h-full w-[10%] overflow-hidden">
<SpeakerGrid />
</div>
</div>
<Trackpad />
<div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
{showGradient && (
<div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black"></div>
)}
{badge && <div className="absolute bottom-4 left-4">{badge}</div>}
</div>
</div>
);
};

export const Lid = ({
scaleX,
scaleY,
rotate,
translate,
src,
}: {
scaleX: MotionValue<number>;
scaleY: MotionValue<number>;
rotate: MotionValue<number>;
translate: MotionValue<number>;
src?: string;
}) => {
return (
<div className="relative [perspective:800px]">
<div
style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2" >
<div
style={{
            boxShadow: "0px 2px 0px 2px #171717 inset",
          }}
className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]" >
<span className="text-white">
<AceternityLogo />
</span>
</div>
</div>
<motion.div
style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2" >
<div className="absolute inset-0 rounded-lg bg-[#272729]" />
<img
src={src as string}
alt="aceternity logo"
className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
/>
</motion.div>
</div>
);
};

export const Trackpad = () => {
return (
<div
className="mx-auto my-1 h-32 w-[40%] rounded-xl"
style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }} ></div>
);
};

export const Keypad = () => {
return (
<div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
{/_ First Row _/}
<div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
<KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
esc
</KBtn>
<KBtn>
<IconBrightnessDown className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F1</span>
</KBtn>
<KBtn>
<IconBrightnessUp className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F2</span>
</KBtn>
<KBtn>
<IconTable className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F3</span>
</KBtn>
<KBtn>
<IconSearch className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F4</span>
</KBtn>
<KBtn>
<IconMicrophone className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F5</span>
</KBtn>
<KBtn>
<IconMoon className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F6</span>
</KBtn>
<KBtn>
<IconPlayerTrackPrev className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F7</span>
</KBtn>
<KBtn>
<IconPlayerSkipForward className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F8</span>
</KBtn>
<KBtn>
<IconPlayerTrackNext className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F8</span>
</KBtn>
<KBtn>
<IconVolume3 className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F10</span>
</KBtn>
<KBtn>
<IconVolume2 className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F11</span>
</KBtn>
<KBtn>
<IconVolume className="h-[6px] w-[6px]" />
<span className="mt-1 inline-block">F12</span>
</KBtn>
<KBtn>
<div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
<div className="h-full w-full rounded-full bg-black" />
</div>
</KBtn>
</div>

      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>
        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>
        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </div>

      {/* sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>

);
};

export const KBtn = ({
className,
children,
childrenClassName,
backlit = true,
}: {
className?: string;
children?: React.ReactNode;
childrenClassName?: string;
backlit?: boolean;
}) => {
return (
<div
className={cn(
"[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
backlit && "bg-white/[0.2] shadow-xl shadow-white",
)} >
<div
className={cn(
"flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
className,
)}
style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }} >
<div
className={cn(
"flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
childrenClassName,
backlit && "text-white",
)} >
{children}
</div>
</div>
</div>
);
};

export const SpeakerGrid = () => {
return (
<div
className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }} ></div>
);
};

export const OptionKey = ({ className }: { className: string }) => {
return (
<svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
<rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
<polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
<rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
</svg>
);
};

const AceternityLogo = () => {
return (
<svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
<path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
</svg>
);
};

Props
Prop Type Description Default Value
src string Source URL for the MacBook screen image. undefined
showGradient boolean Flag to show/hide the gradient overlay. undefined
title string | ReactNode Title text or React node displayed above the MacBook. undefined
badge ReactNode Sticker displayed at the bottom left of the Macbook undefined

The design is inspired from Fey's landing page hero section.
