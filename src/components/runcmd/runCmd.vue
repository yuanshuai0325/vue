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
		<div id="rcdisplay" v-show="cardshow">
			<el-card class="box-card">
  				<div slot="header" class="clearfix">
    				<span>卡片名称</span>
			  	</div>
  				<div class="text item">
    				{{cmdreturn}}
  				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				value: '',
				// hosts: [], 
			}
		},
		methods: {
			change(value) {
				console.log(value);
				console.log(this.$store)
				this.$store.dispatch('ChangeCardShow', false)
				if (value) {
					this.$store.dispatch('GetProjectHosts', value).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
				}
			},
			start(host) {
				console.log(this.value,host)
				this.$store.dispatch('ChangeLoading')
				let data = {
					'tgt':host,
					'project':this.value,
					'cmd':'start',
				}
				this.$store.dispatch('CmdRun', data).then(resp => {console.log(this.$store.getters.loading);console.log(this.cmdreturn);this.$store.dispatch('ChangeLoading')
				}).catch(err => {console.log(err);this.$store.dispatch('ChangeLoading')})
			},
			stop(host) {
				console.log(this.value,host)
				this.$store.dispatch('ChangeLoading')
				let data = {
					'tgt':host,
					'project':this.value,
					'cmd':'stop',
				}
				this.$store.dispatch('CmdRun', data).then(resp => {console.log(resp);console.log(this.cmdreturn);this.$store.dispatch('ChangeLoading')}).catch(err => {console.log(err);this.$store.dispatch('ChangeLoading')})
			},
			restart(host) {
				console.log(this.value,host)
				this.$store.dispatch('ChangeLoading')
				let data = {
					'tgt':host,
					'project':this.value,
					'cmd':'restart',
				}
				this.$store.dispatch('CmdRun', data).then(resp => {console.log(resp);console.log(this.cmdreturn);this.$store.dispatch('ChangeLoading')}).catch(err => {console.log(err);this.$store.dispatch('ChangeLoading')})
			},
			tail(host) {
				console.log(this.value,host)
				this.$store.dispatch('ChangeLoading')
				let data = {
					'tgt':host,
					'project':this.value,
					'cmd':'tail',
				}
				this.$store.dispatch('CmdRun', data).then(resp => {console.log(resp);console.log(this.cmdreturn);this.$store.dispatch('ChangeLoading')}).catch(err => {console.log(err);this.$store.dispatch('ChangeLoading')})
			},
		},
		computed: {
			options() {
				return this.$store.getters.repodir
			},
			hosts() {
				return this.$store.getters.prohosts
			},
			cmdreturn() {
				return this.$store.getters.cmdreturn
			},
			cardshow() {
				return this.$store.getters.cardshow
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
		/*width: 25%;*/
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
		margin-top: 6%;
	}
</style>