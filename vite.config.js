import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import sassConfig from './sass.config.js'

export default defineConfig({
  plugins: [
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 应用Sass配置
        ...sassConfig,
        // 强制使用现代API
        api: 'modern-compiler',
        // 静默弃用警告
        silenceDeprecations: ['legacy-js-api'],
        // 确保使用dart-sass
        implementation: 'sass',
        // 全局变量
        additionalData: `
          // 全局Sass配置
          $primary-color: #007bff;
          $border-radius: 4px;
          
          // 静默警告
          @use "sass:color" as *;
          @use "sass:meta" as *;
        `
      }
    }
  },
  // 确保构建工具使用现代编译器
  esbuild: {
    target: 'es2020'
  },
  // 优化配置
  build: {
    cssCodeSplit: true,
    cssTarget: 'chrome80'
  }
})
