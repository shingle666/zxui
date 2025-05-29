<template>
  <view class="container">
    <zx-title title="基础用法" type="line" />
    <zx-goods-card
      title="商品标题示例，这是一个比较长的商品标题，会自动换行显示，最多显示两行"
      desc="这里是商品的描述信息，简洁明了地介绍商品特点"
      num="2"
      price="288.00"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      @click="handleClick('基础用法')"
      @clickThumb="handleClickThumb('基础用法')"
    />

    <zx-title title="营销信息" type="line" />
    <zx-goods-card
      tag="新品"
      num="1"
      price="199.99"
      origin-price="299.00"
      title="特价商品"
      desc="限时抢购，优惠不容错过"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/apple-watch.jpeg"
      @click="handleClick('营销信息')"
    />

    <zx-title title="自定义内容 (插槽)" type="line" />
    <zx-goods-card
      num="10"
      price="99.00"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cap.jpeg"
    >
      <template #title>
        <view style="font-size: 32rpx; color: blueviolet;">自定义标题通过Slot</view>
      </template>
      <template #desc>
        <view style="color: green;">自定义描述信息，更加灵活</view>
      </template>
      <template #tags>
        <view style="margin-top: 8rpx;">
          <text class="tag-slot">活动标签1</text>
          <text class="tag-slot" style="margin-left: 8rpx;">活动标签2</text>
        </view>
      </template>
      <template #price>
        <view style="color: orange; font-size: 40rpx;">
          <text style="font-size: 24rpx;">¥</text>
          99.00
        </view>
      </template>
      <template #origin-price>
        <text style="color: #ccc; text-decoration: line-through; margin-left: 10rpx;">¥199.00</text>
      </template>
      <template #num>
        <text style="color: #1989fa;">库存: 10件</text>
      </template>
      <template #footer>
        <view style="display: flex; justify-content: flex-end; margin-top: 16rpx;">
          <button size="mini" type="primary" style="margin-left: 10rpx;" @click.stop="handleButtonClick('加入购物车')">加入购物车</button>
          <button size="mini" type="warn" style="margin-left: 10rpx;" @click.stop="handleButtonClick('立即购买')">立即购买</button>
        </view>
      </template>
    </zx-goods-card>

    <zx-title title="无图片" type="line" />
    <zx-goods-card
      title="纯文字商品信息"
      desc="适用于无图或加载失败的场景"
      price="50.00"
      num="5"
    />

    <zx-title title="内容居中" type="line" />
    <zx-goods-card
      centered
      title="居中显示的商品"
      desc="描述信息也居中"
      price="120.00"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/perfume.jpeg"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const handleClick = (type) => {
  uni.showToast({
    title: `点击了【${type}】卡片`,
    icon: 'none'
  });
  console.log(`点击了【${type}】卡片`);
};

const handleClickThumb = (type) => {
  uni.showToast({
    title: `点击了【${type}】的图片`,
    icon: 'none'
  });
  console.log(`点击了【${type}】的图片`);
};

const handleButtonClick = (action) => {
  uni.showToast({
    title: `点击了按钮：${action}`,
    icon: 'none'
  });
  console.log(`点击了按钮：${action}`);
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f8f8f8;
}

.tag-slot {
  display: inline-block;
  padding: 2rpx 8rpx;
  font-size: 20rpx;
  color: #fa2c19;
  border: 1rpx solid #fa2c19;
  border-radius: 4rpx;
}

// 确保 zx-title 有一些基础样式，如果项目中没有全局定义
// zx-title {
//   margin: 30rpx 0 20rpx;
//   font-size: 32rpx;
//   font-weight: bold;
// }
</style>