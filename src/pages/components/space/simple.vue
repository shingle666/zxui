<template>
  <div class="simple-test">
    <h2>ZxSpace 简单测试</h2>
    
    <!-- 基础测试 -->
    <section>
      <h3>基础间距</h3>
      <zx-space>
        <button>按钮1</button>
        <button>按钮2</button>
        <button>按钮3</button>
      </zx-space>
    </section>

    <!-- 垂直布局测试 -->
    <section>
      <h3>垂直布局</h3>
      <zx-space direction="vertical">
        <div class="test-item">项目 1</div>
        <div class="test-item">项目 2</div>
        <div class="test-item">项目 3</div>
      </zx-space>
    </section>

    <!-- 大小测试 -->
    <section>
      <h3>不同大小</h3>
      <div style="margin-bottom: 16px;">
        <span>Small: </span>
        <zx-space size="small">
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </zx-space>
      </div>
      <div style="margin-bottom: 16px;">
        <span>Default: </span>
        <zx-space size="default">
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </zx-space>
      </div>
      <div style="margin-bottom: 16px;">
        <span>Large: </span>
        <zx-space size="large">
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </zx-space>
      </div>
    </section>

    <!-- 分隔符测试 -->
    <section>
      <h3>分隔符</h3>
      <zx-space spacer="|">
        <span>首页</span>
        <span>产品</span>
        <span>关于</span>
      </zx-space>
    </section>

    <!-- 换行测试 -->
    <section>
      <h3>自动换行</h3>
      <div style="width: 300px; border: 1px dashed #ccc; padding: 16px;">
        <zx-space wrap>
          <button v-for="i in 8" :key="i">按钮{{ i }}</button>
        </zx-space>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
.simple-test {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

section {
  margin-bottom: 32px;
}

h2 {
  text-align: center;
  color: #409eff;
  margin-bottom: 32px;
}

h3 {
  color: #606266;
  margin-bottom: 16px;
  font-size: 16px;
}

button {
  padding: 8px 16px;
  border: 1px solid #409eff;
  background: #409eff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.test-item {
  padding: 12px 16px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
}
</style> 