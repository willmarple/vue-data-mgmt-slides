---
layout: center
---

<h2 class="text-center">Server State in Pinia?</h2>

<div class="grid grid-cols-2 gap-16">
  <div>
    <div class="text-xl font-bold text-yellow-400 mb-4">Why Consider It?</div>
    <ul class="space-y-4">
      <li>Complex UI state derived from server data</li>
      <li>Multi-step forms with server validation</li>
      <li>Offline-first functionality</li>
      <li>Cross-component coordination</li>
    </ul>
  </div>

  <div>
    <div class="text-xl font-bold text-red-400 mb-4">Common Pitfalls</div>
    <ul class="space-y-4">
      <li>Duplicate sources of truth</li>
      <li>Stale data</li>
      <li>Race conditions</li>
      <li>Memory leaks</li>
    </ul>
  </div>
</div>

<div class="mt-12 text-center text-xl opacity-90">
  The key is determining <span class="text-green-400">when</span> and <span class="text-green-400">how</span> to sync server state
</div>

---
layout: center
---

## TanStack Query First Pattern
<div class="space-y-12">
  <div class="text-xl text-center opacity-90">
    Let TanStack Query handle the <span class="text-blue-400">what</span> and <span class="text-blue-400">when</span> of data fetching
  </div>


```ts {1-8|10-17|19-26|28-37|39-53}{maxHeight:'400px'}
// ✅ Different Patterns for Cache Integration
const userStore = useUserStore()
const queryClient = useQueryClient()

// Define how server data maps to UI state
const syncSelectedUsers = (users) => {
  userStore.syncSelectedUsers(users.filter(user => userStore.selectedUserIds.includes(user.id)))
}

// Option 1: Using onSuccess callback
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  onSuccess: (data) => {
    syncSelectedUsers(data)
  }
})

// Option 2: Using Query Observer
queryClient.getQueryCache().subscribe(event => {
  if (event.query.queryKey[0] === 'users') {
    if (event.type === 'updated' && event.action.type === 'success') {
      syncSelectedUsers(event.query.state.data)
    }
  }
})

// Option 3: Using Mutation callbacks
const updateUser = useMutation({
  mutationFn: updateUserData,
  onSuccess: (data, variables) => {
    // Update Pinia after successful mutation
    userStore.updateUser(data)
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
})

// Option 4: Using Vue watch
const { data: watchedUsers } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})

watch(
  watchedUsers,
  (newUsers) => {
    if (newUsers) {
      syncSelectedUsers(newUsers)
    }
  },
  { immediate: true }
)
```
</div>

---
layout: center
---

# Common Anti-Patterns

<div class="space-y-12">
  <div class="text-xl text-center opacity-90">
    Avoid managing server state directly in Pinia
  </div>

  <div class="grid grid-cols-2 gap-16">
    <div>
      <div class="text-xl font-bold text-red-400 mb-4">Problems</div>
      <ul class="space-y-4">
        <li>Multiple sources of truth</li>
        <li>Manual cache management</li>
        <li>Complex error handling</li>
        <li>No automatic invalidation</li>
      </ul>
    </div>


```ts {*}{maxHeight:'300px'}
// ❌ Anti-Pattern
export const useUserStore = defineStore('users', {
state: () => ({
    users: [],
    loading: false,
    error: null
}),
actions: {
    async fetchUsers() {
    this.loading = true
    try {
        this.users = await api.getUsers()
    } catch (err) {
        this.error = err
    }
    this.loading = false
    }
}
})
```

  </div>
</div>

---
layout: center
---

## Syncing State Changes to Server
<div class="text-center opacity-90">
  Pinia manages UI state while TanStack Query handles server communication
</div>

```ts {1-7|9-19|21-39|41-60}{maxHeight:'400px'}
// Imports
import { defineStore } from 'pinia'
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/vue-query'

// stores/todoStore.ts
interface TodoState {
  selectedTags: string[]
  sortOrder: 'priority' | 'date'
  view: 'list' | 'board'
  // Note: Actual todos live in TanStack Query cache
}

const useTodoStore = defineStore('todos', {
  state: (): TodoState => ({ selectedTags: [], sortOrder: 'date', view: 'list' })
})

// composables/useTodos.ts
export function useTodos() {
  const todoStore = useTodoStore()
  const queryClient = useQueryClient()

  // Get todos with current filters
  const { data: todos } = useQuery({
    queryKey: ['todos', todoStore.selectedTags],
    queryFn: () => fetchTodos(todoStore.selectedTags)
  })

  // Update todo tags mutation
  const updateTags = useMutation({
    mutationFn: updateTodoTags,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}

// Component usage
import { watch } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useTodos } from '@/composables/useTodos'

const todoStore = useTodoStore()
const { updateTags } = useTodos()

// Watch for tag changes and sync to server
watch(
  () => todoStore.selectedTags,
  async (newTags) => {
    if (newTags.length) {
      await updateTags.mutateAsync({
        tags: newTags,
        todoIds: selectedTodoIds
      })
    }
  }
)
```

---
layout: center
---

## Keeping Components Clean
<div class="text-center opacity-90">
  Composables handle state synchronization, components stay focused on presentation
</div>

```ts {1-7|9-19|21-45|48-65}{maxHeight:'400px'}
// Imports
import { defineStore } from 'pinia'
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/vue-query'

// stores/todoStore.ts
interface TodoState {
  selectedTags: string[]
  sortOrder: 'priority' | 'date'
  view: 'list' | 'board'
  // Note: Actual todos live in TanStack Query cache
}

const useTodoStore = defineStore('todos', {
  state: (): TodoState => ({ selectedTags: [], sortOrder: 'date', view: 'list' })
})

// composables/useTodos.ts
export function useTodos() {
  const todoStore = useTodoStore()
  const queryClient = useQueryClient()

  // Get todos with current filters
  const { data: todos } = useQuery({
    queryKey: ['todos', todoStore.selectedTags],
    queryFn: () => fetchTodos(todoStore.selectedTags)
  })

  // Watch store changes and sync to server
  watch(
    () => todoStore.selectedTags,
    async (newTags) => {
      if (newTags.length) {
        await updateTags.mutateAsync({
          tags: newTags,
          todoIds: selectedTodoIds
        })
      }
    }
  )

  return { todos }
}

// Component usage - Much cleaner! 🎉
import { useTodoStore } from '@/stores/todoStore'
import { useTodos } from '@/composables/useTodos'

const TodoList = defineComponent({
  setup() {
    const todoStore = useTodoStore()
    const { todos } = useTodos()

    return () => (
      <div>
        {/* Component only needs to render and handle UI interactions */}
        <TagSelector v-model={todoStore.selectedTags} />
        <TodoItems todos={todos.value} />
      </div>
    )
  }
})
```

---
layout: center
---

## Best Practices for State Management

<div class="grid grid-cols-2 gap-16">
  <div>
    <div class="text-xl font-bold text-blue-400 mb-4">Keep in TanStack Query</div>
    <ul class="space-y-4">
      <li>Raw server responses</li>
      <li>Cached API data</li>
      <li>Loading states</li>
      <li>Error states</li>
      <li>Pagination metadata</li>
    </ul>
  </div>

  <div>
    <div class="text-xl font-bold text-green-400 mb-4">Sync to Pinia</div>
    <ul class="space-y-4">
      <li>User preferences</li>
      <li>UI state</li>
      <li>Filter selections</li>
      <li>Sort orders</li>
      <li>View configurations</li>
    </ul>
  </div>
</div>

---
layout: center
---
## Best Practices for TanStack Query + Pinia

<div class="mt-12 space-y-4">
  <div class="text-xl font-bold text-yellow-400 mb-4">Maintenance Guidelines</div>
  <ul class="grid grid-cols-2 gap-2">
    <li>✅ Let TanStack Query interact with the server</li>
    <li>✅ Components should remain presentational</li>
    <li>✅ Pinia handles UI state</li>
    <li>✅ Organize composables logically and consistently</li>
    <li>✅ Document state ownership clearly</li>
    <li>✅ Use TypeScript for better maintainability</li>
  </ul>
</div>