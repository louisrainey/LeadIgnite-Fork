TypeScript Guide
Basic usage

The difference when using TypeScript is that instead of writing create(...), you have to write create<T>()(...) (notice the extra parentheses () too along with the type parameter) where T is the type of the state to annotate it. For example:

import { create } from 'zustand'

interface BearState {
bears: number
increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
bears: 0,
increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

Why can't we simply infer the type from the initial state?

Why the currying ()(...)?

Alternatively, you can also use combine, which infers the state so that you do not need to type it.

import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useBearStore = create(
combine({ bears: 0 }, (set) => ({
increase: (by: number) => set((state) => ({ bears: state.bears + by })),
})),
)

Be a little careful

Note that we don't use the curried version when using combine because combine "creates" the state. When using a middleware that creates the state, it isn't necessary to use the curried version because the state now can be inferred. Another middleware that creates state is redux. So when using combine, redux, or any other custom middleware that creates the state, we don't recommend using the curried version.

If you want to infer state type also outside of state declaration, you can use the ExtractState type helper:

import { create, ExtractState } from 'zustand'
import { combine } from 'zustand/middleware'

type BearState = ExtractState<typeof useBearStore>

const useBearStore = create(
combine({ bears: 0 }, (set) => ({
increase: (by: number) => set((state) => ({ bears: state.bears + by })),
})),
)

Using middlewares

You do not have to do anything special to use middlewares in TypeScript.

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
bears: number
increase: (by: number) => void
}

const useBearStore = create<BearState>()(
devtools(
persist(
(set) => ({
bears: 0,
increase: (by) => set((state) => ({ bears: state.bears + by })),
}),
{ name: 'bearStore' },
),
),
)

Just make sure you are using them immediately inside create so as to make the contextual inference work. Doing something even remotely fancy like the following myMiddlewares would require more advanced types.

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const myMiddlewares = (f) => devtools(persist(f, { name: 'bearStore' }))

interface BearState {
bears: number
increase: (by: number) => void
}

const useBearStore = create<BearState>()(
myMiddlewares((set) => ({
bears: 0,
increase: (by) => set((state) => ({ bears: state.bears + by })),
})),
)

Also, we recommend using devtools middleware as last as possible. For example, when you use it with immer as a middleware, it should be devtools(immer(...)) and not immer(devtools(...)). This is becausedevtools mutates the setState and adds a type parameter on it, which could get lost if other middlewares (like immer) also mutate setState before devtools. Hence using devtools at the end makes sure that no middlewares mutate setState before it.
Authoring middlewares and advanced usage

Imagine you had to write this hypothetical middleware.

import { create } from 'zustand'

const foo = (f, bar) => (set, get, store) => {
store.foo = bar
return f(set, get, store)
}

const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
console.log(useBearStore.foo.toUpperCase())

Zustand middlewares can mutate the store. But how could we possibly encode the mutation on the type-level? That is to say how could we type foo so that this code compiles?

For a usual statically typed language, this is impossible. But thanks to TypeScript, Zustand has something called a "higher-kinded mutator" that makes this possible. If you are dealing with complex type problems, like typing a middleware or using the StateCreator type, you will have to understand this implementation detail. For this, you can check out #710.

If you are eager to know what the answer is to this particular problem then you can see it here.
Handling Dynamic replace Flag

If the value of the replace flag is not known at compile time and is determined dynamically, you might face issues. To handle this, you can use a workaround by annotating the replace parameter with the parameters of the setState function:

const replaceFlag = Math.random() > 0.5
const args = [{ bears: 5 }, replaceFlag] as Parameters<
typeof useBearStore.setState

> store.setState(...args)

Example with as Parameters Workaround

import { create } from 'zustand'

interface BearState {
bears: number
increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
bears: 0,
increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

const replaceFlag = Math.random() > 0.5
const args = [{ bears: 5 }, replaceFlag] as Parameters<
typeof useBearStore.setState

> useBearStore.setState(...args) // Using the workaround

By following this approach, you can ensure that your code handles dynamic replace flags without encountering type issues.
Common recipes
Middleware that doesn't change the store type

import { create, StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
T,
Mps extends [StoreMutatorIdentifier, unknown][] = [],
Mcs extends [StoreMutatorIdentifier, unknown][] = [],

> (
> f: StateCreator<T, Mps, Mcs>,
> name?: string,
> ) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
f: StateCreator<T, [], []>,
name?: string,
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
const loggedSet: typeof set = (...a) => {
set(...(a as Parameters<typeof set>))
console.log(...(name ? [`${name}:`] : []), get())
}
const setState = store.setState
store.setState = (...a) => {
setState(...(a as Parameters<typeof setState>))
console.log(...(name ? [`${name}:`] : []), store.getState())
}

return f(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger

// ---

const useBearStore = create<BearState>()(
logger(
(set) => ({
bears: 0,
increase: (by) => set((state) => ({ bears: state.bears + by })),
}),
'bear-store',
),
)

Middleware that changes the store type

import {
create,
StateCreator,
StoreMutatorIdentifier,
Mutate,
StoreApi,
} from 'zustand'

type Foo = <
T,
A,
Mps extends [StoreMutatorIdentifier, unknown][] = [],
Mcs extends [StoreMutatorIdentifier, unknown][] = [],

> (
> f: StateCreator<T, [...Mps, ['foo', A]], Mcs>,
> bar: A,
> ) => StateCreator<T, Mps, [['foo', A], ...Mcs]>

declare module 'zustand' {
interface StoreMutators<S, A> {
foo: Write<Cast<S, object>, { foo: A }>
}
}

type FooImpl = <T, A>(
f: StateCreator<T, [], []>,
bar: A,
) => StateCreator<T, [], []>

const fooImpl: FooImpl = (f, bar) => (set, get, \_store) => {
type T = ReturnType<typeof f>
type A = typeof bar

const store = \_store as Mutate<StoreApi<T>, [['foo', A]]>
store.foo = bar
return f(set, get, \_store)
}

export const foo = fooImpl as unknown as Foo

type Write<T extends object, U extends object> = Omit<T, keyof U> & U

type Cast<T, U> = T extends U ? T : U

// ---

const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
console.log(useBearStore.foo.toUpperCase())

create without curried workaround

The recommended way to use create is using the curried workaround like so: create<T>()(...). This is because it enables you to infer the store type. But if for some reason you do not want to use the workaround, you can pass the type parameters like the following. Note that in some cases, this acts as an assertion instead of annotation, so we don't recommend it.

import { create } from "zustand"

interface BearState {
bears: number
increase: (by: number) => void
}

const useBearStore = create<
BearState,
[
['zustand/persist', BearState],
['zustand/devtools', never]
]

> (devtools(persist((set) => ({
> bears: 0,
> increase: (by) => set((state) => ({ bears: state.bears + by })),
> }), { name: 'bearStore' }))

Slices pattern

import { create, StateCreator } from 'zustand'

interface BearSlice {
bears: number
addBear: () => void
eatFish: () => void
}

interface FishSlice {
fishes: number
addFish: () => void
}

interface SharedSlice {
addBoth: () => void
getBoth: () => void
}

const createBearSlice: StateCreator<
BearSlice & FishSlice,
[],
[],
BearSlice

> = (set) => ({
> bears: 0,
> addBear: () => set((state) => ({ bears: state.bears + 1 })),
> eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
> })

const createFishSlice: StateCreator<
BearSlice & FishSlice,
[],
[],
FishSlice

> = (set) => ({
> fishes: 0,
> addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
> })

const createSharedSlice: StateCreator<
BearSlice & FishSlice,
[],
[],
SharedSlice

> = (set, get) => ({
> addBoth: () => {

    // you can reuse previous methods
    get().addBear()
    get().addFish()
    // or do them from scratch
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })

},
getBoth: () => get().bears + get().fishes,
})

const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({
...createBearSlice(...a),
...createFishSlice(...a),
...createSharedSlice(...a),
}))

A detailed explanation on the slices pattern can be found here.

If you have some middlewares then replace StateCreator<MyState, [], [], MySlice> with StateCreator<MyState, Mutators, [], MySlice>. For example, if you are using devtools then it will be StateCreator<MyState, [["zustand/devtools", never]], [], MySlice>. See the "Middlewares and their mutators reference" section for a list of all mutators.
Bounded useStore hook for vanilla stores

import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

interface BearState {
bears: number
increase: (by: number) => void
}

const bearStore = createStore<BearState>()((set) => ({
bears: 0,
increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

function useBearStore(): BearState
function useBearStore<T>(selector: (state: BearState) => T): T
function useBearStore<T>(selector?: (state: BearState) => T) {
return useStore(bearStore, selector!)
}

You can also make an abstract createBoundedUseStore function if you need to create bounded useStore hooks often and want to DRY things up...

import { useStore, StoreApi } from 'zustand'
import { createStore } from 'zustand/vanilla'

interface BearState {
bears: number
increase: (by: number) => void
}

const bearStore = createStore<BearState>()((set) => ({
bears: 0,
increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

const createBoundedUseStore = ((store) => (selector) =>
useStore(store, selector)) as <S extends StoreApi<unknown>>(
store: S,
) => {
(): ExtractState<S>
<T>(selector: (state: ExtractState<S>) => T): T
}

type ExtractState<S> = S extends { getState: () => infer X } ? X : never

const useBearStore = createBoundedUseStore(bearStore)

Middlewares and their mutators reference

    devtools — ["zustand/devtools", never]
    persist — ["zustand/persist", YourPersistedState]
    YourPersistedState is the type of state you are going to persist, ie the return type of options.partialize, if you're not passing partialize options the YourPersistedState becomes Partial<YourState>. Also sometimes passing actual PersistedState won't work. In those cases, try passing unknown.
    immer — ["zustand/immer", never]
    subscribeWithSelector — ["zustand/subscribeWithSelector", never]
    redux — ["zustand/redux", YourAction]
    combine — no mutator as combine does not mutate the store
