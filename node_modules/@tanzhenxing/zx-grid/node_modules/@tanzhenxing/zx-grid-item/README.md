# zx-grid-item 宫格子项组件

配合 `zx-grid` 组件使用，负责宫格每一项的内容展示与点击事件。

## 属性
| 属性名 | 类型   | 默认值 | 说明               |
| ------ | ------ | ------ | ------------------ |
| index  | Number | 0      | 子项的唯一标识索引 |

## 用法示例

```vue
<template>
  <zx-grid :column="3">
    <zx-grid-item v-for="(item, idx) in list" :key="idx" :index="idx">
      <view class="grid-item-box">
        <image :src="item.url" class="image" mode="aspectFill" />
        <text class="text">{{ item.text }}</text>
      </view>
    </zx-grid-item>
  </zx-grid>
</template>

<script setup>
import { ref } from 'vue';
import zxGrid from '@/components/zx-grid/zx-grid.vue';
import zxGridItem from '@/components/zx-grid/zx-grid-item.vue';

const list = ref([
  { url: '/static/c1.png', text: '宫格1' },
  { url: '/static/c2.png', text: '宫格2' },
  { url: '/static/c3.png', text: '宫格3' },
]);
</script>
```

## 注意事项
- 必须作为 `zx-grid` 的子组件使用。
- 通过 `index` 属性区分每个宫格项。
- 点击事件由父组件 `zx-grid` 统一处理。
- 兼容 H5、小程序、App，无需手动适配。
