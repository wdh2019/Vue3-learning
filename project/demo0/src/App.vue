<template>
  <composition-apis name="xiaoWang"/>
</template>

<script>
import CompositionApis from './components/CompositionAPIs.vue'

export default {
  name:'App',
  components:{
    CompositionApis
  }
}
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

div.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
