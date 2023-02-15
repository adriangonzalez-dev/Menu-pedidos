<template>
  <header>
    <div>
      <img src="../assets/logo.png" alt="">
    </div>
    <nav class="contain">
        <router-link to="/">Home</router-link> |
        <router-link to="/paid">Pedido</router-link>
        <div>
          <p>{{ chartStore.cantProducts }}</p>
        </div>
    </nav>
    <nav class="categories">
      <router-link to="/paid">Pizzas</router-link> |
      <router-link to="/paid">Empanadas</router-link> |
      <router-link to="/paid">Postres</router-link> |
      <router-link to="/paid">Bebidas</router-link>
    </nav>
  </header>
</template>

<script setup>
  import {useChartStore} from '../store/chart';
  const chartStore = useChartStore();
</script>

<style scoped>
  header{
    width:100%;
    height: fit-content;
    display:flex;
    padding: 5px;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    font-family: var(--primaryFont);
    color: var(--color1);

  }
  header div{
    width:100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  header div img{
    width:50%;
    max-width: 100px;
    border-radius: 50%;
  }

  header nav{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }

  .router-link-active{
    color: var(--color2)
  }

  nav.categories{
    background-color: var(--color3);
  }

  nav.contain{
    position:relative;
    width: 200px;
  }

  nav.contain div{
    color:var(--color1);
    position: absolute;
    background-color: var(--color2);
    width:20px;
    height: 20px;
    right:25px;
  }

  nav.contain div p{
    color:var(--color1)
  }
</style>