<template>
  <!-- #ifndef APP-NVUE -->
  <view v-show="isShow" ref="ani" :animation="animationData" :class="customClass" :style="transformStyles" @click="onClick">
    <slot></slot>
  </view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  <view v-if="isShow" ref="ani" :animation="animationData" :class="customClass" :style="transformStyles" @click="onClick">
    <slot></slot>
  </view>
  <!-- #endif -->
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, getCurrentInstance } from 'vue'

// #ifdef APP-NVUE
const nvueAnimation = uni.requireNativePlugin('animation')
// #endif

class MPAnimation {
  constructor(options, _this) {
    this.options = options
    // 在iOS10+QQ小程序平台下，传给原生的对象一定是个普通对象而不是Proxy对象，否则会报parameter should be Object instead of ProxyObject的错误
    this.animation = uni.createAnimation({
      ...options
    })
    this.currentStepAnimates = {}
    this.next = 0
    this.$ = _this
  }

  _nvuePushAnimates(type, args) {
    let aniObj = this.currentStepAnimates[this.next]
    let styles = {}
    if (!aniObj) {
      styles = {
        styles: {},
        config: {}
      }
    } else {
      styles = aniObj
    }
    if (animateTypes1.includes(type)) {
      if (!styles.styles.transform) {
        styles.styles.transform = ''
      }
      let unit = ''
      if (type === 'rotate') {
        unit = 'deg'
      }
      styles.styles.transform += `${type}(${args + unit}) `
    } else {
      styles.styles[type] = `${args}`
    }
    this.currentStepAnimates[this.next] = styles
  }

  _animateRun(styles = {}, config = {}) {
    let ref = this.$.$refs['ani'] && this.$.$refs['ani'].ref
    if (!ref) return
    return new Promise((resolve, reject) => {
      nvueAnimation.transition(ref, {
        styles,
        ...config
      }, res => {
        resolve()
      })
    })
  }

  _nvueNextAnimate(animates, step = 0, fn) {
    let obj = animates[step]
    if (obj) {
      let {
        styles,
        config
      } = obj
      this._animateRun(styles, config).then(() => {
        step += 1
        this._nvueNextAnimate(animates, step, fn)
      })
    } else {
      this.currentStepAnimates = {}
      typeof fn === 'function' && fn()
      this.isEnd = true
    }
  }

  step(config = {}) {
    // #ifndef APP-NVUE
    this.animation.step(config)
    // #endif
    // #ifdef APP-NVUE
    this.currentStepAnimates[this.next].config = Object.assign({}, this.options, config)
    this.currentStepAnimates[this.next].styles.transformOrigin = this.currentStepAnimates[this.next].config.transformOrigin
    this.next++
    // #endif
    return this
  }

  run(fn) {
    // #ifndef APP-NVUE
    this.$.animationData = this.animation.export()
    this.$.timer = setTimeout(() => {
      typeof fn === 'function' && fn()
    }, this.$.durationTime)
    // #endif
    // #ifdef APP-NVUE
    this.isEnd = false
    let ref = this.$.$refs['ani'] && this.$.$refs['ani'].ref
    if (!ref) return
    this._nvueNextAnimate(this.currentStepAnimates, 0, fn)
    this.next = 0
    // #endif
  }
}

// 支持的动画类型
const animateTypes1 = [
  'matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 
  'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 
  'skew', 'skewX', 'skewY', 
  'translate', 'translate3d', 'translateX', 'translateY', 'translateZ'
]
const animateTypes2 = ['opacity', 'backgroundColor']
const animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom']

// 为 MPAnimation 原型添加动画方法
animateTypes1.concat(animateTypes2, animateTypes3).forEach(type => {
  MPAnimation.prototype[type] = function(...args) {
    // #ifndef APP-NVUE
    this.animation[type](...args)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates(type, args)
    // #endif
    return this
  }
})

/**
 * 创建动画实例
 * @param {Object} option 动画配置
 * @param {Object} _this 组件实例
 * @returns {MPAnimation} 动画实例
 */
function createAnimation(option, _this) {
  if (!_this) return
  clearTimeout(_this.timer)
  return new MPAnimation(option, _this)
}

/**
 * ZxTransition 过渡动画组件
 * @description 基于 Vue 3 Composition API 的过渡动画组件，支持多种内置动画效果
 * @property {Boolean} show 控制组件显示或隐藏
 * @property {Array|String} modeClass 过渡动画类型
 * @property {Number} duration 过渡动画持续时间
 * @property {Object} styles 组件样式
 * @property {String} customClass 自定义类名
 * @property {Boolean} onceRender 是否只渲染一次
 */

// Props 定义
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  modeClass: {
    type: [Array, String],
    default: 'fade'
  },
  duration: {
    type: Number,
    default: 300
  },
  styles: {
    type: Object,
    default: () => ({})
  },
  customClass: {
    type: String,
    default: ''
  },
  onceRender: {
    type: Boolean,
    default: false
  }
})

// Emits 定义
const emit = defineEmits(['click', 'change'])

// 响应式数据
const isShow = ref(false)
const transform = ref('')
const opacity = ref(1)
const animationData = ref({})
const durationTime = ref(300)
const config = ref({})
const animation = ref(null)
const timer = ref(null)
const ani = ref(null)

// 计算属性
const stylesObject = computed(() => {
  const styles = {
    ...props.styles,
    'transition-duration': props.duration / 1000 + 's'
  }
  let transformStr = ''
  for (let i in styles) {
    const line = toLine(i)
    transformStr += line + ':' + styles[i] + ';'
  }
  return transformStr
})

const transformStyles = computed(() => {
  return 'transform:' + transform.value + ';' + 'opacity:' + opacity.value + ';' + stylesObject.value
})

// 方法定义
const init = (obj = {}) => {
  if (obj.duration) {
    durationTime.value = obj.duration
  }
  animation.value = createAnimation(Object.assign(config.value, obj), getComponentInstance())
}

const onClick = () => {
  emit('click', {
    detail: isShow.value
  })
}

const step = (obj, stepConfig = {}) => {
  if (!animation.value) return
  for (let i in obj) {
    try {
      if (typeof obj[i] === 'object') {
        animation.value[i](...obj[i])
      } else {
        animation.value[i](obj[i])
      }
    } catch (e) {
      console.error(`方法 ${i} 不存在`)
    }
  }
  animation.value.step(stepConfig)
  return {
    step: step,
    run: run
  }
}

const run = (fn) => {
  if (!animation.value) return
  animation.value.run(fn)
}

const animationType = (type) => {
  return {
    fade: type ? 0 : 1,
    'slide-top': `translateY(${type ? '0' : '-100%'})`,
    'slide-right': `translateX(${type ? '0' : '100%'})`,
    'slide-bottom': `translateY(${type ? '0' : '100%'})`,
    'slide-left': `translateX(${type ? '0' : '-100%'})`,
    'zoom-in': `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
    'zoom-out': `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
  }
}

const animationMode = () => {
  return {
    fade: 'opacity',
    'slide-top': 'translateY',
    'slide-right': 'translateX',
    'slide-bottom': 'translateY',
    'slide-left': 'translateX',
    'zoom-in': 'scale',
    'zoom-out': 'scale'
  }
}

const styleInit = (type) => {
  const styles = {
    transform: ''
  }
  const buildStyle = (type, mode) => {
    if (mode === 'fade') {
      styles.opacity = animationType(type)[mode]
    } else {
      styles.transform += animationType(type)[mode] + ' '
    }
  }
  if (typeof props.modeClass === 'string') {
    buildStyle(type, props.modeClass)
  } else {
    props.modeClass.forEach(mode => {
      buildStyle(type, mode)
    })
  }
  return styles
}

const tranfromInit = (type) => {
  const buildTranfrom = (type, mode) => {
    let aniNum = null
    if (mode === 'fade') {
      aniNum = type ? 0 : 1
    } else {
      aniNum = type ? '-100%' : '0'
      if (mode === 'zoom-in') {
        aniNum = type ? 0.8 : 1
      }
      if (mode === 'zoom-out') {
        aniNum = type ? 1.2 : 1
      }
      if (mode === 'slide-right') {
        aniNum = type ? '100%' : '0'
      }
      if (mode === 'slide-bottom') {
        aniNum = type ? '100%' : '0'
      }
    }
    animation.value[animationMode()[mode]](aniNum)
  }
  if (typeof props.modeClass === 'string') {
    buildTranfrom(type, props.modeClass)
  } else {
    props.modeClass.forEach(mode => {
      buildTranfrom(type, mode)
    })
  }
  return animation.value
}

const open = () => {
  clearTimeout(timer.value)
  transform.value = ''
  isShow.value = true
  const { opacity: opacityVal, transform: transformVal } = styleInit(false)
  if (typeof opacityVal !== 'undefined') {
    opacity.value = opacityVal
  }
  transform.value = transformVal
  
  nextTick(() => {
    timer.value = setTimeout(() => {
      animation.value = createAnimation(config.value, getComponentInstance())
      tranfromInit(false).step()
      animation.value.run(() => {
        transform.value = ''
        opacity.value = opacityVal || 1
      })
      emit('change', {
        detail: isShow.value
      })
    }, 20)
  })
}

const close = () => {
  if (!animation.value) return
  tranfromInit(true)
    .step()
    .run(() => {
      isShow.value = false
      animationData.value = null
      animation.value = null
      const { opacity: opacityVal, transform: transformVal } = styleInit(false)
      opacity.value = opacityVal || 1
      transform.value = transformVal
      emit('change', {
        detail: isShow.value
      })
    })
}

// 监听 show 属性变化
watch(() => props.show, (newVal) => {
  if (newVal) {
    open()
  } else {
    if (isShow.value) {
      close()
    }
  }
}, { immediate: true })

// 生命周期
onMounted(() => {
  config.value = {
    duration: props.duration,
    timingFunction: 'ease',
    transformOrigin: '50% 50%',
    delay: 0
  }
  durationTime.value = props.duration
})



const toLine = (name) => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

const getComponentInstance = () => {
  return {
    $refs: { ani: ani.value },
    animationData,
    durationTime,
    timer
  }
}

// 暴露方法给父组件
defineExpose({
  init,
  step,
  run
})
</script>

<style scoped>
/* 组件样式 */
</style>