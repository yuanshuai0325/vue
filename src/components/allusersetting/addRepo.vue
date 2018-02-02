<template>
	<div>
		<el-row>
			<el-col :span="8">添加Repo：</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-input placeholder="请输入Repo" v-model="repo">
					<i slot="prefix" class="el-input__icon el-icon-document"></i>
  				</el-input>
  			</el-col>
  			
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-input placeholder="请输入本地路径" v-model="lpath" require>
					<i slot="prefix" class="el-input__icon el-icon-document"></i>
  				</el-input>
  			</el-col>
  			<el-col :span="4" :offset="1"><el-button type="primary" @click="addrepo">提交</el-button></el-col>
  		</el-row>
  		<el-row>
			<el-col :span="18">
				<el-input placeholder="请输入远程路径" v-model="rpath">
					<i slot="prefix" class="el-input__icon el-icon-document"></i>
  				</el-input>
  			</el-col>
  		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				repo: '',
				lpath: '',
				rpath: '',
			}
		},
		methods: {
			addrepo() {
				if (this.repo && this.lpath && this.rpath ) {
					console.log(11111)
					console.log(this.repo,this.lpath,this.rpath)
					let data = {'repo':this.repo,'lpath':this.lpath,'rpath':this.rpath}
					this.$store.dispatch("AddRepo", data).then(resp=>{
						console.log(resp)
						let pd = resp.data.exec
						if (pd === 'true') {
							this.$message.success(resp.data.reason)
						} else {
							this.$message.error(resp.data.reason)
						}
					}).catch(err =>{
						console.log(err)
						this.$message.error(resp.data.reason)
					})
				} else {
					this.$message.warning('Repo名 本地路径 远程路径 三项必填')
				}
			}
		}
	}
</script>

<style scoped>
	
</style>