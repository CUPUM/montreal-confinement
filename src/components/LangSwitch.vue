<template>
	<div id="lang-switch" class="noselect">
		<input type="radio" id="en" name="lang" value="en" v-model="currentLang">
		<label for="en" ref="enlabel">EN</label>

		<div id="separator"></div>

		<input type="radio" id="fr" name="lang" value="fr" v-model="currentLang">
		<label for="fr" ref="frlabel">FR</label>

		<div v-if="ready" class="highlighter" :style="{left:style.left, bottom:style.top, width:style.width, height: '2px'}"></div>
	</div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
	data() {
		return {
			ready: false
		}
	},
	computed: {
		currentLang: {
			get() {
				return store.lang
			},
			set(value) {
				mutations.setLang(value)
				if (this.$route.name == "Accueil") {
					this.$router.push({path: '/'+value})
				}
			}
		},
		style() {
			var el = this.$refs[store.lang+'label'];
			const height = el.clientHeight;
			const width = el.clientWidth;
			const x = el.offsetLeft;
			const y = el.offsetTop;
			const hpadding = 0;
			const vpadding = -3;
			return {
				width:width+hpadding*2+'px',
				height:height+vpadding*2+'px',
				top:y-vpadding+'px',
				left:x-hpadding+'px'
			}
		}
	},
	methods: {
	},
	mounted() {
		this.ready = true
	}
}
</script>

<style scoped>
#lang-switch {
	color: rgb(72,72,72);
	z-index: 9999;
	margin: 0px;
	padding: 0px;
	position: fixed;
	display: block;
	width: auto;
	height: auto;
	font-size: 16px;
	line-height: 2em;
	right: 30px;
	top: 50%;
	transform-origin: center;
	transform: translateY(-50%) rotate(90deg) translateY(-50%);
}
input {
	display: none;
}
label {
	position: relative;
	color: rgb(92,92,92);
	display: inline-block;
	cursor: pointer;
	font-weight: 500;
	opacity: .5;
	transition: all .3s ease-in-out;
}
label:hover {
	opacity: 1;
	color: rgb(120, 175, 99);
}
label::after {
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
label:hover::after {
	width: 100%;
	left: 0%;
}
input:checked+label:hover::after {
	width: 0%;
	left: 0%;
	opacity: 0;
} 
input:checked+label:hover {
	color: rgb(92,92,92);
}
input:disabled+label {
	cursor: not-allowed;
	opacity: .3;
	text-decoration: line-through;
}
input:checked+label {
	pointer-events: none;
	cursor: default;
	opacity: 1;
}
#separator {
	display: inline-block;
	margin: 0px 12px;
	width: 2px;
	height: .75em;
	position: relative;
	top: 1px;
	background: rgb(129, 129, 129);
	border-radius: 1px;
	opacity: .5;
}
.highlighter {
	z-index: -1;
	position: absolute;
	display: inline-block;
	border-radius: 5px;
	/* border: 2px solid rgb(92,92,92); */
	background-color: rgb(92,92,92);
	transition: all .35s ease-in-out;
}
</style>