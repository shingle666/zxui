<template>
  <view class="zx-search-history" v-if="showHistory">
    <!-- 标题栏 -->
    <view class="zx-search-history__header" v-if="showTitle">
      <view class="zx-search-history__title">
        <zx-icon v-if="titleIcon" :name="titleIcon" :size="titleIconSize" :color="titleIconColor" />
        <text class="zx-search-history__title-text" :style="{ color: titleColor, fontSize: titleSize + 'rpx' }">
          {{ title }}
        </text>
      </view>
      <view class="zx-search-history__clear" v-if="showClear && historyList.length > 0" @click="handleClearAll">
        <zx-icon v-if="clearIcon" :name="clearIcon" :size="clearIconSize" :color="clearIconColor" />
        <text class="zx-search-history__clear-text" :style="{ color: clearTextColor, fontSize: clearTextSize + 'rpx' }">
          {{ clearText }}
        </text>
      </view>
    </view>
    
    <!-- 历史记录列表 -->
    <view class="zx-search-history__content" v-if="historyList.length > 0">
      <view 
        v-for="(item, index) in displayList" 
        :key="getItemKey(item, index)"
        class="zx-search-history__item"
        :class="{
          'zx-search-history__item--active': activeIndex === index,
          'zx-search-history__item--disabled': item.disabled
        }"
        :style="itemStyle"
        @click="handleItemClick(item, index)"
      >
        <!-- 项目图标 -->
        <view class="zx-search-history__item-icon" v-if="showItemIcon">
          <zx-icon 
            :name="item.icon || itemIcon" 
            :size="itemIconSize" 
            :color="item.disabled ? disabledColor : (item.iconColor || itemIconColor)" 
          />
        </view>
        
        <!-- 项目文本 -->
        <view 
          class="zx-search-history__item-text"
          :style="{
            color: item.disabled ? disabledColor : (item.textColor || itemTextColor),
            fontSize: itemTextSize + 'rpx'
          }"
        >
          <text v-if="highlightKeyword && keyword" v-html="highlightText(getItemText(item))"></text>
          <text v-else>{{ getItemText(item) }}</text>
        </view>
        
        <!-- 删除按钮 -->
        <view 
          class="zx-search-history__item-delete" 
          v-if="showDelete && !item.disabled"
          @click.stop="handleItemDelete(item, index)"
        >
          <zx-icon :name="deleteIcon" :size="deleteIconSize" :color="deleteIconColor" />
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="zx-search-history__empty" v-else-if="showEmpty">
      <zx-icon v-if="emptyIcon" :name="emptyIcon" :size="emptyIconSize" :color="emptyIconColor" />
      <text class="zx-search-history__empty-text" :style="{ color: emptyTextColor, fontSize: emptyTextSize + 'rpx' }">
        {{ emptyText }}
      </text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  // 历史记录数据
  modelValue: {
    type: Array,
    default: () => []
  },
  // 是否显示历史记录
  showHistory: {
    type: Boolean,
    default: true
  },
  // 最大显示数量
  maxCount: {
    type: Number,
    default: 10
  },
  // 高亮关键词
  keyword: {
    type: String,
    default: ''
  },
  // 是否高亮关键词
  highlightKeyword: {
    type: Boolean,
    default: true
  },
  // 高亮颜色
  highlightColor: {
    type: String,
    default: '#ff4444'
  },
  // 数据字段映射
  fieldNames: {
    type: Object,
    default: () => ({
      text: 'text',
      value: 'value',
      icon: 'icon',
      disabled: 'disabled'
    })
  },
  
  // 标题相关
  showTitle: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: '搜索历史'
  },
  titleIcon: {
    type: String,
    default: 'clock'
  },
  titleIconSize: {
    type: [Number, String],
    default: 32
  },
  titleIconColor: {
    type: String,
    default: '#666666'
  },
  titleColor: {
    type: String,
    default: '#333333'
  },
  titleSize: {
    type: [Number, String],
    default: 28
  },
  
  // 清除按钮相关
  showClear: {
    type: Boolean,
    default: true
  },
  clearText: {
    type: String,
    default: '清空'
  },
  clearIcon: {
    type: String,
    default: 'delete'
  },
  clearIconSize: {
    type: [Number, String],
    default: 28
  },
  clearIconColor: {
    type: String,
    default: '#999999'
  },
  clearTextColor: {
    type: String,
    default: '#999999'
  },
  clearTextSize: {
    type: [Number, String],
    default: 24
  },
  
  // 项目相关
  showItemIcon: {
    type: Boolean,
    default: true
  },
  itemIcon: {
    type: String,
    default: 'search'
  },
  itemIconSize: {
    type: [Number, String],
    default: 28
  },
  itemIconColor: {
    type: String,
    default: '#999999'
  },
  itemTextColor: {
    type: String,
    default: '#333333'
  },
  itemTextSize: {
    type: [Number, String],
    default: 28
  },
  itemHeight: {
    type: [Number, String],
    default: 88
  },
  itemPadding: {
    type: String,
    default: '0 32rpx'
  },
  
  // 删除按钮相关
  showDelete: {
    type: Boolean,
    default: true
  },
  deleteIcon: {
    type: String,
    default: 'close'
  },
  deleteIconSize: {
    type: [Number, String],
    default: 24
  },
  deleteIconColor: {
    type: String,
    default: '#cccccc'
  },
  
  // 空状态相关
  showEmpty: {
    type: Boolean,
    default: true
  },
  emptyText: {
    type: String,
    default: '暂无搜索历史'
  },
  emptyIcon: {
    type: String,
    default: 'empty'
  },
  emptyIconSize: {
    type: [Number, String],
    default: 120
  },
  emptyIconColor: {
    type: String,
    default: '#cccccc'
  },
  emptyTextColor: {
    type: String,
    default: '#999999'
  },
  emptyTextSize: {
    type: [Number, String],
    default: 24
  },
  
  // 其他
  disabledColor: {
    type: String,
    default: '#cccccc'
  },
  backgroundColor: {
    type: String,
    default: 'transparent'
  }
})

const emit = defineEmits([
  'update:modelValue',
  'click',
  'item-click', 
  'item-delete',
  'clear',
  'clear-all'
])

const activeIndex = ref(-1)

// 历史记录列表
const historyList = computed(() => props.modelValue || [])

// 显示的列表（限制数量）
const displayList = computed(() => {
  if (props.maxCount <= 0) return historyList.value
  return historyList.value.slice(0, props.maxCount)
})

// 项目样式
const itemStyle = computed(() => ({
  height: props.itemHeight + 'rpx',
  padding: props.itemPadding,
  backgroundColor: props.backgroundColor
}))

// 获取项目的唯一标识
const getItemKey = (item, index) => {
  if (typeof item === 'object' && item !== null) {
    return item[props.fieldNames.value] || item.id || index
  }
  return item || index
}

// 获取项目文本
const getItemText = (item) => {
  if (typeof item === 'string') return item
  if (typeof item === 'object' && item !== null) {
    return item[props.fieldNames.text] || item.text || item.label || item.name || ''
  }
  return String(item || '')
}

// 高亮文本
const highlightText = (text) => {
  if (!props.keyword || !text) return text
  const regex = new RegExp(`(${props.keyword})`, 'gi')
  return text.replace(regex, `<span style="color: ${props.highlightColor}; font-weight: bold;">$1</span>`)
}

// 处理项目点击
const handleItemClick = (item, index) => {
  if (typeof item === 'object' && item[props.fieldNames.disabled]) return
  
  activeIndex.value = index
  
  emit('click', { item, index })
  emit('item-click', { item, index })
}

// 处理项目删除
const handleItemDelete = (item, index) => {
  const newList = [...historyList.value]
  newList.splice(index, 1)
  
  emit('update:modelValue', newList)
  emit('item-delete', { item, index, list: newList })
}

// 处理清空所有
const handleClearAll = () => {
  emit('update:modelValue', [])
  emit('clear')
  emit('clear-all')
}
</script>

<style lang="scss" scoped>
.zx-search-history {
  width: 100%;
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx 16rpx;
  }
  
  &__title {
    display: flex;
    align-items: center;
    gap: 12rpx;
    
    &-text {
      font-weight: 500;
    }
  }
  
  &__clear {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 8rpx 16rpx;
    border-radius: 32rpx;
    transition: all 0.3s ease;
    
    &:active {
      opacity: 0.7;
      transform: scale(0.95);
    }
    
    &-text {
      font-size: 24rpx;
    }
  }
  
  &__content {
    padding: 0 0 16rpx;
  }
  
  &__item {
    display: flex;
    align-items: center;
    gap: 24rpx;
    transition: all 0.3s ease;
    position: relative;
    
    &:active:not(&--disabled) {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    &--active {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    &--disabled {
      opacity: 0.5;
    }
    
    &-icon {
      flex-shrink: 0;
    }
    
    &-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.4;
    }
    
    &-delete {
      flex-shrink: 0;
      padding: 8rpx;
      margin: -8rpx;
      transition: all 0.3s ease;
      
      &:active {
        opacity: 0.7;
        transform: scale(0.9);
      }
    }
  }
  
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80rpx 32rpx;
    gap: 24rpx;
    
    &-text {
      text-align: center;
      line-height: 1.4;
    }
  }
}
</style>