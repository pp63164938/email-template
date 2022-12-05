<template>
  <div id="app">
    <nav v-if="1">
      <router-link to="/MyEditor">MyEditor</router-link> |
      <!-- <router-link to="/X6">X6</router-link> | -->
      <router-link to="/EmailEditorDemo">EmailEditorDemo</router-link> |
      <!-- <router-link to="/EmailTemplate">EmailTemplate</router-link> | -->
      <!-- <router-link to="/EmailEditor">EmailEditor</router-link> | -->
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </nav>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// import SlotScopes from "@/components/SlotScopes";
// import HomeView from "@/views/HomeView";
export default {
  components: {
    // SlotScopes,
    // HomeView,
  },
};
</script>


<style lang="scss">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
