TanStack
Query v5
Framework
Version
React Example: Nextjs
Github
StackBlitz
CodeSandbox

tsx

import React from 'react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { Header, InfoBox, Layout, PostList } from '../components'
import { fetchPosts } from '../hooks/usePosts'

const Home = () => {
return (
<Layout>

<Header />
<InfoBox>ℹ️ This page shows how to use SSG with React-Query.</InfoBox>
<PostList />
</Layout>
)
}

export async function getStaticProps() {
const queryClient = new QueryClient()

await queryClient.prefetchQuery({
queryKey: ['posts', 10],
queryFn: () => fetchPosts(10),
})

return {
props: {
dehydratedState: dehydrate(queryClient),
},
}
}

export default Home

Rick And Morty
Next.js app with prefetching
Our Partners
Speakeasy
Want to Skip the Docs?
Launch week sale

Up to 30% off through May 17th
11

days
:
03

hours
:
31

minutes
