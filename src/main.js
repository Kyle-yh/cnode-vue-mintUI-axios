// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import store from './store/store'
import 'mint-ui/lib/style.css';
import '../static/style.css';
Vue.use(Mint);

Vue.config.productionTip = false

import './js/filter';
import './js/vue-edit'


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
