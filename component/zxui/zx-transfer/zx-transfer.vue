<template>
  <view class="zx-transfer">
    <view class="zx-transfer__panel">
      <view class="zx-transfer__header">
        <text>{{ leftTitle }}</text>
        <text class="zx-transfer__count">{{ leftChecked.length }}/{{ leftData.length }}</text>
      </view>
      <view v-if="filterable" class="zx-transfer__filter">
        <zx-input
          v-model="leftQuery"
          type="text"
          :placeholder="filterPlaceholder"
          @input="onLeftFilter"
          clearable
        />
      </view>
      <scroll-view scroll-y class="zx-transfer__list">
        <view
          v-for="item in leftFilteredData"
          :key="item[keyProp]"
          class="zx-transfer__item"
          :class="{ 'is-disabled': item[disabledProp], 'is-checked': leftChecked.includes(item[keyProp]) }"
          @tap="onLeftCheck(item)"
        >
          <slot name="option" :option="item">
            <text>{{ item[labelProp] }}</text>
          </slot>
        </view>
        <view v-if="leftFilteredData.length === 0" class="zx-transfer__empty">
          <slot name="left-empty">{{ emptyText }}</slot>
        </view>
      </scroll-view>
      <view class="zx-transfer__footer">
        <slot name="left-footer"></slot>
      </view>
    </view>
    <view class="zx-transfer__buttons">
      <zx-icon name="arrow-double-right" class="zx-transfer__btn" :class="{ 'is-disabled': leftChecked.length === 0 }" @tap="leftChecked.length === 0 ? null : moveToRight()"></zx-icon>
      <zx-icon name="arrow-double-left" class="zx-transfer__btn" :class="{ 'is-disabled': rightChecked.length === 0 }" @tap="rightChecked.length === 0 ? null : moveToLeft()"></zx-icon>
    </view>
    <view class="zx-transfer__panel">
      <view class="zx-transfer__header">
        <text>{{ rightTitle }}</text>
        <text class="zx-transfer__count">{{ rightChecked.length }}/{{ rightData.length }}</text>
      </view>
      <view v-if="filterable" class="zx-transfer__filter">
        <zx-input
          v-model="rightQuery"
          type="text"
          :placeholder="filterPlaceholder"
          @input="onRightFilter"
          clearable
        />
      </view>
      <scroll-view scroll-y class="zx-transfer__list">
        <view
          v-for="item in rightFilteredData"
          :key="item[keyProp]"
          class="zx-transfer__item"
          :class="{ 'is-disabled': item[disabledProp], 'is-checked': rightChecked.includes(item[keyProp]) }"
          @tap="onRightCheck(item)"
        >
          <slot name="option" :option="item">
            <text>{{ item[labelProp] }}</text>
          </slot>
        </view>
        <view v-if="rightFilteredData.length === 0" class="zx-transfer__empty">
          <slot name="right-empty">{{ emptyText }}</slot>
        </view>
      </scroll-view>
      <view class="zx-transfer__footer">
        <slot name="right-footer"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'

// props 定义
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  filterable: {
    type: Boolean,
    default: false
  },
  filterPlaceholder: {
    type: String,
    default: '请输入搜索内容'
  },
  filterMethod: {
    type: Function,
    default: null
  },
  props: {
    type: Object,
    default: () => ({ key: 'key', label: 'label', disabled: 'disabled' })
  },
  leftTitle: {
    type: String,
    default: '列表1'
  },
  rightTitle: {
    type: String,
    default: '列表2'
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  leftDefaultChecked: {
    type: Array,
    default: () => []
  },
  rightDefaultChecked: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'left-check-change', 'right-check-change'])

// 字段别名
const keyProp = computed(() => props.props.key || 'key')
const labelProp = computed(() => props.props.label || 'label')
const disabledProp = computed(() => props.props.disabled || 'disabled')

// 左右两侧数据
const leftData = computed(() => {
  return props.data.filter(item => !props.modelValue.includes(item[keyProp.value]))
})
const rightData = computed(() => {
  return props.data.filter(item => props.modelValue.includes(item[keyProp.value]))
})

// 选中项
const leftChecked = ref([...props.leftDefaultChecked])
const rightChecked = ref([...props.rightDefaultChecked])

// 搜索相关
const leftQuery = ref('')
const rightQuery = ref('')

const leftFilteredData = computed(() => {
  if (!props.filterable || !leftQuery.value) return leftData.value
  if (props.filterMethod) {
    return leftData.value.filter(item => props.filterMethod(leftQuery.value, item))
  }
  return leftData.value.filter(item => String(item[labelProp.value]).toLowerCase().includes(leftQuery.value.toLowerCase()))
})
const rightFilteredData = computed(() => {
  if (!props.filterable || !rightQuery.value) return rightData.value
  if (props.filterMethod) {
    return rightData.value.filter(item => props.filterMethod(rightQuery.value, item))
  }
  return rightData.value.filter(item => String(item[labelProp.value]).toLowerCase().includes(rightQuery.value.toLowerCase()))
})

// 选中操作
function onLeftCheck(item) {
  if (item[disabledProp.value]) return
  const key = item[keyProp.value]
  const idx = leftChecked.value.indexOf(key)
  if (idx === -1) {
    leftChecked.value.push(key)
  } else {
    leftChecked.value.splice(idx, 1)
  }
  emit('left-check-change', leftChecked.value)
}
function onRightCheck(item) {
  if (item[disabledProp.value]) return
  const key = item[keyProp.value]
  const idx = rightChecked.value.indexOf(key)
  if (idx === -1) {
    rightChecked.value.push(key)
  } else {
    rightChecked.value.splice(idx, 1)
  }
  emit('right-check-change', rightChecked.value)
}

// 移动操作
function moveToRight() {
  const moveKeys = leftChecked.value.filter(key => {
    const item = leftData.value.find(i => i[keyProp.value] === key)
    return item && !item[disabledProp.value]
  })
  const newValue = [...props.modelValue, ...moveKeys]
  emit('update:modelValue', newValue)
  emit('change', newValue, 'right', moveKeys)
  leftChecked.value = []
}
function moveToLeft() {
  const moveKeys = rightChecked.value.filter(key => {
    const item = rightData.value.find(i => i[keyProp.value] === key)
    return item && !item[disabledProp.value]
  })
  const newValue = props.modelValue.filter(key => !moveKeys.includes(key))
  emit('update:modelValue', newValue)
  emit('change', newValue, 'left', moveKeys)
  rightChecked.value = []
}

// 搜索事件
function onLeftFilter(e) {
  leftQuery.value = e.detail.value || e.target.value || leftQuery.value
}
function onRightFilter(e) {
  rightQuery.value = e.detail.value || e.target.value || rightQuery.value
}

// v-model 同步
watch(() => props.modelValue, () => {
  // 清空选中项
  leftChecked.value = []
  rightChecked.value = []
})
</script>

<style scoped>
.zx-transfer {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
}
.zx-transfer__panel {
  flex: 1;
  min-width: 0;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin: 0 8rpx;
  display: flex;
  flex-direction: column;
  height: 480rpx;
}
.zx-transfer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx;
  font-weight: bold;
  font-size: 28rpx;
  border-bottom: 1px solid #ebeef5;
}
.zx-transfer__count {
  color: #909399;
  font-size: 24rpx;
}
.zx-transfer__filter {
  padding: 8rpx 16rpx;
}
.zx-transfer__input {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4rpx;
  padding: 8rpx 12rpx;
  font-size: 26rpx;
  background: #f5f7fa;
}
.zx-transfer__list {
  flex: 1;
  overflow-y: auto;
  padding: 0 8rpx;
}
.zx-transfer__item {
  display: flex;
  align-items: center;
  padding: 12rpx 8rpx;
  border-radius: 4rpx;
  margin: 4rpx 0;
  font-size: 26rpx;
  color: #606266;
  background: #fff;
  transition: background 0.2s;
}
.zx-transfer__item.is-disabled {
  color: #c0c4cc;
  background: #f5f7fa;
}
.zx-transfer__item.is-checked {
  background: #ecf5ff;
  color: #409eff;
}
.zx-transfer__empty {
  text-align: center;
  color: #c0c4cc;
  padding: 32rpx 0;
  font-size: 24rpx;
}
.zx-transfer__footer {
  padding: 8rpx 16rpx;
  border-top: 1px solid #ebeef5;
}
.zx-transfer__buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 8rpx;
}
.zx-transfer__btn {
  margin: 8rpx 0;
  padding: 8rpx 24rpx;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4rpx;
  font-size: 28rpx;
  opacity: 1;
}
.zx-transfer__btn:disabled {
  background: #dcdfe6;
  color: #fff;
  opacity: 0.7;
}
</style>
