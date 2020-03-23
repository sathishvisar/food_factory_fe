<template>
  <div>
    <h2>Admin</h2>
    <ul>
      <li>Name: {{ response.name }} </li>
      <li>Email: {{ response.email }} </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      response: {}
    }
  },
  methods: {
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
