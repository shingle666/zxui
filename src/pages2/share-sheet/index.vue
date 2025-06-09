<template>
  <view class="page-container">
    <zx-navbar title="动作面板"></zx-navbar>
    
    <view class="content">
      <zx-icon :name="svgcode" size="200rpx" color="#07c160"></zx-icon>

      <zx-button @click="showShare1 = true">基础用法</zx-button>
      <zx-share-sheet :show="showShare1" title="立即分享给好友" :options="options1" @select="onSelect"
        @cancel="showShare1 = false" @update:show="(val) => showShare1 = val" />

      <view style="margin-top: 20rpx;">
        <zx-button @click="showShare2 = true">展示多行选项</zx-button>
      </view>
      <zx-share-sheet :show="showShare2" title="立即分享给好友" :options="options2" @select="onSelect"
        @cancel="showShare2 = false" @update:show="(val) => showShare2 = val" />

      <view style="margin-top: 20rpx;">
        <zx-button @click="showShare3 = true">自定义图标</zx-button>
      </view>
      <zx-share-sheet :show="showShare3" :options="options3" @select="onSelect" @cancel="showShare3 = false"
        @update:show="(val) => showShare3 = val" />

      <view style="margin-top: 20rpx;">
        <zx-button @click="showShare4 = true">展示描述信息</zx-button>
      </view>
      <zx-share-sheet :show="showShare4" title="立即分享给好友" description="这是一段描述信息" :options="options4" @select="onSelect"
        @cancel="showShare4 = false" @update:show="(val) => showShare4 = val" />

      <view style="margin-top: 20rpx;">
        <zx-button @click="showShare5 = true">自定义取消文字</zx-button>
      </view>
      <zx-share-sheet :show="showShare5" title="立即分享给好友" :options="options1" cancel-text="关闭" @select="onSelect"
        @cancel="showShare5 = false" @update:show="(val) => showShare5 = val" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';
import zxShareSheet from '@tanzhenxing/zx-share-sheet/zx-share-sheet.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

const svgcode = ref(`<svg t="1748833579979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2789" width="200" height="200"><path d="M240.071 241.095h59.278v59.278h-59.278v-59.278z" fill="" p-id="2790"></path><path d="M405.959 134.485h-272.611v272.611h106.723v47.445h59.278v-47.445h106.723v-59.278h47.445v-47.445h-47.445l-0.114-165.888zM346.795 347.819h-154.169v-154.055h154.055v154.055h0.114zM240.071 727.154h59.278v59.278h-59.278v-59.278zM726.016 241.095h59.278v59.278h-59.278v-59.278zM512.683 509.042v63.943h59.278v-59.165h47.445v-59.278h-47.445v-47.445h-59.278v101.945zM512.683 725.789v60.643h59.278v-106.723h47.445v-59.278h-106.723v105.358zM571.961 786.432h47.445v47.445h-47.445v-47.445zM453.405 833.877v59.165h118.557v-59.165h-118.557z" fill="" p-id="2791"></path><path d="M678.685 679.709h-59.278v106.723h106.61v-59.278h-47.331v-47.445zM726.016 893.042h166.002v-59.165h-106.723v-47.445h-59.278v106.61zM892.018 513.821v-59.278h-106.723v59.278h106.723zM832.739 727.154h59.278v59.278h-59.278v-59.278zM453.405 347.819h59.278v59.278h-59.278v-59.278zM726.016 454.542v-47.445h166.002v-272.611h-272.611v59.278h-106.723v47.445h106.723v59.165h-47.445v47.445h47.445v59.278h59.278v47.445h47.331zM678.685 193.763h154.055v154.055h-154.055v-154.055zM678.685 572.985h47.331v47.445h-47.331v-47.445zM785.294 679.709h-59.278v47.445h106.723v-106.723h59.278v-47.445h-106.723v106.723zM453.405 241.095h59.278v59.278h-59.278v-59.278zM299.349 513.821h47.445v59.165h-47.445v-59.165zM453.405 454.542h-106.61v59.278h59.165v59.165h47.445v-118.443z" fill="" p-id="2792"></path><path d="M405.959 786.432v-106.723h47.445v-59.278h-213.333v-106.61h-106.723v59.278h59.278v47.445h-59.278v272.611h272.611v-59.278h47.445v-47.445h-47.445zM346.795 833.877h-154.169v-154.169h154.055v154.169h0.114zM453.405 572.985h59.278v47.445h-59.278v-47.445zM619.406 513.821h59.278v59.165h-59.278v-59.165zM726.016 513.821h59.278v59.165h-59.278v-59.165z" fill="" p-id="2793"></path></svg>`);
const showShare1 = ref(false);
const showShare2 = ref(false);
const showShare3 = ref(false);
const showShare4 = ref(false);
const showShare5 = ref(false);

const options1 = ref([
  { name: '微信', icon: 'weixin-fill' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link', customPrefix: 'uni-icon' },
  { name: '分享海报', icon: 'photo' },
  { name: '二维码', icon: '<svg t="1748833579979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2789" width="200" height="200"><path d="M240.071 241.095h59.278v59.278h-59.278v-59.278z" fill="" p-id="2790"></path><path d="M405.959 134.485h-272.611v272.611h106.723v47.445h59.278v-47.445h106.723v-59.278h47.445v-47.445h-47.445l-0.114-165.888zM346.795 347.819h-154.169v-154.055h154.055v154.055h0.114zM240.071 727.154h59.278v59.278h-59.278v-59.278zM726.016 241.095h59.278v59.278h-59.278v-59.278zM512.683 509.042v63.943h59.278v-59.165h47.445v-59.278h-47.445v-47.445h-59.278v101.945zM512.683 725.789v60.643h59.278v-106.723h47.445v-59.278h-106.723v105.358zM571.961 786.432h47.445v47.445h-47.445v-47.445zM453.405 833.877v59.165h118.557v-59.165h-118.557z" fill="" p-id="2791"></path><path d="M678.685 679.709h-59.278v106.723h106.61v-59.278h-47.331v-47.445zM726.016 893.042h166.002v-59.165h-106.723v-47.445h-59.278v106.61zM892.018 513.821v-59.278h-106.723v59.278h106.723zM832.739 727.154h59.278v59.278h-59.278v-59.278zM453.405 347.819h59.278v59.278h-59.278v-59.278zM726.016 454.542v-47.445h166.002v-272.611h-272.611v59.278h-106.723v47.445h106.723v59.165h-47.445v47.445h47.445v59.278h59.278v47.445h47.331zM678.685 193.763h154.055v154.055h-154.055v-154.055zM678.685 572.985h47.331v47.445h-47.331v-47.445zM785.294 679.709h-59.278v47.445h106.723v-106.723h59.278v-47.445h-106.723v106.723zM453.405 241.095h59.278v59.278h-59.278v-59.278zM299.349 513.821h47.445v59.165h-47.445v-59.165zM453.405 454.542h-106.61v59.278h59.165v59.165h47.445v-118.443z" fill="" p-id="2792"></path><path d="M405.959 786.432v-106.723h47.445v-59.278h-213.333v-106.61h-106.723v59.278h59.278v47.445h-59.278v272.611h272.611v-59.278h47.445v-47.445h-47.445zM346.795 833.877h-154.169v-154.169h154.055v154.169h0.114zM453.405 572.985h59.278v47.445h-59.278v-47.445zM619.406 513.821h59.278v59.165h-59.278v-59.165zM726.016 513.821h59.278v59.165h-59.278v-59.165z" fill="" p-id="2793"></path></svg>' },
]);

const options2 = ref([
  [
    { name: '微信', icon: 'weixin-fill' },
    { name: '朋友圈', icon: 'moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq-fill' },
  ],
  [
    { name: '复制链接', icon: 'link', customPrefix: 'uni-icon' },
    { name: '分享海报', icon: 'photo' },
    { name: '二维码', icon: 'cloud-download' },
    { name: '小程序码', icon: 'weapp-qrcode' },
  ],
]);

const options3 = ref([
  {
    name: '自定义图标1',
    icon: 'https://cdn.mp.ac.cn/icon/custom-icon-fire.png',
  },
  {
    name: '自定义图标2',
    icon: 'https://cdn.mp.ac.cn/icon/custom-icon-light.png',
  },
  {
    name: '自定义图标3',
    icon: 'https://zxui.org/logo.png'
  },
]);

const options4 = ref([
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link', description: '链接已复制', customPrefix: 'uni-icon' },
  { name: '分享海报', icon: 'poster', description: '保存到相册' },
  { name: '二维码', icon: 'cloud-download', customPrefix: 'uni-icon' },
]);

const onSelect = (option, index) => {
  console.log('Selected:', option, 'at index:', index);
  uni.showToast({
    title: `选择了 ${option.name}`,
    icon: 'none'
  });
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

.content>uni-button,
.content>view>uni-button,
.content>view>zx-button {
  margin-bottom: 20rpx;
}
</style>