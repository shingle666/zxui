<template>
  <div class="divider-demo">
    <h2>ZxDivider 分割线组件演示</h2>
    
    <!-- 基础用法 -->
    <section class="demo-section">
      <h3>基础用法</h3>
      <p>我坐在晨光中的窗前，世界如同一个过路人，停留片刻，向我点头示意后离去。</p>
      <zx-divider />
      <p>这些微小的思绪是树叶的沙沙声，它们在我心中低语着欢乐。</p>
    </section>

    <!-- 带文案的分割线 -->
    <section class="demo-section">
      <h3>设置文案</h3>
      <p>你看不见你自己，你所看见的只是你的影子。</p>
      <zx-divider content-position="left">泰戈尔</zx-divider>
      <p>我的愿望是愚人，它们在你的歌声中喧哗。让我只是静听着吧。</p>
      <zx-divider>
        <span style="color: #ff6b6b;">❤️</span>
      </zx-divider>
      <p>我不能选择那最好的，是那最好的选择我。</p>
      <zx-divider content-position="right">泰戈尔</zx-divider>
    </section>

    <!-- 虚线样式 -->
    <section class="demo-section">
      <h3>不同边框样式</h3>
      <p>大海啊，你说的是什么语言？</p>
      <zx-divider border-style="dashed" />
      <p>是永恒疑问的语言。</p>
      <zx-divider border-style="dotted" />
      <p>天空啊，你回答的是什么？</p>
      <zx-divider border-style="double" />
      <p>是永恒沉默的语言。</p>
    </section>

    <!-- 垂直分割线 -->
    <section class="demo-section">
      <h3>垂直分割线</h3>
      <div style="text-align: center; font-size: 16px;">
        <span>雨</span>
        <zx-divider direction="vertical" />
        <span>家</span>
        <zx-divider direction="vertical" border-style="dashed" />
        <span>草</span>
      </div>
    </section>

    <!-- 样式自定义 -->
    <section class="demo-section">
      <h3>自定义样式</h3>
      <p>通过 CSS 变量可以自定义分割线样式：</p>
      <div class="custom-divider">
        <zx-divider>自定义样式</zx-divider>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

</script>

<style scoped lang="scss">
.divider-demo {
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
    color: #409eff;
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
  color: #409eff;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 600;
}

.custom-divider {
  --zx-border-color: #67c23a;
  --zx-text-color-placeholder: #67c23a;
  
  :deep(.zx-divider) {
    margin: 24px 0;
    
    .zx-divider__text {
      font-weight: 600;
      background: linear-gradient(45deg, #67c23a, #409eff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .divider-demo {
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