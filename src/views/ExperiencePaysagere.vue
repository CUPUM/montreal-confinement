<template>
	<div id="experience-paysage" class="view-scroll">
		<h1>Interprétation de l’expérience paysagère</h1>
		<div class="center-col">
			<p>Suite à l’interprétation des cadrages photographiques de photographes montréalais lors du confinement, il a été convenu de transposer cette interprétation en schéma pour qualifier la notion de paysage urbain et de saisir sa particularité en période de confinement. Quel est le sens accordé à cette notion qui exprime l’expérience que nous avons de la ville et de ces espaces publics{{'\xa0'}}? Quels sont les éléments (ou attributs) qui prédominent dans l’expérience paysagère des photographes{{'\xa0'}}? En prenant appui sur la schématisation du concept de paysage urbain (Poullaouec-Gonidec & Paquette, 2005, pp. 275-318), quelles sont les <em>formes</em> paysagères, les <em>thèmes</em> soutenus et les <em>intentions</em> évoqués dans l’interprétation des cadrages des photographes{{'\xa0'}}? Plus encore, quelles sont les <em>expressions</em> et <em>impressions</em> paysagères qui se dégagent de ces regards sur la ville en mode confinement{{'\xa0'}}? Et plus largement de quelle manière le confinement a-t-il contribué à l’invention d’un regard sur la ville{{'\xa0'}}?</p>
			<p>Les réponses à ces questionnements s’expriment sous la forme d’un schéma interactif présenté ci-dessous.</p>
		</div>
	
		<div id="schema-container">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="glue">
						<feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
						<feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
						<feComposite in="SourceGraphic" in2="goo" operator="atop"/>
					</filter>
				</defs>
			</svg>

			<div class="temps">
				<div class="head">
					<h4>Temps</h4>
				</div>
				<p>Pandémie de la COVID-19/confinement/fin d’hiver 2020</p>
				
				<div class="concept" id="formes">
					<div class="head">
						<h4>Formes</h4>
					</div>
					<div class="inner" id="formes-inner">
						<h5>Perte de vue sur la ville</h5>
						<p>Fermeture rapprochée et totale</p>
						<h5>Espace de réseaux</h5>
						<p>Métro/rues/trottoirs/intersections</p>
						<h5>Espace d’expériences urbaines</h5>
						<p>Dominance des vues axiales;<br>
						Piétons seuls en mouvement et aucune circulation automobile</p>
						<h5>Territoires identitaires inégaux</h5>
						<p>Saillance principalement allouée au Centre-ville et au Vieux-Montréal</p>
					</div>
				</div>

				<div class="concept" id="themes">
					<div class="head">
						<h4>Thèmes</h4>
					</div>
					<div class="inner" id="themes-inner">
						<h5>Hygiénisme</h5>
						<p>Recherche quasi-obsessive du soleil,<br>
						mais environnements avec luminosité parfois pauvre;<br>
						Végétation rare et décharnée</p>
						<h5>Problème d’attractivité</h5>
						<p>Centres économiques et touristiques vides</p>
						<h5>Cadre de vie à la dérive</h5>
						<p>Solitude;<br>Froideur (inconfort);<br>
						Tension anormalité—normalité</p>
					</div>
				</div>

				<div class="concept" id="intentions">
					<div class="head">
						<h4>Intentions</h4>
					</div>
					<div class="inner" id="intentions-inner">
						<h5>Révélation</h5>
						<p>Sensibilisation aux qualités esthétiques;<br>
						Commentaire sur un décalage entre usage et fonction du cadre morphologique</p>
					</div>
				</div>
			</div>

			<div class="figure" id="locales">
				<div class="head fig">
					<h4>Figures d'impressions globales</h4>
				</div>
				<div class="inner" id="locales-inner">
				</div>
			</div>

			<div class="figure" id="globales">
				<div class="head fig">
					<h4>Figures d'expressions locales</h4>
				</div>
				<div class="inner" id="globales-inner">
					<p>Dominance de regards fragmentaires avec ambiances froides, arides/désertiques, sans vie;<br> Climat hivernal prégnant</p>
				</div>
			</div>
		</div>

		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
</template>

<script>
//import * as d3 from 'd3'
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'ExperiencePaysagere',
	components: {
		ChapterNav
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
	},
}
</script>

<style scoped>
#experience-paysage {
	width: 100%;
	height: 100%;
}

#schema-container {
	filter:url('#glue');
	position: relative;
	text-align: center;
	box-sizing: border-box;
	width: 100%;
	padding: 20px 125px;
}
#schema-container svg {
	display: none;
}

#schema-container .head {
	position: absolute;
	left: 0%;
	top: 0px;
	transform: translate(-50%,-50%);
	display: flex;
	align-items: center;
	text-align: center;
	background-color: rgb(120, 175, 99);
	width: 120px;
	height: 120px;
	border-radius: 50%;
}
#schema-container .head.fig {
	width: 150px;
	height: 150px;
}
#schema-container h4 {
	line-height: 1.5em;
	position: relative;
	display: inline-block;
	margin: 0px auto;
	padding: 0px;
	text-indent: 0px;
	font-weight: 500;
	color: white;
	font-size: 14px;
	text-transform: uppercase;
	letter-spacing: 2px;
}
#schema-container h5 {
	color: rgb(245,245,245);
	position: relative;
	z-index: 1;
	text-indent: 0px;
	font-weight: 600;
	font-size: 14px;
	padding: 5px;
	margin: 0px;
	line-height: 1.25em;
	transition: all .5s;
}
#schema-container .concept:hover h5 {
	color: rgb(56, 56, 56);
}
#schema-container p {
	opacity: 0;
	color: rgb(68, 68, 68);
	position: relative;
	z-index: 1;
	display: block;
	max-height: 0px;
	overflow: hidden;
	line-height: 1.25em;
	font-family: 'Spectral', serif;
	font-style: italic;
	text-indent: 0px;
	font-size: 15px;
	font-weight: 500;
	margin: 0px auto 12px auto;
	padding: 0px;
	transition: all .5s ease;
}
#schema-container .concept:hover p {
	opacity: 1;
	max-height: 60px;
}

.temps {
	position: relative;
	display: inline-block;
	width: 500px;
}

.concept {
	cursor: pointer;
	display: flex;
	align-items: center;
	position: relative;
	background-color: rgb(120, 175, 99);
	margin: 100px auto;
	padding: 0px;
	border-radius: 10px;
	transition: all .5s ease;
}
.concept:hover {
	background-color: rgb(255, 255, 255);
}
.inner {
	padding: 25px 35px;
	position: relative;
	margin: 0px auto;
}

#formes {
}
#formes-inner {
}

#themes {
}
#themes-inner {
}

#intentions {
}
#intentions-inner {
}
</style>