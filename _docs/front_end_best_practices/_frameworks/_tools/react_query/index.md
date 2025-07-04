https://tanstack.com/query/latest/docs/framework/react/quick-start
Quick Start

This code snippet very briefly illustrates the 3 core concepts of React Query:

    Queries
    Mutations
    Query Invalidation

If you're looking for a fully functioning example, please have a look at our simple StackBlitz example
tsx

import {
useQuery,
useMutation,
useQueryClient,
QueryClient,
QueryClientProvider,
} from '@tanstack/react-query'
import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
return (
// Provide the client to your App
<QueryClientProvider client={queryClient}>
<Todos />
</QueryClientProvider>
)
}

function Todos() {
// Access the client
const queryClient = useQueryClient()

// Queries
const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

// Mutations
const mutation = useMutation({
mutationFn: postTodo,
onSuccess: () => {
// Invalidate and refetch
queryClient.invalidateQueries({ queryKey: ['todos'] })
},
})

return (

<div>
<ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>

)
}

render(<App />, document.getElementById('root'))

These three concepts make up most of the core functionality of React Query. The next sections of the documentation will go over each of these core concepts in great detail.

TanStack Query maintainer TkDodo has a series of blog posts about using and working with the library. Some articles show general best practices, but most have an opinionated point of view.
#1: Practical React Query

    An advanced introduction to React Query, showing practical tips that go beyond the docs. It covers explaining the defaults (staleTime vs. gcTime), concepts like keeping server and client state separate, handling dependencies and creating custom hooks, as well as outlining why the enabled option is very powerful. Read more...

#2: React Query Data Transformations

    Learn the possibilities to perform the quite common and important task of transforming your data with React Query. From transforming in the queryFn to using the select option, this article outlines the pros and cons of all the different approaches. Read more...

#3: React Query Render Optimizations

    Let's take a look at what you can do when your component re-renders too often when using React Query. The library is already pretty optimized, but there are still some opt-in features (like tracked queries) that you can use to avoid the isFetching transition. We're also looking into what structural sharing refers to. Read more...

#4: Status Checks in React Query

    We usually check for isPending first before checking for isError , but sometimes, checking if data is available should be the first thing to do. This article shows how the wrong status check order can negatively impact user experience. Read more...

#5: Testing React Query

    The docs already cover pretty well what you need to do to get started when testing React Query. This article shows some additional tips (like turning off retries or silencing the console) you might want to follow when testing custom hooks or components using them. It also links to an example repository with tests for success and error states, powered by mock-service-worker. Read more...

#6: React Query and TypeScript

    Since React Query is written in TypeScript, it has great support for it. This blog post explains the various Generics, how you can leverage type inference to avoid having to explicitly type useQuery and friends, what to do with unknown errors, how type narrowing works and more! Read more...

#7: Using WebSockets with React Query

    A step-by-step guide on how to make real-time notifications work with React Query, with either event-based subscriptions or pushing full data directly to the client. Applicable to anything from the browser native WebSocket API over Firebase and even GraphQL subscriptions. Read more...

#8: Effective React Query Keys

    Most examples just use a simple String or Array Query Key, but how do you organize your keys effectively once your app grows past a todo list? This article shows how co-location and Query Key Factories can make life easier. Read more...

#8a: Leveraging the Query Function Context

    In this amendment to the previous blog post, we look at how we can leverage the Query Function Context and Object Query Keys for maximum safety as our app grows. Read more...

#9: Placeholder and Initial Data in React Query

    Placeholder and Initial Data are two similar yet different concepts for synchronously showing data instead of a loading spinner to improve an application's UX. This blog post compares the two and outlines the scenarios where each one shines. Read more...

#10: React Query as a State Manager

    React Query doesn't fetch any data for you - it's a data synchronization tool that excels when used for server state. This article has everything you need to know to make React Query your single source of truth state manager for your async state. You'll learn how to let React Query do it's magic and why customizing staleTime might be all you need. Read more...

#11: React Query Error Handling

    Handling errors is an integral part of working with asynchronous data, especially data fetching. We have to face it: Not all requests will be successful, and not all Promises will be fulfilled. This blog post describes various ways of coping with errors in React Query, such as the error property, using Error Boundaries or onError callbacks, so that you can prepare your application for the cases when "Something went wrong". Read more...

#12: Mastering Mutations in React Query

    Mutations are the important, second part necessary to work with server data - for situations where you need to update it. This blog post covers what mutations are and how they are different from queries. You'll learn the difference between mutate and mutateAsync as well as how you can tie queries and mutations together. Read more...

#13: Offline React Query

    There are many ways to produce promises - which is everything React Query needs - but by far the biggest use-case is data fetching. Very often, that requires an active network connection. But sometimes, especially on mobile devices where, the network connection can be unreliable, you need your app to also work without it. In this article, you'll learn about the different offline strategies React Query offers. Read more...

#14: React Query and Forms

    Forms tend to blur the line between what is server state and what is client state. In most applications, we would not only like to display state, but also let the user interact with it. This article shows two different approaches as well as some tips and tricks about using React Query with Forms. Read more...

#15: React Query FAQs

    This article tries to answer the most frequently asked questions about React Query. Read more...

#16: React Query meets React Router

    Remix and React Router are changing the game when thinking about when to fetch data. This article goes into why React Query and Routers that support data loading are a match made in heaven. Read more...

#17: Seeding the Query Cache

    This blog post shows multiple ways how to get data into your Query Cache before you start rendering to minimize the amount of loading spinners displayed in your app. The options range from prefetching on the server or in your router to seeding cache entries via setQueryData. Read more...

#18: Inside React Query

    If you've ever wondered how React Query works under the hood - this post is for you. It explains the architecture (including visuals), starting with the agnostic Query Core and how it communicates with the framework specific adapters. Read more...

#19: Type-safe React Query

    There's a big difference between "having types" and "being type-safe". This article tries to outline those differences and shows how you can get the best possible type-safety when using React Query together with TypeScript Read more...
