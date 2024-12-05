import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'leaflet/dist/leaflet.css';
import './assets/tailwind.css';
import CountTo from 'vue-count-to';



createApp(App).use(router).mount('#app');
