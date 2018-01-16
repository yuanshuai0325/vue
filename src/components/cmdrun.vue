<template>
	<div class="mcontainer" v-loading="storeloading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
		<header-bar></header-bar>
		<side-bar></side-bar>
		<div class="mcontainerbox">
			<run-cmd :loading="loading"></run-cmd>
		</div>
	</div>
</template>

<script>
	import sideBar from 'bar/sideBar.vue'
	import headerBar from 'bar/headerBar.vue'
	import runCmd from 'runcmd/runCmd.vue'
	export default {
		data(){
			return {
				loading: {'pd': false},
			}
		},
		components: {
			headerBar,
			sideBar,
			runCmd,
		},
		computed: {
			storeloading() {
				return this.$store.getters.loading
			}
		}
	}
</script>

<style>
	
</style>