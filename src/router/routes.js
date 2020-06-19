import Accueil from '../views/Accueil.vue'
import Apropos from '../views/Apropos.vue'

const routes = [
	{
		path: '/',
		name: 'Accueil',
		component: Accueil,
		title: 'Accueil',
		isChapter: true,
		chapter: 1,
		id: "01"
	},
	{
		path: '/a-propos',
		name: 'Apropos',
		component: Apropos,
		title: 'À propos',
		isChapter: true,
		chapter: 2,
		id: "02"
	},
	{
		path: '/initiatives',
		name: 'Initiatives',
		component: () => import(/* webpackChunkName: "timline" */ '../views/Initiatives.vue'), // Pour lazy-loading
		title: 'Carte temporelle des initiatives',
		isChapter: true,
		id: "03"
	},
	{
		path: '/humain',
		name: 'Humain',
		component: () => import(/* webpackChunkName: "photography" */ '../views/Humain.vue'),
		title: "L'humain & la ville en COVID-19",
		isChapter: true,
		id: "04"
	},
	{
		path: '/rubrique-attributs',
		name: 'RubriqueAttributs',
		component: () => import(/* webpackChunkName: "photography" */ '../views/RubriqueAttributs.vue'),
		title: 'Attributs urbains dans la presse écrite',
		isChapter: true,
		id: "05"
	},
	{
		path: '/analyse-photo',
		name: 'AnalysePhoto',
		component: () => import(/* webpackChunkName: "wordcloud" */ '../views/AnalysePhoto.vue'),
		title: 'Analyse de photographies',
		isChapter: true,
		id: "06"
	}
]

export default routes