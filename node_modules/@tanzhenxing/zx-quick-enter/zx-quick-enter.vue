<template>
  <view class="zx-quick-enter" :style="containerStyle">
    <view 
      v-for="(item, index) in list" 
      :key="index"
      class="zx-quick-enter-item"
      :class="{
        'zx-quick-enter-item--disabled': item.disabled,
        'zx-quick-enter-item--highlight': highlight && !item.disabled
      }"
      :style="itemStyle"
      @click="handleItemClick(item, index)"
    >
      <!-- 图标 -->
      <view class="zx-quick-enter-item__icon" v-if="item.icon || item.image">
        <zx-icon 
          v-if="item.icon" 
          :name="item.icon" 
          :size="iconSize" 
          :color="item.disabled ? disabledColor : (item.iconColor || iconColor)"
        />
        <image 
          v-else-if="item.image" 
          :src="item.image" 
          class="zx-quick-enter-item__image"
          :style="{ width: iconSize + 'rpx', height: iconSize + 'rpx' }"
          mode="aspectFit"
        />
      </view>
      
      <!-- 文字 -->
      <view 
        class="zx-quick-enter-item__text"
        :style="{
          color: item.disabled ? disabledColor : (item.textColor || textColor),
          fontSize: textSize + 'rpx'
        }"
      >
        {{ item.text }}
      </view>
      
      <!-- 徽标 -->
      <zx-badge 
        v-if="item.badge && !item.disabled"
        :value="item.badge"
        :max="badgeMax"
        :dot="item.badgeDot"
        :color="item.badgeColor || badgeColor"
        class="zx-quick-enter-item__badge"
      />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 快捷入口列表
  list: {
    type: Array,
    default: () => []
  },
  // 每行显示的列数
  column: {
    type: Number,
    default: 4
  },
  // 图标大小
  iconSize: {
    type: [Number, String],
    default: 48
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: '#666666'
  },
  // 文字大小
  textSize: {
    type: [Number, String],
    default: 24
  },
  // 文字颜色
  textColor: {
    type: String,
    default: '#333333'
  },
  // 禁用状态颜色
  disabledColor: {
    type: String,
    default: '#cccccc'
  },
  // 徽标颜色
  badgeColor: {
    type: String,
    default: '#ff4444'
  },
  // 徽标最大值
  badgeMax: {
    type: Number,
    default: 99
  },
  // 是否显示点击高亮效果
  highlight: {
    type: Boolean,
    default: true
  },
  // 容器背景色
  backgroundColor: {
    type: String,
    default: 'transparent'
  },
  // 容器内边距
  padding: {
    type: String,
    default: '20rpx'
  },
  // 项目间距
  gap: {
    type: [Number, String],
    default: 20
  },
  // 项目高度
  itemHeight: {
    type: [Number, String],
    default: 160
  }
})

const emit = defineEmits(['click', 'item-click'])

// 容器样式
const containerStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor,
    padding: props.padding,
    display: 'flex',
    flexWrap: 'wrap',
    gap: props.gap + 'rpx'
  }
})

// 项目样式
const itemStyle = computed(() => {
  const width = `calc((100% - ${(props.column - 1) * props.gap}rpx) / ${props.column})`
  return {
    width,
    height: props.itemHeight + 'rpx'
  }
})

// 处理项目点击
const handleItemClick = (item, index) => {
  if (item.disabled) return
  
  emit('click', { item, index })
  emit('item-click', { item, index })
}
</script>

<style lang="scss" scoped>
.zx-quick-enter {
  width: 100%;
  box-sizing: border-box;
  
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    transition: all 0.3s ease;
    
    &--highlight:active {
      transform: scale(0.95);
      opacity: 0.8;
    }
    
    &--disabled {
      opacity: 0.5;
    }
    
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16rpx;
    }
    
    &__image {
      border-radius: 8rpx;
    }
    
    &__text {
      text-align: center;
      line-height: 1.2;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    &__badge {
      position: absolute;
      top: 0;
      right: 20%;
      transform: translateX(50%);
    }
  }
}
</style>