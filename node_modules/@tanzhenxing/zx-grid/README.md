# zx-grid 宫格组件

基于 [uni-app uni-grid](https://uniapp.dcloud.net.cn/component/uniui/uni-grid.html) 实现，支持 H5、小程序、App，使用 Vue3 `<script setup>` 语法开发。

## 属性
| 属性名        | 类型    | 默认值     | 说明           |
| ------------- | ------- | ---------- | -------------- |
| column        | Number  | 3          | 每行显示的列数 |
| showBorder    | Boolean | true       | 是否显示边框   |
| borderColor   | String  | #D2D2D2    | 边框颜色       |
| square        | Boolean | true       | 是否正方形显示 |
| highlight     | Boolean | true       | 点击是否高亮   |

## 事件
| 事件名 | 说明                 | 回调参数                |
| ------ | -------------------- | ----------------------- |
| change | 点击 gridItem 触发   | { detail: { index } }   |

## 用法示例

```vue
<template>
  <zx-grid :column="3" :show-border="true" :square="true" @change="onGridChange">
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

function onGridChange(e) {
  uni.showToast({ title: `点击第${e.detail.index + 1}个宫格` });
}
</script>
```

## 注意事项
- 组件需配合 `zx-grid-item` 使用。
- `column` 建议不超过 5。
- 兼容 H5、小程序、App，无需手动适配。
