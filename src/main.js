import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/app.scss';
import VueFirestore from 'vue-firestore' 
require('firebase/firestore')
// Vue.use(VueFirestore)
// import {fb} from './firebase'
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('login', require('./views/login.vue').default);
import Swal from 'sweetalert2';

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;
Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})


Vue.config.productionTip = false
import './assets/app.scss';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
