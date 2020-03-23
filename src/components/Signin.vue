<template>
<div>
      <div id="nav" >
        <router-link to="/signin">Signin</router-link> |
        <router-link to="/signup">Sigup</router-link>
    </div>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Food Factroy</div>
        <div class="md-body-1">Serve Food! Serve Love!</div>
      </div>

      <div class="form">
        <div class="fieldRow">
          <md-field>
            <label>E-mail</label>
            <md-input v-model="login.username" autofocus></md-input>
          </md-field>
          <span v-show="submitted && !login.username" class="invalid-field">Email is required</span>
        </div>

        <div class="fieldRow">
          <md-field>
            <label>Password</label>
            <md-input v-model="login.password" autofocus  type="password"></md-input>
          </md-field>
          <span v-show="submitted && !login.password" class="invalid-field">Password is required</span>
        </div>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ snackMessage }}</span>
        <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
      </md-snackbar>

    </md-content>
    <div class="background" />
  </div>
</div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      loading: false,
      submitted: false,
      showSnackbar: false,
      snackMessage: '',
      position: 'center',
      duration: 4000,
      isInfinity: false,
      login: {
        username: '',
        password: '',
        submitted: false
      }
    }
  },
  computed: {
    loggingIn () {
      return this.$store.state.authentication.status.loggingIn
    }
  },
  created () {
    // reset login status
    this.$store.dispatch('authentication/logout')
  },
  methods: {
    auth () {
      this.submitted = true
      const { username, password } = this.login
      const { dispatch } = this.$store
      if (username && password) {
        // this.loading = true
        dispatch('authentication/login', { username, password })
      }
    }
  }
}
</script>

<style lang="scss">
.fieldRow{
  position: relative;
  .invalid-field{
        color: red;
    position: absolute;
    left: 0;
    bottom: -22px;
  }
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }

  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: absolute;
    top: 0px;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
