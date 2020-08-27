import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { store, mutations } from '@/store.js'

Vue.use(VueRouter)

const router = new VueRouter({
	linkExactActiveClass: 'vue-active-link',
	routes
});

router.beforeEach((to, from, next) => {
	if ( to.name=='Accueil' ) {
		switch ( to.params.lang ) {
			case 'en':
				mutations.setLang('en');
				break;
			case 'fr':
				mutations.setLang('fr')
				break;
			default:
				next({path: '/'+store.lang});
				break;
		}
	}
	if (to.hash!='' && to.hash!=null && to.hash!=undefined) {
		store.scrollHash=to.hash
	} else {
		store.scrollHash=null
	}
	next()
});

export default router;