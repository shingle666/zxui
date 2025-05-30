<template>
  <view class="page-container">
    <zx-title title="基础用法"></zx-title>
    <view class="button-group">
      <zx-button type="primary" @click="openBasicPreview">打开预览</zx-button>
    </view>

    <zx-title title="指定初始位置与关闭回调"></zx-title>
    <view class="button-group">
      <zx-button type="success" @click="openWithStartPosition">从第二张开始</zx-button>
    </view>

    <zx-title title="显示关闭按钮"></zx-title>
    <view class="button-group">
      <zx-button type="warning" @click="openWithCloseButton">带关闭按钮</zx-button>
    </view>

    <zx-title title="异步关闭与自定义内容"></zx-title>
    <view class="button-group">
      <zx-button type="danger" @click="openAsyncClose">异步关闭</zx-button>
      <zx-button @click="openWithCustomCover">自定义遮罩内容</zx-button>
    </view>
    
    <zx-title title="空图片列表"></zx-title>
    <view class="button-group">
      <zx-button @click="openWithEmptyImages">打开空列表预览</zx-button>
    </view>

    <zx-image-preview
      ref="imagePreviewRef"
      :show="showPreview"
      :images="currentImages"
      :start-position="currentStartPosition"
      :loop="currentLoop"
      :min-zoom="currentMinZoom"
      :max-zoom="currentMaxZoom"
      :show-index="currentShowIndex"
      :closeable="currentCloseable"
      :close-icon-position="currentCloseIconPosition"
      :before-close="currentBeforeClose"
      @update:show="showPreview = $event"
      @change="onPreviewChange"
      @close="onPreviewClose"
      @scale="onPreviewScale"
    >
      <template v-if="showCustomCoverSlot" #cover>
        <view class="custom-cover-content">
          这是自定义的遮罩层内容 ({{ currentCoverText }})
        </view>
      </template>
    </zx-image-preview>

    <zx-toast ref="toastRef"></zx-toast>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxImagePreview from '@/components/zx-image-preview/zx-image-preview.vue';
import zxButton from '@/components/zx-button/zx-button.vue';
import zxTitle from '@/components/zx-title/zx-title.vue';
import zxToast from '@/components/zx-toast/zx-toast.vue'; // Assuming zx-toast component exists

const imagePreviewRef = ref(null);
const toastRef = ref(null);

const allImages = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://img01.yzcdn.cn/vant/leaf.jpg',
  'https://img01.yzcdn.cn/vant/tree.jpg'
];

const showPreview = ref(false);
const currentImages = ref([]);
const currentStartPosition = ref(0);
const currentLoop = ref(true);
const currentMinZoom = ref(0.5);
const currentMaxZoom = ref(3);
const currentShowIndex = ref(true);
const currentCloseable = ref(false);
const currentCloseIconPosition = ref('top-right');
const currentBeforeClose = ref(null);
const showCustomCoverSlot = ref(false);
const currentCoverText = ref('');

const resetPreviewConfig = () => {
  currentImages.value = [...allImages];
  currentStartPosition.value = 0;
  currentLoop.value = true;
  currentMinZoom.value = 0.5;
  currentMaxZoom.value = 3;
  currentShowIndex.value = true;
  currentCloseable.value = false;
  currentCloseIconPosition.value = 'top-right';
  currentBeforeClose.value = null;
  showCustomCoverSlot.value = false;
  currentCoverText.value = '';
};

const openBasicPreview = () => {
  resetPreviewConfig();
  showPreview.value = true;
};

const openWithStartPosition = () => {
  resetPreviewConfig();
  currentStartPosition.value = 1; // Start from the second image (index 1)
  showPreview.value = true;
};

const openWithCloseButton = () => {
  resetPreviewConfig();
  currentCloseable.value = true;
  currentCloseIconPosition.value = 'bottom-right';
  showPreview.value = true;
};

const openAsyncClose = () => {
  resetPreviewConfig();
  currentCloseable.value = true;
  currentBeforeClose.value = (done) => {
    toastRef.value.show({
      title: '2秒后关闭',
      type: 'loading',
      duration: 2000,
      onClose: () => {
        done(); // Call done to actually close the preview
      }
    });
  };
  showPreview.value = true;
};

const openWithCustomCover = () => {
  resetPreviewConfig();
  showCustomCoverSlot.value = true;
  currentCoverText.value = `当前图片: ${currentStartPosition.value + 1}`;
  showPreview.value = true;
};

const openWithEmptyImages = () => {
  resetPreviewConfig();
  currentImages.value = [];
  showPreview.value = true; // Component should handle empty images gracefully
   toastRef.value.show({
      title: '图片列表为空',
      type: 'warning',
    });
};

const onPreviewChange = (index) => {
  console.log('Preview changed to index:', index);
  if (toastRef.value) {
    toastRef.value.show({ title: `切换到第 ${index + 1} 张` });
  }
  if (showCustomCoverSlot.value) {
    currentCoverText.value = `当前图片: ${index + 1}`;
  }
};

const onPreviewClose = (detail) => {
  console.log('Preview closed:', detail);
  if (toastRef.value) {
    toastRef.value.show({ title: `预览已关闭 (来自: ${detail.fromAction ? '用户操作' : '代码'})`, type: 'success' });
  }
  // showPreview.value = false; // This is handled by v-model or @update:show
};

const onPreviewScale = (detail) => {
  console.log(`Image at index ${detail.index} scaled to: ${detail.scale.toFixed(2)}`);
};

</script>

<style lang="scss" scoped>
.page-container {
  padding: 15px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.custom-cover-content {
  position: absolute;
  bottom: 30px; // Adjust as needed
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 14px;
  z-index: 5; // Ensure it's above swiper but below close button if necessary
}
</style>