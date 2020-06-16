<template>
	<div id="lang-switch" class="noselect">
		<input type="radio" id="en" name="lang" value="en" checked><label for="en">EN</label>
		<div id="separator"></div>
		<input type="radio" id="fr" name="lang" value="fr" checked><label for="fr">FR</label>
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'

export default {
	data() {
		return {
			message: {
				en: 'This here is an english message teehee',
				fr: 'Ce message est français'
			}
		}
	},
	computed: {
	},
	methods: {		
	},
	mounted() {
	}
}
</script>

<style scoped>
/* #lang-switch {
	font-size: 16px;
	position: fixed;
	display: inline-block;
	width: auto;
	height: auto;
	color: rgba(0,0,0,.5);
	writing-mode: vertical-lr;
	right: 50px;
	top: 50%;
	margin-top: -50px;
} */
#lang-switch {
	margin: 0px;
	padding: 0px;
	position: fixed;
	display: block;
	width: auto;
	height: auto;
	font-size: 16px;
	line-height: 2em;
	right: 24px;
	top: 50%;
	transform-origin: center;
	transform: translateY(-50%) rotate(90deg) translateY(-50%);
}
input {
	display: none;
}
label {
	display: inline-block;
	cursor: pointer;
}
input:checked+label {
	font-weight: bold;
}
#separator {
	display: inline-block;
	margin: 0px 12px;
	width: 1px;
	height: .9em;
	background: rgba(0,0,0,.5);
}
</style>