<template>
  <div class="ContentPage">
    <NavBar></NavBar>
    <div class="page">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  components: {
      NavBar
    }
}
</script>
<style scoped lang="less">
  
</style>
