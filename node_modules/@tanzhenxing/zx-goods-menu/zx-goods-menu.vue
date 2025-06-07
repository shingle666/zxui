<template>
  <view class="zx-goods-menu">
    <!-- 菜单栏 -->
    <view class="zx-goods-menu__bar" :class="{ 'zx-goods-menu__bar--fixed': scrollFixed }"
      :style="{ zIndex: scrollFixed ? scrollFixedZIndex : 'auto' }">
      <view v-for="(item, index) in menuItems" :key="index" class="zx-goods-menu__item" :class="{
        'zx-goods-menu__item--active': activeIndex === index,
        'zx-goods-menu__item--disabled': item.disabled
      }" @click="handleItemClick(index, item)">
        <view class="zx-goods-menu__title">
          <slot name="icon" :item="item" :index="index">
            <text v-if="item.icon" class="zx-goods-menu__icon" :class="item.icon"></text>
          </slot>
          <text class="zx-goods-menu__text">{{ item.title }}</text>
          <text v-if="!item.disabled" class="zx-goods-menu__arrow"
            :class="{ 'zx-goods-menu__arrow--up': activeIndex === index && direction === 'down' }"></text>
        </view>
      </view>
    </view>

    <!-- 遮罩层 -->
    <view v-if="overlay && showPopup" class="zx-goods-menu__overlay" @click="handleOverlayClick"></view>

    <!-- 弹出内容 -->
    <view v-if="showPopup" class="zx-goods-menu__content" :class="{
      'zx-goods-menu__content--up': direction === 'up',
      'zx-goods-menu__content--down': direction === 'down'
    }" :style="contentStyle">
      <view class="zx-goods-menu__wrapper">
        <!-- 自定义内容 -->
        <slot v-if="activeItem && activeItem.options" name="content" :item="activeItem" :options="activeItem.options">
          <!-- 默认选项列表 -->
          <view class="zx-goods-menu__options" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
            <view v-for="(option, optionIndex) in activeItem.options" :key="optionIndex" class="zx-goods-menu__option"
              :class="{ 'zx-goods-menu__option--active': option.value === activeItem.value }"
              @click="handleOptionClick(option, optionIndex)">
              <slot name="option-icon" :option="option" :index="optionIndex">
                <text v-if="option.icon" class="zx-goods-menu__option-icon" :class="option.icon"></text>
              </slot>
              <text class="zx-goods-menu__option-text">{{ option.text }}</text>
              <text v-if="option.value === activeItem.value" class="zx-goods-menu__option-check"></text>
            </view>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'


// Props
const props = defineProps({
  // 菜单数据
  modelValue: {
    type: Array,
    default: () => []
  },
  // 菜单展开方向
  direction: {
    type: String,
    default: 'down' // down, up
  },
  // 动画时长
  duration: {
    type: [String, Number],
    default: 0.3
  },
  // 选中态颜色
  activeColor: {
    type: String,
    default: '#F2270C'
  },
  // 是否在点击遮罩层后关闭菜单
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  // 滚动后是否固定
  scrollFixed: {
    type: [Boolean, String, Number],
    default: false
  },
  // 固定时的层级
  scrollFixedZIndex: {
    type: Number,
    default: 1000
  },
  // 是否锁定背景滚动
  lockScroll: {
    type: Boolean,
    default: true
  },
  // 是否显示遮罩
  overlay: {
    type: Boolean,
    default: true
  },
  // 一行显示的列数
  cols: {
    type: Number,
    default: 1
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change', 'toggle', 'open', 'close'])

// 响应式数据
const activeIndex = ref(-1)
const showPopup = ref(false)
const menuItems = ref([])

// 计算属性
const activeItem = computed(() => {
  return activeIndex.value >= 0 ? menuItems.value[activeIndex.value] : null
})

const contentStyle = computed(() => {
  return {
    transitionDuration: `${props.duration}s`,
    '--active-color': props.activeColor
  }
})

// 监听数据变化
watch(() => props.modelValue, (newVal) => {
  menuItems.value = newVal.map(item => ({ ...item }))
}, { immediate: true, deep: true })

// 方法
const handleItemClick = (index, item) => {
  if (item.disabled) return

  if (activeIndex.value === index && showPopup.value) {
    // 关闭当前菜单
    closeMenu()
  } else {
    // 打开菜单
    openMenu(index)
  }
}

const openMenu = (index) => {
  activeIndex.value = index
  showPopup.value = true

  // #ifdef H5
  if (props.lockScroll) {
    // 锁定背景滚动 - 仅在 H5 中使用
    document.body.style.overflow = 'hidden'
  }
  // #endif

  emit('open')
  emit('toggle', true)
}

const closeMenu = () => {
  showPopup.value = false

  nextTick(() => {
    activeIndex.value = -1
  })

  // #ifdef H5
  if (props.lockScroll) {
    // 恢复背景滚动 - 仅在 H5 中使用
    document.body.style.overflow = ''
  }
  // #endif

  emit('close')
  emit('toggle', false)
}

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    closeMenu()
  }
}

const handleOptionClick = (option, optionIndex) => {
  if (activeItem.value) {
    activeItem.value.value = option.value

    // 更新数据
    const newValue = [...menuItems.value]
    emit('update:modelValue', newValue)
    emit('change', {
      index: activeIndex.value,
      item: activeItem.value,
      option,
      optionIndex
    })

    // 关闭菜单
    closeMenu()
  }
}

// 暴露方法
const toggle = (show) => {
  if (typeof show === 'boolean') {
    if (show) {
      if (activeIndex.value >= 0) {
        openMenu(activeIndex.value)
      }
    } else {
      closeMenu()
    }
  } else {
    if (showPopup.value) {
      closeMenu()
    } else if (activeIndex.value >= 0) {
      openMenu(activeIndex.value)
    }
  }
}

defineExpose({
  toggle
})
</script>

<style lang="scss" scoped>
.zx-goods-menu {
  position: relative;

  &__bar {
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #eaf0fb;
    box-shadow: 0 2px 12px rgba(89, 89, 89, 0.12);

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  }

  &__item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 8px;
    cursor: pointer;
    transition: all 0.3s;

    &--active {
      .zx-goods-menu__text {
        color: var(--active-color, #F2270C);
        font-weight: 500;
      }

      .zx-goods-menu__arrow {
        color: var(--active-color, #F2270C);
      }
    }

    &--disabled {
      color: #969799;
      cursor: not-allowed;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__icon {
    font-size: 16px;
  }

  &__text {
    font-size: 14px;
    color: #323233;
    transition: color 0.3s;
  }

  &__arrow {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #969799;
    transition: all 0.3s;

    &--up {
      transform: rotate(180deg);
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1999;
  }

  &__content {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 2000;
    transition: all 0.3s;

    &--down {
      top: 100%;
    }

    &--up {
      bottom: 100%;
    }
  }

  &__wrapper {
    max-height: 214px;
    overflow-y: auto;
  }

  &__options {
    display: grid;
    gap: 1px;
    background-color: #f7f8fa;
  }

  &__option {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #f7f8fa;
    }

    &--active {
      color: var(--active-color, #F2270C);
      font-weight: 500;
    }
  }

  &__option-icon {
    margin-right: 6px;
    font-size: 16px;
  }

  &__option-text {
    flex: 1;
    font-size: 14px;
  }

  &__option-check {
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23F2270C' d='M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>