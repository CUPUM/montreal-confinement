<template>
	<div id="accueil" ref="accueil">

		<div id="splash">
			<svg preserveAspectRatio="xMinYMid" viewBox="0 0 1700 900">
				<defs>
					<mask id="splash-text-mask" x="0" y="0">
						<text x="0" y="220" class="splash-text">Montréal /</text>
						<text x="0" y="510" class="splash-text">paysage</text>
						<text x="0" y="800" class="splash-text">en confinement</text>
						<text x="1345" y="465" class="splash-text date">13 mars &mdash; 16 mai 2020</text>
					</mask>
				</defs>
				<image width="1700" v-bind="{'xlink:href' : BGpic}" mask="url(#splash-text-mask)"/>
			</svg>
		</div>
		
		<div id="scroll-arrow-container" v-on:click="arrowClick">
			<div id="scroll-arrow"></div>
			<div id="scroll-arrow-stem"></div>
		</div>

		<img class="chaire-logo" :src='CUPUMlogo' alt="~"/>

		<h1 style="marginTop: -50px">Accueil</h1>
		<div class="center-col bottom-col">
			<p>Au début de l’année 2020, la pandémie COVID-19 a profondément marqué les villes dans plusieurs régions du monde. Et, elle nous amène à poser des questionnements fondamentaux envers les milieux urbains tant sur les aspects sociaux, culturels, économiques, environnementaux et physiques (habitat, rue, parc, etc.). La COVID-19 a bouleversé radicalement et dans un très court laps de temps les comportements et les préoccupations des citoyens dans la ville. Les populations urbaines ont changé leur mode de vie au quotidien et elles ont dû s’adapter à cette nouvelle réalité avec des mesures adaptées pour contraindre cette pandémie.</p>
			<p>La COVID-19 a révélé l’importance de vivre la ville au quotidien de manière heureuse. Elle nous a amené à questionner le rôle et les fonctions des espaces publics et privés tout comme elle a exposé des problèmes majeurs d’usages et d’accessibilité envers certains attributs urbains (parc, rue, etc.). Elle a également fait émerger des actions et des solutions nouvelles adaptées à ce contexte de crise.</p>
			<p>Cette recherche sous l’intitulé <em> COVID-19 - paysage urbain montréalais{{'\xa0'}}: constats et perspectives</em> produites par la Chaire UNESCO en paysage urbain (CUPUM) fait état de la situation envers les espaces publics durant la période de confinement. En prenant appui sur une veille informationnelle des médias, de certaines OBNL et des communiqués de presse de la Ville de Montréal, elle a permis de trouver des réponses face à un ensemble des questionnements reliés à la mission de la Chaire UNESCO et à ces programmes affiliés de l’UNESCO.</p>
			<p>Cette recherche a aussi été l’occasion de porter un regard sensible sur l’expérience de l’espace public en analysant les différents cadrages de photographes de presse et professionnels durant cette période de confinement montréalais. L’interprétation de ce corpus a permis d’esquisser les contours de l’identité du paysage urbain qui révèle les attributs clés de l’expérience de la ville en mode «{{'\xa0'}}confinement{{'\xa0'}}».</p>
			<p>Ce balisage d’informations durant la période montréalaise de confinement présenté dans ce site Internet devrait apporter un éclairage sur la situation montréalaise dans le contexte de la pandémie mondiale et il constitue{{'\xa0'}}:
				<ul>
					<li>un outil de caractérisation du paysage urbain{{'\xa0'}};</li>
					<li>une assise pour engager une réflexion pour le futur des espaces publics.</li>
				</ul>
			</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import CUPUMlogo from '@/assets/Logo_CUPUM_noir.svg'
import BGpic from '@/assets/photos/cupum-covid_053.jpg'

export default {
	name: 'Accueil',
	components: {

	},
	data() {
		return {
			CUPUMlogo,
			BGpic,
			windowHeight: 0
		}
	},
	computed: {
		circles() {
			const count = 10;
			const minSize = 500;
			const maxSize = 1500;
			const padding = -20;
			const width = 100;
			const height = 100;
			var array = []
			for (let i = 0; i < count; i++) {
				const diameter = Math.random()*(maxSize-minSize)+minSize
				array.push({
					x: Math.random()*(width - 2*padding)+padding+'%',
					y: Math.random()*(height - 2*padding)+padding+'%',
					d: diameter+'px',
					color: 'hsla('+(Math.random()*150+0)+', 55%, 80%, .95)'
				})
			}
			return array
		}
	},
	methods : {
		arrowClick() {
			this.$refs.accueil.scrollTo({top: this.windowHeight, behavior: 'smooth'})
		},
		onResize() {
			this.windowHeight = window.innerHeight
		}
	},
	mounted() {
		this.onResize();
		console.log(this.windowHeight)
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize);
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize); 
	}
}
</script>

<style scoped>
#accueil {
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	height: 100%;
	padding: 0px;
	margin: 0px;
}
#splash {
	position: relative;
	top: 0px;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 90px 110px 90px 125px;
	margin: 0px;
	overflow: hidden;
}
#splash svg {
	overflow: hidden;
	width: 100%;
	height: 100%;
}
.splash-text {
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
	font-size: 210px;
	fill: white;
}
.splash-text.date {
	font-family: 'Poppins', sans-serif;
	font-weight: 500;
	font-size: 30px;
	fill: white;
	letter-spacing: 1px;
}

.chaire-logo {
	top: -50px;
	left: 50%;
	transform: translateX(-50%);
	margin: 0px;
	padding: 0px;
	height: 150px;
	width: auto;
	position: relative;
}

#scroll-arrow-container {
	text-align: center;
	left: 50%;
	display: block;
	position: relative;
	padding: 0px;
	margin: 0px;
	width: 90px;
	height: 90px;
	top: -115px;
	transform: translateX(-50%);
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
	top: 20px;
	padding: 0px;
	margin: 0px;
	position: absolute;
	display: block;
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
	top: 50px
}
#scroll-arrow-stem {
	left: 50%;
	border-radius: 1px;
	height: 26px;
	width: 2px;
	margin-left: -1px;
	top: 15px;
	background: rgb(64,64,64);
	position: absolute;
	transition: all .4s cubic-bezier(.7,0,.3,1)
}
#scroll-arrow-container:hover #scroll-arrow-stem {
	top: 30px;
	height: 41px;
}

.circles {
	background-image: url('~@/assets/noise-texture-light.png');
	transform: translate(-50%,-50%);
}

</style>
