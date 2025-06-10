# zx-statistic 统计数值组件

显示统计数据和倒计时的组件。

## 基础用法

```html
<template>
  <zx-statistic title="日活跃用户" :value="268500" />
  
  <zx-statistic :value="138">
    <template #title>
      <view style="display: inline-flex; align-items: center">
        男女比例
      </view>
    </template>
    <template #suffix>/100</template>
  </zx-statistic>
</template>
```

## 倒计时用法

```html
<template>
  <zx-statistic title="开始抢购" :value="value" is-countdown />
  
  <zx-statistic
    title="剩余VIP时间"
    format="HH:mm:ss"
    :value="value1"
    is-countdown
  />
  
  <zx-statistic format="DD [days] HH:mm:ss" :value="value2" is-countdown>
    <template #title>
      <view style="display: inline-flex; align-items: center">
        距离下个月还有
      </view>
    </template>
  </zx-statistic>
</template>

<script setup>
import { ref } from 'vue';

// 当前时间加上7小时
const value = ref(Date.now() + 1000 * 60 * 60 * 7);
// 当前时间加上2天
const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2);
// 下个月的第一天
const value2 = ref(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime());
</script>
```

## 统计卡片样式

```html
<template>
  <view class="statistic-card">
    <zx-statistic :value="98500" title="日活跃用户" />
    <view class="statistic-footer">
      <view class="footer-item">
        <text>较昨日</text>
        <text class="green">
          24% ↑
        </text>
      </view>
    </view>
  </view>
</template>

<style>
.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: #606266;
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green {
  color: #67C23A;
}
</style>
```

## zx-statistic 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 数字内容或目标时间 | Number/Date/String/Object | 0 |
| decimal-separator | 设置小数点符号 | String | . |
| formatter | 自定义数字格式化 | Function | — |
| group-separator | 设置千分位标识符 | String | , |
| precision | 数字精度 | Number | 0 |
| prefix | 设置数字的前缀 | String | — |
| suffix | 设置数字的后缀 | String | — |
| title | 数字标题 | String | — |
| value-style | 数字样式 | String/Object | — |
| is-countdown | 是否为倒计时模式 | Boolean | false |
| format | 倒计时格式化 | String | HH:mm:ss |

## zx-statistic 插槽

| 插槽名 | 说明 |
| --- | --- |
| prefix | 数字区之前 |
| suffix | 数字区之后 |
| title | 数字标题 |

## zx-statistic 事件（倒计时模式）

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 时间差改变事件 | 剩余时间（毫秒） |
| finish | 倒计时结束事件 | — |


