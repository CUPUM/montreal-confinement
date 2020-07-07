<template>
	<div id="app">
		<div id="view-container">
			<!-- <div id="spinner"></div> -->
			<transition name="view-change" mode="out-in">
				<keep-alive>
					<router-view/>
				</keep-alive>
			</transition>
		</div>
		<NavMenu/>
		<NavButton/>
		<LangSwitch/>
		<ChairLink/>
		<div id="copyright" class="noselect">&copy; Chaire UNESCO en paysage urbain</div>
	</div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import NavButton from '@/components/NavButton'
import LangSwitch from '@/components/LangSwitch'
import ChairLink from '@/components/ChairLink'

export default {
	components: {
		NavMenu,
		NavButton,
		LangSwitch,
		ChairLink
	}
}
</script>

<style>
/* font-family: 'Archivo', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

/* font-family: 'Work Sans', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/* font-family: 'Proza Libre', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Proza+Libre:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');

/* font-family: 'Poppins', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/* font-family: 'Spectral', serif; */
@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

/* font-family: 'Lato', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

/* font-family: 'DM Serif Text', serif; */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');

* {
	box-sizing: border-box;
	scroll-behavior: smooth;
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
	overflow: auto;
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
	scroll-behavior: smooth;
	overflow-y: auto;
	overflow-x: hidden;
}

#spinner {
	background-color: rgba(255,255,0,1);
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
}

.view-change-enter-active,
.view-change-leave-active {
	transition: opacity 1s;
}
.view-change-enter,
.view-change-leave-to {
	opacity: 0;
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

h1, h2, h3 {
	font-weight: 400;
	line-height: 1.2em;
	padding: 32px 48px;
	color: rgb(56, 56, 56);
	font-size: 58pt;
}
h1 {
	color: rgb(65,65,65);
	text-align: center;
	margin: 0px auto 100px auto;
	padding: 80px;
	max-width: 1250px;
	font-weight: 600;
	display: block;
	box-shadow: 0px 70px 60px -120px rgba(0,0,0,1), inset 0px -2px 5px -5px white;
}
h2 {
	margin: 64px 0px 32px 0px;
	position: relative;
	font-weight: 200;
	/* box-shadow: 24px 0px 24px -36px rgba(0,0,0,.5), -24px 0px 24px -36px rgba(61, 48, 48, 0.5); */
	font-size: 36pt;
	line-height: 1.2em;
	text-indent: 0px;
	padding-left: 0px;
}
h2::before {
	box-sizing: border-box;
	content: '';
	width: 24px;
	height: 24px;
	display: inline-block;
	position: absolute;
	background: transparent;
	border-radius: 0px 1px 0px 0px;
	border-width: 2px 2px 0px 0px;
	border-color: rgb(56,56,56);
	border-style: solid;
	left: -68px;
	top: 60px;
	transform: translateY(-50%) rotate(45deg);
}
h2::after {
	box-sizing: border-box;
	content: '';
	width: 100px;
	left: -141px;
	height: 2px;
	background-color: rgb(56,56,56);
	/* background: linear-gradient(to right, rgba(56, 56, 56,0), rgba(56, 56, 56,1)); */
	display: inline-block;
	position: absolute;
	border-radius: 1px;
	top: 59px;
}
h3 {
	margin: 32px 0px 24px 0px;
	font-weight: 600;
	font-size: 20pt;
	line-height: 1.2em;
}
h4 {
	margin: 24px 0px 16px 0px;
	font-size: 18pt;
	line-height: 1.2em;
}

p {
	font-size: 17px;
	line-height: 26px;
	font-weight: 400;
	/* text-indent: 48px; */
	margin: 26px auto;
	color: rgb(49, 49, 49);
}
p em {
	font-weight: 700;
	font-style: normal;
	/* color: rgb(120, 175, 99); */
}
p ul li {
	text-indent: 0px;
	margin: 10px 52px;
	list-style-type: none;
}
p li::before {
	display: inline-block;
	margin: 0px 0px 0px 0px;
	padding: 0px;
	text-indent: -32px;
	content: '🡒';
	color: rgb(156,156,156); /* rgb(120, 175, 99); */
}
p ol li {
	text-indent: 20px;
	margin: 10px 52px;
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
</style>
