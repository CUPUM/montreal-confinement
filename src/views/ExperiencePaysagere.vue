<template>
	<div id="experience-paysage" class="view-scroll" @click="detailOpen=null">
		<h1>Interprétation de l’expérience paysagère</h1>
		<div class="center-col">
			<p>Suite à l’interprétation des cadrages photographiques de photographes montréalais lors du confinement, il a été convenu de transposer cette interprétation en schéma pour qualifier la notion de paysage urbain et de saisir sa particularité en période de confinement. Quel est le sens accordé à cette notion qui exprime l’expérience que nous avons de la ville et de ces espaces publics{{'\xa0'}}? Quels sont les éléments (ou attributs) qui prédominent dans l’expérience paysagère des photographes{{'\xa0'}}? En prenant appui sur la schématisation du concept de paysage urbain (Poullaouec-Gonidec & Paquette, 2005, pp. 275-318), quelles sont les <em>formes</em> paysagères, les <em>thèmes</em> soutenus et les <em>intentions</em> évoqués dans l’interprétation des cadrages des photographes{{'\xa0'}}? Plus encore, quelles sont les <em>expressions</em> et <em>impressions</em> paysagères qui se dégagent de ces regards sur la ville en mode confinement{{'\xa0'}}? Et plus largement de quelle manière le confinement a-t-il contribué à l’invention d’un regard sur la ville{{'\xa0'}}?</p>
			<p>Les réponses à ces questionnements s’expriment sous la forme d’un schéma interactif présenté ci-dessous.</p>
		</div>
	
		<div class="schema-container">
			<transition name="detail">
				<div class="detail" v-if="detailOpen=='formes'" :key="'formes'">
					<h4>Formes paysagères</h4>
					<p>Dans l’échantillonnage photographique retenu, les <i>formes paysagères</i> ciblent le <em>métro</em>, la <em>rue</em>, les <em>trottoirs</em>, ou encore les <em>intersections</em> de rue, soit les <em>espaces de mobilité urbaine</em>. Elles ciblent principalement deux <em>lieux identitaires</em> montréalais, soit le centre-ville (quartier des affaires) et le Vieux-Montréal (quartier historique). Ces formes paysagères sont cadrées de manière axiale et relèvent l’<em>intériorité</em> de la ville.</p>
				</div>
				<div class="detail" v-if="detailOpen=='themes'" :key="'themes'">
					<h4>Thèmes soutenus</h4>
					<p>L’interprétation des cadrages photographiques met en valeur le <i>thème</i> de l’<em>expérience esthétique</em> du paysage urbain. Celle-ci s’exprime par l’importance des effets de lumière et de contrejour tout comme les ambiances crues (en noir/blanc et couleur saturée) d’une période d’entre-saison d’une ville nordique (hiver/printemps). L’aspect <em>dramatique</em> de l’expérience est accentué par l’<em>incongruité</em> de certaines situations urbaines (réf.{{'\xa0'}}: centres commerciaux et parcs publics sans présence humaine).</p>
				</div>
				<div class="detail" v-if="detailOpen=='intentions'" :key="'intentions'">
					<h4>Intentions évoquées</h4>
					<p>L’ensemble des contenus photographiques semble révéler une <i>intention</i> claire de la part des photographes, soit celle de <em>révéler et de communiquer les singularités</em> d’un confinement urbain. Les photographies font apparaître les <em>aspects anormaux</em> d’un cadre de vie urbain au quotidien (espaces publics désertés) sur le plan des comportements sociaux (solitude humaine et apparition fugace des usagers). Elles révèlent également une quiétude monotone qui crée une <em>perception méconnue</em> des paysages urbains.</p>
				</div>
				<div class="detail" v-if="detailOpen=='locales'" :key="'locales'">
					<h4>Expressions paysagères</h4>
					<p>Les sujets photographiques cadrent principalement les espaces urbains de <em>proximité</em> soient celles des rues de desserte locale, des façades architecturales et des quartiers. Les regards envers ses paysages de proximité sont généralement <em>fragmentaires</em> (1er et 2e plan visuel de coin de rue, de façades d’habitation, d’enfilade de façades architecturales). Ces cadrages fragmentaires communiquent des ambiances esthétiques froides, arides, désertiques et sans vie. Toutefois, ces figures d’expressions paysagères révèlent les aspects «{{'\xa0'}}<em>sublimants</em>{{'\xa0'}}» de la ville.</p>
				</div>
				<div class="detail" v-if="detailOpen=='globales'" :key="'globales'">
					<h4>Impressions paysagères</h4>
					<p>L’un des traits caractéristiques de cette interprétation photographique est sans nul doute l’impression de <em>solitude urbaine</em> qui constitue la figure prédominante de l’impression paysagère montréalaise. Le regard des photographes ne s’intéresse pas aux perspectives globales du paysage urbain. Les cadrages photographiques ne sont pas englobants. Le paysage à voir n’est pas panoramique ni dominant. Par ce fait, ils démontrent l’importance de l’intériorité urbaine durant le confinement. L’impression de <em>replis</em> en est la figure clé du paysage urbain.</p>
				</div>
			</transition>

			<div class="schema-inner">
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
					<defs>
						<filter id="glue">
							<feGaussianBlur in="SourceGraphic" stdDeviation="50" result="blur" />
							<feComponentTransfer>
								<feFuncA type="discrete" tableValues="0 1" />
							</feComponentTransfer>
							<!-- <feComposite in="SourceGraphic" in2="goo"/> -->
						</filter>
					</defs>
				</svg>
				<div class="figures">
					<div class="linker"></div>
					<div class="figure" id="globales">
						<!-- Placeholder pour goo effect -->
					</div>
					<div class="figure" id="locales">
						<!-- Placeholder pour goo effect -->
					</div>
				</div>
				<div class="figures-content">
					<div class="figure nobg" id="globales-content" @click.stop="detailOpen='globales'">
						<div class="inner" id="globales-inner">
							<div class="highlighter"></div>
							<h4>Figures<br>d'impressions<br>globales</h4>
						</div>
					</div>
					<div class="figure nobg" id="locales-content" @click.stop="detailOpen='locales'">
						<div class="inner" id="locales-inner">
							<div class="highlighter"></div>
							<h4>Figures<br>d'expressions<br>locales</h4>
						</div>
					</div>
				</div>

				<h4>Temps</h4>
				<p class="temps">Pandémie de la COVID-19/confinement/fin d’hiver 2020</p>

				<div class="concept" id="formes" @click.stop="detailOpen='formes'">
					<div class="inner" id="formes-inner">
						<div class="highlighter"></div>
						<h4>Formes</h4>
					</div>
				</div>

				<div class="concept" id="themes" @click.stop="detailOpen='themes'">
					<div class="inner" id="themes-inner">
						<div class="highlighter"></div>
						<h4>Thèmes</h4>
					</div>
				</div>

				<div class="concept" id="intentions" @click.stop="detailOpen='intentions'">
					<div class="inner" id="intentions-inner">
						<div class="highlighter"></div>
						<h4>Intentions</h4>
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
			detailOpen: null
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

.schema-container {
	text-align: left;
	position: relative;
	display: flex;
	flex-direction: row;
	margin: 55px 90px;
	height: 800px;
}
.schema-inner {
	text-align: center;
	box-sizing: border-box;
	padding: 55px 0px;
	display: inline-block;
	flex: 1;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
	background: white;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
}

.schema-container svg {
	position: absolute;
	width: 0px;
	height: 0px;
}

.schema-container h4 {
	color: rgb(85, 85, 85);
	line-height: 1.25em;
	position: relative;
	display: inline-block;
	margin: 0px auto;
	padding: 8px 0px;
	text-indent: 0px;
	font-weight: 600;
	font-size: 12px;
	text-transform: uppercase;
	letter-spacing: 1px;
	transition: all .3s;
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
.detail h4 {
	text-transform: initial;
	font-weight: 600;
	font-size: 22px;
	position: relative;
	width: 450px;
	letter-spacing: 0px;
	color: rgb(56,56,56);
}
.detail p {
	color: rgb(72,72,72);
	position: relative;
	width: 450px;
	font-size: 16px;
}
.detail-enter-active,
.detail-leave-active {
	transition: all .35s cubic-bezier(.6,0,.4,1);
}
.detail-enter,
.detail-leave-to {
	padding: 0px;
	width: 0px;
	margin: 0px;
}

.temps {
	white-space: nowrap;
	font-size: 13px;
	font-weight: 400;
	line-height: 1.5em;
	padding: 0px;
	margin: 0px 0px 55px 0px;
}

.concept {
	display: block;
	cursor: pointer;
	position: relative;
	margin: 0px auto 30px auto;
	padding: 0px;
	border-radius: 50%;
	background-color: rgba(255, 255, 255,.8);
	box-shadow: 1px 12px 20px -15px rgba(0,0,0,.3);
	transition: all .3s ease-in-out;
}
.concept:hover {
	box-shadow: 3px 22px 30px -25px rgba(0,0,0,.5);
}
.concept h4 {
	color: rgb(96,96,96);
}
.inner {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	padding: 20px;
	position: relative;
	margin: 0px;
	width: 100%;
	height: 100%;
}
.concept .highlighter {
	position: absolute;
	width: 35%;
	height: 35%;
	background: rgb(255,255,255);
	border-radius: 50%;
	opacity: 0;
	transition: all .2s cubic-bezier(.6,0,.4,1);
}
.concept:hover .highlighter {
	opacity: 1;
	width: 100%;
	height: 100%;
}
.concept:active .highlighter,
.figure.nobg:active .highlighter {
	opacity: .25;
	width: 110%;
	height: 110%;
	transition: all .05s ease;
}
#formes {
	width: 200px;
	height: 200px;
	animation: concept1 20s linear infinite;
}
#themes {
	width: 160px;
	height: 160px;
	animation: concept2 16s linear infinite;
}
#intentions {
	width: 130px;
	height: 130px;
	animation: concept3 30s linear infinite;
}

.figures, .figures-content {
	display: flex;
	flex-direction: row;
	align-items: center;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
}
.figures {
	filter: url('#glue');
}
.figure {
	cursor: pointer;
	border-radius: 50%;
	position: absolute;
	display: inline-block;
	padding: 15px;
}

#globales {
	background-color: rgb(166, 245, 228);
}
#locales {
	background-color: rgb(240, 240, 171);
}
.figure:hover {
	background-color: red;
}
.figure.nobg {
	background-color: rgba(0,0,0,0);
}
.figure.nobg .highlighter {
	opacity: 0;
	background-color: rgb(255,255,255);
	width: 50%;
	height: 50%;
	border-radius: 50%;
	position: absolute;
	transition: all .2s cubic-bezier(.6,0,.4,1); 
}
.figure.nobg:hover .highlighter {
	opacity: .75;
	width: 100%;
	height: 100%;
}
.figure.nobg:active .highlighter {
	opacity: .5;
	width: 115%;
	height: 115%;
	transition: all .05s
}

#globales, #globales-content {
	width: 220px;
	height: 220px;
	right: 50%;
	transform: translateX(-200px);
	animation: globales 22s linear infinite;
}
#locales, #locales-content {
	width: 260px;
	height: 260px;
	left: 50%;
	transform: translateX(200px);
	animation: locales 38s linear infinite;
}
.figure .inner {
	width: 100%;
	height: 100%;
	box-shadow: none;
	position: relative;
	background-color: rgba(0,0,0,0);
	overflow: visible;
}

.linker {
	top: 142px;
	bottom: 60px;
	left: 50%;
	width: 500px;
	margin: 0px auto;
	display: inline-block;
	position: absolute;
	background: rgb(0,0,0);
	background: linear-gradient(90deg, rgb(166, 245, 228) 0%, rgb(240, 240, 171)100%);
	border-radius: 50%;
	transform: translateX(-50%);
}

@keyframes concept1 {
	0% {transform: rotate(0deg) translate(5px,0px) rotate(0deg);}
	50%	{transform: rotate(180deg) translateX(5px,18px) rotate(-180deg);}
	100% {transform: rotate(360deg) translate(5px,0px) rotate(-360deg);}
}

@keyframes concept2 {
	0% {transform: rotate(0deg) translate(2px,5px) rotate(0deg);}
	50%	{transform: rotate(-180deg) translateX(5px,0px) rotate(180deg);}
	100% {transform: rotate(-360deg) translate(2px,5px) rotate(360deg);}
}

@keyframes concept3 {
	0% {transform: rotate(0deg) translate(12px,0px) rotate(0deg);}
	50%	{transform: rotate(180deg) translateX(5px,-12px) rotate(-180deg);}
	100% {transform: rotate(360deg) translate(12px,0px) rotate(-360deg);}
}

@keyframes locales {
	0% {transform: translate(150px,30px) rotate(0deg) translateX(12px) rotate(0deg);}
	50% {transform: translate(190px,30px) rotate(180deg) translateX(30px) rotate(-180deg);}
	100% {transform: translate(150px,30px) rotate(360deg) translateX(12px) rotate(-360deg);}
}

@keyframes globales {
	0% {transform: translate(-200px,30px) rotate(0deg) translateX(25px) rotate(0deg);}
	50% {transform: translate(-160px,30px) rotate(-180deg) translateX(5px) rotate(180deg);}
	100% {transform: translate(-200px,30px) rotate(-360deg) translateX(25px) rotate(360deg);}
}
</style>