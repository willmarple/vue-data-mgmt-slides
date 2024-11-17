<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>
        <div v-else>
            {{ data }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)
const loading = ref(true)

// Add auth header and cache buster
const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
})

try {
    const response = await fetch('/users', {
        headers,
        // Add cache buster
        cache: 'no-cache'
    })

    // Manual error handling
    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw new Error('Please login to continue')
            case 429:
                throw new Error('Too many requests, please try again')
            default:
                const errorData = await response.json()
                throw new Error(errorData.message || `Error ${response.status}`)
        }
    }

    // Manual JSON parsing
    data.value = await response.json()
} catch (err) {
    error.value = err
} finally {
    loading.value = false
}
</script>