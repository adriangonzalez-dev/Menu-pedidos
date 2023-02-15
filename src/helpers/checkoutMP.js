import {useChartStore} from '../store/chart';

const url = `${import.meta.env.VITE_URL_API}/orders/checkout`;

export const checkoutMP = async () =>{
    const chartStore = useChartStore();
    const items = chartStore.chart.map(product=>{
        return {
            id:product._id,
            title:product.name,
            currency_id:'ARS',
            unit_price:product.price, //en esta propiedad ponemos el precio de la unidad
            quantity:product.cant,
        }
    })

    const response = await fetch(url,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(items)
    });
    const data = await response.json();

    return data
}