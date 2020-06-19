<template>
	<div id="nav-button" class="noselect" v-on:click='toggleNav' v-bind:class="{ x: isNav }">
		<div id="nav-button-inner-wrapper">
			<div id="upper" class="bar"></div>
			<div id="mid" class="bar"></div>
			<div id="lower" class="bar"></div>
			<div id="nav-button-bg"></div>
		</div>
	</div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
	computed: {
		isNav() {
			return store.isNav
		}
	},
	methods: {
		toggleNav() {
			mutations.toggleNav()
		}
	}
}
</script>

<style scoped>
#nav-button {
	z-index: 9999;
	box-sizing: content-box;
	cursor: pointer;
	position: fixed;
	top: 30px;
	right: 30px;
	width: 40px;
	height: 40px;
	padding: 5px;
}

#nav-button-inner-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

/* Normal icon */
.bar {
	width: 100%;
	height: 5%;
	background-color: rgb(46, 46, 46);
	position: absolute;
	border-radius: 1px;
	transition: all .2s ease;	/* cubic-bezier(.8,0,.2,1); .25s cubic-bezier(.2,.15,.25,1) */
}
.x .bar {
	background-color: rgb(232, 240, 241);
}

#upper {
	left: 0;
	top: 0%;
	transform-origin: bottom left;
	transform: translate(0,0) rotate(0deg);
}
#mid {
	top: 50%;
	left: 0%;
	transform-origin: center;
	transform: translate(0,-50%) rotate(0deg);
}
#lower {
	bottom: 0%;
	left: 0%;
	transform-origin: top right;
	transform: translate(0,0) rotate(0deg);
}
/* Normal icon hover */
#nav-button:hover #upper {
	width: 75%;
	top: 24%;
	transform: translate(0,-99%) rotate(90deg);
}
#nav-button:hover #mid {
	width: 132%;
	left: -16%;
	border-radius: 10px;
	transform: translate(0,-50%) rotate(-45deg);
}
#nav-button:hover #lower {
	width: 75%;
	left: 1%;
	transform: translate(0,0) rotate(0deg);
}

/* Close icon */
.x #upper {
	width: 65%;
	transform: translate(0,-29%) rotate(45deg);
}
.x #mid {
	width: 132%;
	left: -16%;
	transform: translate(0,-50%) rotate(-45deg);
}
.x #lower {
	width: 65%;
	transform: translate(0,29%) rotate(45deg);
	left: 35%;
}
/* Close icon hover */
.x#nav-button:hover #upper {
	top: 0%;
	width: 75%;
	left: 24%;
	transform: translate(0,0) rotate(0deg);
}
.x#nav-button:hover #mid {
	border-radius: 10px;
	transform: translate(0,-50%) rotate(-45deg);
}
.x#nav-button:hover #lower {
	bottom: 24%;
	left: 25%;
	width: 75%;
	transform: translate(0,100%) rotate(90deg);
}
</style>