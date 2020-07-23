<template>
	<div class="diagram">
		<svg :id="this.chartID+'-chart'" perserveAspectRatio="xMidYMid">
			<defs>
				<filter id="glue1">
					<feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
					<feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -20" result="goo" />
					<!-- <feComponentTransfer>
						<feFuncA type="discrete" tableValues="0 1" />
					</feComponentTransfer> -->
				</filter>
			</defs>

		</svg>
	</div>
</template>

<script>
import * as d3 from 'd3'

export default {
	props: {
		chartID: String
	},
	data() {
		return {
			svgWidth: 800,
			svgHeight: 600
		}
	},
	computed: {
		chartData() {
			const conceptSize = 165;
			const conceptPadding = 30;
			const conceptLinkWidth = 2*conceptSize/3;

			const toFigure = 10;
			const toFigureWidth = 2*conceptSize/3;
			const extFactor = 2;

			const figureSize = 220;
			const figurePadding = 200;
			const figureLinkWidth = figureSize;

			const graphColors = {
				"Formes":"hsl(155, 50%, 75%)",
				"Thèmes":"hsl(140, 50%, 75%)",
				"Intentions":"hsl(120, 50%, 75%)",
				"Impressions générales":"hsl(50, 55%, 75%)",
				"Expressions locales":"hsl(245, 55%, 75%)"
			}

			const data = {
				nodes: [
					{name:"Formes", groupe:"concepts", size:conceptSize/2, x:this.initPos('x',.5), y:this.initPos('y',.2)},
					{name:"Thèmes", groupe:"concepts", size:conceptSize/2, x:this.initPos('x',.5), y:this.initPos('y',.5)},
					{name:"Intentions", groupe:"concepts", size:conceptSize/2, x:this.initPos('x',.5), y:this.initPos('y',.8)},
					{name:"Impressions générales", groupe:"figures", size:figureSize/2, x:this.initPos('x',.1), y:this.initPos('y',.25)},
					{name:"Expressions locales", groupe:"figures", size:figureSize/2, x:this.initPos('x',.9), y:this.initPos('y',.25)}
				],
				links: [
					{name:"link01", source:"Impressions générales", target:"Expressions locales", type:"figure-figure", l: figureSize+conceptSize+figurePadding, width: figureLinkWidth}, // Lien pour écarter les deux "figures"

					{name:"link02", source:"Formes", target:"Impressions générales", type:"concept-figure", l: figureSize/2+conceptSize/2+toFigure*extFactor, width: toFigureWidth},
					{name:"link03", source:"Thèmes", target:"Impressions générales", type:"concept-figure", l: figureSize/2+conceptSize/2+toFigure*extFactor, width: toFigureWidth},
					{name:"link04", source:"Intentions", target:"Impressions générales", type:"concept-figure", l: figureSize/2+conceptSize/2+toFigure*extFactor, width: toFigureWidth},
					{name:"link05", source:"Formes", target:"Expressions locales", type:"concept-figure", l: figureSize/2+conceptSize/2+toFigure*extFactor, width: toFigureWidth},
					{name:"link06", source:"Thèmes", target:"Expressions locales", type:"concept-figure", l: figureSize/2+conceptSize/2+toFigure*extFactor, width: toFigureWidth},
					{name:"link07", source:"Intentions", target:"Expressions locales", type:"concept-figure", l: figureSize/2+conceptSize/2+toFigure*extFactor, width: toFigureWidth},

					{name:"link08", source:"Formes", target:"Thèmes", type:"concept-concept", l: conceptSize+conceptPadding, width: conceptLinkWidth},
					{name:"link09", source:"Thèmes", target:"Intentions", type:"concept-concept", l: conceptSize+conceptPadding, width: conceptLinkWidth},
					{name:"link10", source:"Formes", target:"Intentions", type:"concept-concept", l: 2*(conceptSize+conceptPadding), width: conceptLinkWidth},
				],
				colors : graphColors
			}
			return data
		}
	},
	methods: {
		tab(tabName) {
			this.$emit('opentab', tabName)
			d3.event.stopPropagation()
		},
		initPos(axis, ratio) {
			var basis;
			if (axis == 'x') { basis = this.svgWidth } else if (axis == 'y') { basis = this.svgHeight }
			return (basis * ratio + (Math.random()-.5) * 50)
		},
		
		graph() {
			var selector = '#'+this.chartID+'-chart';
			const data = this.chartData;
			const width = this.svgWidth;
			const height = this.svgHeight;

			var svg = d3.select(selector)
				.attr('width',width)
				.attr('height',height)
				.attr('viewBox', '0 0 '+width+' '+height)

			var draggable = d3.drag()
				.on('start', function dragstarted(d) {
					if (!d3.event.active) simulation.alphaTarget(.05).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
				.on('drag', function dragged(d) {
					d.fx = d3.event.x;
					d.fy = d3.event.y
				})
				.on('end', function dragended(d) {
					if (!d3.event.active) simulation.alphaTarget(.05);
					d.fx = null;
					d.fy = null
				});


		/* Goo layer all */

			var goo1 = svg.append('g')
			goo1.attr('filter', 'url(#glue1)')

			var allLinks = goo1.append('g')
				.selectAll('line')
				.data(data.links)
				.enter()
				.append('line')
				// .each(d => {
				// 	var gradient = svg.append('defs')
				// 		.append('linearGradient')
				// 		.attr('class', 'link-gradients')
				// 		.attr('spreadMethod', 'pad')
				// 		.attr('id', d.name)
				// 		.attr('x1', d.source.x/this.svgWidth)
				// 		.attr('y1', d.source.y)
				// 		.attr('x2', d.target.x)
				// 		.attr('y1', d.target.y)
				// 	gradient.append('stop')
				// 		.attr('stop-color', data.colors[d.source])
				// 		.attr('offset', 0)
				// 	gradient.append('stop')
				// 		.attr('stop-color', data.colors[d.target])
				// 		.attr('offset', 1)
				// })
				// .attr('stroke', d => 'url(#'+d.name+')')
				.attr('stroke', d => data.colors[d.target])
				.attr('stroke-width', 0)
			allLinks.transition()
				.duration(750)
				.delay((d,i) => 750+i*150)
				.attr('stroke-width', d => d.width)

			var allBlobs = goo1.append('g')
				.selectAll('circle')
				.data(data.nodes)
				.enter()
				.append('circle')
				.attr('fill', d => data.colors[d.name])
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)
				.call(draggable)
			allBlobs.transition()
				.duration(750)
				.delay((d,i) => i*150)
				.attr('r', d => d.size)


		/* Goo layer concepts */

			var goo2 = svg.append('g')
			goo2.attr('filter', 'url(#glue1)')
				.attr('opacity','1')

			var conceptsLinks = goo2.append('g')
				.selectAll('line')
				.data(data.links.filter(d => d.type == 'concept-concept'))
				.enter()
				.append('line')
				//.attr('stroke', d => data.colors[d.source])
				.attr('stroke', 'rgb(72,72,72)')
				.attr('stroke-width', 0)
			conceptsLinks.transition()
				.duration(750)
				.delay((d,i) => 750+i*150)
				.attr('stroke-width', d => d.width)

			var conceptsBlobs = goo2.append('g')
				.selectAll('circle')
				.data(data.nodes.filter(d => d.groupe == 'concepts'))
				.enter()
				.append('circle')
				//.attr('fill', d => data.colors[d.name])
				.attr('fill', 'rgb(72,72,72)')
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)
				.call(draggable)
			conceptsBlobs.transition()
				.duration(750)
				.delay((d,i) => i*150)
				.attr('r', d => d.size)


		/* Top layer: texte + bg sans filtre */

			var concepts = svg.selectAll('.concept')
				.data(data.nodes.filter(d => d.groupe == 'concepts'))
				.enter()
				.append('g')
				.attr('class', 'concept')
				.attr('cursor', 'pointer')
				.on('click', d => this.tab(d.name))
				.call(draggable)
			var conceptsBG = concepts.append('circle')
				.attr('class', 'concept-bg')
				.attr('fill', 'white')
				.attr('opacity',.5)
				.attr('r', d => d.size-15)
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)
			concepts.on('mouseover', function() {
					d3.select(this).select('.concept-bg').transition()
						.duration(150)
						.attr('r', d => d.size)
						.attr('opacity', .75)
				})
				.on('mouseout', function() {
					d3.select(this).select('.concept-bg').transition()
						.duration(150)
						.attr('r', d => d.size-10)
						.attr('opacity', .5)
				})
			var conceptsLabels = concepts.append('text')
				.attr('class', 'label')
				.attr('user-select','none')
				.attr('text-anchor','middle')
				.attr('text-rendering','optimizeLegibility')
				.attr('dominant-baseline', 'central')
				.attr('font-family', '"Poppins",sans-serif')
				.attr('font-size', 16)
				.attr('font-weight','500')
				.attr('fill', 'rgb(72,72,72)')
				.text(d => d.name)

			var figures = svg.selectAll('.figure')
				.data(data.nodes.filter(d => d.groupe == 'figures'))
				.enter()
				.append('g')
				.attr('class', 'figure')
				.attr('cursor', 'pointer')
				.on('click', d => this.tab(d.name))
				.call(draggable)
			var figuresBG = figures.append('circle')
				.attr('class', 'figure-bg')
				.attr('fill','white')
				.attr('opacity',0)
				.attr('r', d => d.size-10)
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)
			figures.on('mouseover', function() {
					d3.select(this).select('.figure-bg').transition()
						.duration(150)
						.attr('r', d => d.size)
						.attr('opacity', .35)
				})
				.on('mouseout', function() {
					d3.select(this).select('.figure-bg').transition()
						.duration(150)
						.attr('r', d => d.size-10)
						.attr('opacity', 0)
				})
			var figuresLabels = figures.append('text')
				.attr('class', 'label')
				.attr('user-select','none')
				.attr('text-anchor','middle')
				.attr('text-rendering','optimizeLegibility')
				.attr('dominant-baseline', 'central')
				.attr('font-family', '"Poppins",sans-serif')
				.attr('font-size', 16)
				.attr('font-weight','500')
				.attr('fill', 'white')
				.each(function(d) {
					var lineNumber = -1;
					var lineHeight = 1.5;
					d.name.trim().split(' ').forEach(word => {
						d3.select(this).append('tspan')
							.attr("x", d.x)
							.attr("y", d.y)
							.attr("dy", ++lineNumber * lineHeight + "em")
							.text(word)
							.attr('text-anchor','middle')
							.attr('dominant-baseline', 'bottom')
					})
					d3.select(this).selectAll('tspan').each(function() {
						var dyPre = d3.select(this).attr('dy')
						if (dyPre == null) { dyPre = 0 }
						d3.select(this).attr('dy', parseFloat(dyPre)-lineHeight*lineNumber/2 +'em')
					})
				})

			svg.append('defs')
				.append('marker')
				.attr('id', 'arrowhead')
				.attr('orient', 'auto')
				.attr('preserveAspectRatio', 'none')
				.attr('viewBox', '0 -5 10 10')
				.attr('refX', 9)
				.attr('refY', 0)
				.attr('markerWidth', 10)
				.attr('markerHeight', 8)
				.append('path')
				.attr('fill', 'white')
				.attr('d', 'M0,-5L10,0L0,5');
			var arrows = svg.selectAll('.arrow')
				.data(data.links.filter(d => d.type == 'concept-figure'))
				.enter()
				.append('line')
				.attr('class', 'arrow')
				.attr('marker-end', 'url(#arrowhead)')
				.attr('stroke-width', 1)
				.attr('stroke', 'white')


		/* Forces & simulation */

			const forces = {
				'concepts': {x: .5, y: .02},
				'figures': {x: .02, y: .5}
			}
			const simulation = d3.forceSimulation()
				.force('collision', d3.forceCollide().radius(d => d.size + 1).strength(1).iterations(3))
				.force('x', d3.forceX().strength(d => forces[d.groupe].x).x(width/2))
				.force('y', d3.forceY().strength(d => forces[d.groupe].y).y(height/2))
				.force('link', d3.forceLink().id(d => d.name))
				.velocityDecay(0.1)
				.alphaTarget(.05)

			function ticked() {
			/* Goo layer 1 */
				allLinks.attr('x1', d => d.source.x)
					.attr('y1', d => d.source.y)
					.attr('x2', d => d.target.x)
					.attr('y2', d => d.target.y);
				allBlobs.attr('cx', d => d.x).attr('cy', d => d.y);
			/* Goo layer 2 */
				conceptsLinks.attr('x1', d => d.source.x)
					.attr('y1', d => d.source.y)
					.attr('x2', d => d.target.x)
					.attr('y2', d => d.target.y);
				conceptsBlobs.attr('cx', d => d.x).attr('cy', d => d.y);
			/* Top layer (content) */
				conceptsBG.attr('cx', d => d.x).attr('cy', d => d.y);
				conceptsLabels.attr('x', d => d.x).attr('y', d => d.y);
				figuresBG.attr('cx', d => d.x).attr('cy', d => d.y);
				figuresLabels.selectAll('tspan').attr('x', d => d.x).attr('y', d => d.y);
				arrows.each(function(d) {
					const margin = -15
					const x1 = d.source.x
					const y1 = d.source.y
					const x2 = d.target.x
					const y2 = d.target.y
					const angle = Math.atan2(y2-y1, x2-x1)
					const dx1 = (d.source.size+margin) * Math.cos(angle)
					const dy1 = (d.source.size+margin) * Math.sin(angle)
					const dx2 = (d.source.size+margin) * Math.cos(angle)
					const dy2 = (d.source.size+margin) * Math.sin(angle)
					d3.select(this)
						.attr('x1', x1+dx1)
						.attr('y1', y1+dy1)
						.attr('x2', x2-dx2)
						.attr('y2', y2-dy2)
				})
			}


		/* Wobble */
			data.nodes.forEach(node => {
				node['initRandom'] = Math.random()
			})
			d3.timer(function(time) {
				figures.attr('dx', d => { d.x += 2.5*Math.sin(time/(500+d.initRandom*600) - d.initRandom*100) - 2*Math.sin(time/(1500+d.initRandom*500) + d.initRandom*55) })
					.attr('dy', d => { d.y += 1.5*Math.sin(time/(300+d.initRandom*500) + d.initRandom*2) + 1*Math.sin(time/(600+d.initRandom*100) + d.initRandom*555)})
			})

			simulation.nodes(data.nodes)
				.on('tick', ticked)
				.restart();
			simulation.force('link').links(data.links)
				.distance(d => d.l)
				.strength(1)
		}
	},
	mounted() {
		this.graph();
	},
	watch: {
	}
}
</script>

<style scoped>
.diagram {
	position: relative;
	display: block;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 100%;
	background: white;
}
svg {
	position: absolute;
	width: 100%;
	height: 100%;
	margin: 0px;
	padding: 0px;
	overflow: hidden;
	user-select: none;
}
</style>