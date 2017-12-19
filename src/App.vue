<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
	@import './assets/css/reset.css'
	#app {
		height: 100%;
	}
	@import './assets/css/general.css'
</style>