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
	computed: {
	},
	methods: {		
	},
	mounted() {
	}
}
</script>

<style scoped>
#lang-switch {
	font-size: 12px;
	position: fixed;
	display: inline-block;
	width: auto;
	height: auto;
	color: rgba(0,0,0,.5);
	writing-mode: vertical-lr;
	right: 50px;
	top: 50%;
	margin-top: -50px;
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
	margin: 16px 0px;
	height: 1px;
	width: .9em;
	background: rgba(0,0,0,.5);
}
</style>