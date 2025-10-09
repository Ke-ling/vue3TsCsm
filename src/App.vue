<template>
  <nav>
    <!-- Element Plus  -->
    <el-button type="primary">Primary Button</el-button>
    <el-button>Default Button</el-button>
    <br />
    <router-link to="/main">Main</router-link>
    <br />
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view />
</template>

<style lang="less">
#app {
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
