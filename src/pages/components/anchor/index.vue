<template>
  <view class="anchor-demo">
    <view class="title">锚点导航示例</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-container">
        <view class="anchor-container">
          <zx-anchor>
            <zx-anchor-link href="#part-1" title="第一部分"></zx-anchor-link>
            <zx-anchor-link href="#part-2" title="第二部分"></zx-anchor-link>
            <zx-anchor-link href="#part-3" title="第三部分"></zx-anchor-link>
            <zx-anchor-link href="#part-4" title="第四部分"></zx-anchor-link>
          </zx-anchor>
        </view>
        
        <view class="content">
          <view id="part-1" class="content-section">
            <view class="content-title">第一部分</view>
            <view class="content-text">这是第一部分的内容，点击左侧导航可以快速定位到这里。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="part-2" class="content-section">
            <view class="content-title">第二部分</view>
            <view class="content-text">这是第二部分的内容，滚动页面时，左侧导航会自动高亮当前部分。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="part-3" class="content-section">
            <view class="content-title">第三部分</view>
            <view class="content-text">这是第三部分的内容。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="part-4" class="content-section">
            <view class="content-title">第四部分</view>
            <view class="content-text">这是第四部分的内容。</view>
            <view class="placeholder"></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 下划线类型 -->
    <view class="section">
      <view class="section-title">下划线类型</view>
      <view class="demo-container">
        <view class="anchor-container">
          <zx-anchor type="underline">
            <zx-anchor-link href="#underline-1" title="选项一"></zx-anchor-link>
            <zx-anchor-link href="#underline-2" title="选项二"></zx-anchor-link>
            <zx-anchor-link href="#underline-3" title="选项三"></zx-anchor-link>
          </zx-anchor>
        </view>
        
        <view class="content">
          <view id="underline-1" class="content-section">
            <view class="content-title">选项一内容</view>
            <view class="content-text">这是选项一的内容区域。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="underline-2" class="content-section">
            <view class="content-title">选项二内容</view>
            <view class="content-text">这是选项二的内容区域。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="underline-3" class="content-section">
            <view class="content-title">选项三内容</view>
            <view class="content-text">这是选项三的内容区域。</view>
            <view class="placeholder"></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 水平方向 -->
    <view class="section">
      <view class="section-title">水平方向</view>
      <view class="demo-container horizontal-demo">
        <zx-anchor direction="horizontal" class="horizontal-anchor">
          <zx-anchor-link href="#horizontal-1" title="标签一"></zx-anchor-link>
          <zx-anchor-link href="#horizontal-2" title="标签二"></zx-anchor-link>
          <zx-anchor-link href="#horizontal-3" title="标签三"></zx-anchor-link>
          <zx-anchor-link href="#horizontal-4" title="标签四"></zx-anchor-link>
        </zx-anchor>
        
        <view class="horizontal-content">
          <view id="horizontal-1" class="content-section">
            <view class="content-title">标签一内容</view>
            <view class="content-text">这是标签一对应的内容区域。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="horizontal-2" class="content-section">
            <view class="content-title">标签二内容</view>
            <view class="content-text">这是标签二对应的内容区域。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="horizontal-3" class="content-section">
            <view class="content-title">标签三内容</view>
            <view class="content-text">这是标签三对应的内容区域。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="horizontal-4" class="content-section">
            <view class="content-title">标签四内容</view>
            <view class="content-text">这是标签四对应的内容区域。</view>
            <view class="placeholder"></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 自定义配置 -->
    <view class="section">
      <view class="section-title">自定义配置</view>
      <view class="demo-container">
        <view class="anchor-container">
          <zx-anchor :offset="20" :duration="500" type="underline">
            <zx-anchor-link href="#custom-1">
              <view class="custom-link">自定义链接 1</view>
            </zx-anchor-link>
            <zx-anchor-link href="#custom-2">
              <view class="custom-link">自定义链接 2</view>
            </zx-anchor-link>
            <zx-anchor-link href="#custom-3">
              <view class="custom-link">自定义链接 3</view>
              <template #sub-link>
                <zx-anchor-link href="#custom-3-1" title="子链接 3-1"></zx-anchor-link>
                <zx-anchor-link href="#custom-3-2" title="子链接 3-2"></zx-anchor-link>
              </template>
            </zx-anchor-link>
          </zx-anchor>
        </view>
        
        <view class="content">
          <view id="custom-1" class="content-section">
            <view class="content-title">自定义内容 1</view>
            <view class="content-text">这是自定义配置的内容区域 1。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="custom-2" class="content-section">
            <view class="content-title">自定义内容 2</view>
            <view class="content-text">这是自定义配置的内容区域 2。</view>
            <view class="placeholder"></view>
          </view>
          
          <view id="custom-3" class="content-section">
            <view class="content-title">自定义内容 3</view>
            <view class="content-text">这是自定义配置的内容区域 3。</view>
            <view class="placeholder small"></view>
            
            <view id="custom-3-1" class="content-subsection">
              <view class="content-subtitle">子内容 3-1</view>
              <view class="content-text">这是子内容 3-1 的区域。</view>
              <view class="placeholder small"></view>
            </view>
            
            <view id="custom-3-2" class="content-subsection">
              <view class="content-subtitle">子内容 3-2</view>
              <view class="content-text">这是子内容 3-2 的区域。</view>
              <view class="placeholder small"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue'

// 页面加载后初始化
onMounted(() => {
  // 可以在这里添加一些初始化逻辑
})
</script>

<style scoped>
.anchor-demo {
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.demo-container {
  display: flex;
}

.anchor-container {
  width: 200px;
  padding-right: 20px;
}

.content {
  flex: 1;
  border-left: 1px solid #eee;
  padding-left: 20px;
}

.content-section {
  margin-bottom: 30px;
  padding-top: 10px;
}

.content-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.content-subtitle {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
  color: #666;
}

.content-text {
  line-height: 1.6;
  color: #666;
}

.placeholder {
  height: 200px;
}

.placeholder.small {
  height: 100px;
}

/* 水平方向样式 */
.horizontal-demo {
  flex-direction: column;
}

.horizontal-anchor {
  margin-bottom: 20px;
}

.horizontal-content {
  padding-top: 20px;
  border-top: 1px solid #eee;
  border-left: none;
  padding-left: 0;
}

/* 自定义链接样式 */
.custom-link {
  color: #1989fa;
  font-weight: bold;
}

.content-subsection {
  padding-left: 20px;
}
</style>
