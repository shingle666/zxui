# zx-luckshake 摇一摇抽奖

`zx-luckshake` 是一个摇一摇抽奖组件，支持 H5、小程序、App 多端运行，可配置图片、摇晃设备回调等。

## 特性

- 🎮 支持摇一摇抽奖功能
- 📱 兼容 H5、小程序、App 多端
- 🎨 支持自定义红包图片、尺寸等
- ⚡ 流畅的摇晃动画效果
- 🎯 支持点击和摇晃双重触发方式
- 🔧 灵活的配置选项
- 📳 支持震动反馈（仅限支持的平台）

## 注意事项

- 监听设备的加速度变化等信息的 API `devicemotion` 的兼容性问题：
  - 在 iOS 10+ 之后，iOS 做了安全限制，如果想要在页面中使用陀螺仪相关的一些事件，必须使用 https 协议
  - 如果用户可以在手机的设置关闭掉"动作与方向访问"，则设备不支持摇一摇功能
  - 调用手机震动的 API `navigator.vibrate` 只在安卓系统有效

## 使用方法

### 基础用法

```vue
<template>
  <view class="demo">
    <zx-luckshake
      ref="luckshake"
      :luck-width="luckWidth"
      :luck-height="luckHeight"
      @shake-event="shakeEvent"
      @click-shake="handleClick"
    >
    </zx-luckshake>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ZxLuckshake from '@/components/zx-luckshake/zx-luckshake.vue'

// 红包大小
const luckWidth = ref('200px')
const luckHeight = ref('160px')

// 剩余抽奖次数
const shakeNum = ref(3)

const shakeEvent = () => {
  if (shakeNum.value == 0) {
    console.log('无抽奖次数')
  } else if (shakeNum.value == 1) {
    setTimeout(() => {
      console.log('中奖啦')
    }, 200)
    shakeNum.value -= 1
  } else {
    setTimeout(() => {
      console.log(`抽奖次数还剩${shakeNum.value}次`)
    }, 200)
    shakeNum.value -= 1
  }
}

const handleClick = () => {
  console.log('点击摇一摇')
  if (shakeNum.value == 0) {
    console.log('无抽奖次数')
  } else if (shakeNum.value == 1) {
    setTimeout(() => {
      console.log('中奖啦')
    }, 200)
    shakeNum.value -= 1
  } else {
    setTimeout(() => {
      console.log(`抽奖次数还剩${shakeNum.value}次`)
    }, 200)
    shakeNum.value -= 1
  }
}
</script>
```

### 自定义红包图片

```vue
<template>
  <zx-luckshake
    luck-width="250px"
    luck-height="200px"
    luck-img-top="/static/images/redpacket-top.png"
    luck-img-bottom="/static/images/redpacket-bottom.png"
    @shake-event="onShake"
  >
  </zx-luckshake>
</template>
```

### 自定义手势图片

```vue
<template>
  <zx-luckshake
    click-point="/static/images/hand-gesture.png"
    :pointer-style="{
      width: '120px',
      height: '120px'
    }"
    @shake-event="onShake"
  >
  </zx-luckshake>
</template>
```

### 禁用手势提示

```vue
<template>
  <zx-luckshake
    :click-point="false"
    @shake-event="onShake"
  >
  </zx-luckshake>
</template>
```

### 调整摇晃灵敏度

```vue
<template>
  <zx-luckshake
    :shake-speed="80"
    :duration-animation="1500"
    @shake-event="onShake"
  >
  </zx-luckshake>
</template>
```

## Props

| 字段 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| is-shake | 当前环境是否支持摇一摇 | String/Boolean | true |
| luck-width | 红包图片的宽度 | String | '200px' |
| luck-height | 红包图片的高度 | String | '160px' |
| luck-img-top | 红包上半部分图片 | String | '' |
| luck-img-bottom | 红包下半部分图片 | String | '' |
| click-point | 点击手势图片，不需要可设置为 false | String/Boolean | '' |
| shake-speed | 摇手机的阈值，越小越灵敏 | Number | 110 |
| duration-time | 震动持续时间，小程序不可设置此参数 | Number | 1000 |
| duration-animation | 触发摇一摇后距离回调函数的时间 | Number | 1000 |
| pointer-style | 点击图片的样式 | Object | {width: '90px', height: '90px'} |

## Events

| 字段 | 说明 | 回调参数 |
|------|------|----------|
| shake-event | 摇晃设备的回调函数 | - |
| click-shake | 点击回调函数 | - |

## 样式定制

组件提供了默认的红包和手势样式，你也可以通过传入自定义图片来替换：

### 默认红包样式
- 红包采用渐变色设计，上半部分为浅红色，下半部分为深红色
- 上半部分中央有金色圆形装饰
- 支持圆角和阴影效果

### 默认手势样式
- 使用 emoji 手势图标
- 包含"摇一摇"文字提示
- 支持弹跳动画效果

### 自定义样式
```vue
<template>
  <zx-luckshake
    luck-img-top="你的红包顶部图片路径"
    luck-img-bottom="你的红包底部图片路径"
    click-point="你的手势图片路径"
    :pointer-style="{
      width: '100px',
      height: '100px',
      borderRadius: '50%'
    }"
  >
  </zx-luckshake>
</template>
```

## 平台兼容性

| 平台 | 摇一摇检测 | 震动反馈 | 说明 |
|------|------------|----------|------|
| H5 | ✅ | ✅ (仅安卓) | 需要 HTTPS 协议，iOS 需要用户授权 |
| 小程序 | ✅ | ❌ | 使用 uni.onAccelerometerChange |
| App | ✅ | ✅ | 原生支持 |

## 常见问题

### Q: 在 H5 中摇一摇不生效？
A: 请确保：
1. 使用 HTTPS 协议访问
2. 在 iOS 设备上需要用户手动授权设备运动权限
3. 检查设备是否开启了"动作与方向访问"权限

### Q: 如何调整摇晃灵敏度？
A: 通过 `shake-speed` 属性调整，数值越小越灵敏，建议范围 50-200

### Q: 震动功能不工作？
A: 震动功能仅在安卓设备上有效，iOS 设备不支持网页震动

### Q: 如何禁用摇一摇，只保留点击功能？
A: 设置 `:is-shake="false"` 即可禁用摇一摇检测

## 更新日志

### v1.0.0
- 初始版本发布
- 支持摇一摇和点击双重触发
- 支持多端兼容
- 支持自定义图片和样式
- 支持震动反馈