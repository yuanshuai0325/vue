<template>
	<div id="codeback">
		<div id="cbselect">
			<el-select v-model="value" clearable placeholder="请选择" @change="change" @clear="clear">
	    		<el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value" >
	    		</el-option>
			</el-select><br><br>
			<el-tag type="success" v-show="path">代码路径：{{path}}</el-tag><br>
			<el-tag type="success" v-show="project">所属项目：{{project}}</el-tag><br>
			<el-table :data="hosts" v-show="project" >
				<el-table-column label="涉及主机">
					<template slot-scope="scope">
						<el-tag type="success">{{scope.row.host}}</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div id="cbtable">
			<el-table :data="projectdir" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column label="备份目录" prop="date" sortable>
					<template slot-scope="scope">
						{{scope.row.dir}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="rollbackdir(scope.row.dir)">回退</el-button>
						<el-button size="mini" type="danger" @click="deldir(scope.row.dir)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		// props:['loading'],
		data() {
			return {
				value: '',
			}
		},
		methods: {
			change(value) {
				console.log(value)
				if (value) {
					// axios.get('/api/backstage/prodir',{params:{'dirname':value}}).then(resp => {
					// // console.log(resp.data.prodir);
					// // console.log(resp.data.path);
					// this.path = resp.data.path

					// this.projectdir = resp.data.prodir
					// this.project = resp.data.project
					// console.log(this.projectdir)
					// }).catch(err => {console.log(err)})
					this.$store.dispatch('GetProjectDir', value).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
					this.$store.dispatch('GetProjectHosts', value).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
				}
			},
			clear() {
				// this.path = '';
				// this.projectdir = [];
				// this.project = '';
				this.$store.dispatch('ClearProjectDir')
			},
			rollbackdir(dir) {
				// this.loading.pd = true;
				this.$store.dispatch('ChangeLoading')
				// axios({
				// 	method: 'post',
				// 	url: '/api/backstage/rollbackpath',
				// 	data: [this.project,dir],
				// 	transformRequest:[
				// 		function(data) {
				// 			return 'project='+data[0]+'&sdir='+data[1]
				// 		}
				// 	]
				// }).then(resp => {console.log(resp);
				// 	let pdata = '';
				// 	let data = resp.data.successdata;
				// 	for (let item1 in data) {
				// 		pdata += item1 + '<br>'
				// 		for (let item2 in data[item1]) {
				// 			for (let item3 in data[item1][item2])
				// 				pdata += item3 + ' : ' + data[item1][item2][item3]+ '<br>'
				// 		}
				// 	};
				// 	this.$alert('<html>'+pdata+'</html>', {dangerouslyUseHTMLString: true, showClose: false});
				// 	this.change(this.value);
				// 	// this.loading.pd = false;
				// 	this.$store.dispatch('ClearProjectDir')
				// }).catch(err => {console.log(err)});
				let data = {
					'project': this.project,
					'sdir': dir
				}
				this.$store.dispatch('RollBackCode', data).then(resp => {
					this.$store.dispatch('GetProjectDir', this.value)
					this.$store.dispatch('ChangeLoading')
					let pd = resp.data.exec
					if (pd === 'true') {
						this.$alert('<html>'+this.formatJson(resp.data.successdata)+'</html>', {dangerouslyUseHTMLString: true,})
					} else {
						this.$message.error(resp.data.reason)
					}
					console.log(resp)
				}).catch(err => {
					this.$store.dispatch('ChangeLoading')
					console.log(err)
				})

			},
			deldir(deldir) {
				// console.log(deldir)
				// axios({
				// 	method: 'post',
				// 	url: '/api/backstage/deldir',
				// 	data: [this.project, deldir],
				// 	transformRequest:[
				// 		function(data) {
				// 			return 'project='+data[0]+'&deldir='+data[1]
				// 		}
				// 	]
				// }).then(resp => {console.log(resp);
				// 	if (resp.data === true) {
				// 		this.$message({
				// 			message: deldir + '已删除',
				// 			type: 'success',
				// 		})
				// 	}
				// 	this.change(this.value)
				// }).catch(err => {console.log(err)});
				this.$store.dispatch('DelDir', {'project':this.project, 'deldir':deldir, 'value':this.value}).then(resp=>{
						console.log(resp)
						let pd = resp.data.exec
						if (pd === 'true') {
							this.$message.success(resp.data.reason)
						} else {
							this.$message.error(resp.data.reason)
						}
					}).catch(err=>{console.log(err)})
			},
			formatJson(data) {
				let json = JSON.stringify(data, null,2)
				json = json.replace(/{/g, '{<br>&nbsp;&nbsp;&nbsp;&nbsp;').replace(/,/, ',<br><br>&nbsp;&nbsp;&nbsp;&nbsp;').replace(/:(\s*"\w)/g, ':<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$1').replace(/}/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;}')
				return json
			}
		},
		computed: {
			options() {
				return this.$store.getters.repodir
			},
			projectdir() {
				return this.$store.getters.projectdir
			},
			path() {
				return this.$store.getters.path
			},
			project() {
				return this.$store.getters.project
			},
			hosts() {
				return this.$store.getters.prohosts
			},
		},
		mounted(){
			this.$store.dispatch('GetRepoDir').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
			this.clear()
		} 
	}
	
</script>

<style scoped>
	#codeback {
		display: flex;
	}
	#cbselect {
		position: absolute;
		margin: 9% 1% 1% 8%;
	}
	#cbtable {
		position: absolute;
		right: 2%;
		width: 60%;
	}
	
</style>