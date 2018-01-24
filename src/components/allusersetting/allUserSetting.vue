<template>
	<div class="usersetting">
		<div class="userchange">
			<div class="userbutton">
				<el-button-group>
					<el-button type="primary" plain icon="el-icon-edit" @click="changecurrent(view1)">用户管理</el-button>
					<el-button type="primary" plain icon="el-icon-setting" @click="changecurrent(view2)">添加新用户</el-button>
					<el-button type="primary" plain icon="el-icon-warning" @click="changecurrent(view3)">项目设定</el-button>
				</el-button-group>
			</div>
			<div class="userchangecontainer">
				<keep-alive>
					<component v-bind:is="currentView"></component>
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
	import addNewUser from './addNewUser.vue'
	import allUserShow from './allUserShow.vue'
	import systemSetting from './systemSetting.vue'
	export default {
		data() {
			return {
				view1 : allUserShow,
				view2 : addNewUser,
				view3 : systemSetting,
				currentView: allUserShow
			}
		},
		components: {
			addNewUser,
			allUserShow,
			systemSetting
		},
		methods: {
			changecurrent(viewname) {
				this.currentView = viewname
			}
		},
	}
</script>

<style>
	
</style>

