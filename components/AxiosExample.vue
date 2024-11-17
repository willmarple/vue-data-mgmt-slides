<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>{{ data }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Usually organized in a composable
const data = ref(null)
const error = ref(null)
const loading = ref(true)

try {
  const { data: userData } = await axios.get('/users')
  data.value = userData
} catch (err) {
  error.value = new Error(err.response?.data?.message || 'Failed to fetch data')
} finally {
  loading.value = false
}

// Request Interceptor: Runs before every request
axios.interceptors.request.use(config => {
  // Add auth header
  config.headers.Authorization = `Bearer ${token}`

  // Add timestamp to bust cache
  config.params = {
    ...config.params,
    _t: Date.now()
  }

  return config
})

// Response Interceptor: Runs after every response
axios.interceptors.response.use(
  response => {
    // Transform successful responses
    return response.data
  },
  error => {
    // Handle common errors
    if (error.response?.status === 401) {
      router.push('/login')
    }
    if (error.response?.status === 429) {
      // Implement retry logic
      return retryRequest(error.config)
    }
    return Promise.reject(error)
  }
)
</script>