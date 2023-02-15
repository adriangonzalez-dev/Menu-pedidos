<template>
  <button 
  :disabled="chartStore.activeButtons" 
  :class="classType"
  @click="navigateToPay">{{ title }}</button>
</template>

<script setup>
import {ref} from 'vue'
import {useChartStore} from '../../store/chart';
import router from '../../routes';
const chartStore = useChartStore();

const {title, theme, route} = defineProps({
            title:{
                type:String,
                required:true,
            },
            theme:{
                type:String,
                required:true,
            },
            route:{
                type:String,
            }
        });

let classType = ref(`btn ${theme}`)


const navigateToPay = () => {
  router.push(route)
}

</script>
    
<style scoped>
  .btn {
  border: 2px solid black;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  font-family: var(--primaryFont);
}

/* Green */
.success {
  border-color:#85bb65;
  color: #85bb65;
}

.success:hover {
  background-color: #85bb65;
  color: white;
}

.mp {
  border-color:#00B1EA;
  color:#00B1EA;
}

.mp:hover {
  background-color: #00B1EA;
  color: white;
}

.confirm {
  border-color: var(--color3);
  color: var(--color3)
}

.confirm:hover {
  background: var(--color2);
  color: var(--color1);
}
</style>