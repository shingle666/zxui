# zx-pk 组件

一个基于 uni-app 和 Vue3 `<script setup>` 语法开发的高兼容性 PK 组件，适配 H5、小程序、App。

## 组件特性
- **多平台支持**：兼容 H5、各类小程序（微信/支付宝/百度/字节/QQ/快手等）以及 App。
- **现代语法**：采用 Vue3 `<script setup>` 语法，代码简洁高效。
- **高度自定义**：支持按钮模式和进度条模式，满足不同场景需求。
- **响应式设计**：灵活配置属性，适应不同布局和交互需求。

## 属性说明
| 属性名        | 类型    | 默认值         | 说明                       |
| -------------| ------- | --------------| --------------------------|
| width        | String  | 690rpx        | 组件宽度                   |
| height       | String  | 280rpx        | 组件高度                   |
| borderRadius | String  | 8rpx          | 圆角                       |
| title        | Array   | ["", ""]      | 左右两侧标题               |
| btnName      | String  | 站队          | 按钮名称                   |
| status       | String  | button        | 展示类型：`button`（按钮模式）或 `progress`（进度条模式） |
| progress     | Array   | [80,20,"8000 票","2000 票"] | 进度条百分比与票数 |

## 事件说明
| 事件名 | 说明           | 回调参数           |
| ------ | -------------- | ------------------|
| choose | 点击按钮时触发 | `'left'` 或 `'right'`，表示用户选择的方向 |

## 平台兼容性
- **H5**：完全支持。
- **小程序**：兼容微信、支付宝、百度、字节、QQ、快手等主流小程序。
- **App**：基于 uni-app 开发，适配 iOS 和 Android。

## 使用方法
1. 将 `src/components/zx-pk/zx-pk.vue` 文件复制到您的项目组件目录中。
2. 在页面中引入并注册组件。
3. 通过属性配置和事件监听实现交互逻辑。

## 示例代码
```vue
<template>
  <zx-pk
    :title="['队伍A', '队伍B']"
    :btnName="'投票'"
    :status="status"
    :progress="[60, 40, '6000票', '4000票']"
    @choose="onChoose"
  />
  <button @click="toggleStatus">切换模式</button>
</template>

<script setup>
import { ref } from 'vue';
import zxPk from '@/components/zx-pk/zx-pk.vue';

const status = ref('button');
const onChoose = (side) => {
  uni.showToast({ title: `选择了${side === 'left' ? '队伍A' : '队伍B'}` });
};
const toggleStatus = () => {
  status.value = status.value === 'button' ? 'progress' : 'button';
};
</script>
```

## 注意事项
- 确保项目中已安装 Vue3 和 uni-app 相关依赖。
- 如需自定义样式，可通过覆盖组件内的 CSS 类名实现。
