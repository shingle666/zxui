<template>
  <view class="demo-tour">
    <button @tap="showTour = true">开始引导</button>
    <view class="demo-btns">
      <button id="btn1">上传</button>
      <button id="btn2" type="primary">保存</button>
      <button id="btn3">更多</button>
    </view>
    <zx-tour
      v-model="showTour"
      :steps="steps"
      :current="0"
      :showClose="true"
      :maskStyle="{ background: 'rgba(0,0,0,0.4)' }"
      @close="onClose"
      @finish="onFinish"
      @change="onChange"
    >
      <template #desc="{ step }">
        <view v-if="step && step.description">
          <text>{{ step.description }}</text>
        </view>
      </template>
    </zx-tour>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showTour = ref(false)
const steps = [
  {
    selector: '#btn1',
    title: '上传文件',
    description: '点击上传文件',
    placement: 'bottom',
    mask: true,
  },
  {
    selector: '#btn2',
    title: '保存',
    description: '点击保存更改',
    placement: 'right',
    mask: true,
  },
  {
    selector: '#btn3',
    title: '更多操作',
    description: '查看更多操作',
    placement: 'top',
    mask: false,
  },
  {
    title: '引导结束',
    description: '感谢您的体验',
    placement: 'center',
    mask: false,
  },
]

function onClose() {
  uni.showToast({ title: '引导已关闭', icon: 'none' })
}
function onFinish() {
  uni.showToast({ title: '引导完成', icon: 'success' })
}
function onChange(idx) {
  // 步骤切换
}
</script>

<style scoped>
.demo-tour {
  padding: 24px;
}
.demo-btns {
  display: flex;
  gap: 12px;
  margin: 24px 0;
}
</style> 