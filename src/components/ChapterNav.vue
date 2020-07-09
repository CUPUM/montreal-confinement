<template>
	<div class="chapter-navigator">
		<router-link v-if="this.previous" 
			id="previous-chapter" 
			class="chapter-button"
			tag="div"
			:to="{name: destination(-1).name}">
				Revenir en arrière
				<div class="arrow-stem-prev"></div>
		</router-link>

		<router-link v-if="this.next" 
			id="next-chapter"
			class="chapter-button"
			tag="div"
			:to="{name: destination(+1).name}">
				Poursuivre la lecture
				<div class="arrow-stem-next"></div>
		</router-link>
	</div>
</template>

<script>
import routes from '@/router/routes.js'

export default {
	props: {
		next: Boolean,
		previous: Boolean
	},
	data() {
		return {
			routes
		}
	},
	computed: {
		currentPage() {
			return parseInt(routes.find(route => route.name == this.$route.name).id, 10)
		}
	},
	methods: {
		destination(step) {
			return routes.find(route => parseInt(route.id, 10) == (this.currentPage+step))
		}
	},
	mounted() {
	}
}
</script>

<style scoped>
.chapter-navigator {
	text-align: center;
	margin: 150px 0px;
	width: 100%;
	background-color: transparent;
}
.chapter-button {
	position: relative;
	letter-spacing: 1px;
	border-radius: 3px;
	background-color: white;
	border: 0px solid rgb(120, 175, 99);
	color: rgb(120, 175, 99);
	font-weight: 500;
	font-size: 12px;
	text-transform: uppercase;
	box-sizing: border-box;
	margin: 0px 1%;
	padding: 20px;
	display: inline-block;
	width: 48%;
	box-shadow: 0px 5px 10px -5px rgba(0,0,0,.2);
	cursor: pointer;
	transition: all .3s cubic-bezier(.6,0,.4,1);
}
.chapter-button:hover {
	color: white;
	background-color: rgb(120, 175, 99);
	box-shadow: 0px 15px 25px -15px rgba(0,0,0,.3);
}

/* .next-arrow {
	opacity: 0;
	position: absolute;
	width: 24px;
	height: 24px;
	top: 50%;
	left: 100%;
	margin-left: -26px;
	transform-origin: center;
	transform: translate(0px,-50%) rotate(45deg);
	transition: all .5s cubic-bezier(.6,0,.4,1);
	border-width: 2px 2px 0px 0px;
	border-radius: 1px;
	border-color: rgb(120, 175, 99);
	border-style: solid;
}
.chapter-button:hover .next-arrow {
	transform: translate(50px,-50%) rotate(45deg);
	opacity: 1;
	right: 30px;
} */

.arrow-stem-next {
	position: absolute;
	width: 0px;
	height: 2px;
	top: 50%;
	left: 100%;
	transform: translateY(-50%);
	transition: all .4s cubic-bezier(.6,0,.4,1);
	background-color: rgb(120, 175, 99);
}
.chapter-button:hover .arrow-stem-next {
	width: 50vw;
}

.arrow-stem-prev {
	position: absolute;
	width: 0px;
	height: 2px;
	top: 50%;
	right: 100%;
	transform: translateY(-50%);
	transition: all .4s cubic-bezier(.6,0,.4,1);
	background-color: rgb(120, 175, 99);
}
.chapter-button:hover .arrow-stem-prev {
	width: 50vw;
}
</style>