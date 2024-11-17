## Both Approaches Can Work Together
<div class="grid grid-cols-2 gap-16">
    <div>
        <div class="text-xl font-bold text-blue-400 mb-4">TanStack Query</div>
        <ul class="space-y-4">
            <li>Built for server state</li>
            <li>Automatic caching</li>
            <li>Data synchronization</li>
            <li>Loose coupling</li>
        </ul>
    </div>
    <div>
        <div class="text-xl font-bold text-green-400 mb-4">State Machines</div>
        <ul class="space-y-4">
            <li>Explicit state control</li>
            <li>Complex workflows</li>
            <li>State management close to the UI</li>
            <li>State transitions</li>
        </ul>
    </div>
</div>

---
layout: center
---

# Pinia Advantages

<div class="grid grid-cols-2 gap-16">
  <div>
    <div class="text-xl font-bold text-blue-400 mb-4">Developer Experience</div>
    <ul class="space-y-4">
      <li>TypeScript support out of the box</li>
      <li>Vue DevTools integration</li>
      <li>Hot Module Replacement</li>
      <li>Intuitive API design</li>
    </ul>
  </div>

  <div>
    <div class="text-xl font-bold text-green-400 mb-4">Architecture</div>
    <ul class="space-y-4">
      <li>Modular store design</li>
      <li>Composable functions</li>
      <li>No namespacing needed</li>
      <li>Light bundle size (~1kb)</li>
    </ul>
  </div>
</div>

---
layout: center
---

## When to Use Pinia
<p class="mt-4 text-center opacity-80">
  Perfect for state that needs to be accessed and modified across multiple components
</p>

<div class="grid grid-cols-2 gap-16">
  <div>
    <div class="text-xl font-bold text-blue-400 mb-4">Complex UI States</div>
    <ul class="space-y-4">
      <li>Multi-step wizards</li>
      <li>Shopping cart workflows</li>
      <li>Authentication flows</li>
      <li>Form state management</li>
    </ul>
  </div>

  <div>
    <div class="text-xl font-bold text-green-400 mb-4">Global Features</div>
    <ul class="space-y-4">
      <li>Theme management</li>
      <li>User preferences</li>
      <li>Application settings</li>
      <li>Feature flags</li>
    </ul>
  </div>
</div>

---
layout: center
---

<h4 class="text-center mb-4 opacity-80">
  Type-safe, intuitive, and straightforward
</h4>

```ts {9-25}{maxHeight:'400px'}
// stores/theme.ts
interface ThemeState {
  isDark: boolean
  accentColor: string
  fontSize: 'sm' | 'md' | 'lg'
  sidebarOpen: boolean
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDark: false,
    accentColor: '#3ecc8b',
    fontSize: 'md',
    sidebarOpen: true
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
    },
    setSidebarOpen(isOpen: boolean) {
      this.sidebarOpen = isOpen
    }
  }
})
```

---
layout: center
---

<h4 class="text-center mb-4 opacity-80">
  Seamless integration with Composition API
</h4>

```vue {3,8|11-13|14-18} {maxHeight:'400px'}
<script setup lang="ts">
// Component using the theme store
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

export interface Props {
  defaultOpen?: boolean
}
const props = withDefaults(defineProps<Props>(), { defaultOpen: true })

// Destructure with storeToRefs to maintain reactivity
const themeStore = useThemeStore()
const { isDark, sidebarOpen } = storeToRefs(themeStore)

// Use store actions and state
function toggleSidebar() {
  themeStore.setSidebarOpen(!sidebarOpen.value)
}

watch(isDark, (newValue) => {
  document.body.classList.toggle('dark', newValue)
})
</script>
```

---
layout: center
---

<h4 class="text-center mb-4 opacity-80">
  Powerful state tracking and persistence capabilities
</h4>

```ts {1-4|6-11|13-21|23-29}{maxHeight:'400px'}
// Watching specific state changes
watch(() => store.isDark, (newValue) => {
  updateTheme(newValue)
})

// Subscribe to all state changes
store.$subscribe((mutation, state) => {
  console.log('Changed:', mutation.type)
  console.log('New state:', state)
  localStorage.setItem('theme', JSON.stringify(state))
})

// Subscribe to specific actions
store.$onAction(({
  name,    // action name
  args,    // array of parameters passed to the action
  after,   // hook after the action returns or resolves
  onError  // hook if the action throws or rejects
}) => {
  console.log(`Action ${name} was called`)
})

// Automatic persistence example
store.$subscribe((mutation, state) => {
  if (mutation.type === '$patch') {
    // Save to localStorage whenever state changes
    localStorage.setItem('theme', JSON.stringify(state))
  }
}, { detached: true }) // continues after component unmount
```

---
layout: center
---

## A Place to Start

<h4 class="text-center opacity-80">
  Use TanStack Query for server state, Pinia for everything else
</h4>

<div class="grid grid-cols-2 gap-16">
  <div>
    <div class="text-xl font-bold text-blue-400 mb-4">TanStack Query</div>
    <ul class="space-y-4">
      <li>Server state & caching</li>
      <li>Data mutations</li>
      <li>Loading states</li>
      <li>Error handling</li>
    </ul>
  </div>

  <div>
    <div class="text-xl font-bold text-green-400 mb-4">Pinia</div>
    <ul class="space-y-4">
      <li>UI state management</li>
      <li>User preferences</li>
      <li>Application settings</li>
      <li>Complex workflows</li>
    </ul>
  </div>
</div>