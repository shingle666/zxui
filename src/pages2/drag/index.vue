<template>
  <view class="container">
    <view class="desc">支持 H5、App、微信/各类小程序，支持固定项、编辑模式、任意列数，拖拽流畅不卡顿。</view>
    <zx-drag
      v-model:listData="dragList"
      :columns="columns"
      :itemHeight="itemHeight"
      :isEdit="isEdit"
      @sortend="onSortEnd"
      @change="onChange"
    >
      <template #default="{ entity, isEdit, fixed }">
        <view class="drag-item" :class="{ fixed }">
          <text>{{ entity.name }}</text>
          <text v-if="fixed" class="fixed-label">固定</text>
          <text v-if="isEdit" class="edit-label">可拖拽</text>
        </view>
      </template>
    </zx-drag>
    <view class="btns">
      <button @click="toggleEdit">{{ isEdit ? '完成' : '编辑' }}</button>
      <button @click="addItem">添加项</button>
      <button @click="resetList">重置</button>
    </view>
    <view class="tips">
      <text>拖拽排序支持：</text>
      <text>1. 固定项不可拖动</text>
      <text>2. 编辑模式下才可拖拽</text>
      <text>3. 支持多列布局</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const isEdit = ref(true)
const columns = ref(3)
const itemHeight = ref(120)
const originList = [
  { id: 1, name: '模块一', fixed: false },
  { id: 2, name: '模块二', fixed: false },
  { id: 3, name: '模块三', fixed: true },
  { id: 4, name: '模块四', fixed: false },
  { id: 5, name: '模块五', fixed: false },
  { id: 6, name: '模块六', fixed: false }
]
const dragList = ref([...originList])

function toggleEdit() {
  isEdit.value = !isEdit.value
}
function addItem() {
  dragList.value.push({ id: Date.now(), name: '新模块' + (dragList.value.length + 1), fixed: false })
}
function resetList() {
  dragList.value = [...originList]
}
function onSortEnd(e) {
  uni.showToast({ title: '排序结束', icon: 'none' })
  console.log('排序结束', e.listData)
}
function onChange(e) {
  // 拖拽中顺序变化事件
  console.log('顺序变化', e.listData)
}
</script>

<style scoped>
.container {
  padding: 32rpx;
}
.desc {
  color: #888;
  font-size: 26rpx;
  margin-bottom: 16rpx;
}
.drag-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 12rpx;
  margin: 8rpx;
  height: 100rpx;
  font-size: 32rpx;
  position: relative;
  border: 1rpx solid #eee;
}
.drag-item.fixed {
  background: #e0e0e0;
  color: #aaa;
}
.fixed-label {
  position: absolute;
  right: 8rpx;
  top: 8rpx;
  font-size: 20rpx;
  color: #ff9800;
}
.edit-label {
  position: absolute;
  left: 8rpx;
  top: 8rpx;
  font-size: 20rpx;
  color: #2196f3;
}
.btns {
  display: flex;
  gap: 16rpx;
  margin: 32rpx 0 0 0;
}
.tips {
  margin-top: 32rpx;
  color: #999;
  font-size: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}
</style> 