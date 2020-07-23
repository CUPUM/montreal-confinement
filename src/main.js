import Vue from 'vue'
import App from './App.vue'
import router from './router'

//import routes from './router/routes.js'
// Vue.prototype.$routes = routes // Enregistrement de la propriété globale $routes (accessible par this.$routes) pour éviter répétition de déclarations «import»
// Utiliser this.$router.options.routes plutôt

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

import Vuebar from 'vuebar'
Vue.use(Vuebar);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
