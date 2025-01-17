import { createApp } from 'vue';
import pinia from '@/store';

import App from './App.vue';
import router from './router/index';
const app = createApp(App);

app.use(router).use(pinia).mount('#app');
