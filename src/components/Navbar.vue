<template>
  <div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <div  id="navbarNav" class="ml-auto">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link v-if="!currentUser" class="nav-link" to="/">Home</router-link> 
     </li>
      <li class="nav-item">
       <router-link class="nav-link" to="/admin">Admin</router-link>
      </li>
      <li class="nav-item" v-if="currentUser">
        <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
      </li>
      </ul>
  </div>
</nav>
  </div>
</template>
<script>

import firebase from 'firebase'
import{mapActions, mapState} from 'vuex'
export default {
  methods:{
    ...mapActions(['setUser']),
  
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
        this.setUser(undefined)
      })
    }
  },
  computed:{
      ...mapState(['currentUser']),

  }
}
</script>