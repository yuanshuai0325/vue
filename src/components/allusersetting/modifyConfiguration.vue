<template>
	<div id="edit">
		<el-button v-for="(value,key,index) in getallmessage" :key="index" @click="show(key)">{{key}}</el-button>
		<el-tooltip class="item" effect="light" content="添加repo" placement="right" > 
			<i class="el-icon-circle-plus-outline" style="color:green;" @click="addrepo"></i>
		</el-tooltip>
		<el-tooltip class="item" effect="light" content="移除" placement="right" > 
			<i class="el-icon-remove-outline" style="color:red;" @click="removerepo()"></i>
		</el-tooltip>
		<div id="showdetail" v-show="detail">
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
							<i class="el-icon-remove-outline" style="color:red;" @click="removeproject(project)"></i>
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
							<i class="el-icon-remove-outline" style="color:red;" @click="removehost(host)"></i>
						</el-tooltip>
					</el-col>
				</el-row>
		</div>
		<div id="addcontainer" v-show="add">
			<!-- <keep-alive> -->
				<component v-bind:is="currentView"></component>
			<!-- </keep-alive> -->
		</div>
	</div>
</template>

<script>
	import addRepo from './addRepo.vue'
	import delRepo from './delRepo.vue'
	import addHost from './addHost.vue'
	import addProject from './addProject.vue'
	export default {
		data() {
			return {
				detail: false,
				add: false,
				// hosts: [],
				// projects: [],
				currentView: 'addHost',
			}
		},
		components: {
			addRepo,
			delRepo,
			addHost,
			addProject,
		},
		methods: {
			show(key) {
				this.$store.dispatch("SetRepo", key)
				// this.hosts = this.getallmessage[key].hosts
				// this.projects = this.getallmessage[key].projects
				this.$store.dispatch("SetProjects", this.getallmessage[key].projects)
				this.$store.dispatch("SetHosts", this.getallmessage[key].hosts)
				this.detail = true
				this.add = false
			},
			addrepo() {
				// this.detail = true
				this.detail = false
				this.add = true
				this.currentView = "addRepo"
			},
			removerepo() {
				console.log(11111111111111)
				this.detail = false
				this.add = true
				this.currentView = "delRepo"
			},
			addproject(repo) {
				console.log(repo)
				this.add = true
				this.currentView = "addProject"
			},
			removeproject(project) {
				console.log(project)
				this.$store.dispatch("DelProject", project).then(resp => {
					console.log(resp)
					let pd = resp.data.exec
					if (pd === 'true') {
						this.$message.success(resp.data.reason)
					} else {
						this.$message.error(resp.data.reason)
					}
				}).catch(err => {
					console.log(err)
					this.$message.error(resp.data.reason)
				})
			},
			addhost(repo) {
				console.log(repo)
				this.add = true
				this.currentView = "addHost"
			},
			removehost(host) {
				this.$store.dispatch("DelHost",host).then(resp => {
					console.log(resp)
					let pd = resp.data.exec
					if (pd === 'true') {
						this.$message.success(resp.data.reason)
					} else {
						this.$message.error(resp.data.reason)
					}
				}).catch(err => {
					console.log(err)
					this.$message.error(resp.data.reason)
				})
			},
		},
		computed: {
			getallmessage() {
				return this.$store.getters.getallmessage
			},
			repo() {
				return this.$store.getters.repo
			},
			projects() {
				return this.$store.getters.projects
			},
			hosts() {
				return this.$store.getters.hosts
			}
		},
	}
</script>

<style scoped>
	#edit {
		min-height: 300px;
	}
	#showdetail {
		width:20%;
		/*border: 1px solid red;*/
		line-height: 30px;
		margin-left: 2%;
		margin-top: 2%;
		min-height: 200px;

	}
	#addcontainer {
		display: flex;
		position: absolute;
		top:120px;
		/*border: 1px solid red;*/
		width: 50%;
		right: 6%;
	}
</style>