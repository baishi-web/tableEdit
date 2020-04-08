import Vue from "vue";
import App from "./App.vue";
// 引入重置样式表
import "./assets/reset.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
