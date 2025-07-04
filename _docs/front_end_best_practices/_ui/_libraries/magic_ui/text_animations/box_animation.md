Box Reveal Animation

Sliding box animation that reveals text behind it.

import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/registry/magicui/box-reveal";

export function BoxRevealDemo() {
return (
<div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
<BoxReveal boxColor={"#5046e6"} duration={0.5}>
<p className="text-[3.5rem] font-semibold">
Magic UI<span className="text-[#5046e6]">.</span>
</p>
</BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          UI library for{" "}
          <span className="text-[#5046e6]">Design Engineers</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6">
          <p>
            -&gt; 20+ free and open-source animated components built with
            <span className="font-semibold text-[#5046e6]">React</span>,
            <span className="font-semibold text-[#5046e6]">Typescript</span>,
            <span className="font-semibold text-[#5046e6]">Tailwind CSS</span>,
            and
            <span className="font-semibold text-[#5046e6]">Motion</span>
            . <br />
            -&gt; 100% open-source, and customizable. <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Button className="mt-[1.6rem] bg-[#5046e6]">Explore</Button>
      </BoxReveal>
    </div>

);
}

Installation
Copy and paste the following code into your project.

"use client";

import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface BoxRevealProps {
children: JSX.Element;
width?: "fit-content" | "100%";
boxColor?: string;
duration?: number;
}

export const BoxReveal = ({
children,
width = "fit-content",
boxColor = "#5046e6",
duration,
}: BoxRevealProps) => {
const mainControls = useAnimation();
const slideControls = useAnimation();

const ref = useRef(null);
const isInView = useInView(ref, { once: true });

useEffect(() => {
if (isInView) {
slideControls.start("visible");
mainControls.start("visible");
} else {
slideControls.start("hidden");
mainControls.start("hidden");
}
}, [isInView, mainControls, slideControls]);

return (
<div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
<motion.div
variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
initial="hidden"
animate={mainControls}
transition={{ duration: duration ? duration : 0.5, delay: 0.25 }} >
{children}
</motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ? duration : 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
        }}
      />
    </div>

);
};

Update the import paths to match your project setup.
Usage

import { BoxReveal } from "@/components/magicui/box-reveal";

<BoxReveal>Box Reveal</BoxReveal>

Props
Prop Type Default Description
className string - The class name to be applied to the component
boxColor string #5046e6 Color of the box overlaying the text
duration number 0.5 Durations (seconds) of the animation
