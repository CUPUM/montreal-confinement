<template>
	<div id="humain">
		<div class="center-col">
			<h2>L'humain dans la ville en temps de crise de COVID-19</h2>
		</div>

		<div id="humain-sommaire">
			<BubbleCluster
				:chartID="'bubbles-qualificatifs-humain'"
				:dataArray="this.QualificatifsHumain['qualificatifs']"
				:weightKey="'occurrences'"
				:wordKey="'qualificatifs'"
			/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import QualificatifsHumain from '@/assets/data/qualificatifs-humains.json'
import BubbleCluster from '@/components/BubbleCluster'

export default {
	name: 'Humain',
	components: {
		BubbleCluster
	},
	data() {
		Object.freeze(QualificatifsHumain)
		return {
			QualificatifsHumain
		}
	}
}
</script>

<style scoped>
#humain {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
#humain-sommaire {
	margin: -50px 0px;
	width: 100%;
	height: 80vh;
}
</style>