<template>
  <view
    v-if="!hideOnSinglePage || pageCount > 1"
    class="zx-pagination"
    :class="{
      'zx-pagination--background': background,
      'zx-pagination--small': size === 'small',
      'zx-pagination--large': size === 'large',
      'is-disabled': disabled
    }"
  >
    <!-- 总数 -->
    <view v-if="layout.includes('total')" class="zx-pagination__total">
      {{ `共 ${total} 条` }}
    </view>
    
    <!-- 每页条数选择器 -->
    <!-- <view v-if="layout.includes('sizes')" class="zx-pagination__sizes">
      <zx-select
        v-model="innerPageSize"
        :disabled="disabled"
        :size="size"
        class="zx-pagination__size-select"
        @change="handleSizeChange"
      >
        <zx-option
          v-for="item in pageSizes"
          :key="item"
          :label="`${item}条/页`"
          :value="item"
        />
      </zx-select>
    </view> -->

    <!-- 上一页按钮 -->
    <view v-if="layout.includes('prev')" class="zx-pagination__btn-prev">
      <zx-button
        :disabled="disabled || innerCurrentPage <= 1"
        :size="size"
        :class="[
          'zx-pagination__btn',
          { 'is-disabled': disabled || innerCurrentPage <= 1 }
        ]"
        @click="prevPage"
      >
        <zx-icon name="arrow-left" :size="size === 'small' ? 12 : 14" />
        <text v-if="prevText">{{ prevText }}</text>
      </zx-button>
    </view>

    <!-- 页码列表 -->
    <view v-if="layout.includes('pager')" class="zx-pagination__pager">
      <!-- 第一页 -->
      <view
        class="zx-pagination__number"
        :class="{
          'is-active': innerCurrentPage === 1,
          'is-disabled': disabled
        }"
        @click="!disabled && changePage(1)"
      >
        1
      </view>

      <!-- 向前省略号 -->
      <view
        v-if="showPrevMore"
        class="zx-pagination__more zx-pagination__more-prev"
        :class="{ 'is-disabled': disabled }"
        @click="!disabled && onPrevMore"
      >
        <zx-icon name="more" :size="size === 'small' ? 12 : 14" />
      </view>

      <!-- 中间页码 -->
      <view
        v-for="pager in pagers"
        :key="pager"
        class="zx-pagination__number"
        :class="{
          'is-active': innerCurrentPage === pager,
          'is-disabled': disabled
        }"
        @click="!disabled && changePage(pager)"
      >
        {{ pager }}
      </view>

      <!-- 向后省略号 -->
      <view
        v-if="showNextMore"
        class="zx-pagination__more zx-pagination__more-next"
        :class="{ 'is-disabled': disabled }"
        @click="!disabled && onNextMore"
      >
        <zx-icon name="more" :size="size === 'small' ? 12 : 14" />
      </view>

      <!-- 最后一页 -->
      <view
        v-if="pageCount > 1"
        class="zx-pagination__number"
        :class="{
          'is-active': innerCurrentPage === pageCount,
          'is-disabled': disabled
        }"
        @click="!disabled && changePage(pageCount)"
      >
        {{ pageCount }}
      </view>
    </view>

    <!-- 下一页按钮 -->
    <view v-if="layout.includes('next')" class="zx-pagination__btn-next">
      <zx-button
        :disabled="disabled || innerCurrentPage >= pageCount"
        :size="size"
        :class="[
          'zx-pagination__btn',
          { 'is-disabled': disabled || innerCurrentPage >= pageCount }
        ]"
        @click="nextPage"
      >
        <text v-if="nextText">{{ nextText }}</text>
        <zx-icon name="arrow-right" :size="size === 'small' ? 12 : 14" />
      </zx-button>
    </view>

    <!-- 跳转 -->
    <view v-if="layout.includes('jumper')" class="zx-pagination__jumper">
      <text>前往</text>
      <zx-input
        v-model="jumpPage"
        type="number"
        :size="size"
        :disabled="disabled"
        class="zx-pagination__jump-input"
        @blur="handleJumpPage"
        @confirm="handleJumpPage"
      />
      <text>页</text>
    </view>

    <!-- 右对齐分隔符后的内容 -->
    <view v-if="layout.includes('->')" class="zx-pagination__right">
      <!-- 这里可以放置需要右对齐的元素 -->
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance, ref, computed, watch } from 'vue'
import ZxInput from '../zx-input/zx-input.vue'
import ZxButton from '../zx-button/zx-button.vue'
import ZxIcon from '../zx-icon/zx-icon.vue'
import ZxSelect from '../zx-select/zx-select.vue'

const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-pagination'

const emit = defineEmits([
  'update:currentPage',
  'update:pageSize', 
  'size-change',
  'current-change',
  'prev-click',
  'next-click',
  'change'
])

const props = defineProps({
  // 分页大小
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['large', 'default', 'small'].includes(value)
  },
  // 是否为分页按钮添加背景色
  background: {
    type: Boolean,
    default: false
  },
  // 每页显示条目个数
  pageSize: {
    type: Number,
    default: 10
  },
  // 每页默认的条目个数
  defaultPageSize: {
    type: Number,
    default: 10
  },
  // 总条目数
  total: {
    type: Number,
    default: 0
  },
  // 总页数，total 和 pageCount 设置任意一个就可以达到显示页码的功能
  pageCount: {
    type: Number,
    default: 0
  },
  // 设置最大页码按钮数
  pagerCount: {
    type: Number,
    default: 7,
    validator: (value) => value >= 5 && value % 2 === 1
  },
  // 当前页数
  currentPage: {
    type: Number,
    default: 1
  },
  // 当前页数的默认初始值
  defaultCurrentPage: {
    type: Number,
    default: 1
  },
  // 组件布局，子组件名用逗号分隔
  layout: {
    type: String,
    default: 'prev, pager, next, jumper, ->, total'
  },
  // 每页显示个数选择器的选项设置
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40, 50, 100]
  },
  // 替代图标显示的上一页文字
  prevText: {
    type: String,
    default: ''
  },
  // 替代图标显示的下一页文字
  nextText: {
    type: String,
    default: ''
  },
  // 是否禁用分页
  disabled: {
    type: Boolean,
    default: false
  },
  // 只有一页时是否隐藏
  hideOnSinglePage: {
    type: Boolean,
    default: false
  }
})

// 内部状态
const innerCurrentPage = ref(props.currentPage || props.defaultCurrentPage)
const innerPageSize = ref(props.pageSize || props.defaultPageSize)
const jumpPage = ref('')

// 计算总页数
const pageCount = computed(() => {
  if (props.pageCount) return props.pageCount
  return Math.ceil(props.total / innerPageSize.value) || 1
})

// 计算布局数组
const layoutArray = computed(() => {
  return props.layout.split(',').map(item => item.trim())
})

// 计算页码列表
const pagers = computed(() => {
  const pagerCount = props.pagerCount
  const halfPagerCount = (pagerCount - 1) / 2
  const currentPage = innerCurrentPage.value
  const totalPageCount = pageCount.value

  let showPrevMore = false
  let showNextMore = false

  if (totalPageCount > pagerCount) {
    if (currentPage > pagerCount - halfPagerCount) {
      showPrevMore = true
    }
    if (currentPage < totalPageCount - halfPagerCount) {
      showNextMore = true
    }
  }

  const array = []

  if (showPrevMore && !showNextMore) {
    const startPage = totalPageCount - (pagerCount - 2)
    for (let i = startPage; i < totalPageCount; i++) {
      array.push(i)
    }
  } else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  } else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i)
    }
  } else {
    for (let i = 2; i < totalPageCount; i++) {
      array.push(i)
    }
  }

  return array
})

// 是否显示向前省略号
const showPrevMore = computed(() => {
  const pagerCount = props.pagerCount
  const halfPagerCount = (pagerCount - 1) / 2
  return pageCount.value > pagerCount && innerCurrentPage.value > pagerCount - halfPagerCount
})

// 是否显示向后省略号
const showNextMore = computed(() => {
  const pagerCount = props.pagerCount
  const halfPagerCount = (pagerCount - 1) / 2
  return pageCount.value > pagerCount && innerCurrentPage.value < pageCount.value - halfPagerCount
})

// 监听外部传入的 currentPage 变化
watch(() => props.currentPage, (newVal) => {
  if (newVal !== innerCurrentPage.value) {
    innerCurrentPage.value = newVal
  }
})

// 监听外部传入的 pageSize 变化
watch(() => props.pageSize, (newVal) => {
  if (newVal !== innerPageSize.value) {
    innerPageSize.value = newVal
  }
})

// 方法
const changePage = (page) => {
  if (page === innerCurrentPage.value) return
  
  const oldPage = innerCurrentPage.value
  innerCurrentPage.value = page
  
  emit('update:currentPage', page)
  emit('current-change', page)
  emit('change', page, innerPageSize.value)
}

const prevPage = () => {
  if (innerCurrentPage.value <= 1) return
  
  const newPage = innerCurrentPage.value - 1
  changePage(newPage)
  emit('prev-click', newPage)
}

const nextPage = () => {
  if (innerCurrentPage.value >= pageCount.value) return
  
  const newPage = innerCurrentPage.value + 1
  changePage(newPage)
  emit('next-click', newPage)
}

const onPrevMore = () => {
  const newPage = Math.max(1, innerCurrentPage.value - props.pagerCount + 2)
  changePage(newPage)
}

const onNextMore = () => {
  const newPage = Math.min(pageCount.value, innerCurrentPage.value + props.pagerCount - 2)
  changePage(newPage)
}

const handleSizeChange = (newSize) => {
  if (newSize === innerPageSize.value) return
  
  const oldPageSize = innerPageSize.value
  innerPageSize.value = newSize
  
  // 计算新的当前页数
  const newCurrentPage = Math.ceil((innerCurrentPage.value - 1) * oldPageSize / newSize) + 1
  
  emit('update:pageSize', newSize)
  emit('size-change', newSize)
  
  if (newCurrentPage !== innerCurrentPage.value) {
    innerCurrentPage.value = newCurrentPage
    emit('update:currentPage', newCurrentPage)
    emit('current-change', newCurrentPage)
  }
  
  emit('change', innerCurrentPage.value, newSize)
}

const handleJumpPage = (e) => {
  // 确保 jumpPage 存在且已初始化
  if (!jumpPage || jumpPage.value === undefined || jumpPage.value === null) {
    return
  }
  
  // 如果输入为空，直接返回
  if (jumpPage.value === '') {
    return
  }
  
  const page = parseInt(jumpPage.value)
  if (isNaN(page) || page < 1 || page > pageCount.value) {
    jumpPage.value = ''
    return
  }
  
  changePage(page)
  jumpPage.value = ''
}
</script>

<style lang="scss" scoped>
.zx-pagination {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #606266;
  line-height: 1;
  gap: 16rpx;
  flex-wrap: wrap;

  &.is-disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &--small {
    font-size: 24rpx;
    gap: 12rpx;

    .zx-pagination__number,
    .zx-pagination__more {
      width: 56rpx;
      height: 56rpx;
      font-size: 24rpx;
    }
  }

  &--large {
    font-size: 32rpx;
    gap: 20rpx;

    .zx-pagination__number,
    .zx-pagination__more {
      width: 72rpx;
      height: 72rpx;
      font-size: 32rpx;
    }
  }

  &--background {
    .zx-pagination__number {
      background-color: #f4f4f5;
      
      &.is-active {
        background-color: #409eff;
        color: #fff;
      }
    }

    .zx-pagination__more {
      background-color: #f4f4f5;
    }
  }

  &__total {
    color: #606266;
    font-weight: 400;
  }

  &__sizes {
    .zx-pagination__size-select {
      min-width: 200rpx;
    }
  }

  &__btn {
    min-width: auto;
    padding: 0 16rpx;
    
    &.is-disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__pager {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }

  &__number,
  &__more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    min-width: 64rpx;
    border-radius: 8rpx;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    border: 2rpx solid transparent;

    &:hover:not(.is-disabled):not(.is-active) {
      color: #409eff;
    }

    &.is-active {
      color: #409eff;
      font-weight: 700;
    }

    &.is-disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  &__more {
    color: #c0c4cc;

    &:hover:not(.is-disabled) {
      color: #409eff;
    }
  }

  &__jumper {
    display: flex;
    align-items: center;
    gap: 12rpx;
    color: #606266;

    .zx-pagination__jump-input {
      width: 100rpx;
      text-align: center;
    }
  }

  &__right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16rpx;
  }
}
</style>
