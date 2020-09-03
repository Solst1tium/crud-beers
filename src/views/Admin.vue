<template>
  <div>
    <h1>PAGINA ADMINISTRADOR</h1>
    <h2>Bienvenido {{currentUser.email}}</h2>
    <form-component @edit-beer= 'beerUpdate' :currentBeer="currentBeer"></form-component>
    <ul>
      <li v-for="beer in beers" :key="beer.id">
        <div>
          {{beer.data.name}}
          <img :src="beer.data.picture"/> 
          <router-link :to= "{name: 'Beer', params: {id: beer.id}}" >ver beer </router-link>
          <button @click="deleteBeer(beer.id)" class="btn btn-danger"> Eliminar</button>
          <button @click="setCurrentBeer(beer)" class="btn btn-success"> Editar</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import FormComponent  from '../components/FormComponent'
export default {
  data(){
    return  {
      currentBeer: {
        data:{ 
        name: '',
        price: 0,
        picture:''
        },       
        id: undefined
      }
    }
  },
components: {
  FormComponent
  },

  computed:{
    ...mapState (['currentUser', 'beers'])
  },
  methods:{
    ...mapActions(['setBeers', 'deleteBeer', 'updatedBeer']),
    setCurrentBeer(beer){
      this.currentBeer = beer
    },
   beerUpdate(beer){
     const newBeer = {
       data:{
         name: beer.data.name,
         price: beer.data.price,
         picture:beer.data.picture
       },
       id: beer.id
     }
      this.updatedBeer(newBeer),//updateBeer map actions
      this.currentBeer.data.name = '',
      this.currentBeer.data.price = 0,
      this.currentBeer.data.picture = '',
      this.currentBeer.id = undefined
    }   
  },
  created(){//funcion q se ejecuta cuando el componente se cre
    this.setBeers()
  }
  
}
</script>