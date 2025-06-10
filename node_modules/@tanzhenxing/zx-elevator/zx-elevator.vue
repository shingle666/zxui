<template>
  <view class="zx-elevator" :style="customStyle">
    <!-- 主列表区域 -->
    <scroll-view class="zx-elevator__list" :scroll-top="scrollTop" :scroll-y="true" :scroll-with-animation="true"
      :style="{ height: isNaN(+height) ? height : `${height}px` }" @scroll="onScroll">
      <view class="zx-elevator__list-wrapper">
        <view v-for="(item, index) in indexList" :key="item[acceptKey]" :id="`elevator-item-${index}`"
          class="zx-elevator__list-item">
          <!-- 分类标题 -->
          <view class="zx-elevator__list-item__title">
            {{ item[acceptKey] }}
          </view>
          <!-- 分类内容 -->
          <view v-for="subItem in item.list" :key="subItem.id" class="zx-elevator__list-item__content" :class="{
            'zx-elevator__list-item__content--active': currentData.id === subItem.id && currentKey === item[acceptKey]
          }" @click="handleClickItem(item[acceptKey], subItem)">
            <slot v-if="$slots.default" :item="subItem" />
            <text v-else>{{ subItem.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 吸顶标题 -->
    <view v-if="isSticky && scrollY > 0" class="zx-elevator__sticky-title">
      {{ indexList[currentIndex] && indexList[currentIndex][acceptKey] }}
    </view>

    <!-- 当前选中的索引提示 -->
    <view v-if="showCurrentIndex" class="zx-elevator__current-index">
      {{ indexList[touchIndex] && indexList[touchIndex][acceptKey] }}
    </view>

    <!-- 右侧索引导航 -->
    <view class="zx-elevator__sidebar" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
      <view v-for="(item, index) in indexList" :key="item[acceptKey]" class="zx-elevator__sidebar-item" :class="{
        'zx-elevator__sidebar-item--active': index === currentIndex
      }" :data-index="index" @click="handleClickIndex(item[acceptKey], index)">
        {{ item[acceptKey] }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, watch } from 'vue'

// Props 定义
const props = defineProps({
  // 电梯区域的高度
  height: {
    type: [String, Number],
    default: '200px'
  },
  // 索引 key 值
  acceptKey: {
    type: String,
    default: 'title'
  },
  // 索引列表
  indexList: {
    type: Array,
    default: () => []
  },
  // 索引是否吸顶
  isSticky: {
    type: Boolean,
    default: false
  },
  // 右侧锚点的上下间距
  spaceHeight: {
    type: Number,
    default: 23
  },
  // 左侧索引的高度
  titleHeight: {
    type: Number,
    default: 35
  },
  // 自定义样式
  customStyle: {
    type: [String, Object],
    default: ''
  }
})

// Emits 定义
const emit = defineEmits(['clickItem', 'clickIndex', 'change'])

// 响应式数据
const scrollTop = ref(0)
const scrollY = ref(0)
const currentIndex = ref(0)
const touchIndex = ref(0)
const showCurrentIndex = ref(false)
const currentData = ref({})
const currentKey = ref('')
const listHeight = ref([])
const touchState = reactive({
  y1: 0,
  y2: 0,
  startIndex: 0
})

// 计算属性
const itemHeights = computed(() => {
  return listHeight.value
})

// 方法
const calculateHeight = async () => {
  await nextTick()
  const heights = [0]
  let totalHeight = 0

  try {
    for (let i = 0; i < props.indexList.length; i++) {
      const query = uni.createSelectorQuery()
      const rect = await new Promise((resolve) => {
        query.select(`#elevator-item-${i}`).boundingClientRect(resolve).exec()
      })

      if (rect) {
        totalHeight += rect.height
        heights.push(totalHeight)
      }
    }
    listHeight.value = heights
  } catch (error) {
    console.error('计算高度失败:', error)
  }
}

const scrollTo = (index) => {
  if (index < 0) index = 0
  if (index >= listHeight.value.length - 1) index = listHeight.value.length - 2

  scrollTop.value = listHeight.value[index]
  currentIndex.value = index
}

const onScroll = (e) => {
  const { scrollTop: top } = e.detail
  scrollY.value = top

  // 计算当前应该高亮的索引
  const heights = listHeight.value
  for (let i = 0; i < heights.length - 1; i++) {
    const height1 = heights[i]
    const height2 = heights[i + 1]

    if (top >= height1 && top < height2) {
      if (currentIndex.value !== i) {
        currentIndex.value = i
        emit('change', i)
      }
      break
    }
  }
}

const onTouchStart = (e) => {
  showCurrentIndex.value = true
  const touch = e.touches[0]
  touchState.y1 = touch.pageY

  const target = e.target
  const index = parseInt(target.dataset.index || '0')
  touchState.startIndex = index
  touchIndex.value = index
  scrollTo(index)
}

const onTouchMove = (e) => {
  const touch = e.touches[0]
  touchState.y2 = touch.pageY

  const delta = Math.floor((touchState.y2 - touchState.y1) / props.spaceHeight)
  const newIndex = touchState.startIndex + delta

  if (newIndex >= 0 && newIndex < props.indexList.length) {
    touchIndex.value = newIndex
    scrollTo(newIndex)
  }
}

const onTouchEnd = () => {
  showCurrentIndex.value = false
}

const handleClickItem = (key, item) => {
  currentData.value = item
  currentKey.value = key
  emit('clickItem', key, item)
}

const handleClickIndex = (key, index) => {
  scrollTo(index)
  emit('clickIndex', key)
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    calculateHeight()
  })
})

// 监听 indexList 变化
watch(
  () => props.indexList,
  () => {
    nextTick(() => {
      calculateHeight()
    })
  },
  { deep: true }
)

// 暴露方法
defineExpose({
  scrollTo
})
</script>

<style lang="scss" scoped>
.zx-elevator {
  position: relative;
  width: 100%;
  background-color: #fff;

  &__list {
    position: relative;
    width: 100%;
    overflow: hidden;

    &-wrapper {
      position: relative;
    }

    &-item {
      &__title {
        position: relative;
        display: flex;
        align-items: center;
        height: 35px;
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
        background-color: #f5f5f5;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #e5e5e5;
        }
      }

      &__content {
        display: flex;
        align-items: center;
        min-height: 30px;
        padding: 0 20px;
        font-size: 12px;
        color: #333;
        border-bottom: 1px solid #f5f5f5;
        transition: background-color 0.2s;

        &:active {
          background-color: #f5f5f5;
        }

        &--active {
          color: #007aff;
          background-color: #f0f9ff;
        }
      }
    }
  }

  &__sticky-title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    color: #007aff;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__current-index {
    position: absolute;
    top: 50%;
    right: 60px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    font-size: 16px;
    color: #333;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-50%);
  }

  &__sidebar {
    position: absolute;
    top: 50%;
    right: 8px;
    z-index: 15;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    background-color: #eeeff2;
    border-radius: 6px;
    transform: translateY(-50%);

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      padding: 3px;
      font-size: 10px;
      color: #666;
      transition: color 0.2s;

      &--active {
        color: #007aff;
        font-weight: 500;
      }

      &:active {
        background-color: rgba(0, 122, 255, 0.1);
        border-radius: 2px;
      }
    }
  }
}
</style>