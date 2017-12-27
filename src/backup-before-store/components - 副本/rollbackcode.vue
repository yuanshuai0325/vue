<template>
	<div class="mcontainer" v-loading="loading.pd" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
		<header-bar></header-bar>
		<side-bar></side-bar>
		<div class="mcontainerbox">
			<code-back :loading="loading"></code-back>
		</div>
	</div>
</template>

<script>
	import sideBar from 'bar/sideBar.vue'
	import headerBar from 'bar/headerBar.vue'
	import codeBack from 'codeback/codeBack.vue'
	export default {
		data() {
			return {
				loading: {'pd': false},
			}
		},
		components: {
			headerBar,
			sideBar,
			codeBack,
		}
	}
</script>

<style>
	
</style>