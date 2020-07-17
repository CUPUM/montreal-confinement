<template>
	<div :id="this.chartID" class="bubble-cluster">
		<svg :id="this.chartID+'-chart'" perserveAspectRatio="xMidYMid">
		</svg>
	</div>
</template>

<script>
import * as d3 from 'd3'

export default {
	props: {
		chartID: String,
		weightKey: String,
		wordKey: String,
		dataArray: Array,
		colorKey: String,
		textColorKey: String,
		borderColorKey: String
	},
	data() {
		return {
			plots: null,
			svgWidth: 1000,
			svgHeight: 1000
			//svgWidth: Number,
			//svgHeight: Number
		}
	},
	computed: {
		preparedData() {
			const width = this.svgWidth;
			const height = this.svgHeight;
			const sizeKey = this.weightKey;

			this.dataArray.forEach(d => {d[sizeKey] = parseFloat(d[sizeKey])}); // parseFloat parceque d3 ne gère pas les strings...

			const maxSize = d3.max(this.dataArray, function(d) {return d[sizeKey]});
			//const minSize = d3.min(this.dataArray, function(d) {return d[sizeKey]});

			var radiusScale = d3.scaleSqrt()
				.domain([0, maxSize])
				.range([0, height*width/6500]);

			const polishedData = this.dataArray.map(d => ({
				...d,
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
			const width = this.svgWidth //= document.querySelector('#'+this.chartID).clientWidth;
			const height = this.svgHeight //= document.querySelector('#'+this.chartID).clientHeight;

			const center = { x: width/2, y: height/2 };
			const gravity = 0.05;
			const defaultTextColor = "#fff"
			const padding = 1;
			const dataNodes = this.preparedData;
			const colorKey = this.colorKey;
			const textColorKey = this.textColorKey;
			const borderColorKey = this.borderColorKey;

			var randomHue = parseInt(Math.random()*310, 10);
			randomHue > 30 ? randomHue+50 : randomHue;

			function fillColor(node,i) {
				if (colorKey != (undefined && null && '') && node[colorKey] != (undefined && null && '')) {
					return node[colorKey]
				} else {
					return 'hsl(0,0%,'+(40+.25*i)+'%)'
				}
			}
			function textColor(node) {
				if (textColorKey != (undefined && null && '') && node[textColorKey] != (undefined && null && '')) {
					return node[textColorKey]
				} else {
					return defaultTextColor
				}
			}
			function border(node) {
				if (borderColorKey != (undefined && null && '') && node[borderColorKey] != (undefined && null && '')) {
					return {color: node[borderColorKey], width: 2}
				} else {
					return {color: null, width: null}
				}
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
				.attr('r', 0) // début de transition (ici r=0...)
				.attr('fill', (d,i) => fillColor(d,i))
				.attr('stroke', d => border(d).color)
				.attr('stroke-width', d => border(d).width)
				.attr('opacity', 1)
			bubbles.transition()
				.duration(750)
				.delay((d,i) => i*35)
				.attr('r', d => d.radius);

			let tooltips = this.plots.append('svg:title');
			tooltips.text(d => d[this.weightKey]+' '+this.weightKey);

			let labels = this.plots.append('text')
				.attr('class', 'label')
				.text(d => d[this.wordKey])
				.style('text-anchor','middle')
				.style('text-rendering','optimizeLegibility')
				.attr('dominant-baseline', 'central')
				.attr('font-family', '"Poppins",sans-serif')
				.attr('font-size', d => d.radius * 0.2)
				.attr('font-weight','normal')
				.attr('fill', d => textColor(d))
				//.attr('stroke', 'rgba(0,0,0,.2')
				//.attr('stroke-width','1px')
				//.attr('paint-order','stroke')
				.attr('width', d => d.radius * 1.5)
				.attr('opacity', 0)
				// Ci dessous: fonction pour retour de ligne automatique (whoa... ouch... oof)
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
					while ((word = words.pop())) { // Le linter chiale si la condition word = words.pop() n'est pas encadrée par une parenthèse supplémentaire...
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
				labels.attr('x', d => d.x).attr('y', d => d.y);
				labels.selectAll('tspan').attr('x', d => d.x).attr('y', d => d.y)
				// Bounding box (mais les collisions ne fonctionne pas bien, à arranger...) :
				// bubbles.attr('cx', d => Math.max(d.radius, Math.min(width - d.radius, d.x))).attr('cy', d => Math.max(d.radius, Math.min(height - d.radius, d.y)));
				// labels.attr('x', d => Math.max(d.radius, Math.min(width - d.radius, d.x))).attr('y', d => Math.max(d.radius, Math.min(height - d.radius, d.y)));
				// labels.selectAll('tspan').attr('x', d => Math.max(d.radius, Math.min(width - d.radius, d.x))).attr('y', d => Math.max(d.radius, Math.min(height - d.radius, d.y)))
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
			if (this.plots != null) { this.plots.remove() } // À corriger: laisse trainer des <g> vides ?
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
	overflow: visible;
}
.bubble-cluster svg {
	overflow: visible;
	width: 100%;
	height: 100%;
}
</style>