<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="post-confinement" class="view-scroll">
		<PageTitle/>
		<div class="center-col">
			<h3>Page en construction</h3>
			
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'PostConfinement',
	components: {
		PageTitle,
		ChapterNav
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	},
}
</script>

<style scoped>
#post-confinement {
	width: 100%;
	height: 100%;
}
</style>