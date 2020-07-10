<template>
	<div id="humain" class="view-scroll">
		<h1>L'humain dans la ville</h1>
		<div class="center-col">
			<h3>L'humain en qualificatifs</h3>
			<p>Le <span class="attribute-highlight" :style="{ backgroundColor: this.attrColors['Piéton']}">piéton</span>, le <em>citadin</em> et le <em>travailleur</em> constituent les deux figures dominantes qui ressortent de cette analyse. L’<em>enfant</em> et l’<em>itinérant</em> restent une préoccupation importante tout comme le <em>cycliste</em> vis-à-vis de l’espace public. Il est également intéressant de remarquer l’absence de certains groupes sociaux, comme les autochtones et les personnes racisées (et/ou immigrantes) dans les contenus médias. Le genre (homme et femme), l’aîné et l’automobiliste constituent des termes secondaires vis-à-vis de l’espace public montréalais.</p>
		</div>

		<div id="humain-sommaire">
			<BubbleCluster
				:chartID="'bubbles-qualificatifs-humain'"
				:dataArray="humainColorized"
				:weightKey="'occurrences'"
				:wordKey="'qualificatifs'"
				:colorKey="'color'"
			/>
		</div>
		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'

import QualificatifsHumain from '@/assets/data/qualificatifs-humains.json'
import BubbleCluster from '@/components/BubbleCluster'

export default {
	name: 'Humain',
	components: {
		BubbleCluster,
		ChapterNav
	},
	data() {
		Object.freeze(QualificatifsHumain)
		return {
			QualificatifsHumain,
			attrList: ["Automobile","Commerce","Corridor sanitaire","Parc","Piéton","Rue","Ville"]
		}
	},
	computed: {
		humainColorized() {
			var colorized = [];
			this.QualificatifsHumain['qualificatifs'].forEach( qual => {
				colorized.push({
					qualificatifs: qual['qualificatif'],
					occurrences: qual['occurrences'],
					color: (qual['qualificatif'].indexOf('piéton') !== -1) ? this.attrColors['Piéton']: null
				})
			})
			return colorized
		},
		attrColors() {
			var colors = {};
			this.attrList.forEach((attr,i) => {
				colors[attr] = 'hsl('+i / this.attrList.length * 360+', 60%, 70%)'
			})
			return colors
		},
	}
}
</script>

<style scoped>
#humain {
	width: 100%;
	height: 100%;
}
#humain-sommaire {
	margin: 50px 0px;
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
</style>