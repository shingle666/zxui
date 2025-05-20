<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>

    <zx-text text="zx-text 组件使用示例" type="primary" @click="handleClick"></zx-text>

    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const title = ref('Hello')

onLoad((options)=>{
  console.log(JSON.stringify(options))
})

const handleClick = () => {
  uni.navigateTo({
    url: '/pages/components/zx-text-demo/index'
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
