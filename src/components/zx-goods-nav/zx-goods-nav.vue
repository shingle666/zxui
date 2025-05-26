<template>
  <view class="zx-goods-nav">
    <view class="zx-tab__seat" />
    <view class="zx-tab__cart-box flex">
      <view class="flex zx-tab__cart-sub-left">
        <view v-for="(item, index) in options" :key="index" class="flex zx-tab__cart-button-left zx-tab__shop-cart" @click="onClick(index, item)">
          <view class="zx-tab__icon">
            <zx-icon :name="item.icon" size="20" color="#646566"></zx-icon>
          </view>
          <text class="zx-tab__text">{{ item.text }}</text>
          <view class="flex zx-tab__dot-box">
            <text v-if="item.info" :class="{ 'zx-tab__dots': item.info > 9 }" class="zx-tab__dot" :style="{ backgroundColor: item.infoBackgroundColor || '#ff0000', color: item.infoColor || '#fff' }">{{ item.info }}</text>
          </view>
        </view>
      </view>
      <view :class="{ 'zx-tab__right': fill }" class="flex zx-tab__cart-sub-right">
        <view v-for="(item, index) in buttonGroup" :key="index" :style="{ background: item.backgroundColor, color: item.color }" class="flex zx-tab__cart-button-right" @click="onButtonClick(index, item)">
          <text :style="{ color: item.color }" class="zx-tab__cart-button-right-text">{{ item.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      { icon: 'shop', text: '店铺' },
      { icon: 'cart', text: '购物车' }
    ]
  },
  buttonGroup: {
    type: Array,
    default: () => [
      { text: '加入购物车', backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)', color: '#fff' },
      { text: '立即购买', backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)', color: '#fff' }
    ]
  },
  fill: {
    type: Boolean,
    default: false
  },
  stat: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'buttonClick'])

function onClick(index, item) {
  emit('click', { index, content: item })
}

function onButtonClick(index, item) {
  // 支持 uni.report 统计
  if (typeof uni !== 'undefined' && uni.report && props.stat) {
    uni.report(item.text, item.text)
  }
  emit('buttonClick', { index, content: item })
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
}
.zx-goods-nav {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.zx-tab__cart-box {
  flex: 1;
  height: 50px;
  background-color: #fff;
  z-index: 900;
}
.zx-tab__cart-sub-left {
  padding: 0 5px;
}
.zx-tab__cart-sub-right {
  flex: 1;
}
.zx-tab__right {
  margin: 5px 0;
  margin-right: 10px;
  border-radius: 100px;
  overflow: hidden;
}
.zx-tab__cart-button-left {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 10px;
}
.zx-tab__icon {
  width: 18px;
  height: 18px;
}
.zx-tab__text {
  margin-top: 3px;
  font-size: 12px;
  color: #646566;
}
.zx-tab__cart-button-right {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.zx-tab__cart-button-right-text {
  font-size: 14px;
  color: #fff;
}
.zx-tab__cart-button-right:active {
  opacity: 0.7;
}
.zx-tab__dot-box {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -2px;
  top: 2px;
  justify-content: center;
  align-items: center;
}
.zx-tab__dot {
  padding: 0 4px;
  line-height: 15px;
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  background-color: #ff0000;
  border-radius: 15px;
}
.zx-tab__dots {
  padding: 0 4px;
  border-radius: 15px;
}
</style>
