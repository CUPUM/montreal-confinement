import Vue from "vue";

export const store = Vue.observable({
	isNav: false
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
	}
};