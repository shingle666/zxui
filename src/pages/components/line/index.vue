<template>
  <div class="line-demo">
    <h2>ZxLine 线条组件演示</h2>
    
    <!-- 基础用法 -->
    <section class="demo-section">
      <h3>基础用法</h3>
      <p>最简单的线条用法：</p>
      <zx-line />
    </section>

    <!-- 自定义颜色 -->
    <section class="demo-section">
      <h3>自定义颜色</h3>
      <zx-line color="#2979ff" />
      <zx-line color="red" />
    </section>

    <!-- 自定义长度 -->
    <section class="demo-section">
      <h3>自定义长度</h3>
      <zx-line length="50px" />
      <zx-line length="50%" />
    </section>

    <!-- 虚线样式 -->
    <section class="demo-section">
      <h3>虚线样式</h3>
      <zx-line dashed />
    </section>

    <!-- 竖向线条 -->
    <section class="demo-section">
      <h3>竖向线条</h3>
      <div style="display: flex; align-items: center; height: 100px;">
        <span>左</span>
        <zx-line direction="col" length="80px" style="margin: 0 16px;" />
        <span>右</span>
      </div>
    </section>

    <!-- 线条粗细 -->
    <section class="demo-section">
      <h3>线条粗细</h3>
      <zx-line width="3px" />
    </section>

    <!-- 圆角线条 -->
    <section class="demo-section">
      <h3>圆角线条</h3>
      <zx-line radius="6px" width="4px" color="#f56c6c" />
    </section>

    <!-- 线条样式 -->
    <section class="demo-section">
      <h3>线条样式</h3>
      <zx-line borderStyle="dotted" />
    </section>

    <!-- 渐变色线条 -->
    <section class="demo-section">
      <h3>渐变色线条</h3>
      <zx-line color="linear-gradient(to right, #ff3366, #ff6633)" :hairline="false" width="4px" />
    </section>

    <!-- 带动画效果 -->
    <section class="demo-section">
      <h3>带动画效果</h3>
      <zx-line animation color="#2979ff" />
    </section>
  </div>
</template>

<script setup>
import zxLine from '@/components/zx-line/zx-line.vue'
</script>

<style scoped lang="scss">
.line-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

.demo-section {
  margin-bottom: 40px;
  
  h3 {
    color: #2979ff;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin: 0 0 16px 0;
    color: #606266;
  }
}

h2 {
  text-align: center;
  color: #2979ff;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 600;
}

// 响应式设计
@media (max-width: 768px) {
  .line-demo {
    padding: 16px;
  }
  h2 {
    font-size: 20px;
  }
  .demo-section h3 {
    font-size: 16px;
  }
}
</style>
