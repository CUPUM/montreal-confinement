<template>
	<div class="meta">
	<div class="meta" v-bar ref="vbar">
	<div id="balisage-photo" class="view-scroll" @click="ouverte=null">
		<div class="gallery-container">
			<div v-for="pic in pics" :key="pic.index" class="image-container" @click.stop="ouverte=pic">
				<div class="image" v-lazy:background-image="pic.path"></div>
				<div v-if="Desc[pic.filename]!=''" class="desc">
					<div class="date">
						{{ Desc[pic.filename].split(' // ')[0] }}
					</div>
					<div class="text">
						{{ Desc[pic.filename].split(' // ')[1] }}
					</div>
				</div>
			</div>
			<!-- <div v-for="pic in pics" :key="pic.index" class="image-container" @click.stop="ouverte=pic">
				<img v-lazy="pic.path">
			</div> -->
		</div>

		<transition name="lightbox">
			<div v-if="ouverte!=null" class="lightbox">
				<div class="previous" @click.stop="prevPic()">
					<div class="arrow-stem"></div>
					<div class="arrow-head"></div>
				</div>
				<div class="lightbox-inner">
					<transition appear :name="slideDirection" mode="out-in">
						<img v-lazy="ouverte.path" alt="" :key="ouverte.index+'img'">
					</transition>
					<transition appear :name="slideDirection" mode="out-in">
						<div v-if="Desc[ouverte.filename]!=''" class="desc" :key="ouverte.index+'desc'">
							<span class="date">
								{{ Desc[ouverte.filename].split(' // ')[0] }}
							</span>
							<span class="text">
								&emsp;&ndash;&emsp;
								{{ Desc[ouverte.filename].split(' // ')[1] }}
							</span>
						</div>
					</transition>
				</div>
				<div class="next" @click.stop="nextPic()">
					<div class="arrow-stem"></div>
					<div class="arrow-head"></div>
				</div>
			</div>
		</transition>

		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'
import Descriptions from '@/assets/photos/descriptions.json'

export default {
	name: 'BalisagePhoto',
	components: {
		ChapterNav
	},
	data() {
		return {
			pics: [],
			ouverte: null,
			slideDirection: 'slide-next',
		}
	},
	computed: {
		Desc() {
			return Descriptions
		}
	},
	methods: {
		importAll(r) {
			var index = 0
			r.keys().forEach(subpath => {
				console.log(subpath)
				this.pics.push({
					filename: subpath.replace('./',''),
					path: r(subpath),
					index: index++
				})
			})
		},
		prevPic() {
			this.slideDirection = 'slide-prev';
			if (this.ouverte.index > 0) {
				this.ouverte = this.pics[this.ouverte.index-1]
			} else {
				this.ouverte = this.pics[this.pics.length-1]
			}
		},
		nextPic() {
			this.slideDirection = 'slide-next';
			if (this.ouverte.index < this.pics.length-1) {
				this.ouverte = this.pics[this.ouverte.index+1]
			} else {
				this.ouverte = this.pics[0]
			}
		}
	},
	mounted() {
		this.importAll(require.context('../assets/photos/', true, /\.(?:jpg|jpeg|gif|png)$/))
		console.log(Descriptions)
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#balisage-photo {
	width: 100%;
	height: 100%;
}

.gallery-container {
	display: flex;
	flex-wrap: wrap;
	flex-wrap: 1;
	position: relative;
	padding: 0px;
	margin: 80px 100px 50px 100px;
	overflow: visible;
}
.image-container {
	cursor: pointer;
	flex: 1;
	position: relative;
	display: inline-block;
	min-width: 450px;
	max-width: 750px;
	height: 400px;
	margin: 0px;
	padding: 2px;
	overflow: hidden;
	transition: all .25s ease-in-out;
	/* box-shadow: 1px 3px 5px -3px rgba(0,0,0,.5); */
}
.gallery-container:hover .image-container {
	opacity: .25;
}
.gallery-container:hover .image-container:hover {
	transition: all .25s;
	opacity: 1;
	/* transform: translateY(-5px); */
}
.image-container .image {
	border: 0;
	display: inline-block;
	position: relative;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 100%;
	transition: all .5s ease-in-out;
	border-radius: 2px;
}
/* .image-container .image:after {
	position: absolute;
	content: '';
	opacity: 0;
	width: 95%;
	height: 95%;
	top: 2.5%;
	left: 2.5%;
	background-color: rgb(255, 255, 255);
	transition: all .3s;
	border-radius: 12px;
}
.image-container:hover .image:after {
	opacity: .25;
	width: 100%;
	height: 100%;
	top: 0%;
	left: 0%;
	border-radius: 0px;
} */
.image[lazy=loading] {
	opacity: 0;
	transition: all 1s;
}
.image[lazy=loaded] {
	opacity: 1;
	transition: all 1s;
}
/* .image-container img {
	border: 0;
	display: inline-block;
	position: relative;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 100%;
	transition: all 1s ease-in-out;
}
img[lazy=loading] {
	height: 0%;
	opacity: 0;
}
img[lazy=loaded] {
	height: 100%;
} */

.image-container .desc {
	opacity: 0;
	text-align: left;
	position: absolute;
	width: 100%;
	left: 0px;
	bottom: 0px;
	background-color: rgba(255, 255, 255, 0.98);
	color: rgb(80, 80, 80);
	font-weight: 400;
	font-size: 13px;
	padding: 8px 18px 12px 18px;
	transform: translateY(100%);
	transition: all .25s ease-in-out;
	line-height: 1.35em;
	border-radius: 1px;
}
.desc .date {
	text-transform: uppercase;
	font-size: 11px;
	font-weight: 600;
	position: relative;
	color: rgb(27, 27, 27);
}
.desc .text {
	position: relative;
}
.image-container:hover .desc {
	opacity: 1;
	transform: translateY(0%);
}

.lightbox {
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 50px 150px;
	top: 0px;
	background-color: rgba(244, 246, 248,.94);
	overflow: hidden;
	z-index: 100;
}
.lightbox-enter-active,
.lightbox-leave-active {
	transition: all .25s;
}
.lightbox-enter {
	opacity: 0;
}
.lightbox-leave-to {
	transform: scale(1.1);
	opacity: 0;
}

.previous, .next {
	position: relative;
	cursor: pointer;
	display: inline-block;
	box-sizing: border-box;
	padding: 0px;
	width: 90px;
	height: 90px;
	background-color: rgba(255,255,255,.2);
	border-radius: 50%;
	transition: all .25s;
}
.previous:hover, .next:hover {
	background-color: rgba(255,255,255,1);
}
.arrow-stem {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: rgb(84,84,84);
	width: 30px;
	right: 34px;
	height: 2px;
	border-radius: 1px;
	transition: all .25s;
}
.arrow-head {
	position: absolute;
	top: 50%;
	right: 35px;
	border-color: rgb(84,84,84);
	width: 20px;
	height: 20px;
	border-radius: 1px 3px;
	border-width: 2px 2px 0px 0px;
	border-style: solid;
	transform: translateY(-50%) rotate(45deg);
	transition: all .25s;
}
.next:hover .arrow-stem {
	right: 28px;
	width: 36px;
	background-color: rgb(36,36,36);
}
.next:hover .arrow-head {
	right: 29px;
	border-color: rgb(36,36,36);
}
.previous .arrow-stem {
	left: 34px;
}
.previous .arrow-head {
	left: 35px;
	border-width: 0px 0px 2px 2px;
}
.previous:hover .arrow-stem {
	left: 28px;
	width: 36px;
	background-color: rgb(36,36,36);
}
.previous:hover .arrow-head {
	left: 29px;
	border-color: rgb(36,36,36);
}

.lightbox-inner {
	justify-content: center;
	height: 100%;
	position: relative;
	display: inline-flex;
	align-items: center;
	flex: 1;
	padding: 0px 25px;
}
.lightbox img {
	display: inline-block;
	position: relative;
	max-width: 100%;
	max-height: 100%;
	border-radius: 2px;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
}
.lightbox-inner .desc {
	position: absolute;
	color: rgb(54, 54, 54);
	font-weight: 400;
	font-size: 14px;
	padding: 8px 18px;
	border-radius: 3px;
	background-color: rgb(245, 245, 247);
	box-shadow: 0px 5px 15px -8px rgba(0,0,0,.5);
	bottom: -20px;
	transition: all .5s;
}
/* .lightbox-inner img:hover + .desc {
	opacity: .2;
} */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
	transition: all .3s;
}
.slide-next-enter,
.slide-prev-leave-to {
	box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
	transform: translateX(35px);
	opacity: 0;
}
.slide-next-leave-to,
.slide-prev-enter {
	box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
	transform: translateX(-35px);
	opacity: 0;
}
</style>