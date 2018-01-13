<template>
	<div class="usersetting">
		<div class="userchange">
			<div class="userbutton">
				<el-button-group>
					<el-button type="primary" plain icon="el-icon-edit" @click="changecurrent(view1)">用户管理</el-button>
					<el-button type="primary" plain icon="el-icon-setting" @click="changecurrent(view2)">添加新用户</el-button>
				</el-button-group>
			</div>
			<div class="userchangecontainer">
				<div>
					<component v-bind:is="currentView"></component>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import addNewUser from './addNewUser.vue'
	import allUserShow from './allUserShow.vue'
	export default {
		data() {
			return {
				view1 : allUserShow,
				view2 : addNewUser,
				currentView: allUserShow
			}
		},
		components: {
			addNewUser,
			allUserShow
		},
		methods: {
			changecurrent(viewname) {
				this.currentView = viewname
			}
		},
	}
</script>

<style>
#ausersetting {
	width: 100%;
}
#auschange {
	margin: 2% 2%;
	height: 90%;
	width: 96%;
	/*border: 1px solid red;*/
}
#auschangecontainer {
	margin: 0 auto;
	text-align: center;
}
	
</style>

