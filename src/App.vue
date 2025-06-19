<template>
  <div id="app">
    <!-- 导航栏 -->
    <NavBar />

    <!-- 页面内容区域 -->
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style lang="scss">
#app {
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif;
  color: #fff;

}


</style>
