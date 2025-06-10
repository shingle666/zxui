# zx-countdown 倒计时组件

## 介绍
zx-countdown是一个功能丰富的倒计时组件，支持天/时/分/秒，可自定义样式，支持毫秒级动画，支持暂停、恢复等操作。

## 引入方式
```vue
<script setup>
import ZxCountdown from '@/components/zx-countdown/zx-countdown.vue';
</script>

<template>
  <ZxCountdown :time="3600" />
</template>
```

## 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
| ----- | ---- | ------ | ---- |
| time | Number/String | 0 | 倒计时时长（单位：秒） |
| timestamp | Number/String | 0 | 目标时间戳，优先级高于time |
| width | Number | 32 | 数字框宽度 |
| height | Number | 32 | 数字框高度 |
| borderColor | String | '#333' | 数字框边框颜色 |
| backgroundColor | String | '#fff' | 数字框背景颜色 |
| size | Number | 24 | 数字框字体大小 |
| color | String | '#333' | 数字框字体颜色 |
| scale | Boolean | false | 是否缩放数字(0.9) |
| colonSize | Number | 28 | 冒号/单位文字大小 |
| colonColor | String | '#333' | 冒号/单位文字颜色 |
| days | Boolean | false | 是否显示天数 |
| hours | Boolean | true | 是否显示小时 |
| minutes | Boolean | true | 是否显示分钟 |
| seconds | Boolean | true | 是否显示秒数 |
| isColon | Boolean | true | 是否使用冒号分隔，false则显示单位文字 |
| unitEn | Boolean | false | 单位是否使用英文，仅在seconds启用且isColon为false时有效 |
| returnTime | Boolean | false | 是否返回剩余时间事件 |
| isMs | Boolean | false | 是否显示毫秒 |
| msWidth | Number | 32 | 毫秒框宽度 |
| msSize | Number | 24 | 毫秒字体大小 |
| msColor | String | '#333' | 毫秒字体颜色 |
| autoStart | Boolean | true | 是否自动开始倒计时 |
| format | Object | {} | 自定义格式化文本，如{day:'天',hour:'时',minute:'分',second:'秒'} |
| showZero | Boolean | true | 是否显示前导零 |
| interval | Number | 1000 | 更新频率(毫秒) |

## 事件

| 事件名 | 回调参数 | 说明 |
| ----- | ------- | ---- |
| start | {day,hour,minute,second,seconds} | 倒计时开始时触发 |
| end | {} | 倒计时结束时触发 |
| time | {day,hour,minute,second,seconds} | 倒计时进行中触发，需设置returnTime为true |
| pause | {seconds} | 倒计时暂停时触发 |
| resume | {seconds} | 倒计时恢复时触发 |

## 方法

| 方法名 | 参数 | 说明 |
| ----- | --- | ---- |
| start | - | 开始倒计时 |
| pause | - | 暂停倒计时 |
| resume | - | 恢复倒计时 |
| stop | - | 停止倒计时 |
| restart | - | 重新开始倒计时 |

## 样式主题

组件内置了多种预设主题样式，可以通过添加以下类名来使用：

| 类名 | 说明 |
| --- | --- |
| zx-theme-dark | 深色主题 |
| zx-theme-primary | 主色调主题（蓝色） |
| zx-theme-danger | 危险色主题（红色） |
| zx-theme-success | 成功色主题（绿色） |

## 样式效果

组件还支持以下额外的样式效果：

| 类名 | 说明 |
| --- | --- |
| zx-flat | 扁平化风格，无边框 |
| zx-rounded | 圆角风格 |
| zx-shadowed | 带阴影效果 |
| zx-number-change | 数字变化动画效果 |
| zx-ripple | 点击涟漪效果 |
| zx-blink | 冒号闪烁效果（用于冒号元素） |

## 使用方法

### 基础用法
```vue
<ZxCountdown :time="60" />
```

### 显示天数
```vue
<ZxCountdown :time="86400" :days="true" />
```

### 使用文字单位
```vue
<ZxCountdown :time="3600" :isColon="false" />
```

### 自定义样式
```vue
<ZxCountdown 
  :time="3600" 
  backgroundColor="#ff4757" 
  borderColor="#ff4757" 
  color="#ffffff" 
  colonColor="#ff4757" 
  :scale="true"
/>
```

### 使用主题
```vue
<view class="zx-theme-primary">
  <ZxCountdown :time="60" />
</view>
```

### 组合样式效果
```vue
<view class="zx-theme-danger zx-rounded zx-shadowed">
  <ZxCountdown :time="60" />
</view>
```

### 显示毫秒
```vue
<ZxCountdown :time="60" :isMs="true" />
```

### 使用时间戳
```vue
<ZxCountdown :timestamp="1640966400000" />
```

### 暂停和恢复
```vue
<ZxCountdown ref="countdownRef" :time="60" />

<button @click="countdownRef.pause()">暂停</button>
<button @click="countdownRef.resume()">恢复</button>
```

### 不自动开始
```vue
<ZxCountdown :time="60" :autoStart="false" ref="countdownRef" />

<button @click="countdownRef.start()">开始</button>
```

### 自定义格式化文本
```vue
<ZxCountdown 
  :time="3600" 
  :isColon="false"
  :format="{day:'D',hour:'H',minute:'M',second:'S'}" 
/>
```
