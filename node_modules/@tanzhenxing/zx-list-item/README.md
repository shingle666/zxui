# zx-list-item 列表项组件

一个基于 uni-app、Vue3 <script setup> 语法开发的高兼容性列表项组件，适配 H5、小程序、App。可嵌入于 zx-list 组件中，支持丰富的内容、图标、角标、开关、跳转等功能，适合自定义各类列表场景。

## ✨ 组件特性
- 支持多端（H5、App、各类小程序）
- 可插入 zx-list 作为列表项
- 支持标题、描述、图标、角标、右侧内容、开关、跳转等
- 事件丰富，便于扩展
- 不依赖浏览器特有 DOM
- 使用 Vue3 <script setup> 语法

## 📦 属性（Props）
| 属性名         | 类型            | 默认值   | 说明                         |
|----------------|----------------|----------|------------------------------|
| title          | String         | ''       | 标题                         |
| note           | String         | ''       | 描述                         |
| ellipsis       | Number/String  | 0        | 标题省略行数（0不省略）      |
| disabled       | Boolean/String | false    | 是否禁用                     |
| clickable      | Boolean        | false    | 是否开启点击反馈             |
| showArrow      | Boolean/String | false    | 是否显示右侧箭头             |
| link           | Boolean/String | false    | 是否跳转/跳转类型            |
| to             | String         | ''       | 跳转目标页面                 |
| showBadge      | Boolean/String | false    | 是否显示数字角标             |
| badgeText      | String         | ''       | 角标内容                     |
| badgeType      | String         | 'success'| 角标类型                     |
| badgeStyle     | Object         | {}       | 角标样式                     |
| rightText      | String         | ''       | 右侧文字内容                 |
| thumb          | String         | ''       | 左侧缩略图                   |
| thumbSize      | String         | 'base'   | 缩略图大小（lg/base/sm）     |
| showExtraIcon  | Boolean/String | false    | 是否显示扩展图标             |
| extraIcon      | Object         | {type:'',color:'#000',size:20,customPrefix:''} | 扩展图标参数 |
| border         | Boolean        | true     | 是否显示左侧边框             |
| customStyle    | Object         | {padding:'',backgroundColor:'#fff'} | 自定义样式 |
| showSwitch     | Boolean/String | false    | 是否显示Switch               |
| switchChecked  | Boolean/String | false    | Switch是否被选中             |
| keepScrollPosition | Boolean     | false    | nvue下cell是否保持滚动位置   |
| direction      | String         | 'row'    | 排版方向 row/column          |

## 🧲 事件（Events）
| 事件名         | 说明           | 回调参数 |
|----------------|----------------|----------|
| click          | 点击项时触发   | {data}   |
| switchChange   | 切换Switch时   | e.detail |

## 🧩 插槽（Slots）
- header：自定义左侧内容
- body：自定义中间内容
- footer：自定义右侧内容

## 🛠️ 平台兼容性
- H5
- App（iOS/Android）
- 微信/支付宝/百度/抖音/QQ/快手等主流小程序

## 🚀 基础用法
```vue
<template>
  <zx-list>
    <zx-list-item title="标题" note="描述" right-text="更多" />
    <zx-list-item title="带图标" thumb="https://cdn.uviewui.com/uview/common/logo.png" />
    <zx-list-item title="可点击" clickable @click="onItemClick" />
  </zx-list>
</template>

<script setup>
import zxList from '@/components/zx-list/zx-list.vue'
import zxListItem from '@/components/zx-list-item/zx-list-item.vue'
function onItemClick(e) {
  // 处理点击
}
</script>
```

## 🌈 插槽自定义内容
```vue
<zx-list-item>
  <template #header>
    <image src="..." style="width:24px;height:24px;" />
  </template>
  <template #body>
    <view>自定义内容</view>
  </template>
  <template #footer>
    <text>右侧自定义</text>
  </template>
</zx-list-item>
```

## 🎯 跳转用法
```vue
<zx-list-item title="跳转页面" link="navigateTo" to="/pages/demo/index" clickable />
```

## 💡 注意事项
- 需配合 zx-list 组件使用，便于统一列表风格。
- 组件已使用 <script setup> 语法，推荐配合 Vue3/uni-app3 项目使用。
- nvue 平台下部分属性/事件才生效，详见 uni-app 官方文档。

---
如需更复杂的列表项样式，建议配合自定义插槽或样式扩展。 