<template>
	<div>
		<el-button v-for="(value,key,index) in getallmessage" :key="index" @click="show(key)">{{key}}</el-button>
		<div v-show="detail" id="showdetail">
				<el-row>
					<el-col :span="22">应用</el-col>
					<el-col :span="2">
						<el-tooltip class="item" effect="light" content="添加应用" placement="right" > 
							<i class="el-icon-circle-plus-outline" style="color:green;" @click="addproject(repo)"></i>
						</el-tooltip>
					</el-col>
				</el-row>
				<el-row v-for="(project,index) in projects" :key="index">
					<el-col :span="22">
						{{project}}
					</el-col>
					<el-col :span="2">
						<el-tooltip class="item" effect="light" content="移除" placement="right" > 
							<i class="el-icon-remove-outline" style="color:red;" @click="removeproject(repo,project)"></i>
						</el-tooltip>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24"><hr></el-col>
				</el-row>
				<el-row>
					<el-col :span="22">主机</el-col>
					<el-col :span="2">
						<el-tooltip class="item" effect="light" content="添加主机" placement="right" >
							<i class="el-icon-circle-plus-outline" style="color:green;" @click="addhost(repo)"></i>
						</el-tooltip>
					</el-col>
				</el-row>
				<el-row v-for="(host,index) in hosts" :key="index">
					<el-col :span="22">
						{{host}}
					</el-col>
					<el-col :span="2">
						<el-tooltip class="item" effect="light" content="移除" placement="right"> 
							<i class="el-icon-remove-outline" style="color:red;" @click="removehost(repo,host)"></i>
						</el-tooltip>
					</el-col>
				</el-row>
		</div>
		<div id="addcontainer" v-show="add">
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			sdfsdfsdfds<br>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detail: false,
				add: false,
				hosts: [],
				projects: [],
				repo: '',
			}
		},
		methods: {
			show(key) {
				this.repo = key
				this.hosts = this.getallmessage[key].hosts
				this.projects = this.getallmessage[key].projects
				this.detail = true
			},
			addproject(repo) {
				console.log(repo)
				this.add = true
			},
			removeproject(repo, project) {
				console.log(repo, project)
			},
			addhost(repo) {
				console.log(repo)
				this.add = true
			},
			removehost(repo,host) {
				console.log(repo,host)
			},
		},
		computed: {
			getallmessage() {
				return this.$store.getters.getallmessage
			}
		},
	}
</script>

<style scoped>
	#showdetail {
		width:20%;
		/*border: 1px solid red;*/
		line-height: 30px;
		margin-left: 2%;
		margin-top: 2%;

	}
	#addcontainer {
		display: flex;
		position: absolute;
		top:60px;
		/*border: 1px solid red;*/
		width: 50%;
		right: 6%;
	}
</style>