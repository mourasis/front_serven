import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from './plugins/index.js';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

registerPlugins(app);

app.use(pinia);
app.mount('#app');
