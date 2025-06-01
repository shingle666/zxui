<template>
  <view class="page">
    <!-- 页面头部 -->
    <zx-navbar
      title="收票编辑示例"
      left-arrow
      @click-left="onBack"
    />
    
    <!-- 示例列表 -->
    <view class="demo-list">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-title">基础用法</view>
        <view class="demo-desc">最简单的发票编辑表单</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            :invoice-info="basicInvoice"
            @save="onBasicSave"
            @change="onBasicChange"
          />
        </view>
      </view>
      
      <!-- 企业发票 -->
      <view class="demo-section">
        <view class="demo-title">企业发票</view>
        <view class="demo-desc">包含完整企业信息的发票编辑</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            :invoice-info="companyInvoice"
            @save="onCompanySave"
            @change="onCompanyChange"
          />
        </view>
      </view>
      
      <!-- 编辑模式 -->
      <view class="demo-section">
        <view class="demo-title">编辑模式</view>
        <view class="demo-desc">编辑现有发票信息，支持删除</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            :invoice-info="editInvoice"
            :show-delete="true"
            save-button-text="更新发票"
            delete-button-text="删除发票"
            @save="onEditSave"
            @delete="onEditDelete"
          />
        </view>
      </view>
      
      <!-- 自定义发票类型 -->
      <view class="demo-section">
        <view class="demo-title">自定义发票类型</view>
        <view class="demo-desc">自定义发票类型选项</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            :invoice-types="customTypes"
            :invoice-info="customInvoice"
            @save="onCustomSave"
            @type-change="onTypeChange"
          />
        </view>
      </view>
      
      <!-- 加载状态 -->
      <view class="demo-section">
        <view class="demo-title">加载状态</view>
        <view class="demo-desc">保存和删除时的加载状态</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            :invoice-info="loadingInvoice"
            :show-delete="true"
            :is-saving="isSaving"
            :is-deleting="isDeleting"
            @save="onLoadingSave"
            @delete="onLoadingDelete"
          />
        </view>
      </view>
      
      <!-- 表单验证 -->
      <view class="demo-section">
        <view class="demo-title">表单验证</view>
        <view class="demo-desc">自定义表单验证和操作</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            ref="validateRef"
            :invoice-info="validateInvoice"
            hide-buttons
          />
          
          <view class="custom-buttons">
            <zx-button
              type="primary"
              size="large"
              @click="handleValidate"
            >
              验证表单
            </zx-button>
            <zx-button
              size="large"
              @click="handleReset"
            >
              重置表单
            </zx-button>
            <zx-button
              type="success"
              size="large"
              @click="handleGetData"
            >
              获取数据
            </zx-button>
          </view>
        </view>
      </view>
      
      <!-- 自定义样式 -->
      <view class="demo-section">
        <view class="demo-title">自定义样式</view>
        <view class="demo-desc">自定义组件样式</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            :invoice-info="styledInvoice"
            custom-class="custom-invoice-edit"
            :custom-style="customStyle"
            @save="onStyledSave"
          />
        </view>
      </view>
      
      <!-- 字段长度限制 -->
      <view class="demo-section">
        <view class="demo-title">字段长度限制</view>
        <view class="demo-desc">自定义各字段的最大长度</view>
        <view class="demo-content">
          <zx-receive-invoice-edit
            :invoice-info="limitInvoice"
            :title-maxlength="20"
            :tax-number-maxlength="15"
            :address-maxlength="50"
            :phone-maxlength="15"
            :bank-maxlength="30"
            :account-maxlength="20"
            :address-rows="3"
            @save="onLimitSave"
          />
        </view>
      </view>
    </view>
    
    <!-- 操作日志 -->
    <view class="log-section">
      <view class="log-title">操作日志</view>
      <scroll-view class="log-content" scroll-y>
        <view
          v-for="(log, index) in logs"
          :key="index"
          class="log-item"
        >
          <text class="log-time">{{ log.time }}</text>
          <text class="log-action">{{ log.action }}</text>
          <text class="log-data">{{ log.data }}</text>
        </view>
        <view v-if="logs.length === 0" class="log-empty">
          暂无操作日志
        </view>
      </scroll-view>
      <view class="log-actions">
        <zx-button size="small" @click="clearLogs">清空日志</zx-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 页面导航
const onBack = () => {
  uni.navigateBack()
}

// 操作日志
const logs = ref([])

const addLog = (action, data) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  logs.value.unshift({
    time,
    action,
    data: JSON.stringify(data, null, 2)
  })
  
  // 限制日志数量
  if (logs.value.length > 50) {
    logs.value = logs.value.slice(0, 50)
  }
}

const clearLogs = () => {
  logs.value = []
}

// 基础用法
const basicInvoice = ref({
  type: 'personal',
  title: '',
  isDefault: false
})

const onBasicSave = (data) => {
  addLog('基础保存', data)
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
}

const onBasicChange = (data) => {
  addLog('基础变化', data)
}

// 企业发票
const companyInvoice = ref({
  type: 'company',
  title: '北京科技有限公司',
  taxNumber: '91110000123456789X',
  address: '北京市朝阳区xxx街道xxx号',
  phone: '010-12345678',
  bank: '中国银行北京分行',
  account: '1234567890123456789',
  isDefault: true
})

const onCompanySave = (data) => {
  addLog('企业保存', data)
  uni.showToast({
    title: '企业发票保存成功',
    icon: 'success'
  })
}

const onCompanyChange = (data) => {
  addLog('企业变化', data)
}

// 编辑模式
const editInvoice = ref({
  id: 1,
  type: 'company',
  title: '现有企业名称',
  taxNumber: '91110000123456789X',
  address: '现有地址信息',
  phone: '010-87654321',
  isDefault: false
})

const onEditSave = (data) => {
  addLog('编辑保存', data)
  uni.showToast({
    title: '更新成功',
    icon: 'success'
  })
}

const onEditDelete = (data) => {
  addLog('编辑删除', data)
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这个发票信息吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

// 自定义发票类型
const customTypes = [
  { label: '个人', value: 'personal' },
  { label: '企业', value: 'company' },
  { label: '专用发票', value: 'special' },
  { label: '电子发票', value: 'electronic' }
]

const customInvoice = ref({
  type: 'special',
  title: '特殊发票抬头',
  isDefault: false
})

const onCustomSave = (data) => {
  addLog('自定义保存', data)
  uni.showToast({
    title: '自定义发票保存成功',
    icon: 'success'
  })
}

const onTypeChange = (type) => {
  addLog('类型变化', { type })
}

// 加载状态
const loadingInvoice = ref({
  type: 'personal',
  title: '测试加载状态',
  isDefault: false
})

const isSaving = ref(false)
const isDeleting = ref(false)

const onLoadingSave = (data) => {
  isSaving.value = true
  addLog('开始保存', data)
  
  // 模拟异步保存
  setTimeout(() => {
    isSaving.value = false
    addLog('保存完成', data)
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
  }, 2000)
}

const onLoadingDelete = (data) => {
  isDeleting.value = true
  addLog('开始删除', data)
  
  // 模拟异步删除
  setTimeout(() => {
    isDeleting.value = false
    addLog('删除完成', data)
    uni.showToast({
      title: '删除成功',
      icon: 'success'
    })
  }, 1500)
}

// 表单验证
const validateRef = ref(null)
const validateInvoice = ref({
  type: 'company',
  title: '',
  taxNumber: '',
  isDefault: false
})

const handleValidate = async () => {
  try {
    const valid = await validateRef.value.validate()
    addLog('验证结果', { valid })
    
    if (valid) {
      uni.showToast({
        title: '验证通过',
        icon: 'success'
      })
    }
  } catch (error) {
    addLog('验证失败', error)
    uni.showToast({
      title: '验证失败',
      icon: 'error'
    })
  }
}

const handleReset = () => {
  validateRef.value.resetForm()
  addLog('重置表单', {})
  uni.showToast({
    title: '表单已重置',
    icon: 'success'
  })
}

const handleGetData = () => {
  const data = validateRef.value.getFormData()
  addLog('获取数据', data)
  uni.showToast({
    title: '数据已获取',
    icon: 'success'
  })
}

// 自定义样式
const styledInvoice = ref({
  type: 'personal',
  title: '自定义样式示例',
  isDefault: false
})

const customStyle = {
  '--zx-invoice-edit-bg-color': '#f0f9ff',
  '--zx-invoice-edit-section-bg': '#e0f2fe',
  '--zx-invoice-edit-label-color': '#0369a1'
}

const onStyledSave = (data) => {
  addLog('自定义样式保存', data)
  uni.showToast({
    title: '样式示例保存成功',
    icon: 'success'
  })
}

// 字段长度限制
const limitInvoice = ref({
  type: 'company',
  title: '',
  taxNumber: '',
  address: '',
  phone: '',
  bank: '',
  account: '',
  isDefault: false
})

const onLimitSave = (data) => {
  addLog('长度限制保存', data)
  uni.showToast({
    title: '长度限制示例保存成功',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.demo-list {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-title {
  padding: 32rpx 32rpx 16rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
}

.demo-desc {
  padding: 0 32rpx 24rpx;
  font-size: 28rpx;
  color: #969799;
  line-height: 1.5;
}

.demo-content {
  padding: 0;
}

.custom-buttons {
  display: flex;
  gap: 20rpx;
  padding: 32rpx;
  background: #f8f9fa;
  
  .zx-button {
    flex: 1;
  }
}

.log-section {
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.log-title {
  padding: 32rpx 32rpx 16rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
  border-bottom: 1px solid #ebedf0;
}

.log-content {
  height: 400rpx;
  padding: 16rpx 32rpx;
}

.log-item {
  display: flex;
  flex-direction: column;
  padding: 16rpx 0;
  border-bottom: 1px solid #f7f8fa;
  
  &:last-child {
    border-bottom: none;
  }
}

.log-time {
  font-size: 24rpx;
  color: #969799;
  margin-bottom: 8rpx;
}

.log-action {
  font-size: 28rpx;
  color: #323233;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.log-data {
  font-size: 24rpx;
  color: #646566;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-all;
  background: #f7f8fa;
  padding: 16rpx;
  border-radius: 8rpx;
}

.log-empty {
  text-align: center;
  color: #c8c9cc;
  font-size: 28rpx;
  padding: 60rpx 0;
}

.log-actions {
  padding: 16rpx 32rpx;
  border-top: 1px solid #ebedf0;
  text-align: center;
}

// 自定义样式示例
:deep(.custom-invoice-edit .zx-form-item__label) {
  font-weight: 600;
}

:deep(.custom-invoice-edit .zx-input__inner) {
  border: 2px solid #e0f2fe;
}

:deep(.custom-invoice-edit .zx-input__inner:focus) {
  border-color: #0369a1;
}
</style>