<template>
	<div id="analyse-photo">
		<div class="center-col">
			<h2>Nuage de mots</h2>
			<p>Donec semper porttitor justo. Praesent convallis bibendum sodales. Aliquam elit lectus, porttitor ut porta id, aliquet eget urna. Quisque commodo ipsum condimentum odio tempus, in posuere erat faucibus. Morbi tincidunt euismod velit eu congue. In vel nisi lobortis, luctus purus a, condimentum sapien. In tincidunt sit amet sem vitae dictum. In hac habitasse platea dictumst. Etiam pulvinar est porta ipsum pharetra, in dapibus nibh rhoncus. Praesent ornare erat et elementum porta. Pellentesque consectetur odio est, eget vehicula est vestibulum quis. Duis ut ipsum eget urna ultrices blandit. Pellentesque eu risus id libero vestibulum dignissim vitae a odio. Aliquam nibh massa, viverra at ligula eu, finibus rutrum ipsum. Donec tincidunt, nulla vitae vestibulum fringilla, libero nisl tempus est, sed mollis mi leo pulvinar enim. Nullam turpis magna, laoreet ut est non, elementum gravida mauris.</p>
			<p>Ut quis tellus a sem sodales interdum nec rutrum orci. Cras pulvinar lobortis rhoncus. Sed in mattis nunc, sit amet vestibulum justo. Quisque volutpat tincidunt arcu, in volutpat mauris lacinia in. Suspendisse bibendum velit scelerisque neque sollicitudin, at semper odio hendrerit. Praesent fringilla risus ut quam porttitor dictum. Aenean vehicula nibh in lobortis volutpat. Duis varius tempor nunc. Pellentesque sem mi, mattis ut mi elementum, dapibus lacinia ipsum. Etiam blandit lectus sit amet tempus lobortis. Morbi purus mauris, dignissim vel pulvinar non, pellentesque et tellus. In id augue scelerisque, vestibulum nunc id, pellentesque ipsum. Curabitur ultrices urna id nisl consectetur, nec ultrices turpis dictum. Praesent elementum ultricies orci id euismod.</p>
		</div>

		<!-- Caractérisation visuelle -->
		<div class="center-col">
			<h3>Caractérisation visuelle<br><small>(Analyse de la composition &amp; du sujet)</small></h3>
		</div>
		<div class="wordcloud-row">
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart1-1'"
					:title="'1er titre'"
					:dataArray="data1['caracterisation-visuelle']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart1-2'"
					:title="'2e titre'"
					:dataArray="data2['caracterisation-visuelle']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>			
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart1-3'"
					:title="'3e titre'"
					:dataArray="data3['caracterisation-visuelle']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
		</div>
		<!-- * * * * * -->

		<!-- Éléments physiques -->
		<div class="center-col">
			<h3>Contexte urbain &amp; éléments physiques</h3>
		</div>
		<div class="wordcloud-row">
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart2-1'"
					:title="'1er titre'"
					:dataArray="data1['elements-physiques']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart2-2'"
					:title="'2e titre'"
					:dataArray="data2['elements-physiques']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>			
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart2-3'"
					:title="'3e titre'"
					:dataArray="data3['elements-physiques']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
		</div>
		<!-- * * * * * -->

		<!-- Présence humaine -->
		<div class="center-col">
			<h3>Présence humaine dans la composition</h3>
		</div>
		<div class="wordcloud-row">
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart3-1'"
					:title="'1er titre'"
					:dataArray="data1['presence-humaine']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart3-2'"
					:title="'2e titre'"
					:dataArray="data2['presence-humaine']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>			
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart3-3'"
					:title="'3e titre'"
					:dataArray="data3['presence-humaine']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
		</div>
		<!-- * * * * * -->

		<!-- Ambiance -->
		<div class="center-col">
			<h3>Ambiance</h3>
		</div>
		<div class="wordcloud-row">
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart4-1'"
					:title="'1er titre'"
					:dataArray="data1['ambiance']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart4-2'"
					:title="'2e titre'"
					:dataArray="data2['ambiance']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>			
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart4-3'"
					:title="'3e titre'"
					:dataArray="data3['ambiance']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
		</div>
		<!-- * * * * * -->

		<!-- Évocation-sentiment-sensation -->
		<div class="center-col">
			<h3>Évocation/sentiment/sensation</h3>
		</div>
		<div class="wordcloud-row">
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart5-1'"
					:title="'1er titre'"
					:dataArray="data1['evocation-sentiment-sensation']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart5-2'"
					:title="'2e titre'"
					:dataArray="data2['evocation-sentiment-sensation']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>			
			<div class="wordcloud-wrapper">
				<WordCloud
					:chartID="'chart5-3'"
					:title="'3e titre'"
					:dataArray="data3['evocation-sentiment-sensation']"
					:wordKey="'mot'"
					:weightKey="'poids'"/>
			</div>
		</div>
		<!-- * * * * * -->

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
.wordcloud-row {
	box-sizing: border-box;
	margin: 0;
	padding: 80px;
	width: 100%;
	text-align: center;
}
.wordcloud-wrapper {
	box-sizing: border-box;
	display: inline-block;
	padding: 20px;
	width: 31%;
	margin: 20px 1%;
	background-color: white;
	border-radius: 12px;
	box-shadow: 2px 12px 25px -15px rgba(0,0,0,.5);
}
</style>