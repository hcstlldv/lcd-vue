<template>
  <h1>Lemoncode Master Vue Project</h1>
  <img alt="Vue logo" src="./assets/logo.png" />
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
h1 {
  color: #64b687;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
