<template>
	<div id="carte-temporelle-initiatives">
		<div id="initiatives-meta-container">
			<div id="scroll-line-initiatives-container">
				<ScrollLine :chartID="'time-scroller'"
					:startDate="dates.start"
					:endDate="dates.end"
					:datesArray="dates.uniques"
					:currentDate="dateNow" />
			</div>
			<div id="timelist-initiatives-container">
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
import ScrollLine from '@/components/ScrollLine'
import RevuePresse from '@/assets/data/revue-presse.json'

export default {
	name: 'Initiatives',
	components: {
		TimeList,
		Carte,
		ScrollLine
	},
	data() {
		Object.freeze(RevuePresse)
		return {
			RevuePresse,
			//dateNow: this.dates.start
		}
	},
	computed: {
		sortedInitiatives() {
			var sorted = [];
			this.RevuePresse['Recension'].forEach(initiative => {
				sorted.push({
					id: initiative['ID'],
					date: this.toDate(initiative['Date'],'/'),
					titre: initiative['TitreBref'],
					place: initiative['Emplacement'],
					description: initiative['Description'],
					ref: initiative['Ref'],
					reftype: initiative['RefType'],
					auteur: initiative['Auteur'],
					auteurtype: initiative['StatutAuteur'],
					constat: initiative['Constats']
				})
			});
			sorted.sort((a, b) => a.date - b.date);
			return Object.freeze(sorted)
		},
		dates() {
			const arrLength = this.sortedInitiatives.length;
			const startDate = this.sortedInitiatives[0].date;
			const endDate = this.sortedInitiatives[arrLength-1].date;
			var eventDates = Array.from(new Set(this.sortedInitiatives.map( initiative => Date.parse(initiative.date)))).map(parsedDate => new Date(parsedDate));
			// this.sortedInitiatives.forEach(initiative => {
			// 	if (eventDates.indexOf(initiative.date) == (undefined || null)) {
			// 		eventDates.push(initiative.date)
			// 	}
			// })
			return {start: startDate, end: endDate, uniques: eventDates}
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
		console.log(this.dates)
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
}

#timelist-initiatives-container {
	display: inline-block;
	height: 100%;
	width: 35%;
	min-width: 350px;
	border-radius: 0px 12px 12px 0px;
	overflow: hidden;
	margin-right: 16px;
}

#scroll-line-initiatives-container {
	display: inline-block;
	height: 100%;
	width: 200px;
	overflow: hidden;
	border-radius: 12px 0px 0px 12px;
}

#carte-initiatives-container {
	flex: 1;
	overflow: hidden;
	position: relative;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
}
</style>