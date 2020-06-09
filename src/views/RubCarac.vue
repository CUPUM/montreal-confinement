<template>
	<div id="container">
		<h2>Titre de ce texte</h2>
		<p>
			Lorem ipsum dolor sit amet. Le texte de descrption propre à cette section serait affiché ici. Or, une portion pourrait aussi se retrouver au bas de la page, après la visualisation.
		</p>
		<p id="select">
			<select v-model="choix">
				<option v-for="(code, i) in codesList" v-bind:key="i">{{ code }}</option>
			</select>
		</p>
		<div id="wordcloud-container">
			<Wordcloud v-bind:dataArray="caracterisation" v-bind:weightKey="'occurrences'" v-bind:wordKey="'mot'" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import dataRubrique from '@/assets/data/Caracterisations.json'
import Wordcloud from '@/components/Wordcloud'

export default {
	name: 'RubCarac',
	components: {
		Wordcloud,
	},
	data() {
		return {
			choix: ''
		}
	},
	created() {
		this.dataArray = dataRubrique.Quotations;
		for ( let i = 0; i < this.dataArray.length; i++ ) {
			this.dataArray[i]['Codes'] = this.dataArray[i]['Codes'].split(/ *; */);
		}
		Object.freeze(this.dataArray)
	},
	computed: {
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
					caracterisation[code].push( correspondingQuotations[i]['Quotation Content'] )
				}
				const map =  caracterisation[code].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

				//model: { [ arbre: {word: map.key, weigth: map.value}, mot2: {...} ] }
				map.forEach( (value, key) => {
					occurrences[code].push( { "mot":key, "occurrences":value } )
				})
				//occurrences[code] = map

				//const result = data.reduce((a, c) => a.set(c, (a.get(c) || 0) + 1), new Map());				
				//occurrences[code] = this.dataArray.map( quotation => quotation['Quotation Content'] )
				//occurrences[code] = correspondingQuotations;
			});
			console.log(occurrences);
			return occurrences
		},
		caracterisation() {
			return Object.freeze(this.occurrencesArrays[this.choix])
		}
	},	
	methods: {
	}
}
</script>

<style scoped>
#wordcloud-container {
	height: 900px;
	width: 100%;
}
#select {
}
</style>