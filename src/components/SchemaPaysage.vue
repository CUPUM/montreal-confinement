<template>
	<div id="schema-paysage">
		<div class="outline">
			<div id="gauche-container">
				<div class="figure" @click="tab('Impressions générales')" :class="{ 'active':active=='Impressions générales' }">
					<div class="highlighter"></div>
					<span>Impressions<br>générales</span>
				</div>
			</div>
			<div id="centre-container">
				<div class="attribut-container noselect" @click="tab('Formes')" :class="{ 'active':active=='Formes' }">
					<div class="arrow"></div>
					<div class="attribut">
						Formes
					</div>
				</div>
				<div class="attribut-container noselect" @click="tab('Thèmes')" :class="{ 'active':active=='Thèmes' }">
					<div class="arrow"></div>
					<div class="attribut">
						Thèmes
					</div>
				</div>
				<div class="attribut-container noselect" @click="tab('Intentions')" :class="{ 'active':active=='Intentions' }">
					<div class="arrow"></div>
					<div class="attribut">
						Intentions
					</div>
				</div>
			</div>
			<div id="droite-container">
				<div class="figure right" @click="tab('Expressions locales')" :class="{ 'active':active=='Expressions locales' }">
					<div class="highlighter"></div>
					<span>Expressions<br>locales</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		active: String
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
		tab(tabName) {
			this.$emit('opentab', tabName)
			event.stopPropagation()
		}
	}
}
</script>

<style scoped>
#schema-paysage {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 20px 50px 50px 50px;
	box-sizing: border-box;
}
.outline {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: auto;
	padding: 60px 15px;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100%' ry='100%' stroke='rgb(64,64,64)' stroke-width='2' stroke-dasharray='4%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	border-radius: 100%;
}
#gauche-container,
#droite-container {
	display: inline-block;
	position: relative;
	width: auto;
	flex: 1;
	height: auto;
	text-align: center;
}
#droite-container {
	text-align: center;
}
.figure {
	cursor: pointer;
	font-size: 21px;
	font-weight: 600;
	position: relative;
	padding: 20px 30px;
	transition: all .2s;
}
.figure span {
	color: rgb(56,56,56);
	position: relative;
	z-index: 2;
	transition: all .35s;
}
.figure:hover span {
	color: rgb(120, 175, 99);
}
.highlighter {
	position: absolute;
	width: 150px;
	height: 150px;
	border-radius: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	opacity: 0;
	transition: all .25s;
}
.figure:hover .highlighter {
	width: 200px;
	height: 200px;
	opacity: 1;
}
.active {
	pointer-events: none;
}
.figure.active .highlighter {
	width: 180px;
	height: 180px;
	opacity: 1;
	background-color: rgb(120, 175, 99);
}
.figure.active span {
	color: white;
}


#centre-container {
	margin: 0px 85px;
	display: inline-flex;
	flex-direction: column;
	position: relative;
	width: auto;
	align-items: center;
	justify-content: center;
	padding: 5px 20px;
	height: auto;
	border-radius: 25px;
	background: rgb(255, 255, 255);
	box-shadow: 2px 12px 20px -8px rgba(0,0,0,.2);
	transition: all .3s;
}
#centre-container:hover {
	box-shadow:0px 3px 8px -5px rgba(0,0,0,0);
}
.attribut-container {
	position: relative;
}
.attribut {
	text-align: center;
	width: 150px;
	color: rgb(56,56,56);
	cursor: pointer;
	font-size: 19px;
	font-weight: 500;
	margin: 20px 0px;
	display: block;
	position: relative;
	padding: 20px 25px;
	border-radius: 12px;
	box-shadow:0px 1px 5px -2px rgba(0,0,0,.25);
	transition: all .3s;
	background: rgba(255, 255, 255,1);
}
.attribut:hover {
	color: rgb(120, 175, 99);
	box-shadow: 2px 8px 20px -8px rgba(0,0,0,.35);
}
.active .attribut {
	background-color: rgb(120, 175, 99);
	color: white;
}
.arrow {
	pointer-events: none;
	height: 2px;
	width: 330px;
	background-color: rgb(105, 105, 105);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
}
.arrow::before,
.arrow::after {
	content: '';
	margin: 0px;
	padding: 0px;
	top: 50%;
	width: 10px;
	height: 10px;
	position: absolute;
	left: 0px;
	transform-origin: center;
	transform: translate(0%, -50%) rotate(45deg);
	border-style: solid;
	border-color: rgb(105, 105, 105);
	border-width: 0px 0px 3px 3px;
	border-radius: 1px 2px;
}
.arrow::after {
	transform: translate(-100%, -50%) rotate(45deg);
	border-width: 3px 3px 0px 0px;
	left: 100%;
}
</style>