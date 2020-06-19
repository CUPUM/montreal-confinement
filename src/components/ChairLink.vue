<template>
	<div id="chair-link" class="noselect">
		<a href="http://www.unesco-paysage.umontreal.ca/">CUPUM</a>
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
#chair-link {
	z-index: 9999;
	margin: 0px;
	padding: 0px;
	position: fixed;
	display: block;
	width: auto;
	height: auto;
	font-size: 16px;
	line-height: 2em;
	left: 32px;
	top: 50%;
	transform-origin: center;
	transform: translateY(-50%) rotate(-90deg) translateY(-50%);
}
a {
	padding: 0px;
	text-decoration: none;
	text-align: center;
	color: rgb(35,35,35);
	text-align: center;
}
</style>