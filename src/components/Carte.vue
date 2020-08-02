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
//import '@/assets/libs/leaflet-corridor.js'
//import corridor from 'exports-loader?exports=default|corridor!@/assets/libs/leaflet-corridor.js';

export default {
	props: {
		//orderReference: Object,
		colorReference: Object
	},
	data() {
		return {
			//map: null, // Voir: created()
			//tileLayer: null,
			//geoLayer: null,
			//geoFiles: [],
			//geoTraces: null
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
	created() {
		this.map = null // Pour initier sans observer
		this.tileLayer = null
		this.geoLayer = null
		this.geoFiles = []
		this.geoTraces = null
	},
	mounted() {
		this.importAll(require.context('../assets/data/geo/', true, /\.geojson$/))
		this.geoTraces = geojsonMerge.merge(this.geoFiles)
		this.geoTraces.features.forEach(feature => {
			feature.properties['dateTime'] = []
			var featureDateArray = Array.isArray(feature.properties.initiativeDate)? feature.properties.initiativeDate : [feature.properties.initiativeDate]
			featureDateArray.forEach(featureDate => {
				feature.properties['dateTime'].push(this.toDate(featureDate, '/').getTime())
			})
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
			this.tileLayer = new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
			});
			this.tileLayer.addTo(this.map);

			// function addCorridor(coordinates) {
			// 	return L.corridor(coordinates, 20)
			// }

			this.geoLayer = L.geoJSON(this.geoTraces, {
				// onEachFeature: (feature) => {
				// 	if (feature.geometry.type=='LineString') {
				// 		addCorridor(feature.geometry.coordinates)
				// 	} else if (feature.geometry.type=='MultiLineString') {
				// 		feature.geometry.coordinates.forEach(subCoordinates => {
				// 			addCorridor(subCoordinates)
				// 		})
				// 	}
				// },
				style: (feature) => {
					return {
						stroke: true,
						//color: feature.geometry.type.includes('LineString')? this.colorReference[feature.properties.dateTime] : 'white',
						weight: feature.geometry.type.includes('LineString')? 2.5 : .1,
						opacity: feature.geometry.type.includes('LineString')? 1 : .5,
						fill: !feature.geometry.type.includes('LineString')? true : false,
						//fillColor: this.colorReference[feature.properties.dateTime],
						fillOpacity: 1,
					}
				},
				pointToLayer: (feature, latlng) => {
					return L.circle(latlng, { radius:100, fillOpacity:1 })
				}
			}).addTo(this.map)
		},
		updateFeatures() {
			var visibleLayersArray = []

			this.geoLayer.eachLayer(layer => {
				if (layer.feature.properties.dateTime.includes(this.runningDate.getTime())) {
					const theID = layer.feature.properties.initiativeID
					const theColor = this.colorReference[this.runningDate.getTime()]
					if ( (!Array.isArray(theID) && theID==this.runningInitiative) || (Array.isArray(theID) && theID.includes(parseInt(this.runningInitiative,10))) ) {
						visibleLayersArray.push(layer)
						layer.setStyle({
							color: layer.feature.geometry.type.includes('LineString')? theColor : 'white',
							fillColor: theColor,
							opacity: 1,
							fillOpacity: (layer.feature.properties.style!=undefined && layer.feature.properties.style=="overlay")? .5 : 1,
							radius: 3.5,
						})
						layer.bringToFront()
					} else {
						layer.setStyle({
							color: theColor,
							fillColor: theColor,
							opacity: 0,
							fillOpacity: 0,
							radius: 2,
						})
					}
				} else {
					layer.setStyle({
						color: 'rgb(56,56,56)',
						fillColor: 'rgb(56,56,56)',
						opacity: 0,
						fillOpacity: 0,
						radius: 1.5,
					})
					layer.bringToBack()
				}
			})

			if (visibleLayersArray.length>0) {
				var visibleLayers = new L.featureGroup(visibleLayersArray)
				this.map.flyToBounds(visibleLayers.getBounds(), {
					duration: 1,
					padding: [100,100],
					maxZoom: 14
				})
			}
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