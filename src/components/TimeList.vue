<template>
	<div id="timelist-container">
		<ul id="timelist">
			<li class="timecard-container" v-for="(initiative, i) in dataArray" :key="initiative.id+'_'+i" :data-index="i">
				<input type="radio"
						:key="i+'_input'"
						:id="initiative.id+'_radio'"
						v-model="timelistInitiative"
						:value="{id: initiative.id, date: initiative.date}">
				<label :key="i+'_label'"
					:for="initiative.id+'_radio'"
					:class="{'isEnabled': i < currentIndex }">
					<h5>{{ initiative.titre }}</h5>
					<p>	{{ initiative.date.toLocaleDateString('fr-CA', {month: 'long', year: 'numeric', day: 'numeric'}) }}</p>
					<p>{{ initiative.description }}</p>
				</label>
			</li>
		</ul>
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
		}
	},
	methods: {
		onResize() {
			this.listHeight = document.getElementById('timelist').clientHeight;
		},
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

#timelist {
	flex: 1;
	margin: 0px;
	box-sizing: border-box;
	padding: 40% 0px;
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	height: 100%;
	position: relative;
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
	opacity: .35;
	cursor: pointer;
	margin: 40px;
	padding: 30px 45px;
	display: block;
	border-radius: 3px;
	position: relative;
	transition: all .2s ease-in-out;
	transform: scale(.94)
}
label:hover {
	opacity: 1;
	background-color: rgba(120, 175, 99, .2);
}
input:checked+label {
	cursor: default;
	transform: scale(1);
	opacity: 1;
	background-color: rgb(255,255,255);
	box-shadow: 0px 10px 25px -12px rgba(0,0,0,.5);
}
label.isEnabled {
	opacity: 1;
	background-color: rgba(0,0,0,.02)
}

p {
	font-size: 14px;
	line-height: 1.5em;
}
</style>