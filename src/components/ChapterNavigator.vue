<template>
	<div class="chapter-navigator">
		<div v-if="this.previous" class="previous-chapter"></div>
		<div v-if="this.next" class="next-chapter"></div>
	</div>
</template>

<script>
export default {
	props: {
		next: Boolean,
		previous: Boolean
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
	},
	mounted() {
	}
}
</script>

<style scoped>
.chapter-navigator {
	background-color: purple;
}
</style>