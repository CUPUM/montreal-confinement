<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="balisage-photo" class="view-scroll">
		<h1>Test</h1>
		<div class="center-col">
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
			<p>test</p>
		</div>

		<div class="center-col">
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'BalisagePhoto',
	components: {
		ChapterNav
	},
	computed: {
	},
	methods: {
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#balisage-photo {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
</style>