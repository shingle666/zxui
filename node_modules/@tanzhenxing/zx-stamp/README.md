# zx-stamp 印章组件

一个基于uniapp的多端（H5/小程序/APP）印章生成组件，支持自定义颜色、尺寸、线宽、公司名、印章名、字体等。

## 组件特性
- 支持H5、微信/支付宝/百度/字节小程序、App等多端
- 纯canvas实现，无浏览器特有DOM依赖
- 支持自定义印章内容、样式
- 可导出印章图片
- 提供外部重绘方法

## 使用方法

### 1. 引入组件
```vue
<script setup>
import zxStamp from '@/components/zx-stamp/zx-stamp.vue';
</script>
```

### 2. 基本用法
```vue
<zx-stamp
  :show="true"
  :stampId="'my-stamp'"
  :color="'#d81e06'"
  :size="200"
  :lineWidth="5"
  :companyName="'某某科技有限公司'"
  :stampName="'合同专用章'"
  @getImg="onGetImg"
/>
```

### 3. 完整示例
```vue
<template>
  <zx-stamp
    ref="stampRef"
    :show="true"
    :stampId="'demo-stamp'"
    :color="'#d81e06'"
    :size="240"
    :lineWidth="6"
    :companyName="'测试科技有限公司'"
    :stampName="'合同专用章'"
    :starRadius="30"
    :fontFamily="'微软雅黑'"
    :nameFontSize="18"
    :companyFontSize="26"
    @getImg="onGetImg"
    @drawed="onDrawed"
  />
  <button @click="redraw">手动重绘印章</button>
  <image :src="imgPath" v-if="imgPath" style="width:120px;height:120px;" />
</template>

<script setup>
import { ref } from 'vue';
import zxStamp from '@/components/zx-stamp/zx-stamp.vue';
const imgPath = ref('');
const stampRef = ref(null);
function onGetImg(path) { imgPath.value = path; }
function onDrawed() { /* ... */ }
function redraw() { stampRef.value && stampRef.value.redraw(); }
</script>
```

## 属性（Props）
| 属性名           | 类型    | 默认值           | 说明                 |
|------------------|---------|------------------|----------------------|
| show             | Boolean | false            | 是否显示（控制样式） |
| stampId          | String  | 'stamp'          | canvas唯一ID         |
| color            | String  | '#ff0000'        | 印章颜色             |
| size             | Number  | 200              | 画布宽高(px)         |
| lineWidth        | Number  | 5                | 边框线宽             |
| companyName      | String  | 'XX科技有限公司' | 公司名称             |
| stampName        | String  | '印章'           | 印章名称             |
| starRadius       | Number  | 25               | 五角星半径           |
| fontFamily       | String  | '宋体'           | 字体                 |
| nameFontSize     | Number  | 16               | 印章名字号           |
| companyFontSize  | Number  | 23               | 公司名字号           |

## 事件（Events）
| 事件名   | 说明                       | 回调参数           |
|----------|----------------------------|--------------------|
| getImg   | 生成图片后触发             | 图片临时路径       |
| drawed   | 印章绘制完成后触发         | 无                 |

## 方法（ref调用）
| 方法名   | 说明           |
|----------|----------------|
| redraw   | 重新绘制印章   |

## 注意事项
- 组件需在页面onReady后或nextTick后使用，避免canvas未渲染导致绘制失败。
- H5端canvasToTempFilePath有时需延迟调用，组件已自动兼容。
- 如需导出图片，监听`getImg`事件获取图片路径。

## 兼容性
- 依赖uniapp官方canvas API，兼容主流小程序、H5、App。

## License
MIT
