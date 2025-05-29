<template>
  <view style="padding: 30rpx;">
    <text style="font-size: 32rpx; font-weight: bold;">1. 直接包裹控件（默认触发第一个控件）</text>
    <zx-label>
      <zx-checkbox v-model="value1">选项1</zx-checkbox>
    </zx-label>

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">2. 使用for属性指定控件ID</text>
    <zx-label for="myCheckbox" style="margin-bottom: 20rpx;">
      <text>点我选中</text>
    </zx-label>
    <zx-checkbox v-model="value2" id="myCheckbox">选项1</zx-checkbox>

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">3. 多个控件包裹（触发第一个控件）</text>
    <zx-label>
      <zx-checkbox v-model="value3">选项1</zx-checkbox>
      <zx-radio v-model="radioValue" value="2">选项2</zx-radio>
    </zx-label>

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">4. 设置样式</text>
    <zx-label padding="20rpx" margin="10rpx" :isFull="true">
      <zx-switch v-model="switchValue"></zx-switch>
      <text>开启/关闭</text>
    </zx-label>

    <text style="font-size: 32rpx; font-weight: bold; margin-top: 40rpx;">5. 配合按钮使用</text>
    <zx-label for="submitBtn">
      <text>点击提交</text>
    </zx-label>
    <zx-button id="submitBtn" type="primary" @click="submit">提交</zx-button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(false);
const value2 = ref(false);
const value3 = ref(false);
const radioValue = ref('2');
const switchValue = ref(false);

function submit() {
  uni.showToast({ title: '提交成功', icon: 'success' });
}
</script>
