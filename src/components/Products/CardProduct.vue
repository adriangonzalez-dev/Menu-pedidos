<template>
  <div class="container">
    <div class="info">
        <h2>{{ name }}</h2>
        <p class="description">{{ description }}</p>
        <p class="price">{{ `$ ${price}` }}</p>
    </div>
    <img :src="img" alt="">
    <AddButton :_id="_id" />
  </div>
</template>

<script setup>
    import AddButton from './AddButton.vue';

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
            description:{
                type:String,
                required:false
            },
            img:{
                type:String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        });

</script>

<style scoped>
    div.container{
        background-color: var(--color1);
        border: 5px solid var(--color2);
        width: 250px;
        min-height: 260px;
        height: fit-content;
        border-radius: 3px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--primaryFont);
        text-align: center;
        color:var(--color4);
        flex-direction: column;
    }

    div.info{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    div.info h2{
       font-size: 16px;
       width: 100%;
    }

    div.container img{
        width: 40%;
        border-radius: 50%;
    }
    div.info p.description{
        font-size: 12px;
    }
</style>