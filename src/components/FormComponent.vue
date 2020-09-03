<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Nombre Cerveza</label>
        <input v-model="currentBeer.data.name" type="text" class="form-control" aria-describedby="emailHelp">       
      </div>
      <div class="form-group">
        <label>Precio</label>
        <input v-model="currentBeer.data.price"  type="number" class="form-control">
      </div>
      <div class="form-group">
        <label>Url Imagen</label>
        <input v-model="currentBeer.data.picture"  type="text" class="form-control">
      </div>
      <div>
        <button class="btn btn-primary mb-2">{{currentBeer.id ? 'Editar|' : 'Crear'}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'form-component',
  props:{
    currentBeer:{
      type: Object,
      required: true
    }
  },
 
    methods: {
      ...mapActions (['submitBeer']),

      submitForm(){
        if(this.currentBeer.id){//si existe el id, editamos
          this.$emit('edit-beer', this.currentBeer)    
        }else{//si no, creamos
          this.createBeer()         
        }
         this.clearCurrentBeer()

      },
      createBeer(){
        const beer = {
        name: this.currentBeer.data.name,
        price: this.currentBeer.data.price,
        picture: this.currentBeer.data.picture
      }
      this.submitBeer(beer)//metodo del store que se comunica con la api
      
    },    
    clearCurrentBeer(){
       this.currentBeer.data.name = ''
      this.currentBeer.data.price= 0
      this.currentBeer.data.picture = '',
      this.currentBeer.id= undefined

    }
  },
}
</script>
