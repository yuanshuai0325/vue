<template>
	<div class="mcontainer">
		<header-bar></header-bar>
		<side-bar></side-bar>
		<show></show>
	</div>
</template>

<script>
	import sideBar from './bar/sideBar.vue'
	import headerBar from './bar/headerBar.vue'
	import show from './show.vue'
	export default {
		components: {
			headerBar,
			sideBar,
			show,
		}
	}
</script>

<style scoped>
	.mcontainer {
		height: 100%;
	}
</style>