<template>
	<div>
		<el-carousel :interval="3000" type="card">
			<el-carousel-item v-for="(value, key, index) in getallmessage" :key="index">
				<h4>{{key}}</h4>
				<h4>{{value.projects}}</h4>
				<h4>{{value.hosts}}</h4>
			</el-carousel-item>
		</el-carousel>
		<h3>{{getallmessage}}</h3>
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