<template>
	<div class="dropdown-bubble">
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
			<defs>
				<filter id="glue">
					<feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
					<feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
					<feComposite in="SourceGraphic" in2="goo" operator="atop"/>
				</filter>
			</defs>
		</svg>

		<div class="glue-container">
			<transition name="constat">
				<div v-if="(selected != '')" :key="selected+'bubble'" class="constat-outer" :style="{width: this.bubbleSizes[selected]+'px', height: this.bubbleSizes[selected]+'px'}">
					<transition appear name="constat-inner">
						<div class="constat-inner" :key="selected+'inner'" v-html="colorizedData[selected]" :style="{width: this.bubbleSizes[selected]-200+'px'}"></div>
					</transition>
				</div>
			</transition>
			<div class="constat-select"></div>
		</div>

		<div class="dropdown-select" @click="isOpen = !isOpen" :ref="this.chartID">
			<div class="selected-container">
				<transition name="selected" mode="out-in">
					<h4 :key="keyString(selected)" :style="[colors[selected] != (undefined && null && '') ? {color: colors[selected]} : null]">{{selected}}</h4>
				</transition>
				<div class="drop-arrow" :class="{'close': isOpen}"></div>
			</div>
			<ul :class="{'closed': !isOpen}">
				<li v-for="(key,i) in keys" :key="key+'select'">
					<input :key="key+'input'" type="radio" :id="keyString(key)+i+'_radio'" :value="key" v-model="selected">
					<label @click="isOpen = false"
						:key="key+'label'"
						:for="keyString(key)+i+'_radio'"
						:style="[colors[key] != (undefined && null && '') ? {color: colors[key]} : null]">
						<div class="highlighter" :style="[colors[key] != (undefined && null && '') ? {backgroundColor: colors[key]} : null]"></div>
						{{ key }}
					</label>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		chartID: String,
		data: Object,
		colors: Object
	},
	data() {
		return {
			selected: '',
			isOpen: false
		}
	},
	computed: {
		keys() {
			return Object.keys(this.data)
		},
		bubbleSizes() {
			var lengths = {}
			this.keys.forEach(key => {
				lengths[key] = Math.sqrt(this.data[key].replace( /(<([^>]+)>)/ig, '').length)*21+150
			})
			return lengths
		},
		colorizedData() {
			var newData = {}
			this.keys.forEach(attribute => {
					newData[attribute] = this.data[attribute].replace('[attributecolor]', ('background-color: '+this.colors[attribute]+';padding: 0px 2px; margin: 0px 2px; font-style: normal; font-weight: 500; color: rgb(255,255,255); text-shadow: 1px 1px 3px rgba(0,0,0,.3)'))
					console.log('backgroundColor:'+this.colors[attribute])
			})
			return newData
		}
	},
	methods: {
		keyString(key) {
			return key.replace(/[^\w\s]/gi,'')
		},
		clickOutside(e) {
			if ( !this.$refs[this.chartID].contains(e.target) ) {
				this.isOpen = false;
			}
		}
	},
	mounted() {
		this.selected = this.keys[0]
		document.addEventListener('click', this.clickOutside);
	},
	beforeDestroy() {
		document.removeEventListener('click', this.clickOutside);
	},
	watch: {
	}
}
</script>

<style scoped>
svg {
	display: none;
}

.dropdown-bubble {
	position: relative;
	display: block;
	width: 100%;
	height: 700px;
	padding: 0px;
	margin: 0px;
	text-align: center;
}

.dropdown-select {
	user-select: none;
	cursor: pointer;
	top: 0px;
	position: relative;
	display: inline-block;
	width: 350px;
	text-align: center;
}
.selected-container {
	background-color: rgb(255,255,255);
	box-shadow: 2px 8px 16px -12px rgba(0,0,0,.5);
	border-radius: 5px;
	position: relative;
	min-height: 48px;
}
.dropdown-select .drop-arrow {
	display: inline-block;
	position: absolute;
	width: 50px;
	background-color: rgba(0,0,0,.025);
	transition: all .35s ease-in-out;
	right: 0px;
	height: 100%;
	transform: translateX(100%);
	border-radius: 5px;
}
.dropdown-select:hover .drop-arrow {
	background-color: rgba(255, 255, 255, .5);
}
/* Flèche pour ouvrir */
.drop-arrow::after {
	content: '';
	width: 15px;
	height: 15px;
	position: absolute;
	border-width: 0px 2px 2px 0px;
	border-radius: 1px;
	border-color: rgb(150, 150, 150);
	border-style: solid;
	transform: translate(-50%,-50%) rotate(45deg);
	top: 50%;
	left: 50%;
	transform-origin: center;
	transition: all .3s ease;
}
.drop-arrow::before {
	content: '';
	width: 2px;
	height: 20px;
	border-radius: 1px;
	position: absolute;
	background-color: rgb(150, 150, 150);
	transform: translateX(-50%);
	top: 14px;
	left: 50%;
	transition: all .3s ease;
}
.dropdown-select:hover .drop-arrow::after {
	border-color: rgb(85,85,85);
	transform: translate(-50%,-15%) rotate(45deg);
}
.dropdown-select:hover .drop-arrow::before {
	background-color: rgb(85,85,85);
	height: 27px;
}
/* Flèche pour fermer */
.drop-arrow.close {
	transform: rotate(-180deg);
	transform-origin: right bottom;
}

.dropdown-select h4 {
	user-select: none;
	display: inline-block;
	position: relative;
	color: rgb(84,84,84);
	font-size: 24px;
	font-weight: 500;
	margin: 0px;
	padding: 10px 0px;
}
.dropdown-select h4::before {
	content: '';
	right: 0px;
	bottom: 8px;
	width: 100%;
	height: 2px;
	border-radius: 1px;
	position: absolute;
	margin: 0px;
	padding: 0px;
	background-color: rgba(0,0,0,.1);
	display: inline-block;
}
.dropdown-select h4::after {
	content: '';
	right: 0px;
	bottom: 8px;
	width: 0%;
	height: 2px;
	border-radius: 1px;
	position: absolute;
	margin: 0px;
	padding: 0px;
	background-color: rgb(84,84,84);
	display: inline-block;
	transition: all .3s ease;
}
.dropdown-select:hover h4::after {
	left: 0px;
	width: 100%;
}
.selected-enter-active,
.selected-leave-active {
	transition: all .4s ease;
}
.selected-enter {
	transform: translateX(-10px);
	opacity: 0
}
.selected-leave-to {
	transform: translateX(10px);
	opacity: 0
}

.dropdown-select ul {
	overflow: hidden;
	position: relative;
	z-index: 1;
	background-color: rgb(255, 255, 255);
	max-height: 500px;
	list-style-type: none;
	text-indent: 0px;
	margin: 0px;
	padding: 0px;
	display: block;
	box-sizing: border-box;
	box-shadow: 1px 5px 12px -10px rgba(0,0,0,.2);
	border-radius: 5px;
	transition: all .2s ease-in-out;
}
.dropdown-select ul.closed {
	opacity: .5;
	max-height: 0px;
}
.dropdown-select li {
	position: relative;
	text-indent: 0px;
	display: block;
	padding: 0px;
	border-top: 1px solid rgb(245, 245, 245);
}
.dropdown-select input {
	display: none;
}
.dropdown-select label {
	text-align: left;
	position: relative;
	color: rgb(112,112,112);
	z-index: 1;
	font-size: 14px;
	display: block;
	margin: 0px;
	padding: 5px 25px;
	cursor: pointer;
	transition: all .25s;
}
.dropdown-select label:hover {
	color: rgb(46, 46, 46) !important;
}
.dropdown-select .highlighter {
	z-index: -1;
	position: absolute;
	top: 0px;
	right: 0%;
	width: 0%;
	height: 100%;
	background-color: rgb(214, 214, 214);
	border-radius: 1px;
	transition: all .25s ease-in-out;
	opacity: .2;
}
.dropdown-select label:hover .highlighter {
	opacity: .5;
	width: 100%;
	left: 0%;
}
.dropdown-select input:checked+label {
	text-decoration: underline;
	pointer-events: none;
	opacity: .3;
}
input:checked+label:hover .highlighter {
	width: 0px;
}


.glue-container {
	filter:url('#glue');
}
.constat-select {
	position: absolute;
	display: inline-block;
	top: 4px;
	left: 50%;
	transform: translateX(-50%);
	width: 350px;
	height: 42px;
	background-color: rgb(218, 216, 216);
}
.constat-outer {
	text-align: center;
	overflow: hidden;
	padding: 0px;
	margin: 0px;
	position: absolute;
	display: inline-block;
	top: 75px;
	left: 50%;
	transform: translateX(-50%);
	width: 600px;
	height: 600px;
	border-radius: 50%;
	background-color: rgb(234, 235, 238);
}
.constat-enter-active,
.constat-leave-active {
	transition: all 1.2s cubic-bezier(.6,0,.4,1);
}
.constat-enter {
	background-color: rgb(221, 223, 224);
	width: 25px !important;
	height: 25px !important;
	top: 0px;
	transform: translateX(-100px);
}
.constat-leave-to {
	background-color: rgb(181, 185, 187);
	width: 0px !important;
	height: 0px !important;
	top: 600px;
	transform: translateX(100px);
}

.constat-inner {
	color: rgb(56, 56, 56);
	font-size: 16px;
	font-weight: 400;
	text-indent: 36px;
	padding: 0px;
	text-align: left;
	overflow: hidden;
	position: absolute;
	width: 400px;
	display: inline-block;
	margin: 0px;
	right: 100px;
	top: 50%;
	transform: translateY(-50%);
}
.constat-inner-enter-active,
.constat-inner-leave-active {
	transition: all 1s cubic-bezier(.6,0,.4,1) 1s;
}
.constat-inner-enter {
	opacity: 0;
	transform: translateY(-50%) translateY(-20px);
}
.constat-inner-leave-to {
	opacity: 0;
	transform: translateY(-50%) translateY(20px);
}
.constat-inner >>> em {
	display: inline;
	border-radius: 3px;
	font-weight: 700;
}

</style>