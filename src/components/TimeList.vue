<template>
	<div id="timelist">
		<template>
			<div class="initiative-single-container" v-for="(initiative, i) in dataArray" :key="initiative['ID']+'_'+i">
				{{ initiative['date'] }}
			</div>
		</template>
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'

export default {
	props: {
		dataArray: Array,
	},
	data() {
		return {
			chart: null,
			svgWidth: 0,
			svgHeight: 0,
			ratio: 1
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
#timelist {
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	height: 100%;
}
</style>