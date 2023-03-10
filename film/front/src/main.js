import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import http from "axios";
import 'bootstrap'

import './assets/main.css'

export default http.create({
    baseURL: "http://localhost:8081",
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
})

const app = createApp(App)

app.use(router)

app.mount('#app')
