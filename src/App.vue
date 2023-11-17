<!--
 * @Author: sylar 81855417@qq.com
 * @LastEditors: sylar 81855417@qq.com
 * @Date: 2023-11-17 08:47:14
 * @FilePath: \areaColor\src\App.vue
 * @Copyright: Sylar
 * @Description: 
-->


<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import{provide} from 'vue'
import * as echarts from 'echarts'
provide("echarts",echarts)
//其他子页面中

</script>
<style scoped>
.chart-setting{
  width: 300px;
  height: 100%;
  border-right: 2px solid #ccc;
}
.chart-box{
  flex:1;
  border: 1px solid red;
}
</style>
