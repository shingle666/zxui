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
  { url: '/static/c1.png', text: '宫格1' },
  { url: '/static/c2.png', text: '宫格2' },
  { url: '/static/c3.png', text: '宫格3' },
  { url: '/static/c4.png', text: '宫格4' },
  { url: '/static/c5.png', text: '宫格5' },
  { url: '/static/c6.png', text: '宫格6' },
]);
const list2 = ref([
  { url: '/static/c1.png', text: 'A' },
  { url: '/static/c2.png', text: 'B' },
  { url: '/static/c3.png', text: 'C' },
  { url: '/static/c4.png', text: 'D' },
  { url: '/static/c5.png', text: 'E' },
  { url: '/static/c6.png', text: 'F' },
  { url: '/static/c7.png', text: 'G' },
  { url: '/static/c8.png', text: 'H' },
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