<template>
  <view class="lazyload-demo">
    <zx-navbar title="Lazyload 懒加载"></zx-navbar>

    <view class="demo-section">
      <zx-title type="line" title="基础用法"></zx-title>
      <view class="image-container">
        <zx-lazyload
          :src="images.nature"
          width="100%"
          height="300rpx"
          radius="16rpx"
          @load="onImageLoad('nature')"
          @error="onImageError('nature')"
        />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="加载中提示"></zx-title>
      <view class="image-container">
        <zx-lazyload
          :src="images.longLoading"
          loading-src="/static/logo.png" 
          width="100%"
          height="300rpx"
          radius="16rpx"
        />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="加载失败提示"></zx-title>
      <view class="image-container">
        <zx-lazyload
          src="https://example.com/non-existent-image.jpg"
          error-src="/static/images/error.png" 
          width="100%"
          height="300rpx"
          radius="16rpx"
        />
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="自定义加载与错误插槽"></zx-title>
      <view class="image-container">
        <zx-lazyload
          :src="images.customSlot"
          width="100%"
          height="300rpx"
          radius="16rpx"
          use-loading-slot
          use-error-slot
        >
          <template #loading>
            <view class="custom-loading">
              <zx-icon name="photo" size="60rpx" color="#999"></zx-icon>
              <text>努力加载中...</text>
            </view>
          </template>
          <template #error>
            <view class="custom-error">
              <zx-icon name="photo-fail" size="60rpx" color="#f00"></zx-icon>
              <text>加载失败啦</text>
            </view>
          </template>
        </zx-lazyload>
      </view>
    </view>

    <view class="demo-section">
      <zx-title type="line" title="列表懒加载"></zx-title>
      <view class="list-container">
        <view v-for="(item, index) in imageList" :key="index" class="list-item">
          <zx-lazyload
            :src="item.src"
            width="100%"
            height="200rpx"
            radius="8rpx"
            :loading-src="item.loading"
            :error-src="item.error"
            :threshold="0.01" 
          />
          <text class="item-text">图片 {{ index + 1 }}</text>
        </view>
      </view>
    </view>

     <view style="height: 1000px;">向下滚动查看更多懒加载效果</view>

  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxLazyload from '@/components/zx-lazyload/zx-lazyload.vue';
import zxNavbar from '@/components/zx-navbar/zx-navbar.vue';
import zxTitle from '@/components/zx-title/zx-title.vue';
import zxIcon from '@/components/zx-icon/zx-icon.vue';

const images = ref({
  nature: 'https://img.zxui.org/uniapp/images/capsule-bg.png',
  // 模拟一个加载比较慢的图片，或者网络不佳的情况
  longLoading: 'https://img.zxui.org/uniapp/images/swiper/swiper-img-1.jpg?delay=3000', 
  customSlot: 'https://img.zxui.org/uniapp/images/swiper/swiper-img-2.jpg',
});

const imageList = ref([
  {
    src: 'https://img.zxui.org/uniapp/images/grid/grid-1.png',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/grid/grid-2.png',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/grid/grid-3.png',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/grid/grid-4.png',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/grid/grid-5.png',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/grid/grid-6.png',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
   {
    src: 'https://img.zxui.org/uniapp/images/album/1.jpg',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/album/2.jpg',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/album/3.jpg',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
  {
    src: 'https://img.zxui.org/uniapp/images/album/4.jpg',
    loading: '/static/logo.png',
    error: '/static/images/error.png',
  },
]);

const onImageLoad = (name) => {
  console.log(`Image [${name}] loaded successfully`);
  uni.showToast({
    title: `图片 [${name}] 加载成功`,
    icon: 'none',
  });
};

const onImageError = (name) => {
  console.error(`Image [${name}] failed to load`);
  uni.showToast({
    title: `图片 [${name}] 加载失败`,
    icon: 'none',
  });
};

// 模拟一些图片资源，确保/static/images/error.png存在，或者替换为你的实际图片
// /static/logo.png 也需要存在

</script>

<style lang="scss" scoped>
.lazyload-demo {
  padding: 20rpx;
  padding-bottom: 50rpx; 
}

.demo-section {
  margin-bottom: 40rpx;
}

.image-container {
  background-color: #f9f9f9;
  border-radius: 16rpx;
  overflow: hidden; // 确保圆角生效
  margin-top: 20rpx;
}

.custom-loading,
.custom-error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  color: #666;
  font-size: 28rpx;

  text {
    margin-top: 10rpx;
  }
}

.custom-error {
  color: #f56c6c;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-top: 20rpx;
}

.list-item {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden; 
}

.item-text {
  display: block;
  font-size: 24rpx;
  color: #666;
  text-align: center;
  padding-top: 10rpx;
}
</style>