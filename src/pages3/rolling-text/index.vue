<template>
  <view class="page-container">
    <zx-navbar title="RollingText 翻滚文本"></zx-navbar>

    <view class="demo-section">
      <zx-title type="line" title="基础用法 (数字)"></zx-title>
      <view class="rolling-text-wrapper">
        <zx-rolling-text :start-num="0" :target-num="123" />
      </view>
      <view class="rolling-text-wrapper">
        <zx-rolling-text :start-num="950" :target-num="1024" height="30" font-size="28rpx" />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="设置翻滚方向 (up)"></zx-title>
      <view class="rolling-text-wrapper">
        <zx-rolling-text :start-num="0" :target-num="432" direction="up" />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="设置各数位停止顺序 (rtl)"></zx-title>
      <view class="rolling-text-wrapper">
        <zx-rolling-text :start-num="0" :target-num="54321" stop-order="rtl" />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="翻转非数字内容 (text-list)"></zx-title>
      <view class="rolling-text-wrapper">
        <zx-rolling-text :text-list="textList1" :duration="1.5" height="35" font-size="30rpx" item-width="25" />
      </view>
      <view class="rolling-text-wrapper">
        <zx-rolling-text :text-list="textList2" direction="up" :duration="2" height="40" font-size="32rpx" item-width="30" />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="自定义样式与高度"></zx-title>
      <view class="rolling-text-wrapper">
        <zx-rolling-text
          class="my-rolling-text-custom"
          :height="54"
          :start-num="12345"
          :target-num="54321"
          font-size="24px"
          item-width="40"
          gap="6"
          :custom-style="{ 
            '--zx-rolling-text-bg': '#1989fa',
            '--zx-rolling-text-color': 'white',
            '--zx-rolling-text-item-radius': '5px'
          }"
        />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="手动控制"></zx-title>
      <view class="rolling-text-wrapper">
        <zx-rolling-text
          ref="manualRollingTextRef"
          :start-num="0"
          :target-num="9876"
          :auto-start="false"
          height="45"
          font-size="40rpx"
        />
      </view>
      <view class="control-buttons">
        <zx-button type="primary" size="small" @click="handleStart">开始</zx-button>
        <zx-button type="warning" size="small" @click="handleReset">重置</zx-button>
      </view>
    </view>

     <view class="demo-section">
      <zx-title type="line" title="随机初始偏移（增加趣味性）"></zx-title>
      <view class="rolling-text-wrapper">
        <zx-rolling-text :start-num="100" :target-num="888" random-offset :duration="3" />
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';
import zxTitle from '@tanzhenxing/zx-title/zx-title.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxRollingText from '@tanzhenxing/zx-rolling-text/zx-rolling-text.vue';

const textList1 = ref([
  'AAAAA',
  'BBBBB',
  'CCCCC',
  'DDDDD',
  'EEEEE',
]);

const textList2 = ref([
  'VueJS',
  'React',
  'Solid',
  'Svelt',
  'UnApp',
]);

const manualRollingTextRef = ref(null);

const handleStart = () => {
  manualRollingTextRef.value?.start();
};

const handleReset = () => {
  manualRollingTextRef.value?.reset();
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20rpx;
  padding-bottom: 60rpx;
}

.demo-section {
  margin-bottom: 40rpx;
}

.rolling-text-wrapper {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #f8f8f8;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-rolling-text-custom {
  // 使用CSS变量来定义样式
  background-color: var(--zx-rolling-text-bg, #f0f0f0); // 默认背景
  color: var(--zx-rolling-text-color, #333); // 默认文字颜色
  border-radius: var(--zx-rolling-text-item-radius, 0);
  padding: 5px 10px;
}

.control-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 30rpx;
}
</style>