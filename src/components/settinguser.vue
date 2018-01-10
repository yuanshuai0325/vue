<template>
	<div class="mcontainer">
		<header-bar></header-bar>
		<side-bar></side-bar>
		<div class="mcontainerbox">
			<user-setting></user-setting>
		</div>
	</div>
</template>

<script>
	import sideBar from 'bar/sideBar.vue'
	import headerBar from 'bar/headerBar.vue'
	import userSetting from 'usersetting/userSetting.vue'
	export default {
		components: {
			headerBar,
			sideBar,
			userSetting
		}
	}
</script>

<style>
	
</style>