<template>
  <view class="example-page">
    <view class="example-info">
      <text class="example-info-text">zx-section 组件主要用于文章、列表详情等标题展示，提供了多种样式选择</text>
    </view>

    <zx-section class="mb-10" title="基础用法" sub-title="这是副标题"></zx-section>

    <zx-section class="mb-10" title="竖线装饰" sub-title="这是副标题" type="line"></zx-section>

    <zx-section class="mb-10" title="圆形装饰" sub-title="这是副标题" type="circle"></zx-section>

    <zx-section class="mb-10" title="方形装饰" sub-title="这是副标题" type="square"></zx-section>

    <zx-section class="mb-10" title="自定义装饰器" sub-title="使用插槽自定义装饰器">
      <template #decoration>
        <view class="custom-decoration"></view>
      </template>
    </zx-section>

    <zx-section class="mb-10" title="默认插槽内容" sub-title="包含内容区域" padding>
      <view class="section-content-example">
        <text>这是默认插槽中的内容</text>
        <text>您可以在这里放置任何自定义内容</text>
      </view>
    </zx-section>

    <zx-section class="mb-10" title="自定义字体大小和颜色" 
      titleFontSize="18px" 
      titleColor="#007AFF"
      subTitle="自定义副标题样式" 
      subTitleFontSize="14px"
      subTitleColor="#FF9500">
    </zx-section>

    <zx-section class="mb-10" title="右侧插槽示例">
      <template #right>
        <view class="right-slot-content">
          <text class="right-text">更多</text>
        </view>
      </template>
    </zx-section>

    <zx-section class="mb-10" title="点击事件示例" sub-title="点击触发事件" @click="handleSectionClick"></zx-section>

    <zx-section class="mb-10" title="自定义内容区域Padding" sub-title="padding='20px'" padding="20px">
      <view class="section-content-example custom-padding">
        <text>自定义内容区域的padding</text>
      </view>
    </zx-section>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import ZxSection from '@/components/zx-section/zx-section.vue';

const handleSectionClick = () => {
  uni.showToast({
    title: '点击了标题栏',
    icon: 'none'
  });
};
</script>

<style lang="scss">
.example-page {
  padding: 15px;
  background-color: #f5f5f5;
}

.example-info {
  padding: 15px;
  color: #666;
  background: #fff;
  margin-bottom: 15px;
  border-radius: 5px;
  
  &-text {
    font-size: 14px;
    line-height: 1.5;
  }
}

.mb-10 {
  margin-bottom: 15px;
}

.custom-decoration {
  width: 6px;
  height: 6px;
  margin-right: 4px;
  border-radius: 2px;
  background-color: #FF5A5F;
}

.section-content-example {
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
  
  text {
    display: block;
    font-size: 14px;
    line-height: 1.6;
    color: #666;
  }
}

.custom-padding {
  background-color: #E6F7FF;
}

.right-slot-content {
  .right-text {
    font-size: 14px;
    color: #007AFF;
  }
}
</style> 