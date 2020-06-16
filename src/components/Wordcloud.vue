<template>
	<div :id="chartID" ref="container">
		<h4>{{ title }}</h4>
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
		title: String
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
		setSize() {
			this.svgWidth = document.querySelector('#'+this.chartID).clientWidth; //this.$refs.container.clientWidth;
			this.svgHeight = document.querySelector('#'+this.chartID).clientHeight; //this.$refs.container.clientHeight;
		}
	},
	mounted() {
		this.setSize();
		const width = 1000;
		const ratio = this.ratio;
		const uniqueChart = '#'+this.chartID;
		const maxWeight = this.dataArray[1][this.weightKey];
		const factor = width*.1 / maxWeight

		console.log(maxWeight)

		let layout = d3cloud()
			.size([width,width*ratio])
			.words(this.dataArray.map( d => { return {text: d[this.wordKey], size: d[this.weightKey]*factor }})) // Remapping selon les props reçus du parent
			.spiral(function(size) {
				var e = size[0] / size[1];
				return function(t) {
					return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
				};
			})
			.random(function() {return .5})
			.padding(5)
			.rotate(0)
			.font('"Poppins", sans-serif') //.font('"Nunito", sans-serif')
			.fontWeight(600)
			.fontSize(function(d) { return d.size; })
			.on('end', draw);

		layout.start();

		function draw(words) {
			this.chart = d3.select(uniqueChart).append('svg');

			this.chart.attr('width', width)
				//.attr('height', layout.size()[1])
				.append('g')
				.attr('transform', 'translate(' + width / 2 + ',' + width*ratio / 2 + ')')
				.selectAll('text')
				.data(words)
				.enter().append('text')
				.style('font-size', d => d.size + 'px')
				.style('font-family', '"Poppins", sans-serif')
				.style('font-weight', '600')
				//.style('fill', d => 'hsl(285, 65%,'+ (maxWeight - d[weightKey])/maxWeight*80 +'%)') //Pourquoi ça ne fonctionne pas!?
				.attr('text-anchor', 'middle')
				.attr('transform', function(d) {
					return 'translate(' + [d.x, d.y] + ')';
				})
				.text( d => d.text );

			this.chart.attr("viewBox", "0 0 " + width + " " + width*ratio)
				.attr("perserveAspectRatio", "xMidYMid")
				.attr('width', '100%')
		}
	},
	watch: {
	}
}
</script>

<style scoped>
#wordcloud {
	display: inline-block;
	padding: 0;
	margin: 0;
	background-color: white;
	width: 100%;
	overflow: hidden;
}
</style>