<template>
	<div id="codeback">
		<div id="cbselect">
			<el-select v-model="value" clearable placeholder="请选择" @change="change" @clear="clear">
	    		<el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value" >
	    		</el-option>
			</el-select><br><br>
			<el-tag type="success" v-show="path">代码路径：{{path}}</el-tag><br>
			<el-tag type="success" v-show="project">所属项目：{{project}}</el-tag>
		</div>
		<div id="cbtable">
			<el-table :data="projectdir" :default-sort = "{prop: 'date', order: 'descending'}">
				<el-table-column label="备份目录" prop="date" sortable>
					<template slot-scope="scope">
						{{scope.row.dir}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="rollbackdir(scope.row.dir)">回退</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				options: '',
				value: '',
				projectdir: [],
				path: '',
				project: '',
			}
		},
		methods: {
			change(value) {
				console.log(value)
				if (value) {
					axios.get('/api/backstage/prodir',{params:{'dirname':value}}).then(resp => {
					// console.log(resp.data.prodir);
					// console.log(resp.data.path);
					this.path = resp.data.path

					this.projectdir = resp.data.prodir
					this.project = resp.data.project
					}).catch(err => {console.log(err)})
				}
			},
			clear() {
				this.path = '';
				this.projectdir = [];
				this.project = '';
			},
			rollbackdir(dir) {
				axios({
					method: 'post',
					url: '/api/backstage/rollbackpath',
					data: [this.project,dir],
					transformRequest:[
						function(data) {
							return 'project='+data[0]+'&sdir='+data[1]
						}
					]
				}).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
			}
		},
		mounted(){
			axios.get('/api/backstage/repodir').then(resp => {
				console.log(resp.data.repodir);
				this.options = resp.data.repodir
			}).catch(err => {console.log(err)})
		}
	}
	
</script>

<style>
	#codeback {
		display: flex;
	}
	#cbselect {
		position: absolute;
		margin: 10% 1% 1% 8%;
	}
	#cbtable {
		position: absolute;
		right: 2%;
		width: 60%;
	}
	
</style>