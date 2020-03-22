import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/Signin',
      name: 'Signin',
      component: () => import('../components/Signin.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../components/Signup.vue')
    },
    {
      path: '/app',
      name: 'Food Factory',
      component: () => import('../components/Dashboard.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/signin', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  console.log(loggedIn)
  if (authRequired && !loggedIn) {
    return next('/signin')
  }

  next()
})

export default router
