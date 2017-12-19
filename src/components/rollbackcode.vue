<template>
	<div id="rbcode">
		<header-bar></header-bar>
		<side-bar></side-bar>
		<div class="mcontainerbox">
			<code-back></code-back>
		</div>
	</div>
</template>

<script>
	import sideBar from 'bar/sideBar.vue'
	import headerBar from 'bar/headerBar.vue'
	import codeBack from 'code/codeBack.vue'
	export default {
		components: {
			headerBar,
			sideBar,
			codeBack,
		}
	}
</script>

<style>
	
</style>