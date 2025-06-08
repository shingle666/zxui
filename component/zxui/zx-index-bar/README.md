# zx-index-bar 索引栏

用于列表的索引分类显示和快速定位。

## 介绍

`zx-index-bar` 组件通常与 `zx-index-anchor` 组件配合使用。`zx-index-bar` 提供索引导航，`zx-index-anchor` 作为内容区域的锚点。

## 引入

```javascript
import ZxIndexBar from '@/components/zx-index-bar/zx-index-bar.vue';
import ZxIndexAnchor from '@/components/zx-index-bar/zx-index-anchor.vue';

// 在 vue 文件中注册
export default {
  components: {
    ZxIndexBar,
    ZxIndexAnchor
  }
}
```

## 代码演示

### 基础用法

点击索引栏时，会自动跳转到对应的 `zx-index-anchor` 锚点位置。

```vue
<template>
  <zx-index-bar>
    <view>
      <zx-index-anchor index="A" />
      <view class="demo-cell">文本内容 A1</view>
      <view class="demo-cell">文本内容 A2</view>

      <zx-index-anchor index="B" />
      <view class="demo-cell">文本内容 B1</view>
      <view class="demo-cell">文本内容 B2</view>
      
      <!-- 更多内容 -->
    </view>
  </zx-index-bar>
</template>

<style>
.demo-cell {
  padding: 10px 15px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
}
</style>
```

### 自定义索引列表

可以通过 `index-list` 属性自定义展示的索引字符列表。

```vue
<template>
  <zx-index-bar :index-list="customIndexList">
    <view>
      <zx-index-anchor index="1" />
      <view class="demo-cell">文本内容 1</view>

      <zx-index-anchor index="2" />
      <view class="demo-cell">文本内容 2</view>
      
      <!-- 更多内容 -->
    </view>
  </zx-index-bar>
</template>

<script setup>
import { ref } from 'vue';

const customIndexList = ref([1, 2, 3, 4, 5]);
</script>
```

## API

### IndexBar Props

| 参数             | 说明                                     | 类型                           | 默认值    |
|------------------|------------------------------------------|--------------------------------|-----------|
| index-list       | 索引字符列表                             | `(string \| number)[]`         | `A-Z`     |
| sticky           | 是否开启锚点自动吸顶                     | `boolean`                      | `true`    |
| sticky-offset-top| 锚点自动吸顶时与顶部的距离（单位 px）    | `number`                       | `0`       |
| z-index          | z-index 层级                             | `number \| string`             | `1`       |
| highlight-color  | 索引字符高亮颜色                         | `string`                       | `#1989fa` |
| teleport         | 指定索引栏挂载的节点 (H5环境下有效)      | `string \| Element`            | -         |
| item-height      | (可选) 索引项高度，用于优化小程序端计算  | `number`                       | `0` (自动) |
| scrollable       | (高级) 内容区域是否组件内部滚动          | `boolean`                      | `true`    |

### IndexAnchor Props

| 参数  | 说明       | 类型              | 默认值 |
|-------|------------|-------------------|--------|
| index | 索引字符   | `number \| string`  | -      |
| sticky| 是否开启当前锚点吸顶（需配合IndexBar的sticky）| `boolean`        | `true` |

### IndexBar Events

| 事件名 | 说明                             | 回调参数             |
|--------|----------------------------------|----------------------|
| select | 点击索引栏的字符时触发           | `index: number \| string` |
| change | 当前高亮的索引字符变化时触发     | `index: number \| string` |

### IndexBar 方法

通过 `ref` 可以获取到 IndexBar 实例并调用实例方法。

| 方法名   | 说明             | 参数                   | 返回值 |
|----------|------------------|------------------------|--------|
| scrollTo | 滚动到指定锚点   | `index: number \| string` | -      |

**在 uniapp 的页面中使用 `onPageScroll`**

对于小程序和 App 端，如果 `zx-index-bar` 的内容是随页面滚动的（即 `scrollable` 为 `false` 或未设置，且组件本身没有设置固定高度和 `overflow: auto`），你需要在页面的 `onPageScroll`生命周期中通知 `zx-index-bar` 组件当前滚动位置，以便正确计算锚点状态。

```vue
<template>
  <view @scroll="handlePageScroll"> <!-- 如果是 scroll-view -->
    <zx-index-bar ref="indexBarRef">
      <!-- ... -->
    </zx-index-bar>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app'; // 引入 onPageScroll

const indexBarRef = ref(null);

// 页面滚动时触发 (适用于页面整体滚动)
onPageScroll((e) => {
  if (indexBarRef.value && typeof indexBarRef.value.onScroll === 'function') {
    // 手动调用组件的 onScroll 方法，uniapp的onPageScroll不直接传递scrollTop，
    // 组件内部会尝试获取正确的scrollTop
    indexBarRef.value.onScroll(); 
  }
});

// 如果是 scroll-view 内部滚动
const handlePageScroll = (e) => {
  if (indexBarRef.value && typeof indexBarRef.value.onScroll === 'function') {
    // 对于 scroll-view，可能需要传递 scrollTop
    // 组件内部的 onScroll 会尝试获取，但如果特定场景下获取不到，可以考虑传递
    // indexBarRef.value.onScroll({ scrollTop: e.detail.scrollTop }); 
    indexBarRef.value.onScroll();
  }
};
</script>
```

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                     | _默认值_                               | _描述_
|------------------------------------------|----------------------------------------|-------------------
| `--van-index-bar-sidebar-z-index`        | `2`                                    | 侧边栏 z-index
| `--van-index-bar-index-font-size`        | `var(--van-font-size-xs, 10px)`        | 索引字符字号
| `--van-index-bar-index-line-height`      | `var(--van-line-height-xs, 14px)`      | 索引字符行高
| `--van-index-bar-index-active-color`     | `var(--van-primary-color, #1989fa)`    | 索引字符高亮颜色
| `--van-index-anchor-z-index`             | `1`                                    | 锚点 z-index
| `--van-index-anchor-padding`             | `0 var(--van-padding-md, 16px)`        | 锚点内边距
| `--van-index-anchor-text-color`          | `var(--van-text-color, #323233)`       | 锚点文字颜色
| `--van-index-anchor-font-weight`         | `var(--van-font-bold, 500)`            | 锚点文字字重
| `--van-index-anchor-font-size`           | `var(--van-font-size-md, 14px)`        | 锚点文字字号
| `--van-index-anchor-line-height`         | `32px`                                 | 锚点行高
| `--van-index-anchor-background`          | `transparent`                          | 锚点背景色
| `--van-index-anchor-sticky-text-color`   | `var(--van-primary-color, #1989fa)`    | 吸顶锚点文字颜色
| `--van-index-anchor-sticky-background`   | `var(--van-background-2, #fff)`        | 吸顶锚点背景色

**注意：** CSS 变量的默认值中的 `var(--van-...)` 形式，表示它会尝试使用项目中已定义的全局 CSS 变量。如果这些全局变量未定义，则使用其后指定的具体值（如 `10px`, `#1989fa` 等）。