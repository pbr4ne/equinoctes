import { createApp } from 'vue';
import App from './App.vue';
import { naive } from './utilities/naiveUI';

const app = createApp(App);
app.use(naive);

app.mount('#app');