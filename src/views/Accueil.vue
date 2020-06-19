<template>
	<div id="accueil">
		<div id="splash">
			<div id="splash-image"></div>
			<div id="main-title-box">
				<div id="main-title">
					<!-- <div v-for="(circle, i) in circles" :key="i" class="circles"
						:style="{
							width: circle.d,
							height: circle.d,
							position: 'absolute',
							top: circle.y,
							left: circle.x,
							backgroundColor: circle.color,
							borderRadius: '100%'
						}"></div> -->
					<span>Veille informationnelle sur la COVID-19 à Montréal</span>
				</div>
				<img class="logo" :src='CUPUMlogo' alt="~"/>
			</div>
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
import CUPUMlogo from '@/assets/Logo_CUPUM_blanc.svg'

export default {
	name: 'Accueil',
	components: {

	},
	data() {
		return {
			CUPUMlogo
		}
	},
	computed: {
		circles() {
			const count = 10;
			const minSize = 200;
			const maxSize = 1000;
			const padding = -20;
			const width = 100;
			//const height = 100;
			var array = []
			for (let i = 0; i < count; i++) {
				const diameter = Math.random()*(maxSize-minSize)+minSize
				array.push({
					x: Math.random()*(width - 2*padding)+padding+'%',
					y: '0%',//Math.random()*(height - 2*padding)+padding+'%',
					d: diameter+'px',
					color: 'hsla('+Math.random()*360+', 55%, 80%, .95)'
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
#splash {
	box-sizing: border-box;
	position: relative;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	line-height: 100vh;
	text-align: center;
	vertical-align: middle;
	padding: 0px;
	margin: 0px;
}
#splash-image {
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	position: absolute;
	background: url('~@/assets/photos/cupum-covid_053.jpg') no-repeat center center fixed; 
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
	opacity: 1;
}
#main-title-box {
	padding: 90px;
	vertical-align: middle;
	display: inline-block;
	max-width: 100%;
	min-width: 350px;
	text-align: center;
	background: transparent;
	line-height: 1em;
	font-size: 52px;
}
#main-title {
	padding: 50px;
	display: inline-block;
	overflow: hidden;
	border-radius: 15px;
	position: relative;
	color: rgb(255, 255, 255);
	font-weight: 500;
	font-family: 'Poppins', sans-serif;
}
#main-title span {
	position: relative;
	z-index: 2;
}
.logo {
	max-width: 500px;
	height: auto;
	position: relative;
	z-index: 1;
}
.circles {
	background-image: url('~@/assets/noise-texture-light.png');
	transform: translate(-50%,-50%);
}

</style>
