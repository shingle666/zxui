<template>
  <view class="container">
    <zx-navbar title="FloatingPanel 浮动面板"></zx-navbar>
    <view class="content-area">
      <view style="padding: 20rpx;">
        <zx-button @click="showDefault = !showDefault">基础用法</zx-button>
        <view style="height: 20rpx;"></view>
        <zx-button @click="showAnchors = !showAnchors">自定义锚点</zx-button>
        <view style="height: 20rpx;"></view>
        <zx-button @click="showHeadOnly = !showHeadOnly">仅头部拖拽</zx-button>
      </view>

      <zx-floating-panel v-model="showDefault" :height="150">
        <view style="padding: 30rpx; text-align: center;">
          <text>这是基础用法的浮动面板内容区域。</text>
          <view v-for="i in 10" :key="'default-' + i" style="padding: 10rpx; border-bottom: 1rpx solid #eee;">
            列表项 {{ i }}
          </view>
        </view>
      </zx-floating-panel>

      <zx-floating-panel v-model="showAnchors" :height="currentHeight" :anchors="anchors" @heightChange="onHeightChange">
        <view style="padding: 30rpx; text-align: center;">
          <text>面板显示高度 {{ currentHeight.toFixed(0) }} px</text>
          <view v-for="i in 15" :key="'anchor-' + i" style="padding: 10rpx; border-bottom: 1rpx solid #eee;">
            列表项 {{ i }}
          </view>
        </view>
      </zx-floating-panel>

      <zx-floating-panel v-model="showHeadOnly" :height="200" :content-draggable="false">
        <view style="padding: 30rpx; text-align: center;">
          <text>内容不可拖拽</text>
          <view v-for="i in 5" :key="'head-' + i" style="padding: 10rpx; border-bottom: 1rpx solid #eee;">
            列表项 {{ i }}
          </view>
        </view>
      </zx-floating-panel>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import zxFloatingPanel from '@tanzhenxing/zx-floating-panel/zx-floating-panel.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';

const showDefault = ref(false);
const showAnchors = ref(false);
const showHeadOnly = ref(false);

const getWindowHeight = () => {
  // #ifdef H5
  return window.innerHeight;
  // #endif
  // #ifdef MP || APP-PLUS
  return uni.getSystemInfoSync().windowHeight;
  // #endif
  return 600; // Default or fallback
};

const anchors = computed(() => {
  const windowHeight = getWindowHeight();
  return [
    100,
    Math.round(0.4 * windowHeight),
    Math.round(0.7 * windowHeight),
  ].sort((a,b) => a - b);
});

const currentHeight = ref(anchors.value[0]);

onMounted(() => {
  // 初始化高度，确保 anchors 计算完毕
  currentHeight.value = anchors.value[0] || 100;
});

const onHeightChange = (e) => {
  console.log('面板高度变化:', e.height);
  // currentHeight.value = e.height; // 组件内部已经双向绑定了 height，这里可以不用手动更新，除非有特殊逻辑
};

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f8fa;
}
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 20rpx;
}

/* 确保页面内容可以滚动，以便测试浮动面板的 lockScroll 效果（如果实现） */
.long-content {
  height: 150vh; /* 使页面内容足够长 */
  padding: 20rpx;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 20rpx;
}
</style>