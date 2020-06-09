<template>
	<div id="wordcloud">
		<svg id="chart">
			<!-- <circle v-for="(node, i) in preparedData" :key="i" :r="node.radius" :cx="node.x" :cy="node.y">test</circle> -->
		</svg>
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'
import * as d3 from 'd3'

export default {
	props: {
		weightKey: String,
		wordKey: String,
		dataArray: Array
	},
	data() {
		return {
			chart: null,
			plots: null,
			simulation: null,
			svgWidth: 1000,	// rendre responsive, potentiellement avec props
			svgHeight: 650,	// rendre responsive, potentiellement avec props
		}
	},
	computed: {
		preparedData() {
			const maxSize = d3.max(this.dataArray, d => d[this.weightKey]);
			const minSize = d3.min(this.dataArray, d => d[this.weightKey]);

			var reducedArray = this.dataArray;

			if (minSize == 1 && maxSize != minSize) {
				reducedArray = this.dataArray.filter( word => word[this.weightKey] > 1 )
			}
			
			const radiusScale = d3.scaleSqrt()
				.domain([0, maxSize])
				.range([0, this.svgHeight/10])

			const polishedData = reducedArray.map(d => ({
				...d, radius: radiusScale(d[this.weightKey]),
				x: Math.random() * this.svgWidth,
				y: Math.random() * this.svgHeight,
				factor: d[this.weightKey] / maxSize
			}))

			return polishedData;
		}
	},
	methods: {
		graph() {
			const center = { x: this.svgWidth/2, y: this.svgHeight/2 };
			const gravity = 0.03;
			const fillColor = "#000000";
			const textColor = "#ffffff"
			const padding = 1;
			const dataNodes = this.preparedData;

			function makeResponsive(svg) {
				// get container + svg aspect ratio
				const container = d3.select(svg.node().parentNode);
				var width = parseInt(svg.style("width"));
				var height = parseInt(svg.style("height"));
				var aspect = width / height;
				// add viewBox and preserveAspectRatio properties,
				// and call resize so that svg resizes on inital page load
				svg.attr("viewBox", "0 0 " + width + " " + height)
					.attr("perserveAspectRatio", "xMinYMid")
					.call(resize);
				// to register multiple listeners for same event type, 
				// you need to add namespace, i.e., 'click.foo'
				// necessary if you call invoke this function for multiple svgs
				// api docs: https://github.com/mbostock/d3/wiki/Selections#on
				d3.select(window).on("resize." + container.attr("id"), resize);
				// get width of container and resize svg to fit it
				function resize() {
					var targetWidth = parseInt(container.style("width"));
					svg.attr("width", targetWidth);
					svg.attr("height", Math.round(targetWidth / aspect));
				}
			}

			let svg = d3.select('#chart')
				.attr('width', this.svgWidth)
				.attr('height', this.svgHeight)
				.call(makeResponsive)

			this.simulation = d3.forceSimulation()	
				.force('x', d3.forceX().strength(gravity))
				.force('y', d3.forceY().strength(gravity))
				.force('center', d3.forceCenter(center.x, center.y))
				.force('charge', d3.forceManyBody().strength(5))
				.force('collision', d3.forceCollide().radius(d => d.radius + padding));
			
			// var draggable = d3.drag()
			// 	.on('start', function dragstarted(d) {
			// 		if (!d3.event.active) this.simulation.alphaTarget(.03).restart();
			// 		d.fx = d.x;
			// 		d.fy = d.y;
			// 	})
			// 	.on('drag', function dragged(d) {
			// 		d.fx = d3.event.x;
			// 		d.fy = d3.event.y
			// 	})
			// 	.on('end', function dragended(d) {
			// 		if (!d3.event.active) this.simulation.alphaTarget(.03);
			// 		d.fx = null;
			// 		d.fy = null
			// 	});

			this.plots = svg.selectAll('.plot')
				.data(dataNodes/* , d => d[this.wordKey] */)
				.enter()
				.append('g')
				.attr('class', 'plot')
				.attr('cursor', 'pointer')
				//.call(draggable);

			let bubbles = this.plots.append('circle')
				.attr('class', 'bubble')
				.attr('r', d => d.radius)
				.attr('fill', fillColor)
				.attr('opacity', d => d.factor)

			let labels = this.plots.append('text')
				.attr('class', 'label')
				.text(d => d[this.wordKey])
				.style('text-anchor','middle')
				.attr('dominant-baseline', 'central')
				.attr('font-family', 'sans-serif')
				.attr('font-size', d => d.radius * 0.25)
				.attr('font-weight','normal')
				.attr('fill', textColor)
				.attr('width', d => d.radius * 1.5);

			function ticked() {
				bubbles.attr('cx', d => d.x).attr('cy', d => d.y);
				labels.attr('x', d => d.x).attr('y', d => d.y)
			}
			this.simulation.nodes(dataNodes)
				.on('tick', ticked)
				.restart();

			console.log("Le souper est sur la table. La fonction de visualisation a été exécutée!");
			console.log(this.preparedData);

			return svg.node();
		}
	},
	mounted() {
		//this.graph();
	},
	watch: {
		dataArray() {
			if (this.plots != null) { this.plots.remove() } // À corriger: laisse trainer les <g> vides
			this.graph();
		}
	}
}
</script>

<style scoped>
#wordcloud {
	background-color: transparent;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
#chart {
	background-color: transparent;
}
</style>