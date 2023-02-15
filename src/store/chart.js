import {defineStore} from 'pinia'
import Swal from 'sweetalert2'
import fetchService from '../helpers/fetchService'

//state
export const useChartStore = defineStore('chart',{
    //state es un callback que define los valores
    state:()=>{
        return {
            chart:[],
            total:0,
            activeButtons:false
        }
    },
    getters:{
        cantProducts:(state)=>state.chart.length,
        totalPrice: (state)=>{
            let reduce = state.chart.reduce((acumulador, producto) => acumulador + (producto.price * producto.cant), 0);
            return reduce
        },
        activeButton:(state)=>{
            if(state.total == 0){
                state.activeButtons = false
                return state.activeButtons
            }
            state.activeButtons = true
            return state.activeButtons
        }
    },
    actions:{
 
        async addToChart(id){
            let findProduct = this.chart.find(product=>product._id === id);

            if(findProduct){
                findProduct.cant = findProduct.cant + 1;
                localStorage.setItem('chart',JSON.stringify(this.chart))
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado al pedido!',
                    showConfirmButton: false,
                    timer: 1000,
                    background: '#30475E',
                    color: '#F5F5F5'
                  })
                return;
            }

            const service = new fetchService();
            const product = service.getProductById();
        
            await service.fetchById(id);
            
            this.chart.push({
                ...product.value.product,
                cant:1
            });

            localStorage.setItem('chart',JSON.stringify(this.chart))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado al pedido!',
                showConfirmButton: false,
                timer: 1000,
                background: '#30475E',
                color: '#F5F5F5'
              })
        },

        moreCant(id){
            let findProduct = this.chart.find(product=>product._id === id);
            findProduct.cant = findProduct.cant + 1;
            localStorage.setItem('chart',JSON.stringify(this.chart))
        },

        lessCant(id){
            let findProduct = this.chart.find(product=>product._id === id);
            if(findProduct.cant == 0){
                const positionProduct = this.chart.indexOf(findProduct)
                this.chart.splice(positionProduct, 1);
                localStorage.setItem('chart',JSON.stringify(this.chart))
                return;
            }
            findProduct.cant = findProduct.cant - 1;
            localStorage.setItem('chart',JSON.stringify(this.chart))
        },
        prevChart(){
            const prevChart = localStorage.getItem('chart')
            if(prevChart){
                this.chart = JSON.parse(prevChart);
                return;
            }
        }
    }
})

