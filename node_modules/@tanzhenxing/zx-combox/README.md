# zx-combox 组合框组件

> 组合框组件，用于既可以选择也可以输入的场景，类似于下拉选择框与输入框的结合。

## 介绍

`zx-combox` 是一个组合框组件，在用户需要从预设选项中进行选择，但也需要支持自由输入的场景下使用。组件支持搜索过滤、键盘输入、鼠标选择等多种操作方式。

## 安装方式

将组件引入项目中即可使用。

## 基本用法

```vue
<template>
  <view>
    <zx-combox
      label="所在城市"
      :candidates="candidates"
      placeholder="请选择所在城市"
      v-model="city"
    ></zx-combox>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const city = ref('');
const candidates = ref(['北京', '上海', '广州', '深圳', '杭州', '南京', '武汉', '成都', '西安']);
</script>
```

## 无边框用法

```vue
<zx-combox
  :border="false"
  label="所在城市"
  :candidates="candidates"
  placeholder="请选择所在城市"
  v-model="city"
></zx-combox>
```

## API

### Props

| 属性名       | 类型           | 默认值   | 说明                     |
| ------------ | -------------- | -------- | ------------------------ |
| label        | String         | ''       | 标签文字                 |
| labelWidth   | String         | 'auto'   | 标签宽度，如：'100px'    |
| placeholder  | String         | ''       | 输入框占位符             |
| candidates   | Array          | []       | 候选项列表               |
| emptyTips    | String         | '无匹配项' | 无匹配项时的提示语       |
| modelValue   | String/Number  | ''       | 组合框的值（支持v-model） |
| border       | Boolean        | true     | 是否显示边框             |

### 事件

| 事件名          | 说明           | 返回值        |
| -------------- | -------------- | ------------ |
| update:modelValue | 组合框输入或选择事件，支持v-model | 当前输入值 |
| input          | 组合框输入事件（兼容Vue2） | 当前输入值 |

## 注意事项

1. 搜索过滤不区分大小写
2. 点击组件以外区域会自动关闭下拉选项
3. 该组件不支持nvue页面
