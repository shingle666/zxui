import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import sassConfig from "./sass.config.js";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

export default defineConfig({
  plugins: [uni()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "Android >= 4.4",
            "iOS >= 9",
            "Chrome >= 80",
            "Safari >= 9",
            "> 1%",
            "last 2 versions",
          ],
        }),
        postcssPresetEnv({
          stage: 3,
          features: {
            "nesting-rules": true,
          },
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        // 应用Sass配置
        ...sassConfig,
        // 强制使用现代API
        api: "modern-compiler",
        // 静默弃用警告
        silenceDeprecations: ["legacy-js-api"],
        // 确保使用dart-sass
        implementation: "sass",
        // 全局变量
        additionalData: `
          // 全局Sass配置
          $primary-color: #007bff;
          $border-radius: 4px;
        `,
      },
    },
  },
  // 确保构建工具使用现代编译器
  esbuild: {
    target: "es2020",
  },
  // 优化配置
  build: {
    cssCodeSplit: true,
    cssTarget: ["chrome80", "safari13"]
  },
});
