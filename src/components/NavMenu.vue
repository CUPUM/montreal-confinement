<template>
	<div id="menu" v-on:click="closeNav" v-bind:class="{ 'show': isNav }" v-bind:style="{ transitionDelay: (routes.length-1)*staggerDelay+.4+'s' }">
		<div id="backdrop" v-bind:class="{ 'show': isNav }"></div>
		<nav id="nav" v-bind:class="{ 'show': isNav }">
			<ul>
				<router-link 
				v-for="(route, i) in routes"
				v-bind:key="route.id" 
				v-bind:to="{ name: route.name }"
				tag="li" 
				v-bind:class="{ 'show': isNav, 'sub-chapter': route.isSubChapter }"
				v-bind:style="{ transitionDelay: i*staggerDelay+'s'}"
				class="noselect"
				>
					<div class="highlighter"></div>
					<span class="inner-wrapper" v-bind:style="{ transitionDelay: i*staggerDelay+'s'}">
						<span><span class="chapter-number">{{ route.chapter+subChapter(route) }}&emsp;&mdash;</span>&emsp;{{ route.title }}</span>
					</span>
				</router-link>
			</ul>
		</nav>
	</div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
	data() {
		return {
			staggerDelay: .03
		}
	},
	computed: {
		isNav() {
			return store.isNav
		},
		routes() {
			return this.$router.options.routes
		},
		chaptersRoutes() {
			return this.$router.options.routes.filter(route => route.isChatper)
		}
	},
	methods: {
		closeNav() {
			mutations.closeNav()
		},
		subChapter(item) {
			return item.isSubChapter ? '.'+item.subChapter : ''
		}
	},
	mounted() {
	},
	watch: {
		$route() {
			mutations.closeNav()
		}
	}
}
</script>

<style scoped>
#menu {
	z-index: 9900;
	position: absolute;
	top: 0px;
	left: 0px;
	overflow: hidden;
	border-radius: 0px;	
	width: 100%;
	height: 0;
	background-color: transparent;
	transition: all 0s linear;
}
#menu.show {
	height: 100%;
	transition-delay: 0s !important;
}

 #backdrop {
	opacity: 1;
	box-sizing: content-box;
	position: absolute;
	/* background-image: url('~@/assets/noise-texture-lighter.png'); */
	background-color: rgb(255, 255, 255);
	background-repeat: repeat;
	background-position: top right;
	width: calc(400 * (1vw + 1vh - 1vmin));
	height: calc(400 * (1vw + 1vh - 1vmin));
	padding: 0;
	top: 0px;
	right: 0px;
	border-radius: 65%;
	transform: translate(50%, -50%) rotate(45deg) scale(0);
	transition: opacity .5s ease-in-out, transform .5s ease-in-out, border-radius 0s .5s ease-in-out;
}
#backdrop.show {
	opacity: 1;
	border-radius: 0%;
	transform: translate(50%, -50%) rotate(45deg) scale(1);
	transition: all .8s ease-in-out;
}

nav {
	box-sizing: border-box;
	font-weight: 500;
	position: relative;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: none;
	text-align: center;
	line-height: 100vh;
	vertical-align: middle;
	padding: 0px 90px;
	overflow-y: auto;
	opacity: 0;
	transition: opacity .75s;
}
nav.show {
	opacity: 1;
}
nav ul {
	padding: 0px;
	margin: 80px 0px;
	vertical-align: middle;
	display: inline-block;
	max-width: 950px;
	min-width: 250px;
	text-align: left;
	line-height: 1em;
	font-family: 'Poppins', sans-serif;
	font-weight: 400;
	font-size: 28px;
	background-color: transparent;
}
nav ul .sub-chapter {
	line-height: 1em;
	font-size: 20px;
	margin-left: 34px;
}
nav ul .chapter-number {
	color: rgb(56,56,56) !important;
	display: inline;
	opacity: .5;
	font-family: 'Poppins', sans-serif;
	font-weight: 500;
	font-size: 12px;
	letter-spacing: 2px;
	vertical-align: middle;
}

/* Outer list-item element */
nav li {
	margin: 0px 0px;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	list-style-type: none;
	display: block;
	float: left;
	clear: left;
	background-color: transparent;
	text-indent: 0px;
	transition: all .5s;
}
nav li.show {
}
nav li.vue-active-link {
	cursor: default;
}

/* Inner text wrapper */
nav li .inner-wrapper {
	opacity: 0;
	display: block;
	transition: all .45s cubic-bezier(0.8, 0, 0.2, 1);
	transform: translate(50px,-50px);
}
nav li.show .inner-wrapper {
	opacity: 1;
	transform: translate(0px,0px);
}

/* Inner text span */
nav li span {
	margin: 14px 6px;
	display: block;
	color: rgb(120, 175, 99);
	transition: all .25s cubic-bezier(.5,0,.5,1);
}

nav li:not(.vue-active-link):hover span {
	color: rgb(250, 250, 250); /* rgb(58, 216, 97); */
}
nav li.vue-active-link span {
	opacity: .4;
}


.highlighter {
	opacity: .5;
	bottom: 0px;
	border-radius: 1px;
	position: absolute;
	background-color: rgb(120, 175, 99);
	width: 0%;
	height: 100%;
	transition: all .2s ease-in-out;
	right: 0;
}
nav li.show:not(.vue-active-link):hover .highlighter {
	left: 0;
	opacity: 1;
	width: 100%;
}

</style>