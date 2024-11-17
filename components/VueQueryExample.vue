<template>
  <div>
    <!-- Automatic loading & error states -->
    <div v-if="usersQuery.pending">Loading...</div>
    <div v-if="usersQuery.error">Error: {{ usersQuery.error.message }}</div>

    <!-- Cached data shown while refetching -->
    <div v-if="usersQuery.data" :class="{ 'opacity-50': usersQuery.isFetching }">
      {{ usersQuery.data }}
    </div>

    <!-- Automatic background refetching -->
    <button @click="usersQuery.refetch()">
      Refresh
    </button>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const usersQuery = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const res = await fetch('/users')
    if (!res.ok) throw new Error('Network response was not ok')
    return res.json()
  },
  staleTime: 1000 * 60, // Consider data fresh for 1 minute
  retry: 3,             // Retry failed requests 3 times
  refetchOnWindowFocus: true // Refresh when tab becomes active
})
</script>