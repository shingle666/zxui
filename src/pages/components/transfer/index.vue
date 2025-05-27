<template>
  <view class="demo-transfer">
    <view class="demo-block">
      <text class="demo-title">基础用法</text>
      <zx-transfer v-model="value1" :data="data1" left-title="待选" right-title="已选" />
    </view>

    <view class="demo-block">
      <text class="demo-title">可搜索</text>
      <zx-transfer v-model="value2" :data="data2" filterable left-title="待选" right-title="已选" filter-placeholder="搜索..." />
    </view>

    <view class="demo-block">
      <text class="demo-title">字段别名</text>
      <zx-transfer
        v-model="value3"
        :data="data3"
        :props="{ key: 'id', label: 'desc', disabled: 'disable' }"
        left-title="源列表"
        right-title="目标列表"
      />
    </view>

    <view class="demo-block">
      <text class="demo-title">自定义内容</text>
      <zx-transfer v-model="value4" :data="data4">
        <template #option="{ option }">
          <view style="display: flex; align-items: center;">
            <text style="font-weight: bold; margin-right: 8rpx;">{{ option.label }}</text>
            <text v-if="option.disabled" style="color: #f56c6c; font-size: 22rpx;">(禁用)</text>
          </view>
        </template>
        <template #left-footer>
          <text style="color: #909399;">左侧底部自定义</text>
        </template>
        <template #right-footer>
          <text style="color: #909399;">右侧底部自定义</text>
        </template>
      </zx-transfer>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxTransfer from '@/components/zx-transfer/zx-transfer.vue'

// 基础用法
const data1 = ref([
  { key: 1, label: '选项一' },
  { key: 2, label: '选项二' },
  { key: 3, label: '选项三', disabled: true },
  { key: 4, label: '选项四' },
  { key: 5, label: '选项五' }
])
const value1 = ref([2])

// 可搜索
const data2 = ref([
  { key: 1, label: '苹果' },
  { key: 2, label: '香蕉' },
  { key: 3, label: '橙子' },
  { key: 4, label: '葡萄', disabled: true },
  { key: 5, label: '西瓜' },
  { key: 6, label: '柠檬' }
])
const value2 = ref([])

// 字段别名
const data3 = ref([
  { id: 1, desc: 'A选项', disable: false },
  { id: 2, desc: 'B选项', disable: true },
  { id: 3, desc: 'C选项', disable: false }
])
const value3 = ref([1])

// 自定义内容
const data4 = ref([
  { key: 1, label: '自定义1' },
  { key: 2, label: '自定义2', disabled: true },
  { key: 3, label: '自定义3' }
])
const value4 = ref([])
</script>

<style scoped>
.demo-transfer {
  padding: 24rpx;
}
.demo-block {
  margin-bottom: 48rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
  padding: 24rpx;
}
.demo-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
  display: block;
}
</style>
