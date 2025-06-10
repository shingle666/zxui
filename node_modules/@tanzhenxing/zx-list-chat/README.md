# zx-list-chat 聊天列表项组件

一个基于 uni-app、Vue3 <script setup> 语法开发的高兼容性聊天列表项组件，适配 H5、小程序、App。可嵌入于 zx-list 组件中，支持头像、群头像、角标、时间、草稿、跳转等功能，适合自定义各类聊天/会话列表场景。

## ✨ 组件特性
- 支持多端（H5、App、各类小程序）
- 可插入 zx-list 作为聊天项
- 支持单人/群头像、角标、时间、草稿、跳转等
- 事件丰富，便于扩展
- 不依赖浏览器特有 DOM
- 使用 Vue3 <script setup> 语法

## 📦 属性（Props）
| 属性名         | 类型            | 默认值   | 说明                         |
|----------------|----------------|----------|------------------------------|
| title          | String         | ''       | 标题                         |
| note           | String         | ''       | 描述/最后一条消息            |
| clickable      | Boolean        | false    | 是否开启点击反馈             |
| link           | Boolean/String | false    | 是否跳转/跳转类型            |
| to             | String         | ''       | 跳转目标页面                 |
| badgeText      | String/Number  | ''       | 角标内容/未读数/dot          |
| badgePositon   | String         | 'right'  | 角标位置 left/right          |
| time           | String         | ''       | 右侧时间                     |
| avatarCircle   | Boolean        | false    | 是否圆形头像                 |
| avatar         | String         | ''       | 头像地址                     |
| avatarList     | Array          | []       | 群头像组（[{url:''}]）        |

## 🧲 事件（Events）
| 事件名         | 说明           | 回调参数 |
|----------------|----------------|----------|
| click          | 点击项时触发   | {data}   |

## 🧩 插槽（Slots）
- header：自定义头像右侧内容
- 默认插槽：自定义右侧内容（如时间、角标等）

## 🛠️ 平台兼容性
- H5
- App（iOS/Android）
- 微信/支付宝/百度/抖音/QQ/快手等主流小程序

## 🚀 基础用法
```vue
<template>
  <zx-list>
    <zx-list-chat title="张三" note="你好" time="12:00" avatar="https://cdn.uviewui.com/uview/common/logo.png" />
    <zx-list-chat title="群聊" note="[草稿]hello" :avatar-list="groupAvatars" />
    <zx-list-chat title="未读" note="新消息" badge-text="8" clickable @click="onChatClick" />
  </zx-list>
</template>

<script setup>
import zxList from '@/components/zx-list/zx-list.vue'
import zxListChat from '@/components/zx-list-chat/zx-list-chat.vue'
const groupAvatars = [
  { url: 'https://cdn.uviewui.com/uview/common/logo.png' },
  { url: 'https://cdn.uviewui.com/uview/common/logo.png' }
]
function onChatClick(e) {
  // 处理点击
}
</script>
```

## 🌈 插槽自定义内容
```vue
<zx-list-chat title="自定义右侧">
  <template #default>
    <text>自定义内容</text>
  </template>
</zx-list-chat>
```

## 🎯 跳转用法
```vue
<zx-list-chat title="跳转会话" link="navigateTo" to="/pages/chat/detail" clickable />
```

## 💡 注意事项
- 需配合 zx-list 组件使用，便于统一列表风格。
- 组件已使用 <script setup> 语法，推荐配合 Vue3/uni-app3 项目使用。
- nvue 平台下部分属性/事件才生效，详见 uni-app 官方文档。

---
如需更复杂的聊天项样式，建议配合自定义插槽或样式扩展。 