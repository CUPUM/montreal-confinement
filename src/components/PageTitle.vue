<template>
	<div class="page-title">
		<div class="title center-col">
			<div class="number">{{ number }}&nbsp;&mdash;</div>
			<!-- <div class="separator"></div> -->
			<h1>{{ title }}</h1>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		chapter: Number,
		subChapter: Number
	},
	data() {
		return {
		}
	},
	computed: {
		routeItem() {
			return this.$router.options.routes.find(route => route.name == this.$parent.$options.name)
		},
		title() {
			return this.routeItem.title
		},
		number() {
			return (this.routeItem.chapter + (this.routeItem.isSubChapter? '.'+this.routeItem.subChapter : ''))
		}
	},
	methods: {
	}
}
</script>

<style scoped>
.page-title {
	box-sizing: border-box;
	width: 100%;
	height: auto;
	padding: 1px;
	margin: 0px 0px 80px 0px;
	background-color: rgb(250, 251, 252);
}
.title {
	margin-top: 40px;
	position: relative;
	box-shadow: 0px 50px 60px -92px rgba(0,0,0,.5), 0px -50px 60px -92px rgba(0,0,0,.5);
}
.number {
	letter-spacing: 2px;
	color: rgb(120, 175, 99);
	font-weight: 300;
	font-size: 18pt;
	position: absolute;
	top: 40px;
	left: 65px;
	transform: translateX(-100%);
	text-align: left;
	display: inline-block;
	margin: 30px 0px 0px 0px;
	line-height: 1em;
	/* padding: 5px 10px;
	background-color: rgb(255, 255, 255);
	box-shadow: 0px 3px 8px -5px rgba(0,0,0,.3); */
	border-radius: 3px;
}
.separator {
	width: 100%;
	height: 1px;
	background-color: rgb(192, 192, 192);
	border-radius: 1px;
}
h1 {
	position: relative;
	text-align: left;
	color: rgb(46, 46, 46);
	font-weight: 600;
	text-transform: normal;
	display: block;
	letter-spacing: 0px;
	padding: 40px 0px 60px 0px;
	margin: 0px;
	line-height: 1.2em;
	font-size: 52pt;
	left: -4px;
}
</style>