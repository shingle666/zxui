<template>
  <view class="ellipsis-demo">
    <!-- 页面标题 -->
    <view class="demo-title">Ellipsis 文本省略</view>
    
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="demo-item">
        <view class="item-title">尾部省略（默认）</view>
        <zx-ellipsis 
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
    </view>
    
    <!-- 省略位置 -->
    <view class="demo-section">
      <view class="section-title">省略位置</view>
      <view class="demo-item">
        <view class="item-title">头部省略</view>
        <zx-ellipsis 
          direction="start"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
      
      <view class="demo-item">
        <view class="item-title">中间省略</view>
        <zx-ellipsis 
          direction="middle"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
      
      <view class="demo-item">
        <view class="item-title">尾部省略</view>
        <zx-ellipsis 
          direction="end"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
    </view>
    
    <!-- 多行省略 -->
    <view class="demo-section">
      <view class="section-title">多行省略</view>
      <view class="demo-item">
        <view class="item-title">2行省略</view>
        <zx-ellipsis 
          :rows="2"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" 
        />
      </view>
      
      <view class="demo-item">
        <view class="item-title">3行省略</view>
        <zx-ellipsis 
          :rows="3"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。经过几个月的努力，我们很高兴地宣布，NutUI 现在已经支持小程序多端开发了！" 
        />
      </view>
    </view>
    
    <!-- 展开收起 -->
    <view class="demo-section">
      <view class="section-title">展开收起</view>
      <view class="demo-item">
        <view class="item-title">带展开收起功能</view>
        <zx-ellipsis 
          :rows="2"
          expand-text="展开"
          collapse-text="收起"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。经过几个月的努力，我们很高兴地宣布，NutUI 现在已经支持小程序多端开发了！这意味着开发者可以使用同一套代码，同时开发 H5、小程序和 App 应用。" 
          @change="onToggleChange"
        />
      </view>
    </view>
    
    <!-- 自定义省略符号 -->
    <view class="demo-section">
      <view class="section-title">自定义省略符号</view>
      <view class="demo-item">
        <view class="item-title">使用 *** 作为省略符号</view>
        <zx-ellipsis 
          symbol="***"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
      
      <view class="demo-item">
        <view class="item-title">使用 >> 作为省略符号</view>
        <zx-ellipsis 
          symbol=">>"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
    </view>
    
    <!-- 自定义样式 -->
    <view class="demo-section">
      <view class="section-title">自定义样式</view>
      <view class="demo-item">
        <view class="item-title">大字体红色文本</view>
        <zx-ellipsis 
          font-size="16px"
          text-color="#ff4757"
          :line-height="24"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
      
      <view class="demo-item">
        <view class="item-title">小字体灰色文本</view>
        <zx-ellipsis 
          font-size="12px"
          text-color="#999"
          :line-height="18"
          content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。" 
        />
      </view>
    </view>
    
    <!-- 点击事件 -->
    <view class="demo-section">
      <view class="section-title">点击事件</view>
      <view class="demo-item">
        <view class="item-title">点击文本触发事件</view>
        <zx-ellipsis 
          content="点击这段文本会触发点击事件，可以在控制台查看输出信息。" 
          @click="onTextClick"
        />
      </view>
    </view>
    
    <!-- 长文本测试 -->
    <view class="demo-section">
      <view class="section-title">长文本测试</view>
      <view class="demo-item">
        <view class="item-title">超长文本多行展开收起</view>
        <zx-ellipsis 
          :rows="3"
          expand-text="查看更多"
          collapse-text="收起"
          toggle-color="#007aff"
          :content="longText"
          @change="onToggleChange"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxEllipsis from '@tanzhenxing/zx-ellipsis/zx-ellipsis.vue'

// 长文本内容
const longText = ref(`
NutUI 是京东风格的移动端组件库，开发和服务于移动Web界面的企业级产品。

NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。

经过几个月的努力，我们很高兴地宣布，NutUI 现在已经支持小程序多端开发了！这意味着开发者可以使用同一套代码，同时开发 H5、小程序和 App 应用。

NutUI 提供了丰富的组件库，包括基础组件、业务组件、反馈组件等，能够满足大部分移动端开发需求。同时，NutUI 还提供了完善的文档和示例，帮助开发者快速上手。

我们相信，NutUI 将成为移动端开发的首选组件库，为开发者提供更好的开发体验和更高的开发效率。
`)

// 事件处理
function onTextClick() {
  console.log('文本被点击了')
  uni.showToast({
    title: '文本被点击了',
    icon: 'none'
  })
}

function onToggleChange(type) {
  console.log('展开收起状态改变:', type)
  uni.showToast({
    title: type === 'expand' ? '已展开' : '已收起',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.ellipsis-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
  padding: 20rpx 0;
  background-color: #fff;
  border-radius: 16rpx;
}

.demo-section {
  margin-bottom: 40rpx;
  
  .section-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8rpx;
      height: 28rpx;
      background-color: #007aff;
      border-radius: 4rpx;
    }
  }
}

.demo-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
  
  .item-title {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 20rpx;
    padding-bottom: 10rpx;
    border-bottom: 1rpx solid #eee;
  }
}

/* 适配暗黑模式 */
@media (prefers-color-scheme: dark) {
  .ellipsis-demo {
    background-color: #1a1a1a;
  }
  
  .demo-title {
    background-color: #2a2a2a;
    color: #fff;
  }
  
  .demo-section .section-title {
    color: #fff;
  }
  
  .demo-item {
    background-color: #2a2a2a;
    
    .item-title {
      color: #ccc;
      border-bottom-color: #444;
    }
  }
}
</style>