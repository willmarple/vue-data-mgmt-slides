## Repository Layer with TanStack Query

```ts {*}{maxHeight:'400px'}
// composables/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUserRepository } from '../repositories/userRepository'

export function useUsers() {
  const repository = createUserRepository()
  const queryClient = useQueryClient()

  // Queries
  const users = useQuery({
    queryKey: ['users'],
    queryFn: () => repository.getUsers()
  })

  const user = (id: number) => useQuery({
    queryKey: ['users', id],
    queryFn: () => repository.getUser(id)
  })

  // Mutations
  const createUser = useMutation({
    mutationFn: repository.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const updateUser = useMutation({
    mutationFn: repository.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ 
        queryKey: ['users', updatedUser.id] 
      })
      queryClient.invalidateQueries({ 
        queryKey: ['users'] 
      })
    }
  })

  const deleteUser = useMutation({
    mutationFn: repository.deleteUser,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ 
        queryKey: ['users', deletedId] 
      })
      queryClient.invalidateQueries({ 
        queryKey: ['users'] 
      })
    }
  })

  return {
    users,
    user,
    createUser,
    updateUser,
    deleteUser
  }
}
```

---

## Using the Composable

```vue {29-45}{maxHeight:'400px'}
<template>
  <div>
    <!-- Loading States -->
    <div v-if="users.pending">Loading users...</div>
    <div v-else-if="users.error">Error: {{ users.error.message }}</div>
    
    <!-- User List -->
    <div v-else>
      <div v-for="user in users.data" :key="user.id">
        {{ user.name }}
        <button @click="handleDelete(user.id)">Delete</button>
      </div>
    </div>

    <!-- Create User Form -->
    <form @submit.prevent="handleCreate">
      <input v-model="newUser.name" placeholder="Name" />
      <input v-model="newUser.email" placeholder="Email" />
      <button 
        type="submit" 
        :disabled="createUser.isPending"
      >
        {{ createUser.isPending ? 'Creating...' : 'Create User' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUsers } from '../composables/useUsers'

const { users, createUser, deleteUser } = useUsers()

const newUser = ref({ name: '', email: '' })

const handleCreate = async () => {
  await createUser.mutateAsync(newUser.value)
  newUser.value = { name: '', email: '' }
}

const handleDelete = (id: number) => {
  deleteUser.mutate(id)
}
</script>
```

---
layout: center
---

# Data Flow Freedom

```vue {*}{maxHeight:'400px'}
<!-- ❌ Traditional Prop Drilling -->
<template>
  <div>
    <UserList :users="users" @refetch="fetchUsers">
      <UserCard 
        v-for="user in users"
        :user="user"
        :loading="loading"
        @update="updateUser"
        @delete="deleteUser"
      >
        <UserActions 
          :userId="user.id"
          @edit="editUser"
          @refresh="refetchUser"
        />
      </UserCard>
    </UserList>
  </div>
</template>

<!-- ✅ With TanStack Query -->
<template>
  <div>
    <UserList>
      <UserCard v-for="user in users">
        <UserActions :userId="user.id"/>
      </UserCard>
    </UserList>
  </div>
</template>
```

---
layout: center
---

## Loose Data Coupling

<div class="grid grid-cols-2 gap-8">
  <div>
    <div class="font-bold text-red-400 mb-4">Traditional Challenges:</div>
    <ul class="ml-4 space-y-2 mb-8">
      <li>Prop drilling through components breaks composability</li>
      <li>provide/inject can become complex</li>
      <li>Manual state synchronization</li>
      <li>Tight component coupling</li>
    </ul>
  </div>

  <div>
    <div class="font-bold text-green-400 mb-4">TanStack Query Benefits:</div>
    <ul class="ml-4 space-y-2">
      <li>Components fetch their own data</li>
      <li>Shared cache across components</li>
      <li>Automatic synchronization</li>
      <li>Loose coupling</li>
    </ul>

    
  ```js {*}{maxHeight:'200px'}
  // Any component can access data
  const { users } = useUsers()
  const { user } = useUser(props.userId)
  ```
  </div>
</div>
