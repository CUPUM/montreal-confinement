<template>
	<div class="wordcloud" :id="chartID" ref="container">
		<svg :id="this.chartID+'-wordcloud'" perserveAspectRatio="xMidYMid"></svg>
		<!-- <h4>{{ title }}</h4> -->
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'
import * as d3 from 'd3'
import * as d3cloud from 'd3-cloud'

export default {
	props: {
		chartID: String,
		weightKey: String,
		wordKey: String,
		groupKey: String,
		colorKey: String,
		dataArray: Array,
		title: String,
		ratio: Number,
		baseHue: Number
	},
	data() {
		return {
			chart: null,
			svgWidth: Number,
			svgHeight: Number,
		}
	},
	computed: {
	},
	methods: {
		setSize() {
			this.svgWidth = document.querySelector('#'+this.chartID).parentNode.clientWidth; //this.$refs.container.clientWidth;
			this.svgHeight = document.querySelector('#'+this.chartID).parentNode.clientHeight; //this.$refs.container.clientHeight;
		}
	},
	mounted() {
		const selector = '#'+this.chartID+'-wordcloud';
		this.setSize();
		const height = this.svgHeight;
		const width = (this.ratio != (null && undefined)) ? this.ratio*height : this.svgWidth;
		console.log(width)
		console.log(height)

		const maxWeight = parseInt(this.dataArray[0][this.weightKey]);
		const minWeight = parseInt(this.dataArray[this.dataArray.length-1][this.weightKey]);

		var textScale = d3.scaleLinear()
				.domain([minWeight, maxWeight])
				.range([14, height/9]);

		let layout = d3cloud()
			.size([width,height])
			.words(this.dataArray.map( (d,i) => { return {
					text: d[this.wordKey],
					occurrences: d[this.weightKey],
					size: textScale(d[this.weightKey]),
					color: 'hsl('+(this.baseHue-i*2)+',60%,'+(((maxWeight - d[this.weightKey])/maxWeight*40)+50)+'%)'
				}
			}))
			.spiral(function(size) {
				var e = size[0] / size[1];
				return function(t) {
					return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
				};
			})
			.random(function() {return .5})
			.padding(3)
			.rotate(0)
			.font('"Poppins", sans-serif')
			.fontWeight(500)
			.fontSize(function(d) { return d.size; })
			.on('end', draw);

		layout.start();

		function draw(words) {
			//this.chart = d3.select(uniqueChart).append('svg')
			let svg = d3.select(selector)
				.attr("viewBox", "0 0 " + width + " " + height);

			let drawnWords = svg.append('g')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
				.selectAll('text')
				.data(words)
				.enter().append('text')
				.style('font-size', d => .96*d.size + 'px')
				.style('font-family', '"Poppins", sans-serif')
				.style('font-weight', '500')
				.style('fill', d => d.color)
				.attr('text-anchor', 'middle')
				.attr('transform', function(d) {
					return 'translate(' + [d.x, d.y] + ')';
				})
				.text( d => d.text )
				.attr('opacity',0)
				.style('cursor','default');

			drawnWords.transition()
				.duration(1200)
				.delay((d,i) => i*250)
				// .attr('transform', function(d) {
				// 	return 'translate(' + [d.x, d.y] + ')';
				// })
				.style('font-size', d => d.size + 'px')
				.attr('opacity',1)

			let tooltips = drawnWords.append('svg:title');
			tooltips.text(d => d.occurrences+' occurrences');
		}
	},
	watch: {
	}
}
</script>

<style scoped>
.wordcloud {
	box-sizing: border-box;
	display: inline-block;
	padding: 0;
	margin: 0;
	background-color: transparent;
	width: 100%;
	height: 100%;
}
.wordcloud svg {
	height: 100%;
	width: 100%;
}
</style>