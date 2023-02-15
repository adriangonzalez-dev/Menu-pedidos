<template>
  <div>
    <h1>Hola, este es tu pedido!</h1>
    <table class="darkTable">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody v-for="product in chartStore.chart" :key="product.id">
        <tr>
          <td>{{ product.name }}</td>
          <td>{{ product.cant }}</td>
          <td>$ {{ product.price * product.cant }}</td>
        </tr>
      </tbody>
      <tr/>
    </table>
    <p>
      Total: $ {{ chartStore.totalPrice }}
    </p>
    <PaidButton 
    class="widthBtn"
    title="Confirmar"
    theme="confirm"
    route=""
    @click.prevent="sendOrder(chartStore.chart)"/>
  </div>
</template>

<script setup>
  import PaidButton from '../components/Products/PaidButton.vue';
  import {onMounted} from 'vue'
  import {useChartStore} from '../store/chart';
  import OrderService from '../helpers/orderService'
  const chartStore = useChartStore();
  const order = new OrderService();

  onMounted(async()=>{
        chartStore.prevChart();
      })

  const sendOrder = async (chart) => {
    let newOrder = {
      chart,
      subtotal:chartStore.totalPrice,
      paid: false
    }
    await order.createOrder(newOrder);

    const orderExists = order.getOrder();
    
    if(orderExists.value.status == 200){
      $cookies.set('order', orderExists.value.order._id);
      localStorage.removeItem('chart');
      setTimeout(()=>{
        location.href = '/'
      },2000)
    }

  }

</script>

<style scoped>
  .widthBtn{
    width: 100%;
  }
  p{
    font-size: 20px;
  }
  h1,p{
    color: var(--color1);
    font-family: var(--primaryFont);
    text-align: center;
  }
  table.darkTable {
  font-family: var(--primaryFont);
  border: 2px solid var(--color2);
  background-color: var(--color3);
  width: 100%;
  height: 200px;
  text-align: center;
  border-collapse: collapse;
}
table.darkTable td, table.darkTable th {
  border: 1px solid var(--color1);
  padding: 3px 2px;
}
table.darkTable tbody td {
  font-size: 13px;
  color: var(--color1);
}
table.darkTable tr:nth-child(even) {
  background: var(--color1);
}
table.darkTable thead {
  background: var(--color4);
  border-bottom: 3px solid var(--color2);
}
table.darkTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: var(--color1);
  text-align: center;
  border-left: 2px solid var(--color3);
}
table.darkTable thead th:first-child {
  border-left: none;
}
</style>