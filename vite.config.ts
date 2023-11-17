/*
 * @Author: sylar 81855417@qq.com
 * @LastEditors: sylar 81855417@qq.com
 * @Date: 2023-11-17 08:47:14
 * @FilePath: \areaColor\vite.config.ts
 * @Copyright: Sylar
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve:{
    alias:{
      '@':resolve(__dirname,'./src')
    }
  }
})
