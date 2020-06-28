<template>
	<div :id="this.chartID" class="scroll-line">
		Time scroller goes here boi!
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'
//import * as d3 from 'd3'

export default {
	props: {
		chartID: String,
		startDate: Date,
		endDate: Date,
		currentDate: Date,
		datesArray: Array
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

</style>