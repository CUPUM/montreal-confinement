<template>
	<div id="timelist-container">
		<div class="meta" v-bar ref="vbar">
			<ul id="timelist">
				<li v-for="(initiative, i) in dataArray" class="timecard-container" :key="initiative.id+'_'+i" :data-index="initiative.index">
					<input type="radio"
							:key="i+'_input'"
							:id="initiative.id+'_radio'"
							v-model="timelistInitiative"
							:value="{id: initiative.id, date: initiative.date}">
					<label :key="i+'_label'"
						:for="initiative.id+'_radio'"
						:class="{'isEnabled': initiative.index < currentIndex }"
						:style="{borderColor: colorReference[initiative.date.getTime()]}">
						<h5 v-html="initiative.titre"></h5>
						<p v-html="initiative.description"></p>
						<!-- <p>{{ initiative.id }}</p>
						<p>	{{ initiative.date.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}</p>
						<p>{{ initiative.place }}</p> -->
						<a v-if="initiative.ref!=(undefined && null && '')" class="reference-link" target="_blank" :href="initiative.ref">Réf{{'\xa0'}}&#x1f855;</a>
					</label>
				</li>
			</ul>
		</div>
		<div @click="previous" class="previous" :class="{'disabled': currentIndex<=0}">
			<div class="arrow">
				<div class="arrow-stem"></div>
				<div class="arrow-head"></div>
			</div>
		</div>
		<div @click="next" class="next" :class="{'disabled': currentIndex==this.dataArray.length-1}">
			<div class="arrow">
				<div class="arrow-stem"></div>
				<div class="arrow-head"></div>
			</div>
		</div>
		<transition name="opening">
			<div class="opener" @click="begin" v-if="runningDate==null">
					<!-- <p>Cette section répertorie chronologiquement les initiatives qui ont pris corps sur le territoire montréalais durant la période de confinement de la COVID-19. Sur la base des informations recueillies à travers les articles de presse, les communiqués de presse, les éditoriaux et les chroniques, elle permet de localiser les enjeux sociaux (réf.{{'\xa0'}}: inclusion, dignité humaine, etc.) et de cibler les mesures engagées (réf.{{'\xa0'}}: aménagement public, etc.) par les gouvernements et les acteurs locaux dans le contexte de la COVID-19 et de visualiser leur impact sur le territoire montréalais.</p> -->
				<p>
					<b>Cliquez ici</b> pour débuter la navigation à travers les items rencensés lors de la revue de presse.
				</p>
			</div>
		</transition>
	</div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
	props: {
		dataArray: Array,
		colorReference: Object
	},
	data() {
		return {
			listHeight: Number,
			currentIndex: Number,
		}
	},
	computed: {
		runningInitiative() {
			return store.runningInitiative
		},
		runningDate() {
			return store.runningDate
		},
		timelistInitiative: {
			get() {
				return {id: store.runningInitiative, date: store.runningDate}
			},
			set(value) {
				mutations.setRunningInitiative(value.id);
				mutations.setRunningDate(value.date)
			}
		},
	},
	methods: {
		onResize() {
			this.listHeight = document.getElementById('timelist').clientHeight;
		},
		begin() {
			mutations.setRunningInitiative(this.dataArray[0].id)
			mutations.setRunningDate(this.dataArray[0].date)
		},
		next() {
			if (parseInt(this.currentIndex,10) < (this.dataArray.length-1)) {
				mutations.setRunningInitiative(this.dataArray[parseInt(this.currentIndex,10)+1].id);
				mutations.setRunningDate(this.dataArray[parseInt(this.currentIndex,10)+1].date)
			}
		},
		previous() {
			if (parseInt(this.currentIndex,10) > 0) {
				mutations.setRunningInitiative(this.dataArray[parseInt(this.currentIndex,10)-1].id);
				mutations.setRunningDate(this.dataArray[parseInt(this.currentIndex,10)-1].date)
			}
		}
	},
	mounted() {
		this.onResize()
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize);
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize); 
	},
	watch: {
		runningInitiative() {
			const containerMiddle = this.listHeight/2;
			const listItem = document.getElementById(store.runningInitiative+'_radio').parentNode
			const listItemScrollMiddle = listItem.offsetTop + listItem.clientHeight/2
			document.getElementById('timelist').scrollTop = listItemScrollMiddle - containerMiddle;
			this.currentIndex = listItem.getAttribute('data-index')
		}
	}
}
</script>

<style scoped>
#timelist-container {
	display: flex;
	flex-direction: column;
	padding: 0px;
	margin: 0px;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	position: relative;
}
.opener {
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: rgb(244, 246, 248);
	cursor: pointer;
	top: 0px;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.opener p {
	color: rgb(82,82,82);
	display: block;
	position: relative;
	font-size: 20px;
	font-weight: 400;
	padding: 20px 25px;
	transition: all .25s;
	border-radius: 12px;
	background-color: transparent;
	margin: 75px;
	line-height: 1.5em;
}
.opener:hover p {
	transform: translateY(-8px);
	background-color: white;
}
.opening-enter-active,
.opening-leave-active {
	transition: all .3s ease-in-out;
}
.opening-enter,
.opening-leave-to {
	height: 0px;
}

.next, .previous {
	cursor: pointer;
	display: inline-block;
	position: absolute;
	height: 80px;
	width: 100%;
	transition: all .35s;
	text-align: center;
}
.disabled {
	pointer-events: none;
	opacity: .15;
	cursor: default;
}
.previous {
	top: 0px;
	background-image: linear-gradient(180deg, rgba(244, 246, 248,1) 33%, rgba(255,255,255,0));
}
.next {
	bottom: 0px;
	background-image: linear-gradient(0deg, rgba(244, 246, 248,1) 33%, rgba(255,255,255,0));
}

.previous .arrow, .next .arrow {
	position: relative;
	cursor: pointer;
	display: inline-block;
	box-sizing: border-box;
	padding: 0px;
	top: 10px;
	width: 60px;
	height: 60px;
	background-color: rgb(255,255,255);
	/* box-shadow: 0px 3px 5px -3px rgba(0,0,0,.25); */
	border-radius: 50%;
	transition: all .25s;
}
.previous:hover .arrow, .next:hover .arrow {
	box-shadow: 0px 8px 12px -5px rgba(0,0,0,.35);
}
.arrow-stem {
	position: absolute;
	left: 50%;
	bottom: 19px;
	transform: translateX(-50%);
	background-color: rgb(110, 110, 110);
	width: 2px;
	height: 22px;
	border-radius: 1px;
	transition: all .25s;
}
.arrow-head {
	position: absolute;
	left: 50%;
	bottom: 20px;
	border-color: rgb(110, 110, 110);
	width: 18px;
	height: 18px;
	border-radius: 3px 1px;
	border-width: 0px 2px 2px 0px;
	border-style: solid;
	transform: translateX(-50%) rotate(45deg);
	transition: all .25s;
}
.next:hover .arrow-stem {
	bottom: 13px;
	height: 28px;
	background-color: rgb(64, 64, 64);
}
.next:hover .arrow-head {
	bottom: 14px;
	border-color: rgb(64, 64, 64);
}
.previous .arrow-stem {
	top: 19px;
}
.previous .arrow-head {
	top: 20px;
	border-width: 2px 0px 0px 2px;
}
.previous:hover .arrow-stem {
	top: 13px;
	height: 28px;
	background-color: rgb(64, 64, 64);
}
.previous:hover .arrow-head {
	top: 14px;
	border-color: rgb(64, 64, 64);
}

#timelist {
	flex: 1;
	margin: 0px;
	box-sizing: border-box;
	padding: 40% 5px;
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	position: relative;
	scroll-behavior : smooth;
}
li {
	padding: 0px;
	position: relative;
	display: block;
	width: 100%;
	color: rgb(56,56,56);
}
input {
	display: none;
	position: relative;
}
label {
	background-color: rgb(255,255,255);
	opacity: .2;
	cursor: pointer;
	margin: 0px;
	padding: 35px 45px;
	display: block;
	position: relative;
	transition: all .25s ease;
	transform: scale(.96);
	border-radius: 3px;
	border-left: 3px solid black;
}
/* label:hover {
	opacity: .8;
} */
input:checked+label {
	cursor: default;
	transform: scale(1);
	opacity: 1;
	box-shadow: 0px 3px 8px -5px rgba(0,0,0,.5);
}
label.isEnabled {
	opacity: .7;
}
h5 {
	font-size: 18px;
	font-weight: 600;
	margin: 0px;
	padding: 0px;
	line-height: 1.35em;
}
p {
	font-size: 15px;
	line-height: 1.5em;
}
</style>