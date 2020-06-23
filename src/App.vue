<template>
	<div id="app">
		<div id="view-container">
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
/* font-family: 'Poppins', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
/* font-family: 'Spectral', serif; */
@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
/* font-family: 'Nunito', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700;1,800;1,900&display=swap');

/* font-family: 'DM Serif Text', serif; */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');
/* font-family: 'Rakkas', cursive; */
/* @import url('https://fonts.googleapis.com/css2?family=Rakkas&display=swap'); */
/* font-family: 'Red Hat Text', sans-serif; */
/* @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap'); */
/* font-family: 'DM Sans', sans-serif; */
/* @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap'); */
/* font-family: 'Quicksand', sans-serif; */
/* @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
/* font-family: 'Nunito', sans-serif; */
/* @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;1,200;1,300;1,400;1,600;1,700;1,800&display=swap'); */ */

* {
	box-sizing: border-box;
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

#app {
	display: flex;
	flex-direction: column;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 100%;
	background-color: rgb(246, 245, 244);
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
	max-width: 700px;
	padding: 0 80px;
	margin: 0 auto;
}

h1, h2, h3, h4 {
	/* font-family: 'DM Serif Text', serif; */
	font-weight: 800;
	line-height: 1.2em;
	margin: 48px 48px 32px 48px;
	color: rgb(65, 65, 65);
	font-size: 44pt;
}
h2 {
	font-size: 35pt;
	line-height: 1.2em;
}
h3 {
	font-size: 26pt;
	line-height: 1.2em;
}
h4 {
	font-size: 18pt;
	line-height: 1.2em;
}

p {
	font-size: 17px;
	line-height: 26px;
	font-weight: 400;
	text-indent: 48px;
	margin: 26px auto;
	color: rgb(44, 44, 44);
}
em {
	font-weight: 600;
	font-style: normal;
	color: black;
}

</style>
