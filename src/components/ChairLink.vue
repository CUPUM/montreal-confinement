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
	display: block;
	padding: 0px;
	text-decoration: none;
	text-align: center;
	color: rgb(35,35,35);
	transition: all .3s;
}
a:hover {
	color: rgb(120, 175, 99);
}
a::after {
	content: '';
	width: 0%;
	height: 2px;
	background-color: rgb(120, 175, 99);
	position: absolute;
	display: block;
	bottom: 3px;
	right: 0px;
	border-radius: 1px;
	transition: all .3s;
}
a:hover::after {
	width: 100%;
	left: 0%;
}
</style>