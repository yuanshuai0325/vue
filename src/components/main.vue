<template>
	<div class="mcontainer" v-loading="loading.pd" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
		<header-bar></header-bar>
		<side-bar></side-bar>
		<div class="mcontainerbox">
			<show :loading="loading"></show>
		</div>
	</div>
</template>

<script>
	import sideBar from 'bar/sideBar.vue'
	import headerBar from 'bar/headerBar.vue'
	import show from 'show/show.vue'
	export default {
		data(){
			return {
				loading: {'pd': false},
			}
		},
		components: {
			headerBar,
			sideBar,
			show,
		}
	}
</script>

<style>
	
	
</style>