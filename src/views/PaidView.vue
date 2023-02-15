<template>
  <div class="container" v-if="chartStore.chart.length <= 0">
    <p>No hay productos en el pedido!</p>
  </div>
  <div>
    <ListCardProduct v-for="product in chartStore.chart" 
    :key="product._id"
    :_id="product._id"
    :name="product.name"
    :cant="product.cant"
    :img="product.img"
    :price="product.price"/>
  </div>
  <div class="container">
    <p>Total: ${{ chartStore.totalPrice }}</p>
  </div>
  <div class="containerButtons">
    <PaidButton 
    :title="'Efectivo'" 
    :theme="'success'" 
    :route="'/confirm'"
    class="childrenButtons"/>

    <PaidButton 
    :title="'Mercado Pago'" 
    :theme="'mp'"
    route=""
    class="childrenButtons"
    @click="paidMP()"/>
  </div>
</template>

<script setup>
  import {onMounted,ref} from 'vue'
  import ListCardProduct from '../components/Products/ListCardProduct.vue';
  import {useChartStore} from '../store/chart';
  import PaidButton from '../components/Products/PaidButton.vue'
import router from '../routes';
import OrderService from '../helpers/orderService';
  const chartStore = useChartStore();

  let link = ref('');

  const paidMP = async () => {
    const items = chartStore.chart.map(product=>{
        return {
            id:product._id,
            title:product.name,
            currency_id:'ARS',
            unit_price:product.price, //en esta propiedad ponemos el precio de la unidad
            quantity:product.cant,
        }
    });

    const response = await fetch(`${import.meta.env.VITE_URL_API}/orders/checkout`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify({items})
                
            });
            const data = await response.json();

            link.value = await data.link;

            let order = new OrderService();

            let newOrder = {
              chart: chartStore.chart,
              subtotal:chartStore.totalPrice,
              paid: true
            }
            await order.createOrder(newOrder);

            const orderExists = order.getOrder();
            
            if(orderExists.value.status == 200){
              $cookies.set('order', orderExists.value.order._id);
              localStorage.removeItem('chart');
            }

       

            location.href = link.value
  }

  onMounted(async()=>{
        chartStore.prevChart();
      })
  

</script>

<style scoped>
  div{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  div.container{
        width: 100%;
        background-color: var(--color1);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        border-radius: 5px;
        font-family: var(--primaryFont);
        margin-bottom: 5px;
        padding: 3px;
        font-size: 1.6ch;
    }

    div.containerButtons{
      width: 100%;
      display: flex;
      gap:5px;
      flex-direction: row;
    }

    .childrenButtons{
      flex-grow: 1;
    }
</style>