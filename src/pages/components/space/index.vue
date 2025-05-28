<template>
  <view class="space-demo">
    <view class="demo-header">
      <text class="demo-title">ZxSpace 间距组件</text>
      <text class="demo-subtitle">为元素之间提供统一的间距布局</text>
    </view>

    <!-- 基础用法示例 -->
    <view class="example-section">
      <view class="section-title">基础用法</view>
      <view class="section-desc">最简单的用法，水平排列元素并提供间距</view>
      
      <view class="example-demo">
        <zx-space>
          <view class="demo-item">Item 1</view>
          <view class="demo-item">Item 2</view>
          <view class="demo-item">Item 3</view>
          <view class="demo-item">Item 4</view>
        </zx-space>
      </view>
      
      <view class="code-example">
        <text class="code-title">代码示例:</text>
        <text class="code-text">&lt;zx-space&gt;\n  &lt;view&gt;Item 1&lt;/view&gt;\n  &lt;view&gt;Item 2&lt;/view&gt;\n&lt;/zx-space&gt;</text>
      </view>
    </view>

    <!-- 方向控制 -->
    <view class="example-section">
      <view class="section-title">方向控制</view>
      <view class="section-desc">通过 direction 属性控制排列方向</view>
      
      <view class="direction-controls">
        <button 
          v-for="dir in directions" 
          :key="dir.value"
          :class="['control-btn', { active: currentDirection === dir.value }]"
          @click="currentDirection = dir.value"
        >
          {{ dir.label }}
        </button>
      </view>
      
      <view class="example-demo">
        <zx-space :direction="currentDirection">
          <view class="demo-item primary">按钮 1</view>
          <view class="demo-item success">按钮 2</view>
          <view class="demo-item warning">按钮 3</view>
        </zx-space>
      </view>
    </view>

    <!-- 间距大小 -->
    <view class="example-section">
      <view class="section-title">间距大小</view>
      <view class="section-desc">使用预设大小或自定义数值</view>
      
      <view class="size-controls">
        <view class="control-group">
          <text class="control-label">预设大小:</text>
          <button 
            v-for="size in presetSizes" 
            :key="size.value"
            :class="['control-btn small', { active: currentSize === size.value }]"
            @click="currentSize = size.value; useCustomSize = false"
          >
            {{ size.label }}
          </button>
        </view>
        
        <view class="control-group">
          <text class="control-label">自定义: {{ customSize }}px</text>
          <slider 
            :value="customSize" 
            min="0" 
            max="50" 
            @change="handleCustomSizeChange"
          />
          <button 
            :class="['control-btn small', { active: useCustomSize }]"
            @click="useCustomSize = true"
          >
            使用自定义
          </button>
        </view>
      </view>
      
      <view class="example-demo">
        <zx-space :size="useCustomSize ? customSize : currentSize">
          <view class="demo-item">A</view>
          <view class="demo-item">B</view>
          <view class="demo-item">C</view>
          <view class="demo-item">D</view>
        </zx-space>
      </view>
    </view>

    <!-- 自动换行 -->
    <view class="example-section">
      <view class="section-title">自动换行</view>
      <view class="section-desc">在水平模式下控制元素是否换行</view>
      
      <view class="wrap-controls">
        <switch :checked="enableWrap" @change="handleWrapChange" />
        <text class="control-label">启用自动换行</text>
      </view>
      
      <view class="example-demo wrap-demo">
        <zx-space :wrap="enableWrap">
          <view 
            v-for="i in 12" 
            :key="i" 
            class="demo-item small"
          >
            {{ i }}
          </view>
        </zx-space>
      </view>
    </view>

    <!-- 分隔符 -->
    <view class="example-section">
      <view class="section-title">分隔符</view>
      <view class="section-desc">在元素之间添加分隔符</view>
      
      <view class="spacer-controls">
        <button 
          v-for="spacer in spacerOptions" 
          :key="spacer.value"
          :class="['control-btn small', { active: currentSpacer === spacer.value }]"
          @click="currentSpacer = spacer.value"
        >
          {{ spacer.label }}
        </button>
      </view>
      
      <view class="example-demo">
        <zx-space :spacer="currentSpacer">
          <text class="nav-item">首页</text>
          <text class="nav-item">产品</text>
          <text class="nav-item">服务</text>
          <text class="nav-item">关于</text>
        </zx-space>
      </view>
    </view>

    <!-- 对齐方式 -->
    <view class="example-section">
      <view class="section-title">对齐方式</view>
      <view class="section-desc">控制元素在交叉轴上的对齐</view>
      
      <view class="alignment-controls">
        <picker 
          :value="alignmentIndex" 
          :range="alignmentOptions"
          range-key="label"
          @change="handleAlignmentChange"
        >
          <view class="picker-text">{{ alignmentOptions[alignmentIndex].label }}</view>
        </picker>
      </view>
      
      <view class="example-demo alignment-demo">
        <zx-space :alignment="currentAlignment">
          <text class="demo-text">文本</text>
          <view class="demo-item large">大元素</view>
          <view class="demo-item">普通元素</view>
          <view class="demo-item small">小元素</view>
        </zx-space>
      </view>
    </view>

    <!-- 填充容器 -->
    <view class="example-section">
      <view class="section-title">填充容器</view>
      <view class="section-desc">让子元素填充整个容器宽度</view>
      
      <view class="fill-controls">
        <switch :checked="enableFill" @change="handleFillChange" />
        <text class="control-label">启用填充</text>
        
        <view v-if="enableFill" class="fill-ratio-control">
          <text class="control-label">填充比例: {{ fillRatio }}%</text>
          <slider 
            :value="fillRatio" 
            min="20" 
            max="100" 
            @change="handleFillRatioChange"
          />
        </view>
      </view>
      
      <view class="example-demo fill-demo">
        <zx-space :fill="enableFill" :fill-ratio="fillRatio">
          <view class="demo-card">卡片 1</view>
          <view class="demo-card">卡片 2</view>
          <view class="demo-card">卡片 3</view>
        </zx-space>
      </view>
    </view>

    <!-- 综合示例 -->
    <view class="example-section">
      <view class="section-title">综合示例</view>
      <view class="section-desc">实际应用场景演示</view>
      
      <!-- 导航栏示例 -->
      <view class="use-case">
        <text class="use-case-title">导航栏</text>
        <view class="nav-example">
          <zx-space spacer="|" alignment="center">
            <text class="nav-link">首页</text>
            <text class="nav-link">产品中心</text>
            <text class="nav-link">解决方案</text>
            <text class="nav-link">关于我们</text>
          </zx-space>
        </view>
      </view>
      
      <!-- 按钮组示例 -->
      <view class="use-case">
        <text class="use-case-title">按钮组</text>
        <view class="button-group-example">
          <zx-space size="large">
            <button class="action-btn primary">确认</button>
            <button class="action-btn">取消</button>
            <button class="action-btn danger">删除</button>
          </zx-space>
        </view>
      </view>
      
      <!-- 标签组示例 -->
      <view class="use-case">
        <text class="use-case-title">标签组</text>
        <view class="tag-example">
          <zx-space size="small" wrap>
            <view v-for="tag in tags" :key="tag" class="tag">{{ tag }}</view>
          </zx-space>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({
  name: 'ZxSpaceDemo'
})

// 方向控制
const currentDirection = ref('horizontal')
const directions = [
  { value: 'horizontal', label: '水平' },
  { value: 'vertical', label: '垂直' }
]

// 大小控制
const currentSize = ref('default')
const customSize = ref(20)
const useCustomSize = ref(false)
const presetSizes = [
  { value: 'small', label: '小' },
  { value: 'default', label: '中' },
  { value: 'large', label: '大' }
]

// 换行控制
const enableWrap = ref(false)

// 分隔符
const currentSpacer = ref('')
const spacerOptions = [
  { value: '', label: '无' },
  { value: '|', label: '管道符' },
  { value: '•', label: '圆点' },
  { value: '→', label: '箭头' },
  { value: '/', label: '斜杠' }
]

// 对齐方式
const alignmentIndex = ref(1)
const alignmentOptions = [
  { value: 'start', label: '开始对齐' },
  { value: 'center', label: '居中对齐' },
  { value: 'end', label: '结束对齐' },
  { value: 'baseline', label: '基线对齐' },
  { value: 'stretch', label: '拉伸对齐' }
]

const currentAlignment = computed(() => alignmentOptions.value[alignmentIndex.value].value)

// 填充控制
const enableFill = ref(false)
const fillRatio = ref(100)

// 综合示例数据
const tags = ['Vue', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'React', 'TypeScript', 'Webpack']

// 事件处理
const handleCustomSizeChange = (e) => {
  customSize.value = e.detail.value
}

const handleWrapChange = (e) => {
  enableWrap.value = e.detail.value
}

const handleAlignmentChange = (e) => {
  alignmentIndex.value = e.detail.value
}

const handleFillChange = (e) => {
  enableFill.value = e.detail.value
}

const handleFillRatioChange = (e) => {
  fillRatio.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.space-demo {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
  
  .demo-title {
    display: block;
    font-size: 32px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
  }
  
  .demo-subtitle {
    display: block;
    font-size: 16px;
    color: #7f8c8d;
  }
}

.example-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .section-title {
    display: block;
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
  }
  
  .section-desc {
    display: block;
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 20px;
  }
}

.example-demo {
  background: #f8f9fa;
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
  
  &.wrap-demo {
    max-width: 300px;
  }
  
  &.alignment-demo {
    height: 80px;
    display: flex;
    align-items: center;
  }
  
  &.fill-demo {
    width: 100%;
  }
}

.demo-item {
  background: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  
  &.small {
    padding: 4px 8px;
    font-size: 12px;
  }
  
  &.large {
    padding: 16px 24px;
    font-size: 16px;
  }
  
  &.primary {
    background: #3498db;
  }
  
  &.success {
    background: #27ae60;
  }
  
  &.warning {
    background: #f39c12;
  }
}

.demo-text {
  color: #2c3e50;
  font-size: 14px;
}

.demo-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  color: #2c3e50;
  flex: 1;
  min-width: 0;
}

// 控制组件样式
.direction-controls,
.size-controls,
.wrap-controls,
.spacer-controls,
.alignment-controls,
.fill-controls {
  margin-bottom: 16px;
}

.control-group {
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.control-label {
  display: inline-block;
  font-size: 14px;
  color: #2c3e50;
  margin-right: 12px;
  margin-bottom: 8px;
  font-weight: 500;
}

.control-btn {
  background: #ecf0f1;
  border: 1px solid #bdc3c7;
  color: #2c3e50;
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  
  &.small {
    padding: 4px 8px;
    font-size: 12px;
  }
  
  &.active {
    background: #3498db;
    border-color: #3498db;
    color: white;
  }
}

.wrap-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fill-ratio-control {
  margin-top: 12px;
  
  slider {
    margin: 8px 0;
  }
}

.picker-text {
  background: #ecf0f1;
  border: 1px solid #bdc3c7;
  padding: 6px 12px;
  border-radius: 6px;
  color: #2c3e50;
  font-size: 14px;
  display: inline-block;
}

.code-example {
  background: #2c3e50;
  border-radius: 6px;
  padding: 16px;
  margin-top: 16px;
  
  .code-title {
    display: block;
    color: #3498db;
    font-size: 12px;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  .code-text {
    display: block;
    color: #ecf0f1;
    font-size: 12px;
    font-family: 'Courier New', monospace;
    white-space: pre-line;
  }
}

// 综合示例样式
.use-case {
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .use-case-title {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 12px;
  }
}

.nav-example {
  background: #34495e;
  padding: 12px 20px;
  border-radius: 6px;
}

.nav-link {
  color: white;
  font-size: 14px;
  
  &:hover {
    color: #3498db;
  }
}

.nav-item {
  color: #2c3e50;
  font-size: 14px;
}

.button-group-example {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.action-btn {
  background: #ecf0f1;
  border: 1px solid #bdc3c7;
  color: #2c3e50;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  
  &.primary {
    background: #3498db;
    border-color: #3498db;
    color: white;
  }
  
  &.danger {
    background: #e74c3c;
    border-color: #e74c3c;
    color: white;
  }
}

.tag-example {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.tag {
  background: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

// 响应式设计
@media (max-width: 768px) {
  .space-demo {
    padding: 12px;
  }
  
  .example-section {
    padding: 16px;
  }
  
  .demo-header .demo-title {
    font-size: 24px;
  }
  
  .control-btn {
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
</style> 