<template>
	<div id="accueil">
		<div id="splash">

			<div id="splash-svg-container">
				<svg preserveAspectRatio="xMinYMin" viewBox="0 0 1800 500">
					<defs>
						<mask id="splash-text-mask" x="0" y="0">
							<text x="0" y="200" class="splash-text">Veille sur la crise</text>
							<text x="0" y="450" class="splash-text">de la COVID-19</text>
						</mask>
					</defs>
					<image width="100%" v-bind="{'xlink:href' : BGpic}" mask="url(#splash-text-mask)"/>  
				</svg>
			</div>

		</div>

		<div id="chaire-logo-container">
			<!-- <div v-for="(circle,i) in circles"
				:key="i"
				:style="{
					width: circle.d,
					height: circle.d,
					backgroundColor: circle.color,
					top: circle.y,
					left: circle.x,
					borderRadius: '50%',
					position: 'absolute',
					transform: 'translate(-50%,-50%)',
				}"></div> -->
			<img class="chaire-logo" :src='CUPUMlogo' alt="~"/>
		</div>

		<div class="center-col">
			<h2>Accueil</h2>
			<p>Lorem ipsum <em>dolor sit amet, consectetur adipiscing elit.</em> Quisque pretium finibus facilisis. Cras magna velit, iaculis sit amet felis quis, sollicitudin pellentesque lorem. Mauris non nulla eu velit consequat consectetur. Curabitur feugiat dui dui, vitae vehicula libero tincidunt non. Mauris rutrum dapibus nibh ut euismod. Cras gravida nisi id sagittis pellentesque. In rutrum est dolor. Maecenas convallis urna fringilla ultrices vestibulum. Sed scelerisque lectus a diam gravida malesuada. Cras vel cursus odio. Duis placerat ut est eget bibendum. Vestibulum dignissim sapien ante, ut ultrices tellus rhoncus luctus.</p>
			<p>Quisque auctor bibendum leo in aliquam. Proin viverra sollicitudin eros, ac malesuada metus interdum eu. Cras euismod, elit sit amet mollis viverra, ipsum ligula fermentum nulla, ut tristique mauris leo sit amet mauris. Curabitur imperdiet est at urna pulvinar, quis dictum tellus volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce cursus luctus dapibus. Vestibulum volutpat rutrum lectus vel tempor. Vivamus ut mauris mi. Ut et lorem tempus, rhoncus enim ut, condimentum justo. Morbi eleifend, enim sed condimentum tristique, dui mauris euismod mi, a blandit dolor arcu ornare nisl. Suspendisse gravida erat at massa bibendum, vel rutrum odio facilisis. Sed eu est non dolor condimentum luctus.</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import CUPUMlogo from '@/assets/Logo_CUPUM_noir.svg'
import BGpic from '@/assets/photos/cupum-covid_053.jpg'

export default {
	name: 'Accueil',
	components: {

	},
	data() {
		return {
			CUPUMlogo,
			BGpic
		}
	},
	computed: {
		circles() {
			const count = 10;
			const minSize = 500;
			const maxSize = 1500;
			const padding = -20;
			const width = 100;
			const height = 100;
			var array = []
			for (let i = 0; i < count; i++) {
				const diameter = Math.random()*(maxSize-minSize)+minSize
				array.push({
					x: Math.random()*(width - 2*padding)+padding+'%',
					y: Math.random()*(height - 2*padding)+padding+'%',
					d: diameter+'px',
					color: 'hsla('+(Math.random()*150+0)+', 55%, 80%, .95)'
				})
			}
			return array
		}
	}
}
</script>

<style scoped>
#accueil {
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	height: 100%;
	padding: 0px;
	margin: 0px;
}
#splash-svg-container {
	display: inline-block;
	box-sizing: border-box;
	padding: 100px 100px 25px 100px;
	width: 100%;
}
#splash svg {
	width: 100%;
}
.splash-text {
	width: 100%;
	text-align: center;
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
	font-size: 200px;
	fill: white;
}

#chaire-logo-container {
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	width: 100%;
	padding: 50px 100px 50px 100px;
	margin: 10px 0px;
}
.chaire-logo {
	width: 350px;
	height: auto;
	position: relative;
	z-index: 1;
}
.circles {
	background-image: url('~@/assets/noise-texture-light.png');
	transform: translate(-50%,-50%);
}

</style>
