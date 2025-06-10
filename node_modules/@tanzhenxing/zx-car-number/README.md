# zx-car-number 车牌号输入组件

## 组件说明
`zx-car-number` 是一个用于输入中国车牌号的弹出式组件。支持普通车牌和新能源车牌两种类型的输入，提供便捷的车牌号输入键盘。

## 效果展示
弹出式车牌号输入键盘，包含省份选择和车牌号码输入区域。

## 使用方法

### 基本用法
```vue
<template>
  <view>
    <button @tap="openCarNumber">打开车牌输入</button>
    <zx-car-number 
      ref="carNumberRef" 
      @confirm="onCarNumberConfirm" 
      @open="onOpen" 
      @close="onClose"
    ></zx-car-number>
  </view>
</template>

<script>
export default {
  methods: {
    openCarNumber() {
      this.$refs.carNumberRef.open();
    },
    onCarNumberConfirm(carNumber) {
      console.log('车牌号：', carNumber);
    },
    onOpen() {
      console.log('车牌输入组件打开');
    },
    onClose() {
      console.log('车牌输入组件关闭');
    }
  }
}
</script>
```

### 预设车牌号和类型
```vue
<template>
  <view>
    <button @tap="openCarNumber">打开车牌输入</button>
    <zx-car-number ref="carNumberRef" @confirm="onCarNumberConfirm"></zx-car-number>
  </view>
</template>

<script>
export default {
  methods: {
    openCarNumber() {
      // 预设车牌类型：0-普通车牌，1-新能源车牌
      this.$refs.carNumberRef.setType(1);
      // 预设车牌号
      this.$refs.carNumberRef.setVal('京A12345');
      // 打开组件
      this.$refs.carNumberRef.open();
    },
    onCarNumberConfirm(carNumber) {
      console.log('车牌号：', carNumber);
    }
  }
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| isSwitchPage | Boolean | false | 是否为切换页面模式 |

## 事件

| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| confirm | 点击确定按钮时触发 | 车牌号字符串 |
| open | 组件打开时触发 | - |
| close | 组件关闭时触发 | - |

## 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开车牌输入组件 | - |
| close | 关闭车牌输入组件 | - |
| setType | 设置车牌类型 | carType: Number (0-普通车牌，1-新能源车牌) |
| setVal | 设置车牌号 | carNumber: String |
