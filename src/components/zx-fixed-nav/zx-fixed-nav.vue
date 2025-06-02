<template>
  <view 
    class="zx-fixed-nav" 
    :class="{
      'zx-fixed-nav--active': visible,
      'zx-fixed-nav--left': type === 'left'
    }"
    :style="navStyle"
  >
    <!-- 遮罩层 -->
    <view 
      v-if="overlay && visible" 
      class="zx-fixed-nav__overlay"
      @click="handleOverlayClick"
    ></view>
    
    <!-- 导航列表 -->
    <view class="zx-fixed-nav__list" :style="listStyle">
      <view 
        v-for="(item, index) in navList" 
        :key="item.id || index"
        class="zx-fixed-nav__list-item"
        :class="{ 'zx-fixed-nav__list-item--active': item.id === activeId }"
        @click="handleItemClick(item, $event)"
      >
        <image v-if="item.icon" :src="item.icon" class="zx-fixed-nav__list-item-icon" />
        <view class="zx-fixed-nav__list-item-text">{{ item.text }}</view>
        <view v-if="item.num" class="zx-fixed-nav__list-item-badge">{{ item.num }}</view>
      </view>
    </view>
    
    <!-- 切换按钮 -->
    <view class="zx-fixed-nav__btn" :style="btnStyle" @click="handleToggle">
      <slot name="btn">
        <view class="zx-fixed-nav__btn-icon">
          <text class="zx-icon" :class="iconClass">{{ iconText }}</text>
        </view>
        <view class="zx-fixed-nav__btn-text">{{ btnText }}</view>
      </slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props 定义
const props = defineProps({
  // 是否显示
  visible: {
    type: Boolean,
    default: false
  },
  // 导航列表数据
  navList: {
    type: Array,
    default: () => []
  },
  // 激活项颜色
  activeColor: {
    type: String,
    default: '#fa2c19'
  },
  // 收起时的文案
  activeText: {
    type: String,
    default: '收起导航'
  },
  // 展开时的文案
  unActiveText: {
    type: String,
    default: '快速导航'
  },
  // 导航方向 left | right
  type: {
    type: String,
    default: 'right'
  },
  // 是否显示遮罩
  overlay: {
    type: Boolean,
    default: true
  },
  // 定位
  position: {
    type: Object,
    default: () => ({
      top: 'auto',
      bottom: 'auto'
    })
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

// Emits 定义
const emit = defineEmits(['update:visible', 'selected'])

// 响应式数据
const activeId = ref(null)

// 计算属性
const navStyle = computed(() => {
  const style = {
    position: 'fixed',
    zIndex: 201,
    ...props.position,
    ...props.customStyle
  }
  
  if (props.type === 'left') {
    style.left = '0'
    style.right = 'auto'
  } else {
    style.right = '0'
    style.left = 'auto'
  }
  
  return style
})

const listStyle = computed(() => {
  const style = {}
  if (props.activeColor) {
    style['--active-color'] = props.activeColor
  }
  return style
})

const btnStyle = computed(() => {
  return {
    backgroundColor: props.activeColor || '#fa2c19'
  }
})

const btnText = computed(() => {
  return props.visible ? props.activeText : props.unActiveText
})

const iconClass = computed(() => {
  if (props.type === 'left') {
    return props.visible ? 'zx-icon-arrow-left' : 'zx-icon-arrow-right'
  } else {
    return props.visible ? 'zx-icon-arrow-right' : 'zx-icon-arrow-left'
  }
})

const iconText = computed(() => {
  if (props.type === 'left') {
    return props.visible ? '‹' : '›'
  } else {
    return props.visible ? '›' : '‹'
  }
})

// 方法
const handleToggle = () => {
  emit('update:visible', !props.visible)
}

const handleOverlayClick = () => {
  emit('update:visible', false)
}

const handleItemClick = (item, event) => {
  activeId.value = item.id
  emit('selected', { item, event })
}

// 监听器
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    activeId.value = null
  }
})
</script>

<style lang="scss" scoped>
.zx-fixed-nav {
  position: fixed;
  right: 0;
  z-index: 201;
  display: inline-block;
  height: 100rpx;
  
  &--active {
    .zx-fixed-nav__btn-icon {
      transform: rotate(180deg);
    }
    
    .zx-fixed-nav__list {
      transform: translateX(0%) !important;
    }
  }
  
  &--left {
    right: auto;
    left: 0;
    
    .zx-fixed-nav__btn {
      right: auto;
      left: 0;
      flex-direction: row-reverse;
      border-radius: 0 90rpx 90rpx 0;
    }
    
    .zx-fixed-nav__list {
      right: auto;
      left: 0;
      border-radius: 0 50rpx 50rpx 0;
      transform: translateX(-100%);
      padding-right: 40rpx;
      padding-left: 160rpx;
    }
    
    &.zx-fixed-nav--active {
      .zx-fixed-nav__btn-icon {
        transform: rotate(0deg) !important;
      }
    }
  }
}

.zx-fixed-nav__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 200;
}

.zx-fixed-nav__btn {
  position: absolute;
  right: 0;
  z-index: 202;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160rpx;
  height: 100%;
  padding-left: 24rpx;
  background: linear-gradient(135deg, #fa2c19 0%, #ff6b35 100%);
  border-radius: 90rpx 0 0 90rpx;
  box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.2);
  
  &-icon {
    margin-right: 10rpx;
    transition: all 0.3s;
    transform: rotate(0deg);
    
    .zx-icon {
      font-size: 32rpx;
      color: #fff;
    }
  }
  
  &-text {
    flex-shrink: 0;
    width: 48rpx;
    font-size: 20rpx;
    line-height: 26rpx;
    color: #fff;
  }
}

.zx-fixed-nav__list {
  position: absolute;
  right: 0;
  z-index: 201;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  height: 100%;
  padding: 0 160rpx 0 40rpx;
  margin: 0;
  background: #fff;
  border-radius: 50rpx 0 0 50rpx;
  box-shadow: 4rpx 4rpx 16rpx 0 rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  transform: translateX(100%);
  
  &-item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    min-width: 100rpx;
    height: 100%;
    padding: 0;
    margin: 0;
    
    &--active {
      .zx-fixed-nav__list-item-text {
        color: var(--active-color, #fa2c19);
      }
    }
    
    &-icon {
      width: 40rpx;
      height: 40rpx;
      margin-bottom: 4rpx;
    }
    
    &-text {
      font-size: 20rpx;
      color: #333;
    }
    
    &-badge {
      position: absolute;
      top: 2rpx;
      right: 0;
      min-width: 24rpx;
      height: 28rpx;
      padding: 0 6rpx;
      font-size: 20rpx;
      line-height: 28rpx;
      color: white;
      text-align: center;
      background: #fa2c19;
      border-radius: 14rpx;
    }
  }
}

/* 图标字体 */
.zx-icon {
  font-family: 'iconfont';
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>