<template>
  <view style="padding: 30rpx;">
    <text style="font-size: 32rpx; font-weight: bold;">基础用法</text>
    <zx-input v-model="inputValue" placeholder="请输入内容" clearable />

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">带前后缀图标</text>
    <zx-input v-model="iconInput" placeholder="有前后缀图标" prefixIcon="search" suffixIcon="close" @click-prefix-icon="onPrefixClick" @click-suffix-icon="onSuffixClick" />

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">密码框</text>
    <zx-input v-model="password" placeholder="请输入密码" password clearable />

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">验证手机号</text>
    <zx-input v-model="phone" placeholder="请输入手机号" :validate="'isMobilePhone'" clearable />

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">不同尺寸</text>
    <zx-input v-model="smallInput" size="small" placeholder="小尺寸" />
    <zx-input v-model="largeInput" size="large" placeholder="大尺寸" style="margin-top: 20rpx;" />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const iconInput = ref('');
const password = ref('');
const phone = ref('');
const smallInput = ref('');
const largeInput = ref('');

function onPrefixClick() {
  uni.showToast({ title: '点击了前缀图标', icon: 'none' });
}
function onSuffixClick() {
  uni.showToast({ title: '点击了后缀图标', icon: 'none' });
}
</script>
