<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="mediagraphie" class="view-scroll">
		<h1>Médiagraphie</h1>
		<div class="center-col">
			<h3>Références scientifiques</h3>
			<p>ajouter ici</p>
			<h3>Références de presse</h3>
			<p>ajouter ici aussi</p>
			<h3>Références photo</h3>
			<p>ajouter ici la liste incroyablement longue</p>
		</div>
		<div class="center-col">
			<ChapterNav :previous="true" :next="false" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'Mediagraphie',
	components: {
		ChapterNav
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#mediagraphie {
	width: 100%;
	height: 100%;
}
</style>