<template>
  <view class="signature-demo">
    <zx-navbar title="zx-signature 签名组件" />
    
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <zx-signature
          ref="signatureRef1"
          @start="onSignStart"
          @signing="onSigning"
          @end="onSignEnd"
          @confirm="onConfirm"
          @clear="onClear"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">自定义样式</view>
      <view class="demo-content">
        <zx-signature
          ref="signatureRef2"
          :line-width="5"
          stroke-style="#ff6b6b"
          background-color="#f8f9fa"
          placeholder="请用红色笔签名"
          clear-text="清空"
          confirm-text="保存"
          :custom-style="{ marginBottom: '20px' }"
          @confirm="onCustomConfirm"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">禁用状态</view>
      <view class="demo-content">
        <zx-signature
          disabled
          placeholder="签名功能已禁用"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">自定义尺寸</view>
      <view class="demo-content">
        <zx-signature
          ref="signatureRef3"
          :custom-style="{ 
            '--signature-height': '150px',
            marginBottom: '20px'
          }"
          placeholder="较小的签名区域"
          @confirm="onSmallConfirm"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">操作按钮</view>
      <view class="demo-actions">
        <button class="demo-btn" @click="clearAll">清空所有</button>
        <button class="demo-btn demo-btn--primary" @click="saveAll">保存所有</button>
      </view>
    </view>
    
    <!-- 签名结果展示 -->
    <view v-if="signatureResults.length > 0" class="demo-section">
      <view class="demo-title">签名结果</view>
      <view class="demo-content">
        <view 
          v-for="(result, index) in signatureResults" 
          :key="index"
          class="signature-result"
        >
          <view class="result-title">签名 {{ index + 1 }}</view>
          <image 
            :src="result.filePath" 
            class="result-image"
            mode="aspectFit"
            @click="previewImage(result.filePath)"
          />
          <view class="result-info">
            <text>尺寸: {{ result.width }} x {{ result.height }}</text>
            <text>路径: {{ result.filePath }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ZxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import ZxSignature from '@tanzhenxing/zx-signature/zx-signature.vue'

// 引用
const signatureRef1 = ref()
const signatureRef2 = ref()
const signatureRef3 = ref()

// 签名结果
const signatureResults = ref([])

// 事件处理
const onSignStart = (e) => {
  console.log('开始签名:', e)
  uni.showToast({
    title: '开始签名',
    icon: 'none',
    duration: 1000
  })
}

const onSigning = (e) => {
  console.log('签名中:', e)
}

const onSignEnd = (e) => {
  console.log('签名结束:', e)
}

const onConfirm = (result) => {
  console.log('确认签名:', result)
  signatureResults.value.push({
    ...result,
    timestamp: Date.now()
  })
  
  uni.showToast({
    title: '签名保存成功',
    icon: 'success'
  })
}

const onCustomConfirm = (result) => {
  console.log('自定义样式签名确认:', result)
  signatureResults.value.push({
    ...result,
    timestamp: Date.now(),
    type: 'custom'
  })
  
  uni.showModal({
    title: '签名保存成功',
    content: `图片路径: ${result.filePath}`,
    showCancel: false
  })
}

const onSmallConfirm = (result) => {
  console.log('小尺寸签名确认:', result)
  signatureResults.value.push({
    ...result,
    timestamp: Date.now(),
    type: 'small'
  })
}

const onClear = () => {
  console.log('清除签名')
  uni.showToast({
    title: '签名已清除',
    icon: 'none'
  })
}

// 操作方法
const clearAll = () => {
  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有签名吗？',
    success: (res) => {
      if (res.confirm) {
        signatureRef1.value?.clear()
        signatureRef2.value?.clear()
        signatureRef3.value?.clear()
        signatureResults.value = []
        
        uni.showToast({
          title: '已清空所有签名',
          icon: 'success'
        })
      }
    }
  })
}

const saveAll = () => {
  const refs = [signatureRef1, signatureRef2, signatureRef3]
  let savedCount = 0
  
  refs.forEach((ref, index) => {
    if (ref.value?.hasDrawn) {
      ref.value.confirm()
      savedCount++
    }
  })
  
  if (savedCount === 0) {
    uni.showToast({
      title: '没有可保存的签名',
      icon: 'none'
    })
  } else {
    uni.showToast({
      title: `已保存 ${savedCount} 个签名`,
      icon: 'success'
    })
  }
}

// 预览图片
const previewImage = (filePath) => {
  uni.previewImage({
    urls: [filePath],
    current: filePath
  })
}
</script>

<style lang="scss" scoped>
.signature-demo {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

.demo-title {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}

.demo-content {
  padding: 20px;
}

.demo-actions {
  display: flex;
  gap: 15px;
  padding: 20px;
  justify-content: center;
}

.demo-btn {
  padding: 10px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #ffffff;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  &:active {
    background-color: #e4e7ed;
  }
  
  &--primary {
    background-color: #409eff;
    border-color: #409eff;
    color: #ffffff;
    
    &:hover {
      background-color: #66b1ff;
      border-color: #66b1ff;
    }
    
    &:active {
      background-color: #3a8ee6;
      border-color: #3a8ee6;
    }
  }
}

.signature-result {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.result-title {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.result-image {
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #ffffff;
}

.result-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  text {
    font-size: 12px;
    color: #666666;
    word-break: break-all;
  }
}

/* 自定义签名组件高度 */
:deep(.zx-signature) {
  .zx-signature-inner {
    height: var(--signature-height, 200px);
  }
}
</style>