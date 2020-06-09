import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
	linkExactActiveClass: 'vue-active-link',
	routes
})