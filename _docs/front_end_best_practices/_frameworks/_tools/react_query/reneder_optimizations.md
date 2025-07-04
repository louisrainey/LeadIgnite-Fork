React Query Render Optimizations

20.03.2021 — ReactJs, React Query, JavaScript, TypeScript — 4 min read
optimizations
Photo by Lukasz Szmigiel

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

Disclaimer

Render optimizations are an advanced concept for any app. React Query already comes with very good optimizations and defaults out of the box, and most of the time, no further optimizations are needed. "Unneeded re-renders" is a topic that many people tend to put a lot of focus on, which is why I've decided to cover it. But I wanted to point out once again, that usually, for most apps, render optimizations probably don't matter as much as you'd think. Re-renders are a good thing. They make sure your app is up-to-date. I'd take an "unnecessary re-render" over a "missing render-that-should-have-been-there" all day every day. For more on this topic, please read:

    Fix the slow render before you fix the re-render by Kent C. Dodds
    this article by @ryanflorence about premature optimizations

I've already written quite a bit about render optimizations when describing the select option in #2: React Query Data Transformations. However, "Why does React Query re-render my component two times even though nothing changed in my data" is the question I probably needed to answer the most (apart from maybe: "Where can I find the v2 docs" 😅). So let me try to explain it in-depth.
isFetching transition

I haven't been entirely honest in the last example when I said that this component will only re-render if the length of todos change:
count-component

export const useTodosQuery = (select) =>

useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

    select,

})

export const useTodosCount = () =>

useTodosQuery((data) => data.length)

function TodosCount() {

const todosCount = useTodosCount()

return <div>{todosCount.data}</div>

}

Every time you make a background refetch, this component will re-render twice with the following query info:

{ status: 'success', data: 2, isFetching: true }

{ status: 'success', data: 2, isFetching: false }

That is because React Query exposes a lot of meta information for each query, and isFetching is one of them. This flag will always be true when a request is in-flight. This is quite useful if you want to display a background loading indicator. But it's also kinda unnecessary if you don't do that.
notifyOnChangeProps

For this use-case, React Query has the notifyOnChangeProps option. It can be set on a per-observer level to tell React Query: Please only inform this observer about changes if one of these props change. By setting this option to ['data'], we will find the optimized version we seek:
optimized-with-notifyOnChangeProps

export const useTodosQuery = (select, notifyOnChangeProps) =>

useQuery({

    queryKey: ['todos'],

    queryFn: fetchTodos,

    select,

    notifyOnChangeProps,

})

export const useTodosCount = () =>

useTodosQuery((data) => data.length, ['data'])

You can see this in action in the optimistic-updates-typescript example in the docs.
Staying in sync

While the above code works well, it can get out of sync quite easily. What if we want to react to the error, too? Or we start to use the isLoading flag? We have to keep the notifyOnChangeProps list in sync with whichever fields we are actually using in our components. If we forget to do that, and we only observe the data property, but get an error that we also display, our component will not re-render and is thus outdated. This is especially troublesome if we hard-code this in our custom hook, because the hook does not know what the component will actually use:
outdated-component

export const useTodosCount = () =>

useTodosQuery((data) => data.length, ['data'])

function TodosCount() {

// 🚨 we are using error,

// but we are not getting notified if error changes!

const { error, data } = useTodosCount()

return (

    <div>

      {error ? error : null}

      {data ? data : null}

    </div>

)

}

As I have hinted in the disclaimer in the beginning, I think this is way worse than the occasional unneeded re-render. Of course, we can pass the option to the custom hook, but this still feels quite manual and boilerplate-y. Is there a way to do this automatically? Turns out, there is:
Tracked Queries

I'm quite proud of this feature, given that it was my first major contribution to the library. If you set notifyOnChangeProps to 'tracked', React Query will keep track of the fields you are using during render, and will use this to compute the list. This will optimize exactly the same way as specifying the list manually, except that you don't have to think about it. You can also turn this on globally for all your queries:
tracked-queries

const queryClient = new QueryClient({

defaultOptions: {

    queries: {

      notifyOnChangeProps: 'tracked',

    },

},

})

function App() {

return (

    <QueryClientProvider client={queryClient}>

      <Example />

    </QueryClientProvider>

)

}

With this, you never have to think about re-renders again. Of course, tracking the usages has a bit of an overhead as well, so make sure you use this wisely. There are also some limitations to tracked queries, which is why this is an opt-in feature:

    If you use object rest destructuring, you are effectively observing all fields. Normal destructuring is fine, just don't do this:

problematic-rest-destructuring

// 🚨 will track all fields

const { isLoading, ...queryInfo } = useQuery(...)

// ✅ this is totally fine

const { isLoading, data } = useQuery(...)

    Tracked queries only work "during render". If you only access fields during effects, they will not be tracked. This is quite the edge case though because of dependency arrays:

tracking-effects

const queryInfo = useQuery(...)

// 🚨 will not corectly track data

React.useEffect(() => {

    console.log(queryInfo.data)

})

// ✅ fine because the dependency array is accessed during render

React.useEffect(() => {

    console.log(queryInfo.data)

}, [queryInfo.data])

    Tracked queries don't reset on each render, so if you track a field once, you'll track it for the lifetime of the observer:

no-reset

const queryInfo = useQuery(...)

if (someCondition()) {

    // 🟡 we will track the data field if someCondition was true in any previous render cycle

    return <div>{queryInfo.data}</div>

}

Update

Starting with v4, tracked queries are turned on per default in React Query, and you can opt out of the feature with notifyOnChangeProps: 'all'.
Structural sharing

A different, but no less important render optimization that React Query has turned on out of the box is structural sharing. This feature makes sure that we keep referential identity of our data on every level. As an example, suppose you have the following data structure:

[

{ "id": 1, "name": "Learn React", "status": "active" },

{ "id": 2, "name": "Learn React Query", "status": "todo" }

]

Now suppose we transition our first todo into the done state, and we make a background refetch. We'll get a completely new json from our backend:

[

- { "id": 1, "name": "Learn React", "status": "active" },

* { "id": 1, "name": "Learn React", "status": "done" },

{ "id": 2, "name": "Learn React Query", "status": "todo" }

]

Now React Query will attempt to compare the old state and the new and keep as much of the previous state as possible. In our example, the todos array will be new, because we updated a todo. The object with id 1 will also be new, but the object for id 2 will be the same reference as the one in the previous state - React Query will just copy it over to the new result because nothing has changed in it.

This comes in very handy when using selectors for partial subscriptions:
optimized-selectors

// ✅ will only re-render if _something_ within todo with id:2 changes

// thanks to structural sharing

const { data } = useTodo(2)

As I've hinted before, for selectors, structural sharing will be done twice: Once on the result returned from the queryFn to determine if anything changed at all, and then once more on the result of the selector function. In some instances, especially when having very large datasets, structural sharing can be a bottleneck. It also only works on json-serializable data. If you don't need this optimization, you can turn it off by setting structuralSharing: false on any query.

Have a look at the replaceEqualDeep tests if you want to learn more about what happens under the hood.
