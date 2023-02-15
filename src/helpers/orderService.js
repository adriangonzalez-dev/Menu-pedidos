import Swal from 'sweetalert2';
import {ref} from 'vue';
const url = `${import.meta.env.VITE_URL_API}/orders`

export default class OrderService {

    /* constructor(){
        this.products = ref([])
        this.product = ref({})
    } */

    constructor(){
        this.order = ref(null)
    }

    getOrder(){
        return this.order;
    }

    async createOrder(order){
        try {
            const response = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify(order)
            });
            const data = await response.json();
            this.order.value = await data;
            if(this.order.value.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Tu pedido fue realizado!',
                    text: `Mostrale este código al cajero
                            ${this.order.value.order._id}`,
                  })
            }
        } catch (error) {
            console.log(error)
        }
    }

/*     getProducts(){
        return this.products;
    }

    getProductById(){
        return this.product
    }

    async fetchAll(){
        try {
            const response = await fetch(`${url}/?limit=12`);
            const data = await response.json();
            this.products.value = await data;
        } catch (error) {
            console.log(error)
        }
    }

    async fetchById(id){
        try {
            const response = await fetch(`${url}/${id}`);
            const data = await response.json();
            this.product.value = await data;
        } catch (error) {
            
        }
    } */

}