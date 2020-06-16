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
			staggerDelay: .05
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
	opacity: .8;
	box-sizing: content-box;
	position: absolute;
	background-image: url('~@/assets/noise-texture-lighter.png');
	background-color: rgb(58, 216, 97);
	background-repeat: repeat;
	background-position: center;
	width: 1px;
	height: 1px;
	padding: 0vw 0vh;
	top: 0px;
	right: 0px;
	border-radius: 55%;
	transform: translate(0px,0px) translate(0px,0px) rotate(45deg);
	transition: all .5s ease-in-out;
}
#backdrop.show {
	opacity: 1;
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
}
nav ul {
	padding: 0px;
	vertical-align: middle;
	display: inline-block;
	max-width: 750px;
	min-width: 250px;
	text-align: left;
	line-height: 1.15em;
	font-family: 'Spectral', serif;
	font-weight: 800;
	font-size: 32px;
	background-color: rgba(0,0,0,0);
}

/* Outer list-item element */
nav li {
	margin: 6px 0px;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	list-style-type: none;
	display: block;
	float: left;
	clear: left;
	background-color: transparent;
	text-indent: 0px;
	border-radius: 0% 100% 0% 0%;
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
	opacity: 0;
	display: block;
	transition: all .4s cubic-bezier(0.8, 0, 0.2, 1);
	transform: translate(100px,-100px);
}
nav li.show .inner-wrapper {
	opacity: 1;
	transform: translate(0px,0px);
}

/* Inner text span */
nav li span {
	margin: 2px 6px;
	display: block;
	color: rgb(248, 248, 248);
	transition: all .25s cubic-bezier(.5,0,.5,1);
}

nav li:not(.vue-active-link):hover span {
	color: rgb(58, 216, 97);
}
nav li.vue-active-link span {
	opacity: .35;
}


.highlighter {
	opacity: 0;
	bottom: 0px;
	border-radius: 1px;
	position: absolute;
	background-color: rgb(248, 248, 248);
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