import "babel-polyfill"
import Vue from "vue";
import App from "./App"
import router from "./router/index"
import "./common/stylus/index.styl"
import VueResource from "vue-resource"
import VueLazyLoad from "vue-lazyload"
import fastclick from "fastclick"
import store from "./store/index"

Vue.use(VueResource);
Vue.use(VueLazyLoad,{
    loading:require('./common/image/default.png') ,
});
fastclick.attach(document.body);
new Vue({
    store,
    router,
    render:h=>h(App)
}).$mount("#app");