<template>
	<div>
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label" ></el-option>
	</div>
</template>

<script>
	export default {
		computed: {
			options() {
				let data = []
				for (let x in this.$store.getters.getallmessage) {
					console.log(x)
					data.push({'value':x, 'label':x})
				}
					console.log(data)
				return data
			},
		}
	}
</script>

<style scoped>
	
</style>