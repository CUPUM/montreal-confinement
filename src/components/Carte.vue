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

export default {
	props: {
		colorReference: Object
	},
	data() {
		return {
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
		strokeWeight(feature) {
			if (feature.geometry.type.includes('LineString')) {
				return 2.5
			} else if (feature.properties.style=='overlay') {
				return 1
			} else {
				return .05
			}
		},
		strokeColor(feature, color) {
			if (feature.geometry.type.includes('LineString')) {
				return color
			} else if (feature.properties.style=='overlay'||feature.properties.style=='largeDot') {
				return color
			} else {
				return 'black'
			}
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

			this.geoLayer = L.geoJSON(this.geoTraces, {
				style: (feature) => {
					return {
						stroke: true,
						weight: this.strokeWeight(feature),
						fill: !feature.geometry.type.includes('LineString')? true : false,
						interactive: false,
						// initial: transparent
						opacity: 0,
						fillOpacity: 0,
					}
				},
				pointToLayer: (feature, latlng) => {
					return L.circle(latlng, { radius: feature.properties.style=='largeDot'? 30000:100, fillOpacity:1 })
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
							// stroke
							color: this.strokeColor(layer.feature, theColor),
							opacity: 1,
							// fill
							fillColor: theColor,
							fillOpacity: (layer.feature.properties.style!=undefined && (layer.feature.properties.style=='overlay' || layer.feature.properties.style=='largeDot'))? .5 : 1,
							// markers
							//radius: 3.5,
						})
						layer.bringToFront()
					} else {
						layer.setStyle({
							opacity: 0,
							fillOpacity: 0,
						})
					}
				} else {
					layer.setStyle({
						opacity: 0,
						fillOpacity: 0,
					})
					layer.bringToBack()
				}
			})

			if (visibleLayersArray.length>0) {
				var visibleLayers = new L.featureGroup(visibleLayersArray)
				this.map.flyToBounds(visibleLayers.getBounds(), {
					duration: .8,
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
	background-color: rgb(212,218,220);
}
#carte-initiatives path {
	transition: all 2s;
}
</style>