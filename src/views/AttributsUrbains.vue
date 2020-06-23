<template>
	<div id="attributs-urbains">
	<!-- Partie 1 -->
		<div class="center-col">
			<h2>Attributs urbains dans la presse écrite</h2>
			<h3>Quels attributs du paysage urbain ont fait l’objet de préoccupations et de valorisations par les médias montréalais au temps de la COVID-19?</h3>
		</div>
		<div id="attributs-sommaire">
			<BubbleCluster
				:chartID="'bubbles-sommaire'"
				:dataArray="this.AttributsSommaire['sommaire'].filter(attr => attr['occurrences']>10)"
				:weightKey="'occurrences'"
				:wordKey="'attributs'"
			/>
		</div>
		<div class="center-col">
			<p>La <em>rue</em> est la principale préoccupation de l’espace public montréalais. Ensuite, le <em>parc</em> constitue l’attribut majeur du paysage urbain. L’<em>automobile</em> et le <em>commerce</em> font l’objet d’attention auprès des médias en regard de l’activité économique et de la mobilité. Par leur occurrence, la <em>rue</em> et le <em>parc</em> sont les figures dominantes et valorisées du paysage urbain montréalais en mode confinement. En regard de l’ensemble des attributs répertoriés dans cette analyse, elles confirment leur importance pour la santé et le bien-être de la population urbaine à l’image de la ville hygiéniste du 19e siècle.</p>
		</div>

	<!-- Partie 2 -->
		<div class="center-col">
			<h3>Combien d'articles de presse ont abordés chacun des principaux attributs du paysage urbains pendant les semaines de la période de confinement?</h3>
		</div>
		<div id="semaines-wrap">
			<div class="attributs-semaines" v-for="(attribut,i) in attrList" :key="attribut+i">
				<h4>{{ attribut }}&nbsp;:</h4>
				<div class="flex-timeline">
					<Timeline
						:chartID="'timeline-attributs-semaine'"
						:dataArray="attributsSommaireSemaine[attribut]"
						:wordKey="'date'"
						:scaleLabel="'Semaine'"
						:showScaleLabel="i == attrList.length-1"
						:showScaleLine="false"
						:timeKey="'date'"
						:showDates="false"
						:startDate="toDate('03/13/20','/')"
						:endDate="toDate('05/16/20','/')"
						:colorKey="'color'"
						:marksPos="'intra'"
						:weightKey="'size'"
						:idKey="'n'"
					/>
				</div>
			</div>
		</div>

		<!-- Partie 3 -->
		<div class="center-col">
			<h3>Quelles sont les préoccupations et valorisations relayées par les médias au sujet des divers attributs urbains recensés</h3>
			<p>Text de remplissage pour simple test de mise en page. Veullez ajouter vos poèmes ici</p>
			<p>Ut sed leo fringilla, rutrum ligula id, sodales metus. Morbi eu porttitor nibh. Nunc sed ultricies lectus. Nulla libero quam, elementum vitae mollis in, pretium vitae mi. Quisque non efficitur lacus. Nullam sodales egestas erat ut pellentesque. Maecenas sagittis lacus id commodo faucibus. Suspendisse eu fringilla risus. Morbi et condimentum ante. Nulla aliquet molestie mi, non iaculis sem luctus id. Mauris in finibus eros. Duis eu tincidunt urna. Curabitur finibus lacus orci, eu mattis metus scelerisque non. Nullam eu ornare lectus. Vestibulum non dui odio.</p>
		</div>

		<div id="cluster-external-container">
			<div id="attributs-pane">
				<h4>Attributs</h4>
				<ul>
					<li v-for="(code, i) in codesList" v-bind:key='i+"_li"'>
						<input v-bind:key='i+"_input"' type="radio" :id='code+"_radio"' :value='code' v-model="choix">
						<label v-bind:key='i+"_label"' :for='code+"_radio"'>{{ code }}</label>
					</li>
				</ul>
			</div>
			<div id="visualisation-pane-outer">
				<div id="visualisation-pane-inner">
					<div :class="{'noquotes': attributSingleCaracterisationTimeline == (undefined && null && '')}" id="quotes-pane">
						<h4>Extraits</h4>
						<transition-group name="quotes" mode="out-in">
							<div class="quote-block" v-for="(quote,i) in attributSingleCaracterisationTimeline" :key="i+quote.date+quote.mot+'-block'" :style="{borderColor: quote.color}">
								<h5 :key="i+quote.date+quote.mot" :style="{color: quote.color}">{{ quote.id }}&nbsp;: {{ quote.mot }}</h5>
								<p :key="i+quote.date+quote.mot+'-quote'">«&nbsp;{{ quote.citation }}&nbsp;»</p>
							</div>
						</transition-group>
					</div>
					<div id="bubbles-pane">
						<h4>Occurrences</h4>
						<div id="bubbles-pane-inner">
							<BubbleCluster
								:chartID="'bubbles-caracterisation'"
								:dataArray="attributSingleCaracterisation"
								:weightKey="'occurrences'"
								:wordKey="'mot'"
								:colorKey="'color'"
							/>
						</div>
					</div>
				</div>
				<div id="timeline-pane">
					<h4>Apparitions média</h4>
					<div id="timeline-pane-inner">
						<Timeline
							:chartID="'timeline-caracterisation'"
							:dataArray="attributSingleCaracterisationTimeline"
							:wordKey="'mot'"
							:textKey="'citation'"
							:idKey="'id'"
							:timeKey="'date'"
							:showDates="true"
							:startDate="toDate('03/13/20','/')"
							:endDate="toDate('05/16/20','/')"
							:colorKey="'color'"
							:showScaleLine="true"
							:showScaleLabel="true"
							:scaleLabel="'Semaine'"
							:marksPos="'inter'"
						/>
					</div>
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
	name: 'AttributsUrbains',
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
			expandedQuotations: [],
			attrList: ["Automobile","Commerce","Corridor sanitaire","Parc","Piéton","Rue","Ville"]
		}
	},
	created() {
		this.expandedQuotations = [];
		AttributsDetail.Quotations.forEach(quotation => {
			this.expandedQuotations.push({
				'Quotation Name': quotation['Quotation Name'],
				'Document': quotation['Document'],
				'Quotation Content': quotation['Quotation Content'],
				'Citation': quotation['Citation'] == (null && undefined && '') ? null : quotation['Citation'],
				'Date': quotation['Date'] == (null && undefined && '') ? null : quotation['Date'],
				'Codes': quotation['Codes'].split(/ *; */),
				'Reference': quotation['Reference'],
				'Groupe': quotation['Groupe']
			})
		})
		// this.expandedQuotations = AttributsDetail.Quotations;
		// for ( let i = 0; i < this.expandedQuotations.length; i++ ) {
		// 	this.expandedQuotations[i]['Codes'] = this.expandedQuotations[i]['Codes'].split(/ *; */);
		// }
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
			return codes.sort(Intl.Collator().compare)
		},

		attributsCaracterisations() {
			var occurrences = {};
			this.codesList.forEach(code => {
				var currentCaracterisations = []
				const correspondingQuotations = this.expandedQuotations.filter( quotation => quotation['Codes'].some( quotationCodes => quotationCodes === code ));
				occurrences[code] = [];
				var caracterisation = {};
				caracterisation[code] = [];
				correspondingQuotations.forEach(singleQuotation => {
					caracterisation[code].push( singleQuotation['Quotation Content'].replace(/(^[,'’\s]+)|([,'’\s]+$)/g, '').toLowerCase() )
				})
				const map =  caracterisation[code].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
				map.forEach( (value, key) => {
					const groupesArray = correspondingQuotations.filter(q => q['Quotation Content'].replace(/(^[,'’\s]+)|([,'’\s]+$)/g, '').toLowerCase() == key).map(qFiltered => qFiltered['Groupe'].trim())
					currentCaracterisations.push({
						"mot":key,
						"occurrences":value,
						"groupes": groupesArray,
						"color": this.defineColor(groupesArray)
					});
				})
				occurrences[code] = currentCaracterisations.filter(caracterisation => caracterisation['occurrences'] > 1).sort((a,b) => b['occurrences'] - a['occurrences']).slice(0,12);
			});
			return occurrences
		},

		attributSingleCaracterisation() {
			return Object.freeze(this.attributsCaracterisations[this.choix])
		},

		attributsCaracterisationsTimeline() {
			const haveDate = this.expandedQuotations.filter( quotation => quotation['Date'] != (undefined && null && '') && quotation['Date'].trim() != (undefined && null && ''));
			const haveCitation = haveDate.filter( quotation => quotation['Citation'] != (undefined && null && ''))
			var datedCaract = {};
			this.codesList.forEach(code => {
				datedCaract[code] = [];
				const haveCode = haveCitation.filter( quotation => quotation['Codes'].some( quotationCodes => quotationCodes === code ));
				if (haveCode.length > 0) {
					haveCode.forEach( codedQuotation => datedCaract[code].push({
						mot: codedQuotation['Quotation Name'],
						date: this.toDate(codedQuotation['Date'],'/'),
						citation: codedQuotation['Citation'],
						groupe: codedQuotation['Groupe'],
						color: this.defineColor([codedQuotation['Groupe']])
					}))
					datedCaract[code].sort((a,b) => a.date - b.date).forEach((cQ,i) => cQ.id = String.fromCharCode(('A').charCodeAt(0)+i))
				} else {
					datedCaract[code] = null;
				}
			});
			return datedCaract
		},

		attributSingleCaracterisationTimeline() {
			return Object.freeze(this.attributsCaracterisationsTimeline[this.choix])
		},

		attributsSommaireSemaine() {
			var sommaire = {}
			this.attrList.forEach((attribut,i) => {
				const attrIndex = i;
				sommaire[attribut] = []
				this.AttributsSommaire['semaines'].forEach(semaine => {
					sommaire[attribut].push({
						date: this.toDate(semaine['Date milieu'].concat('/12'),'/'),
						n: semaine[attribut],
						size: Math.sqrt(semaine[attribut]*200),
						color: 'hsl('+attrIndex / this.attrList.length * 360+', 70%, 70%)'
					})
				})
			})
			return Object.freeze(sommaire)
		}
	},	
	methods: {
		toDate(dateString, separator) {
			const dateStr = dateString.split(separator);
			const date = new Date(20+dateStr[2].trim(), parseInt(dateStr[0].trim(), 10)-1, dateStr[1].trim(), dateStr.length>3 ? dateStr[3].trim():"" );
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

			return 'rgb('+r+','+g+','+b+')'
		}
	}
}
</script>

<style scoped>
#attributs-urbains {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow-y: auto;
}

#attributs-sommaire {
	margin: -50px 0px;
	width: 100%;
	height: 70vh;
}

#semaines-wrap {
	box-sizing: content-box;
	width: 850px;
	padding: 1px 150px 50px 0px;
	margin: 0 auto;
}
.attributs-semaines {
	display: flex;
	height: auto;
	max-width: 1200px;
	width: 100%;
	margin: 0px auto;
	align-items: center;
}
.attributs-semaines h4 {
	text-align: right;
	user-select: none;
	font-family: 'Poppins', sans-serif;
	font-weight: 500;
	font-size: 15px;
	width: 150px;
	height: 1em;
	margin: 0px;
	/* align-self: flex-end; */
	/* transform: translateY(45%); */
}
.flex-timeline {
	flex: 1
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

#cluster-external-container h4 {
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
	border-bottom: 1px solid rgba(175, 175, 175, 0.3);
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

#visualisation-pane-outer {
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
#timeline-pane {
	box-sizing: border-box;
	position: relative;
	bottom: 0px;
	height: 185px;
	width: 100%;
	background-color: rgb(241, 242, 245);
	padding: 0px;
}
#timeline-pane-inner {
	margin: 30px 25px
}
#visualisation-pane-inner {
	text-align: left;
	display: inline-flex;
	flex-direction: row;
	position: relative;
	top: 0px;
	left: 0px;
	height: 100%;
	flex: 1;
	background: rgb(255, 255, 255);
	overflow: hidden;

}
#quotes-pane {
	display: inline-block;
	position: relative;
	top: 0px;
	left: 0px;
	width: 275px;
	background-color: rgb(241, 242, 245);
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	transition: width .2s ease;
}
#quotes-pane.noquotes {
	width: 0px;
}
.quote-block {
	box-sizing: border-box;
	width: 255px;
	border-top: 2px solid;
	background: white;
	border-radius: 2px;
	margin: 15px 10px;
	padding: 10px;
	box-shadow: 0px 2px 2px -2px rgba(0,0,0,.2);
}
#quotes-pane h5 {
	display: block;
	padding: 0px 5px 5px 5px;
	margin: 0px;
	font-size: 16px;
	font-weight: 500;
	border-bottom: 1px solid rgba(0,0,0,.1)
}
#quotes-pane p {
	display: block;
	text-indent: 0;
	font-size: 15px;
	font-family: 'DM Serif Text', serif;
	font-style: italic;
	font-weight: 500;
	padding: 0px;
	margin: 10px;
	line-height: 1.3em;
	color: rgb(51, 51, 51);
}
.quotes-enter-active,
.quotes-leave-active {
	transform: translateY(0px);
	transition: all .2s ease-in-out .21s;
}
.quotes-enter,
.quotes-leave-to {
	opacity: 0;
	transform: translateY(-10px);
	transition: all .2s;
}

#bubbles-pane {
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	height: 100%;
	background: rgb(255, 255, 255);
	padding: 0px;
	margin: 0px;
}
#bubbles-pane-inner {
	position: relative;
	display: flex;
	flex: 1;
	overflow: hidden;
	width: auto;
	background: rgb(255, 255, 255);
	padding: 0px;
	margin: 0px;
}
</style>