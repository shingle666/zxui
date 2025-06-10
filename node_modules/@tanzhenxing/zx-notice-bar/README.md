# zx-notice-bar 公告栏组件

基于uni-app、Vue3 setup语法实现的公告栏组件，支持H5、小程序、App多端，兼容性强，无浏览器特有DOM依赖。

## 组件特性
- 支持单行/多行显示
- 支持文字滚动
- 支持左侧图标、右侧关闭按钮、查看更多按钮
- 支持自定义颜色、字体大小
- 事件回调丰富

## 属性（Props）
| 属性名            | 类型                | 默认值      | 说明                       |
|-------------------|---------------------|-------------|----------------------------|
| text              | String              | ''          | 显示文字                   |
| moreText          | String              | ''          | 设置"查看更多"的文本        |
| backgroundColor   | String              | #FFF9EA     | 背景颜色                   |
| speed             | Number              | 100         | 文字滚动速度（px/秒）        |
| color             | String              | #FF9A43     | 文字颜色                   |
| fontSize          | Number              | 14          | 字体大小（px）              |
| moreColor         | String              | #FF9A43     | 查看更多文字颜色            |
| single            | Boolean/String      | false       | 是否单行                   |
| scrollable        | Boolean/String      | false       | 是否滚动，滚动时始终单行     |
| showIcon          | Boolean/String      | false       | 是否显示左侧喇叭图标         |
| showGetMore       | Boolean/String      | false       | 是否显示右侧查看更多         |
| showClose         | Boolean/String      | false       | 是否显示右侧关闭按钮         |

## 事件（Events）
| 事件名      | 说明                   | 回调参数 |
|-------------|------------------------|----------|
| click       | 点击公告栏触发         | -        |
| close       | 点击关闭按钮触发       | -        |
| getmore     | 点击查看更多触发       | -        |

## 插槽（Slots）
| 名称   | 说明         |
|--------|--------------|
| icon   | 自定义左侧图标|

## 使用示例
```vue
<template>
  <zx-notice-bar
    text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序等多端。"
    :single="true"
    :scrollable="true"
    showIcon
    showClose
    showGetMore
    moreText="查看更多"
    color="#2979FF"
    backgroundColor="#EAF2FF"
    @click="onClick"
    @close="onClose"
    @getmore="onGetMore"
  />
</template>

<script setup>
function onClick() {
  uni.showToast({ title: '点击公告栏' })
}
function onClose() {
  uni.showToast({ title: '关闭公告栏' })
}
function onGetMore() {
  uni.showToast({ title: '查看更多' })
}
</script>
```

## 注意事项
- 组件已适配H5、小程序、App，无需关心平台差异。
- 滚动动画为兼容多端，未使用DOM测量，滚动速度与文字长度相关。
- 如需异步获取内容，建议使用`v-if`控制组件渲染。

## 参考文档
- [uni-notice-bar 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-notice-bar.html)
