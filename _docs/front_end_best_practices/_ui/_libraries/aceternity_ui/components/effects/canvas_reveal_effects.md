Canvas Reveal Effect

A dot background that expands on hover, as seen on Clerk's website
card
background
gradient
canvas
special
call to action

"use client";
import React from "react";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function CanvasRevealEffectDemo() {
return (
<>
<div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
<Card title="Sheetal is Nisha" icon={<AceternityIcon />}>
<CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
</Card>
<Card title="Nisha is Munni" icon={<AceternityIcon />}>
<CanvasRevealEffect
animationSpeed={3}
containerClassName="bg-black"
colors={[
[236, 72, 153],
[232, 121, 249],
]}
dotSize={2}
/>
{/_ Radial gradient for the cute fade _/}
<div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
</Card>
<Card title="Munni is Aditi" icon={<AceternityIcon />}>
<CanvasRevealEffect
animationSpeed={3}
containerClassName="bg-sky-600"
colors={[[125, 211, 252]]}
/>
</Card>
</div>
</>
);
}

const Card = ({
title,
icon,
children,
}: {
title: string;
icon: React.ReactNode;
children?: React.ReactNode;
}) => {
const [hovered, setHovered] = React.useState(false);
return (
<div
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] relative" >
<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>

);
};

const AceternityIcon = () => {
return (
<svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
    >
<path
d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
stroke="currentColor"
strokeWidth="15"
strokeMiterlimit="3.86874"
strokeLinecap="round"
style={{ mixBlendMode: "darken" }}
/>
</svg>
);
};

export const Icon = ({ className, ...rest }: any) => {
return (
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
strokeWidth="1.5"
stroke="currentColor"
className={className}
{...rest} >
<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
</svg>
);
};

Installation
Install util dependencies

npm i motion clsx tailwind-merge three @react-three/fiber

Add util file
lib/utils.ts

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

Copy the source code

components/ui/canvas-reveal-effect.tsx

"use client";
import { cn } from "@/lib/\_utils";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import \* as THREE from "three";

export const CanvasRevealEffect = ({
animationSpeed = 0.4,
opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
colors = [[0, 255, 255]],
containerClassName,
dotSize,
showGradient = true,
}: {
/\*\*

- 0.1 - slower
- 1.0 - faster
  _/
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
  }) => {
  return (
  <div className={cn("h-full relative bg-white w-full", containerClassName)}>
  <div className="h-full w-full">
  <DotMatrix
  colors={colors ?? [[0, 255, 255]]}
  dotSize={dotSize ?? 3}
  opacities={
  opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
  }
  shader={`
  float animation_speed_factor = ${animationSpeed.toFixed(1)};
  float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) _ 0.01 + (random(st2) _ 0.15);
  opacity _= step(intro_offset, u_time _ animation_speed_factor);
  opacity _= clamp((1.0 - step(intro_offset + 0.1, u_time _ animation_speed_factor)) _ 1.25, 1.0, 1.25);
  `}
  center={["x", "y"]}
  />
  </div>
  {showGradient && (
  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
  )}
  </div>
  );
  };

interface DotMatrixProps {
colors?: number[][];
opacities?: number[];
totalSize?: number;
dotSize?: number;
shader?: string;
center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
colors = [[0, 0, 0]],
opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
totalSize = 4,
dotSize = 2,
shader = "",
center = ["x", "y"],
}) => {
const uniforms = React.useMemo(() => {
let colorsArray = [
colors[0],
colors[0],
colors[0],
colors[0],
colors[0],
colors[0],
];
if (colors.length === 2) {
colorsArray = [
colors[0],
colors[0],
colors[0],
colors[1],
colors[1],
colors[1],
];
} else if (colors.length === 3) {
colorsArray = [
colors[0],
colors[0],
colors[1],
colors[1],
colors[2],
colors[2],
];
}

    return {
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255,
        ]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
    };

}, [colors, opacities, totalSize, dotSize]);

return (
<Shader
source={`
precision mediump float;
in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        void main() {
            vec2 st = fragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
      float opacity = step(0.0, st.x);
      opacity *= step(0.0, st.y);

      vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

      float frequency = 5.0;
      float show_offset = random(st2);
      float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
      opacity *= u_opacities[int(rand * 10.0)];
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

      vec3 color = u_colors[int(show_offset * 6.0)];

      ${shader}

      fragColor = vec4(color, opacity);
      fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
      maxFps={60}
    />

);
};

type Uniforms = {
[key: string]: {
value: number[] | number[][] | number;
type: string;
};
};
const ShaderMaterial = ({
source,
uniforms,
maxFps = 60,
}: {
source: string;
hovered?: boolean;
maxFps?: number;
uniforms: Uniforms;
}) => {
const { size } = useThree();
const ref = useRef<THREE.Mesh>();
let lastFrameTime = 0;

useFrame(({ clock }) => {
if (!ref.current) return;
const timestamp = clock.getElapsedTime();
if (timestamp - lastFrameTime < 1 / maxFps) {
return;
}
lastFrameTime = timestamp;

    const material: any = ref.current.material;
    const timeLocation = material.uniforms.u_time;
    timeLocation.value = timestamp;

});

const getUniforms = () => {
const preparedUniforms: any = {};

    for (const uniformName in uniforms) {
      const uniform: any = uniforms[uniformName];

      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
          break;
        case "uniform3f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector3().fromArray(uniform.value),
            type: "3f",
          };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: uniform.value.map((v: number[]) =>
              new THREE.Vector3().fromArray(v)
            ),
            type: "3fv",
          };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value),
            type: "2f",
          };
          break;
        default:
          console.error(`Invalid uniform type for '${uniformName}'.`);
          break;
      }
    }

    preparedUniforms["u_time"] = { value: 0, type: "1f" };
    preparedUniforms["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    }; // Initialize u_resolution
    return preparedUniforms;

};

// Shader material
const material = useMemo(() => {
const materialObject = new THREE.ShaderMaterial({
vertexShader: `       precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
fragmentShader: source,
uniforms: getUniforms(),
glslVersion: THREE.GLSL3,
blending: THREE.CustomBlending,
blendSrc: THREE.SrcAlphaFactor,
blendDst: THREE.OneFactor,
});

    return materialObject;

}, [size.width, size.height, source]);

return (
<mesh ref={ref as any}>
<planeGeometry args={[2, 2]} />
<primitive object={material} attach="material" />
</mesh>
);
};

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
return (
<Canvas className="absolute inset-0  h-full w-full">
<ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
</Canvas>
);
};
interface ShaderProps {
source: string;
uniforms: {
[key: string]: {
value: number[] | number[][] | number;
type: string;
};
};
maxFps?: number;
}

Section

"use client";
import React from "react";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function CanvasRevealEffectDemo3() {
const [hovered, setHovered] = React.useState(false);
return (
<div
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
className="h-[40rem] flex flex-col lg:flex-row overflow-hidden items-center justify-center bg-black w-full gap-4 mx-auto px-8 relative" >
<p className="md:text-2xl text-2xl font-medium text-center text-white relative z-20 max-w-2xl mx-auto">
With insomnia, nothing&apos;s real. Everything is far away. Everything
is a copy, of a copy, of a copy
</p>
<AnimatePresence>
{hovered && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="h-full w-full absolute inset-0" >
<CanvasRevealEffect
animationSpeed={5}
containerClassName="bg-transparent"
colors={[
[59, 130, 246],
[139, 92, 246],
]}
opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
dotSize={2}
/>
</motion.div>
)}
</AnimatePresence>
{/_ Radial gradient for the cute fade _/}
<div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
</div>
);
}

Static

"use client";
import React from "react";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function CanvasRevealEffectDemo2() {
return (
<>
<div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
<div className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative">
<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
<AnimatePresence>
<div className="h-full w-full absolute inset-0">
<CanvasRevealEffect
animationSpeed={3}
containerClassName="bg-black"
colors={[
[236, 72, 153],
[232, 121, 249],
]}
dotSize={2}
/>
</div>
</AnimatePresence>
<div className="relative z-20">
<div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
<AceternityIcon />
</div>
<h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
I&apos;m static and I know it.
</h2>
</div>
</div>
</div>
</>
);
}

const Card = ({
title,
icon,
children,
}: {
title: string;
icon: React.ReactNode;
children?: React.ReactNode;
}) => {
const [hovered, setHovered] = React.useState(false);
return (
<div
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] relative" >
<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>

);
};

const AceternityIcon = () => {
return (
<svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
    >
<path
d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
stroke="currentColor"
strokeWidth="15"
strokeMiterlimit="3.86874"
strokeLinecap="round"
style={{ mixBlendMode: "darken" }}
/>
</svg>
);
};

export const Icon = ({ className, ...rest }: any) => {
return (
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
strokeWidth="1.5"
stroke="currentColor"
className={className}
{...rest} >
<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
</svg>
);
};

Props
Component Prop Name Type Default Value Description
CanvasRevealEffect animationSpeed number 0.4 Animation speed, where 0.1 is slower and 1.0 is faster.
CanvasRevealEffect opacities number[] [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1] Array of opacities for the effect.
CanvasRevealEffect colors number[][] [[0, 255, 255]] Array of RGB color arrays to use in the effect.
CanvasRevealEffect containerClassName string Additional class name(s) for the container div.
CanvasRevealEffect dotSize number Size of the dots in the effect.
DotMatrix colors number[][] [[0, 0, 0]] Array of RGB color arrays for the dots. Default is black.
DotMatrix opacities number[] [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14] Array of opacities for the dots.
DotMatrix totalSize number 4 Total size of the effect area.
DotMatrix dotSize number 2 Size of the individual dots.
DotMatrix shader string Custom shader code to apply to the dots.
DotMatrix center ("x" | "y")[] ["x", "y"] Array indicating whether to center the effect on the x and/or y axis.
ShaderMaterial source string GLSL source code for the shader.
ShaderMaterial uniforms Uniforms Uniform variables for the shader.
ShaderMaterial maxFps number 60 Maximum frames per second for the shader animation.
Shader source string GLSL source code for the shader.
Shader uniforms Uniforms Uniform variables for the shader.
Shader maxFps number 60 Maximum frames per second for the shader animation.

The inspiration for this effect is directly taken from Clerk's website.
