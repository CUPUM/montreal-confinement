<template>
	<div class="carte-component">
		<div id="carte-initiatives"></div>
	</div>
</template>

<script>
import { store } from '@/store.js'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as geojsonMerge from '@mapbox/geojson-merge'
//import InitiativesTraces from '@/assets/data/initiatives.geojson'

export default {
	props: {
		//orderReference: Object,
		colorReference: Object
	},
	data() {
		return {
			map: null,
			tileLayer: null,
			geoLayer: null,
			//InitiativesTraces
			geoFiles: [],
			geoTraces: null
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
		this.importAll(require.context('../assets/data/geo/', true, /\.geojson$/))
		this.geoTraces = geojsonMerge.merge(this.geoFiles)
		this.geoTraces.features.forEach(feature => {
			feature.properties['dateTime'] = this.toDate(feature.properties.initiativeDate, '/').getTime()
		})
		this.initMap();
		this.map.invalidateSize()
		this.map.dragging.disable()
		this.map.touchZoom.disable();
		this.map.doubleClickZoom.disable();
		this.map.scrollWheelZoom.disable();

		window.addEventListener('resize', this.mapResize)
	},
	methods: {
		importAll(r) {
			r.keys().forEach(subpath => {
				this.geoFiles.push(r(subpath))
			})
		},
		toDate(dateString, separator) {
			const strArray = dateString.split(separator);
			const date = new Date(20+strArray[2].trim(), parseInt(strArray[0].trim(), 10)-1, strArray[1].trim());
			return date
		},
		initMap() {
			this.map = L.map('carte-initiatives', {
				zoomControl: false,
				zoomSnap: 0.25,
				renderer: L.canvas()
			}).fitBounds(this.cityBounds);
			this.tileLayer = new L.TileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
			});
			this.tileLayer.addTo(this.map);

			this.geoLayer = L.geoJSON(this.geoTraces, {
				style: (feature) => {
					return {
						stroke: true,
						color: feature.geometry.type=='LineString'? this.colorReference[feature.properties.dateTime] : 'white',
						weight: feature.geometry.type=='LineString'? 2.5 : .4,
						opacity: feature.geometry.type=='LineString'? 1 : .5,
						fill: feature.geometry.type!='LineString'? true : false,
						fillColor: this.colorReference[feature.properties.dateTime],
						fillOpacity: 1,
					}
				},
				pointToLayer: (feature, latlng) => {
					return L.circleMarker(latlng, { radius:2, fillOpacity:1 })
				}
			}).addTo(this.map)
		},
		updateFeatures() {
			this.geoLayer.eachLayer(layer => {
				if (layer.feature.properties.dateTime == this.runningDate.getTime()) {
					if (layer.feature.properties.initiativeID == this.runningInitiative) {
						layer.setStyle({
							opacity: 1,
							fillOpacity: 1,
							radius: 3.5,
						})
						layer.bringToFront()
					} else {
						layer.setStyle({
							opacity: 0,
							fillOpacity: 0,
							radius: 2,
						})
					}
				// } else if (layer.feature.properties.dateTime < this.runningDate.getTime()) {
				// 	layer.setStyle({
				// 		opacity: .15,
				// 		fillOpacity: .15,
				// 		radius: 1.5,
				// 	})
				// 	layer.bringToBack()
				} else {
					layer.setStyle({
						opacity: 0,
						fillOpacity: 0,
						radius: 1.5,
					})
					layer.bringToBack()
				}
			});
		},
		mapResize() {
			this.map.fitBounds( this.cityBounds )
		}
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.mapResize)
	},
	watch: {
		runningInitiative: function() {
			this.updateFeatures()
		}
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
#carte-initiatives path {
	transition: all 2s;
}
</style>