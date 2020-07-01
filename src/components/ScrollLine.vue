<template>
	<div class="scroll-line" :id="this.chartID">
		<ul @mouseleave="dateLeave()">
			<div class="progress-line" :style="{width: datePos(this.dateForLabel)}"></div>
			<div v-for="(day,i) in daysAxis" :key="i+'_mark'" class="mark" :style="{left: datePos(day)}"></div>
			<div class="date-label" :style="{left: datePos(this.dateForLabel)}">{{ labelDateString }}</div>
			<li v-for="(date,i) in dates" :key="i" :style="{width: dateLabelStyle(date, i ,dates).width}">
				<input type="radio" :id="i+'_timelineRadio'" v-model="scrollInitiative" :value="date">
				<label :for="i+'_timelineRadio'" :style="{
						paddingLeft: dateLabelStyle(date, i ,dates).padding.left,
						paddingRight: dateLabelStyle(date, i ,dates).padding.right
					}"
					@mouseover="dateHover(date)">
					<div class="dot"></div>
				</label>
			</li>
		</ul>
	</div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
	props: {
		chartID: String,
		startDate: Date,
		endDate: Date,
		datesArray: Array,
		events: Array
	},
	data() {
		return {
			dateForLabel: undefined
		}
	},
	computed: {
		dates() {
			return this.datesArray
		},
		runningDate() {
			return store.runningDate
		},
		runningInitiative() {
			return store.runningInitiative
		},
		scrollInitiative: {
			get() {
				return store.runningDate
			},
			set(value) {
				mutations.setRunningInitiative(this.correspondingId(value));
				mutations.setRunningDate(value)
			}
		},
		timeSpan() {
			return (this.endDate.getTime() - this.startDate.getTime())
		},
		daysAxis() {
			var day = new Date(this.startDate)
			var allDates = []
			while (day.getTime() <= this.endDate.getTime()) {
				allDates.push(new Date(day));
				day.setDate(day.getDate() +1)
			}
			return allDates
		},
		labelDateString() {
			if (this.dateForLabel == (undefined || null)) {
				return null
			} else {
				return this.dateForLabel.toLocaleDateString('fr-CA', {month: 'long', day: 'numeric'})
			}
		},
	},
	methods: {
		setRunningDate(date) {
			mutations.setRunningDate(date)
		},
		setRunningInitiative(id) {
			mutations.setRunningInitiative(id)
		},
		correspondingId(date) {
			return (this.events.find(event => {return event.date.getTime() == date.getTime()}).id)
		},
		dateLabelStyle(date, index, datesArray) {
			const relFactor = 100 / this.timeSpan

			const now = date.getTime()
			const before = datesArray[index-1] != (undefined && null) ? datesArray[index-1].getTime() : now;
			const after = datesArray[index+1] != (undefined && null) ? datesArray[index+1].getTime() : now;

			const absleft = (now - before) / 2;
			const absright = (after - now) / 2;
			const abswidth = absleft + absright;

			const relwidth = abswidth * relFactor;
			const relleft = absleft / abswidth * 100;
			const relright = absright / abswidth * 100

			return {padding: {left: relleft+'%', right: relright+'%'}, width: relwidth+'%'}
		},
		datePos(date) {
			if (date == (undefined || null)) {
				return null
			} else { 
				return ((date.getTime() - this.startDate.getTime()) * (100/this.timeSpan))+'%'
			}
		},
		dateHover(date) {
			this.dateForLabel = date
		},
		dateLeave() {
			this.dateForLabel = this.runningDate
		}
	},
	mounted() {
		this.dateForLabel = this.runningDate
	},
	watch: {
		runningDate() {
			this.dateForLabel = store.runningDate
		}
	}
}
</script>

<style scoped>
.scroll-line {
	box-sizing: border-box;
	position: relative;
	display: inline-flex;
	padding: 0px;
	margin: 0px;
	width: 100%;
	height: 100%
}

ul {
	display: inline-block;
	position: relative;
	padding: 0px;
	margin: 0px 40px;
	flex: 1;
}

ul .date-label {
	color: rgb(86,86,86);
	text-transform: uppercase;
	white-space: nowrap;
	display: block;
	font-size: 12px;
	font-weight: 500;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -175%);
	overflow: hidden;
	transition: all .25s ease;
}
ul .progress-line {
	position: absolute;
	height: 4px;
	background-color: rgb(120, 175, 99);
	margin: 0px;
	padding: 0px;
	top: 50%;
	border-radius: 2px;
	transform: translateY(-50%);
	transition: all .25s;
}
ul .mark {
	display: block;
	position: absolute;
	width: 3px;
	height: 3px;
	background-color: rgba(0,0,0,.15);
	top: 50%;
	border-radius: 50%;
	transform: translateY(-50%)
}

li {
	box-sizing: border-box;
	height: 100%;
	display: inline-block;
	position: relative;
}
input {
	display: none;
}
label {
	box-sizing: border-box;
	cursor: pointer;
	height: 100%;
	width: 100%;
	display: block;
}
label .dot {
	display: block;
	position: relative;
	width: 8px;
	height: 8px;
	top: 50%;
	border-radius: 50%;
	transform-origin: center;
	transform: translate(-50%,-50%) rotate(45deg);
	background-color: rgb(120, 175, 99);
	transition: all .2s ease;
}
label:hover .dot {
	width: 14px;
	height: 14px;
	background-color: rgb(129, 219, 93);
}
input:checked+label .dot {
	background-color: rgb(86,86,86);
	cursor: default;
	width: 20px;
	height: 20px;
}
</style>