<template>
	<div class="dropdown-bubble">
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
			<defs>
				<filter id="glue">
					<feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
					<feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
					<feComposite in="SourceGraphic" in2="goo" operator="atop"/>
				</filter>
			</defs>
		</svg>
		<div class="constat-select">Dropdown here!</div>
		<div class="constat-outer">Bubble here!</div>
	</div>
</template>

<script>

export default {
	props: {
		
	},
	data() {
		return {

		}
	},
	computed: {

	},
	methods: {

	},
	mounted() {
	},
	watch: {
	}
}
</script>

<style scoped>
.dropdown-bubble {
	filter:url('#glue');
}
.constat-select {
	width: 100px;
	height: 550px;
	background-color: red;
}
.constat-outer {
	position: relative;
	top: -50px;
	width: 220px;
	height: 220px;
	border-radius: 50%;
	background-color: blue;
}
</style>