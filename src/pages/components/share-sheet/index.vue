<template>
  <view class="page-container">
    <view class="content">
      <zx-button @click="showShare1 = true">基础用法</zx-button>
      <zx-share-sheet
        :show="showShare1"
        title="立即分享给好友"
        :options="options1"
        @select="onSelect"
        @cancel="showShare1 = false"
        @update:show="(val) => showShare1 = val"
      />

      <view style="margin-top: 20rpx;">
        <zx-button @click="showShare2 = true">展示多行选项</zx-button>
      </view>
      <zx-share-sheet
        :show="showShare2"
        title="立即分享给好友"
        :options="options2"
        @select="onSelect"
        @cancel="showShare2 = false"
        @update:show="(val) => showShare2 = val"
      />

      <view style="margin-top: 20rpx;">
        <zx-button @click="showShare3 = true">自定义图标</zx-button>
      </view>
      <zx-share-sheet
        :show="showShare3"
        :options="options3"
        @select="onSelect"
        @cancel="showShare3 = false"
        @update:show="(val) => showShare3 = val"
      />

      <view style="margin-top: 20rpx;">
        <zx-button @click="showShare4 = true">展示描述信息</zx-button>
      </view>
      <zx-share-sheet
        :show="showShare4"
        title="立即分享给好友"
        description="这是一段描述信息"
        :options="options4"
        @select="onSelect"
        @cancel="showShare4 = false"
        @update:show="(val) => showShare4 = val"
      />

       <view style="margin-top: 20rpx;">
        <zx-button @click="showShare5 = true">自定义取消文字</zx-button>
      </view>
      <zx-share-sheet
        :show="showShare5"
        title="立即分享给好友"
        :options="options1"
        cancel-text="关闭"
        @select="onSelect"
        @cancel="showShare5 = false"
        @update:show="(val) => showShare5 = val"
      />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxShareSheet from '@/components/zx-share-sheet/zx-share-sheet.vue';
import zxButton from '@/components/zx-button/zx-button.vue'; // Assuming you have a button component
import zxNavBar from '@/components/zx-navbar/zx-navbar.vue'; // Assuming you have a navbar component

const showShare1 = ref(false);
const showShare2 = ref(false);
const showShare3 = ref(false);
const showShare4 = ref(false);
const showShare5 = ref(false);

const options1 = ref([
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' },
]);

const options2 = ref([
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq' },
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
    { name: '小程序码', icon: 'weapp-qrcode' },
  ],
]);

const options3 = ref([
  {
    name: '自定义图标1',
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-fire.png',
  },
  {
    name: '自定义图标2',
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-light.png',
  },
  {
    name: '自定义图标3',
    // It's better to download and use local images for app/小程序 for stability
    icon: '/static/logo.png', // Example local image
  },
]);

const options4 = ref([
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link', description: '链接已复制' },
  { name: '分享海报', icon: 'poster', description: '保存到相册' },
  { name: '二维码', icon: 'qrcode' },
]);

const onSelect = (option, index) => {
  console.log('Selected:', option, 'at index:', index);
  uni.showToast({
    title: `选择了 ${option.name}`,
    icon: 'none'
  });
  // Close the share sheet after selection if needed
  // This example relies on the cancel button or overlay click to close
  // Or you can manually set showShareX.value = false here
  // showShare1.value = false; 
  // showShare2.value = false;
  // showShare3.value = false;
  // showShare4.value = false;
};

</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex: 1;
  padding: 30rpx;
  box-sizing: border-box;
  overflow-y: auto;
}

// Add some spacing between buttons for better visual separation
.content > uni-button,
.content > view > uni-button,
.content > view > zx-button {
  margin-bottom: 20rpx;
}
</style>