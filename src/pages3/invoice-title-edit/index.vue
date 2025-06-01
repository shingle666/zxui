<template>
  <view class="invoice-title-edit-demo">
    <!-- 导航栏 -->
    <zx-navbar title="发票抬头编辑" left-arrow @click-left="goBack" />
    
    <!-- 内容区域 -->
    <view class="demo-content">
      <!-- 基础用法 -->
      <zx-section title="基础用法" sub-title="支持个人和企业发票类型">
        <zx-invoice-title-edit 
          v-model="basicData"
          @submit="handleBasicSubmit"
          @cancel="handleCancel"
          @change="handleChange"
        />
      </zx-section>
      
      <!-- 编辑模式 -->
      <zx-section title="编辑模式" sub-title="预填充数据进行编辑">
        <zx-invoice-title-edit 
          v-model="editData"
          :is-edit="true"
          submit-text="更新发票抬头"
          :submit-loading="editLoading"
          @submit="handleEditSubmit"
          @cancel="handleCancel"
        />
      </zx-section>
      
      <!-- 自定义发票类型 -->
      <zx-section title="自定义发票类型" sub-title="可以自定义发票类型选项">
        <zx-invoice-title-edit 
          v-model="customTypeData"
          :invoice-types="customInvoiceTypes"
          @submit="handleCustomTypeSubmit"
          @cancel="handleCancel"
        />
      </zx-section>
      
      <!-- 隐藏底部按钮 -->
      <zx-section title="自定义底部按钮" sub-title="隐藏默认按钮，使用自定义按钮">
        <zx-invoice-title-edit 
          v-model="customFooterData"
          :hide-footer="true"
          ref="customEditRef"
        />
        
        <view class="custom-footer">
          <zx-button 
            type="primary" 
            :block="true"
            :loading="customLoading"
            @click="handleCustomSubmit"
          >
            自定义提交按钮
          </zx-button>
        </view>
      </zx-section>
      
      <!-- 表单方法演示 -->
      <zx-section title="表单方法" sub-title="演示表单验证、重置等方法">
        <zx-invoice-title-edit 
          v-model="methodData"
          :hide-footer="true"
          ref="methodEditRef"
        />
        
        <view class="method-buttons">
          <zx-button @click="validateForm" :style="{ marginBottom: '16rpx' }">
            验证表单
          </zx-button>
          <zx-button @click="resetForm" :style="{ marginBottom: '16rpx' }">
            重置表单
          </zx-button>
          <zx-button @click="clearValidate">
            清除验证
          </zx-button>
        </view>
      </zx-section>
      
      <!-- 数据展示 -->
      <zx-section title="实时数据" sub-title="查看当前表单数据">
        <view class="data-display">
          <text class="data-title">基础用法数据：</text>
          <text class="data-content">{{ JSON.stringify(basicData, null, 2) }}</text>
        </view>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

// 基础用法数据
const basicData = ref({
  type: 'personal',
  title: '',
  taxNumber: '',
  isDefault: false
})

// 编辑模式数据
const editData = ref({
  id: '1',
  type: 'company',
  title: '北京某某科技有限公司',
  taxNumber: '91110000123456789X',
  address: '北京市朝阳区某某街道123号',
  phone: '010-12345678',
  bankName: '中国银行北京分行',
  bankAccount: '1234567890123456789',
  isDefault: true
})

// 自定义类型数据
const customTypeData = ref({
  type: 'personal',
  title: '',
  taxNumber: '',
  isDefault: false
})

// 自定义底部按钮数据
const customFooterData = ref({
  type: 'personal',
  title: '',
  taxNumber: '',
  isDefault: false
})

// 方法演示数据
const methodData = ref({
  type: 'personal',
  title: '',
  taxNumber: '',
  isDefault: false
})

// 加载状态
const editLoading = ref(false)
const customLoading = ref(false)

// 组件引用
const customEditRef = ref(null)
const methodEditRef = ref(null)

// 自定义发票类型
const customInvoiceTypes = [
  { label: '个人', value: 'personal' },
  { label: '企业', value: 'company' },
  { label: '事业单位', value: 'institution' },
  { label: '其他组织', value: 'other', disabled: true }
]

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 基础用法提交
const handleBasicSubmit = (data) => {
  console.log('基础用法提交:', data)
  uni.showToast({
    title: '提交成功',
    icon: 'success'
  })
}

// 编辑模式提交
const handleEditSubmit = async (data) => {
  console.log('编辑模式提交:', data)
  editLoading.value = true
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    uni.showToast({
      title: '更新成功',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: '更新失败',
      icon: 'error'
    })
  } finally {
    editLoading.value = false
  }
}

// 自定义类型提交
const handleCustomTypeSubmit = (data) => {
  console.log('自定义类型提交:', data)
  uni.showToast({
    title: '提交成功',
    icon: 'success'
  })
}

// 取消操作
const handleCancel = () => {
  console.log('取消操作')
  uni.showToast({
    title: '已取消',
    icon: 'none'
  })
}

// 数据变化
const handleChange = (data) => {
  console.log('数据变化:', data)
}

// 自定义提交
const handleCustomSubmit = async () => {
  try {
    customLoading.value = true
    await customEditRef.value.validate()
    
    console.log('自定义提交:', customEditRef.value.formData)
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    uni.showToast({
      title: '自定义提交成功',
      icon: 'success'
    })
  } catch (error) {
    console.log('验证失败:', error)
    uni.showToast({
      title: '请检查表单数据',
      icon: 'error'
    })
  } finally {
    customLoading.value = false
  }
}

// 验证表单
const validateForm = async () => {
  try {
    await methodEditRef.value.validate()
    uni.showToast({
      title: '验证通过',
      icon: 'success'
    })
  } catch (error) {
    console.log('验证失败:', error)
    uni.showToast({
      title: '验证失败',
      icon: 'error'
    })
  }
}

// 重置表单
const resetForm = () => {
  methodEditRef.value.resetForm()
  uni.showToast({
    title: '表单已重置',
    icon: 'success'
  })
}

// 清除验证
const clearValidate = () => {
  methodEditRef.value.clearValidate()
  uni.showToast({
    title: '验证已清除',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.invoice-title-edit-demo {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.demo-content {
  padding: 32rpx;
}

.custom-footer {
  margin-top: 32rpx;
  padding: 32rpx;
  background-color: #fff;
  border-radius: 16rpx;
}

.method-buttons {
  margin-top: 32rpx;
  padding: 32rpx;
  background-color: #fff;
  border-radius: 16rpx;
  
  .zx-button {
    width: 100%;
  }
}

.data-display {
  padding: 32rpx;
  background-color: #fff;
  border-radius: 16rpx;
  
  .data-title {
    display: block;
    font-size: 28rpx;
    font-weight: 500;
    color: #323233;
    margin-bottom: 16rpx;
  }
  
  .data-content {
    display: block;
    font-size: 24rpx;
    color: #646566;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-all;
    background-color: #f7f8fa;
    padding: 24rpx;
    border-radius: 8rpx;
  }
}

// 区块样式
:deep(.zx-section) {
  margin-bottom: 32rpx;
  
  .zx-section__content {
    padding: 32rpx;
    background-color: #fff;
    border-radius: 16rpx;
  }
}
</style>