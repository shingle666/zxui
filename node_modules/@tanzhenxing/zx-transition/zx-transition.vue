<template>
  <view
    v-if="!destroyOnClose || display"
    :class="classes"
    :style="styles"
    @click="clickHandler"
  >
    <slot />
  </view>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'

// 组件属性定义
const props = defineProps({
  // 是否显示
  show: {
    type: Boolean,
    default: false
  },
  // 动画名称
  name: {
    type: String,
    default: 'fade'
  },
  // 动画持续时间（毫秒）
  duration: {
    type: Number,
    default: 300
  },
  // 动画时间函数
  timingFunction: {
    type: String,
    default: 'ease'
  },
  // 是否在关闭时销毁元素
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 自定义样式
  customStyle: {
    type: [String, Object],
    default: ''
  },
  // 进入动画前的类名
  enterFromClass: String,
  // 进入动画时的类名
  enterActiveClass: String,
  // 进入动画后的类名
  enterToClass: String,
  // 离开动画前的类名
  leaveFromClass: String,
  // 离开动画时的类名
  leaveActiveClass: String,
  // 离开动画后的类名
  leaveToClass: String
})

// 事件定义
const emit = defineEmits([
  'beforeEnter',
  'enter', 
  'afterEnter',
  'beforeLeave',
  'leave',
  'afterLeave',
  'click'
])

// 内置动画配置
const defaultAnimations = {
  'fade': {
    enter: 'zx-fade-in',
    leave: 'zx-fade-out'
  },
  'fade-up': {
    enter: 'zx-fade-up-in',
    leave: 'zx-fade-up-out'
  },
  'fade-down': {
    enter: 'zx-fade-down-in',
    leave: 'zx-fade-down-out'
  },
  'fade-left': {
    enter: 'zx-fade-left-in',
    leave: 'zx-fade-left-out'
  },
  'fade-right': {
    enter: 'zx-fade-right-in',
    leave: 'zx-fade-right-out'
  },
  'slide-up': {
    enter: 'zx-slide-up-in',
    leave: 'zx-slide-up-out'
  },
  'slide-down': {
    enter: 'zx-slide-down-in',
    leave: 'zx-slide-down-out'
  },
  'slide-left': {
    enter: 'zx-slide-left-in',
    leave: 'zx-slide-left-out'
  },
  'slide-right': {
    enter: 'zx-slide-right-in',
    leave: 'zx-slide-right-out'
  },
  'zoom': {
    enter: 'zx-zoom-in',
    leave: 'zx-zoom-out'
  },
  'zoom-in': {
    enter: 'zx-zoom-in',
    leave: 'zx-zoom-out'
  },
  'zoom-out': {
    enter: 'zx-zoom-out-in',
    leave: 'zx-zoom-out-out'
  }
}

// 响应式数据
const display = ref(false)
const animationClass = ref('')

// 计算属性
const name = computed(() => props.name || 'fade')
const duration = computed(() => props.duration || 300)

// 判断是否为内置动画
const isBuiltInAnimation = computed(() => {
  return Object.keys(defaultAnimations).includes(name.value)
})

// 获取默认类名
function getDefaultClassNames(animationName) {
  return {
    enter: `${animationName}-enter-from`,
    enterActive: `${animationName}-enter-active`,
    enterTo: `${animationName}-enter-to ${animationName}-enter-active`,
    leave: `${animationName}-leave-from`,
    leaveActive: `${animationName}-leave-active`,
    leaveTo: `${animationName}-leave-to ${animationName}-leave-active`
  }
}

// 获取类名配置
const classNames = computed(() => {
  const defaultClassNames = getDefaultClassNames(name.value)
  return {
    enter: props.enterFromClass || defaultClassNames.enter,
    enterActive: props.enterActiveClass || defaultClassNames.enterActive,
    enterTo: props.enterToClass || defaultClassNames.enterTo,
    leave: props.leaveFromClass || defaultClassNames.leave,
    leaveActive: props.leaveActiveClass || defaultClassNames.leaveActive,
    leaveTo: props.leaveToClass || defaultClassNames.leaveTo
  }
})

// 进入动画
async function enter() {
  if (display.value) return
  
  emit('beforeEnter')
  display.value = true
  
  // 设置进入动画类名
  if (isBuiltInAnimation.value) {
    animationClass.value = defaultAnimations[name.value]?.enter || ''
  } else {
    animationClass.value = `${classNames.value.enter} ${classNames.value.enterActive}`
  }
  
  await nextTick()
  emit('enter')
  
  setTimeout(() => {
    if (!isBuiltInAnimation.value) {
      animationClass.value = classNames.value.enterTo
    }
    emit('afterEnter')
  }, duration.value)
}

// 离开动画
async function leave() {
  if (!display.value) return
  
  emit('beforeLeave')
  
  // 设置离开动画类名
  if (isBuiltInAnimation.value) {
    animationClass.value = defaultAnimations[name.value]?.leave || ''
  } else {
    animationClass.value = `${classNames.value.leave} ${classNames.value.leaveActive}`
  }
  
  await nextTick()
  emit('leave')
  
  setTimeout(() => {
    if (!props.show && display.value) {
      display.value = false
    }
    if (!isBuiltInAnimation.value) {
      animationClass.value = classNames.value.leaveTo
    }
    emit('afterLeave')
  }, duration.value)
}

// 监听显示状态变化
watch(
  () => props.show,
  (val) => {
    val ? enter() : leave()
  },
  { immediate: true }
)

// 点击事件处理
function clickHandler(evt) {
  emit('click', evt)
}

// 计算类名
const classes = computed(() => {
  const classList = ['zx-transition']
  
  if (animationClass.value) {
    classList.push(animationClass.value)
  }
  
  if (!display.value) {
    classList.push('zx-hidden')
  }
  
  if (props.customClass) {
    classList.push(props.customClass)
  }
  
  return classList.join(' ')
})

// 计算样式
const styles = computed(() => {
  const styleObj = {}
  
  if (isBuiltInAnimation.value) {
    styleObj['animation-duration'] = `${duration.value}ms`
    styleObj['animation-timing-function'] = props.timingFunction
  }
  
  // 处理自定义样式
  if (props.customStyle) {
    if (typeof props.customStyle === 'string') {
      return `${Object.entries(styleObj).map(([k, v]) => `${k}: ${v}`).join('; ')}; ${props.customStyle}`
    } else {
      Object.assign(styleObj, props.customStyle)
    }
  }
  
  return styleObj
})
</script>

<style lang="scss" scoped>
.zx-transition {
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.zx-hidden {
  display: none !important;
}

/* 淡入淡出动画 */
.zx-fade-in {
  animation-name: zx-fade-in;
  animation-fill-mode: both;
}

.zx-fade-out {
  animation-name: zx-fade-out;
  animation-fill-mode: both;
}

@keyframes zx-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zx-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 上滑淡入动画 */
.zx-fade-up-in {
  animation-name: zx-fade-up-in;
  animation-fill-mode: both;
}

.zx-fade-up-out {
  animation-name: zx-fade-up-out;
  animation-fill-mode: both;
}

@keyframes zx-fade-up-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zx-fade-up-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}

/* 下滑淡入动画 */
.zx-fade-down-in {
  animation-name: zx-fade-down-in;
  animation-fill-mode: both;
}

.zx-fade-down-out {
  animation-name: zx-fade-down-out;
  animation-fill-mode: both;
}

@keyframes zx-fade-down-in {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zx-fade-down-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

/* 左滑淡入动画 */
.zx-fade-left-in {
  animation-name: zx-fade-left-in;
  animation-fill-mode: both;
}

.zx-fade-left-out {
  animation-name: zx-fade-left-out;
  animation-fill-mode: both;
}

@keyframes zx-fade-left-in {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zx-fade-left-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

/* 右滑淡入动画 */
.zx-fade-right-in {
  animation-name: zx-fade-right-in;
  animation-fill-mode: both;
}

.zx-fade-right-out {
  animation-name: zx-fade-right-out;
  animation-fill-mode: both;
}

@keyframes zx-fade-right-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zx-fade-right-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* 上滑动画 */
.zx-slide-up-in {
  animation-name: zx-slide-up-in;
  animation-fill-mode: both;
}

.zx-slide-up-out {
  animation-name: zx-slide-up-out;
  animation-fill-mode: both;
}

@keyframes zx-slide-up-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes zx-slide-up-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

/* 下滑动画 */
.zx-slide-down-in {
  animation-name: zx-slide-down-in;
  animation-fill-mode: both;
}

.zx-slide-down-out {
  animation-name: zx-slide-down-out;
  animation-fill-mode: both;
}

@keyframes zx-slide-down-in {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes zx-slide-down-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

/* 左滑动画 */
.zx-slide-left-in {
  animation-name: zx-slide-left-in;
  animation-fill-mode: both;
}

.zx-slide-left-out {
  animation-name: zx-slide-left-out;
  animation-fill-mode: both;
}

@keyframes zx-slide-left-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes zx-slide-left-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* 右滑动画 */
.zx-slide-right-in {
  animation-name: zx-slide-right-in;
  animation-fill-mode: both;
}

.zx-slide-right-out {
  animation-name: zx-slide-right-out;
  animation-fill-mode: both;
}

@keyframes zx-slide-right-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes zx-slide-right-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* 缩放动画 */
.zx-zoom-in {
  animation-name: zx-zoom-in;
  animation-fill-mode: both;
}

.zx-zoom-out {
  animation-name: zx-zoom-out;
  animation-fill-mode: both;
}

@keyframes zx-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zx-zoom-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.3);
  }
}

/* 缩小进入动画 */
.zx-zoom-out-in {
  animation-name: zx-zoom-out-in;
  animation-fill-mode: both;
}

.zx-zoom-out-out {
  animation-name: zx-zoom-out-out;
  animation-fill-mode: both;
}

@keyframes zx-zoom-out-in {
  from {
    opacity: 0;
    transform: scale(1.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zx-zoom-out-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.2);
  }
}

/* 自定义过渡类名 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
}

.slide-down-leave-to {
  transform: translateY(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>