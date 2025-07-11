Browse ::https://zustand.docs.pmnd.rs/guides/typescript

Introduction

How to use Zustand
Logo Zustand

A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.

Don't disregard it because it's cute, it has claws! Lots of time was spent to deal with common pitfalls, like the dreaded zombie child problem, React concurrency, and context loss between mixed renderers. It may be the one state manager in the React space that gets all of these right.

You can try a live demo here.
Installation

Zustand is available as a package on NPM for use:

# NPM

npm install zustand

# Or, use any package manager of your choice.

First create a store

Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

import { create } from 'zustand'

const useStore = create((set) => ({
bears: 0,
increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
removeAllBears: () => set({ bears: 0 }),
updateBears: (newBears) => set({ bears: newBears }),
}))

Then bind your components, and that's it!

You can use the hook anywhere, without the need of providers. Select your state and the consuming component will re-render when that state changes.

function BearCounter() {
const bears = useStore((state) => state.bears)
return <h1>{bears} bears around here...</h1>
}

function Controls() {
const increasePopulation = useStore((state) => state.increasePopulation)
return <button onClick={increasePopulation}>one up</button>
}
