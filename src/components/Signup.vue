<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Food Factroy</div>
        <div class="md-body-1">Serve Food! Serve Love!</div>
      </div>

      <div class="form">
        <div class="fieldRow">
          <md-field>
            <label>Name</label>
            <md-input v-model="register.name" type="text"></md-input>
          </md-field>
          <span v-show="submitted && !register.name" class="invalid-field">Name is required</span>
        </div>

        <div class="fieldRow">
          <md-field>
            <label>E-mail</label>
            <md-input v-model="register.email" autofocus></md-input>
          </md-field>
          <span v-show="submitted && !register.email" class="invalid-field">Email is required</span>
        </div>

        <div class="fieldRow">
          <md-field md-has-password>
            <label>Password</label>
            <md-input v-model="register.password" type="password"></md-input>
          </md-field>
          <span v-show="submitted && !register.password" class="invalid-field">Password is required</span>
        </div>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="reg">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data () {
    return {
      loading: false,
      submitted: false,
      register: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    reg () {
      this.submitted = true
      const { name, email, password } = this.register
      if (name && email && password) {
        axios.post('http://localhost:3000/user/create', {
          name: name,
          email: email,
          password: password
        })
          .then(function (user) {
            console.log(user)
          })
          .catch(function (error) {
            console.log(error)
          })
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
