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
			const width = this.svgWidth; // alternativement... document.querySelector('#'+this.chartID).clientWidth;
			const height = this.svgHeight; // alternativement... document.querySelector('#'+this.chartID).clientHeight;
			const sizeKey = this.weightKey;

			this.dataArray.forEach(d => {d[sizeKey] = parseFloat(d[sizeKey])}); // parseInt parceque d3 est incapable de gérer les strings...

			const maxSize = d3.max(this.dataArray, d => d[sizeKey]);
			const minSize = d3.min(this.dataArray, d => d[sizeKey]);

			var reducedArray = this.dataArray;
			if (minSize == 1 && maxSize > 2) {
				reducedArray = this.dataArray.filter( word => word[this.weightKey] > 1 )
			}

			var radiusScale = d3.scaleSqrt()
				.domain([0, maxSize])
				.range([0, width/7]);

			const polishedData = reducedArray.map(d => ({
				...d,
				//paragraphs: d[textKey].split(' '),
				radius: radiusScale(d[sizeKey]),
				factor: d[sizeKey] / maxSize,
				//x: ( d[sizeKey] / maxSize + (1-d[sizeKey] / maxSize)*Math.random())/2 * width,
				//y: ( d[sizeKey] / maxSize + (1-d[sizeKey] / maxSize)*Math.random())/2 * height,
				x: Math.random() * width,
				y: Math.random() * height,
			}));

			return polishedData;
		}
	},
	methods: {
		graph() {			
			const selector = '#'+this.chartID+'-chart';
			var width = this.svgWidth;
			var height = this.svgHeight;
			var center = { x: width/2, y: height/2 };
			const gravity = 0.05;
			const textColor = "#ffffff"
			const defaultFillColor = "#666666"
			const padding = 1;
			const dataNodes = this.preparedData;
			const colorKey = this.colorKey;
			//const wordKey = this.wordKey

			function fillColor(node) {
				if (colorKey != (undefined && null) && node[colorKey] != (undefined && null && "")) {
					let color = node[colorKey]
					return 'rgb('+color.r+','+color.g+','+color.b+')'
				} else return defaultFillColor
			}

			let svg = d3.select(selector)
				.attr("viewBox", "0 0 " + width + " " + height);

			let simulation = d3.forceSimulation()
				.force('x', d3.forceX().strength(gravity).x(center.x))
				.force('y', d3.forceY().strength(gravity).y(center.y))
				//.force('center', d3.forceCenter(center.x, center.y))
				.velocityDecay(0.5)
				.force('charge', d3.forceManyBody().strength(d => d.radius)) // Explorer plus? .strength(d => -Math.pow(d.radius, 1.0)*gravity))
				.force('collision', d3.forceCollide().radius(d => d.radius + padding).strength(1).iterations(2));
			
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
				//.attr('r', d => d.radius/3)
				.attr('r', 0)
				.attr('fill', d => fillColor(d))
				.attr('opacity', 1)

			bubbles.transition()
				.duration(750)
				.delay((d,i) => i*35)
				.attr('r', d => d.radius);

			// const divID = '#'+this.chartID
			// let tooltip = d3.select(divID)
			// 	.append('div')
			// 	.attr('class', 'tooldtip')

			// bubbles.on("mouseover", function(d) {		
			// 		tooltip.transition()
			// 			.duration(250)
			// 			.style("opacity", .9);
			// 		tooltip.html(d[this.weightKey]+' occurrences')
			// 			.style("left", (d3.event.pageX) + "px")
			// 			.style("top", (d3.event.pageY - 28) + "px");
			// 	})
			// 	.on("mouseout", function() {
			// 		tooltip.transition()		
			// 		.duration(500)		
			// 		.style("opacity", 0);
			// 	});

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
				.attr('opacity', 0)
				.each(function(d) {
					const text = d3.select(this);
					const width = (d.radius - 10) * 2;
					const x = d.x;
					const y = d.y;
					var words = text.text().split(/\s+/).reverse();
					var word, line = [];
					var lineNumber = 0;
					var lineHeight = 1.4;
					var tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
					while ( (word = words.pop()) ) { // Le linter chiale si la condition word = words.pop() n'est pas encadrée par une parenthèse supplémentaire...
						line.push(word);
						tspan.text(line.join(" "));
						if (tspan.node().getComputedTextLength() > width) {
							line.pop();
							tspan.text(line.join(" "));
							line = [word];
							tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
						}
					}
					text.selectAll('tspan').each(function() {
						var dyAbs = d3.select(this).attr('dy')
						if (dyAbs == null) { dyAbs=0 }
						d3.select(this).attr('dy', parseFloat(dyAbs) - lineHeight*lineNumber/2 +'em')
					})
				});

			labels.transition()
				.duration(750)
				.delay((d,i) => i*35+750)
				.attr('opacity', 1)

			function ticked() {
				bubbles.attr('cx', d => d.x).attr('cy', d => d.y);
				labels.attr('x', d => d.x).attr('y', d => d.y)
				labels.selectAll('tspan').attr('x', d => d.x).attr('y', d => d.y)
			}
			simulation.nodes(dataNodes)
				.on('tick', ticked)
				.restart();

			return svg.node();
		}
	},
	mounted() {
		if (this.dataArray != (null && undefined && "")) { this.graph() }
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
.tooltip {
	position: absolute;
	width: 50px;
	height: 50px;
	display: inline-block;
}
</style>