<template>
  <view class="prompts-demo">
    <!-- 页面标题 -->
    <zx-navbar title="AI Prompts 示例" back-icon="left" />
    
    <!-- 内容区域 -->
    <view class="demo-content">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="section-title">基础用法</view>
        <zx-ai-prompts 
          title="💡 你可能想问："
          :items="basicItems"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 垂直布局 -->
      <view class="demo-section">
        <view class="section-title">垂直布局</view>
        <zx-ai-prompts 
          title="🤔 你可能还想问："
          :items="verticalItems"
          :vertical="true"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 可换行布局 -->
      <view class="demo-section">
        <view class="section-title">可换行布局</view>
        <zx-ai-prompts 
          title="🔥 热门话题："
          :items="wrapItems"
          :wrap="true"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 嵌套组合 -->
      <view class="demo-section">
        <view class="section-title">嵌套组合</view>
        <zx-ai-prompts 
          title="📚 分类推荐："
          :items="nestedItems"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 禁用状态 -->
      <view class="demo-section">
        <view class="section-title">禁用状态</view>
        <zx-ai-prompts 
          title="☕️ 休息时间！"
          :items="disabledItems"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 自定义样式 -->
      <view class="demo-section">
        <view class="section-title">自定义样式</view>
        <zx-ai-prompts 
          title="🎨 自定义风格："
          :items="customItems"
          :styles="customStyles"
          :class-names="customClassNames"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 使用插槽 -->
      <view class="demo-section">
        <view class="section-title">使用插槽</view>
        <zx-ai-prompts 
          :items="slotItems"
          @item-click="handleItemClick"
        >
          <template #title>
            <view class="custom-title">
              <text class="title-icon">🚀</text>
              <text class="title-text">自定义标题插槽</text>
            </view>
          </template>
        </zx-ai-prompts>
      </view>
    </view>
    
    <!-- 点击结果显示 -->
    <zx-popup v-model:show="showResult" mode="center" border-radius="12">
      <view class="result-popup">
        <view class="result-title">点击结果</view>
        <view class="result-content">
          <text>{{ clickResult }}</text>
        </view>
        <view class="result-actions">
          <zx-button type="primary" size="small" @click="showResult = false">
            确定
          </zx-button>
        </view>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref, h } from 'vue'

// 页面状态
const showResult = ref(false)
const clickResult = ref('')

// 基础示例数据
const basicItems = ref([
  {
    key: '1',
    icon: '💡',
    label: '激发创意',
    description: '有什么新项目的灵感吗？'
  },
  {
    key: '2', 
    icon: 'ℹ️',
    label: '了解背景',
    description: '帮我了解这个话题的背景。'
  },
  {
    key: '3',
    icon: '🚀',
    label: '效率提升',
    description: '如何更快更好地工作？'
  },
  {
    key: '4',
    icon: '😊',
    label: '讲个笑话',
    description: '为什么蚂蚁不会生病？因为它们有小小的抗体！'
  }
])

// 垂直布局示例数据
const verticalItems = ref([
  {
    key: '5',
    icon: '☕',
    description: '长时间工作后如何有效休息？'
  },
  {
    key: '6',
    icon: '😄',
    description: '保持积极心态的秘诀是什么？'
  },
  {
    key: '7',
    icon: '🔥',
    description: '如何在巨大压力下保持冷静？'
  }
])

// 可换行布局示例数据
const wrapItems = ref([
  {
    key: '8',
    icon: '🤖',
    label: 'AI 技术',
    description: 'AI 的最新发展'
  },
  {
    key: '9',
    icon: '📱',
    label: '移动开发',
    description: 'uni-app 开发技巧'
  },
  {
    key: '10',
    icon: '🎨',
    label: 'UI 设计',
    description: '现代界面设计趋势'
  },
  {
    key: '11',
    icon: '⚡',
    label: '性能优化',
    description: '应用性能提升方法'
  },
  {
    key: '12',
    icon: '🔒',
    label: '安全防护',
    description: '应用安全最佳实践'
  }
])

// 嵌套组合示例数据
const nestedItems = ref([
  {
    key: '13',
    icon: '🔥',
    label: '热门话题',
    description: '你感兴趣什么？',
    children: [
      {
        key: '13-1',
        description: 'X 平台有什么新功能？'
      },
      {
        key: '13-2', 
        description: '什么是 AGI？'
      },
      {
        key: '13-3',
        description: '文档在哪里？'
      }
    ]
  },
  {
    key: '14',
    icon: '📖',
    label: '设计指南',
    description: '如何设计好产品？',
    children: [
      {
        key: '14-1',
        icon: '❤️',
        description: '了解用户需求'
      },
      {
        key: '14-2',
        icon: '😊',
        description: '设置 AI 角色'
      },
      {
        key: '14-3',
        icon: '🎯',
        description: '明确设计目标'
      }
    ]
  }
])

// 禁用状态示例数据
const disabledItems = ref([
  {
    key: '15',
    icon: '✅',
    label: '任务完成秘诀',
    description: '完成任务有什么技巧？',
    disabled: true
  },
  {
    key: '16',
    icon: '☕',
    label: '咖啡时间',
    description: '长时间工作后如何有效休息？'
  }
])

// 自定义样式示例数据
const customItems = ref([
  {
    key: '17',
    icon: '🎨',
    label: '自定义风格',
    description: '这是自定义样式的示例'
  },
  {
    key: '18',
    icon: '🌈',
    label: '彩色主题',
    description: '支持多种颜色主题'
  }
])

// 插槽示例数据
const slotItems = ref([
  {
    key: '19',
    icon: '🚀',
    label: '插槽示例',
    description: '这是使用插槽的示例'
  }
])

// 自定义样式
const customStyles = ref({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '16px',
    borderRadius: '12px'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold'
  },
  item: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)'
  }
})

// 自定义类名
const customClassNames = ref({
  root: 'custom-prompts',
  item: 'custom-item'
})

// 处理项目点击
const handleItemClick = (event) => {
  const { data, parent } = event
  let result = `点击了: ${data.label || data.description}`
  
  if (parent) {
    result += `\n父级: ${parent.label || parent.description}`
  }
  
  if (data.disabled) {
    result += '\n状态: 已禁用'
    return
  }
  
  clickResult.value = result
  showResult.value = true
  
  console.log('Prompts item clicked:', event)
}
</script>

<style lang="scss" scoped>
.prompts-demo {
  min-height: 100vh;
  background: #f5f5f5;
}

.demo-content {
  padding: 16px;
}

.demo-section {
  margin-bottom: 24px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 18px;
}

.title-text {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.result-popup {
  padding: 24px;
  text-align: center;
  min-width: 280px;
}

.result-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.result-content {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 20px;
  white-space: pre-line;
}

.result-actions {
  display: flex;
  justify-content: center;
}

// 自定义样式类
:deep(.custom-prompts) {
  .custom-item {
    border: 2px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.6);
      transform: translateY(-2px);
    }
  }
}
</style>