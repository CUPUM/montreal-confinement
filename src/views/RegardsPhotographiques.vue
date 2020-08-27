<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="regards-photographiques" class="view-scroll">
		<PageTitle/>
		<div class="center-col">
			<p>Suite &agrave; la caract&eacute;risation des enjeux associ&eacute;s &agrave; la phase de confinement de la crise de la COVID-19 envers l&rsquo;espace public, il a sembl&eacute; pertinent d&rsquo;analyser la perception de regards photographiques envers l&rsquo;espace public montr&eacute;alais pour interpr&eacute;ter leur cadrage visuel, les sujets, les ambiances capt&eacute;es et leurs &eacute;vocations.</p>
			<p>L&rsquo;objectif de cette caract&eacute;risation photographique est de r&eacute;v&eacute;ler la figure paysag&egrave;re montr&eacute;alaise de l&rsquo;espace public en temps de pand&eacute;mie. Quelles sont les expressions et les impressions de ce paysage urbain{{'\xa0'}}? Ces regards photographiques ont-ils r&eacute;v&eacute;l&eacute; un sens particulier et/ou une identit&eacute; paysag&egrave;re singuli&egrave;re lors de cette phase de confinement{{'\xa0'}}?</p>
			<p>Pour se faire, il a &eacute;t&eacute; convenu de r&eacute;pertorier &agrave; travers diverses plateformes num&eacute;riques (<i>Radio-Canada</i>, <i>La Presse</i>, <i>Le Devoir</i>, et <i>Flickr</i>) un ensemble de photographies prises entre le 13 mars et le 24 avril 2020 par des photographes de presse et professionnels. Cet échantillonnage de <router-link tag="a" class="reference-link" :to="{name: 'Mediagraphie', hash: '#photo-index'}">117 clich&eacute;s photographiques</router-link> issus de 11 photographes a ensuite &eacute;t&eacute; soumis &agrave; une analyse interpr&eacute;tative. Celle-ci a pris appui sur les travaux de recherche r&eacute;alis&eacute;s sur le paysage montr&eacute;alais (Poullaouec-Gonidec & Paquette, 2011). Sur la base de cette assise conceptuelle, la d&eacute;marche a consist&eacute;{{'\xa0'}}:</p>
			<p>
				<ul>
					<li>à analyser les images (composition visuelle, contexte et attributs urbains, présence humaine, ambiance et sentiment, sensation, évocation) à travers les points de vue indépendants de trois experts chercheurs suivi d’une mise en commun des résultats pour présenter qu’un seul regard interprétatif des cadrages photographiques. Cette grille de lecture paysagère présente le contenu des cadrages photographiques (composition et interprétation) par une analyse descriptive et sensible{{'\xa0'}}: <router-link tag="a" class="reference-link" :to="{name: routerDestination(5,1).name}" v-html="routeLabel(5,1)"></router-link></li>
					<li>à tirer profit d’un modèle conceptuel du paysage urbain pour interpréter l’expérience paysagère issue des cadrages photographiques du confinement{{'\xa0'}}: <router-link tag="a" class="reference-link" :to="{name: routerDestination(5,2).name}" v-html="routeLabel(5,2)"></router-link></li>
				</ul>
			</p>

			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'RegardsPhotographiques',
	components: {
		PageTitle,
		ChapterNav
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	},
	data() {
		return {
		}
	},
	methods: {
		routerDestination(chapter,subChapter) {
			return this.$router.options.routes.find(route => parseInt(route.chapter,10) == parseInt(chapter,10) && (subChapter? route.subChapter==subChapter : !route.isSubChapter))
		},
		routeLabel(chapter,subChapter) {
			var routeEl = this.routerDestination(chapter, subChapter);
			var num = chapter + (subChapter? '.'+subChapter : '')
			var title = routeEl.title;
			return num+' - <i>'+title+'</i>'
		}
	}
}
</script>

<style scoped>
#regards-photographiques {
	width: 100%;
	height: 100%
}
</style>