import { createRouter, createWebHistory } from 'vue-router';
import ConfirmPaidCash from '../views/ConfirmPaidCash.vue';
import ConfirmPaidMP from '../views/ConfirmPaidMP.vue';
import PaidView from '../views/PaidView.vue';
import ListProducts from '../views/ListProducts.vue';
import {useChartStore} from '../store/chart';


const routes = [
    {
        path:'/',
        name:'home',
        component: ListProducts,
        meta: {
            requirePrice: false
        }
    },
    {
        path:'/paid',
        name:'Paid',
        component: PaidView,
        meta: {
            requirePrice: false
        }
    },
    {
        path:'/confirm',
        name:'services',
        component: ConfirmPaidCash,
        meta: {
            requirePrice: true
        }
    },
    {
        path:'/confirm-mp',
        name:'services-mp',
        component: ConfirmPaidMP,
        meta: {
            requirePrice: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/* router.beforeEach((to, from, next) => {
    const chartStore = useChartStore();

    const access = chartStore.total > 0;
    const needAccess = to.meta.requirePrice;
  
    if (needAccess && !access) {
        next("/");
    } else {
        next();
    }
  });
 */
export default router;