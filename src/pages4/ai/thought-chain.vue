<template>
  <view class="page">
    <view class="page-header">
      <text class="page-title">ZxAiThoughtChain 思维链</text>
      <text class="page-desc">用于可视化和追踪 AI Agent 对 Actions 和 Tools 的调用链</text>
    </view>
    
    <scroll-view class="page-content" scroll-y>
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-title">基础用法</view>
        <view class="demo-desc">最简单的思维链展示</view>
        <view class="demo-content">
          <zx-ai-thought-chain :items="basicItems" />
        </view>
      </view>
      
      <!-- 不同尺寸 -->
      <view class="demo-section">
        <view class="demo-title">不同尺寸</view>
        <view class="demo-desc">提供 large、middle、small 三种尺寸</view>
        <view class="demo-content">
          <view class="size-demo">
            <text class="size-label">Large:</text>
            <zx-ai-thought-chain :items="sizeItems" size="large" />
          </view>
          <view class="size-demo">
            <text class="size-label">Middle:</text>
            <zx-ai-thought-chain :items="sizeItems" size="middle" />
          </view>
          <view class="size-demo">
            <text class="size-label">Small:</text>
            <zx-ai-thought-chain :items="sizeItems" size="small" />
          </view>
        </view>
      </view>
      
      <!-- 节点状态 -->
      <view class="demo-section">
        <view class="demo-title">节点状态</view>
        <view class="demo-desc">支持 pending、success、error 三种状态</view>
        <view class="demo-content">
          <zx-ai-thought-chain :items="statusItems" />
        </view>
      </view>
      
      <!-- 可折叠内容 -->
      <view class="demo-section">
        <view class="demo-title">可折叠内容</view>
        <view class="demo-desc">点击节点可展开/收起详细内容</view>
        <view class="demo-content">
          <zx-ai-thought-chain 
            :items="collapsibleItems" 
            :collapsible="true"
            @itemExpand="onItemExpand"
          />
        </view>
      </view>
      
      <!-- 受控模式 -->
      <view class="demo-section">
        <view class="demo-title">受控模式</view>
        <view class="demo-desc">通过 expandedKeys 控制展开状态</view>
        <view class="demo-content">
          <view class="control-buttons">
            <button class="control-btn" @click="expandAll">展开全部</button>
            <button class="control-btn" @click="collapseAll">收起全部</button>
            <button class="control-btn" @click="toggleFirst">切换第一个</button>
          </view>
          <zx-ai-thought-chain 
            ref="thoughtChainRef"
            :items="controlledItems" 
            :collapsible="collapsibleConfig"
          />
        </view>
      </view>
      
      <!-- 自定义内容 -->
      <view class="demo-section">
        <view class="demo-title">自定义内容</view>
        <view class="demo-desc">支持自定义图标、额外内容和脚注</view>
        <view class="demo-content">
          <zx-ai-thought-chain :items="customItems" />
        </view>
      </view>
      
      <!-- 实际应用场景 -->
      <view class="demo-section">
        <view class="demo-title">AI 对话场景</view>
        <view class="demo-desc">模拟 AI 助手的思维推理过程</view>
        <view class="demo-content">
          <view class="scenario-buttons">
            <button class="scenario-btn" @click="startAIThinking">开始 AI 思考</button>
            <button class="scenario-btn" @click="resetAIThinking">重置</button>
          </view>
          <zx-ai-thought-chain :items="aiScenarioItems" :collapsible="true" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import ZxAiThoughtChain from '@/components/zx-ai-thought-chain/zx-ai-thought-chain.vue'

// 基础示例数据
const basicItems = ref([
  {
    title: '思维链节点标题',
    description: '这是一个基础的思维链节点描述'
  },
  {
    title: '思维链节点标题',
    description: '这是另一个思维链节点描述'
  },
  {
    title: '思维链节点标题',
    description: '最后一个思维链节点描述'
  }
])

// 尺寸示例数据
const sizeItems = ref([
  {
    title: '步骤一',
    description: '第一个步骤'
  },
  {
    title: '步骤二', 
    description: '第二个步骤'
  }
])

// 状态示例数据
const statusItems = ref([
  {
    key: 'success',
    title: '已完成的步骤',
    description: '这个步骤已经成功完成',
    status: 'success'
  },
  {
    key: 'pending',
    title: '进行中的步骤',
    description: '这个步骤正在执行中',
    status: 'pending'
  },
  {
    key: 'error',
    title: '失败的步骤',
    description: '这个步骤执行失败',
    status: 'error'
  }
])

// 可折叠示例数据
const collapsibleItems = ref([
  {
    key: 'analyze',
    title: '分析用户问题',
    description: '深入理解用户的具体需求和问题背景',
    content: '通过自然语言处理技术，我分析了用户的问题，识别出关键词和意图。用户想要了解思维链组件的使用方法，这是一个技术咨询类问题。',
    status: 'success'
  },
  {
    key: 'search',
    title: '搜索相关信息',
    description: '从知识库中检索相关的技术文档和示例',
    content: '我搜索了组件库文档、API 参考和最佳实践案例，找到了相关的代码示例和使用指南。',
    status: 'success'
  },
  {
    key: 'generate',
    title: '生成解决方案',
    description: '基于检索结果生成完整的回答',
    content: '正在整合搜索到的信息，生成结构化的回答，包括代码示例、最佳实践和注意事项。',
    status: 'pending'
  }
])

// 受控模式相关
const thoughtChainRef = ref()
const expandedKeys = ref(['controlled-1'])

const collapsibleConfig = computed(() => ({
  expandedKeys: expandedKeys.value
}))

const controlledItems = ref([
  {
    key: 'controlled-1',
    title: '受控节点一',
    description: '这是一个受控的可折叠节点',
    content: '这个节点的展开状态由外部控制'
  },
  {
    key: 'controlled-2',
    title: '受控节点二',
    description: '另一个受控的可折叠节点',
    content: '可以通过按钮控制展开和收起'
  },
  {
    key: 'controlled-3',
    title: '受控节点三',
    description: '第三个受控节点',
    content: '支持批量操作和单独控制'
  }
])

// 自定义内容示例
const customItems = ref([
  {
    icon: '🤔',
    title: '思考阶段',
    description: 'AI 正在思考如何回答用户问题',
    extra: '2分钟前',
    content: '分析用户问题的语义和上下文，确定最佳的回答策略。',
    footer: '耗时: 1.2s',
    status: 'success'
  },
  {
    icon: '🔍',
    title: '搜索阶段',
    description: '在知识库中搜索相关信息',
    extra: '1分钟前',
    content: '使用向量搜索技术在文档库中查找最相关的内容片段。',
    footer: '耗时: 0.8s',
    status: 'success'
  },
  {
    icon: '✨',
    title: '生成阶段',
    description: '基于搜索结果生成回答',
    extra: '刚刚',
    content: '整合搜索到的信息，生成结构化和个性化的回答。',
    footer: '耗时: 2.1s',
    status: 'pending'
  }
])

// AI 场景示例
const aiScenarioItems = ref([
  {
    key: 'ai-1',
    title: '接收用户问题',
    description: '"如何使用思维链组件？"',
    status: 'success'
  }
])

// 事件处理
const onItemExpand = (data) => {
  console.log('节点展开状态变化:', data)
  uni.showToast({
    title: `${data.item.title} ${data.expanded ? '展开' : '收起'}`,
    icon: 'none'
  })
}

// 受控模式方法
const expandAll = () => {
  expandedKeys.value = controlledItems.value.map(item => item.key)
}

const collapseAll = () => {
  expandedKeys.value = []
}

const toggleFirst = () => {
  const firstKey = controlledItems.value[0].key
  const index = expandedKeys.value.indexOf(firstKey)
  if (index > -1) {
    expandedKeys.value.splice(index, 1)
  } else {
    expandedKeys.value.push(firstKey)
  }
}

// AI 场景模拟
let aiTimer = null

const startAIThinking = () => {
  resetAIThinking()
  
  const steps = [
    {
      key: 'ai-2',
      title: '理解问题意图',
      description: '分析用户问题的语义和意图',
      content: '通过 NLP 技术分析用户问题，识别出这是关于组件使用的技术咨询。',
      status: 'pending'
    },
    {
      key: 'ai-3', 
      title: '检索相关文档',
      description: '在知识库中搜索相关信息',
      content: '使用语义搜索在组件文档库中查找相关的 API 文档和使用示例。',
      status: 'pending'
    },
    {
      key: 'ai-4',
      title: '生成回答',
      description: '整合信息生成完整回答',
      content: '基于检索到的文档，生成包含代码示例和最佳实践的详细回答。',
      status: 'pending'
    },
    {
      key: 'ai-5',
      title: '回答优化',
      description: '优化回答的结构和表达',
      content: '调整回答的结构，确保逻辑清晰、易于理解，并添加相关的注意事项。',
      status: 'pending'
    }
  ]
  
  let currentStep = 0
  
  const addStep = () => {
    if (currentStep < steps.length) {
      aiScenarioItems.value.push(steps[currentStep])
      currentStep++
      
      // 1秒后将当前步骤标记为成功，并添加下一步
      aiTimer = setTimeout(() => {
        if (aiScenarioItems.value.length > 1) {
          aiScenarioItems.value[aiScenarioItems.value.length - 1].status = 'success'
        }
        addStep()
      }, 1500)
    } else {
      // 所有步骤完成
      if (aiScenarioItems.value.length > 1) {
        aiScenarioItems.value[aiScenarioItems.value.length - 1].status = 'success'
      }
    }
  }
  
  addStep()
}

const resetAIThinking = () => {
  if (aiTimer) {
    clearTimeout(aiTimer)
    aiTimer = null
  }
  aiScenarioItems.value = [
    {
      key: 'ai-1',
      title: '接收用户问题',
      description: '"如何使用思维链组件？"',
      status: 'success'
    }
  ]
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.page-header {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  display: block;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: #8c8c8c;
  line-height: 1.5;
}

.page-content {
  flex: 1;
  padding: 20px;
}

.demo-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 8px;
}

.demo-desc {
  font-size: 14px;
  color: #8c8c8c;
  line-height: 1.5;
  margin-bottom: 16px;
}

.demo-content {
  // 内容区域样式
}

.size-demo {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.size-label {
  font-size: 14px;
  font-weight: 500;
  color: #595959;
  display: block;
  margin-bottom: 12px;
}

.control-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 8px 16px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:active {
    background-color: #096dd9;
  }
}

.scenario-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 8px 16px;
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:active {
    background-color: #389e0d;
  }
  
  &:nth-child(2) {
    background-color: #faad14;
    
    &:active {
      background-color: #d48806;
    }
  }
}
</style>