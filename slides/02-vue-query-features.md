# Race Conditions

::left::

```js {*}{maxHeight:'400px'}
// ❌ Potential Race Condition with Watch
const userData = ref(null)

watch(
  () => route.params.id,
  async (newId) => {
    const data = await fetchUser(newId)
    // Later request might finish first!
    userData.value = data
  }
)

// ✅ TanStack Query handles race conditions
const userQuery = useQuery({
  queryKey: ['user', route.params.id],
  queryFn: () => fetchUser(route.params.id)
})
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">Race Condition Prevention:</div>
      <ul class="ml-4">
        <li>Automatic request cancellation</li>
        <li>Latest data guarantee</li>
        <li>No stale updates</li>
        <li>Built-in request deduplication</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# Caching & Stale Data

::left::

```js {*}{maxHeight:'400px'}
const userQuery = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
  staleTime: 1000 * 60, // Data fresh for 1 minute
  cacheTime: 1000 * 60 * 5, // Keep in cache for 5 minutes
  
  // Optional: Customize refetch behavior
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true
})
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">Cache Management:</div>
      <ul class="ml-4">
        <li>Configurable stale time</li>
        <li>Background data revalidation</li>
        <li>Automatic cache cleanup</li>
        <li>Smart refetching strategies</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# Loading & Error States

::left::

```vue {*}{maxHeight:'400px'}
<template>
  <div>
    <!-- Loading States -->
    <div v-if="query.isLoading">First load...</div>
    <div v-else-if="query.isFetching">
      Refreshing... (data still shown below)
    </div>
    
    <!-- Error Handling -->
    <div v-if="query.error">
      Error: {{ query.error.message }}
      <button @click="query.refetch">Retry</button>
    </div>
    
    <!-- Success State -->
    <div v-if="query.data" :class="{ 'opacity-50': query.isFetching }">
      {{ query.data }}
    </div>
  </div>
</template>

<script setup>
const query = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
})
</script>
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">State Management:</div>
      <ul class="ml-4">
        <li>Distinct loading states</li>
        <li>Automatic retries</li>
        <li>Exponential backoff</li>
        <li>Background updates (Window Refocus, Reconnection, Manual Refetch)</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# Dependent Queries

::left::

```js {*}{maxHeight:'400px'}
const userQuery = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId)
})

// This query only runs when userQuery has data
const postsQuery = useQuery({
  queryKey: ['posts', userQuery.data?.id],
  queryFn: () => fetchUserPosts(userQuery.data.id),
  // Only execute if we have the user's ID
  enabled: !!userQuery.data?.id
})
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">Query Dependencies:</div>
      <ul class="ml-4">
        <li>Automatic query sequencing</li>
        <li>Conditional execution</li>
        <li>Data-dependent fetching</li>
        <li>Waterfall prevention(Parallel Fetching, Data Hoisting, Optimized Refetching)</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# Optimistic Updates

::left::

```js {*}{maxHeight:'400px'}
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['todos'] })
    
    // Snapshot previous value
    const previousTodos = queryClient.getQueryData(['todos'])
    
    // Optimistically update
    queryClient.setQueryData(['todos'], old => [
      ...old,
      { id: 'temp', ...newTodo }
    ])
    
    return { previousTodos }
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context.previousTodos)
  },
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  }
})
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">Optimistic Features:</div>
      <ul class="ml-4">
        <li>Instant UI updates</li>
        <li>Automatic rollbacks</li>
        <li>Background revalidation</li>
        <li>Conflict resolution</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# Infinite Queries

::left::

```vue {*}{maxHeight:'400px'}
<template>
  <div>
    <div v-for="page in postsQuery.data.pages" :key="page.nextId">
      <div v-for="post in page.posts" :key="post.id">
        {{ post.title }}
      </div>
    </div>
    
    <button
      @click="postsQuery.fetchNextPage"
      :disabled="!postsQuery.hasNextPage || postsQuery.isFetchingNextPage"
    >
      Load More
    </button>
  </div>
</template>

<script setup>
const postsQuery = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 0 }) => fetchPostPage(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextId,
})
</script>
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">Infinite Loading:</div>
      <ul class="ml-4">
        <li>Automatic page tracking</li>
        <li>Cursor or Offset based pagination</li>
        <li>Background page prefetching</li>
        <li>Seamless data merging</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# Refetching & Polling

::left::

```js {*}{maxHeight:'400px'}
const stockPriceQuery = useQuery({
  queryKey: ['stockPrice', symbol],
  queryFn: () => fetchStockPrice(symbol),
  
  // Automatic Refetching
  refetchInterval: 1000 * 30, // Poll every 30 seconds
  refetchOnWindowFocus: true, // Refresh when tab is focused
  refetchOnReconnect: true,   // Refresh on internet reconnect
  
  // Stop polling when tab is in background
  refetchIntervalInBackground: false,
  
  // Pause polling conditionally
  enabled: isMarketOpen
})
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">Smart Refetching:</div>
      <ul class="ml-4">
        <li>Automatic background polling</li>
        <li>Window focus detection</li>
        <li>Network status awareness</li>
        <li>Conditional execution</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# Memory Management

::left::

```js {*}{maxHeight:'400px'}
const queryClient = useQueryClient({
  defaultOptions: {
    queries: {
      // Remove inactive queries after 5 minutes
      cacheTime: 1000 * 60 * 5,
      
      // Consider data stale after 30 seconds
      staleTime: 1000 * 30,
      
      // Remove queries when component unmounts
      gcTime: 1000 * 60 * 5
    }
  }
})

// Manually remove queries
onUnmounted(() => {
  // Remove specific query
  queryClient.removeQueries({ queryKey: ['user', userId] })
  
  // Remove inactive queries
  queryClient.removeQueries({ 
    predicate: query => query.state.dataUpdatedAt < Date.now() - 1000 * 60 * 60 
  })
})
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">Automatic Cleanup:</div>
      <ul class="ml-4 list-none00">
        <li>Garbage collection of inactive queries</li>
        <li>Configurable cache lifetime</li>
        <li>Memory-efficient data retention</li>
        <li>Manual cleanup options</li>
      </ul>
    </div>
  </v-clicks>
</div>

---

# SSR Support

::left::

```js {*}{maxHeight:'400px'}
// server-entry.js
const app = createApp(App)
const queryClient = new QueryClient()

// Prefetch data during SSR
await queryClient.prefetchQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId)
})

// Dehydrate state for client
const dehydratedState = dehydrate(queryClient)

// main.js (client)
const queryClient = new QueryClient()
const dehydratedState = window.__INITIAL_DATA__

app.use(VueQueryPlugin, {
  queryClient,
  clientState: dehydratedState
})
```

::right::

<div class="mt-4 ml-8">
  <v-clicks>
    <div class="text-sm opacity-90">
      <div class="font-bold text-green-400">SSR Benefits:</div>
      <ul class="ml-4">
        <li>Server-side data prefetching</li>
        <li>Hydration of prefetched data</li>
        <li>No client-side waterfalls</li>
        <li>Improved initial page load</li>
      </ul>
    </div>
  </v-clicks>
</div>