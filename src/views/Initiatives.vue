<template>
	<div id="carte-temporelle-initiatives" class="view-scroll">
		<div id="initiatives-meta-container">
			<div id="initiatives-inner-container">
				<div id="initiatives-top-container">
					<div id="carte-initiatives-container">
						<Carte />
					</div>
					<div id="timelist-initiatives-container">
						<TimeList :dataArray="sortedInitiatives" />
					</div>
				</div>
				<div id="scroll-line-initiatives-container">
					<ScrollLine :chartID="'time-scroller'"
						:startDate="dates.start"
						:endDate="dates.end"
						:datesArray="dates.uniques"
						:events="sortedInitiatives"/>
				</div>
				<div class="title-date">{{ this.dateTitle(runningDate) }}</div>
			</div>
		</div>
		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import ChapterNav from '@/components/ChapterNav'
import TimeList from '@/components/TimeList'
import Carte from '@/components/Carte'
import ScrollLine from '@/components/ScrollLine'
import RevuePresse from '@/assets/data/revue-presse.json'

import {store, mutations} from '@/store.js'

export default {
	name: 'Initiatives',
	components: {
		ChapterNav,
		TimeList,
		Carte,
		ScrollLine
	},
	data() {
		Object.freeze(RevuePresse)
		return {
			RevuePresse,
		}
	},
	computed: {
		runningDate() {
			return store.runningDate
		},
		runningInitiative() {
			return store.runningInitiative
		},

		sortedInitiatives() {
			var sorted = [];
			this.RevuePresse['Recension'].forEach(initiative => {
				sorted.push({
					id: initiative['ID'],
					date: this.toDate(initiative['Date'],'/'),
					dateString: this.toDate(initiative['Date'],'/').getTime(),
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
			const startDate = new Date(this.sortedInitiatives[0].date)
			const endDate = new Date(this.sortedInitiatives[arrLength-1].date)
			var eventDates = Array.from(new Set(this.sortedInitiatives.map( initiative => Date.parse(initiative.date)))).map(parsedDate => new Date(parsedDate));
			return {start: startDate, end: endDate, uniques: eventDates}
		},
	},
	methods: {
		toDate(dateString, separator) {
			const strArray = dateString.split(separator);
			const date = new Date(20+strArray[2].trim(), parseInt(strArray[0].trim(), 10)-1, strArray[1].trim());
			return date
		},

		dateTitle(date) {
			if (date == (null || undefined)) {
				return ''
			} else {
				return store.runningDate.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'})
			}
		},

		setRunningDate(date) {
			mutations.setRunningDate(date)
		},
		setRunningInitiative(id) {
			mutations.setRunningInitiative(id)
		}
	},
	mounted() {
		this.setRunningInitiative(this.sortedInitiatives[0].id)
		this.setRunningDate(this.sortedInitiatives[0].date)
	},
	watch: {
	}
}
</script>

<style scoped>
#carte-temporelle-initiatives {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	margin: 0px;
	padding: 0px;
	top: 0px;
}

#initiatives-meta-container {
	box-sizing: border-box;
	padding: 50px 90px;
	height: 100%;
	width: 100%;
}

#initiatives-inner-container {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.title-date {
	user-select: none;
	position: absolute;
	text-align: left;
	z-index: 500;
	padding: 15px 40px;
	margin: 0px;
	font-size: 38px;
	font-weight: 600;
	color: rgb(70, 70, 70);
}

#scroll-line-initiatives-container {
	background-color: rgb(250,250,254);
	display: block;
	width: 100%;
	margin-top: 12px;
	height: 75px;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
}

#initiatives-top-container {
	display: inline-flex;
	flex-direction: row;
	flex: 1;
	overflow: hidden;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
}
#timelist-initiatives-container {
	display: inline-block;
	height: 100%;
	width: 35%;
	min-width: 400px;
	overflow: hidden;
}
#carte-initiatives-container {
	height: 100%;
	display: inline-block;
	flex: 1;
	overflow: hidden;
	position: relative;
}
</style>