<template>
  <view :class="mergedCls" :style="mergedStyle">
    <!-- 标题 -->
    <view v-if="title || $slots.title" :class="titleCls" :style="titleStyle">
      <slot name="title">
        {{ title }}
      </slot>
    </view>
    
    <!-- 提示列表 -->
    <view :class="listCls" :style="listStyle">
      <template v-for="(item, index) in items" :key="item.key">
        <!-- 普通提示项 -->
        <view 
          v-if="!item.children || item.children.length === 0"
          :class="getItemCls(item)"
          :style="itemStyle"
          @click="handleItemClick(item)"
        >
          <view :class="itemContentCls" :style="itemContentStyle">
            <!-- 图标 -->
            <view v-if="item.icon" :class="itemIconCls">
              <component :is="item.icon" v-if="typeof item.icon === 'object'" />
              <text v-else>{{ item.icon }}</text>
            </view>
            
            <!-- 内容 -->
            <view :class="itemTextCls">
              <!-- 标签 -->
              <view v-if="item.label" :class="itemLabelCls">
                <component :is="item.label" v-if="typeof item.label === 'object'" />
                <text v-else>{{ item.label }}</text>
              </view>
              
              <!-- 描述 -->
              <view v-if="item.description" :class="itemDescCls">
                <component :is="item.description" v-if="typeof item.description === 'object'" />
                <text v-else>{{ item.description }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 嵌套提示项 -->
        <view v-else :class="getItemCls(item)" :style="itemStyle">
          <!-- 父级项 -->
          <view 
            :class="itemContentCls"
            :style="itemContentStyle"
            @click="handleItemClick(item)"
          >
            <!-- 图标 -->
            <view v-if="item.icon" :class="itemIconCls">
              <component :is="item.icon" v-if="typeof item.icon === 'object'" />
              <text v-else>{{ item.icon }}</text>
            </view>
            
            <!-- 内容 -->
            <view :class="itemTextCls">
              <!-- 标签 -->
              <view v-if="item.label" :class="itemLabelCls">
                <component :is="item.label" v-if="typeof item.label === 'object'" />
                <text v-else>{{ item.label }}</text>
              </view>
              
              <!-- 描述 -->
              <view v-if="item.description" :class="itemDescCls">
                <component :is="item.description" v-if="typeof item.description === 'object'" />
                <text v-else>{{ item.description }}</text>
              </view>
            </view>
          </view>
          
          <!-- 子级列表 -->
          <view :class="subListCls" :style="subListStyle">
            <view 
              v-for="(child, childIndex) in item.children"
              :key="child.key"
              :class="getSubItemCls(child)"
              :style="subItemStyle"
              @click="handleItemClick(child, item)"
            >
              <view :class="itemContentCls" :style="itemContentStyle">
                <!-- 图标 -->
                <view v-if="child.icon" :class="itemIconCls">
                  <component :is="child.icon" v-if="typeof child.icon === 'object'" />
                  <text v-else>{{ child.icon }}</text>
                </view>
                
                <!-- 内容 -->
                <view :class="itemTextCls">
                  <!-- 标签 -->
                  <view v-if="child.label" :class="itemLabelCls">
                    <component :is="child.label" v-if="typeof child.label === 'object'" />
                    <text v-else>{{ child.label }}</text>
                  </view>
                  
                  <!-- 描述 -->
                  <view v-if="child.description" :class="itemDescCls">
                    <component :is="child.description" v-if="typeof child.description === 'object'" />
                    <text v-else>{{ child.description }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxAiPrompts'
})

// 定义 Props
const props = defineProps({
  // 提示项列表
  items: {
    type: Array,
    default: () => []
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 是否垂直排列
  vertical: {
    type: Boolean,
    default: false
  },
  // 是否允许换行
  wrap: {
    type: Boolean,
    default: false
  },
  // 自定义样式类名前缀
  prefixCls: {
    type: String,
    default: 'zx-ai-prompts'
  },
  // 根节点样式类名
  rootClassName: {
    type: String,
    default: ''
  },
  // 自定义样式
  styles: {
    type: Object,
    default: () => ({})
  },
  // 自定义样式类名
  classNames: {
    type: Object,
    default: () => ({})
  }
})

// 定义 Emits
const emit = defineEmits(['itemClick'])

// 定义插槽
defineSlots()

// 计算样式类名
const mergedCls = computed(() => {
  const cls = [props.prefixCls]
  if (props.rootClassName) cls.push(props.rootClassName)
  if (props.classNames.root) cls.push(props.classNames.root)
  return cls.join(' ')
})

const titleCls = computed(() => {
  const cls = [`${props.prefixCls}-title`]
  if (props.classNames.title) cls.push(props.classNames.title)
  return cls.join(' ')
})

const listCls = computed(() => {
  const cls = [`${props.prefixCls}-list`]
  if (props.vertical) cls.push(`${props.prefixCls}-list-vertical`)
  if (props.wrap) cls.push(`${props.prefixCls}-list-wrap`)
  if (props.classNames.list) cls.push(props.classNames.list)
  return cls.join(' ')
})

const itemContentCls = computed(() => {
  const cls = [`${props.prefixCls}-item-content`]
  if (props.classNames.itemContent) cls.push(props.classNames.itemContent)
  return cls.join(' ')
})

const itemIconCls = computed(() => `${props.prefixCls}-item-icon`)
const itemTextCls = computed(() => `${props.prefixCls}-item-text`)
const itemLabelCls = computed(() => `${props.prefixCls}-item-label`)
const itemDescCls = computed(() => `${props.prefixCls}-item-desc`)

const subListCls = computed(() => {
  const cls = [`${props.prefixCls}-sub-list`]
  if (props.classNames.subList) cls.push(props.classNames.subList)
  return cls.join(' ')
})

// 获取项目样式类名
const getItemCls = (item) => {
  const cls = [`${props.prefixCls}-item`]
  if (item.disabled) cls.push(`${props.prefixCls}-item-disabled`)
  if (props.classNames.item) cls.push(props.classNames.item)
  return cls.join(' ')
}

const getSubItemCls = (item) => {
  const cls = [`${props.prefixCls}-sub-item`]
  if (item.disabled) cls.push(`${props.prefixCls}-sub-item-disabled`)
  if (props.classNames.subItem) cls.push(props.classNames.subItem)
  return cls.join(' ')
}

// 计算样式
const mergedStyle = computed(() => {
  return {
    ...props.styles.root
  }
})

const titleStyle = computed(() => {
  return {
    ...props.styles.title
  }
})

const listStyle = computed(() => {
  return {
    ...props.styles.list
  }
})

const itemStyle = computed(() => {
  return {
    ...props.styles.item
  }
})

const itemContentStyle = computed(() => {
  return {
    ...props.styles.itemContent
  }
})

const subListStyle = computed(() => {
  return {
    ...props.styles.subList
  }
})

const subItemStyle = computed(() => {
  return {
    ...props.styles.subItem
  }
})

// 处理项目点击
const handleItemClick = (item, parent = null) => {
  if (item.disabled) return
  
  emit('itemClick', {
    data: item,
    parent: parent
  })
}
</script>

<style lang="scss" scoped>
.zx-ai-prompts {
  max-width: 100%;
  
  &-title {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    line-height: 1.4;
  }
  
  &-list {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    align-items: stretch;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    &-wrap {
      flex-wrap: wrap;
    }
    
    &-vertical {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  
  &-item {
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #fff;
    transition: all 0.2s ease;
    cursor: pointer;
    
    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
    }
    
    &:active {
      transform: scale(0.98);
    }
    
    &-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      
      &:hover {
        border-color: #e5e7eb;
        box-shadow: none;
      }
      
      &:active {
        transform: none;
      }
    }
    
    &-content {
      padding: 12px 16px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    
    &-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    
    &-text {
      flex: 1;
      min-width: 0;
    }
    
    &-label {
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
      line-height: 1.4;
      margin-bottom: 4px;
    }
    
    &-desc {
      font-size: 12px;
      color: #6b7280;
      line-height: 1.4;
    }
  }
  
  &-sub-list {
    padding: 0 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  &-sub-item {
    border-radius: 6px;
    border: 1px solid #f3f4f6;
    background: #f9fafb;
    transition: all 0.2s ease;
    cursor: pointer;
    
    &:hover {
      border-color: #d1d5db;
      background: #f3f4f6;
    }
    
    &:active {
      transform: scale(0.98);
    }
    
    &-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      
      &:hover {
        border-color: #f3f4f6;
        background: #f9fafb;
      }
      
      &:active {
        transform: none;
      }
    }
    
    .zx-ai-prompts-item-content {
      padding: 8px 12px;
    }
    
    .zx-ai-prompts-item-label {
      font-size: 13px;
      margin-bottom: 2px;
    }
    
    .zx-ai-prompts-item-desc {
      font-size: 11px;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .zx-ai-prompts {
    &-item {
      &-content {
        padding: 10px 12px;
      }
      
      &-label {
        font-size: 13px;
      }
      
      &-desc {
        font-size: 11px;
      }
    }
  }
}
</style>