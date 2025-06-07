# zx-loadmore 加载更多

> 此组件一般用于标识页面底部加载数据时的状态。

## 介绍

zx-loadmore 组件主要用于列表滚动到底部时，标识加载状态的组件。支持加载前、加载中、无更多数据和加载失败等多种状态，并可以通过点击触发加载事件。

## 平台兼容性

| H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 抖音小程序 | QQ小程序 | App |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| √ | √ | √ | √ | √ | √ | √ |

## 基本使用

### 引入组件

```vue
<script setup>
import zxLoadmore from '@/components/zx-loadmore/zx-loadmore.vue'
</script>

<template>
  <zx-loadmore :status="loadStatus" @loadmore="loadMore"></zx-loadmore>
</template>
```

### 基本用法

```vue
<template>
  <view>
    <view class="list-content">
      <!-- 列表内容 -->
    </view>
    
    <!-- 加载更多 -->
    <zx-loadmore :status="loadStatus" @loadmore="loadMore"></zx-loadmore>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const loadStatus = ref('loadmore') // 可选值：loadmore-加载前状态，loading-加载中状态，nomore-没有更多状态，failed-加载失败状态

function loadMore() {
  loadStatus.value = 'loading'
  
  // 模拟加载数据
  setTimeout(() => {
    // 根据加载结果设置状态
    // loadStatus.value = 'nomore' // 没有更多了
    loadStatus.value = 'loadmore' // 还有更多
    // loadStatus.value = 'failed' // 加载失败
  }, 2000)
}
</script>
```

## 组件状态

组件共有四种状态：

1. `loadmore` - 加载前的状态，显示"加载更多"文字，点击可触发加载事件
2. `loading` - 加载中的状态，显示加载动画和"正在加载..."文字
3. `nomore` - 没有更多数据的状态，显示"没有更多了"文字或粗点(isDot=true)
4. `failed` - 加载失败的状态，显示"加载失败，点击重试"文字，点击可触发加载事件

## 自定义样式

```vue
<!-- 自定义颜色和文字 -->
<zx-loadmore 
  status="loading" 
  color="#2979ff" 
  loadingText="努力加载中..." 
  loadmoreText="点击加载更多" 
  nomoreText="我是有底线的"
  iconColor="#2979ff">
</zx-loadmore>

<!-- 显示细线 -->
<zx-loadmore status="nomore" line></zx-loadmore>

<!-- 显示虚线 -->
<zx-loadmore status="nomore" line dashed></zx-loadmore>

<!-- 自定义线条颜色 -->
<zx-loadmore status="nomore" line lineColor="#ff9900"></zx-loadmore>

<!-- 使用粗点 -->
<zx-loadmore status="nomore" isDot></zx-loadmore>

<!-- 加载失败状态 -->
<zx-loadmore 
  status="failed" 
  errorColor="#ff0000" 
  failedText="网络异常，点击重试">
</zx-loadmore>
```

## API

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| status | String | loadmore | 组件状态，可选值：loadmore-加载前，loading-加载中，nomore-没有更多，failed-加载失败 |
| bgColor | String | transparent | 组件背景颜色，在页面是非白色时会用到 |
| icon | Boolean | true | 加载中时是否显示图标 |
| fontSize | String/Number | 28rpx | 字体大小 |
| iconSize | String/Number | 34rpx | 图标大小 |
| color | String | #606266 | 字体颜色 |
| loadingIcon | String | circle | 加载图标，可选值：circle-圆圈，spinner-花朵状，semicircle-半圆 |
| loadmoreText | String | 加载更多 | 加载前的提示语 |
| loadingText | String | 正在加载... | 加载中的提示语 |
| nomoreText | String | 没有更多了 | 没有更多的提示语 |
| failedText | String | 加载失败，点击重试 | 加载失败的提示语 |
| isDot | Boolean | false | 在"没有更多"状态下，是否显示粗点 |
| iconColor | String | #b7b7b7 | 加载中图标的颜色 |
| lineColor | String | #E6E8EB | 线条颜色，line为true时生效 |
| marginTop | String/Number | 10rpx | 上边距 |
| marginBottom | String/Number | 10rpx | 下边距 |
| height | String/Number | auto | 高度，单位px |
| line | Boolean | false | 是否显示左边分割线 |
| dashed | Boolean | false | 是否虚线，true-虚线，false-实线，line为true时生效 |
| clickable | Boolean | true | 是否可点击 |
| errorColor | String | #ff6767 | 失败状态文字颜色 |
| customStyle | Object | {} | 自定义样式，对象形式 |

### Events 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| loadmore | 当status为loadmore或failed时，点击组件会发出此事件 | - |

## 注意事项

1. 当列表内容不满一屏时，无法触发上拉加载事件，这时可以点击"加载更多"文字手动触发加载
2. 组件适配了暗黑模式，在暗黑模式下会自动调整颜色
3. 加载失败状态下，可以点击文字重新触发加载事件
4. 通过 customStyle 属性可以传入更多自定义样式，实现更灵活的定制
5. 组件使用了组合式API (Composition API)，示例代码也已更新为组合式API风格
