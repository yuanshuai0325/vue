<template>
	<div class="usersetting">
		<div class="userchange">
			<div class="userbutton">
				<el-button-group>
					<el-button type="primary" plain icon="el-icon-edit" @click="changecurrent(view1)">修改密码</el-button>
					<el-button type="primary" plain icon="el-icon-setting" @click="changecurrent(view2)">其他设置</el-button>
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
	import changePw from "./changePw.vue"
	import changeOther from "./changeOther.vue"
	export default {
		data() {
			return {
				view1 : changePw,
				view2 : changeOther,
				currentView: changePw
			}
		},
		components: {
			changePw,
			changeOther,
		},
		methods: {
			changecurrent(viewname) {
				this.currentView = viewname
			}
		},
	}
</script>

<style>
/*#usersetting {
	width: 100%;
}
#uschange {
	margin: 2% 2%;
	height: 90%;
	width: 96%;
	border: 1px solid red;
}
#uschangecontainer {
	margin: 0 auto;
	text-align: center;
}*/
	
</style>

