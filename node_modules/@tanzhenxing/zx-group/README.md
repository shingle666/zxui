# zx-group 组件

基于 [uni-group](https://uniapp.dcloud.net.cn/component/uniui/uni-group.html) 实现的分组容器，支持 H5、小程序、App，适用于表单、内容分区等场景。

## 组件特性
- 支持主标题、分组间隔、卡片模式
- 支持自定义标题插槽
- 兼容多端（H5/小程序/App）
- 使用 Vue3 `<script setup>` 语法

## 属性（Props）
| 属性名   | 类型             | 默认值    | 说明                       |
| -------- | ---------------- | --------- | -------------------------- |
| title    | String           | ''        | 分组主标题                 |
| top      | Number/String    | 10        | 分组与上方间隔（单位px）   |
| mode     | String           | 'default' | 分组模式，card为卡片模式   |
| stat     | Boolean          | false     | 是否开启uni统计（可选）    |

## 插槽（Slots）
| 名称   | 说明           |
| ------ | -------------- |
| title  | 自定义标题内容 |
| 默认   | 分组内容区域   |

## 基本用法
```vue
<zx-group title="基础分组" top="20">
  <view>分组内容1</view>
  <view>分组内容2</view>
</zx-group>
```

## 卡片模式
```vue
<zx-group title="卡片分组" mode="card" top="20">
  <view>卡片分组内容1</view>
  <view>卡片分组内容2</view>
</zx-group>
```

## 自定义标题插槽
```vue
<zx-group :top="30">
  <template #title>
    <view style="color: #007AFF; font-weight: bold;">自定义标题插槽</view>
  </template>
  <view>自定义标题内容1</view>
  <view>自定义标题内容2</view>
</zx-group>
```

## 组件引入
```js
import zxGroup from '@/components/zx-group/zx-group.vue';
```

## 注意事项
- 示例需在 `uni-app` 项目中运行。
- 如需统计功能，需配合 `uni.report` 使用。

## 参考文档
- [uni-group 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-group.html)
