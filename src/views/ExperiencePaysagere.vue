<template>
	<div id="experience-paysage" class="view-scroll" @click="detailOpen=null">
		<h1>Interprétation de l’expérience paysagère</h1>
		<div class="center-col">
			<p>Suite à l’interprétation des cadrages photographiques de photographes montréalais lors du confinement, il a été convenu de transposer cette interprétation en schéma pour qualifier la notion de paysage urbain et de saisir sa particularité en période de confinement. Quel est le sens accordé à cette notion qui exprime l’expérience que nous avons de la ville et de ces espaces publics{{'\xa0'}}? Quels sont les éléments (ou attributs) qui prédominent dans l’expérience paysagère des photographes{{'\xa0'}}? En prenant appui sur la schématisation du concept de paysage urbain (Poullaouec-Gonidec & Paquette, 2005, pp. 275-318), quelles sont les <em>formes</em> paysagères, les <em>thèmes</em> soutenus et les <em>intentions</em> évoqués dans l’interprétation des cadrages des photographes{{'\xa0'}}? Plus encore, quelles sont les <em>expressions</em> et <em>impressions</em> paysagères qui se dégagent de ces regards sur la ville en mode confinement{{'\xa0'}}? Et plus largement de quelle manière le confinement a-t-il contribué à l’invention d’un regard sur la ville{{'\xa0'}}?</p>
			<p>Les réponses à ces questionnements s’expriment sous la forme d’un schéma interactif présenté ci-dessous.</p>
		</div>
	
		<div class="schema-container">
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
						<h4>Figures d'impressions globales</h4>
						<br>
						<p>Discours traversé par le thème de la solitude en ville</p>
					</div>
				</div>
				<div class="figure nobg" id="locales-content" @click.stop="detailOpen='locales'">
					<div class="inner" id="locales-inner">
						<h4>Figures d'expressions locales</h4>
						<br>
						<p>Dominance de regards fragmentaires avec ambiances froides, arides/désertiques, sans vie;<br> Climat hivernal prégnant</p>
					</div>
				</div>
			</div>

			<div class="temps">
				<h4>Temps</h4>
				<p class="temps-inner">Pandémie de la COVID-19/confinement/fin d’hiver 2020</p>

				<div class="concept" id="formes" @click.stop="detailOpen='formes'">
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

				<div class="concept" id="themes" @click.stop="detailOpen='themes'">
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

				<div class="concept" id="intentions" @click.stop="detailOpen='intentions'">
					<h4>Intentions</h4>
					<div class="inner" id="intentions-inner">
						<h5>Révélation</h5>
						<p>Sensibilisation aux qualités esthétiques;<br>
						Commentaire sur un décalage entre usage et<br> fonction du cadre morphologique</p>
					</div>
				</div>
			</div>
			
			<transition name="detail">
				<div class="detail" v-if="detailOpen=='formes'" :key="'formes'">
					<h4>Formes paysagères</h4>
					<p>Dans l’échantillonnage photographique retenu, les formes paysagères ciblent le métro, la rue, les trottoirs, ou encore les intersections de rue, soit les espaces de mobilité urbaine. Elles ciblent principalement deux lieux identitaires montréalais, soit le centre-ville (quartier des affaires) et le Vieux-Montréal (quartier historique). Ces formes paysagères sont cadrées de manière axiale et relèvent l’intériorité de la ville.</p>
				</div>
				<div class="detail" v-if="detailOpen=='themes'" :key="'themes'">
					<h4>Thèmes soutenus</h4>
					<p>L’interprétation des cadrages photographiques met en valeur le thème de l’expérience esthétique du paysage urbain. Celle-ci s’exprime par l’importance des effets de lumière et de contrejour tout comme les ambiances crues (en noir/blanc et couleur saturée) d’une période d’entre-saison d’une ville nordique (hiver/printemps). L’aspect dramatique de l’expérience est accentué par l’incongruité de certaines situations urbaines (réf. : centres commerciaux et parcs publics sans présence humaine).</p>
				</div>
				<div class="detail" v-if="detailOpen=='intentions'" :key="'intentions'">
					<h4>Intentions évoquées</h4>
					<p>L’ensemble des contenus photographiques semble révéler une intention claire de la part des photographes, soit celle de révéler et de communiquer les singularités d’un confinement urbain. Les photographies font apparaître les aspects anormaux d’un cadre de vie urbain au quotidien (espaces publics désertés) sur le plan des comportements sociaux (solitude humaine et apparition fugace des usagers). Elles révèlent également une quiétude monotone qui crée une perception méconnue des paysages urbains.</p>
				</div>
				<div class="detail" v-if="detailOpen=='locales'" :key="'locales'">
					<h4>Expressions paysagères</h4>
					<p>Les sujets photographiques cadrent principalement les espaces urbains de proximité soient celles des rues de desserte locale, des façades architecturales et des quartiers. Les regards envers ses paysages de proximité sont généralement fragmentaires (1er et 2e plan visuel de coin de rue, de façades d’habitation, d’enfilade de façades architecturales). Ces cadrages fragmentaires communiquent des ambiances esthétiques froides, arides, désertiques et sans vie. Toutefois, ces figures d’expressions paysagères révèlent les aspects «{{'\xa0'}}sublimants{{'\xa0'}}» de la ville.</p>
				</div>
				<div class="detail" v-if="detailOpen=='globales'" :key="'globales'">
					<h4>Impressions paysagères</h4>
					<p>L’un des traits caractéristiques de cette interprétation photographique est sans nul doute l’impression de solitude urbaine qui constitue la figure prédominante de l’impression paysagère montréalaise. Le regard des photographes ne s’intéresse pas aux perspectives globales du paysage urbain. Les cadrages photographiques ne sont pas englobants. Le paysage à voir n’est pas panoramique ni dominant. Par ce fait, ils démontrent l’importance de l’intériorité urbaine durant le confinement. L’impression de replis en est la figure clé du paysage urbain.</p>
				</div>
			</transition>
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
	overflow: hidden;
	position: relative;
	text-align: center;
	box-sizing: border-box;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
	background: white;
	margin: 45px 90px;
	padding: 30px 125px;
}

#gluer {
	position: relative;
	/* filter: url('#glue'); */
}

.schema-container svg {
	position: absolute;
	width: 0px;
	height: 0px;
}

.schema-container h4 {
	color: rgb(66, 66, 66);
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
	overflow: hidden;
	text-align: left;
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0px;
	padding: 50px 65px;
	height: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
	width: 500px;
	background-color: rgb(255, 255, 255);
	box-shadow: 5px 0px 25px -15px rgba(0,0,0,.2);
}
.detail h4 {
	position: relative;
	width: 375px;
}
.detail p {
	position: relative;
	width: 375px;
	font-size: 16px;
}
.detail-enter-active,
.detail-leave-active {
	transition: all .35s ease-in-out;
}
.detail-enter,
.detail-leave-to {
	padding: 0px;
	width: 0px;
	opacity: .5;
	transform: translateX(-20px);
}


.concept h4::after {
	content: '';
	display: inline-block;
	position: absolute;
	width: 0%;
	left: 50%;
	height: 2px;
	border-radius: 1px;
	background-color: rgb(66, 66, 66);
	bottom: 4px;
	transition: all .5s ease;
}
.concept:hover h4::after {
	left: 0%;
	width: 100%;
}
.concept h5 {
	color: rgb(120, 175, 99);
	position: relative;
	text-indent: 0px;
	font-weight: 500;
	font-size: 14px;
	padding: 0px 5px 5px 5px;
	margin: 0px;
	line-height: 1.25em;
	transition: all .3s;
}
.concept:hover h5 {
	color: rgb(56, 56, 56);
}
.concept p {
	opacity: 0;
	max-height: 0px;
	color: rgb(82, 82, 82);
	position: relative;
	overflow: hidden;
	line-height: 1.25em;
	/* font-family: 'Spectral', serif; */
	font-style: italic;
	text-indent: 0px;
	font-size: 13px;
	font-weight: 400;
	margin: 0px auto;
	padding: 0px;
	transition: all .7s ease;
}
.concept:hover p {
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
	margin: 10px auto 20px auto;
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
	background-color: rgb(255, 255, 255);
	box-shadow: 0px 3px 15px -8px rgba(0,0,0,.3);
	transition: all .25s ease;
}
.concept:hover .inner {
	background-color: rgb(255, 255, 255);
	border-radius: 15px !important;
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
}
#globales {
	background-color: rgb(202, 240, 221);
}
#locales {
	background-color: rgb(243, 243, 213);
}
.figure:hover {
	background-color: red;
}
.figure.nobg {
	background-color: rgba(0,0,0,0);
}
.figure p, .temps-inner {
	margin: 0px;
	font-size: 13px;
	font-weight: 400;
	line-height: 1.5em;
	padding: 0px;
}
.temps-inner {
	margin-bottom: 55px;
}
#globales, #globales-content {
	padding: 40px;
	width: 320px;
	height: 320px;
	right: 50%;
	transform: translateX(-200px);
	animation: globales 28s linear infinite;
}
#locales, #locales-content {
	padding: 40px;
	width: 400px;
	height: 400px;
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
	top: 125px;
	bottom: 30px;
	left: 50%;
	width: 750px;
	margin: 0px auto;
	display: inline-block;
	position: absolute;
	background: rgb(0,0,0);
	background: linear-gradient(90deg, rgb(227, 251, 255) 0%, rgb(255, 254, 221)100%);
	border-radius: 50%;
	transform: translateX(-50%);
}

@keyframes locales {
	0% {transform: translate(150px,30px) rotate(0deg) translateX(15px) rotate(0deg);}
	100% {transform: translate(150px,30px) rotate(360deg) translateX(15px) rotate(-360deg);}
}

@keyframes globales {
	0% {transform: translate(-150px,30px) rotate(0deg) translateX(17px) rotate(0deg);}
	100% {transform: translate(-150px,30px) rotate(-360deg) translateX(17px) rotate(360deg);}
}
</style>