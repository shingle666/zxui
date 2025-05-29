<template>
  <div class="demo-container">
    <h1>ZxDescriptions 描述列表演示</h1>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <zx-descriptions title="用户信息">
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
        <zx-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </zx-descriptions-item>
        <zx-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h2>不同尺寸</h2>
      <div class="size-controls">
        <el-radio-group v-model="size">
          <el-radio value="large">Large</el-radio>
          <el-radio value="default">Default</el-radio>
          <el-radio value="small">Small</el-radio>
        </el-radio-group>
      </div>
      
      <zx-descriptions
        title="带边框"
        :column="3"
        :size="size"
        border
        class="margin-top"
      >
        <template #extra>
          <el-button type="primary">操作</el-button>
        </template>
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
        <zx-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </zx-descriptions-item>
        <zx-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>

      <zx-descriptions
        title="无边框"
        :column="3"
        :size="size"
        class="margin-top"
      >
        <template #extra>
          <el-button type="primary">操作</el-button>
        </template>
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
        <zx-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </zx-descriptions-item>
        <zx-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </section>

    <!-- 垂直列表 -->
    <section class="demo-section">
      <h2>垂直列表</h2>
      <zx-descriptions title="水平列表" border>
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
        <zx-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </zx-descriptions-item>
        <zx-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>

      <zx-descriptions
        title="垂直列表"
        direction="vertical"
        border
        class="margin-top"
      >
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
        <zx-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </zx-descriptions-item>
        <zx-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </section>

    <!-- 自定义样式 -->
    <section class="demo-section">
      <h2>自定义样式</h2>
      <zx-descriptions title="自定义样式列表" :column="3" border>
        <zx-descriptions-item
          label="用户名"
          label-align="right"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="150px"
        >
          kooriookami
        </zx-descriptions-item>
        <zx-descriptions-item label="手机号" label-align="right" align="center">
          18100000000
        </zx-descriptions-item>
        <zx-descriptions-item label="居住地" label-align="right" align="center">
          苏州市
        </zx-descriptions-item>
        <zx-descriptions-item label="备注" label-align="right" align="center">
          <el-tag size="small">学校</el-tag>
        </zx-descriptions-item>
        <zx-descriptions-item label="联系地址" label-align="right" align="center">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </section>

    <!-- 跨行跨列 -->
    <section class="demo-section">
      <h2>跨行跨列</h2>
      <zx-descriptions title="跨行跨列示例" :column="4" border>
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地" :span="2">苏州市吴中区</zx-descriptions-item>
        <zx-descriptions-item label="备注" :span="3">
          <el-tag size="small">学校</el-tag>
        </zx-descriptions-item>
        <zx-descriptions-item label="联系地址" :span="4">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxDescriptionsDemo'
})

// 定义响应式数据
const size = ref('default')
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  margin-bottom: 20px;
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

.size-controls {
  margin-bottom: 20px;
}

.margin-top {
  margin-top: 20px;
}

:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}

:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style> 