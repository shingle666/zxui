<template>
  <view class="demo-container">
    <view class="demo-title">zx-goods-nav 组件演示</view>
    <zx-goods-nav
      :options="options"
      :button-group="buttonGroup"
      :fill="true"
      @click="onNavClick"
      @buttonClick="onButtonClick"
    />
    <view class="demo-desc">点击左侧或右侧按钮查看效果</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxGoodsNav from '@/components/zx-goods-nav/zx-goods-nav.vue'

const options = ref([
  { icon: 'kefu-ermai', text: '客服' },
  { icon: 'home', text: '店铺', info: 2, infoBackgroundColor: '#007aff', infoColor: 'red' },
  { icon: 'shopping-cart', text: '购物车', info: 2 }
])

const buttonGroup = ref([
  { text: '加入购物车', backgroundColor: '#ff0000', color: '#fff' },
  { text: '立即购买', backgroundColor: '#ffa200', color: '#fff' }
])

function onNavClick(e) {
  uni.showToast({ title: `点击${e.content.text}`, icon: 'none' })
}
function onButtonClick(e) {
  options.value[2].info++
  uni.showToast({ title: `点击${e.content.text}`, icon: 'none' })
}
</script>

<style scoped>
.demo-container {
  padding: 24px;
}
.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.demo-desc {
  margin-top: 24px;
  color: #888;
  font-size: 14px;
}
</style> 