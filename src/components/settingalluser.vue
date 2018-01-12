<template>
	<div class="mcontainer">
		<header-bar></header-bar>
		<side-bar></side-bar>
		<div class="mcontainerbox">
			<all-user-setting></all-user-setting>
		</div>
	</div>
</template>

<script>
	import sideBar from 'bar/sideBar.vue'
	import headerBar from 'bar/headerBar.vue'
	import allUserSetting from 'allusersetting/allUserSetting.vue'

	export default {
		components: {
			sideBar,
			headerBar,
			allUserSetting
		}
	}
	
</script>

<style>
	
</style>