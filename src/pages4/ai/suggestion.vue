<template>
  <view class="suggestion-demo">
    <zx-navbar title="AI 建议组件" back></zx-navbar>
    
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-desc">点击输入框或输入 "/" 触发建议面板</view>
      
      <zx-ai-suggestion
        :items="basicSuggestions"
        @select="handleBasicSelect"
      >
        <template #default="{ onTrigger, onKeyDown }">
          <textarea
            v-model="basicValue"
            class="basic-input"
            placeholder="输入 / 获取建议"
            @input="handleBasicInput"
            @keydown="onKeyDown"
            @focus="() => { if (basicValue.endsWith('/')) onTrigger() }"
          />
        </template>
      </zx-ai-suggestion>
      
      <view class="demo-result">
        <text>当前值: {{ basicValue }}</text>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">整行宽度</view>
      <view class="demo-desc">使用 block 属性让组件占满整行</view>
      
      <zx-ai-suggestion
        :items="blockSuggestions"
        :block="true"
        @select="handleBlockSelect"
      >
        <template #default="{ onTrigger }">
          <view 
            class="custom-trigger custom-trigger--block"
            @click="onTrigger"
          >
            <text class="trigger-text">{{ blockValue || '点击获取建议' }}</text>
            <text class="trigger-icon">▼</text>
          </view>
        </template>
      </zx-ai-suggestion>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">多层级建议</view>
      <view class="demo-desc">支持嵌套的建议项，可以逐级选择</view>
      
      <zx-ai-suggestion
        :items="nestedSuggestions"
        @select="handleNestedSelect"
      >
        <template #default="{ onTrigger }">
          <view 
            class="custom-trigger"
            @click="onTrigger"
          >
            <text class="trigger-text">{{ nestedValue || '选择编程语言' }}</text>
            <text class="trigger-icon">🔽</text>
          </view>
        </template>
      </zx-ai-suggestion>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">动态建议</view>
      <view class="demo-desc">根据输入内容动态生成建议项</view>
      
      <zx-ai-suggestion
        :items="getDynamicSuggestions"
        @select="handleDynamicSelect"
      >
        <template #default="{ onTrigger, onKeyDown }">
          <input 
            v-model="dynamicValue"
            class="dynamic-input"
            placeholder="输入关键词获取建议"
            @input="handleDynamicInput"
            @focus="onTrigger"
            @keydown="onKeyDown"
          />
        </template>
      </zx-ai-suggestion>
      
      <view class="demo-result">
        <text>搜索关键词: {{ searchKeyword }}</text>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">自定义样式</view>
      <view class="demo-desc">自定义触发器和建议项的样式</view>
      
      <zx-ai-suggestion
        :items="customSuggestions"
        custom-class="custom-suggestion"
        @select="handleCustomSelect"
      >
        <template #default="{ onTrigger }">
          <view 
            class="custom-trigger custom-trigger--styled"
            @click="onTrigger"
          >
            <text class="trigger-emoji">🎨</text>
            <text class="trigger-text">{{ customValue || '选择主题色彩' }}</text>
            <text class="trigger-arrow">→</text>
          </view>
        </template>
      </zx-ai-suggestion>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">受控模式</view>
      <view class="demo-desc">通过 open 属性控制面板的显示状态</view>
      
      <view class="controlled-buttons">
        <button 
          class="control-btn"
          @click="controlledOpen = true"
        >
          打开面板
        </button>
        <button 
          class="control-btn"
          @click="controlledOpen = false"
        >
          关闭面板
        </button>
      </view>
      
      <zx-ai-suggestion
        :items="controlledSuggestions"
        :open="controlledOpen"
        @open-change="handleControlledOpenChange"
        @select="handleControlledSelect"
      >
        <template #default="{ onTrigger }">
          <view 
            class="custom-trigger"
            @click="onTrigger"
          >
            <text class="trigger-text">{{ controlledValue || '受控模式示例' }}</text>
            <text class="trigger-status">{{ controlledOpen ? '已打开' : '已关闭' }}</text>
          </view>
        </template>
      </zx-ai-suggestion>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
// 引入组件
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import zxAiSuggestion from '@tanzhenxing/zx-ai-suggestion/zx-ai-suggestion.vue'

// 基础用法
const basicValue = ref('')
const basicSuggestions = [
  { label: '写一份报告', value: 'report', icon: '📝' },
  { label: '画一幅图', value: 'draw', icon: '🎨' },
  { label: '查询知识', value: 'knowledge', icon: '🔍' },
  { label: '翻译文本', value: 'translate', icon: '🌐' },
  { label: '代码生成', value: 'code', icon: '💻' }
]

const handleBasicInput = (event) => {
  const value = event.detail ? event.detail.value : event.target.value
  basicValue.value = value
  // 当输入 "/" 时可以自动触发建议
  console.log('输入值:', value)
}

const handleBasicSelect = (value) => {
  basicValue.value = `[${value}]: `
  console.log('基础选择:', value)
}

// 整行宽度
const blockValue = ref('')
const blockSuggestions = [
  { 
    label: '创建新项目', 
    value: 'new-project', 
    icon: '🆕',
    extra: 'Ctrl+N'
  },
  { 
    label: '打开文件', 
    value: 'open-file', 
    icon: '📁',
    extra: 'Ctrl+O'
  },
  { 
    label: '保存文档', 
    value: 'save-doc', 
    icon: '💾',
    extra: 'Ctrl+S'
  },
  { 
    label: '导出PDF', 
    value: 'export-pdf', 
    icon: '📄',
    extra: 'Ctrl+E'
  }
]

const handleBlockSelect = (value) => {
  const item = blockSuggestions.find(item => item.value === value)
  blockValue.value = item ? item.label : value
  console.log('整行选择:', value)
}

// 多层级建议
const nestedValue = ref('')
const nestedSuggestions = [
  {
    label: 'JavaScript',
    value: 'javascript',
    icon: '🟨',
    children: [
      { label: 'Vue.js', value: 'vue', icon: '💚' },
      { label: 'React', value: 'react', icon: '⚛️' },
      { label: 'Angular', value: 'angular', icon: '🔴' },
      { label: 'Node.js', value: 'nodejs', icon: '🟢' }
    ]
  },
  {
    label: 'Python',
    value: 'python',
    icon: '🐍',
    children: [
      { label: 'Django', value: 'django', icon: '🎸' },
      { label: 'Flask', value: 'flask', icon: '🌶️' },
      { label: 'FastAPI', value: 'fastapi', icon: '⚡' },
      { label: 'Pandas', value: 'pandas', icon: '🐼' }
    ]
  },
  {
    label: 'Java',
    value: 'java',
    icon: '☕',
    children: [
      { label: 'Spring Boot', value: 'springboot', icon: '🍃' },
      { label: 'Spring MVC', value: 'springmvc', icon: '🌱' },
      { label: 'Hibernate', value: 'hibernate', icon: '💤' }
    ]
  }
]

const handleNestedSelect = (value) => {
  // 查找选中项的标签
  const findLabel = (items, targetValue) => {
    for (const item of items) {
      if (item.value === targetValue) {
        return item.label
      }
      if (item.children) {
        const childLabel = findLabel(item.children, targetValue)
        if (childLabel) return childLabel
      }
    }
    return targetValue
  }
  
  nestedValue.value = findLabel(nestedSuggestions, value)
  console.log('嵌套选择:', value)
}

// 动态建议
const dynamicValue = ref('')
const searchKeyword = ref('')

const getDynamicSuggestions = (info) => {
  const keyword = dynamicValue.value.toLowerCase()
  
  const allSuggestions = [
    { label: '搜索用户', value: 'search-users', icon: '👥' },
    { label: '搜索文档', value: 'search-docs', icon: '📚' },
    { label: '搜索图片', value: 'search-images', icon: '🖼️' },
    { label: '搜索视频', value: 'search-videos', icon: '🎬' },
    { label: '搜索音乐', value: 'search-music', icon: '🎵' },
    { label: '搜索代码', value: 'search-code', icon: '💻' },
    { label: '搜索新闻', value: 'search-news', icon: '📰' },
    { label: '搜索商品', value: 'search-products', icon: '🛍️' }
  ]
  
  if (!keyword) return allSuggestions
  
  return allSuggestions.filter(item => 
    item.label.toLowerCase().includes(keyword) ||
    item.value.toLowerCase().includes(keyword)
  )
}

const handleDynamicInput = (event) => {
  const value = event.detail ? event.detail.value : event.target.value
  dynamicValue.value = value
  searchKeyword.value = value
}

const handleDynamicSelect = (value) => {
  console.log('动态选择:', value)
  searchKeyword.value = value
}

// 自定义样式
const customValue = ref('')
const customSuggestions = [
  { label: '科技蓝', value: 'tech-blue', icon: '🔵', extra: '#1890ff' },
  { label: '成功绿', value: 'success-green', icon: '🟢', extra: '#52c41a' },
  { label: '警告橙', value: 'warning-orange', icon: '🟠', extra: '#fa8c16' },
  { label: '错误红', value: 'error-red', icon: '🔴', extra: '#ff4d4f' },
  { label: '优雅紫', value: 'elegant-purple', icon: '🟣', extra: '#722ed1' }
]

const handleCustomSelect = (value) => {
  const item = customSuggestions.find(item => item.value === value)
  customValue.value = item ? item.label : value
  console.log('自定义选择:', value)
}

// 受控模式
const controlledOpen = ref(false)
const controlledValue = ref('')
const controlledSuggestions = [
  { label: '选项一', value: 'option1', icon: '1️⃣' },
  { label: '选项二', value: 'option2', icon: '2️⃣' },
  { label: '选项三', value: 'option3', icon: '3️⃣' }
]

const handleControlledOpenChange = (open) => {
  controlledOpen.value = open
  console.log('受控状态变化:', open)
}

const handleControlledSelect = (value) => {
  const item = controlledSuggestions.find(item => item.value === value)
  controlledValue.value = item ? item.label : value
  controlledOpen.value = false
  console.log('受控选择:', value)
}
</script>

<style lang="scss" scoped>
.suggestion-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.demo-section {
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.demo-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.demo-result {
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
}

.custom-trigger {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.2);
  }
  
  &--block {
    width: 100%;
    justify-content: space-between;
  }
  
  &--styled {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: #fff;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  }
}

.trigger-text {
  flex: 1;
  font-size: 14px;
  color: inherit;
}

.trigger-icon {
  margin-left: 8px;
  font-size: 12px;
  color: #999;
  transition: transform 0.2s;
}

.trigger-emoji {
  margin-right: 8px;
  font-size: 16px;
}

.trigger-arrow {
  margin-left: 8px;
  font-size: 14px;
  opacity: 0.8;
}

.trigger-status {
  margin-left: 8px;
  font-size: 12px;
  padding: 2px 6px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.basic-input,
.dynamic-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  resize: none;
  min-height: 40px;
  
  &:focus {
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.2);
  }
}

.controlled-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.control-btn {
  padding: 8px 16px;
  background-color: #4096ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1677ff;
  }
  
  &:active {
    background-color: #0958d9;
  }
}

// 自定义建议组件样式
:deep(.custom-suggestion) {
  .zx-ai-suggestion__panel {
    border: 2px solid #667eea;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .zx-ai-suggestion__item {
    &:hover {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      color: #fff;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-section {
    margin: 8px;
    padding: 12px;
  }
  
  .demo-title {
    font-size: 16px;
  }
  
  .custom-trigger {
    padding: 14px 16px;
  }
  
  .trigger-text {
    font-size: 16px;
  }
  
  .dynamic-input {
    padding: 14px 16px;
    font-size: 16px;
  }
}
</style>