<template>
	<div id="app">
		<transition name="notice">
			<div v-if="lang=='fr'" class="mobile-notice">
				<p><em>Prendre note :</em> Le visionnement de ce site sur un écran ou une fenêtre de petite taille n'est pas conseillé. Certaines visualisations risquent de ne pas être affichées adéquatement.</p>
				<p>Pour une meilleure expérience, veuillez utiliser un appareil avec un écran plus grand ou, si possible, agrandir la fenêtre de votre fureteur.</p>
			</div>
		</transition>
		<div id="view-container">
			<!-- <div id="spinner"></div> -->
			<transition name="view-change" mode="out-in">
				<keep-alive>
					<router-view ref="view" />
				</keep-alive>
			</transition>
		</div>
		<NavMenu/>
		<transition name="langswitch">
			<NavButton v-if="isLangNav" />
		</transition>
		<LangSwitch/>
		<ChairLink/>
		<transition name="langswitch" mode="out-in">
			<div id="copyright" class="noselect" v-if="lang=='fr'" key="fr">&copy; Chaire UNESCO en paysage urbain</div>
			<div id="copyright" class="noselect" v-if="lang=='en'" key="en">&copy; UNESCO Chair in Urban Landscape</div>
		</transition>
	</div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import NavButton from '@/components/NavButton'
import LangSwitch from '@/components/LangSwitch'
import ChairLink from '@/components/ChairLink'
import { store } from '@/store.js'

export default {
	components: {
		NavMenu,
		NavButton,
		LangSwitch,
		ChairLink
	},
	computed: {
		lang() {
			return store.lang
		},
		isLangNav() {
			return (store.lang =='fr' || (store.lang =='en' && this.$route.name!='Accueil')) ? true : false
		}
	},
	mounted() {
		// document.fonts.ready.then(function() {
		// 	fontsLoaded = true
		// })
	}
}
</script>

<style>
/* font-family: 'Poppins', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

/* font-family: 'Spectral', serif; */
@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');

* {
	box-sizing: border-box;
	/* scroll-behavior: smooth; */
}
html {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
body {
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.noselect {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
	supported by Chrome, Edge, Opera and Firefox */
}
.view-scroll {
	/* scroll-behavior: smooth; */
	overflow-y: auto;
	overflow-x: hidden;
}

#spinner {
	background-color: rgba(255,255,255,1);
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1000;
}

#app {
	display: flex;
	flex-direction: column;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 100%;
	background-color: rgb(244, 246, 248);
	font-family: 'Poppins', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#copyright {
	position: relative;
	z-index: 9999;
	left: 0px;
	bottom: 0px;
	width: 100%;
	height: auto;
	padding: 3px 0px 1px 0px;
	font-size: 10px;
	text-align: center;
}

#view-container {
	flex-grow: 1;
	width: 100%;
	height: 100%;
	padding: 0px;
	overflow: hidden;
	backface-visibility: hidden;
}

.view-change-enter-active,
.view-change-leave-active {
	transition: all 1s;
}
.view-change-enter {
	transform: translateY(-15px);
	opacity: 0;
}
.view-change-leave-to {
	transform: translateY(15px);
	opacity: 0;
}

.langswitch-enter-active,
.langswitch-leave-active {
	transition: all .75s ease-in;
}
.langswitch-enter,
.langswitch-leave-to {
	opacity: 0 !important;
}

/* Text styling */
.center-col {
	max-width: 800px;
	padding: 0 80px;
	margin: 0 auto;
}
.bottom-col {
	padding-bottom: 250px;
}

h1, h2, h3, h4 {
	font-weight: 400;
	line-height: 1.2em;
	padding: 32px 48px;
	color: rgb(56, 56, 56);
	font-size: 44pt;
}
h2 {
	margin: 64px 0px 32px 0px;
	position: relative;
	font-weight: 200;
	font-size: 36pt;
	line-height: 1.2em;
	text-indent: 0px;
	padding: 32px 48px 0px 0px;
}
h2::before {
	box-sizing: border-box;
	content: '';
	width: 20px;
	height: 20px;
	display: inline-block;
	position: absolute;
	background: transparent;
	border-radius: 0px 1px 0px 0px;
	border-width: 2px 2px 0px 0px;
	border-color: rgb(120, 175, 99);
	border-style: solid;
	left: -42px;
	top: 60px;
	transform: translateY(-50%) rotate(45deg);
}
h2::after {
	box-sizing: border-box;
	content: '';
	width: 26px;
	left: -46px;
	height: 2px;
	background-color: rgb(120, 175, 99);
	display: inline-block;
	position: absolute;
	border-radius: 1px;
	top: 59px;
}
h3 {
	margin: 32px 0px 24px 0px;
	padding: 32px 48px 26px 48px;
	font-weight: 600;
	font-size: 20pt;
	line-height: 1.2em;
}
h4 {
	font-weight: 500;
	padding: 12px 0px 0px 48px;
	text-indent: 0px;
	margin: 24px 0px 8px 0px;
	font-size: 15pt;
	line-height: 1.2em;
}

p {
	font-size: 17px;
	line-height: 26px;
	font-weight: 400;
	margin: 26px auto;
	color: rgb(56, 56, 56);
}
p em {
	font-weight: 700;
	font-style: normal;
	/* color: rgb(120, 175, 99); */
}

p ul, p ol {
	padding: 0px 16px;
}
p ul li, p ol li {
	text-indent: 0px;
	margin: 10px 32px;
	list-style-type: none;
	position: relative;
}
p ul li::before, p ol li::before {
	position: absolute;
	display: inline-block;
	margin: 0px 0px 0px 0px;
	padding: 0px;
	text-indent: -32px;
	content: '\2192';
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
	height: 100%;
	color: rgb(156,156,156);
}
p ul ul {
	padding: 4px 16px;
}
p ul ul li {
	margin: 0px 0px 5px 32px;
}
p ul ul li::before {
	content: '\2022'
}


p ol {
	counter-reset: li
}
p ol li {
	counter-increment: li;
}
p ol li::before {
	font-size: 14px;
	font-weight: 500;
	content: counter(li)' .';
}

a.reference-link {
	padding:0px 2px;
	margin: 0px;
	background-color: rgba(120, 175, 99, .1);
	color:rgb(120, 175, 99);
	display: inline-block;
	position: relative;
	border-radius: 3px;
	text-decoration: none;
	text-indent: 0px;
	font-weight: 500;
	z-index: 2;
	transition: all .2s linear;
}
a.reference-link:hover {
	color:rgb(250, 250, 250);
}
a.reference-link::after {
	z-index: 1;
	position: absolute;
	display: inline-block;
	content: '';
	left: 3px;
	right: 3px;
	bottom: 3px;
	height: 1px;
	border-radius: 1px;
	background-color: rgba(120, 175, 99, 1);
	transition: all .2s ease;
}
a.reference-link:hover::after {
	background-color: rgba(255, 255, 255, 1);
}
a.reference-link::before {
	z-index: -1;
	box-sizing: content-box;
	position: absolute;
	display: inline-block;
	content: '';
	right: 0;
	bottom: 1px;
	width: 0%;
	height: 100%;
	border-radius: 3px;
	background-color: rgb(110, 167, 93);
	transition: all .2s ease;
}
a.reference-link:hover::before {
	left: 0;
	width: 100%;
}

.notice-enter-active,
.notice-leave-active {
	transition: all .5s ease;
}
.notice-enter,
.notice-leave-to {
	opacity: 0;
	max-height: 0px !important;
	padding: 0px !important;
}

.mobile-notice {
	opacity: 1;
	top: 0px;
	/* overflow: hidden; */
	background-color: white;
	position: relative;
	height: auto;
	padding: 0px;
	transition: all .35s ease;
}
@media screen and (max-width: 1000px) {
	.mobile-notice {
		opacity: 1;
		max-height: 500px;
		padding: 12px 0px 24px 0px;
	}
}
@media screen and (min-width: 1001px) {
	.mobile-notice {
		opacity: 0;
		max-height: 0px;
		padding: 0px;
	}
}
.mobile-notice p {
	line-height: 1.5em;
	display: block;
	margin: 8px 0px 0px 0px;
	position: relative;
	font-size: 9pt;
	color: rgb(64,65,66);
	padding: 0px 96px 0px 24px;
	text-align: left;
}
.mobile-notice em {
	font-weight: 500;
	color: rgb(120, 175, 99);
}


/* VUE BAR CUSTOM STYLE */

.meta {
	width: 100%;
	height: 100%;
}

.vb > .vb-dragger {
	box-sizing: content-box;
	cursor: pointer;
	z-index: 100;
	width: 6px;
	right: 4px;
}
.vb > .vb-dragger > .vb-dragger-styler {
	box-sizing: content-box;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transform: rotate3d(0,0,0,0);
	transform: rotate3d(0,0,0,0);
	-webkit-transition: background-color 250ms ease-out;
	transition: background-color 250ms ease-out;
	background-color: rgba(158, 158, 158, 0.5);
	margin: 4px 0px;
	border-radius: 3px;
	height: calc(100% - 8px);
	display: block;
}
.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
	background-color: rgba(56, 56, 56, 0.75);
}
.vb > .vb-dragger:hover > .vb-dragger-styler {
	background-color: rgba(120, 175, 99,.75);
}
.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
	background-color: rgba(120, 175, 99,.75);
}
.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
	background-color: rgba(34, 34, 34, 0.75);
}
</style>
