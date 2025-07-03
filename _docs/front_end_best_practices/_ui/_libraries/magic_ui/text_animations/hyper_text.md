Hyper Text

A text animation that scrambles letters before revealing the final text.

import { HyperText } from "@/registry/magicui/hyper-text";

export function HyperTextDemo() {
return <HyperText>Hover Me!</HyperText>;
}

Installation
Install the following dependencies:

pnpm add motion

Copy and paste the following code into your project.

"use client";

import { cn } from "@/lib/\_utils";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps extends MotionProps {
/** The text content to be animated \*/
children: string;
/** Optional className for styling _/
className?: string;
/\*\* Duration of the animation in milliseconds _/
duration?: number;
/** Delay before animation starts in milliseconds \*/
delay?: number;
/** Component to render as - defaults to div _/
as?: React.ElementType;
/\*\* Whether to start animation when element comes into view _/
startOnView?: boolean;
/** Whether to trigger animation on hover \*/
animateOnHover?: boolean;
/** Custom character set for scramble effect. Defaults to uppercase alphabet \*/
characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() \* max);

export function HyperText({
children,
className,
duration = 800,
delay = 0,
as: Component = "div",
startOnView = false,
animateOnHover = true,
characterSet = DEFAULT_CHARACTER_SET,
...props
}: HyperTextProps) {
const MotionComponent = motion.create(Component, {
forwardMotionProps: true,
});

const [displayText, setDisplayText] = useState<string[]>(() =>
children.split(""),
);
const [isAnimating, setIsAnimating] = useState(false);
const iterationCount = useRef(0);
const elementRef = useRef<HTMLElement>(null);

const handleAnimationTrigger = () => {
if (animateOnHover && !isAnimating) {
iterationCount.current = 0;
setIsAnimating(true);
}
};

// Handle animation start based on view or delay
useEffect(() => {
if (!startOnView) {
const startTimeout = setTimeout(() => {
setIsAnimating(true);
}, delay);
return () => clearTimeout(startTimeout);
}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();

}, [delay, startOnView]);

// Handle scramble animation
useEffect(() => {
if (!isAnimating) return;

    const maxIterations = children.length;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      iterationCount.current = progress * maxIterations;

      setDisplayText((currentText) =>
        currentText.map((letter, index) =>
          letter === " "
            ? letter
            : index <= iterationCount.current
              ? children[index]
              : characterSet[getRandomInt(characterSet.length)],
        ),
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);

}, [children, duration, isAnimating, characterSet]);

return (
<MotionComponent
ref={elementRef}
className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
onMouseEnter={handleAnimationTrigger}
{...props} >
<AnimatePresence>
{displayText.map((letter, index) => (
<motion.span
key={index}
className={cn("font-mono", letter === " " ? "w-3" : "")} >
{letter.toUpperCase()}
</motion.span>
))}
</AnimatePresence>
</MotionComponent>
);
}

Update the import paths to match your project setup.
Usage

import { HyperText } from "@/components/magicui/hyper-text";

<HyperText>Hover me</HyperText>

Props
Prop Type Default Description
children string - Text content to animate
className string - The class name to be applied to the component
duration number 800 Duration of the animation in milliseconds
delay number 0 Delay before animation starts (in ms)
as React.ElementType "div" Component to render as
startOnView boolean false Start animation when component is in view
animateOnHover boolean true Enable hover animation
characterSet string[] A-Z Custom character set for scramble effect
