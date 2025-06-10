<template>
  <view class="zx-swipe">
    <view class="zx-swipe-box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
      :style="transformStyle">
      <!-- 左侧按钮组 -->
      <view class="zx-swipe-button-group button-group--left" :style="leftButtonStyle">
        <slot name="left">
          <view v-for="(item, index) in leftOptions" :key="index" class="zx-swipe-button"
            @click.stop="onClick(index, item, 'left')" :style="{
              backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD'
            }">
            <text class="zx-swipe-button-text" :style="{
              color: item.style && item.style.color ? item.style.color : '#FFFFFF',
              fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px'
            }">{{ item.text }}</text>
          </view>
        </slot>
      </view>

      <!-- 内容 -->
      <view class="zx-swipe-content">
        <slot></slot>
      </view>

      <!-- 右侧按钮组 -->
      <view class="zx-swipe-button-group button-group--right" :style="rightButtonStyle">
        <slot name="right">
          <view v-for="(item, index) in rightOptions" :key="index" class="zx-swipe-button"
            @click.stop="onClick(index, item, 'right')" :style="{
              backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD'
            }">
            <text class="zx-swipe-button-text" :style="{
              color: item.style && item.style.color ? item.style.color : '#FFFFFF',
              fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px'
            }">{{ item.text }}</text>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, inject, onMounted, onBeforeUnmount, watch, computed } from 'vue'

// 定义组件 props
const props = defineProps({
  // 控制开关: left | right | none
  show: {
    type: String,
    default: 'none'
  },
  // 禁用滑动
  disabled: {
    type: Boolean,
    default: false
  },
  // 自动关闭其他打开的组件
  autoClose: {
    type: Boolean,
    default: true
  },
  // 滑动缺省距离
  threshold: {
    type: Number,
    default: 20
  },
  // 左侧按钮内容
  leftOptions: {
    type: Array,
    default: () => []
  },
  // 右侧按钮内容
  rightOptions: {
    type: Array,
    default: () => []
  }
})

// 定义事件
const emit = defineEmits(['click', 'change'])

// 获取父组件的方法
const swipeAction = inject('swipe-action', null)

// 组件状态
const isShow = ref('none') // 当前显示状态: left | right | none
const isMoving = ref(false) // 是否正在滑动
const position = ref({ x: 0, y: 0 }) // 滑动位置
const moveX = ref(0) // X轴移动距离

// 按钮宽度
const leftWidth = ref(0)
const rightWidth = ref(0)

// 动画控制
const ani = ref(false) // 是否开启过渡动画

// 计算样式
const transformStyle = computed(() => {
  return {
    transform: `translateX(${moveX.value}px)`,
    transition: ani.value ? 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)' : ''
  }
})

// 左侧按钮样式
const leftButtonStyle = computed(() => {
  return {
    transform: `translateX(${Math.min(0, moveX.value + leftWidth.value)}px)`
  }
})

// 右侧按钮样式
const rightButtonStyle = computed(() => {
  return {
    transform: `translateX(${Math.max(0, moveX.value - rightWidth.value)}px)`
  }
})

// 监听 show 属性变化
watch(() => props.show, (val) => {
  openState(val)
})

// 挂载时注册到父组件
onMounted(() => {
  if (swipeAction) {
    swipeAction.addChild({
      close,
      open
    })
  }

  // 初始化状态
  if (props.show !== 'none') {
    openState(props.show)
  }

  // 获取按钮宽度
  setTimeout(() => {
    getButtonSize()
  }, 50)
})

// 销毁前从父组件移除
onBeforeUnmount(() => {
  if (swipeAction) {
    swipeAction.removeChild({
      close,
      open
    })
  }
})

// 获取按钮尺寸
function getButtonSize() {
  uni.createSelectorQuery()
    .selectAll('.button-group--left .zx-swipe-button')
    .boundingClientRect(data => {
      if (data && data.length) {
        let width = 0
        data.forEach(item => {
          width += item.width
        })
        leftWidth.value = width
      }
    })
    .exec()

  uni.createSelectorQuery()
    .selectAll('.button-group--right .zx-swipe-button')
    .boundingClientRect(data => {
      if (data && data.length) {
        let width = 0
        data.forEach(item => {
          width += item.width
        })
        rightWidth.value = width
      }
    })
    .exec()
}

// 触摸开始
function touchstart(e) {
  if (props.disabled) return

  // 记录初始位置
  position.value.x = e.touches[0].pageX
  position.value.y = e.touches[0].pageY

  isMoving.value = true
  ani.value = false
}

// 触摸移动
function touchmove(e) {
  if (props.disabled || !isMoving.value) return

  const touchX = e.touches[0].pageX
  const touchY = e.touches[0].pageY
  const moveX = touchX - position.value.x
  const moveY = touchY - position.value.y

  // 纵向滑动距离大于横向时，不进行操作（防止页面上下滚动冲突）
  if (Math.abs(moveY) > Math.abs(moveX)) return

  // 计算新的移动距离
  let newMoveX = 0

  if (isShow.value === 'none') {
    // 未打开状态，直接使用移动距离
    newMoveX = moveX
  } else if (isShow.value === 'left') {
    // 左侧打开，加上左侧按钮宽度
    newMoveX = moveX + leftWidth.value
  } else if (isShow.value === 'right') {
    // 右侧打开，减去右侧按钮宽度
    newMoveX = moveX - rightWidth.value
  }

  // 限制移动范围
  if (newMoveX > leftWidth.value) {
    newMoveX = leftWidth.value
  } else if (newMoveX < -rightWidth.value) {
    newMoveX = -rightWidth.value
  }

  moveX.value = newMoveX

  // 阻止页面滚动
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
}

// 触摸结束
function touchend(e) {
  if (props.disabled || !isMoving.value) return

  isMoving.value = false
  ani.value = true

  // 判断滑动方向和距离，决定是否打开
  if (moveX.value > props.threshold) {
    open('left')
  } else if (moveX.value < -props.threshold) {
    open('right')
  } else {
    close()
  }
}

// 打开组件
function open(type) {
  if (props.autoClose && swipeAction) {
    swipeAction.closeOther({
      close,
      open
    })
  }

  if (type === 'left') {
    moveX.value = leftWidth.value
    isShow.value = 'left'
  } else {
    moveX.value = -rightWidth.value
    isShow.value = 'right'
  }

  emit('change', isShow.value)
}

// 关闭组件
function close() {
  moveX.value = 0
  isShow.value = 'none'
  emit('change', 'none')
}

// 外部控制打开状态
function openState(type) {
  ani.value = true
  if (type === 'left') {
    open('left')
  } else if (type === 'right') {
    open('right')
  } else {
    close()
  }
}

// 点击按钮
function onClick(index, item, position) {
  emit('click', {
    content: item,
    index,
    position
  })

  // 触发后关闭
  close()
}

// 暴露给父组件的方法
defineExpose({
  close,
  open
})
</script>


<style lang="scss">
.zx-swipe {
  position: relative;
  overflow: hidden;

  &-box {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  &-content {
    width: 100%;
    flex: 1;
  }

  &-button-group {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  &-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    &-text {
      flex-shrink: 0;
      font-size: 14px;
    }
  }
}

.button-group--left {
  left: 0;
  transform: translateX(-100%);
}

.button-group--right {
  right: 0;
  transform: translateX(100%);
}
</style>