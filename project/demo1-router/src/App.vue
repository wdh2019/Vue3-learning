<template>
    <div>
      <!-- <h1>Hello App!</h1>
      <p>
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
      </p> -->
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
