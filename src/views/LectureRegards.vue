<template>
	<div id="analyse-photo" class="view-scroll">
		<h1>Analyse de photographies urbaines de Montréal</h1>
		<div class="center-col">
			<p>Les résultats de la lecture paysagère se déclinent successivement en cinq (5) thèmes de caractérisation présentés ci-dessous sous la forme de nuage de mots qui identifient les principaux éléments prédominants dans une analyse descriptive (<i>composition/sujet</i>, <i>contexte urbain</i>, <i>présence humaine</i>) et sensible (<i>ambiance</i>, <i>sentiment/évocation</i>) de la composition visuelle de chaque cliché photographique.</p>

			<h3>Composition visuelle</h3>
			<p>L’analyse visuelle révèle l’importance de l’éclairage naturel. La lumière du <em><i>soleil</i></em> ressort comme un élément notable dans les compositions photographiques. Notons toutefois que cette prédominance du soleil n’est pas forcément toujours synonyme de scènes lumineuses ou extérieures. La luminosité est aussi caractérisée comme <em><i>lumière diffuse</i></em> et à quelques reprises comme <em><i>lumière directe</i></em>, voire <em><i>lumière artificielle</i></em>. Elle se traduit également par la <em><i>clarté</i></em>. La <em><i>fermeture rapprochée</i></em> du champ visuel constitue le deuxième élément dominant des cadrages analysés. Elle s’oppose à la profondeur de champs visuel, soit le <em><i>troisième plan</i></em>. Par ailleurs, les <em><i>vues axiales</i></em> sont associées aux voies de transport.</p>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud1'"
				:dataArray="mergedData['caracterisation-visuelle']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue()"
				:ratio="1.5"/>
		</div>
		<div class="center-col">
			<h3>Contextes et attributs urbains</h3>
			<p>Le <em><i>métro</i></em>, la <em><i>rue</i></em> et le <em><i>trottoir</i></em> constituent les trois éléments physiques repérés le plus fréquemment dans l’échantillon de clichés photographiques. En ce qui concerne le <em><i>métro</i></em>, l’intérêt des photographes semble s’orienter autant vers des scènes dans les <em><i>stations</i></em> que dans les <em><i>wagons</i></em>. Dans l’ensemble des photographies, les <em><i>rues</i></em> se caractérisent plus spécifiquement en tant que <em><i>rues vides</i></em> et <em><i>rues commerciales</i></em> où une <em><i>absence de circulation automobile</i></em> règne. Les <em><i>trottoirs</i></em>, bien que souvent repérés, sont seulement caractérisés à quelques reprises, et ce par le qualificatif «{{'\xa0'}}<em><i>étroit</i></em>{{'\xa0'}}». Par ailleurs, il est à noter que les clichés accordent une importance, d’une part, aux <em><i>façades</i></em> qui côtoient les diverses voies de circulation repérées et, d’autre part, aux <em><i>intersections</i></em> entre ces voies. Le <em><i>centre-ville</i></em> de Montréal est le secteur urbain privilégié dans les cadrages photographiques.</p>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud2'"
				:dataArray="mergedData['elements-physiques']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue()"
				:ratio="1.5"/>
		</div>
		<div class="center-col">
			<h3>Présence humaine en cadrage</h3>
			<p>L’humain présenté par les photographes est typiquement <em><i>seul</i></em>, i.e. non groupé. Mais, plus encore, il est souvent unique (<em><i>un.e</i></em>) dans le cadre. Alors que la figure du piéton <em><i>en marche</i></em> est celle la plus caractéristique des clichés analysés, de manière générale la présence humaine notée se retrouve au <em><i>deuxième</i></em> et <em><i>premier plan</i></em> sur le <em><i>trottoir</i></em>. Toutefois, une proportion non négligeable des images colligées est totalement dépourvue de présence humaine (<em><i>absence</i></em>).</p>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud3'"
				:dataArray="mergedData['presence-humaine']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue()"
				:ratio="1.5"/>
		</div>
		<div class="center-col">
			<h3>Ambiance</h3>
			<p>Une ambiance <em><i>froide</i></em>, qui soulève l’inconfort des lieux, caractérise la plupart des scènes capturées, pour certaines d’entre-elles, il est juste d’employer les termes <em><i>aride</i></em> et <em><i>désertique</i></em>. Cette palette de qualificatifs s’étaye fort probablement en partie sur les conditions météorologiques hivernales rudes de la période illustrée, un facteur rencontré annuellement par les montréalais à la saison documentée (hiver). L’emploi répétitif des qualificatifs d’ambiance, tels <em><i>sans vie</i></em>, <em><i>figée</i></em>, <em><i>calme</i></em> et <em><i>monotone</i></em> se rapporte à l’immobilité de la ville durant la période de confinement.</p>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud4'"
				:dataArray="mergedData['ambiance']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue()"
				:ratio="1.5"/>
		</div>
		<div class="center-col">
			<h3>Sentiment / sensation / évocation</h3>
			<p>Les principaux sentiments qu’évoquent les photographies sont la <em><i>solitude</i></em>, la <em><i>froideur</i></em> et le <em><i>vide</i></em>. Or, ces sentiments et les ambiances notées précédemment ne semblent pas uniquement se rattacher au contexte de la crise sanitaire, mais aussi à celui météorologique. Effectivement, les analyses révèlent une certaine tension entre l’<em><i>anormalité</i></em> de certaines scènes et la <em><i>normalité</i></em> évoquée par d’autres images. Au fil des photos, une sensation d’<em><i>étrangeté</i></em> et d’<em><i>inquiétude</i></em> est présente. Tout de même, cette nouvelle expérience de la ville plus <em><i>calme</i></em> sème l’<em><i>ennui</i></em> et l’<em><i>indifférence</i></em> chez les observateurs des regards photographiques.</p>
		</div>
		<div class="wordcloud-container">
			<WordCloud
				:chartID="'wordcloud5'"
				:dataArray="mergedData['evocation-sentiment-sensation']"
				:wordKey="'mot'"
				:weightKey="'poids'"
				:baseHue="defineHue()"
				:ratio="1.5"/>
		</div>
		<div class="center-col">

			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'
import WordCloud from '@/components/WordCloud'
import data1 from '@/assets/data/photo-P-reduced2.json'
import data2 from '@/assets/data/photo-E-reduced2.json'
import data3 from '@/assets/data/photo-C-reduced2.json'

export default {
	name: 'LectureRegards',
	components: {
		ChapterNav,
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
		defineHue() {
			//const ntotal = 5
			//return (360 / ntotal+1) * nth + 10
			return 103
		}
	}
}
</script>

<style scoped>
#analyse-photo {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
.wordcloud-container {
	display: inline-block;
	box-sizing: border-box;
	width: 100%;
	height: 350px;
	padding: 0px 100px;
	background: transparent;
	margin: 20px 0px 40px 0px;
}
</style>