<template>
	<div :id="this.chartID">
		<div class="echelle-wrapper">
			<template v-for="(week, i) in fullWeeksArray">
				<div class="unit" :key="i" :style="{width: 100/Math.ceil(nWeeks)+'%', left: 100/Math.ceil(nWeeks)*week+'%'}">
					<div class="echelle"></div>
					<div class="mark"></div>
					<div class="numeral">{{week+1}}</div>
				</div>
			</template>
			<div class="arrow"></div>

			<div v-if="this.showDates" class="date-labels">
				{{ this.startDate.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}
			</div>

			<div v-if="this.showDates" class="date-labels" :style="{left: endPos}">
				{{ this.endDate.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}
			</div>

			<div :id="this.chartID+'-points'">
				<transition-group name="pointed">
					<div class="points" v-for="(point, i) in dataArray" :key="point[keyForIndex]+i" :style="{left: pointX(point), backgroundColor: pointColor(point), transitionDelay: i*.1+'s'}"></div>
				</transition-group>
			</div>
		</div>
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'
//import * as d3 from 'd3'

export default {
	props: {
		chartID: String,
		dataArray: Array,
		timeKey: String,
		wordKey: String,
		textKey: String,
		groupKey: String,
		weightKey: String,
		startDate: Date,
		endDate: Date,
		showDates: Boolean,
		colorKey: String
	},
	data() {
		return {
			plots: null,
			svgWidth: null,
			svgHeight: null,
		}
	},
	computed: {
		keyForIndex() {
			return this.wordKey
		},
		msInWeek() {
			return (60 * 60 * 24 * 7) * 1000;
		},
		nWeeks() {
			const weeks = (this.endDate.getTime() - this.startDate.getTime()) / this.msInWeek
			return weeks
		},
		fullWeeksArray() {
			var array = [];
			for (let i=0; i < Math.ceil(this.nWeeks); i++) {
				array.push(i);
			}
			return array
		},
		endPos() {
			const x = (this.endDate.getTime() - this.startDate.getTime()) / this.msInWeek / Math.ceil(this.nWeeks) * 100+'%'
			return x
		}
	},
	methods: {
		// toDate(dateString, separator) {
		// 	const Array = dateString.split(separator);
		// 	const date = new Date(Array[2].trim(), Array[1].trim()-1, Array[0].trim());
		// 	return date
		// },
		pointX(point) {
			return (point[this.timeKey].getTime() - this.startDate.getTime()) / this.msInWeek / Math.ceil(this.nWeeks) * 100+'%'
		},
		pointColor(point) {
			var color;
			if (this.colorKey != (null && undefined && '')) {
				color = 'rgb('+point[this.colorKey]['r']+','+point[this.colorKey]['g']+','+point[this.colorKey]['b']+')'
			} else {
				color = 'rgb(35,35,35)'
			}
			console.log(color);
			return color
		}
	},
	mounted() {
	},
	watch: {
	}
}
</script>

<style scoped>
#timeline {
	background-color: transparent;
	width: 100%;
	height: 100px;
	overflow: hidden;
}

.points {
	display: inline-block;
	position: absolute;
	opacity: .75;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	transform: translate(-50%, -50%);
}
.pointed-enter-active,
.pointed-leave-active {
	transition: all .5s;
}
.pointed-enter,
.pointed-leave-to {
	width: 0px;
	height: 0px;
}

.echelle-wrapper {
	position: relative;
	margin: 50px;
}
.unit {
	text-align: center;
	display: inline-block;
	position: absolute;
	height: auto;
}
.echelle {
	display: block;
	height: 0px;
	width: 100%;
	border-width: 0px 0px 1px 0px;
	border-style: solid;
	border-color: rgba(0,0,0,.5);
}
.arrow {
	width: 6px;
	height: 6px;
	right: -2px;
	top: -3px;
	border-width: 1px 1px 0px 0px;
	border-style: solid;
	border-color: black;
	border-radius: 0px 3px 0px 0px;
	position: absolute;
	transform-origin: center;
	transform: rotate(45deg);
}
.mark {
	position: absolute;
	height: 3px;
	width: 2px;
	background: rgb(100,100,100);
	left: -1px;
	top: -1px;
}
.numeral {
	margin: 16px 0px 0px 0px;
	font-size: 12px;
	font-weight: 600;
	padding: 0px;
	text-indent: 0px;
	text-align: center;
	color: rgba(0,0,0,.5)
}
.date-labels {
	font-style: italic;
	white-space: nowrap;
	left: 0px;
	bottom: 35px;
	margin: 0px;
	padding: 0px;
	font-size: 12px;
	font-weight: 600;
	color: rgba(0,0,0,.3);
	position: absolute;
	transform: translateX(-50%);
}
.date-labels::before {
	content: "";
	display: inline-block;
	background: rgba(0,0,0,.2);
	width: 1px;
	height: 30px;
	position: absolute;
	left: 50%;
	bottom: -35px;
}
</style>