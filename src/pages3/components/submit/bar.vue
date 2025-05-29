<template>
  <view class="page">
    <view class="page-title">SubmitBar 提交订单栏</view>
    <view class="page-desc">用于展示订单金额与提交订单。</view>
    
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="section-content">
        <zx-submit-bar
          :price="3050"
          button-text="提交订单"
          @submit="onSubmit"
        />
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">禁用状态</view>
      <view class="section-desc">禁用状态下不会触发 submit 事件。</view>
      <view class="section-content">
        <zx-submit-bar
          disabled
          :price="3050"
          button-text="提交订单"
          tip="你的收货地址不支持配送"
          tip-icon="info"
          @submit="onSubmit"
        />
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">加载状态</view>
      <view class="section-desc">加载状态下不会触发 submit 事件。</view>
      <view class="section-content">
        <zx-submit-bar
          loading
          :price="3050"
          button-text="提交订单"
          @submit="onSubmit"
        />
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">高级用法</view>
      <view class="section-desc">通过插槽插入自定义内容。</view>
      <view class="section-content">
        <zx-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
          <zx-checkbox v-model="checked">全选</zx-checkbox>
          <template #tip>
            你的收货地址不支持配送, <text class="link" @tap="onClickLink">修改地址</text>
          </template>
        </zx-submit-bar>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">自定义金额展示</view>
      <view class="section-content">
        <zx-submit-bar
          :price="3050"
          button-text="提交订单"
          label="总计："
          suffix-label="(含运费)"
          @submit="onSubmit"
        />
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">自定义按钮</view>
      <view class="section-content">
        <zx-submit-bar :price="3050">
          <template #button>
            <zx-button type="primary" size="large" @click="onSubmit">立即购买</zx-button>
          </template>
        </zx-submit-bar>
      </view>
    </view>
    
    <!-- 占位元素，防止内容被底部的提交栏遮挡 -->
    <view style="height: 120px;"></view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);

const onSubmit = () => {
  uni.showToast({
    title: '点击按钮',
    icon: 'none'
  });
};

const onClickLink = () => {
  uni.showToast({
    title: '修改地址',
    icon: 'none'
  });
};
</script>

<style lang="scss">
.page {
  padding: 30rpx;
  background-color: #f7f8fa;
  min-height: 100vh;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.page-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 40rpx;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  padding: 30rpx;
  border-bottom: 1px solid #eee;
}

.section-desc {
  font-size: 26rpx;
  color: #666;
  padding: 20rpx 30rpx 0;
}

.section-content {
  padding: 30rpx;
  position: relative;
}

.link {
  color: #1989fa;
}
</style>