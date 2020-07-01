import Accueil from '../views/Accueil.vue'
import Apropos from '../views/Apropos.vue'

const routes = [
	{
		path: '/',
		name: 'Accueil',
		component: Accueil,
		title: 'Accueil',
		isSubChapter: false,
		chapter: 1,
		id: "01"
	},
	{
		path: '/a-propos',
		name: 'Apropos',
		component: Apropos,
		title: 'À propos',
		isSubChapter: false,
		chapter: 2,
		id: "02"
	},
	{
		path: '/enjeux-paysage-urbain-montrealais',
		name: 'EnjeuxPaysageUrbain',
		component: () => import(/* webpackChunkName: "EnjeuxPaysageUrbain" */ '../views/EnjeuxPaysageUrbain.vue'),
		title: 'Les enjeux du paysage urbain montréalais',
		isSubChapter: false,
		chapter: 3,
		id: "03"
	},
	{
		path: '/questionnemments',
		name: 'Questionnements',
		component: () => import(/* webpackChunkName: "Questionnements" */ '../views/Questionnements.vue'),
		title: 'Questionnements en quête de réponses',
		chapter: 3,
		isSubChapter: true,
		subChapter: 1,
		id: "04"
	},
	{
		path: '/attributs-urbains',
		name: 'AttributsUrbains',
		component: () => import(/* webpackChunkName: "AttributsUrbains" */ '../views/AttributsUrbains.vue'),
		title: 'Les attributs urbains ciblés',
		chapter: 3,
		isSubChapter: true,
		subChapter: 2,
		id: "05"
	},
	{
		path: '/initiatives',
		name: 'Initiatives',
		component: () => import(/* webpackChunkName: "Initiatives" */ '../views/Initiatives.vue'), // Pour lazy-loading
		title: 'Territoire montréalais en initiatives',
		chapter: 3,
		isSubChapter: true,
		subChapter: 3,
		id: "06"
	},
	{
		path: '/humain',
		name: 'Humain',
		component: () => import(/* webpackChunkName: "Humain" */ '../views/Humain.vue'),
		title: "L'humain en qualificatifs",
		chapter: 3,
		isSubChapter: true,
		subChapter: 4,
		id: "07"
	},
	{
		path: '/regards-photographiques',
		name: 'RegardsPhotographiques',
		component: () => import(/* webpackChunkName: "RegardsPhotographiques" */ '../views/RegardsPhotographiques.vue'),
		title: 'Regards photographiques sur le paysage urbain',
		chapter: 4,
		isSubChapter: false,
		id: "08"
	},
	{
		path: '/cadrage-regards',
		name: 'CadrageRegards',
		component: () => import(/* webpackChunkName: "CadrageRegards" */ '../views/CadrageRegards.vue'),
		title: 'Analyse de photographies',
		chapter: 4,
		isSubChapter: true,
		subChapter: 1,
		id: "09"
	},
	{
		path: '/identité-conceptuelle',
		name: 'IdentiteConceptuelle',
		component: () => import(/* webpackChunkName: "IdentiteConceptuelle" */ '../views/IdentiteConceptuelle.vue'),
		title: 'Identité conceptuelle du paysage montréalais',
		chapter: 4,
		isSubChapter: true,
		subChapter: 2,
		id: "10"
	},
	{
		path: '/perspectives',
		name: 'Perspectives',
		component: () => import(/* webpackChunkName: "Perspectives" */ '../views/Perspectives.vue'),
		title: 'Perspectives',
		chapter: 5,
		isSubChapter: false,
		id: "11"
	},
	{
		path: '/bibliographie',
		name: 'Bibliographie',
		component: () => import(/* webpackChunkName: "Bibliographie" */ '../views/Bibliographie.vue'),
		title: 'Bibliographie',
		chapter: 6,
		isSubChapter: false,
		id: "12"
	},
]

export default routes