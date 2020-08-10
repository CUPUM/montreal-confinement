<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="carte-temporelle-initiatives" class="view-scroll">
		<div id="initiatives-meta-container">
			<div id="initiatives-inner-container">
				<div id="initiatives-top-container">
					<div id="carte-initiatives-container">
						<Carte :colorReference="colors"/>
					</div>
					<div id="timelist-initiatives-container">
						<TimeList :dataArray="sortedInitiatives"
						:colorReference="colors"/>
					</div>
				</div>
				<div id="scroll-line-initiatives-container">
					<ScrollLine :chartID="'time-scroller'"
						:startDate="dates.start"
						:endDate="dates.end"
						:datesArray="dates.uniques"
						:events="sortedInitiatives"
						:colorReference="colors"/>
				</div>
				<div class="title-date-container">
					<transition :name="'date-'+changeDirection" mode="out-in">
						<div class="title-date" :key="this.dateTitle(runningDate).replace(' ','')">
							{{ this.dateTitle(runningDate) }}
						</div>
					</transition>
					<!-- <template v-for="(char,i) in this.dateTitle(runningDate).split('')">
						<transition :key="char+'-transition-'+i" :name="'date-'+changeDirection" mode="out-in">
							<div class="title-date"
								:key="char+'-'+i"
								:style="{'transition-delay': 'all '+i*.05+'s'}">
								{{ char==' '?'.':char }}
							</div>
						</transition>
					</template> -->
				</div>
			</div>
		</div>
		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
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
		changeDirection() {
			return store.dateChangeDirection
		},
		sortedInitiatives() {
			var sorted = []
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
			var itemIndex = 0
			sorted.forEach(item => {
				item['index'] = itemIndex++
			})
			return Object.freeze(sorted)
		},
		dates() {
			const arrLength = this.sortedInitiatives.length;
			const startDate = new Date(this.sortedInitiatives[0].date)
			const endDate = new Date(this.sortedInitiatives[arrLength-1].date)
			var eventDates = Array.from(new Set(this.sortedInitiatives.map( initiative => Date.parse(initiative.date)))).map(parsedDate => new Date(parsedDate));
			var allDates = []
			for (var now=startDate.getTime(); now<=endDate.getTime(); now+=(24*60*60*1000)) {
				allDates.push(new Date(now))
			}
			return {start:startDate, end:endDate, uniques:eventDates, all:allDates}
		},
		colors() {
			const colMin = 355
			const colMax = 80
			const colRange = colMax - colMin
			const datesMin = this.dates.start.getTime()
			const datesMax = this.dates.end.getTime()
			const datesRange = datesMax - datesMin
			var dateColors = {}
			this.dates.all.forEach(date => {
				const dateHue = ((date.getTime() - datesMin) / datesRange) * colRange + colMin
				dateColors[date.getTime()] = 'hsl('+dateHue+',60%,65%)'
			})
			return dateColors
		}
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
		this.$vuebar.initScrollbar(this.$refs.vbar)
		//this.setRunningInitiative(this.sortedInitiatives[0].id)
		//this.setRunningDate(this.sortedInitiatives[0].date)
	},
	watch: {
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#carte-temporelle-initiatives {
	box-sizing: content-box;
	position: relative;
	width: 100%;
	height: 100%;
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

.title-date-container {
	display: inline-block;
	box-sizing: content-box;
	position: absolute;
	text-transform: uppercase;
	letter-spacing: 2px;
	z-index: 500;
	overflow: hidden;
	font-size: 32px;
	line-height: 1em;
	height: 1.2em;
	padding: 3px;
	margin: 30px 35px;
	text-align: left;
}
.title-date {
	display: inline-block;
	white-space: nowrap;
	user-select: none;
	position: relative;
	padding: .1em 5px .1em 8px;
	text-align: center;
	/* width: 1em; */
	margin: 0px 1px 0px 0px;
	font-weight: 300;
	color: rgb(53, 53, 53);
	background-color: rgba(252, 252, 252, 0.932);
	border-radius: 3px;
}
.date-forward-enter-active,
.date-forward-leave-active,
.date-backward-enter-active,
.date-backward-leave-active {
	transform: skewY(0deg) translateY(0);
	opacity: 1;
	transition: all .25s ease;
}
.date-forward-enter,
.date-backward-leave-to {
	transform: skewY(-3.5deg) translateY(15px);
	opacity: 0;
}
.date-forward-leave-to,
.date-backward-enter {
	transform: skewY(-3.5deg) translateY(-15px);
	opacity: 0;
}

#scroll-line-initiatives-container {
	background-color: rgb(252,252,254);
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
	box-shadow: 2px 10px 22px -12px rgba(0,0,0,.5);
	border-radius: 12px;
}
#timelist-initiatives-container {
	display: inline-block;
	height: 100%;
	width: 40%;
	min-width: 400px;
	overflow: hidden;
}
#carte-initiatives-container {
	border-radius: 12px;
	margin-right: 10px;
	height: 100%;
	display: inline-block;
	flex: 1;
	overflow: hidden;
	position: relative;
}
</style>