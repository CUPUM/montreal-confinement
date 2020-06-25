<template>
	<div class="carte-component">
		<div id="carte-initiatives"></div>
	</div>
</template>

<script>
//import { store, mutations } from '@/store.js'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
	props: {
		weightKey: String,
		wordKey: String,
		groupKey: String,
		colorKey: String,
		dataArray: Array,
	},
	data() {
		return {
			map: null,
			tileLayer: null,
			layers: []
		}
	},
	computed: {
		cityBounds() {
			const point1 = [45.747402, -73.405458] // haut droit
			const point2 = [45.368549, -74.048587] // bas gauche
			return [point1,point2]
		}
	},
	mounted() {
		this.initMap();
		this.initLayers();
		this.map.invalidateSize()
		this.map.dragging.disable()
		this.map.touchZoom.disable();
		this.map.doubleClickZoom.disable();
		this.map.scrollWheelZoom.disable();
		//var map = this.map;
		//const bounds = this.cityBounds

		window.addEventListener('resize', this.mapResize)

		// this.$nextTick(function() {
		// 	window.addEventListener('resize', function() {
		// 		map.fitBounds( this.cityBounds )
		// 		console.log(map)
		// 	})
		// })
	},
	methods: {
		initMap() {
			this.map = L.map('carte-initiatives', {
				zoomControl: false,
				zoomSnap: .25,
			}).fitBounds(this.cityBounds);
			this.tileLayer = new L.TileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				attribution: '' ,
			});
			this.tileLayer.addTo(this.map);
		},
		initLayers() {
		},
		mapResize() {
			this.map.fitBounds( this.cityBounds )
		}
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.mapResize)
	},
	watch: {
	}
}
</script>

<style scoped>
.carte-component {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
	margin: 0px;
	padding: 0px;
}
#carte-initiatives {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
}
</style>