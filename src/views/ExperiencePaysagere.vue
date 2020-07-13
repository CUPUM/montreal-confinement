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
						<feGaussianBlur in="SourceGraphic" stdDeviation="35" result="blur" />
						<feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 48 -22" result="goo" />
						<feComposite in="SourceGraphic" in2="goo" operator="atop"/>
					</filter>
				</defs>
			</svg>

			<div class="figures">
				<div class="figure" id="globales">
					<div class="inner" id="globales-inner">
						<h4>Figures d'impressions globales</h4>
						<br>
						<p>Discours traversé par le thème de la solitude en ville</p>
					</div>
				</div>
				<div class="figure" id="locales">
					<div class="inner" id="locales-inner">
						<h4>Figures d'expressions locales</h4>
						<br>
						<p>Dominance de regards fragmentaires avec ambiances froides, arides/désertiques, sans vie;<br> Climat hivernal prégnant</p>
					</div>
				</div>
				<div class="linker"></div>
			</div>

			<div class="temps">
				<h4>Temps</h4>
				<p>Pandémie de la COVID-19/confinement/fin d’hiver 2020</p>
				<br>

				<div class="concept" id="formes">
					<h4>Formes</h4>
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
					<h4>Thèmes</h4>
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
					<h4>Intentions</h4>
					<div class="inner" id="intentions-inner">
						<h5>Révélation</h5>
						<p>Sensibilisation aux qualités esthétiques;<br>
						Commentaire sur un décalage entre usage et fonction du cadre morphologique</p>
					</div>
				</div>
			</div>
		</div>

		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
</template>

<script>
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
	/* filter:url('#glue'); */
	position: relative;
	text-align: center;
	box-sizing: border-box;
	width: 100%;
	padding: 40px 125px;
}
#schema-container svg {
	display: none;
}

#schema-container h4 {
	color: rgb(120, 175, 99);
	line-height: 1.5em;
	position: relative;
	display: inline-block;
	margin: 0px auto;
	padding: 5px 0px;
	text-indent: 0px;
	font-weight: 500;
	font-size: 14px;
	text-transform: uppercase;
	letter-spacing: 2px;
	transition: all .3s;
}
.concept h4::after {
	content: '';
	display: inline-block;
	position: absolute;
	width: 30%;
	left: 35%;
	height: 1px;
	background-color: rgb(120, 175, 99);
	bottom: 5px;
	transition: all .75s ease;
}
.concept:hover h4::after {
	left: 0%;
	width: 100%;
}
#schema-container .concept:hover h4 {
	color: rgb(39, 39, 39);
}
#schema-container h5 {
	color: rgb(65, 65, 65);
	position: relative;
	text-indent: 0px;
	font-weight: 600;
	font-size: 14px;
	padding: 5px;
	margin: 0px;
	line-height: 1.25em;
	transition: all .3s;
}
#schema-container .concept:hover h5 {
	color: rgb(120, 175, 99);
}
#schema-container p {
	color: rgb(68, 68, 68);
	position: relative;
	overflow: hidden;
	line-height: 1.25em;
	font-family: 'Spectral', serif;
	font-style: italic;
	text-indent: 0px;
	font-size: 15px;
	font-weight: 500;
	margin: 0px auto;
	padding: 0px;
	transition: all .7s ease;
}
#schema-container .concept p {
	opacity: 0;
	max-height: 0px;
}
#schema-container .concept:hover p {
	margin: 0px auto 12px auto;
	opacity: 1;
	max-height: 60px;
}

.temps {
	position: relative;
	display: inline-block;
	width: 550px;
}
.concept {
	cursor: pointer;
	position: relative;
	margin: 10px auto 30px auto;
	padding: 0px;
}

.inner {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	overflow: hidden;
	padding: 10px;
	position: relative;
	margin: 0px auto;
	background-color: rgb(120, 175, 99);
	box-shadow: 2px 12px 15px -12px rgba(0,0,0,.2);
	transition: all .25s ease;
}
.concept:hover .inner {
	background-color: rgb(255,255,255);
	border-radius: 12px !important;
}

#formes-inner {
	width: 260px;
	height: 260px;
}
.concept:hover #formes-inner {
	width: 100%;
	height: 320px;
}

#themes-inner {
	width: 210px;
	height: 210px;
}
.concept:hover #themes-inner {
	width: 100%;
	height: 320px;
}

#intentions-inner {
	width: 130px;
	height: 130px;
}
.concept:hover #intentions-inner {
	width: 100%;
	height: 160px;
}

.figures {
	filter:url('#glue');
	display: flex;
	flex-direction: row;
	align-items: center;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
}
.figure {
	position: absolute;
	display: inline-block;
}
#globales {
	right: 50%;
	transform: translateX(-200px);
}
#locales {
	left: 50%;
	transform: translateX(200px);
}
.figure .inner {
	padding: 50px;
	box-shadow: none;
	position: relative;
	background-color: rgb(232, 235, 220);
}
#globales-inner {
	height: 300px;
	width: 300px;
}
#locales-inner {
	height: 450px;
	width: 450px;
}

.linker {
	z-index: -1;
	left: 50%;
	width: 500px;
	height: 500px;
	position: absolute;
	background: rgb(221, 221, 218);
	transform: translate(-50%, 20px) rotate(45deg);
	border-radius: 20% 0px 20% 0px;
}

</style>