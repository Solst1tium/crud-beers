<template>
  <div>
    <h1>loly beerssss</h1>
    {{beer}}
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed:{
    ...mapState(['beer'])
  },
  methods:{
    ...mapActions(['setBeer'])
  },
  created(){
    this.setBeer(this.$route.params.id)
  }  
}
</script>