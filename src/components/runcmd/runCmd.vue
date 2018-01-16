<template>
	<div id="runcmd">
		<div id="rcselect">
			<el-select v-model="value" clearable placeholder="请选择" @change="change">
	    		<el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label" >
	    		</el-option>
			</el-select>
		</div>
		<div id="rctable">
			<el-table :data="hosts" v-show="value" >
				<el-table-column label="主机名">
					<template slot-scope="scope">
						{{scope.row.host}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button-group>
							<el-button size="mini" type="success" @click="start(scope.row.host)">启动</el-button>
							<el-button size="mini" type="danger" @click="stop(scope.row.host)">停止</el-button>
						</el-button-group><br>
						<el-button size="mini" type="warning" @click="restart(scope.row.host)">重启</el-button><br>
						<el-button size="mini" type="info" @click="tail(scope.row.host)">查看日志</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div id="rcdisplay">
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				value: '',
				hosts: [],
			}
		},
		methods: {
			change(value) {
				console.log(value);
				if (value) {
					axios.get('/api/backstage/prohosts',{params:{'project':value}}).then(resp => {
					this.hosts = resp.data.hosts
					console.log(resp)
					}).catch(err => {console.log(err)})
				}
			},
			start(host) {
				console.log(this.value,host)
				axios({
					method: 'post',
					url: '/api/backstage/cmdrun',
					data: 'tgt='+host+'&project='+this.value+'&cmd=start'
				}).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
			},
			stop(host) {
				console.log(this.value,host)
			},
			restart(host) {
				console.log(this.value,host)
			},
			tail(host) {
				console.log(this.value,host)
			},
		},
		computed: {
			options() {
				return this.$store.getters.repodir
			}
		},
		mounted(){
			this.$store.dispatch('GetRepoDir').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
		} 
	}
</script>

<style>
	#runcmd {
		display: flex;
	}
	#rcselect {
		position: absolute;
		/*border:1px solid blue;*/
		margin: 9% 1% 1% 8%;
	}
	#rctable {
		position: absolute;
		margin:15% 1% 1% 5%;
		width: 30%;
	}
	#rcdisplay {
		position: absolute;
		/*border: 1px solid red;*/
		right: 2%;
		width: 60%;
	}
</style>