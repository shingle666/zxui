<template>
  <view class="page-container">
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-desc">滚动到底部自动加载更多数据</view>
      <view class="demo-content">
        <zx-infinite-loading 
          :status="basicStatus" 
          @load="onBasicLoad"
          @retry="onBasicRetry"
        >
          <view v-for="item in basicList" :key="item.id" class="list-item">
            <view class="item-avatar">{{ item.id }}</view>
            <view class="item-content">
              <view class="item-title">{{ item.name }}</view>
              <view class="item-desc">{{ item.desc }}</view>
            </view>
          </view>
        </zx-infinite-loading>
      </view>
    </view>

    <!-- 自定义文本 -->
    <view class="demo-section">
      <view class="demo-title">自定义文本</view>
      <view class="demo-desc">自定义加载状态的提示文本</view>
      <view class="demo-content">
        <zx-infinite-loading 
          :status="customTextStatus"
          loading-text="正在加载更多..."
          error-text="网络异常，轻触重试"
          complete-text="已经到底了~"
          @load="onCustomTextLoad"
          @retry="onCustomTextRetry"
        >
          <view v-for="item in customTextList" :key="item.id" class="list-item">
            <view class="item-avatar">{{ item.id }}</view>
            <view class="item-content">
              <view class="item-title">{{ item.name }}</view>
              <view class="item-desc">{{ item.desc }}</view>
            </view>
          </view>
        </zx-infinite-loading>
      </view>
    </view>

    <!-- 自定义加载状态 -->
    <view class="demo-section">
      <view class="demo-title">自定义加载状态</view>
      <view class="demo-desc">使用插槽自定义各种状态的显示</view>
      <view class="demo-content">
        <zx-infinite-loading 
          :status="customStatus" 
          @load="onCustomLoad"
          @retry="onCustomRetry"
        >
          <view v-for="item in customList" :key="item.id" class="list-item">
            <view class="item-avatar">{{ item.id }}</view>
            <view class="item-content">
              <view class="item-title">{{ item.name }}</view>
              <view class="item-desc">{{ item.desc }}</view>
            </view>
          </view>
          
          <!-- 自定义加载中状态 -->
          <template #loading>
            <view class="custom-loading">
              <view class="loading-spinner">
                <view class="spinner-dot"></view>
                <view class="spinner-dot"></view>
                <view class="spinner-dot"></view>
              </view>
              <text class="loading-text">🚀 正在努力加载中...</text>
            </view>
          </template>
          
          <!-- 自定义错误状态 -->
          <template #error="{ retry }">
            <view class="custom-error" @click="retry">
              <text class="error-icon">😵</text>
              <text class="error-text">加载失败了</text>
              <text class="error-retry">点击重新加载</text>
            </view>
          </template>
          
          <!-- 自定义完成状态 -->
          <template #complete>
            <view class="custom-complete">
              <text class="complete-icon">🎉</text>
              <text class="complete-text">全部加载完成</text>
            </view>
          </template>
        </zx-infinite-loading>
      </view>
    </view>

    <!-- 触发距离配置 -->
    <view class="demo-section">
      <view class="demo-title">触发距离配置</view>
      <view class="demo-desc">距离底部200px时触发加载</view>
      <view class="demo-content">
        <zx-infinite-loading 
          :status="thresholdStatus"
          :threshold="200"
          @load="onThresholdLoad"
          @retry="onThresholdRetry"
        >
          <view v-for="item in thresholdList" :key="item.id" class="list-item">
            <view class="item-avatar">{{ item.id }}</view>
            <view class="item-content">
              <view class="item-title">{{ item.name }}</view>
              <view class="item-desc">{{ item.desc }}</view>
            </view>
          </view>
        </zx-infinite-loading>
      </view>
    </view>

    <!-- 错误状态演示 -->
    <view class="demo-section">
      <view class="demo-title">错误状态演示</view>
      <view class="demo-desc">模拟加载失败的情况</view>
      <view class="demo-content">
        <zx-infinite-loading 
          :status="errorStatus"
          @load="onErrorLoad"
          @retry="onErrorRetry"
        >
          <view v-for="item in errorList" :key="item.id" class="list-item">
            <view class="item-avatar">{{ item.id }}</view>
            <view class="item-content">
              <view class="item-title">{{ item.name }}</view>
              <view class="item-desc">{{ item.desc }}</view>
            </view>
          </view>
        </zx-infinite-loading>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="demo-actions">
      <button class="action-btn" @click="resetAllData">重置所有数据</button>
      <button class="action-btn" @click="simulateError">模拟加载错误</button>
    </view>

    <!-- 底部间距 -->
    <view style="height: 100rpx;"></view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import zxInfiniteLoading from '@tanzhenxing/zx-infinite-loading/zx-infinite-loading.vue'

// 基础用法
const basicList = ref([])
const basicStatus = ref('loading')
const basicPage = ref(1)

// 自定义文本
const customTextList = ref([])
const customTextStatus = ref('loading')
const customTextPage = ref(1)

// 自定义状态
const customList = ref([])
const customStatus = ref('loading')
const customPage = ref(1)

// 触发距离
const thresholdList = ref([])
const thresholdStatus = ref('loading')
const thresholdPage = ref(1)

// 错误状态
const errorList = ref([])
const errorStatus = ref('loading')
const errorPage = ref(1)
const shouldError = ref(false)

// 模拟数据生成
const generateData = (page, prefix = 'Item') => {
  return Array.from({ length: 10 }, (_, i) => {
    const id = (page - 1) * 10 + i + 1
    return {
      id,
      name: `${prefix} ${id}`,
      desc: `这是第 ${id} 条数据的描述信息`
    }
  })
}

// 模拟API请求
const mockRequest = (page, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network Error'))
        return
      }
      
      const hasMore = page <= 3 // 模拟只有3页数据
      const data = hasMore ? generateData(page) : []
      resolve({ data, hasMore })
    }, 1000 + Math.random() * 1000) // 随机延迟
  })
}

// 基础用法加载
const onBasicLoad = async () => {
  try {
    const response = await mockRequest(basicPage.value)
    
    if (response.data.length > 0) {
      basicList.value.push(...response.data)
      basicPage.value++
      basicStatus.value = 'loading'
    } else {
      basicStatus.value = 'complete'
    }
    
    // 重置组件的内部加载状态
    infiniteRef1.value?.resetLoading()
  } catch (error) {
    basicStatus.value = 'error'
    infiniteRef1.value?.resetLoading()
  }
}

const onBasicRetry = () => {
  basicStatus.value = 'loading'
}

// 自定义文本加载
const onCustomTextLoad = async () => {
  try {
    const response = await mockRequest(customTextPage.value)
    
    if (response.data.length > 0) {
      customTextList.value.push(...response.data.map(item => ({
        ...item,
        name: `自定义文本 ${item.id}`,
        desc: `带自定义提示文本的示例 - ${item.desc}`
      })))
      customTextPage.value++
      customTextStatus.value = 'loading'
    } else {
      customTextStatus.value = 'complete'
    }
    
    // 重置组件的内部加载状态
    infiniteRef2.value?.resetLoading()
  } catch (error) {
    customTextStatus.value = 'error'
    infiniteRef2.value?.resetLoading()
  }
}

const onCustomTextRetry = () => {
  customTextStatus.value = 'loading'
}

// 自定义状态加载
const onCustomLoad = async () => {
  try {
    const response = await mockRequest(customPage.value)
    
    if (response.data.length > 0) {
      customList.value.push(...response.data.map(item => ({
        ...item,
        name: `自定义样式 ${item.id}`,
        desc: `自定义状态示例 - ${item.desc}`
      })))
      customPage.value++
      customStatus.value = 'loading'
    } else {
      customStatus.value = 'complete'
    }
    
    // 重置组件的内部加载状态
    infiniteRef3.value?.resetLoading()
  } catch (error) {
    customStatus.value = 'error'
    infiniteRef3.value?.resetLoading()
  }
}

const onCustomRetry = () => {
  customStatus.value = 'loading'
}

// 触发距离加载
const onThresholdLoad = async () => {
  try {
    const response = await mockRequest(thresholdPage.value)
    
    if (response.data.length > 0) {
      thresholdList.value.push(...response.data.map(item => ({
        ...item,
        name: `距离触发 ${item.id}`,
        desc: `200px触发示例 - ${item.desc}`
      })))
      thresholdPage.value++
      thresholdStatus.value = 'loading'
    } else {
      thresholdStatus.value = 'complete'
    }
    
    // 重置组件的内部加载状态
    infiniteRef4.value?.resetLoading()
  } catch (error) {
    thresholdStatus.value = 'error'
    infiniteRef4.value?.resetLoading()
  }
}

const onThresholdRetry = () => {
  thresholdStatus.value = 'loading'
}

// 错误状态加载
const onErrorLoad = async () => {
  try {
    const response = await mockRequest(errorPage.value, shouldError.value)
    
    if (response.data.length > 0) {
      errorList.value.push(...response.data.map(item => ({
        ...item,
        name: `错误演示 ${item.id}`,
        desc: `错误状态示例 - ${item.desc}`
      })))
      errorPage.value++
      errorStatus.value = 'loading'
    } else {
      errorStatus.value = 'complete'
    }
    
    // 重置组件的内部加载状态
    infiniteRef5.value?.resetLoading()
  } catch (error) {
    errorStatus.value = 'error'
    infiniteRef5.value?.resetLoading()
  }
}

const onErrorRetry = () => {
  shouldError.value = false // 重试时不再出错
  errorStatus.value = 'loading'
}

// 重置所有数据
const resetAllData = () => {
  // 基础用法
  basicList.value = []
  basicStatus.value = 'loading'
  basicPage.value = 1
  
  // 自定义文本
  customTextList.value = []
  customTextStatus.value = 'loading'
  customTextPage.value = 1
  
  // 自定义状态
  customList.value = []
  customStatus.value = 'loading'
  customPage.value = 1
  
  // 触发距离
  thresholdList.value = []
  thresholdStatus.value = 'loading'
  thresholdPage.value = 1
  
  // 错误状态
  errorList.value = []
  errorStatus.value = 'loading'
  errorPage.value = 1
  shouldError.value = false
  
  uni.showToast({
    title: '数据已重置',
    icon: 'success'
  })
}

// 模拟加载错误
const simulateError = () => {
  shouldError.value = true
  uni.showToast({
    title: '下次加载将出错',
    icon: 'none'
  })
}

// 初始化数据
onMounted(() => {
  // 为每个示例添加一些初始数据
  basicList.value = generateData(0, '基础')
  customTextList.value = generateData(0, '文本')
  customList.value = generateData(0, '样式')
  thresholdList.value = generateData(0, '距离')
  errorList.value = generateData(0, '错误')
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20rpx;
  background-color: #f7f8fa;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-title {
  padding: 30rpx 30rpx 10rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
}

.demo-desc {
  padding: 0 30rpx 20rpx;
  font-size: 28rpx;
  color: #969799;
  line-height: 1.5;
}

.demo-content {
  max-height: 600rpx;
  overflow-y: auto;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 24rpx 30rpx;
  border-bottom: 1rpx solid #ebedf0;
  
  &:last-child {
    border-bottom: none;
  }
}

.item-avatar {
  width: 80rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 30rpx;
  color: #323233;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.item-desc {
  font-size: 26rpx;
  color: #969799;
  line-height: 1.4;
}

// 自定义加载状态样式
.custom-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
  gap: 20rpx;
}

.loading-spinner {
  display: flex;
  gap: 8rpx;
}

.spinner-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: spinner-bounce 1.4s infinite ease-in-out both;
  
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
}

.loading-text {
  font-size: 28rpx;
  color: #667eea;
  font-weight: 500;
}

.custom-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
  gap: 12rpx;
  cursor: pointer;
  
  &:active {
    opacity: 0.7;
  }
}

.error-icon {
  font-size: 48rpx;
}

.error-text {
  font-size: 28rpx;
  color: #ee0a24;
  font-weight: 500;
}

.error-retry {
  font-size: 24rpx;
  color: #969799;
}

.custom-complete {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
  gap: 12rpx;
}

.complete-icon {
  font-size: 48rpx;
}

.complete-text {
  font-size: 28rpx;
  color: #07c160;
  font-weight: 500;
}

.demo-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}

.action-btn {
  flex: 1;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 44rpx;
  font-size: 28rpx;
  font-weight: 500;
  
  &:active {
    opacity: 0.8;
  }
}

@keyframes spinner-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>