<template>
	<div id="systemsetting">
			<el-tabs type="border-card" id="sscard">
  				<el-tab-pane label="信息展示"><show-message></show-message></el-tab-pane>
  				<el-tab-pane label="修改配置">配置管理</el-tab-pane>
  				<el-tab-pane label="增加配置">角色管理</el-tab-pane>
  				<el-tab-pane label="删除配置">定时任务补偿</el-tab-pane>
			</el-tabs>
	</div>
</template>

<script>
	import showMessage from './showMessage.vue'
	export default {
		components: {
			showMessage,
		},
	}
</script>

<style scoped>
	#systemsetting {
		margin-top: 2%;
		/*border: 1px solid red;*/
		height: 90%;
	}
	#sscard {
		height: 95%;
	}
</style>