import Accueil from '../views/Accueil.vue'
import MiseEnContexte from '../views/MiseEnContexte.vue'

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
		path: '/mise-en-contexte',
		name: 'MiseEnContexte',
		component: MiseEnContexte,
		title: 'Mise en contexte',
		isSubChapter: false,
		chapter: 2,
		id: "02"
	},
	{
		path: '/enjeux-paysage-urbain-montrealais',
		name: 'EnjeuxPaysageUrbain',
		component: () => import(/* webpackChunkName: "EnjeuxPaysageUrbain" */ '../views/EnjeuxPaysageUrbain.vue'),
		title: 'Enjeux du paysage urbain montréalais',
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
		title: "L’humain en qualificatifs",
		chapter: 3,
		isSubChapter: true,
		subChapter: 4,
		id: "07"
	},
	{
		path: '/regards-photographiques-paysage-urbain',
		name: 'RegardsPhotographiques',
		component: () => import(/* webpackChunkName: "RegardsPhotographiques" */ '../views/RegardsPhotographiques.vue'),
		title: 'Regards photographiques sur le paysage urbain',
		chapter: 4,
		isSubChapter: false,
		id: "08"
	},
	{
		path: '/lecture-regards-photographiques',
		name: 'LectureRegards',
		component: () => import(/* webpackChunkName: "LectureRegards" */ '../views/LectureRegards.vue'),
		title: 'Lecture paysagère des regards photographiques',
		chapter: 4,
		isSubChapter: true,
		subChapter: 1,
		id: "09"
	},
	{
		path: '/experience-paysagere',
		name: 'ExperiencePaysagere',
		component: () => import(/* webpackChunkName: "ExperiencePaysagere" */ '../views/ExperiencePaysagere.vue'),
		title: 'Interprétation de l’expérience paysagère',
		chapter: 4,
		isSubChapter: true,
		subChapter: 2,
		id: "10"
	},
	{
		path: '/elements-conclusifs',
		name: 'ElementsConclusifs',
		component: () => import(/* webpackChunkName: "ElementsConclusifs" */ '../views/ElementsConclusifs.vue'),
		title: 'Éléments conclusifs',
		chapter: 5,
		isSubChapter: false,
		id: "11"
	},
	{
		path: '/mediagraphie',
		name: 'Mediagraphie',
		component: () => import(/* webpackChunkName: "Mediagraphie" */ '../views/Mediagraphie.vue'),
		title: 'Médiagraphie',
		chapter: 6,
		isSubChapter: false,
		id: "12"
	},
]

export default routes