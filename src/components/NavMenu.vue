<template>
	<div id="menu" v-on:click="closeNav" v-bind:class="{ 'show': isNav }" v-bind:style="{ transitionDelay: (routes.length-1)*staggerDelay+.4+'s' }">
		<div id="backdrop" v-bind:class="{ 'show': isNav }"></div>
		<nav id="nav">
			<ul>
				<router-link 
				v-for="(route, i) in routes" 
				v-bind:key="route.id" 
				v-bind:to="{ name: route.name }" 
				tag="li" 
				v-bind:class="{ 'show': isNav }"
				v-bind:style="{ transitionDelay: i*staggerDelay+'s'}"
				class="noselect"
				>
					<div class="highlighter"></div><span class="inner-wrapper" v-bind:style="{ transitionDelay: i*staggerDelay+'s'}"><span>{{ route.title }}</span></span>
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
			staggerDelay: .07
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
		}
	},
	mounted() {
	},
	watch: {
		$route () {
			mutations.closeNav()
		}
	}
}
</script>

<style scoped>
#menu {
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
	opacity: .75;
	box-sizing: content-box;
	position: absolute;
	background: linear-gradient(45deg, rgba(222,120,51,1) 0%, rgba(247,89,68,1) 50%, rgba(242,83,44,1) 100%);
	width: 0px;
	height: 0px;
	padding: 0px 0px;
	top: 0px;
	right: 0px;
	border-radius: 65%;
	transform: translate(0px,0px) translate(0px,0px) rotate(45deg);
	transition: all .5s ease-in-out;
}
#backdrop.show {
	opacity: 1;
	box-sizing: content-box;
	position: absolute;
	/* width: calc(200vh + 200vw);
	height: calc(200vh + 200vw); */
	width: 200vw;
	height: 200vh;
	padding: 100vw 100vh;
	/* top: calc(-100vh - 100vw);
	right: calc(-100vh - 100vw); */
	border-radius: 0%;
	transform: translate(100vh,-100vw) translate(100vw,-100vh) rotate(45deg);
	transition: all .5s ease-in-out;
}

nav {
	position: relative;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: none;
	text-align: center;
	line-height: 100vh;
	vertical-align: middle;
}
nav ul {
	padding: 24px;
	vertical-align: middle;
	display: inline-block;
	max-width: 850px;
	min-width: 350px;
	text-align: left;
	line-height: 1.25em;
	font-family: sans-serif;
	font-weight: thin;
	font-size: 48px;
	background-color: rgba(0,0,0,0);
}

/* Outer list-item element */
nav li {
	position: relative;
	overflow: hidden;
	cursor: pointer;
	list-style-type: none;
	display: block;
	float: left;
	clear: left;
	background-color: rgba(0,0,0,0);
	text-indent: 0px;
	border-radius: 0 150% 150% 150%;
	transition: all .5s;
}
nav li.show {
	border-radius: 0px;
}
nav li.vue-active-link {
	cursor: default;
}

/* Inner text wrapper */
nav li .inner-wrapper {
	display: block;
	transition: all .5s ease;
	transform: translate(200px,-200px);
}
nav li.show .inner-wrapper {
	transform: translate(0px,0px);
}

/* Inner text span */
nav li span {
	margin: 2px 8px;
	display: block;
	color: rgb(241, 248, 237);
	transition: all .25s ease;
}

nav li:not(.vue-active-link):hover span {
	color: rgb(247, 89, 68);
}
nav li.vue-active-link span {
	opacity: .5;
}


.highlighter {
	opacity: 0;
	bottom: 0px;
	border-radius: 2px;
	position: absolute;
	background-color: rgb(255, 255, 255);
	width: 0%;
	height: 100%;
	transition: all .15s ease-in-out;
	right: 0;
}
nav li.show:not(.vue-active-link):hover .highlighter {
	left: 0;
	opacity: 1;
	width: 100%;
}

</style>