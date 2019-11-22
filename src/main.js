// Import Vue
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import VueCordova from 'vue-cordova'
import store from './vuex/storage.js'
import VueKonva from 'vue-konva'
import VueLodash from 'vue-lodash'

Vue.use(VueKonva)
Vue.use(VueCordova)
Vue.use(Vuetify, {
  iconfont: 'md'
})


Vue.config.productionTip = false;

// Import App Custom Styles
//import AppStyles from './assets/sass/main.scss'

/* eslint-disable no-new */
Vue.cordova.on('deviceready', () => {
  console.log('Cordova : device is ready  MAIN JS !');
  screen.orientation.lock('landscape-primary');
});
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
