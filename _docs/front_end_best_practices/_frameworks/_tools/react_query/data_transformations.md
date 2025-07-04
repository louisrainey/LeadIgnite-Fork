React Query Data Transformations

10.03.2021 — ReactJs, React Query, JavaScript, TypeScript — 4 min read
transformations
Photo by Joshua Sukoff

Last Update: 2023-10-21

    #1: Practical React Query
    #2: React Query Data Transformations
    #3: React Query Render Optimizations
    #4: Status Checks in React Query
    #5: Testing React Query
    #6: React Query and TypeScript
    #7: Using WebSockets with React Query
    #8: Effective React Query Keys
    #8a: Leveraging the Query Function Context
    #9: Placeholder and Initial Data in React Query
    #10: React Query as a State Manager
    #11: React Query Error Handling
    #12: Mastering Mutations in React Query
    #13: Offline React Query
    #14: React Query and Forms
    #15: React Query FAQs
    #16: React Query meets React Router
    #17: Seeding the Query Cache
    #18: Inside React Query
    #19: Type-safe React Query
    #20: You Might Not Need React Query
    #21: Thinking in React Query
    #22: React Query and React Context
    #23: Why You Want React Query
    #24: The Query Options API
    #25: Automatic Query Invalidation after Mutations
    #26: How Infinite Queries work
    #27: React Query API Design - Lessons Learned
    #28: React Query - The Bad Parts
    #29: Concurrent Optimistic Updates in React Query

    한국어
    正體中文
    Español
    简体中文
    日本語
    Add translation

Welcome to Part 2 of "Things I have to say about react-query". As I've become more and more involved with the library and the community around it, I've observed some more patterns people frequently ask about. Initially, I wanted to write them all down in one big article, but then decided to break them down into more manageable pieces. The first one is about a quite common and important task: Data Transformation.
Data Transformation

Let's face it - most of us are not using GraphQL. If you do, then you can be very happy because you have the luxury of requesting your data in the format that you desire.

If you are working with REST though, you are constrained by what the backend returns. So how and where do you best transform data when working with react-query? The only answer worth a damn in software development applies here as well:

    It depends.

— Every developer, always

Here are 3+1 approaches on where you can transform data with their respective pros and cons: 0. On the backend

This is my favourite approach, if you can afford it. If the backend returns data in exactly the structure we want, there is nothing we need to do. While this might sound unrealistic in many cases, e.g. when working with public REST APIs, it is also quite possible to achieve in enterprise applications. If you are in control of the backend and have an endpoint that returns data for your exact use-case, prefer to deliver the data the way you expect it.

🟢 no work on the frontend
🔴 not always possible

1. In the queryFn

The queryFn is the function that you pass to useQuery. It expects you to return a Promise, and the resulting data winds up in the query cache. But it doesn't mean that you have to absolutely return data in the structure that the backend delivers here. You can transform it before doing so:
queryFn-transformation

const fetchTodos = async (): Promise<Todos> => {

const response = await axios.get('todos')

const data: Todos = response.data

return data.map((todo) => todo.name.toUpperCase())

}

export const useTodosQuery = () =>

useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

})

On the frontend, you can then work with this data "as if it came like this from the backend". No where in your code will you actually work with todo names that are not upper-cased. You will also not have access to the original structure. If you look at the react-query-devtools, you will see the transformed structure. If you look at the network trace, you'll see the original structure. This might be confusing, so keep that in mind.

Also, there is no optimization that react-query can do for you here. Every time a fetch is executed, your transformation will run. If it's expensive, consider one of the other alternatives. Some companies also have a shared api layer that abstracts data fetching, so you might not have access to this layer to do your transformations.

🟢 very "close to the backend" in terms of co-location
🟡 the transformed structure winds up in the cache, so you don't have access to the original structure
🔴 runs on every fetch
🔴 not feasible if you have a shared api layer that you cannot freely modify 2. In the render function

As advised in Part 1, if you create custom hooks, you can easily do transformations there:
render-transformation

const fetchTodos = async (): Promise<Todos> => {

const response = await axios.get('todos')

return response.data

}

export const useTodosQuery = () => {

const queryInfo = useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

})

return {

    ...queryInfo,

    data: queryInfo.data?.map((todo) => todo.name.toUpperCase()),

}

}

As it stands, this will not only run every time your fetch function runs, but actually on every render (even those that do not involve data fetching). This is likely not a problem at all, but if it is, you can optimize with useMemo. Be careful to define your dependencies as narrow as possible. data inside the queryInfo will be referentially stable unless something really changed (in which case you want to recompute your transformation), but the queryInfo itself will not. If you add queryInfo as your dependency, the transformation will again run on every render:
useMemo-dependencies

export const useTodosQuery = () => {

const queryInfo = useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos

})

return {

    ...queryInfo,

    // 🚨 don't do this - the useMemo does nothing at all here!

    data: React.useMemo(

      () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),

      [queryInfo]

    ),


    // ✅ correctly memoizes by queryInfo.data

    data: React.useMemo(

      () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),

      [queryInfo.data]

    ),

}

}

Especially if you have additional logic in your custom hook to combine with your data transformation, this is a good option. Be aware that data can be potentially undefined, so use optional chaining when working with it.
Update

Since React Query has tracked queries turned on per default since v4, spreading ...queryInfo is no longer recommended, because it invokes getters on all properties.

🟢 optimizable via useMemo
🟡 exact structure cannot be inspected in the devtools
🔴 a bit more convoluted syntax
🔴 data can be potentially undefined
🔴 not recommended with tracked queries 3. using the select option

v3 introduced built-in selectors, which can also be used to transform data:
select-transformation

export const useTodosQuery = () =>

useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

    select: (data) => data.map((todo) => todo.name.toUpperCase()),

})

selectors will only be called if data exists, so you don't have to care about undefined here. Selectors like the one above will also run on every render, because the functional identity changes (it's an inline function). If your transformation is expensive, you can memoize it either with useCallback, or by extracting it to a stable function reference:
select-memoizations

const transformTodoNames = (data: Todos) =>

data.map((todo) => todo.name.toUpperCase())

export const useTodosQuery = () =>

useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

    // ✅ uses a stable function reference

    select: transformTodoNames,

})

export const useTodosQuery = () =>

useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

    // ✅ memoizes with useCallback

    select: React.useCallback(

      (data: Todos) => data.map((todo) => todo.name.toUpperCase()),

      []

    ),

})

Further, the select option can also be used to subscribe to only parts of the data. This is what makes this approach truly unique. Consider the following example:
select-partial-subscriptions

export const useTodosQuery = (select) =>

useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

    select,

})

export const useTodosCount = () =>

useTodosQuery((data) => data.length)

export const useTodo = (id) =>

useTodosQuery((data) => data.find((todo) => todo.id === id))

Here, we've created a useSelector like API by passing a custom selector to our useTodosQuery. The custom hooks still works like before, as select will be undefined if you don't pass it, so the whole state will be returned.

But if you pass a selector, you are now only subscribed to the result of the selector function. This is quite powerful, because it means that even if we update the name of a todo, our component that only subscribes to the count via useTodosCount will not rerender. The count hasn't changed, so react-query can choose to not inform this observer about the update 🥳 (Please note that this is a bit simplified here and technically not entirely true - I will talk in more detail about render optimizations in Part 3).

🟢 best optimizations
🟢 allows for partial subscriptions
🟡 structure can be different for every observer
🟡 structural sharing is performed twice (I will also talk about this in more detail in Part 3)
