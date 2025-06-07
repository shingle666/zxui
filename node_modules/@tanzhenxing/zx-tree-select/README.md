# zx-tree-select 分类选择

用于从一组相关联的数据集合中进行选择。

## 平台兼容性

| H5  | App | 小程序 |
| --- | --- | ---- |
| ✔️  | ✔️  | ✔️   |

## 基本使用

```vue
<template>
  <zx-tree-select
    :items="items"
    v-model:main-active-index="activeIndex"
    v-model:active-id="activeId"
  />
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(0);
const activeId = ref(1);
const items = ref([
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 1 },
      { text: '温州', id: 2 },
      { text: '宁波', id: 3, disabled: true },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 },
    ],
  },
  { text: '福建', disabled: true, children: [] }, // 如果没有子项，children应为空数组
]);
</script>
```

## Props

| 参数              | 说明                                     | 类型                         | 默认值   | 版本 |
| ----------------- | ---------------------------------------- | ---------------------------- | -------- | ---- |
| items             | 分类显示所需的数据，结构见下方             | `Array<TreeSelectItem>`      | `[]`     |      |
| main-active-index | 左侧选中项的索引                         | `Number`                     | `0`      |      |
| active-id         | 右侧选中项的 id，支持传入数组实现多选    | `Number | String | Array`    | `0`      |      |
| max               | 右侧项最大选中个数，仅多选模式下有效     | `Number | String`             | `Infinity` |      |
| height            | 高度，默认单位为px                       | `Number | String`             | `300`    |      |
| selected-icon     | 自定义右侧栏选中状态的图标               | `String`                     | `success`  |      |

### TreeSelectItem 数据结构

`items` 属性是一个数组，数组内包含一系列描述分类的对象。每个对象代表一个主分类，其结构如下：

```typescript
interface TreeSelectChild {
  text: string;       // 名称
  id: number | string; // id，作为匹配选中状态的标识符
  disabled?: boolean; // 是否禁用选项
}

interface TreeSelectItem {
  text: string;             // 导航名称
  children?: TreeSelectChild[]; // 该导航下所有的可选项
  dot?: boolean;            // 是否在导航名称右上角显示小红点
  badge?: number | string; // 导航名称右上角徽标
  disabled?: boolean;       // 是否禁用导航
  className?: string;       // 导航节点额外类名
}
```

示例：
```javascript
[
  {
    text: '所有城市',
    badge: 3,
    dot: false, // dot 和 badge 一般不同时使用
    className: 'my-custom-class',
    children: [
      { text: '温州', id: 1, disabled: true },
      { text: '杭州', id: 2 },
    ],
  },
  {
    text: '热门推荐',
    disabled: true,
    children: [] // 若无子项，children 应提供空数组
  }
]
```

## Events

| 事件名    | 说明                     | 回调参数                                   | 版本 |
| --------- | ------------------------ | ------------------------------------------ | ---- |
| click-nav | 点击左侧导航时触发       | `{ index: number, item: TreeSelectItem }`    |      |
| click-item| 点击右侧选择项时触发     | `item: TreeSelectChild`                    |      |
| update:main-active-index | 左侧选中项索引更新时触发 | `index: number`                            |      |
| update:active-id         | 右侧选中项ID更新时触发   | `id: number | string | Array`            |      |

## Slots

| 名称    | 说明                 | 参数 |
| ------- | -------------------- | ---- |
| content | 自定义右侧区域内容   | -    |

### content Slot 用法

```vue
<zx-tree-select :items="itemsSimple" v-model:main-active-index="activeIndex">
  <template #content>
    <view v-if="activeIndex === 0">
      <image src="/static/image1.png" />
    </view>
    <view v-if="activeIndex === 1">
      <image src="/static/image2.png" />
    </view>
  </template>
</zx-tree-select>
```

## 主题定制

可通过 CSS 变量定制样式，例如：

```scss
:root {
  --zx-tree-select-font-size: 14px;
  --zx-tree-select-nav-background: #f8f8f8;
  --zx-tree-select-content-background: #ffffff;
  --zx-tree-select-item-active-color: #007aff;
  // ...更多变量
}
```