<template>
    <div class="container">
        <div class="children">
            <p>{{ name }}</p>
        </div>
        <div class="children">
            <p>${{ price }}</p>
        </div>
        <div class="children">
            <img :src="img" alt="">
        </div>
        <div class="containerButtons children">
            <button @click="chartStore.moreCant(_id)">+</button>
            <p>{{ cant }}</p>
            <button @click="chartStore.lessCant(_id)">-</button>
        </div>

    </div>

  </template>
  
  <script setup>
    import {useChartStore} from '../../store/chart';
    const chartStore = useChartStore();
    
    const {_id, name,description,img,price} = defineProps({
            _id:{
                type:String,
                required:true,
            },
            name:{
                type:String,
                required:true,
                default:'Producto sin nombre'
            },
            img:{
                type:String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            cant: {
                type: Number,
                required: true
            },
            
        });

  </script>
  
  <style scoped>
    div.container{
        width: 80%;
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
    div.container div p{
        width: fit-content;
    }
    div.container div img{
        width: 50px;
    }

    div.containerButtons{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }

    div.containerButtons button{
        width: 20px;
        font-family: var(--primaryFont);
    }

    div.children{
        width:25%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-overflow: ellipsis;
    }
  </style>