# zx-contact-card 联系人卡片

## 组件介绍

`zx-contact-card` 联系人卡片组件以卡片的形式展示联系人信息，支持添加和编辑两种模式。该组件支持H5、小程序和App多端平台，采用Vue3 setup语法糖实现。

## 平台兼容性

- H5：✓
- 微信小程序：✓
- 支付宝小程序：✓
- 百度小程序：✓
- 头条小程序：✓
- QQ小程序：✓
- App（Vue）：✓

## 基础用法

### 添加联系人

```vue
<template>
  <zx-contact-card type="add" @click="onAdd" />
</template>

<script setup>
function onAdd() {
  console.log('添加联系人')
}
</script>
```

### 编辑联系人

```vue
<template>
  <zx-contact-card 
    type="edit" 
    name="张三" 
    tel="13000000000" 
    @click="onEdit" 
  />
</template>

<script setup>
function onEdit() {
  console.log('编辑联系人')
}
</script>
```

### 不可编辑

```vue
<template>
  <zx-contact-card 
    type="edit" 
    name="张三" 
    tel="13000000000" 
    :editable="false" 
  />
</template>
```

### 自定义文案

```vue
<template>
  <zx-contact-card 
    type="add" 
    add-text="选择联系人" 
    @click="onAdd" 
  />
</template>
```

### 自定义样式

```vue
<template>
  <zx-contact-card 
    type="add" 
    icon-size="50rpx"
    add-icon-color="#ff6b6b"
    @click="onAdd" 
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 卡片类型，可选值为 `add` `edit` | String | `add` |
| name | 联系人姓名 | String | - |
| tel | 联系人手机号 | String | - |
| add-text | 添加时的文案提示 | String | `添加联系人` |
| editable | 是否可以编辑联系人 | Boolean | `true` |
| icon-size | 图标大小 | String | `40rpx` |
| icon-color | 图标颜色 | String | `#666` |
| add-icon-color | 添加图标颜色 | String | `#1989fa` |
| arrow-size | 箭头大小 | String | `32rpx` |
| arrow-color | 箭头颜色 | String | `#c8c9cc` |
| custom-style | 自定义样式 | Object | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发 | event: Event |

## 主题定制

### 样式变量

组件提供了下列 SCSS 变量，可用于自定义样式：

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| $zx-contact-card-padding | 15px | 内边距 |
| $zx-contact-card-font-size | 14px | 字体大小 |
| $zx-contact-card-line-height | 20px | 行高 |
| $zx-contact-card-color | #333 | 文字颜色 |
| $zx-contact-card-background | #fff | 背景色 |
| $zx-contact-card-border-color | #ebedf0 | 边框颜色 |
| $zx-contact-card-border-radius | 8px | 圆角大小 |
| $zx-contact-card-clickable-color | #f7f8fa | 点击态背景色 |
| $zx-contact-card-disabled-color | #c8c9cc | 禁用态颜色 |
| $zx-contact-card-add-border-width | 2px | 添加模式边框宽度 |
| $zx-contact-card-add-border-color | #1989fa | 添加模式边框颜色 |
| $zx-contact-card-add-border-style | dashed | 添加模式边框样式 |
| $zx-contact-card-title-font-size | 16px | 标题字体大小 |
| $zx-contact-card-title-color | #1989fa | 标题颜色 |
| $zx-contact-card-name-font-size | 15px | 姓名字体大小 |
| $zx-contact-card-name-color | #333 | 姓名颜色 |
| $zx-contact-card-tel-font-size | 14px | 电话字体大小 |
| $zx-contact-card-tel-color | #666 | 电话颜色 |
| $zx-contact-card-icon-margin-right | 12px | 图标右边距 |
| $zx-contact-card-arrow-margin-left | 12px | 箭头左边距 |

## 注意事项

1. 组件依赖 `zx-icon` 组件，请确保已正确引入
2. 在小程序中使用时，建议设置合适的 `hover-class` 样式
3. 组件支持多端平台，无需额外配置
4. 建议在使用前先了解 uniapp 的基本用法

## 更新日志

### v1.0.0

- 初始版本
- 支持添加和编辑两种模式
- 支持自定义样式和文案
- 支持多端平台