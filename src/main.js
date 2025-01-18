import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";
import Toast from 'vue-toastification';
import "element-plus/dist/index.css";
import 'vue-toastification/dist/index.css';
import "./styles/main.scss";

const app = createApp(App);
const pinia = createPinia();


import PageWrapper from "./components/PageWrapper.vue"
import BaseModal from "./components/BaseModal.vue"

app.component("BaseModal", BaseModal);
app.component("PageWrapper", PageWrapper);


app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.use(Toast, {
    // Opções de configuração (opcional)
    position: 'bottom-right',
    timeout: 5000,
    draggable: true,
    closeOnClick: true,
  });
app.mount("#app");