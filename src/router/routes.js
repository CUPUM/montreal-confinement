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
		path: '/analyse-de-la-veille-informationnelle',
		name: 'AnalyseVeilleInformationnelle',
		component: () => import(/* webpackChunkName: "AnalyseVeilleInformationnelle" */ '../views/AnalyseVeilleInformationnelle.vue'),
		title: 'Les enjeux du paysage urbain montréalais',
		isSubChapter: false,
		chapter: 3,
		id: "03"
	},
	{
		path: '/analyse-de-la-veille-informationnelle',
		name: 'AnalyseVeilleInformationnelle',
		component: () => import(/* webpackChunkName: "AnalyseVeilleInformationnelle" */ '../views/AnalyseVeilleInformationnelle.vue'),
		title: 'Analyse de la veille informationnelle auprès des médias montréalais',
		chapter: 3,
		isSubChapter: true,
		subChapter: 1,
		id: "04"
	},
	{
		path: '/questionnemments',
		name: 'Questionnements',
		component: () => import(/* webpackChunkName: "Questionnements" */ '../views/Questionnements.vue'),
		title: 'Les questionnements en quête de réponses',
		chapter: 3,
		isSubChapter: true,
		subChapter: 2,
		id: "05"
	},
	{
		path: '/attributs-urbains',
		name: 'AttributsUrbains',
		component: () => import(/* webpackChunkName: "AttributsUrbains" */ '../views/AttributsUrbains.vue'),
		title: 'Les attributs urbains ciblés',
		chapter: 3,
		isSubChapter: true,
		subChapter: 3,
		id: "06"
	},
	{
		path: '/initiatives',
		name: 'Initiatives',
		component: () => import(/* webpackChunkName: "timline" */ '../views/Initiatives.vue'), // Pour lazy-loading
		title: 'Localisation des initiatives sur le territoire montréalais',
		chapter: 3,
		isSubChapter: true,
		subChapter: 4,
		id: "07"
	},
	{
		path: '/humain',
		name: 'Humain',
		component: () => import(/* webpackChunkName: "Humain" */ '../views/Humain.vue'),
		title: "L'humain en qualificatifs",
		chapter: 3,
		isSubChapter: true,
		subChapter: 5,
		id: "08"
	},
	{
		path: '/analyse-de-photographies',
		name: 'AnalysePhoto',
		component: () => import(/* webpackChunkName: "AnalysePhoto" */ '../views/AnalysePhoto.vue'),
		title: 'Regards photographiques sur le paysage urbain',
		chapter: 4,
		isSubChapter: false,
		id: "09"
	},
	{
		path: '/analyse-de-photographies',
		name: 'AnalysePhoto',
		component: () => import(/* webpackChunkName: "AnalysePhoto" */ '../views/AnalysePhoto.vue'),
		title: 'Analyse de photographies',
		chapter: 4,
		isSubChapter: true,
		subChapter: 1,
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