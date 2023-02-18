import {ref} from 'vue';

const url = `${import.meta.env.VITE_URL_API}/api/products`

export default class PostService {

    constructor(){
        this.products = ref([])
        this.product = ref({})
    }

    getProducts(){
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
    }

}