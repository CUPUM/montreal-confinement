<template>
	<div id="timelist-container">
		<div class="meta" v-bar ref="vbar">
			<ul id="timelist">
				<li class="timecard-container" v-for="(initiative, i) in dataArray" :key="initiative.id+'_'+i" :data-index="initiative.index">
					<input type="radio"
							:key="i+'_input'"
							:id="initiative.id+'_radio'"
							v-model="timelistInitiative"
							:value="{id: initiative.id, date: initiative.date}">
					<label :key="i+'_label'"
						:for="initiative.id+'_radio'"
						:class="{'isEnabled': initiative.index < currentIndex }">
						<h5>{{ initiative.titre }}</h5>
						<p>{{ initiative.id }}</p>
						<p>	{{ initiative.date.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}</p>
						<p>{{ initiative.description }}</p>
						<p>{{ initiative.place }}</p>
						<a v-if="initiative.ref!=(undefined && null && '')" class="reference-link" target="_blank" :href="initiative.ref">Réf{{'\xa0'}}&#x1f855;</a>
					</label>
				</li>
			</ul>
		</div>
		<div @click="previous" class="previous" :class="{'disabled': currentIndex==0}">
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
	</div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
	props: {
		dataArray: Array,
	},
	data() {
		return {
			listHeight: Number,
			currentIndex: Number
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

.next, .previous {
	cursor: pointer;
	display: inline-block;
	position: absolute;
	height: 70px;
	width: 100%;
	transition: all .35s;
	text-align: center;
}
.disabled {
	pointer-events: none;
	opacity: .25;
	cursor: default;
}
.previous {
	top: 0px;
	background-image: linear-gradient(to bottom, rgba(244, 246, 248,1), rgba(255,255,255,0));
}
.next {
	bottom: 0px;
	background-image: linear-gradient(to top, rgba(244, 246, 248,1), rgba(255,255,255,0));
}

.previous .arrow, .next .arrow {
	position: relative;
	cursor: pointer;
	display: inline-block;
	box-sizing: border-box;
	padding: 0px;
	top: 10px;
	width: 50px;
	height: 50px;
	background-color: rgb(255,255,255);
	box-shadow: 0px 3px 5px -3px rgba(0,0,0,.25);
	border-radius: 50%;
	transition: all .25s;
}
.previous:hover .arrow, .next:hover .arrow {
	box-shadow: 0px 8px 12px -5px rgba(0,0,0,.5);
}
.arrow-stem {
	position: absolute;
	left: 50%;
	bottom: 16px;
	transform: translateX(-50%);
	background-color: rgb(110, 110, 110);
	width: 2px;
	height: 20px;
	border-radius: 1px;
	transition: all .25s;
}
.arrow-head {
	position: absolute;
	left: 50%;
	bottom: 17px;
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
	bottom: 10px;
	height: 26px;
	background-color: rgb(64, 64, 64);
}
.next:hover .arrow-head {
	bottom: 11px;
	border-color: rgb(64, 64, 64);
}
.previous .arrow-stem {
	top: 16px;
}
.previous .arrow-head {
	top: 17px;
	border-width: 2px 0px 0px 2px;
}
.previous:hover .arrow-stem {
	top: 10px;
	height: 26px;
	background-color: rgb(64, 64, 64);
}
.previous:hover .arrow-head {
	top: 11px;
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
	padding: 3px 0px;
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
	opacity: .25;
	cursor: pointer;
	margin: 0px;
	padding: 30px 45px;
	display: block;
	border-radius: 3px;
	box-shadow: 0px 3px 8px -5px rgba(0,0,0,.5);
	position: relative;
	transition: all .25s ease;
	transform: scale(.96);
}
label:hover {
	opacity: .5;
}
input:checked+label {
	cursor: default;
	transform: scale(1);
	opacity: 1;
}
label.isEnabled {
	opacity: .65;
}

p {
	font-size: 14px;
	line-height: 1.4em;
}
</style>