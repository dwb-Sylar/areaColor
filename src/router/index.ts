/*
 * @Author: sylar 81855417@qq.com
 * @LastEditors: sylar 81855417@qq.com
 * @Date: 2023-11-17 09:21:31
 * @FilePath: \areaColor\src\router\index.ts
 * @Copyright: Sylar
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  {
    path: '/',
    component: ()=>import('@/views/home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/world',
    component:()=>import('@/views/world/index.vue'),
    meta: {
      title: '世界地图',
    },
  },
  {
    path: '/china',
    component:()=>import('@/views/china/index.vue'),
    meta: {
      title: '中国地图',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
