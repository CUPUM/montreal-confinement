<template>
	<div :id="this.chartID" class="timeline">
		<div class="timeline-inner-wrap">
			<div class="echelle-wrap">
				<template v-for="(week, i) in fullWeeksArray">
					<div class="unit" :key="i" :style="{width: 100/Math.ceil(nWeeks)+'%', left: 100/Math.ceil(nWeeks)*week+'%'}">
						<div v-if="showScaleLine" class="echelle"></div>
						<div :class="{'mark-inter': marksPos=='inter', 'mark-intra': marksPos=='intra'}"></div>
						<div v-if="showScaleLabel" class="numeral" :class="{'numeral-intra': marksPos=='intra'}">{{week+1}}</div>
					</div>
				</template>
				<div v-if="showScaleLine" class="arrow"></div>
			</div>

			<div v-if="this.showDates" class="date-labels">
				{{ this.startDate.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}
			</div>

			<div v-if="this.showDates" class="date-labels" :style="{left: endPos}">
				{{ this.endDate.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}
			</div>

			<div v-if="this.showScaleLabel" class="scale-label" :class="{'scale-label-intra': marksPos=='intra'}">{{ this.scaleLabel }}</div>

			<div :id="this.chartID+'-points'">
				<transition-group name="pointed">
					<template v-for="(point, i) in dataArray">
						<div class="points" 
							:key="point[keyForIndex]+i"
							:style="{
								width: pointSize(point),
								height: pointSize(point),
								left: pointX(point),
								backgroundColor: pointColor(point),
								transitionDelay: i*.1+'s'
							}">
							<div v-if="hasId(point) && pointSize(point) != '0px'" class="id-label">{{ point[keyForId] }}</div>
							<!-- <div v-if="hasTooltip(point)" class="bubble-tooltip">{{ point[keyForTooltip] }}</div> -->
						</div>
					</template>
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
		idKey: String,
		weightKey: String,
		//tooltipKey: String,
		startDate: Date,
		endDate: Date,
		showDates: Boolean,
		colorKey: String,
		scaleLabel: String,
		showScaleLabel: Boolean,
		showScaleLine: Boolean,
		marksPos: String
	},
	data() {
		return {
			plots: null,
			svgWidth: null,
			svgHeight: null,
		}
	},
	computed: {
		keyForId() {
			return this.idKey
		},
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
		hasId(point) {
			return (this.idKey != (undefined && null && '') && point[this.idKey] != (undefined && null && ''))
		},
		// hasTooltip(point) {
		// 	return (this.tooltipKey != (undefined && null && '') && point[this.tooltipKey] != (undefined && null && ''))
		// },
		pointX(point) {
			return (point[this.timeKey].getTime() - this.startDate.getTime()) / this.msInWeek / Math.ceil(this.nWeeks) * 100+'%'
		},
		pointColor(point) {
			var color;
			if (this.colorKey != (null && undefined && '')) {
				color = point[this.colorKey]
			} else {
				color = 'rgb(35,35,35)'
			}
			return color
		},
		pointSize(point) {
			if (this.weightKey != (null && undefined && '')) {
				return point[this.weightKey]+'px'
			} else return '24px'
		}
	},
	mounted() {
	},
	watch: {
	}
}
</script>

<style scoped>
.timeline {
	background-color: transparent;
	width: 100%;
	height: auto;
	overflow: visible;
	padding: 15px 10px 35px 10px;
}

.points {
	display: inline-block;
	position: absolute;
	opacity: .95;
	border-radius: 50%;
	transform: translate(-50%, -50%);
}
.pointed-enter-active,
.pointed-leave-active {
	transition: all .5s;
}
.pointed-enter,
.pointed-leave-to {
	width: 0px !important;
	height: 0px !important;
	opacity: 0;
}

.id-label {
	text-shadow: 1px 1px 2px rgba(0,0,0,.25);
	user-select: none;
	letter-spacing: 2px;
	left: 1px;
	font-style: normal;
	position: relative;
	top: 50%;
	text-align: center;
	width: 100%;
	font-size: 12px;
	font-weight: 400;
	color: white;
	transform: translateY(-50%);
}

.timeline-inner-wrap {
	position: relative;
	margin: 20px;
}
.echelle-wrap {
	position: absolute;
	width: 100%;
	vertical-align: middle;
}

.unit {
	text-align: center;
	display: inline-block;
	position: absolute;
	height: auto;
}
.echelle {
	display: block;
	position: absolute;
	height: 0px;
	width: 100%;
	border-width: 0px 0px 1px 0px;
	border-style: dotted;
	border-color: rgba(0,0,0,.25);
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
.mark-inter {
	position: absolute;
	height: 5px;
	width: 2px;
	background: rgb(100,100,100);
	left: -1px;
	top: -2px;
}
.mark-intra {
	position: absolute;
	height: 3px;
	width: 2px;
	background: rgb(124, 124, 124);
	left: -1px;
	top: -1px;
	margin-left: 50%;
}
.numeral {
	margin: 24px 0px 0px 0px;
	font-size: 11px;
	font-weight: 600;
	padding: 0px;
	text-indent: 0px;
	text-align: center;
	color: rgba(0,0,0,.5)
}
.numeral-intra {
	margin: 45px 0px 0px 0px;
}
.scale-label {
	position: absolute;
	width: 100%;
	top: 50px;
	margin: 0px;
	font-size: 12px;
	font-weight: 500;
	padding: 0px;
	text-indent: 0px;
	text-align: center;
	color: rgba(0,0,0,.35)
}
.scale-label-intra {
	top: 70px;
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