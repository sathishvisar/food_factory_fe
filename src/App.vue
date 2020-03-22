<template>
    <div id="app">

      <md-toolbar class="md-accent" md-elevation="1" v-if="loggingIn">
        <h3 class="md-title" style="flex: 1;text-align: left;">Food Factroy</h3>
        <md-button class="md-primary" @click="logout">Logout</md-button>
      </md-toolbar>
      <div id="nav"  v-if="!loggingIn">
        <router-link to="/signin">Signin</router-link> |
        <router-link to="/signup">Sigup</router-link>
      </div>

      <div>
        <router-view/>
      </div>

    </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    loggingIn () {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.token) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    logout () {
      localStorage.setItem('user', null)
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
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
