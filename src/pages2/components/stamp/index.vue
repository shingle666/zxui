<template>
  <view class="container">
    <text class="title">印章组件演示</text>
    <zx-stamp
      ref="stampRef"
      :show="true"
      :stampId="'demo-stamp'"
      :color="'#d81e06'"
      :size="240"
      :lineWidth="6"
      :companyName="'测试科技有限公司'"
      :stampName="'合同专用章'"
      :starRadius="30"
      :fontFamily="'微软雅黑'"
      :nameFontSize="18"
      :companyFontSize="26"
      @getImg="onGetImg"
      @drawed="onDrawed"
    />
    <button @click="redraw">手动重绘印章</button>
    <view v-if="imgPath" class="img-preview">
      <text>生成的图片预览：</text>
      <image :src="imgPath" :style="{width: '120px', height: '120px', border: '1px solid #eee'}" mode="aspectFit" />
    </view>
    <view class="desc">
      <text>你可以通过props自定义颜色、尺寸、线宽、公司名、印章名、字体等，支持多端（H5/小程序/App）。</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const imgPath = ref('');
const stampRef = ref(null);

function onGetImg(path) {
  imgPath.value = path;
}
function onDrawed() {
  // 可用于提示或其他逻辑
  // console.log('印章已绘制');
}
function redraw() {
  stampRef.value && stampRef.value.redraw();
}
</script>

<style scoped>
.container {
  padding: 32rpx;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 32rpx;
  display: block;
}
.img-preview {
  margin-top: 32rpx;
}
.desc {
  margin-top: 48rpx;
  color: #888;
  font-size: 28rpx;
}
</style> 