# Data Fetching in Vue

<div class="flex flex-col items-center">
  <h2 class="text-2xl opacity-80 mb-4">Building a Mental Model</h2>
  
  <ul class="w-fit space-y-2">
    <li>🤔 Fetch on Render vs. Render on Fetch</li>
    <li>🌐 Native Fetch API</li>
    <li>📦 Third Party Libraries (Axios)</li>
    <li>✨ TanStack Query</li>
    <li>⚖️ Comparing Approaches</li>
  </ul>
</div>

---

# Fetching Patterns

<div class="grid grid-cols-2 gap-8">
  <div class="space-y-4">
    <h2 class="text-2xl text-green-400">Fetch on Render</h2>
    <ul class="space-y-2">
      <li>Component mounts first</li>
      <li>Data fetching begins after mount</li>
      <li>Loading states required</li>
      <li>Potential waterfall effect</li>
    </ul>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl text-blue-400">Render on Fetch</h2>
    <ul class="space-y-2">
      <li>Data fetching before render</li>
      <li>Component renders with data</li>
      <li>Better user experience</li>
      <li>Requires route-level handling (Vue Router) or SSR (Nuxt)</li>
    </ul>
  </div>
</div>

---
layout: default
---

# Native Fetch API

<<< @/components/FetchApi.vue {*}{maxHeight:'400px'}

---
layout: statement
---

<h1 class="gradient-title">The 5 O'clock Rule</h1>

<h4 class="opacity-75">
  The level of abstraction for solving a problem will continue to bubble up until it allows developers to stop thinking about it.
</h4>

---
layout: default
---

# Something Like Axios

<<< @/components/AxiosExample.vue {*}{maxHeight:'400px'}

---

# Fetch vs Axios

<div class="grid grid-cols-2 gap-8">
  <div class="space-y-4">
    <h3 class="text-xl text-green-400">Fetch API</h3>
    <ul class="space-y-2">
      <li>✅ Built into browsers</li>
      <li>✅ Promise-based API</li>
      <li>✅ Access to status & headers</li>
      <li>❌ Manual response.ok checking</li>
      <li>❌ Two-step JSON parsing</li>
    </ul>
  </div>

  <div class="space-y-4">
    <h3 class="text-xl text-blue-400">Axios</h3>
    <ul class="space-y-2">
      <li>✅ Automatic error for status >= 400</li>
      <li>✅ Automatic JSON parsing</li>
      <li>✅ Request/response interceptors</li>
      <li>✅ Request cancellation</li>
      <li>❌ Additional dependency</li>
    </ul>
  </div>
</div>

---

# Why TanStack Query?

<div class="grid grid-cols-2 gap-8">
  <div class="space-y-4">
    <h3 class="text-xl text-orange-400">Data Management</h3>
    <ul class="space-y-2">
      <li>✅ Automatic caching & cache invalidation</li>
      <li>✅ Background data updates</li>
      <li>✅ Optimistic updates</li>
      <li>✅ Infinite scroll & pagination</li>
    </ul>
  </div>

  <div class="space-y-4">
    <h3 class="text-xl text-purple-400">Developer Experience</h3>
    <ul class="space-y-2">
      <li>✅ Built-in loading & error states</li>
      <li>✅ Automatic retries</li>
      <li>✅ Prefetching capabilities</li>
      <li>✅ DevTools for debugging</li>
    </ul>
  </div>
</div>

---

# Basic Example

<<< @/components/VueQueryExample.vue {*}{maxHeight:'400px'}

---

# Beyond Data Fetching

<<< @/lib/vue-query-alt.js js {*}{maxHeight:'400px'}

---

<h3 class="text-xl text-green-400">Any Promise-Based Operation</h3>
<div class="grid grid-cols-2 gap-8">
  <div class="space-y-4">
    <ul class="space-y-2">
      <li>🌐 API requests</li>
      <li>📂 File system operations</li>
      <li>🗺 Geolocation</li>
      <li>🎙 Media devices</li>
      <li>💾 IndexedDB operations</li>
      <li>⚡️ Web Workers</li>
    </ul>
  </div>
  <div class="space-y-4">
    <p class="text-xl opacity-80">TanStack Query manages any asynchronous operation with:</p>
    <ul class="mt-4 space-y-2">
      <li>🎯 Consistent loading states</li>
      <li>🔄 Automatic retries</li>
      <li>📦 Result caching</li>
      <li>🎮 DevTools debugging</li>
    </ul>
  </div>
</div>
