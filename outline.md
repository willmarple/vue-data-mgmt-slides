# Presentation Outline: Data Management in Vue

## Introduction (5 slides)
- Overview of state management challenges in Vue applications
- Goals of the presentation

## Part 1: Freeing Component Composition (20 slides)

### Vue Query Approach (10 slides)
- Introduction to Vue Query
- Key features and benefits
- Basic usage example:
    ```vue
    <script setup>
    import { useQuery } from 'vue-query'

    const { isLoading, error, data } = useQuery('todos', fetchTodos)
    </script>

    <template>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">An error occurred: {{ error.message }}</div>
      <ul v-else>
        <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
      </ul>
    </template>
    ```
- How Vue Query simplifies data fetching and state management

### Pinia Approach (5 slides)
- Brief overview of Pinia
- Example of a Pinia store for comparison

### Hybrid Approach (5 slides)
- Combining Vue Query and Pinia
- When and how to use both together

## Part 2: Vue Query Deep Dive (25 slides)

### Key Features (15 slides)
- Caching and automatic refetching
- Parallel and dependent queries
- Mutations and optimistic updates
- Infinite queries for pagination
- Prefetching

### Tuning Vue Query (10 slides)
- Cache invalidation strategies:
    ```javascript
    const queryClient = useQueryClient()
    queryClient.invalidateQueries('todos')
    ```
- Configuring stale time and cache time
- Custom query functions
- Error handling and retries

## Part 3: When to Introduce Global State (20 slides)

### Use Cases for Global State (10 slides)
- User authentication and preferences
- Application-wide settings
- Complex UI state (e.g., multi-step forms)
- Cross-component communication

### Pinia Implementation (10 slides)
- Setting up a Pinia store:
    ```javascript
    import { defineStore } from 'pinia'

    export const useUserStore = defineStore('user', {
      state: () => ({
        user: null,
        preferences: {}
      }),
      actions: {
        login(userData) {
          this.user = userData
        },
        logout() {
          this.user = null
        }
      }
    })
    ```
- Integrating Pinia with Vue components
- Best practices for organizing stores

## Conclusion (5 slides)
- Recap of key points
- Guidelines for choosing between Vue Query and Pinia
- Q&A