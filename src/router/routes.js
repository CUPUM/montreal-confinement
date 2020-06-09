import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		title: 'Accueil',
		isChapter: false,
		id: "01"
	},
	{
		path: '/about',
		name: 'About',
		component: About,
		title: 'À propos',
		isChapter: false,
		id: "02"
	},
	{
		path: '/timeline',
		name: 'Timeline',
		component: () => import(/* webpackChunkName: "timline" */ '../views/Timeline.vue'), // Pour lazy-loading
		title: 'Ligne du temps',
		isChapter: true,
		id: "03"
	},
	{
		path: '/wordcloud',
		name: 'Wordcloud',
		component: () => import(/* webpackChunkName: "wordcloud" */ '../views/Wordcloud.vue'),
		title: 'Nuage de mots',
		isChapter: true,
		id: "04"
	},
	{
		path: '/photography',
		name: 'Photography',
		component: () => import(/* webpackChunkName: "photography" */ '../views/Photography.vue'),
		title: 'Analyse de photographies',
		isChapter: true,
		id: "05"
	},
	{
		path: '/caracterisation',
		name: 'rubcarac',
		component: () => import(/* webpackChunkName: "photography" */ '../views/RubCarac.vue'),
		title: 'Caractérisation des attributs',
		isChapter: true,
		id: "06"
	}
]

export default routes