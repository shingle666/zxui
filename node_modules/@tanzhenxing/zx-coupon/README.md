# zx-coupon 优惠券组件

适用于 uni-app 跨端（H5、小程序、App）优惠券展示与领取场景。

## 组件特性
- 支持多端（H5/小程序/App）
- 灵活配置券内容、颜色、按钮文案等
- 支持按钮点击事件、禁用状态
- 支持自定义样式

## 属性说明
| 属性名        | 类型     | 默认值      | 说明                       |
| ------------- | -------- | ----------- | -------------------------- |
| coupon        | Object   | 见下方      | 优惠券内容配置             |
| onBtnClick    | Function | null        | 按钮点击事件回调           |
| btnDisabled   | Boolean  | false       | 按钮是否禁用               |
| customClass   | String   | ''          | 自定义外层 class           |

### coupon 对象结构
| 字段    | 类型   | 默认值         | 说明           |
| ------- | ------ | -------------- | -------------- |
| color   | String | #9F6DFA        | 优惠券主色     |
| height  | String | 150rpx         | 优惠券高度     |
| unit    | String | ￥             | 金额单位       |
| number  | Number | 5              | 金额/折扣      |
| txt     | String | 满50元可用     | 副标题         |
| title   | String | 全场通用券     | 标题           |
| desc    | String | 有效期至2099-12-31 | 描述/有效期 |
| btn     | String | 领取           | 按钮文案       |
| drawed  | String | ''             | 已抢/剩余等信息|

## 事件说明
| 事件名      | 说明                 | 回调参数         |
| ----------- | -------------------- | ---------------- |
| onBtnClick  | 按钮点击时触发       | 当前券 coupon 对象|

## 使用示例
```vue
<template>
  <zx-coupon :coupon="coupon" :onBtnClick="onReceive" />
</template>
<script setup>
import { ref } from 'vue';
import zxCoupon from '@/components/zx-coupon/zx-coupon.vue';
const coupon = ref({
  color: '#9F6DFA',
  height: '150rpx',
  unit: '￥',
  number: 5,
  txt: '满50元可用',
  title: '全场通用券',
  desc: '有效期至 2025-12-31',
  btn: '立即领取',
  drawed: '已抢2100张'
});
function onReceive(coupon) {
  uni.showToast({
    title: `领取成功: ${coupon.title}`,
    icon: 'success'
  });
}
</script>
```

## 注意事项
- 建议配合 rpx 单位，适配多端
- 组件样式可通过 customClass 扩展
- 按钮禁用时自动降低透明度并禁止点击
