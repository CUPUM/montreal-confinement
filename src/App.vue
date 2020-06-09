<template>
	<div id="app-container">
		<router-view/>
		<NavMenu/>
		<NavButton/>
		<LangSwitch/>
	</div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import NavButton from '@/components/NavButton'
import LangSwitch from '@/components/LangSwitch'

export default {
	components: {
		NavMenu,
		NavButton,
		LangSwitch
	}
}
</script>

<style>
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

#app-container {
	margin: 0px;
	padding: 50px;
	width: 100%;
	height: 100%;
	background-color: rgb(247, 246, 250);
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

/* Text styling */
.bodytext {
	font-family: 'Times New Roman', Times, serif;
}
.misctext {
	font-family: 'Courier New', Courier, monospace;
}
h1, h2, h3, h4 {
	max-width: 650px;
	min-width: 350px;
	margin: 36px auto 20px auto;
	color: red;
}
h2 {
	color: orangered;
}
h3 {
	color:orange;
}
h4 {
	color:peachpuff;
}

p {
	font-size: 17px;
	line-height: 1.6em;
	text-indent: .8em;
	max-width: 650px;
	min-width: 350px;
	margin: 14px auto;
	color: black;
}
em {
	color: green;
}

</style>
