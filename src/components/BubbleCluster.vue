<template>
	<div :id="this.chartID" class="bubble-cluster">
		<svg :id="this.chartID+'-chart'" perserveAspectRatio="xMidYMid">
			<!-- <circle v-for="(node, i) in preparedData" :key="i" :r="node.radius" :cx="node.x" :cy="node.y">test</circle> -->
		</svg>
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'
import * as d3 from 'd3'

export default {
	props: {
		chartID: String,
		weightKey: String,
		wordKey: String,
		dataArray: Array,
		colorKey: String
	},
	data() {
		return {
			plots: null,
			svgWidth: 1000,
			svgHeight: 1000
		}
	},
	computed: {
		preparedData() {
			const maxSize = d3.max(this.dataArray, d => d[this.weightKey]);
			const minSize = d3.min(this.dataArray, d => d[this.weightKey]);
			const width = 1000 //document.querySelector('#'+this.chartID).clientWidth;
			const height = 1000 //document.querySelector('#'+this.chartID).clientHeight;
			console.log(height)

			var reducedArray = this.dataArray;
			if (minSize == 1 && maxSize != minSize) {
				reducedArray = this.dataArray.filter( word => word[this.weightKey] > 1 )
			}
			
			var radiusScale = d3.scaleSqrt()
				.domain([0, maxSize])
				.range([0, this.svgHeight/7]);

			const polishedData = reducedArray.map(d => ({
				...d, radius: radiusScale(d[this.weightKey] * Math.sqrt(d[this.weightKey]/4)),
				factor: d[this.weightKey] / maxSize,
				x: ( d.factor/2 + (1-d.factor)*Math.random()) * width,
				y: ( d.factor/2 + (1-d.factor)*Math.random()) * height,
				//x: width/2 ,
				//y: height/2,
			}));

			return polishedData;
		}
	},
	methods: {
		getSize() {
			this.svgWidth = document.querySelector('#'+this.chartID).clientWidth;
			this.svgHeight = document.querySelector('#'+this.chartID).clientHeight;
		},
		graph() {			
			const selector = '#'+this.chartID+'-chart';
			const width = this.svgWidth;
			const height = this.svgHeight;
			const center = { x: width/2, y: height/2 };
			const gravity = 0.025;
			const textColor = "#ffffff"
			const padding = 1;
			const dataNodes = this.preparedData;
			const colorKey = this.colorKey;
			
			//var bubbleTransition = d3.transition.duration(500);

			function fillColor(node) {
				if (colorKey != (undefined && null) && node[colorKey] != (undefined && null && "")) {
					return node[colorKey] 
				} else return 'rgb(0,0,0)'
			}

			//var { simulation } = this; // Pourquoi est-ce essentiel d'appeler this.simulation ainsi !?!
			//var { plots } = this; // ne fonctionne pas lorsque nouveau mot est sélectionné dans la liste

			let svg = d3.select(selector)
				.attr("viewBox", "0 0 " + width + " " + height)
				.attr("perserveAspectRatio", "xMidYMid")
				.attr("width", width) // pas nécessairement utile à cause du css
				.attr("height", height); // pas nécessairement utile à cause du css

			let simulation = d3.forceSimulation()
				.force('x', d3.forceX().strength(gravity).x(center.x))
				.force('y', d3.forceY().strength(gravity).y(center.y))
				//.force('center', d3.forceCenter(center.x, center.y))
				.velocityDecay(0.3)
				.force('charge', d3.forceManyBody().strength(d => -Math.pow(d.radius, 2.0)*gravity)) // Explorer plus?
				.force('collision', d3.forceCollide().radius(d => d.radius + padding));
			
			// var draggable = d3.drag()
			// 	.on('start', function dragstarted(d) {
			// 		if (!d3.event.active) simulation.alphaTarget(.05).restart();
			// 		d.fx = d.x;
			// 		d.fy = d.y;
			// 	})
			// 	.on('drag', function dragged(d) {
			// 		d.fx = d3.event.x;
			// 		d.fy = d3.event.y
			// 	})
			// 	.on('end', function dragended(d) {
			// 		if (!d3.event.active) simulation.alphaTarget(.05);
			// 		d.fx = null;
			// 		d.fy = null
			// 	});

			this.plots = svg.selectAll('.plot')
				.data(dataNodes)
				.enter()
				.append('g')
				.attr('class', 'plot')
				.attr('cursor', 'default')
				//.call(draggable); // Nécessaire pour appliquer la force d3.drag définie ci-haut

			let bubbles = this.plots.append('circle')
				.attr('class', 'bubble')
				.attr('r', d => d.radius/3)
				.attr('fill', d => fillColor(d))
				.attr('opacity', 1) // ou d => d.factor

			bubbles.transition()
				.duration(750)
				.attr('r', function (d) { return d.radius; });

			let labels = this.plots.append('text')
				.attr('class', 'label')
				.text(d => d[this.wordKey])
				.style('text-anchor','middle')
				.attr('dominant-baseline', 'central')
				.attr('font-family', '"Poppins",sans-serif')
				.attr('font-size', d => d.radius * 0.2)
				.attr('font-weight','normal')
				.attr('fill', textColor)
				.attr('width', d => d.radius * 1.5)
				.attr('opacity', 0);

			labels.transition()
				.duration(750)
				.attr('opacity', 1)

			function ticked() {
				bubbles.attr('cx', d => d.x).attr('cy', d => d.y);
				labels.attr('x', d => d.x).attr('y', d => d.y)
			}
			simulation.nodes(dataNodes)
				.on('tick', ticked)
				.restart();

			return svg.node();
		}
	},
	mounted() {
		//this.sizeRespond();
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
.bubble-cluster {
	padding: 0px;
	margin: 0px;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.bubble-cluster svg {
	width: 100%;
	height: 100%;
}
</style>