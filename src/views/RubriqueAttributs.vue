<template>
	<div id="rubrique-attributs">
		<div class="center-col">
			<h2>Caractérisation des attributs urbains &amp; presse écrite</h2>
			<p>Ut sed leo fringilla, rutrum ligula id, sodales metus. Morbi eu porttitor nibh. Nunc sed ultricies lectus. Nulla libero quam, elementum vitae mollis in, pretium vitae mi. Quisque non efficitur lacus. Nullam sodales egestas erat ut pellentesque. Maecenas sagittis lacus id commodo faucibus. Suspendisse eu fringilla risus. Morbi et condimentum ante. Nulla aliquet molestie mi, non iaculis sem luctus id. Mauris in finibus eros. Duis eu tincidunt urna. Curabitur finibus lacus orci, eu mattis metus scelerisque non. Nullam eu ornare lectus. Vestibulum non dui odio.</p>
			<p>Duis at consequat nunc. Nunc aliquam, lectus quis condimentum congue, diam ex ultricies augue, vitae fermentum ligula ipsum sed arcu. Mauris pulvinar lorem at viverra porta. Phasellus ante lorem, congue a tincidunt ut, fermentum ac leo. Nam leo ante, consectetur non iaculis in, dapibus eget orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non dapibus nisl. In sagittis malesuada sodales. Pellentesque congue tortor lorem, nec cursus arcu cursus ac. Donec lobortis metus sed eleifend fringilla. Aliquam tellus urna, aliquet a nisl ut, ullamcorper semper orci. Nullam vulputate risus magna, vitae scelerisque eros laoreet quis. Morbi blandit varius ligula ut malesuada. Praesent dolor dui, ullamcorper quis nisl eget, tristique porttitor diam. Integer hendrerit libero quis est mattis fringilla. Sed tristique quam in molestie dignissim.</p>
			<h3>Quels attributs urbains sont soulevés dans les préoccupations et valorisations relayées par les médias au temps de la COVID-19?</h3>
			<p>Lorem ipsum dolor sit amet. Le texte de descrption propre à cette section serait affiché ici. Or, une portion pourrait aussi se retrouver au bas de la page, après la visualisation.</p>
			<h3>Quelles sont les préoccupations et valorisations relayées par les médias au sujet des divers attributs urbains recensés</h3>
			<p>Text de remplissage pour simple test de mise en page. Veullez ajouter vos poèmes ici</p>
			<p id="select">
				<!-- <select v-model="choix">
					<option v-for="(code, i) in codesList" v-bind:key="i">{{ code }}</option>
				</select> -->
			</p>
		</div>
		<div id="cluster-external-container">
			<div id="attributs-pane">
				<h1>Attributs</h1>
				<ul>
					<li v-for="(code, i) in codesList" v-bind:key='i+"_li"'>
						<input v-bind:key='i+"_input"' type="radio" :id='code+"_radio"' :value='code' v-model="choix">
						<label v-bind:key='i+"_label"' :for='code+"_radio"'>{{ code }}</label>
					</li>
				</ul>
			</div>
			<div id="visualisation-pane">
				<div id="bubbles-pane">
					<BubbleCluster
						:chartID="'bubbles-caracterisation'"
						:dataArray="bubblesCaracterisation"
						:weightKey="'occurrences'"
						:wordKey="'mot'" />
				</div>
				<div id="timeline-pane">
					<Timeline 
					:chartID="'timeline-caracterisation'"
					:dataArray="timelineCaracterisation"
					:wordKey="'mot'"
					:textKey="'citation'"
					:groupKey="'groupe'"
					:timeKey="'date'"
					:startDate="toDate('03/13/20','/')"
					:endDate="toDate('05/16/20','/')" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import DataRubrique from '@/assets/data/attributs-presse.json'
import BubbleCluster from '@/components/BubbleCluster'
import Timeline from '@/components/Timeline'

export default {
	name: 'RubriqueAttributs',
	components: {
		BubbleCluster,
		Timeline
	},
	data() {
		return {
			choix: ''
		}
	},
	created() {
		this.dataArray = DataRubrique.Quotations;
		for ( let i = 0; i < this.dataArray.length; i++ ) {
			this.dataArray[i]['Codes'] = this.dataArray[i]['Codes'].split(/ *; */);
		}
		Object.freeze(this.dataArray)
	},
	computed: {
		// dataArray() {
		// 	var expandedArray = DataRubrique.Quotations
		// 	for ( let i = 0; i < expandedArray.length; i++ ) {
		// 		expandedArray[i]['Codes'] = expandedArray[i]['Codes'].split(/ *; */);
		// 	}
		// 	return Object.freeze(expandedArray)
		// },
		codesList() {
			var flags = [], codes = [];
			for ( let i = 0; i < this.dataArray.length; i++ ) {
				var quotationCodes = this.dataArray[i]['Codes'];
				for ( let j = 0; j < quotationCodes.length; j++ ) {
					if( flags[quotationCodes[j]] ) continue;
					flags[quotationCodes[j]] = true;
					codes.push(quotationCodes[j]);
				}
			}
			return codes.sort()
		},

		occurrencesArrays() {
			var occurrences = {};
			
			this.codesList.forEach(code => {
				const correspondingQuotations = this.dataArray.filter( quotation => quotation['Codes'].some( quotationCodes => quotationCodes === code ));
				occurrences[code] = [];
				var caracterisation = {};
				caracterisation[code] = [];
				for ( var i = 0; i < correspondingQuotations.length; i++ ) {
					caracterisation[code].push( correspondingQuotations[i]['Quotation Content'].trim().toLowerCase() )
				}
				const map =  caracterisation[code].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

				map.forEach( (value, key) => {
					occurrences[code].push( { "mot":key, "occurrences":value } )
				})
			});
			console.log(occurrences);
			return occurrences
		},
		bubblesCaracterisation() {
			return Object.freeze(this.occurrencesArrays[this.choix])
		},

		timelineArrays() {
			const haveDate = this.dataArray.filter( quotation => quotation['Date'] != undefined && quotation['Date'].trim() != (undefined || ""));
			var datedCaract = {};

			this.codesList.forEach(code => {
				datedCaract[code] = [];
				const haveCode = haveDate.filter( quotation => quotation['Codes'].some( quotationCodes => quotationCodes === code ));

				if (haveCode.length > 0) {
					haveCode.forEach( codedQuotation => datedCaract[code].push({
						mot: codedQuotation['Quotation Name'],
						date: this.toDate(codedQuotation['Date'],'/'),
						citation: codedQuotation['Citation'],
						groupe: codedQuotation['Groupe']
					}))
				} else {
					datedCaract[code] = null;
				}
			});
			return datedCaract
		},
		timelineCaracterisation() {
			console.log(this.timelineArrays[this.choix]);
			return Object.freeze(this.timelineArrays[this.choix])
		}
	},	
	methods: {
		toDate(dateString, separator) {
			const Array = dateString.split(separator);
			const date = new Date(20+Array[2].trim(), Array[0].trim()-1, Array[1].trim());
			return date
		}
	}
}
</script>

<style scoped>
#rubrique-attributs {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow-y: auto;
}

#cluster-external-container {
	display: flex;
	flex: 1;
	position: relative;
	height: 90%;
	margin: 90px;
	right: 5px;
	overflow: hidden;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -10px rgba(0,0,0,.5);
}
#cluster-external-container h1 {
	user-select: none;
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
	font-size: 12px;
	letter-spacing: 3px;
	line-height: 1em;
	margin: 10px;
	padding: 10px;
	color: rgb(175, 175, 175);
	text-align: center;
	text-transform: uppercase;
	border-bottom: 1px solid rgba(255,255,255,.2);
}

#attributs-pane {
	display: inline-flex;
	flex-direction: column;
	position: relative;
	top: 0px;
	left: 0px;
	height: 100%;
	width: 250px;
	/* flex: 0 0 250px; équivalent de width 250px mais en précisant flex-grow 0 et flex-shrink 0 */
	background: rgb(48, 48, 48);
	overflow: hidden;
}
#attributs-pane ul {
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 0px 0px 20px 0px;
	text-indent: 0px;
	margin: 0px;
}
#attributs-pane li {
	display: block;
	list-style-type: none;
	text-indent: 0;
	margin: 0px;
	line-height: 1.5em;
	font-size: 12px;
	color: rgb(200, 200, 200);
	transition: all .3s ease-in-out;
}
#attributs-pane input {
	display: none;
}

#attributs-pane label {
	display: block;
	cursor: pointer;
	padding: 12px 24px;
	transition: all .15s linear;
	border-radius: 1px;
}
#attributs-pane label:hover {
	background-color: rgb(200,200,200);
	color: rgb(48, 48, 48);
}
#attributs-pane input:checked+label {
	font-weight: 700;
	color: rgb(243, 218, 77);
	background-color: rgb(34, 34, 34);
}
#attributs-pane input:checked+label:hover {
	cursor: default;
}

#visualisation-pane {
	display: inline-flex;
	flex-direction: column;
	position: relative;
	top: 0px;
	left: 0px;
	height: 100%;
	flex: 1;
	background: rgb(255, 255, 255);
	overflow: hidden;

}
#bubbles-pane {
	position: relative;
	display: flex;
	flex: 1;
	overflow: hidden;
	width: 100%;
	background: white;
	padding: 0px;
	margin: 0px;
}
#timeline-pane {
	position: relative;
	bottom: 0px;
	height: 100px;
	width: 100%;
	background-color: rgb(241, 242, 245);
}
</style>