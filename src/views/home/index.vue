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
    <el-row :gutter="20">
      <el-col :span="6">
    <router-link to="/continent">
      洲际地图
    </router-link>

      </el-col>
      <el-col :span="6">
    <router-link to="/world">
      世界地图
    </router-link>

      </el-col>
      <el-col :span="6">
        <router-link to="/china">
      中国地图
    </router-link>
    
      </el-col>
    </el-row>
    
    
  </div>
</template>
<script setup lang="ts">
import {ref,reactive} from "vue"
</script>
<style lang="scss" scoped>
.card{
  font-size: 20px;
  padding: 20px;
  width: 1200px;
  margin: 0 auto;
  text-align: center;
}
</style>
