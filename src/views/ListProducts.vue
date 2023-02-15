<template>
  <h2 v-if="orderExists">{{ `Tenes el pedido ${$cookies.get('order')} pendiente!` }}</h2>
  <div class="container">
    <CardProduct v-for="product in data.products" 
    :key="product._id"
    :_id="product._id"
    :name="product.name"
    :description="product.description"
    :img="product.img"
    :price="product.price"/>
  </div>
</template>

<script setup>
  import CardProduct from '../components/Products/CardProduct.vue';
    import {onMounted,ref} from 'vue';
    import fetchService from '../helpers/fetchService'
    
    import {useChartStore} from '../store/chart';
    import Swal from 'sweetalert2';
    
    const service = new fetchService();
    const data = service.getProducts();

    const chartStore = useChartStore();

    const orderExists = ref(false)

    onMounted(async()=>{

        if($cookies.isKey('order')){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: `No vas a poder hacer otro pedido hasta abonar el pedido pendiente!`,
          })
          orderExists.value = true;
        }
        await service.fetchAll();
        chartStore.prevChart();
      })
</script>

<style scoped>
h2{
  background-color: var(--color3);
  padding: 5px;
  width: 100%;
  font-family: var(--primaryFont);
  color: var(--color1);
  text-align: center;
  font-size: 18px;
  margin-bottom: 5px;
}
  div{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  
</style>