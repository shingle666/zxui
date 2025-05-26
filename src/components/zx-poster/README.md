# zx-poster 海报生成组件

基于 uniapp + vue3 setup 语法的跨平台（H5/小程序/APP）canvas 海报生成组件。

## 特性
- 支持 H5、微信小程序、App（不依赖浏览器 DOM）
- 支持绘制图片、文本、矩形、线条
- 支持圆角、渐变、阴影、图片下载与 base64
- 支持保存到相册（含权限处理）
- 事件与方法暴露，便于灵活调用

## 属性
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| width  | 海报宽度（rpx） | Number/String | 800 |
| height | 海报高度（rpx） | Number/String | 1200 |
| pixel  | 像素比 | Number/String | 3 |

## 事件
| 事件名 | 说明 |
| ------ | ---- |
| ready  | 组件初始化完成时触发 |

## 方法
通过 ref 获取组件实例，调用以下方法：

### draw(data, callback)
- data: Array，绘制内容数组，支持 type: 'image'、'text'、'rect'、'line'
- callback: Function，绘制完成后回调，返回图片临时路径

### save(file)
- file: String，图片路径，保存到相册（H5为预览）

## 使用示例
```vue
<template>
  <zx-poster ref="posterRef" :width="800" :height="1200" :pixel="2" @ready="onReady" />
  <button @click="drawPoster">生成海报</button>
  <button @click="savePoster">保存到相册</button>
  <image v-if="posterUrl" :src="posterUrl" mode="widthFix" />
</template>

<script setup>
import { ref } from 'vue'
import zxPoster from '@/components/zx-poster/zx-poster.vue'

const posterRef = ref(null)
const posterUrl = ref('')

function onReady() {}
function drawPoster() {
  const drawData = [
    { type: 'rect', style: { left: 0, top: 0, width: 800, height: 1200, backgroundColor: '#fff', borderRadius: 20 } },
    { type: 'image', src: 'https://img.yzcdn.cn/vant/cat.jpeg', imgType: 2, style: { left: 100, top: 100, width: 600, height: 400, borderRadius: 20 } },
    { type: 'text', text: '海报标题', style: { left: 100, top: 550, fontSize: 40, color: '#333', fontWeight: 'bold', width: 600, rows: 1 } },
    { type: 'line', style: { left: 100, top: 600, endLeft: 700, endTop: 600, color: '#eee', width: 4 } }
  ]
  posterRef.value.draw(drawData, url => { posterUrl.value = url })
}
function savePoster() {
  if (posterUrl.value) posterRef.value.save(posterUrl.value)
}
</script>
```

## 平台兼容性
- H5
- 微信小程序
- App（uni-app）

## 注意事项
- H5 平台无法直接保存到相册，使用 `save` 方法会自动预览图片，用户可长按保存
- 组件 canvas 隐藏在页面外，不影响布局
- 需保证 uni.createCanvasContext、uni.canvasToTempFilePath 等 API 可用
