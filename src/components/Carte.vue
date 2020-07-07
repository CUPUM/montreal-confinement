<template>
	<div class="carte-component">
		<div id="carte-initiatives"></div>
	</div>
</template>

<script>
import { store, mutations } from '@/store.js'
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
		runningDate() {
			return store.runningDate
		},
		runningInitiative() {
			return store.runningInitiative
		},
		
		cityBounds() {
			const point1 = [45.706179, -73.464581] // haut droit
			const point2 = [45.400379, -73.986675] // bas gauche
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

		window.addEventListener('resize', this.mapResize)
	},
	methods: {
		setRunningDate(date) {
			mutations.setRunningDate(date)
		},
		setRunningInitiative(id) {
			mutations.setRunningInitiative(id)
		},

		initMap() {
			this.map = L.map('carte-initiatives', {
				zoomControl: false,
				zoomSnap: 0.5,
			}).fitBounds(this.cityBounds);
			this.tileLayer = new L.TileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
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