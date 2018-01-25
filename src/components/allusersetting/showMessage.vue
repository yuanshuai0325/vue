<template>
	<div>
		<br><br><br><br>
		<el-carousel :interval="3000" type="card">
			<el-carousel-item v-for="(value, key, index) in getallmessage" :key="index">
				<br><br><br><br>
				<el-row>
					<el-col :span="6" :offset="8">repo 名：</el-col>
				</el-row>
				<el-row>
					<el-col :span="12" :offset="12">{{key}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" :offset="8">应用名：</el-col>
				</el-row>
				<el-row v-for="(project,index) in value.projects" :key="index">
					<el-col :span="12" :offset="12">{{project}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" :offset="8">主机名：</el-col>
				</el-row>
				<el-row v-for="(host,index) in value.hosts" :key="index">
					<el-col :span="12" :offset="12">{{host}}</el-col>
				</el-row>
			</el-carousel-item>
		</el-carousel>
		<br>
		<el-row>
			<el-col :span="6" :offset="11"><h2>目前在用项目统计</h2></el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		computed: {
			getallmessage() {
				return this.$store.getters.getallmessage
			}
		},
		mounted() {
			this.$store.dispatch('GetAllMessage').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
		}
	}
	
</script>

<style scoped>
	.el-carousel__item h3 {
    	color: #475669;
    	font-size: 14px;
    	opacity: 0.75;
    	line-height: 200px;
    	margin: 0;
  	}
  
	.el-carousel__item:nth-child(2n) {
    	background-color: #f5f5f5;
  	}
  
  	.el-carousel__item:nth-child(2n+1) {
    	background-color: #f8f8ff;
  	}
</style>