<template>
  <button class="button" @click.prevent="chartStore.addToChart(_id)">
    <span>Agregar</span>
  </button>
</template>

<script setup>

    import {useChartStore} from '../../store/chart';
    const chartStore = useChartStore();

    const {_id} = defineProps({
      _id:{
          type:String,
          required:true,
      }
    });

    const getProduct = () => {
      console.log(_id)
    }
</script>

<style scoped>
    .button {
        display: inline-block;
        border-radius: 4px;
        background-color: var(--color4);
        border: none;
        color: var(--color1);
        text-align: center;
        font-size: 20px;
        padding: 5px;
        width: 150px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
    }

.button span {
color: var(--color1);
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>