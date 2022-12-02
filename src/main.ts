import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

// element plus完整引入
// import ElementPlus from 'element-plus'  //引入element-plus库
import 'element-plus/dist/index.css'  //引入element-plus样式

// import "~/styles/element/index.scss"

// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import 'uno.css';

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

const app = createApp(App);

// app.use(ElementPlus);

app.use(router);

app.mount("#app");
