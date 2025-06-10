# zx-tooltip 文字提示组件

## 组件说明
`zx-tooltip` 是一个适用于 H5、小程序、App 的通用提示信息组件，支持多种位置、主题、触发方式、插槽内容等，参考了 Element Plus Tooltip 设计。

## 效果展示
支持上、下、左、右多种方向，支持 hover、click、focus 触发，支持自定义内容和主题。

## 使用方法

### 基本用法
```vue
<template>
  <view>
    <zx-tooltip content="这是一条提示信息">
      <button>悬停显示提示</button>
    </zx-tooltip>
  </view>
</template>
```

### 主题
```vue
<template>
  <view>
    <zx-tooltip content="深色主题" effect="dark">
      <button>深色</button>
    </zx-tooltip>
    <zx-tooltip content="浅色主题" effect="light">
      <button>浅色</button>
    </zx-tooltip>
  </view>
</template>
```

### 多行/自定义内容
```vue
<template>
  <zx-tooltip placement="top">
    <template #content>
      <view>多行内容<br />第二行</view>
    </template>
    <button>自定义内容</button>
  </zx-tooltip>
</template>
```

### 触发方式
```vue
<template>
  <zx-tooltip content="点击显示" trigger="click">
    <button>点击显示</button>
  </zx-tooltip>
  <zx-tooltip content="聚焦显示" trigger="focus">
    <input placeholder="聚焦显示提示" />
  </zx-tooltip>
</template>
```

## 属性
| 属性名         | 说明                     | 类型      | 默认值   |
| -------------- | ------------------------ | --------- | -------- |
| content        | 显示的内容               | String    | ''       |
| rawContent     | 内容是否为 HTML          | Boolean   | false    |
| placement      | 出现位置(top/bottom/left/right) | String | top      |
| effect         | 主题(dark/light)         | String    | dark     |
| disabled       | 是否禁用                 | Boolean   | false    |
| showArrow      | 是否显示箭头             | Boolean   | true     |
| trigger        | 触发方式(hover/click/focus) | String | hover    |
| showAfter      | 显示延迟(ms)             | Number    | 0        |
| hideAfter      | 隐藏延迟(ms)             | Number    | 200      |
| autoClose      | 自动关闭(ms)             | Number    | 0        |
| offset         | 偏移距离(rpx)            | Number    | 12       |
| popperClass    | 自定义类名               | String    | ''       |
| modelValue     | 控制显示/隐藏            | Boolean   | -        |

## 事件
| 事件名             | 说明           | 回调参数 |
| ------------------ | -------------- | -------- |
| update:modelValue  | 显示/隐藏变化  | Boolean  |
| show               | 显示时触发     | -        |
| hide               | 隐藏时触发     | -        |

## 插槽
| 插槽名   | 说明           |
| -------- | -------------- |
| default  | 触发元素内容   |
| content  | 自定义提示内容 |

## 注意事项
- 组件不依赖浏览器特有 DOM，适配 H5、小程序、App。
- 由于平台限制，定位仅支持简单偏移，复杂场景请自定义样式。

## 贡献
如有建议或问题，欢迎提 issue。
