<h1 class="gradient-title">Data Management in Vue</h1>
Modern Approaches with TanStack Query and Pinia

<!--
Welcome to this presentation about Data Management in Vue!
-->

---
layout: center
---

<div class="flex flex-col items-center">
  <img src="/images/ba-logo.svg" class="w-40 mb-8 opacity-75" />

  # Will Marple

  <h2 class="font-normal text-2xl opacity-75">Principal Engineer</h2>
  <h3 class="font-normal text-xl opacity-75">Black Airplane</h3>
</div> 

---
layout: intro
---

<h1 class="gradient-title">Overvue</h1>

Today we'll explore:

<ul class="w-fit mx-auto text-left">
  <v-clicks>
    <li>Options for Data Fetching</li>
    <li>Data Flow Patterns</li>
    <li>State Management Challenges</li>
    <li>TanStack Query: A Great Place to Start</li>
    <li>Pinia: State Machines & When to Use Them</li>
  </v-clicks>
</ul>

---
layout: center
---

<h1 class="gradient-title">The Problem Statement</h1>

<h4 class="text-xl opacity-75">
  —  "Getting the data is easy, it's managing it over time that's hard."
</h4>

---
layout: intro
---

<h1 class="gradient-title">The 10,000ft Vue</h1>

We've got to:

<ul class="w-fit mx-auto text-left">
  <v-clicks>
    <li>Get the data</li>
    <li>Stash the data somewhere</li>
    <li>Distribute the data to the components that need it</li>
    <li>Manage the data as it changes over time</li>
  </v-clicks>
</ul>

---