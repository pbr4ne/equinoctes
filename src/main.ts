import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { piniaPlugin } from './utilities/piniaPlugin';
import { naive } from './utilities/naiveUI';
import { useStore } from './composables/useStore';

const pinia = createPinia();
pinia.use(piniaPlugin);

const app = createApp(App);
app.use(naive);
app.use(pinia);

const store = useStore();
store.listenForEvents();

app.mount('#app');