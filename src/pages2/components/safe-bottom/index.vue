<template>
  <view class="safe-bottom-demo">
    <view class="header">
      <view class="title">底部安全区组件</view>
      <view class="desc">用于适配iPhone等底部带指示条的机型</view>
    </view>

    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-block base-demo">
        <view class="content">基础用法示例</view>
        <zx-safe-bottom></zx-safe-bottom>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自定义背景色</view>
      <view class="demo-block bg-demo">
        <view class="content">自定义背景色为红色</view>
        <zx-safe-bottom bgColor="#ff0000"></zx-safe-bottom>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自定义高度</view>
      <view class="demo-block height-demo">
        <view class="content">自定义高度为50px并设置背景为蓝色</view>
        <zx-safe-bottom height="50" bgColor="#0000ff"></zx-safe-bottom>
      </view>
    </view>

    <view class="section props-section">
      <view class="section-title">Props 说明</view>
      <view class="props-table">
        <view class="table-header">
          <view class="th">参数</view>
          <view class="th">类型</view>
          <view class="th">默认值</view>
          <view class="th">说明</view>
        </view>
        <view class="table-row">
          <view class="td">height</view>
          <view class="td">String, Number</view>
          <view class="td">""</view>
          <view class="td">自定义底部安全区高度(px)</view>
        </view>
        <view class="table-row">
          <view class="td">bgColor</view>
          <view class="td">String</view>
          <view class="td">"transparent"</view>
          <view class="td">底部安全区背景颜色</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';

onLoad(() => {
  uni.setNavigationBarTitle({
    title: '底部安全区组件'
  });
});
</script>

<style lang="scss" scoped>
.safe-bottom-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;

  .header {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 10px;

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .desc {
      font-size: 14px;
      color: #666;
    }
  }

  .section {
    margin-bottom: 10px;
    background-color: #ffffff;
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }
  }

  .demo-block {
    height: 100px;
    position: relative;
    border-bottom: 1px solid #eee;
    
    .content {
      padding: 15px;
      font-size: 14px;
      color: #333;
    }
  }

  .props-section {
    padding-bottom: 15px;
    
    .props-table {
      padding: 0 15px;
      
      .table-header, .table-row {
        display: flex;
        border-bottom: 1px solid #eee;
      }
      
      .th, .td {
        padding: 10px 5px;
        font-size: 14px;
        flex: 1;
      }
      
      .th {
        font-weight: bold;
      }
      
      .td {
        color: #666;
      }
    }
  }
}
</style>
