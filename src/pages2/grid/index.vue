<template>
  <view class="demo-grid">
    <view class="section-title">基本用法（3列）</view>
    <zx-grid :column="3" @change="onGridChange">
      <zx-grid-item v-for="(item, idx) in list" :key="idx" :index="idx">
        <view class="grid-item-box">
          <image :src="item.url" class="image" mode="aspectFill" />
          <text class="text">{{ item.text }}</text>
        </view>
      </zx-grid-item>
    </zx-grid>

    <view class="section-title">无边框矩形（4列）</view>
    <zx-grid :column="4" :show-border="false" :square="false" @change="onGridChange">
      <zx-grid-item v-for="(item, idx) in list2" :key="idx" :index="idx">
        <view class="grid-item-box">
          <image :src="item.url" class="image" mode="aspectFill" />
          <text class="text">{{ item.text }}</text>
        </view>
      </zx-grid-item>
    </zx-grid>

    <view class="section-title">自定义边框颜色</view>
    <zx-grid :column="3" border-color="#03a9f4" @change="onGridChange">
      <zx-grid-item v-for="(item, idx) in list" :key="idx" :index="idx">
        <view class="grid-item-box">
          <image :src="item.url" class="image" mode="aspectFill" />
          <text class="text">{{ item.text }}</text>
        </view>
      </zx-grid-item>
    </zx-grid>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const list = ref([
  { url: 'https://cdn.mp.ac.cn/banner/01.jpg', text: '宫格1' },
  { url: 'https://cdn.mp.ac.cn/banner/02.jpg', text: '宫格2' },
  { url: 'https://cdn.mp.ac.cn/banner/03.jpg', text: '宫格3' },
  { url: 'https://cdn.mp.ac.cn/banner/04.jpg', text: '宫格4' },
  { url: 'https://cdn.mp.ac.cn/banner/01.jpg', text: '宫格5' },
  { url: 'https://cdn.mp.ac.cn/banner/02.jpg', text: '宫格6' },
]);
const list2 = ref([
  { url: 'https://cdn.mp.ac.cn/banner/01.jpg', text: 'A' },
  { url: 'https://cdn.mp.ac.cn/banner/02.jpg', text: 'B' },
  { url: 'https://cdn.mp.ac.cn/banner/03.jpg', text: 'C' },
  { url: 'https://cdn.mp.ac.cn/banner/04.jpg', text: 'D' },
  { url: 'https://cdn.mp.ac.cn/banner/01.jpg', text: 'E' },
  { url: 'https://cdn.mp.ac.cn/banner/02.jpg', text: 'F' },
  { url: 'https://cdn.mp.ac.cn/banner/03.jpg', text: 'G' },
  { url: 'https://cdn.mp.ac.cn/banner/04.jpg', text: 'H' },
]);

function onGridChange(e) {
  uni.showToast({ title: `点击第${e.detail.index + 1}个宫格` });
}
</script>

<style scoped>
.demo-grid {
  padding: 16px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px 0;
}
.grid-item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
}
.image {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  border-radius: 8px;
}
.text {
  font-size: 14px;
  color: #333;
}
</style> 