<template>
  <view class="zx-anchor" :class="[type, direction]">
    <view ref="wrapperRef" class="zx-anchor-wrapper">
      <view v-if="showMarker && type === 'default'" class="zx-anchor-marker" :style="{ top: `${markerPos}px` }"></view>
      <view class="zx-anchor-line" v-if="type === 'default'"></view>
      <view v-if="type === 'underline'" class="zx-anchor-ink">
        <span v-if="showMarker" class="zx-anchor-ink-ball" :style="inkStyle"></span>
      </view>
      <view class="zx-anchor-content">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch, nextTick, provide } from 'vue'

const props = defineProps({
  container: {
    type: [String, Object],
    default: null
  },
  offset: {
    type: Number,
    default: 0
  },
  bound: {
    type: Number,
    default: 15
  },
  duration: {
    type: Number,
    default: 300
  },
  marker: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'underline'].includes(val)
  },
  direction: {
    type: String,
    default: 'vertical',
    validator: (val) => ['horizontal', 'vertical'].includes(val)
  },
  selectScrollTop: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change', 'click'])

const links = ref([])
const animating = ref(false)
const currentLink = ref('')
const showMarker = ref(props.marker)
const markerPos = ref(0)
const scrollContainer = ref(null)
const wrapperRef = ref(null)
const inkStyle = reactive({
  left: '0',
  width: '0',
  transform: 'translateX(0)'
})

// 获取滚动容器
function getScrollContainer() {
  if (props.container) {
    if (typeof props.container === 'string') {
      // 在uniapp中，不直接使用document.querySelector
      // 这里需要根据具体情况进行处理，如果是页面内滚动容器，可以使用uni.createSelectorQuery
      return uni.createSelectorQuery().select(props.container).node
    } else if (
      props.container === window
    ) {
      return props.container
    }
  }
  return window
}

// 注册滚动事件
function registerScrollEvent() {
  if (scrollContainer.value) {
    if (scrollContainer.value === window) {
      uni.onWindowResize(() => handleScroll())
      // 监听页面滚动
      uni.onPageScroll(() => handleScroll())
    } else {
      // 如果是自定义容器，可以通过组件的方式监听滚动
      // 在实际应用中可能需要更复杂的处理
      scrollContainer.value.addEventListener('scroll', handleScroll)
    }
  }
}

// 移除滚动事件
function removeScrollEvent() {
  if (scrollContainer.value) {
    if (scrollContainer.value === window) {
      uni.offWindowResize(() => handleScroll())
      // 取消页面滚动监听
      uni.offPageScroll(() => handleScroll())
    } else {
      scrollContainer.value.removeEventListener('scroll', handleScroll)
    }
  }
}

// 获取滚动容器的滚动高度
function getScrollTop() {
  if (scrollContainer.value === window) {
    // 在uniapp中获取页面滚动位置
    let scrollTop = 0
    const pages = getCurrentPages()
    if (pages.length > 0) {
      const page = pages[pages.length - 1]
      scrollTop = page.$getPageScrollTop ? page.$getPageScrollTop() : 0
    }
    return scrollTop
  }
  return scrollContainer.value.scrollTop
}

// 获取容器高度
function getContainerHeight() {
  if (scrollContainer.value === window) {
    // 获取系统信息中的窗口高度
    const systemInfo = uni.getWindowInfo()
    return systemInfo.windowHeight
  }
  return scrollContainer.value.clientHeight
}

// 通过uni选择器获取元素信息
function getElementInfo(selector) {
  return new Promise((resolve) => {
    uni.createSelectorQuery()
      .select(selector)
      .boundingClientRect(data => {
        resolve(data)
      })
      .exec()
  })
}

// 获取元素距离顶部的距离
async function getOffsetTop(id) {
  if (typeof id === 'string') {
    // 如果是ID，通过选择器获取元素
    const data = await getElementInfo(`#${id}`)
    if (data) {
      return data.top - props.offset
    }
    return 0
  } else {
    // 如果已经是元素信息对象
    return id.top - props.offset
  }
}

// 更新标记位置
function updateMarkerPosition() {
  if (!showMarker.value || !currentLink.value) return

  const currentLinkElem = links.value.find(link => link.href === currentLink.value)
  if (!currentLinkElem) return

  // 查找对应元素并获取位置信息
  const selector = currentLinkElem.href.slice(1)
  uni.createSelectorQuery()
    .select(`#${selector}`)
    .boundingClientRect(data => {
      if (!data) return

      if (props.type === 'default') {
        if (props.direction === 'vertical') {
          markerPos.value = data.top + data.height / 2 - 8
        }
        // 水平模式下不处理标记
      } else if (props.type === 'underline') {
        if (props.direction === 'horizontal') {
          inkStyle.left = `${data.left}px`
          inkStyle.width = `${data.width}px`
        } else {
          inkStyle.top = `${data.top}px`
          inkStyle.height = `${data.height}px`
          inkStyle.transform = 'translateY(0)'
        }
      }
    })
    .exec()
}

// 缓动函数
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// 滚动到指定锚点
async function scrollTo(href) {
  if (!href) return

  const selector = href.slice(1)
  const data = await getElementInfo(`#${selector}`)
  if (!data) return

  animating.value = true

  const targetTop = data.top - props.offset
  const startTop = getScrollTop()
  const distance = targetTop - startTop
  const startTime = Date.now()

  const frameFunc = () => {
    const progress = (Date.now() - startTime) / props.duration

    if (progress < 1) {
      const easeProgress = easeInOutCubic(progress)
      const scrollTop = startTop + distance * easeProgress

      if (scrollContainer.value === window) {
        uni.pageScrollTo({
          scrollTop,
          duration: 0
        })
      } else {
        scrollContainer.value.scrollTop = scrollTop
      }

      setTimeout(frameFunc, 16)
    } else {
      if (scrollContainer.value === window) {
        uni.pageScrollTo({
          scrollTop: targetTop,
          duration: 0
        })
      } else {
        scrollContainer.value.scrollTop = targetTop
      }

      animating.value = false
      currentLink.value = href
      emit('change', href)
      updateMarkerPosition()
    }
  }

  frameFunc()
}

// 处理滚动事件
function handleScroll() {
  if (animating.value) return

  if (!links.value.length) return

  // 获取所有锚点对应的DOM元素
  Promise.all(links.value.map(async link => {
    const href = link.href
    const selector = href.slice(1)
    const target = await getElementInfo(`#${selector}`)
    return {
      link,
      target
    }
  })).then(targets => {
    // 过滤掉没有找到的目标
    const validTargets = targets.filter(item => item.target)
    
    if (!validTargets.length) return

    // 获取当前视口位置
    const scrollTop = getScrollTop()
    const containerHeight = getContainerHeight()

    // 找到当前最符合条件的锚点
    let newCurrentLink = ''

    // 检查是否有完全进入视口的目标
    for (let i = 0; i < validTargets.length; i++) {
      const { link, target } = validTargets[i]
      const targetTop = target.top

      if (targetTop >= scrollTop && targetTop <= scrollTop + containerHeight) {
        newCurrentLink = link.href
        break
      }
    }

    // 如果没有找到，找最近的一个
    if (!newCurrentLink) {
      let minDistance = Number.MAX_VALUE
      let closestLink = ''

      for (let i = 0; i < validTargets.length; i++) {
        const { link, target } = validTargets[i]
        const targetTop = target.top
        const distance = Math.abs(targetTop - scrollTop)

        if (distance < minDistance) {
          minDistance = distance
          closestLink = link.href
        }
      }

      newCurrentLink = closestLink
    }

    if (currentLink.value !== newCurrentLink) {
      currentLink.value = newCurrentLink
      emit('change', newCurrentLink)
      updateMarkerPosition()
    }
  })
}

// 处理锚点点击
function handleLinkClick(href, e) {
  emit('click', e)
  if (!e.defaultPrevented) {
    e.preventDefault()
    scrollTo(href)
  }
}

// 注册锚点链接
function registerLink(link) {
  links.value.push(link)
  handleScroll()
}

// 注销锚点链接
function unregisterLink(link) {
  const index = links.value.indexOf(link)
  if (index !== -1) {
    links.value.splice(index, 1)
  }
}

// 监听 marker 属性变化
watch(() => props.marker, (val) => {
  showMarker.value = val
})

// 监听 currentLink 变化
watch(currentLink, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    links.value.forEach(link => {
      link.updateActiveStatus()
    })
  }
})

// 组件挂载后初始化
onMounted(() => {
  nextTick(() => {
    scrollContainer.value = getScrollContainer()
    registerScrollEvent()
    handleScroll()
  })
})

// 组件销毁前清理
onBeforeUnmount(() => {
  removeScrollEvent()
})

// 提供给子组件的上下文
provide('zxAnchor', {
  currentLink,
  registerLink,
  unregisterLink,
  handleLinkClick
})
</script>

<style>
.zx-anchor {
  position: relative;
  display: flex;
}

.zx-anchor.vertical {
  flex-direction: column;
}

.zx-anchor.horizontal {
  flex-direction: row;
}

.zx-anchor-wrapper {
  position: relative;
  display: flex;
}

.zx-anchor.vertical .zx-anchor-wrapper {
  flex-direction: row;
}

.zx-anchor.horizontal .zx-anchor-wrapper {
  flex-direction: column;
  width: 100%;
}

.zx-anchor-marker {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: var(--el-color-primary, #409eff);
  left: -8px;
  z-index: 1;
  transition: top 0.3s ease-in-out;
}

.zx-anchor-line {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #e8e8e8;
  left: 0;
}

.zx-anchor.horizontal .zx-anchor-line {
  width: 100%;
  height: 2px;
  top: 0;
  left: 0;
}

.zx-anchor-content {
  padding-left: 16px;
}

.zx-anchor.horizontal .zx-anchor-content {
  padding-left: 0;
  padding-top: 8px;
  display: flex;
}

/* 下划线类型样式 */
.zx-anchor.underline .zx-anchor-ink {
  position: absolute;
  background-color: transparent;
}

.zx-anchor.vertical.underline .zx-anchor-ink {
  right: 0;
  top: 0;
  height: 100%;
  width: 3px;
}

.zx-anchor.horizontal.underline .zx-anchor-ink {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
}

.zx-anchor-ink-ball {
  position: absolute;
  display: inline-block;
  background-color: var(--el-color-primary, #409eff);
  transition: all 0.3s ease-in-out;
}

.zx-anchor.vertical.underline .zx-anchor-ink-ball {
  width: 3px;
}

.zx-anchor.horizontal.underline .zx-anchor-ink-ball {
  height: 3px;
}
</style>
