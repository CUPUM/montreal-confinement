<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="attributs-urbains" class="view-scroll">
		<h1>Les attributs urbains ciblés</h1>

	<!-- Partie 1 -->
		<div class="center-col">
			<h3>Quels sont les attributs du paysage urbain qui font l’objet de préoccupations dans les médias montréalais{{'\xa0'}}?</h3>
			<p>Les attributs urbains qui ont retenu l’attention des médias se résument aux éléments suivants{{'\xa0'}}: le <span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Commerce']}">commerce</span>, le <span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Parc']}">parc</span>, la <span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Rue']}">rue</span>  et la <span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Ville']}">ville</span>. Tandis que l’<span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Automobile']}">automobile</span>, le <span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Corridor sanitaire']}">corridor sanitaire</span> et le <span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Piéton']}">piéton</span> ont occupé des intérêts secondaires dans les articles de presse.</p>
		</div>
		<div id="attributs-sommaire">
			<BubbleCluster
				:chartID="'bubbles-sommaire'"
				:dataArray="attributsSommaireColored"
				:weightKey="'occurrences'"
				:wordKey="'attributs'"
				:colorKey="'color'"
			/>
		</div>
		<div class="center-col">
			<h3>À quelle occurrence les articles de presse ont abordé chacun des principaux attributs du paysage urbain{{'\xa0'}}?</h3>
			<p>Il est intéressant de noter que les trois dernières semaines de confinement sont celles où les occurrences pour chacun des attributs urbains sont les plus fortes, en lien avec le déconfinement et le retour du beau temps (printemps).</p>
		</div>

	<!-- Partie 2 -->
		<div id="semaines-wrap">
			<div class="attributs-semaines" v-for="(attribut,i) in attrList" :key="attribut+i">
				<h4><span class="attribute-highlight" :style="{ backgroundColor: attrColors[attribut]}">{{ attribut+'\xa0'+':' }}</span></h4>
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
			<h3>Quelles sont les préoccupations et valorisations relayées par les médias montréalais envers les attributs urbains recensés{{'\xa0'}}?</h3>
			<p>Les différents attributs urbains montréalais sont décrits dans les médias par des qualificatifs diversifiés qui ont été répertoriés dans cette veille informationnelle sous forme de nuages de mots. Les préoccupations et valorisations des qualificatifs des attributs sont présentées dans la figure ci-contre selon l’occurrence et selon trois groupes distinctifs qui les caractérisent{{'\xa0'}}:
				<ul>
					<li><div class="legende" :style="{backgroundColor: groupesColors.problemes.color}"></div> Problèmes{{'\xa0'}};</li>
					<li><div class="legende" :style="{backgroundColor: groupesColors.solutions.color}"></div> Solutions <i>(actions)</i>{{'\xa0'}};</li>
					<li><div class="legende" :style="{backgroundColor: groupesColors.fonctions.color}"></div> Fonctions <i>(usages/sujets/objet)</i>.</li>
				</ul>
			</p>
		</div>

		<div id="cluster-external-container">
			<div id="attributs-pane">
				<h4>Attributs</h4>
				<div class="meta" v-bar>
					<ul>
						<li v-for="(code, i) in filteredCodesList" v-bind:key='i+"_li"'>
							<input :key='i+"_input"' type="radio" :disabled="!code.hasBubbles" :id='code.code+"_radio"' :value='code.code' v-model="choix">
							<label :key='i+"_label"' :for='code.code+"_radio"' :class="{'disabled': !code.hasBubbles}" :style="[attrList.indexOf(code.code)!=-1 ? {color: attrColors[code.code], fontWeight: 600} : null]">
								<div class="highlighter" :style="[attrList.indexOf(code.code)!=-1 ? {backgroundColor: attrColors[code.code]} : null]"></div>
								{{ code.code }}
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div id="visualisation-pane-outer">
				<div id="visualisation-pane-inner">
					<div id="quotes-pane" :class="{'noquotes': ((attributSingleCaracterisationTimeline == (undefined && null && '')) && (this.ConstatsAttributs[choix] == (undefined && null && '')))}">
						<div id="citations-pane" :class="{'noquotes-inner': attributSingleCaracterisationTimeline == (undefined && null && '')}">
							<h4>Extraits</h4>
							<div class="meta" v-bar>
								<transition-group name="quotes" mode="out-in" tag="ul" class="list">
									<div class="quote-block" v-for="(quote,i) in attributSingleCaracterisationTimeline" :key="i+quote.date+quote.mot+'-block'" :style="{borderColor: quote.color}">
										<h5 :key="i+quote.date+quote.mot" :style="{color: quote.color}">
											<div class="round-label" :style="{backgroundColor: quote.color}">
												{{ quote.id }}
											</div>
											{{'\xa0'}}: {{ quote.mot }}
										</h5>
										<template v-for="(q,index) in quote.citation">
											<p :key="index+quote.date+quote.mot+'-quote'">«{{'\xa0'}}{{ q.text }}{{'\xa0'}}»</p>
											<a :key="index+quote.date+quote.mot+'-ref'" :href="q.source" target="_blank">Réf{{'\xa0'}}&#x1f855;</a>
										</template>
									</div>
								</transition-group>
							</div>
						</div>
					</div>
					<div id="bubbles-pane">
						<h4>Occurrences des qualificatifs</h4>
						<!-- <div class="bubble-bg">{{choix.toLowerCase()}}</div> -->
						<div id="bubbles-pane-inner">
							<BubbleCluster
								:chartID="'bubbles-caracterisation'"
								:dataArray="attributSingleCaracterisation"
								:weightKey="'occurrences'"
								:wordKey="'mot'"
								:colorKey="'color'"
								:textColorKey="'textColor'"
								:borderColorKey="'borderColor'"
							/>
						</div>
					</div>
				</div>
				<div id="timeline-pane">
					<h4>Parutions</h4>
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
		<div class="center-col">
			<h4>Note</h4>
			<p style="fontSize: 15px; lineHeight: 1.5em"><i>Dans la bande déroulante, les attributs urbains suivants ont été rayés{{'\xa0'}}: balcon, centre-ville, cour arrière, marché public, métro, piscine, place publique, ruelle, terrasse, terrain de jeux pour enfants et toit. Toutefois, ils ont été pris en compte dans l’analyse quantitative de la veille informationnelle. Il s’est avéré que les attributs urbains et leurs qualificatifs nommés moins que deux fois dans l’ensemble de la revue de presse n’étaient pas d’un intérêt significatif pour cette recherche.</i></p>
			<h3>Constats sur les préoccupations et valorisations</h3>
		</div>
		<div id="constats-container">
			<DropDownBubbles :chartID="'chart-constats'"
				:data="ConstatsAttributs"
				:colors="attrColors"/>
		</div>

		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import AttributsDetail from '@/assets/data/attributs-detail.json'
import AttributsSommaire from '@/assets/data/attributs-sommaire.json'
import ConstatsAttributs from '@/assets/data/constats-attributs.json'

import BubbleCluster from '@/components/BubbleCluster'
import Timeline from '@/components/Timeline'
import DropDownBubbles from '@/components/DropDownBubbles'

import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'AttributsUrbains',
	components: {
		BubbleCluster,
		Timeline,
		DropDownBubbles,
		ChapterNav
	},
	data() {
		Object.freeze(AttributsSommaire)
		Object.freeze(AttributsDetail)
		Object.freeze(ConstatsAttributs)
		return {
			choix: 'Autobus',
			AttributsSommaire,
			AttributsDetail,
			ConstatsAttributs,
			expandedQuotations: [],
			attrList: ["Automobile","Commerce","Corridor sanitaire","Parc","Piéton","Rue","Ville","Voies actives sécuritaires"]
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
				'Codes': quotation['Codes'].split(/ *; */).filter(e => (e.trim() != (null || undefined || ""))),
				'Reference': quotation['Reference'],
				'Groupe': quotation['Groupe'].trim().charAt(0).toUpperCase() + quotation['Groupe'].trim().slice(1),
				'Source': quotation['Source']
			})
		})
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

		attrColors() {
			var colors = {};
			this.attrList.forEach((attr,i) => {
				colors[attr] = 'hsl('+i / this.attrList.length * 360+', 60%, 70%)'
			})
			return colors
		},

		groupesColors() {
			var prob = {r:80, g:105, b: 75};
			var sol = {r:120, g:175, b: 99};
			var fonc = {r:195, g:225, b: 135};
			var groupes = {problemes: prob, solutions: sol, fonctions: fonc};
			['problemes','solutions','fonctions'].forEach(groupe => {
				groupes[groupe].color = 'rgb('+groupes[groupe].r+','+groupes[groupe].g+','+groupes[groupe].b+')'
			})
			return groupes
		},

		attributsCaracterisations() {
			const regExFilter = /(^[,'’\s]+(\s*.[,'’\s]+)*)|(([,'’\s]+.\s*)*[,'’\s]+$)/g // Ancienne version: /(^[,'’\s]+)|([,'’\s]+$)/g
			//const regExFilter = /(^[,'’\s]+)|([,'’\s]+$)/g
			var occurrences = {};
			this.codesList.forEach(code => {
				var currentCaracterisations = []
				const correspondingQuotations = this.expandedQuotations.filter( quotation => quotation['Codes'].some( quotationCodes => quotationCodes === code ));
				occurrences[code] = [];
				var caracterisation = {};
				caracterisation[code] = [];
				correspondingQuotations.forEach(singleQuotation => {
					caracterisation[code].push( singleQuotation['Quotation Content'].replace(regExFilter, '').toLowerCase() )
				})
				const map =  caracterisation[code].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
				map.forEach( (value, key) => {
					const groupesArray = correspondingQuotations.filter(q => q['Quotation Content'].replace(regExFilter, '').toLowerCase() == key).map(qFiltered => qFiltered['Groupe'].trim());
					let palette = this.defineColor(groupesArray);
					currentCaracterisations.push({
						mot: key,
						occurrences: value,
						groupe: groupesArray,
						color: palette.color,
						textColor: palette.textColor,
						borderColor: palette.borderColor
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
					haveCode.forEach( codedQuotation => {
						let palette = this.defineColor([codedQuotation['Groupe']]);
						datedCaract[code].push({
							mot: codedQuotation['Quotation Name'],
							date: this.toDate(codedQuotation['Date'],'/'), // Ici: trouver un moyen de contenir l'info que plusieurs citations même date pour modifier affichage dans timeline
							citation: [{
								text: codedQuotation['Citation'], // Ici: gérer lorsque plusieurs citations se rapportent à la même date + même mot (probablement ensuite utiliser if (quotation.citation.length>1...))
								source: codedQuotation['Source']
							}],
							groupe: codedQuotation['Groupe'],
							color: palette.color,
							textColor: palette.textColor,
							borderColor: palette.borderColor
						})
					})
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
			this.attrList.forEach(attribut => {
				sommaire[attribut] = []
				this.AttributsSommaire['semaines'].forEach(semaine => {
					sommaire[attribut].push({
						date: this.toDate(semaine['Date milieu'].concat('/12'),'/'),
						n: semaine[attribut],
						size: Math.sqrt(semaine[attribut]*200),
						color: this.attrColors[attribut]
					})
				})
			})
			return Object.freeze(sommaire)
		},

		attributsSommaireColored() {
			var coloredData = []
			this.AttributsSommaire['sommaire'].filter(attr => attr['occurrences']>10).forEach(attr => {
				coloredData.push({
					attributs: attr.attributs.trim(),
					occurrences: attr.occurrences,
					color: this.attrColors[attr.attributs.trim()] != (undefined && null && '')? this.attrColors[attr.attributs.trim()] : null
				})
			})
			return coloredData
		},

		filteredCodesList() {
			var filteredCodes = []
			this.codesList.forEach(thisCode => {
				filteredCodes.push({
					code: thisCode,
					hasBubbles: this.attributsCaracterisations[thisCode].length>2 ? true : false
				})
			})
			return filteredCodes
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
			var colSum = {r:0 ,g:0 ,b:0}
			const colKeys = ['r','g','b']
			const gr = this.groupesColors;
			var problemes = {n:0, r: gr.problemes.r, g: gr.problemes.g, b: gr.problemes.b};
			var solutions = {n:0, r: gr.solutions.r, g: gr.solutions.g, b: gr.solutions.b};
			var fonctions = {n:0, r: gr.fonctions.r, g: gr.fonctions.g, b: gr.fonctions.b};
			const total = array.length;
			
			array.forEach(item => {
				switch(item) {
					case "Problème":
						++problemes.n;
						colKeys.forEach(primary => { colSum[primary] += Math.pow(problemes[primary],2) });
						break;
					case "Fonction":
						++fonctions.n;
						colKeys.forEach(primary => { colSum[primary] += Math.pow(fonctions[primary],2) });
						break;
					case "Solution":
						++solutions.n;
						colKeys.forEach(primary => { colSum[primary] += Math.pow(solutions[primary],2) });
						break;
					default:
						console.log('Oops, aucun groupe ne semble être correctement défini pour : '+item);
				}
			})

			r = Math.sqrt(colSum.r/total);
			g = Math.sqrt(colSum.g/total);
			b = Math.sqrt(colSum.b/total);
			let theColor = 'rgb('+r+','+g+','+b+')';

			var theTextColor = 'rgb(24,24,24)';
			var theBorderColor = null //'rgb(24,24,24)';
			if ((.2126*r + .7152*g + .0722*b)<165) { // Threshold de pseudo-luminance pour inverser couleur de typo (en réalité il faudrait transposer gamma-RGB(0-255) vers linéaire)
				theTextColor = 'rgb(255,255,255)'
				theBorderColor = null
			}
			return {color: theColor, textColor: theTextColor, borderColor: theBorderColor}
		},
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#attributs-urbains {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
#attributs-sommaire {
	margin: -60px 0px -50px 0px;
	width: 100%;
	height: 75vh;
}
.attribute-highlight {
	padding: 0px 4px;
	margin: 0px 2px;
	border-radius: 3px;
	font-weight: 500;
	color: white;
	text-shadow: 1px 1px 2px rgba(0,0,0,.25)
}

#semaines-wrap {
	position: relative;
	left: -100px;
	box-sizing: content-box;
	max-width: 925px;
	min-width: 600px;
	padding: 35px 0px 50px 0px;
	margin: 0px auto 50px auto;
}
.attributs-semaines {
	display: flex;
	height: auto;
	width: 100%;
	margin: 0px auto;
	align-items: center;
}
.attributs-semaines h4 {
	padding: 0px;
	text-align: right;
	user-select: none;
	font-family: 'Poppins', sans-serif;
	font-weight: 500;
	font-size: 14px;
	width: 200px;
	height: 1em;
	margin: 0px;
}
.flex-timeline {
	flex: 1
}

.legende {
	position: relative;
	display: inline-block;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	padding: 0px;
	margin: 0px 10px;
	bottom: -5px;
}

#cluster-external-container {
	display: flex;
	flex: 1;
	position: relative;
	height: 90%;
	margin: 45px 90px;
	left: 0px;
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
	background: rgb(252,253,255);
	overflow: hidden;
}
#attributs-pane h4 {
	color: rgb(125,125,125);
	border-bottom: 1px solid rgba(125,125,125, 0.3);
}
#attributs-pane ul {
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 0px 0px 30px 0px;
	text-indent: 0px;
	margin: 0px;
}
#attributs-pane li {
	display: block;
	list-style-type: none;
	text-indent: 0;
	margin: 0px;
	transition: all .2s linear;
}
#attributs-pane input {
	display: none;
}

#attributs-pane label {
	font-size: 13px;
	line-height: 1.5em;
	font-weight: 400;
	color: rgb(136, 136, 136);
	position: relative;
	z-index: 1;
	user-select: none;
	display: block;
	cursor: pointer;
	padding: 14px 24px;
	transition: all .2s linear;
	border-radius: 1px;
}
#attributs-pane label .highlighter {
	border-radius: 1px;
	z-index: -1;
	top: 0px;
	right: 0px;
	position: absolute;
	padding: 0px;
	margin: 0px;
	width: 0%;
	height: 100%;
	opacity: .25;
	background-color: rgb(206, 206, 206);
	transition: all .2s ease-in-out;
}
#attributs-pane label:hover {
	color: rgb(56, 56, 56) !important;
}
#attributs-pane label:hover .highlighter {
	width: 100%;
	left: 0px;
	opacity: 1;
}
#attributs-pane input:checked+label {
	pointer-events:none;
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
	color: rgb(233, 233, 233);
	transform: translateX(5px);
}
#attributs-pane input:checked+label .highlighter {
	background-color: rgb(70, 70, 70) !important;
	opacity: 1;
	width: 100%;
	height: 100%;
}
#attributs-pane input:checked+label:hover {
	cursor: default;
}
#attributs-pane label.disabled {
	text-decoration: line-through;
	cursor: default;
	opacity: .3;
	pointer-events:none;
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
	height: 165px;
	width: 100%;
	background-color: rgb(241, 242, 245);
	padding: 0px;
}
#timeline-pane-inner {
	margin: 15px 25px
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
	display: inline-flex;
	flex-direction: column;
	position: relative;
	top: 0px;
	left: 0px;
	width: 300px;
	background-color: rgb(241, 242, 245);
	height: 100%;
	overflow: hidden;
	transition: width .2s ease;
}
#quotes-pane.noquotes {
	width: 0px;
}
#quotes-pane .noquotes-inner {
	max-height: 0%;
	padding-bottom: 0px;
	padding-top: 0px;
}

#citations-pane {
	flex: 1;
	max-height: 100%;
	flex-direction: column;
	display: flex;
	overflow: hidden;
}
#citations-pane ul {
	display: block;
	flex: 1;
	padding: 0px 0px 30px 0px;
	margin: 0px;
	overflow-x: hidden;
	overflow-y: auto;
}
.quote-block {
	position: relative;
	box-sizing: border-box;
	display: block;
	border-top: 3px solid;
	background: white;
	border-radius: 3px;
	margin: 15px 16px;
	padding: 10px;
	box-shadow: 0px 2px 3px -2px rgba(0,0,0,.2);
}
.quote-block .round-label {
	color: white;
	display: inline-block;
	border-radius: 50%;
	text-align: center;
	text-shadow: 1px 1px 2px rgba(0,0,0,.2);
	width: 25px;
	height: 25px;
}
.quote-block h5 {
	display: block;
	padding: 0px 5px 10px 5px;
	margin: 0px;
	font-size: 16px;
	font-weight: 500;
	border-bottom: 1px solid rgba(0,0,0,.1)
}
.quote-block p {
	display: block;
	text-indent: 0;
	font-size: 16px;
	font-family: 'Spectral', serif;
	font-style: italic;
	font-weight: 500;
	padding: 0px;
	margin: 10px;
	line-height: 1.3em;
	color: rgb(51, 51, 51);
}
.quote-block a {
	z-index: 1;
	color: rgb(120, 175, 99);
	text-align: center;
	font-size: 12px;
	font-weight: 400;
	text-decoration: none;
	letter-spacing: 1px;
	background-color: rgba(120, 175, 99,.1);
	border-radius: 2px;
	padding: 4px 6px;
	position: relative;
	display: block;
	transition: all .2s ease-in-out;
}
.quote-block a:hover {
	color: rgb(5255,255,255);
}
.quote-block a::before {
	border-radius: 2px;
	z-index: -1;
	content: '';
	width: 100%;
	height: 0%;
	background-color: rgba(120, 175, 99,.5);
	position: absolute;
	left: 0px;
	bottom: 0px;
	transition: all .2s ease-in-out;
}
.quote-block a:hover::before {
	height: 100%;
	top: 0px;
}

.quotes-enter-active,
.quotes-leave-active {
	max-height: 1000px;
	transform: translateY(0px);
	transition: all .2s ease-in-out .2s;
}
.quotes-enter,
.quotes-leave-to {
	box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
	max-height: 0px;
	margin: 0px 10px;
	padding: 0px 10px;
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
	padding: 0px;
	margin: 0px;
}

.bubble-bg {
	opacity: .02;
	box-sizing: border-box;
	word-wrap: none;
	padding: 45px 25px;
	line-height: .9em;
	position: absolute;
	width: 100%;
	height: auto;
	top: 50%;
	font-size: 35vh;
	font-weight: 700;
	overflow: hidden;
	transform: translateY(-50%);
}

#constats-container {
	box-sizing: content-box;
	margin: 0px 100px;
	padding: 0px;
	position: relative;
	display: block;
}
</style>