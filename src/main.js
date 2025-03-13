import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'font-awesome/css/font-awesome.min.css';
import '@fontsource/quicksand';
import "vue3-toastify/dist/index.css";


createApp(App).use(router).mount("#app");
