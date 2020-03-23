<template>
  <div>
     <md-toolbar class="md-accent" md-elevation="1" >
        <h3 class="md-title" style="flex: 1;text-align: left;">Food Factroy</h3>
        <md-button class="md-primary" @click="logout">Logout</md-button>
      </md-toolbar>
    <h2>Admin</h2>
    <ul>
      <li>Name: {{ response.name }} </li>
      <li>Email: {{ response.email }} </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { router } from './../router/index'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      response: {}
    }
  },
  methods: {
    logout () {
      localStorage.setItem('user', null)
      this.$store.dispatch('authentication/logout')
      router.push('/signin')
    },
    loadData () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      const userData = JSON.parse(localStorage.getItem('user'))
      axios.get('http://localhost:3000/user/get/' + userData.user_id)
        .then(function (user) {
          console.log(user.data)
          self.response = user.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
<style scoped lang="scss">
ul{
    padding: 0px;
}
</style>
