Docs
Terminal
Terminal

An implementation of the MacOS terminal. Useful for showcasing a command line interface.

import {
AnimatedSpan,
Terminal,
TypingAnimation,
} from "@/registry/magicui/terminal";

export function TerminalDemo() {
return (
<Terminal>
<TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>

      <AnimatedSpan delay={1500} className="text-green-500">
        <span>✔ Preflight checks.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2000} className="text-green-500">
        <span>✔ Verifying framework. Found Next.js.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2500} className="text-green-500">
        <span>✔ Validating Tailwind CSS.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3000} className="text-green-500">
        <span>✔ Validating import alias.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3500} className="text-green-500">
        <span>✔ Writing components.json.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4000} className="text-green-500">
        <span>✔ Checking registry.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4500} className="text-green-500">
        <span>✔ Updating tailwind.config.ts</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5000} className="text-green-500">
        <span>✔ Updating app/globals.css</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5500} className="text-green-500">
        <span>✔ Installing dependencies.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={6000} className="text-blue-500">
        <span>ℹ Updated 1 file:</span>
        <span className="pl-2">- lib/utils.ts</span>
      </AnimatedSpan>

      <TypingAnimation delay={6500} className="text-muted-foreground">
        Success! Project initialization completed.
      </TypingAnimation>

      <TypingAnimation delay={7000} className="text-muted-foreground">
        You may now add components.
      </TypingAnimation>
    </Terminal>

);
}

Installation
Copy and paste the following code into your project.

"use client";

import { cn } from "@/lib/\_utils";

import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedSpanProps extends MotionProps {
children: React.ReactNode;
delay?: number;
className?: string;
}

export const AnimatedSpan = ({
children,
delay = 0,
className,
...props
}: AnimatedSpanProps) => (
<motion.div
initial={{ opacity: 0, y: -5 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, delay: delay / 1000 }}
className={cn("grid text-sm font-normal tracking-tight", className)}
{...props}

>

    {children}

</motion.div>
);

interface TypingAnimationProps extends MotionProps {
children: string;
className?: string;
duration?: number;
delay?: number;
as?: React.ElementType;
}

export const TypingAnimation = ({
children,
className,
duration = 60,
delay = 0,
as: Component = "span",
...props
}: TypingAnimationProps) => {
if (typeof children !== "string") {
throw new Error("TypingAnimation: children must be a string. Received:");
}

const MotionComponent = motion.create(Component, {
forwardMotionProps: true,
});

const [displayedText, setDisplayedText] = useState<string>("");
const [started, setStarted] = useState(false);
const elementRef = useRef<HTMLElement | null>(null);

useEffect(() => {
const startTimeout = setTimeout(() => {
setStarted(true);
}, delay);
return () => clearTimeout(startTimeout);
}, [delay]);

useEffect(() => {
if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };

}, [children, duration, started]);

return (
<MotionComponent
ref={elementRef}
className={cn("text-sm font-normal tracking-tight", className)}
{...props} >
{displayedText}
</MotionComponent>
);
};

interface TerminalProps {
children: React.ReactNode;
className?: string;
}

export const Terminal = ({ children, className }: TerminalProps) => {
return (
<div
className={cn(
"z-0 h-full max-h-[400px] w-full max-w-lg rounded-xl border border-border bg-background",
className,
)} >
<div className="flex flex-col gap-y-2 border-b border-border p-4">
<div className="flex flex-row gap-x-2">
<div className="h-2 w-2 rounded-full bg-red-500"></div>
<div className="h-2 w-2 rounded-full bg-yellow-500"></div>
<div className="h-2 w-2 rounded-full bg-green-500"></div>
</div>
</div>
<pre className="p-4">
<code className="grid gap-y-1 overflow-auto">{children}</code>
</pre>
</div>
);
};

Usage

import {
AnimatedSpan,
Terminal,
TypingAnimation,
} from "@/components/magicui/terminal";

<Terminal>
  <TypingAnimation>
    <AnimatedSpan>Hello, world!</AnimatedSpan>
    <TypingAnimation>MagicUI is awesome!</TypingAnimation>
  </TypingAnimation>
</Terminal>

Props
Terminal
Prop Type Default Description
children ReactNode - Content to be typed out in the terminal.
className string - Custom CSS class for styling.
AnimatedSpan
Prop Type Default Description
children ReactNode - Content to be animated.
delay number 0 Delay in milliseconds before the animation starts.
className string - Custom CSS class for styling.
TypingAnimation
Prop Type Default Description
children ReactNode - Content to be animated.
delay number 0 Delay in milliseconds before the animation starts.
className string - Custom CSS class for styling.
duration number 100 Duration in milliseconds for each character typed.
as React.ElementType
