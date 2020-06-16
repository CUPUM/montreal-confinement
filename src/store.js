import Vue from "vue";

export const store = Vue.observable({
	isNav: false,
	lang: 'fr'
});

export const mutations = {
	toggleNav() {
		/* if ( store.isNav.Outer ) {
			store.isNav.Inner = false
		} else {
			store.isNav.Outer = true
			store.isNav.Inner = true
		} */
		store.isNav = !store.isNav
	},
	closeNav() {
		store.isNav = false
	},
	langEn() {
		if (store.lang != 'en') store.lang = 'en'
	},
	langFr() {
		if (store.lang != 'fr') store.lang = 'fr'
	}
};