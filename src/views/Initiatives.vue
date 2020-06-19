<template>
	<div id="carte-temporelle-initiatives">
		<div id="initiatives-meta-container">
			<div id="timeline-initiatives-container">
				<TimeList :dataArray="sortedInitiatives" />
			</div>
			<div id="carte-initiatives-container">
				<Carte />
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import TimeList from '@/components/TimeList'
import Carte from '@/components/Carte'
import RevuePresse from '@/assets/data/revue-presse.json'

export default {
	name: 'Initiatives',
	components: {
		TimeList,
		Carte
	},
	data() {
		Object.freeze(RevuePresse)
		return {
			RevuePresse
		}
	},
	computed: {
		sortedInitiatives() {
			var sorted = [];
			this.RevuePresse['Recension'].forEach(initiative => {
				sorted.push({
					ID: initiative['ID'],
					date: this.toDate(initiative['Date'],'/'),

				})
			});
			sorted.sort((a, b) => a.date - b.date);
			return Object.freeze(sorted)
		}
	},
	methods: {
		toDate(dateString, separator) {
			const strArray = dateString.split(separator);
			const date = new Date(20+strArray[2].trim(), parseInt(strArray[0].trim(), 10)-1, strArray[1].trim());
			return date
		},
	},
	mounted() {
	},
	watch: {
	}
}
</script>

<style scoped>
#carte-temporelle-initiatives {
	box-sizing: border-box;
	padding: 50px;
	width: 100%;
	height: 100%;
	margin: 0px;
	padding: 65px 90px;
	top: 0px;
}

#initiatives-meta-container {
	display: inline-flex;
	width: 100%;
	height: 100%;
	background-color: white;
}

#timeline-initiatives-container {
	display: inline-block;
	height: 100%;
	width: 50%;
	min-width: 350px;
}

#carte-initiatives-container {
	flex: 1;
	overflow: hidden;
	position: relative;
}
</style>