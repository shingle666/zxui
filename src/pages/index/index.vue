<template>
  <view class="content">
    <view>
      <zx-text
        text="zx-text 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/text/index')"
      ></zx-text>

      <zx-text
        text="zx-icon 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/icon/index')"
      ></zx-text>
      
      <zx-text
        text="zx-avatar 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/avatar/index')"
      ></zx-text>

      <zx-text
        text="zx-button 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/button/index')"
      ></zx-text>
      
      <zx-text
        text="zx-badge 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/badge/index')"
      ></zx-text>

      <zx-text
        text="zx-album 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/album/index')"
      ></zx-text>

      <zx-text
        text="zx-area-picker 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/area-picker/index')"
      ></zx-text>

      <zx-text
        text="zx-audio 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/audio/index')"
      ></zx-text>

      <zx-text
        text="zx-video 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/video/index')"
      ></zx-text>

      <zx-text
        text="zx-camera 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/camera/index')"
      ></zx-text>

      <zx-text
        text="zx-status-bar 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/status-bar/index')"
      ></zx-text>

      <zx-text
        text="zx-safe-bottom 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/safe-bottom/index')"
      ></zx-text>
      
      <zx-text
        text="zx-transition 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/transition/index')"
      ></zx-text>

      <zx-text
        text="zx-overlay 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/overlay/index')"
      ></zx-text>

      <zx-text
        text="zx-popup 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/popup/index')"
      ></zx-text>

      <zx-text
        text="zx-image 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/image/index')"
      ></zx-text>

      <zx-text
        text="zx-avatar-group 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/avatar/group')"
      ></zx-text>

      <zx-text
        text="zx-avatar 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/avatar/index')"
      ></zx-text>

      <zx-text
        text="zx-calendar 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/calendar/index')"
      ></zx-text>
      <zx-text
        text="zx-canvas 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/canvas/index')"
      ></zx-text>

      <zx-text
        text="zx-card 组件使用示例"
        type="primary"
        @click="handleClick('/pages/components/card/index')"
      ></zx-text>
      
      
      
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const title = ref("Hello");

onLoad((options) => {
  console.log(JSON.stringify(options));
});

const handleClick = (path) => {
  uni.navigateTo({
    url: path,
  });
};
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
