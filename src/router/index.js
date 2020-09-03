import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import BeerComponent from '../components/BeerComponent.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      login:true
    }
  },
  {
    path: '/beers/:id',
    name: 'Beer',
    component: BeerComponent,
    meta:{
      login:true
    }
  },
  {
    path: '/*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {//3 parametros: hacia donde va (to), de donde viene (from) y el destino (next)
  let user = firebase.auth().currentUser
  let authRequired =  to.matched.some(route => route.meta.login)
    if(!user & authRequired) {
      next('/')
    } else {
      next()
    }

}) 

export default router
