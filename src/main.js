import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import {createPinia} from 'pinia'
import vueCookies from 'vue-cookies'

const pinia = createPinia();
const app = createApp(App);

app.use(vueCookies,{
    expires: '1h',
    path:'/'
});
app.use(pinia);
app.use(router);

app.mount('#app')

/* createApp(App).use(pinia).use(router).mount('#app'); */

