<!--
 * @Author: sylar 81855417@qq.com
 * @LastEditors: sylar 81855417@qq.com
 * @Date: 2023-11-17 09:13:14
 * @FilePath: \areaColor\src\views\home\index.vue
 * @Copyright: Sylar
 * @Description: 
-->
<template>
  <div class="card">
    <router-link to="/world">
      世界各国地图
    </router-link>
  </div>
</template>
<script setup lang="ts">
import {ref,reactive} from "vue"
</script>
<style lang="scss" scoped>
.card{
  font-size: 20px;
  padding: 20px;
  width: 100%;
  text-align: center;
}
</style>
