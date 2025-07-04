Animated Modal

A customizable, compound modal component with animated transitions
special
utilities
modal

"use client";
import React from "react";
import {
Modal,
ModalBody,
ModalContent,
ModalFooter,
ModalTrigger,
} from "../ui/animated-modal";

import { motion } from "motion/react";

export function AnimatedModalDemo() {
const images = [
"https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
return (
<div className="py-40  flex items-center justify-center">
<Modal>
<ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
<span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
Book your flight
</span>
<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
✈️
</div>
</ModalTrigger>
<ModalBody>
<ModalContent>
<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
Book your trip to{" "}
<span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
Bali
</span>{" "}
now! ✈️
</h4>
<div className="flex justify-center items-center">
{images.map((image, idx) => (
<motion.div
key={"images" + idx}
style={{
                    rotate: Math.random() * 20 - 10,
                  }}
whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden" >
<img
                    src={image}
                    alt="bali images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                  />
</motion.div>
))}
</div>
<div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
<div className="flex  items-center justify-center">
<PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
<span className="text-neutral-700 dark:text-neutral-300 text-sm">
5 connecting flights
</span>
</div>
<div className="flex items-center justify-center">
<ElevatorIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
<span className="text-neutral-700 dark:text-neutral-300 text-sm">
12 hotels
</span>
</div>
<div className="flex items-center justify-center">
<VacationIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
<span className="text-neutral-700 dark:text-neutral-300 text-sm">
69 visiting spots
</span>
</div>
<div className="flex  items-center justify-center">
<FoodIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
<span className="text-neutral-700 dark:text-neutral-300 text-sm">
Good food everyday
</span>
</div>
<div className="flex items-center justify-center">
<MicIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
<span className="text-neutral-700 dark:text-neutral-300 text-sm">
Open Mic
</span>
</div>
<div className="flex items-center justify-center">
<ParachuteIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
<span className="text-neutral-700 dark:text-neutral-300 text-sm">
Paragliding
</span>
</div>
</div>
</ModalContent>
<ModalFooter className="gap-4">
<button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
Cancel
</button>
<button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
Book Now
</button>
</ModalFooter>
</ModalBody>
</Modal>
</div>
);
}

const PlaneIcon = ({ className }: { className?: string }) => {
return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
</svg>
);
};

const VacationIcon = ({ className }: { className?: string }) => {
return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
<path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
<path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
<path d="M15 9l-3 5.196" />
<path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
</svg>
);
};

const ElevatorIcon = ({ className }: { className?: string }) => {
return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
<path d="M10 10l2 -2l2 2" />
<path d="M10 14l2 2l2 -2" />
</svg>
);
};

const FoodIcon = ({ className }: { className?: string }) => {
return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
</svg>
);
};

const MicIcon = ({ className }: { className?: string }) => {
return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
<path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
</svg>
);
};

const ParachuteIcon = ({ className }: { className?: string }) => {
return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M22 12a10 10 0 1 0 -20 0" />
<path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
<path d="M2 12l10 10l-3.5 -10" />
<path d="M15.5 12l-3.5 10l10 -10" />
</svg>
);
};

Installation
Install util dependencies

npm i motion clsx tailwind-merge

Add util file
lib/utils.ts

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

Copy the source code

components/ui/animated-modal.tsx

"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, {
ReactNode,
createContext,
useContext,
useEffect,
useRef,
useState,
} from "react";

interface ModalContextType {
open: boolean;
setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
const [open, setOpen] = useState(false);

return (
<ModalContext.Provider value={{ open, setOpen }}>
{children}
</ModalContext.Provider>
);
};

export const useModal = () => {
const context = useContext(ModalContext);
if (!context) {
throw new Error("useModal must be used within a ModalProvider");
}
return context;
};

export function Modal({ children }: { children: ReactNode }) {
return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
children,
className,
}: {
children: ReactNode;
className?: string;
}) => {
const { setOpen } = useModal();
return (
<button
className={cn(
"px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
className
)}
onClick={() => setOpen(true)} >
{children}
</button>
);
};

export const ModalBody = ({
children,
className,
}: {
children: ReactNode;
className?: string;
}) => {
const { open } = useModal();

useEffect(() => {
if (open) {
document.body.style.overflow = "hidden";
} else {
document.body.style.overflow = "auto";
}
}, [open]);

const modalRef = useRef(null);
const { setOpen } = useModal();
useOutsideClick(modalRef, () => setOpen(false));

return (
<AnimatePresence>
{open && (
<motion.div
initial={{
            opacity: 0,
          }}
animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50" >
<Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

);
};

export const ModalContent = ({
children,
className,
}: {
children: ReactNode;
className?: string;
}) => {
return (
<div className={cn("flex flex-col flex-1 p-8 md:p-10", className)}>
{children}
</div>
);
};

export const ModalFooter = ({
children,
className,
}: {
children: ReactNode;
className?: string;
}) => {
return (
<div
className={cn(
"flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
className
)} >
{children}
</div>
);
};

const Overlay = ({ className }: { className?: string }) => {
return (
<motion.div
initial={{
        opacity: 0,
      }}
animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`} ></motion.div>
);
};

const CloseIcon = () => {
const { setOpen } = useModal();
return (
<button
onClick={() => setOpen(false)}
className="absolute top-4 right-4 group" >
<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M18 6l-12 12" />
<path d="M6 6l12 12" />
</svg>
</button>
);
};

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
ref: React.RefObject<HTMLDivElement>,
callback: Function
) => {
useEffect(() => {
const listener = (event: any) => {
// DO NOTHING if the element being clicked is the target element or their children
if (!ref.current || ref.current.contains(event.target)) {
return;
}
callback(event);
};

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };

}, [ref, callback]);
};

props
ModalProvider
Prop Type Description
children ReactNode The content to be wrapped by the provider.
Modal
Prop Type Description
children ReactNode The content to be displayed inside the modal.
ModalTrigger
Prop Type Description
children ReactNode The content to be displayed inside the trigger button.
className string? Optional additional class names for the trigger button.
ModalBody
Prop Type Description
children ReactNode The content to be displayed inside the modal body.
className string? Optional additional class names for the modal body.
ModalContent
Prop Type Description
children ReactNode The content to be displayed inside the modal content.
className string? Optional additional class names for the modal content.
ModalFooter
Prop Type Description
children ReactNode The content to be displayed inside the modal footer.
className string? Optional additional class names for the modal footer.
Overlay
Prop Type Description
className string? Optional additional class names for the overlay.
useOutsideClick
Prop Type Description
ref React.RefObject<HTMLDivElement> The reference to the element to detect outside clicks.
callback Function The callback function to be called when an outside click is detected.
Build websites faster and 10x better than your competitors with Aceternity UI Pro

With the best in class components and templates, stand out from the crowd and get more attention to your website. Trusted by founders and entrepreneurs from all over the world.
Go Pro
I've bee
