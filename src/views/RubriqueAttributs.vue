<template>
	<div id="rubrique-attributs">

		<div class="center-col">
			<h2>Attributs urbains dans la presse écrite</h2>
			<h3>Quels attributs du paysage urbain ont fait l’objet de préoccupations et de valorisations par les médias montréalais au temps de la COVID-19?</h3>
		</div>
		<div id="attributs-occurrences">
			<BubbleCluster
				:chartID="'bubbles-sommaire'"
				:dataArray="this.AttributsSommaire['sommaire']"
				:weightKey="'occurrences'"
				:wordKey="'attributs'"
			/>
		</div>

		<div class="center-col">
			<h3>Combien d'articles de presse ont abordés chacun des principaux attributs du paysage urbains pendant les semaines de la période de confinement?</h3>
		</div>
		<div id="attributs-semaines">
		</div>

		<div class="center-col">
			<p>La <em>rue</em> est la principale préoccupation de l’espace public montréalais. Ensuite, le <em>parc</em> constitue l’attribut majeur du paysage urbain. L’<em>automobile</em> et le <em>commerce</em> font l’objet d’attention auprès des médias en regard de l’activité économique et de la mobilité. Par leur occurrence, la <em>rue</em> et le <em>parc</em> sont les figures dominantes et valorisées du paysage urbain montréalais en mode confinement. En regard de l’ensemble des attributs répertoriés dans cette analyse, elles confirment leur importance pour la santé et le bien-être de la population urbaine à l’image de la ville hygiéniste du 19e siècle.</p>
		</div>
		<div class="center-col">
			<h3>Quelles sont les préoccupations et valorisations relayées par les médias au sujet des divers attributs urbains recensés</h3>
			<p>Text de remplissage pour simple test de mise en page. Veullez ajouter vos poèmes ici</p>
			<p>Ut sed leo fringilla, rutrum ligula id, sodales metus. Morbi eu porttitor nibh. Nunc sed ultricies lectus. Nulla libero quam, elementum vitae mollis in, pretium vitae mi. Quisque non efficitur lacus. Nullam sodales egestas erat ut pellentesque. Maecenas sagittis lacus id commodo faucibus. Suspendisse eu fringilla risus. Morbi et condimentum ante. Nulla aliquet molestie mi, non iaculis sem luctus id. Mauris in finibus eros. Duis eu tincidunt urna. Curabitur finibus lacus orci, eu mattis metus scelerisque non. Nullam eu ornare lectus. Vestibulum non dui odio.</p>
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
						:dataArray="attributSingleCaracterisation"
						:weightKey="'occurrences'"
						:wordKey="'mot'"
						:colorKey="'color'"
					/>
				</div>
				<div id="timeline-pane">
					<h1>Premières occurrences</h1>
					<Timeline
						:chartID="'timeline-caracterisation'"
						:dataArray="attributSingleTimeline"
						:wordKey="'mot'"
						:textKey="'citation'"
						:groupKey="'groupe'"
						:timeKey="'date'"
						:showDates="true"
						:startDate="toDate('03/13/20','/')"
						:endDate="toDate('05/16/20','/')"
						:colorKey="'color'"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import AttributsDetail from '@/assets/data/attributs-detail.json'
import AttributsSommaire from '@/assets/data/attributs-sommaire.json'
import BubbleCluster from '@/components/BubbleCluster'
import Timeline from '@/components/Timeline'

export default {
	name: 'RubriqueAttributs',
	components: {
		BubbleCluster,
		Timeline
	},
	data() {
		Object.freeze(AttributsSommaire)
		Object.freeze(AttributsDetail)
		return {
			choix: 'Autobus',
			AttributsSommaire,
			AttributsDetail,
			expandedQuotations: null
		}
	},
	created() {
		this.expandedQuotations = AttributsDetail.Quotations;
		for ( let i = 0; i < this.expandedQuotations.length; i++ ) {
			this.expandedQuotations[i]['Codes'] = this.expandedQuotations[i]['Codes'].split(/ *; */);
		}
		Object.freeze(this.expandedQuotations);
	},
	computed: {
		codesList() {
			var flags = [], codes = [];
			for ( let i = 0; i < this.expandedQuotations.length; i++ ) {
				var quotationCodes = this.expandedQuotations[i]['Codes'];
				for ( let j = 0; j < quotationCodes.length; j++ ) {
					if( flags[quotationCodes[j]] ) continue;
					flags[quotationCodes[j]] = true;
					codes.push(quotationCodes[j]);
				}
			}
			return codes.sort()
		},

		attributSingleArrays() {
			var occurrences = {};
			this.codesList.forEach(code => {
				const correspondingQuotations = this.expandedQuotations.filter( quotation => quotation['Codes'].some( quotationCodes => quotationCodes === code ));
				occurrences[code] = [];
				var caracterisation = {};
				caracterisation[code] = [];
				for ( var i = 0; i < correspondingQuotations.length; i++ ) {
					caracterisation[code].push( correspondingQuotations[i]['Quotation Content'].replace(/(^[,'’\s]+)|([,'’\s]+$)/g, '').toLowerCase() )
				}
				const map =  caracterisation[code].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
				map.forEach( (value, key) => {
					const groupesArray = correspondingQuotations.filter(q => q['Quotation Content'].replace(/(^[,'’\s]+)|([,'’\s]+$)/g, '').toLowerCase() == key).map(qFiltered => qFiltered['Groupe'].trim())
					occurrences[code].push({
						"mot":key,
						"occurrences":value,
						"groupes": groupesArray,
						"color": this.defineColor(groupesArray)
					});
				})
			});
			return occurrences
		},

		attributSingleCaracterisation() {
			return Object.freeze(this.attributSingleArrays[this.choix])
		},

		attributSingleTimelineArrays() {
			const haveDate = this.expandedQuotations.filter( quotation => quotation['Date'] != undefined && quotation['Date'].trim() != (undefined || ""));
			var datedCaract = {};
			this.codesList.forEach(code => {
				datedCaract[code] = [];
				const haveCode = haveDate.filter( quotation => quotation['Codes'].some( quotationCodes => quotationCodes === code ));
				if (haveCode.length > 0) {
					haveCode.forEach( codedQuotation => datedCaract[code].push({
						mot: codedQuotation['Quotation Name'],
						date: this.toDate(codedQuotation['Date'],'/'),
						citation: codedQuotation['Citation'],
						groupe: codedQuotation['Groupe'],
						color: this.defineColor([codedQuotation['Groupe']])
					}))
				} else {
					datedCaract[code] = null;
				}
			});
			return datedCaract
		},

		attributSingleTimeline() {
			return Object.freeze(this.attributSingleTimelineArrays[this.choix])
		},
	},	
	methods: {
		toDate(dateString, separator) {
			const Array = dateString.split(separator);
			const date = new Date(20+Array[2].trim(), parseInt(Array[0].trim(), 10)-1, Array[1].trim());
			return date
		},
		defineColor(array) {
			var r,g,b;
			var problemes = 0;
			var fonctions = 0;
			var solutions = 0;
			const total = array.length;
			const totalsquared = Math.pow(total,2);
			const colMin = 85;
			const colRange = 145;

			array.forEach(item => {
				switch(item) {
					case "Problème":
						++problemes;
						break;
					case "Fonction":
						++fonctions;
						break;
					case "Solution":
						++solutions;
						break;
					default:
						console.log('oops, aucun groupe ne semble être correctement défini pour :'+item);
				}
			})
			r = Math.sqrt((problemes*problemes)/totalsquared) * colRange + colMin;
			g = Math.sqrt((solutions*solutions)/totalsquared) * colRange + colMin;
			b = Math.sqrt((fonctions*fonctions)/totalsquared) * colRange + colMin;

			return {'r': r, 'g': g, 'b': b}
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

#attributs-occurrences {
	width: 100%;
	height: 650px;
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
	font-size: 13px;
	font-weight: 400;
	color: rgb(161, 161, 161);
	transition: all .3s ease-in-out;
}
#attributs-pane input {
	display: none;
}

#attributs-pane label {
	display: block;
	cursor: pointer;
	padding: 14px 24px;
	transition: all .15s linear;
	border-radius: 1px;
}
#attributs-pane label:hover {
	background-color: rgba(255, 255, 255,.2);
	color: rgb(223, 223, 223);
}
#attributs-pane input:checked+label {
	color: rgb(32, 32, 32);
	background-color: rgb(248, 248, 248);
	transform: translateX(5px);
}
#attributs-pane input:checked+label:hover {
	cursor: default;
}

#visualisation-pane {
	text-align: center;
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
	height: 150px;
	width: 100%;
	background-color: rgb(241, 242, 245);
}
</style>