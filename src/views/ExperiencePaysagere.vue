<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="experience-paysage" class="view-scroll" @click="detailOpen=null">
		<h1>Interprétation de l’expérience paysagère</h1>
		<div class="center-col">
			<p>Suite à l’interprétation des cadrages photographiques de photographes montréalais lors du confinement, il a été convenu de transposer cette interprétation en schéma pour qualifier la notion de paysage urbain et de saisir sa particularité en période de confinement. Quel est le sens accordé à cette notion qui exprime l’expérience que nous avons de la ville et de ces espaces publics{{'\xa0'}}? Quels sont les éléments (ou attributs) qui prédominent dans l’expérience paysagère des photographes{{'\xa0'}}? En prenant appui sur la schématisation du concept de paysage urbain (Poullaouec-Gonidec & Paquette, 2005, pp. 275-318), quelles sont les <em>formes</em> paysagères, les <em>thèmes</em> soutenus et les <em>intentions</em> évoqués dans l’interprétation des cadrages des photographes{{'\xa0'}}? Plus encore, quelles sont les <em>expressions</em> et <em>impressions</em> paysagères qui se dégagent de ces regards sur la ville en mode confinement{{'\xa0'}}? Et plus largement de quelle manière le confinement a-t-il contribué à l’invention d’un regard sur la ville{{'\xa0'}}?</p>
			<p>Les réponses à ces questionnements s’expriment sous la forme d’un schéma interactif présenté ci-dessous.</p>
		</div>
	
		<div class="schema-container">
			<transition name="detail">
				<div class="detail" v-if="detailOpen=='Formes'" :key="'Formes'">
					<h5>Formes paysagères</h5>
					<p>Dans l’échantillonnage photographique retenu, les <i>formes paysagères</i> ciblent le <em>métro</em>, la <em>rue</em>, les <em>trottoirs</em>, ou encore les <em>intersections</em> de rue, soit les <em>espaces de mobilité urbaine</em>. Elles ciblent principalement deux <em>lieux identitaires</em> montréalais, soit le centre-ville (quartier des affaires) et le Vieux-Montréal (quartier historique). Ces formes paysagères sont cadrées de manière axiale et relèvent l’<em>intériorité</em> de la ville.</p>
				</div>
				<div class="detail" v-if="detailOpen=='Thèmes'" :key="'Thèmes'">
					<h5>Thèmes soutenus</h5>
					<p>L’interprétation des cadrages photographiques met en valeur le <i>thème</i> de l’<em>expérience esthétique</em> du paysage urbain. Celle-ci s’exprime par l’importance des effets de lumière et de contrejour tout comme les ambiances crues (en noir/blanc et couleur saturée) d’une période d’entre-saison d’une ville nordique (hiver/printemps). L’aspect <em>dramatique</em> de l’expérience est accentué par l’<em>incongruité</em> de certaines situations urbaines (réf.{{'\xa0'}}: centres commerciaux et parcs publics sans présence humaine).</p>
				</div>
				<div class="detail" v-if="detailOpen=='Intentions'" :key="'Intentions'">
					<h5>Intentions évoquées</h5>
					<p>L’ensemble des contenus photographiques semble révéler une <i>intention</i> claire de la part des photographes, soit celle de <em>révéler et de communiquer les singularités</em> d’un confinement urbain. Les photographies font apparaître les <em>aspects anormaux</em> d’un cadre de vie urbain au quotidien (espaces publics désertés) sur le plan des comportements sociaux (solitude humaine et apparition fugace des usagers). Elles révèlent également une quiétude monotone qui crée une <em>perception méconnue</em> des paysages urbains.</p>
				</div>
				<div class="detail" v-if="detailOpen=='Expressions paysagères'" :key="'Expressions paysagères'">
					<h5>Expressions paysagères</h5>
					<p>Les sujets photographiques cadrent principalement les espaces urbains de <em>proximité</em> soient celles des rues de desserte locale, des façades architecturales et des quartiers. Les regards envers ses paysages de proximité sont généralement <em>fragmentaires</em> (1er et 2e plan visuel de coin de rue, de façades d’habitation, d’enfilade de façades architecturales). Ces cadrages fragmentaires communiquent des ambiances esthétiques froides, arides, désertiques et sans vie. Toutefois, ces figures d’expressions paysagères révèlent les aspects «{{'\xa0'}}<em>sublimants</em>{{'\xa0'}}» de la ville.</p>
				</div>
				<div class="detail" v-if="detailOpen=='Impressions paysagères'" :key="'Impressions paysagères'">
					<h5>Impressions paysagères</h5>
					<p>L’un des traits caractéristiques de cette interprétation photographique est sans nul doute l’impression de <em>solitude urbaine</em> qui constitue la figure prédominante de l’impression paysagère montréalaise. Le regard des photographes ne s’intéresse pas aux perspectives globales du paysage urbain. Les cadrages photographiques ne sont pas englobants. Le paysage à voir n’est pas panoramique ni dominant. Par ce fait, ils démontrent l’importance de l’intériorité urbaine durant le confinement. L’impression de <em>replis</em> en est la figure clé du paysage urbain.</p>
				</div>
			</transition>

			<div class="schema-inner">
				<h4>Identité conceptuelle des paysages urbains montréalais</h4>
				<div class="svg-outer">
					<SchemaConceptuel :chartID="'testDiagram'" v-on:opentab="respondTab"/>
				</div>
			</div>
		</div>

		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'
import SchemaConceptuel from "@/components/SchemaConceptuel"

export default {
	name: 'ExperiencePaysagere',
	components: {
		ChapterNav,
		SchemaConceptuel
	},
	data() {
		return {
			detailOpen: null
		}
	},
	computed: {
	},
	methods: {
		respondTab(e) {
			this.detailOpen = e
			console.log(this.detailOpen)
		}
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#experience-paysage {
	width: 100%;
	height: 100%;
}

.schema-container {
	text-align: left;
	position: relative;
	display: flex;
	flex-direction: row;
	margin: 55px 90px;
	height: 800px;
}
.schema-inner {
	box-sizing: border-box;
	padding: 0px;
	display: inline-flex;
	flex-direction: column;
	flex: 1;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
	background: white;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
}

.svg-outer {
	display: block;
	position: relative;
	flex: 1;
}

.schema-container h4 {
	position: relative;
	display: inline-block;
	user-select: none;
	font-weight: 600;
	font-size: 12px;
	letter-spacing: 3px;
	line-height: 1em;
	margin: 10px;
	padding: 10px;
	color: rgb(175, 175, 175);
	text-align: center;
	text-transform: uppercase;
	border-bottom: 1px solid rgba(175, 175, 175, 0.3);
}

.detail {
	z-index: 1;
	overflow: hidden;
	text-align: left;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0px 12px 0px 0px;
	padding: 50px 50px;
	height: 100%;
	position: relative;
	left: 0px;
	top: 0px;
	width: 550px;
	background: white;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
}
.detail h5 {
	text-transform: initial;
	font-weight: 600;
	font-size: 22px;
	position: relative;
	width: 425px;
	letter-spacing: 0px;
	color: rgb(56,56,56);
	margin: 0px 0px 1.5em 0px;
}
.detail p {
	color: rgb(72,72,72);
	position: relative;
	width: 420px;
	font-size: 16px;
	margin: 0px;
}
.detail-enter-active,
.detail-leave-active {
	transition: all .3s cubic-bezier(.65,0,.35,1);
}
.detail-enter,
.detail-leave-to {
	padding: 0px;
	width: 0px;
	margin: 0px;
}
</style>