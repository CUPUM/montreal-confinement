import Vue from "vue";

export const store = Vue.observable({
	isNav: false,
	lang: 'fr',
	runningDate: null,
	runningInitiative: null
});

export const mutations = {
	toggleNav() {
		store.isNav = !store.isNav
	},
	closeNav() {
		store.isNav = false
	},

	setLang(language) {
		if (store.lang != 'en' && language.toLowerCase() == ('en' || 'english')) {
			store.lang = 'en'
		} else if (store.lang != 'fr' && language.toLowerCase() == ('fr' || 'francais' || 'français')) {
			store.lang = 'fr'
		}
	},

	setRunningDate(date) {
		store.runningDate = date
	},
	setRunningInitiative(id) {
		store.runningInitiative = id
	}
};