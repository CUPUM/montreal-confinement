<template>
	<div class="meta">
	<div class="meta" v-bar ref="vbar">
	<div id="accueil" ref="accueil" class="view-scroll">

		<transition appear name="splash-image">
			<div id="splash">
				<!-- <div id="splash-inner" :style="{backgroundImage: `url('${BGpic}')`}"> -->
				<div id="splash-inner" v-lazy:background-image="BGpic">
					<!-- <div class="img-wrapper">
						<div class="img-wrapper-inner">
							<img :src="BGpic" alt="">
						</div>
					</div> -->
					<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
					<svg preserveAspectRatio="xMinYMid" viewBox="0 0 1700 860">
						<defs>
							<svg:style type="text/css">
								@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@300;600&display=swap'); <!-- Sinon la font ne load pas toujours correctement sur Chrome... -->
								text {
									font-family: 'Poppins';
								}
							</svg:style>
							<mask id="splash-text-mask" x="0" y="0">
								<rect x="-10000" y="-10000" width="20000" height="20000" fill="white"/>
								<text x="0" y="210" class="splash-text">Montréal /</text>
								<text x="0" y="500" class="splash-text">paysage</text>
								<text x="0" y="790" class="splash-text">en confinement</text>
								<text x="1225" y="455" class="splash-text date">13 mars &mdash; 16 mai 2020</text>
							</mask>
						</defs>
						<rect x="-10000" y="-10000" width="20000" height="20000" mask="url(#splash-text-mask)" fill="rgb(244, 246, 248)"/>
						<!-- <transition name="splash-image">
							<image @load="isCurtain = false" v-show="!this.isCurtain" width="1700" v-bind="{'xlink:href' : BGpic}" mask="url(#splash-text-mask)"/>
						</transition> -->
					</svg>
				</div>
			</div>
		</transition>
		
		<div id="scroll-arrow-container" v-on:click="arrowClick">
			<div id="scroll-arrow"></div>
			<div id="scroll-arrow-stem"></div>
		</div>

		<img class="chaire-logo" :src='CUPUMlogo' alt="~"/>

		<!-- <h1 style="marginTop: -50px">Accueil</h1> -->
		<div class="center-col">
			<p>Au début de l’année 2020, la pandémie COVID-19 a profondément marqué les villes dans plusieurs régions du monde. Ainsi, elle nous amène à poser des questionnements fondamentaux envers les milieux urbains tant sur les aspects sociaux, culturels, économiques, environnementaux et physiques (habitat, rue, parc, etc.). La COVID-19 a bouleversé radicalement et dans un très court laps de temps les comportements et les préoccupations des citoyens dans la ville. Les populations urbaines ont changé leur mode de vie au quotidien et elles ont dû s’adapter à cette nouvelle réalité avec des mesures adaptées pour contraindre cette pandémie.</p>
			<p>La COVID-19 a révélé l’importance de vivre la ville au quotidien dans la période de confinement. Elle nous a entrainés à nous questionner sur le rôle et les fonctions des espaces publics et privés, tout comme elle a exposé des problèmes majeurs d’usages et d’accessibilité envers certains attributs urbains (parc, rue, etc.). Elle a également fait émerger des actions et des solutions nouvelles adaptées à ce contexte de crise.</p>
			<p>Cette recherche sous l’intitulé <em><i>COVID-19 &mdash; paysage urbain montréalais{{'\xa0'}}: constats et perspectives</i></em> produites par la Chaire UNESCO en paysage urbain (CUPUM) fait état de la situation envers les espaces publics durant la période de confinement. En prenant appui sur une veille informationnelle des médias, de certaines OBNL et des communiqués de presse de la Ville de Montréal, elle a permis de trouver des réponses face à un ensemble de questionnements reliés à la mission de la Chaire UNESCO et à ces programmes affiliés de l’UNESCO.</p>
			<p>Cette recherche a aussi été l’occasion de porter un regard sensible sur l’expérience de l’espace public en analysant les différents cadrages de photographes de presse et professionnels durant cette période de confinement montréalais. L’interprétation de ce corpus a permis d’esquisser les contours de l’identité du paysage urbain qui révèle les attributs clés de l’expérience de la ville en mode «{{'\xa0'}}confinement{{'\xa0'}}».</p>

			<ChapterNav :previous="false" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
// @ is an alias to /src
import CUPUMlogo from '@/assets/Logo_CUPUM_couleur.svg'
import BGpic from '@/assets/photos/cupum-covid_053.jpg'
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'Accueil',
	components: {
		ChapterNav
	},
	data() {
		return {
			CUPUMlogo,
			BGpic,
			viewHeight: Number,
			isCurtain: Boolean
		}
	},
	created() {
		this.isCurtain = true;
	},
	computed: {
	},
	methods : {
		arrowClick() {
			this.$refs.accueil.scrollTo({top: this.viewHeight, behavior: 'smooth'})
		},
		onResize() {
			this.viewHeight = window.innerHeight;
		}
	},
	mounted() {
		this.onResize();
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize);
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize); 
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#accueil {
	width: 100%;
	height: 100%;
	padding: 0px;
	margin: 0px;
	backface-visibility: hidden;
}

#splash {
	display: block;
	position: relative;
	top: 0px;
	box-sizing: border-box;
	width: 100%;
	height: calc(100% - 160px);
	padding: 0px 110px;
	margin: 75px 0px 0px 0px;
	overflow: hidden;
}
#splash-inner {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
	transition: opacity 1.5s;
}
#splash-inner[lazy=loading] {
	opacity: 0
}
#splash-inner[lazy=loaded] {
	opacity: 1
}
.img-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	clip: rect(0, auto, auto, 0);
	backface-visibility: hidden;
}
.img-wrapper-inner {
	position: fixed;
	backface-visibility: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
}
#splash img {
	position: relative;
	width: 100%;
	height: auto;
}
#splash svg {
	position: absolute;
	top: 0px;
	overflow: hidden;
	width: 100%;
	height: 100%;
	/* background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed; */
	transition: all 5s;
}
.splash-text {
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
	font-size: 210px;
	fill: black;
}
.splash-text.date {
	font-family: 'Poppins', sans-serif;
	font-weight: 300;
	font-size: 42px;
	fill: black;
	letter-spacing: .5px;
}

.splash-image-enter-active,
.splash-image-leave-active {
	transition: all 2s ease-in;
}
.splash-image-enter,
.splash-image-leave-to {
	opacity: 0 !important;
}

#scroll-arrow-container {
	text-align: center;
	display: block;
	position: relative;
	padding: 0px;
	margin: -30px auto 0px auto;
	width: 90px;
	height: 90px;
	cursor: pointer;
	opacity: .5;
	background-color: rgba(255,255,255,0);
	border-radius: 50%;
	transition: all .5s ease;
}
#scroll-arrow-container:hover {
	background-color: rgba(255,255,255,.5);
	opacity: 1
}
#scroll-arrow {
	left: 50%;
	box-sizing: border-box;
	top: 15px;
	padding: 0px;
	margin: 0px;
	position: absolute;
	display: inline-block;
	width: 20px;
	height: 20px;
	border-radius: 0px 1px 3px 1px;
	border-width: 0px 2px 2px 0px;
	border-color: rgb(64,64,64);
	border-style: solid;
	transform-origin: center;
	transform: translateX(-50%) rotate(45deg);
	transition: all .4s cubic-bezier(.7,0,.3,1)
}
#scroll-arrow-container:hover #scroll-arrow {
	top: 45px
}
#scroll-arrow-stem {
	left: 50%;
	border-radius: 1px;
	height: 26px;
	width: 2px;
	margin-left: -1px;
	top: 10px;
	background: rgb(64,64,64);
	position: absolute;
	transition: all .4s cubic-bezier(.7,0,.3,1)
}
#scroll-arrow-container:hover #scroll-arrow-stem {
	top: 25px;
	height: 41px;
}

.chaire-logo {
	display: block;
	shape-rendering: geometricPrecision;
	opacity: .75;
	margin: 100px auto;
	padding: 0px;
	height: 220px;
	width: auto;
	position: relative;
}
</style>
