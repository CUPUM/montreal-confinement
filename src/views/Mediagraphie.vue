<template>
	<div id="mediagraphie" class="view-scroll">
		<h1>Médiagraphie</h1>
		<div class="center-col">
			<p>Contenu à venir</p>
		</div>
		<div class="center-col">
			<ChapterNav :previous="true" :next="false" />
		</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'Mediagraphie',
	components: {
		ChapterNav
	}
}
</script>

<style scoped>

</style>