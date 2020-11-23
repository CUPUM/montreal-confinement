<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="post-confinement" class="view-scroll">
		<PageTitle/>
		<div class="center-col">
			<p>Dans la foulée des éléments conclusifs de la réflexion sur le confinement montréalais et pour compléter celle-ci, ce présent chapitre sous la forme d’un question/réponse communique les propos de certains partenaires internationaux de la Chaire UNESCO en paysage urbain (CUPUM) sur le confinement et le post-confinement de la COVID-19. Les réponses de ces experts des villes de Fès, de Paris, de Rome, de Sao Paulo, de Tokyo et de Tunis apportent un éclairage complémentaire aux constats de la réflexion montréalaise. Leurs propos révèlent des singularités et de profondes similitudes face à cette crise sanitaire.</p>
		</div>
		<section>
			<div id="collaborateurs-map" :style="{opacity: isReading? .35 : 1}"></div>
			<div class="collaborateur noselect">
				<div class="change" @click="changeCollaborator(-1)"><div class="prev"></div></div>
				<div class="name" @click="toggleRead" :class="{'isreading': isReading}">
					<transition :name="stepDirection" mode="out-in">
						<span v-if="currentCollaborateur!=null" :key="currentCollaborateur">
							{{ collaborateurs[currentCollaborateur].nom }}
							<em>&emsp;&mdash;&emsp;{{ collaborateurs[currentCollaborateur].ville }}&emsp;&mdash;&emsp;{{ collaborateurs[currentCollaborateur].mois }}</em>
						</span>
						<span class="placeholder" v-else @click="currentCollaborateur=0">Sélectionnez un collaborateur sur la carte</span>
					</transition>
					<div v-if="currentCollaborateur!=null" class="toggle"></div>
				</div>
				<div class="change" @click="changeCollaborator(+1)"><div class="next"></div></div>
			</div>
			<transition name="read">
				<div class="read" v-if="isReading && currentCollaborateur!=null">
					<transition :name="stepDirection" mode="out-in">
						<div class="apercu" v-if="currentCollaborateur!=null" :key="collaborateurs[currentCollaborateur].nom+'_apercu'" v-bar>
							<div class="meta">
								<div v-if="collaborateurs[currentCollaborateur].photo!=undefined" class="vitrine">
									<!-- <div :style="{backgroundImage: `url(${require('@/assets/photos/photos-vitrine/'+collaborateurs[currentCollaborateur].photo)})`}"></div>
									<img :src="require(`@/assets/photos/photos-vitrine/${collaborateurs[currentCollaborateur].photo}`)" alt=""> -->
									<div :style="{backgroundImage: `url(${loadedPhotos[currentCollaborateur].src})`}"></div>
									<img :src="loadedPhotos[currentCollaborateur].src" alt="">
									<p v-html="collaborateurs[currentCollaborateur].credit"></p>
								</div>
								<div class="center-col">
									<h2>Les réponses de votre ville face à la COVID-19</h2>
										<h4>1 - Concernant l’aménagement des espaces publics, d’après vous, quelles sont les bonnes initiatives et mesures engagées et réalisées par votre ville dans la période de confinement et post-confinement{{'\xa0'}}?</h4>
											<p v-for="(para, i) in apercus[collaborateurs[currentCollaborateur].nom]['1.1']" :key="currentCollaborateur+i+'1.1'" v-html="para"></p>
										<h4>2 - Quel est votre point de vue critique (ou non) concernant ces mesures{{'\xa0'}}?</h4>
											<p v-for="(para, i) in apercus[collaborateurs[currentCollaborateur].nom]['1.2']" :key="currentCollaborateur+i+'1.2'" v-html="para"></p>
										<h4>3 - Quelle leçon pouvez-vous tirer de la pandémie face à l’aménagement des villes, du design urbain et de l’architecture{{'\xa0'}}?</h4>
											<p v-for="(para, i) in apercus[collaborateurs[currentCollaborateur].nom]['1.3']" :key="currentCollaborateur+i+'1.3'" v-html="para"></p>
										<h4>4 - D’après vous, quels sont les enjeux les plus importants à considérer dans cette crise sanitaire{{'\xa0'}}?</h4>
											<p v-for="(para, i) in apercus[collaborateurs[currentCollaborateur].nom]['1.4']" :key="currentCollaborateur+i+'1.4'" v-html="para"></p>
									<h2>Au lendemain de la COVID-19, imaginez votre ville</h2>
										<h4>1 - En regard de cette crise sanitaire, quelles sont vos réflexions quant au devenir des villes, de l’architecture, du design urbain ou/de l’architecture de paysage{{'\xa0'}}?</h4>
											<p v-for="(para, i) in apercus[collaborateurs[currentCollaborateur].nom]['2.1']" :key="currentCollaborateur+i+'2.1'" v-html="para"></p>
										<h4>2 - Est-ce que la crise actuelle suscite à votre avis, de nouvelles thématiques de réflexion, de recherche et de projets{{'\xa0'}}?</h4>
											<p v-for="(para, i) in apercus[collaborateurs[currentCollaborateur].nom]['2.2']" :key="currentCollaborateur+i+'2.2'" v-html="para"></p>
								<br>
									<p v-if="collaborateurs[currentCollaborateur].note!=undefined">
										<small><i>Note : </i></small><br>
										<small v-html="collaborateurs[currentCollaborateur].note"></small>
									</p>
									<p>{{ collaborateurs[currentCollaborateur].nom }}<br>
									<small><i>{{ collaborateurs[currentCollaborateur].description }}</i></small></p>
									<p><small>&copy; {{ collaborateurs[currentCollaborateur].nom }} &mdash; 2020</small></p>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</transition>
		</section>
		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import ChapterNav from '@/components/ChapterNav'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Apercus from '@/assets/texts/apercus-internationaux.json'

export default {
	name: 'PostConfinement',
	components: {
		PageTitle,
		ChapterNav
	},
	data() {
		return {
			collaborateurs: [
				{
					nom: 'Alessandra Capuano',
					ville: 'Rome (Italie)',
					mois: 'Octobre 2020',
					description: 'Chercheure associée à la Chaire UNESCO en paysage urbain de l’Université de Montréal (CUPUM), professeure titulaire au Département d’architecture et de projet (DiAP) de l’Université de Rome la Sapienza, Italie',
					coords: [41.902782, 12.496365],
					photo: 'Lisa_Carignani_Le_quartier_de_Casilino_Rome_Italie_2020.jpg',
					credit: 'Carignani, L. (2020). <i>Le quartier de Casilino</i>, Rome, Italie'
				},
				{
					nom: 'Manuel Tardits',
					ville: 'Tokyo (Japon)',
					mois: 'Août 2020',
					description: 'Professeur et chercheur d’architecture à l’Université Meiji et l’ICS College of Arts, Tokyo, Japon',
					coords: [35.689487, 139.691711],
					photo: 'Thomas_Daniell_Distanciation_sociale_sur_les_berges_de_la_riviere_Kamo_Kyoto_Japon_20_aout_2020.jpg',
					credit: 'Daniell, T. (2020, 20 août). <i>Distanciation sociale sur les berges de la rivière Kamo</i>, Kyoto, Japon (20 août 2020)'
				},
				{
					nom: 'Mauro Claro',
					ville: 'Sao Paulo (Brésil)',
					mois: 'Août 2020',
					description: 'Professeur et chercheur à la Faculté d’architecture et d’urbanisme (FAU) à l’Université Presbytérienne Mackenzie de Sao Paulo, Brésil',
					coords: [-23.550520, -46.633308],
					photo: 'Sao_Paulo_Pedro_Mascaro_10_mai_2020.jpg',
					credit: 'Mascaro, P. (2020, 10 mai). <i>Voie express de Minhocão</i>, Sao Paulo, Brésil',
					note: 'L’auteur remercie Mme Aya Saito, chercheure du groupe de recherche <i>Urban Issues</i> - Faculté d’architecture et d’urbanisme (FAU) à l’Université Presbytérienne Mackenzie pour son aide scientifique.'
				},
				{
					nom: 'Imène Zâafrane',
					ville: 'Tunis (Tunisie)',
					mois: 'Août 2020',
					description: 'Professeure et chercheure à l’École Nationale d’architecture et d’urbanisme de l’Université du 7 Novembre à Carthage, Tunis, Tunisie',
					coords: [36.852921, 10.321725],
					photo: 'Jnayna_Bouali_Place_Barcelone_Tunis_Tunisie_4_mai_2020.jpg',
					credit: 'Bouali, J. (2020, 4 mai). <i>Place Barcelone</i>, Tunis, Tunisie'
				},
				{
					nom: 'Iman Benkirane',
					ville: 'Fès (Maroc)',
					mois: 'Août 2020',
					description: 'Directrice et professeure de l’École d’architecture et d’urbanisme de l’Université Euro-méditerranéenne, Fès, Maroc',
					coords: [34.033333, -5.000000],
					photo: 'Iman_Benkirane_Avenue_Hassan_II_Fès_Maroc_20_aout_2020.jpg',
					credit: 'Benkirane, I. (2020, 20 août). <i>Avenue Hassan II</i>, Fès, Maroc'
				},
				{
					nom: 'Marlène Ghorayeb',
					ville: 'Paris (France)',
					mois: 'Octobre 2020',
					description: 'Chercheure au Laboratoire Architecture Ville Urbanisme Environnement (LAVUE – UMR 7218 CNRS), École spéciale d’architecture de Paris, France',
					coords: [48.856613, 2.352222],
					photo: 'Un_anniversaire_célébré_entre_voisins_confinés_Paris_France.jpg',
					credit: 'Ghorayeb, M. (2020). <i>Un anniversaire célébré entre voisins confinés</i>, Paris, France'
				},
				// {
				// 	nom: 'Caroline Gagnon',
				// 	ville: 'Montréal (Canada)',
				// 	mois: 'À venir (Novembre 2020)',
				// 	description: 'Professeure agrégée et directrice du baccalauréat en design de produits à l’École de design de l’Université Laval, Montréal, Canada',
				// 	coords: [45.501690, -73.567253],
				// 	// photo: '',
				// 	// credit: ''
				// },
				// {
				// 	nom: 'Michelle Meza Paredes',
				// 	ville: 'Ville de Mexico (Mexique)',
				// 	mois: '',
				// 	description: '',
				// 	coords: [19.432608, -99.133209],
				// 	photo: '',
				// 	credit: ''
				// }
			],
			currentCollaborateur: null,
			isReading: false,
			stepDirection : 'next-apercu',
			currentMarker: null,
		}
	},
	created() {
		// Preloading des photos
		this.loadedPhotos = [];
		this.collaborateurs.forEach(c => {
			if (c.photo!=undefined) {
				let img = new Image();
				img.src = require(`@/assets/photos/photos-vitrine/${c.photo}`)
				this.loadedPhotos.push(img);
			}
		})
		// Leaflet prep
		this.collaborateursMap = null // Pour initier sans observer
		this.tiles = null
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	},
	mounted() {
		this.collaborateursMap = L.map('collaborateurs-map', {
			zoomControl: false,
			zoomSnap: 1,
			// renderer: L.SVG(),
		}).setView( L.latLng(0,0), 4 );

		this.collaborateursMap.getContainer().focus = () => {};

		this.tiles = new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: 'abcd',
			opacity: 1,
		});
		this.tiles.addTo(this.collaborateursMap);
		this.collaborateursMap.invalidateSize();
		// this.collaborateursMap.dragging.disable();
		this.collaborateursMap.touchZoom.disable();
		this.collaborateursMap.doubleClickZoom.disable();
		this.collaborateursMap.scrollWheelZoom.disable();
		this.collaborateursMap.on('mousedown', () => this.isReading = false)

		var markerGroup = L.featureGroup();
		this.collaborateurs.forEach((city, index) => {
			L.circleMarker(city.coords, {
				radius: 20,
				className: "punaise",
			}).addTo(this.collaborateursMap).on('click', () => {
				// this.setByName(city.nom);
				this.currentCollaborateur = index;
				this.isReading = true;
				this.focusMap(city.coords);
			}).addTo(markerGroup)
		});
		this.collaborateursMap.setMaxBounds( [[-90,-180], [90,180]] );
		this.collaborateursMap.fitBounds(markerGroup.getBounds(), {padding: [25,25]});
	},
	computed: {
		apercus() {
			return Apercus
		}
	},
	methods: {
		// setByName(name) {
		// 	var index;
		// 	this.collaborateurs.some((e, i) => {
		// 		if (e.nom == name) {
		// 			index = i;
		// 			return true;
		// 		}
		// 	});
		// 	this.currentCollaborateur = index;
		// },
		focusMap(coords) {
			if (this.collaborateursMap != null && this.collaborateursMap != undefined) {
				setTimeout(() => {
					this.collaborateursMap.panTo(L.latLng(coords[0],coords[1]), {animate: true, duration: .75}) 
				}, this.isReading? 250 : 0);

				if (this.currentMarker!=null) {
					this.collaborateursMap.removeLayer(this.currentMarker);
				}
				this.currentMarker = L.circleMarker(coords, {
					radius: 20,
					fill: true,
					fillOpacity: 1,
					fillColor: 'rgb(120, 175, 99)',
					stroke: false,
					strokeOpacity: .5,
					color: 'rgb(64,66,68)',
					weight: 1,
				}).addTo(this.collaborateursMap).bringToBack();
			}
		},
		toggleRead() {
			this.isReading = !this.isReading;
		},
		changeCollaborator(step) {
			step > 0 ? this.stepDirection = 'next-apercu' : this.stepDirection = 'previous-apercu';
			if (this.currentCollaborateur == null) {
				this.currentCollaborateur = 0;
			} 
			else {
				if (this.currentCollaborateur == this.collaborateurs.length-1 && step > 0) {
					this.currentCollaborateur = 0;
				}
				else if (this.currentCollaborateur == 0 && step < 0) {
					this.currentCollaborateur = this.collaborateurs.length-1;
				}
				else {
					this.currentCollaborateur += step;
				}
			}
			this.focusMap(this.collaborateurs[this.currentCollaborateur].coords)
		},
	}
}
</script>

<style scoped>
.page-title {
	position: relative;
	z-index: 1;
}

#post-confinement {
	width: 100%;
	height: 100%;
}

h2 {
	margin: 32px 0px 24px 0px;
}

section {
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 0;
	margin: 80px 0px 0px 0px;
	padding: 50px 120px;
	height: 100%;
	width: 100%;
}

#collaborateurs-map {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	padding: 0px;
	margin: 0px;
	background: white;
	z-index: -1;
	/* opacity: .35; */
	transition: opacity .35s;
}

::v-deep .punaise {
	fill: rgb(120, 175, 99);
	fill-opacity: .5;
	stroke: rgb(120, 175, 99);
	stroke-width: 1px;
	stroke-opacity: .5;
	transition: fill-opacity .2s ease-in-out, stroke-width .2s ease-in-out, stroke-opacity .2s ease-in-out;
}
::v-deep .punaise:hover {
	fill-opacity: 1;
	stroke-width: 25px;
	stroke-opacity: 1;
}

.collaborateur {
	position: relative;
	display: flex;
	flex-direction: row;
	font-size: 20pt;
	font-weight: 500;
	width: 100%;
	line-height: 1.5em;
	vertical-align: middle;
	margin-bottom: 12px;
}

.name {
	cursor: pointer;
	position: relative;
	text-align: center;
	flex-grow: 1;
	background-color: rgba(255,255,255,.9);
	box-shadow: 0px 6px 16px -10px rgba(0,0,0,.35);
	border-radius: 6px;
	margin: 0px 8px;
	overflow: hidden;
	/* white-space: nowrap; */
	padding: 0em 2em;
}
.name span {
	display: inline-block;
	position: relative;
	color: rgb(44,46,48);
	padding: .25em;
}
.name span::before,
.name span::after {
	position: absolute;
	border-radius: 1px;
	bottom: 9px;
	left: 0px;
	content: '';
	width: 100%;
	height: 2px;
	background: rgba(0,0,0,.1);
	transition: width .3s ease-in-out, bottom .3s ease-in-out;
}
.name.isreading span::before,
.name.isreading span::after {
	bottom: 0px;
}
.name span::after {
	width: 0%;
	background: rgb(62,64,66);
}
.name:hover span::after {
	left: 0px;
	width: 100%;
}
.name span.placeholder {
	color: rgb(82,82,82);
	font-weight: 400;
}
.name span em {
	font-style: normal;
	font-weight: 200;
	color: rgb(72,74,76);
}

.toggle {
	position: absolute;
	right: .5em;
	display: inline-block;
	height: 2em;
	width: 2em;
	transform: rotate(0deg);
	transition: all .3s cubic-bezier(.7,0,.3,1);
}
.toggle::after {
	position: absolute;
	left: 50%;
	top: 25%;
	transform: translate(-50%);
	content: '';
	height: 50%;
	width: 2px;
	border-radius: 1px;
	transition: all .3s;
}
.toggle::before {
	position: absolute;
	left: 25%;
	top: 50%;
	transform: translateY(-50%);
	content: '';
	width: 50%;
	height: 2px;
	border-radius: 1px;
	transition: all .3s;
}
.toggle::after,
.toggle::before,
.isreading .toggle::after,
.isreading .toggle::before {
	background-color: rgb(120, 175, 99);
}
.name:hover .toggle::after,
.name:hover .toggle::before,
.name.isreading:hover .toggle::after,
.name.isreading:hover .toggle::before {
	background-color: rgb(64,65,67);
}
.name:hover .toggle {
	transform: rotate(90deg);
}
.name.isreading .toggle {
	transform: rotate(45deg);
}
.name.isreading:hover .toggle {
	transform: rotate(225deg);
}

.change {
	cursor: pointer;
	position: relative;
	height: 100%;
	width: 3em;
	border-radius: 6px;
	background-color:rgba(120, 175, 99, 0);
	transition: all .3s;
}
.change:hover {
	background-color: rgba(140, 201, 116, 0.75);
}
.prev,
.next {
	position: absolute;
	top: 50%;
	width: 1em;
	height: 1em;
	border-style: solid;
	border-color: rgb(72,74,76);
	border-radius: 3px 5px 3px 5px;
	transition: all .35s cubic-bezier(.7,0,.3,1);
}
.prev {
	border-width: 0px 0px 5px 5px;
	right: 5%;
	transform: translateY(-50%) rotate(45deg);
}
.next {
	border-width: 5px 5px 0px 0px;
	left: 5%;
	transform: translateY(-50%) rotate(45deg);
}
.change:hover .prev,
.change:hover .next {
	border-color: rgb(32,34,36);
}
.change:hover .prev {
	right: 35%;
}
.change:hover .next {
	left: 35%;
}

.read {
	position: relative;
	width: 100%;
	max-height: 100%;
	flex-grow: 1;
	overflow: hidden;
	background-color: rgba(251,252,253,1);
	/* box-shadow: 0px 4px 16px -12px rgba(0,0,0,.35); */
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
	border-radius: 12px;
}
.read-enter-active,
.read-leave-active {
	transition: all .35s cubic-bezier(.8,0,.2,1);
}
.read-enter,
.read-leave-to {
	max-height: 0px;
}

.apercu {
	overflow: hidden;
	position: relative;
	height: 100%;
}

.apercu .vitrine {
	text-align: center;
	position: relative;
	/* box-shadow: inset 0px -45px 25px -28px rgba(48, 48, 48, 0.5); */
	width: 100%;
	height: 65vh;
	overflow: hidden;
}
.apercu .vitrine div {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	filter: blur(10px);
	-webkit-filter: blur(75px);
}
.apercu .vitrine img {
	position: relative;
	z-index: 2;
	height: 100%;
	width: auto;
}
.apercu .vitrine p {
	position: absolute;
	text-align: left;
	box-shadow: inset 0px -70px 50px -52px rgb(32,32,32,.75);
	text-shadow: 1px 1px 4px rgba(0,0,0,.5);
	letter-spacing: .25px;
	z-index: 3;
	width: 100%;
	padding: 60px 12px 4px 12px;
	font-size: 12px;
	font-weight: 300;
	line-height: 1.5em;
	color: white;
	margin: 0px;
	left: 0px;
	bottom: 0px;
}

.apercu .center-col {
	padding-bottom: 120px;
}
.next-apercu-enter-active,
.previous-apercu-enter-active {
	transition: all .4s cubic-bezier(.2,0,.4,1);
}
.next-apercu-leave-active,
.previous-apercu-leave-active {
	transition: all .4s cubic-bezier(.6,0,.8,1);
}
.next-apercu-enter,
.previous-apercu-leave-to {
	transform: translateX(200px);
	opacity: 0 !important;
}
.next-apercu-leave-to,
.previous-apercu-enter {
	transform: translateX(-200px);
	opacity: 0 !important;
}
</style>