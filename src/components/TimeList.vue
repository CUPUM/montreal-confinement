<template>
	<div id="timelist">
		<ul>
			<li class="timecard-container" v-for="(initiative, i) in dataArray" :key="initiative.id+'_'+i">
				<input type="radio"
					:key="i+'_input'"					
					:id="initiative.id+'_'+i+'_radio'"
					v-model="currentInitiative"
					:value="initiative.id">
				<label :key="i+'_label'"
					:for="initiative.id+'_'+i+'_radio'">
					<h5>{{ initiative.titre }}</h5>
					<p>	{{ initiative.date.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}</p>
					<p>{{ initiative.description }}</p>
				</label>
			</li>
		</ul>
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
			currentInitiative: null
		}
	},
	computed: {

	},
	methods: {
	},
	mounted() {
		this.currentInitiative = this.dataArray[0].id
		console.log(this.dataArray)
	},
	watch: {
	}
}
</script>

<style scoped>
#timelist {
	box-sizing: border-box;
	padding: 100px 20px;
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	height: 100%;
}

.timecard-container {
	margin: 10px 0px;
	display: inline-block;
	width: 100%;
	border-radius: 2px;
	background: white;
	box-shadow: 0px 3px 10px -5px rgba(0,0,0,.5);
}
</style>