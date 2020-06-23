<template>
	<div id="analyse-photo">
		<div class="center-col">
			<h2>Analyse de photographies urbaines de Montréal en temps de COVID-19</h2>
			<p>Donec semper porttitor justo. Praesent convallis bibendum sodales. Aliquam elit lectus, porttitor ut porta id, aliquet eget urna. Quisque commodo ipsum condimentum odio tempus, in posuere erat faucibus. Morbi tincidunt euismod velit eu congue. In vel nisi lobortis, luctus purus a, condimentum sapien. In tincidunt sit amet sem vitae dictum. In hac habitasse platea dictumst. Etiam pulvinar est porta ipsum pharetra, in dapibus nibh rhoncus. Praesent ornare erat et elementum porta. Pellentesque consectetur odio est, eget vehicula est vestibulum quis. Duis ut ipsum eget urna ultrices blandit. Pellentesque eu risus id libero vestibulum dignissim vitae a odio. Aliquam nibh massa, viverra at ligula eu, finibus rutrum ipsum. Donec tincidunt, nulla vitae vestibulum fringilla, libero nisl tempus est, sed mollis mi leo pulvinar enim. Nullam turpis magna, laoreet ut est non, elementum gravida mauris.</p>
		</div>

		<div class="center-col">
			<h3>Caractérisation visuelle<br><small>(Analyse de la composition &amp; du sujet)</small></h3>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud1'"
				:dataArray="mergedData['caracterisation-visuelle']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue(1)"
				:ratio="1.5"/>
		</div>

		<div class="center-col">
			<h3>Contextes urbains et éléments physiques</h3>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud2'"
				:dataArray="mergedData['elements-physiques']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue(2)"
				:ratio="1.5"/>
		</div>

		<div class="center-col">
			<h3>Présence humaine dans la composition</h3>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud3'"
				:dataArray="mergedData['presence-humaine']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue(3)"
				:ratio="1.5"/>
		</div>

		<div class="center-col">
			<h3>Ambiance</h3>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud4'"
				:dataArray="mergedData['ambiance']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue(4)"
				:ratio="1.5"/>
		</div>

		<div class="center-col">
			<h3>Sentiment / sensation / évocation</h3>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud5'"
				:dataArray="mergedData['evocation-sentiment-sensation']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue(5)"
				:ratio="1.5"/>
		</div>

		<div class="center-col">
			<h3>Schématisation d'une identité conceptuelle du paysage urbain de Montréal en temps de crise sanitaire</h3>
			<p>Lorem ipsum!</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import WordCloud from '@/components/WordCloud'
import data1 from '@/assets/data/photo-P-reduced2.json'
import data2 from '@/assets/data/photo-E-reduced2.json'
import data3 from '@/assets/data/photo-C-reduced2.json'

export default {
	name: 'AnalysePhoto',
	components: {
		WordCloud
	},
	computed: {
		themes() {
			const keys = Object.keys(data1);
			return keys
		},
		data1() {
			return Object.freeze(data1)
		},
		data2() {
			return Object.freeze(data2)
		},
		data3() {
			return Object.freeze(data3)
		},
		mergedData() {
			var merger = {}
			var reducedMerger = {}
			var slicedMerger = {}

			this.themes.forEach(theme => {
				merger[theme] = [];
				[this.data1, this.data2, this.data3].forEach(individualData => {
					merger[theme] = merger[theme].concat(individualData[theme])
				})

				var holder = {};
				merger[theme].forEach(segment => {
					if ( holder[segment['mot']] != (undefined && null))  {
						holder[segment['mot']] = holder[segment['mot']] + parseInt(segment['poids'],10)
					} else {
						holder[segment['mot']] = parseInt(segment['poids'],10)
					}
				})

				reducedMerger[theme] = []
				for (var prop in holder) {
					reducedMerger[theme].push({mot: prop, poids: holder[prop]})
				}
				slicedMerger[theme] = reducedMerger[theme].sort((a,b) => b['poids'] - a['poids']).slice(0,20)
			})
			return Object.freeze(slicedMerger)
		}
	},
	methods: {
		defineHue(nth) {
			const ntotal = 5
			return (360 / ntotal+1) * nth + 10
		}
	}
}
</script>

<style scoped>
#analyse-photo {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow-y: auto;
}
.wordcloud-container {
	display: inline-block;
	box-sizing: border-box;
	width: 100%;
	height: 500px;
	padding: 0px 100px;
	background: transparent;
}
/* .WordCloud-row {
	box-sizing: border-box;
	margin: 0;
	padding: 80px;
	width: 100%;
	text-align: center;
}
.WordCloud-wrapper {
	box-sizing: border-box;
	display: inline-block;
	padding: 20px;
	width: 31%;
	margin: 20px 1%;
	background-color: white;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -15px rgba(0,0,0,.5);
} */
</style>