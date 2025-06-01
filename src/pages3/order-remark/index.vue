<template>
  <view class="page">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">订单备注组件示例</text>
      <text class="page-desc">OrderRemark 组件的完整使用示例</text>
    </view>

    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="demo-item">
        <zx-order-remark 
          v-model="basicRemark" 
          title="订单备注" 
          placeholder="请输入您的订单备注"
          @input="onBasicInput"
          @change="onBasicChange"
        />
        <view class="result">当前值: {{ basicRemark }}</view>
      </view>
    </view>

    <!-- 快捷短语 -->
    <view class="demo-section">
      <view class="section-title">快捷短语</view>
      <view class="demo-item">
        <zx-order-remark 
          v-model="phraseRemark" 
          title="订单备注" 
          :quick-phrases="quickPhrases"
          phrases-title="常用备注"
          @phrase-select="onPhraseSelect"
        />
        <view class="result">选择的短语: {{ selectedPhrase }}</view>
      </view>
    </view>

    <!-- 表单验证 -->
    <view class="demo-section">
      <view class="section-title">表单验证</view>
      <view class="demo-item">
        <zx-order-remark 
          ref="validateRef"
          v-model="validateRemark" 
          title="订单备注" 
          required
          :min-length="5"
          :max-length="50"
          :error-message="errorMessage"
          @validate="onValidate"
        />
        <view class="button-group">
          <button class="btn" @click="manualValidate">手动验证</button>
          <button class="btn" @click="clearValidate">清空内容</button>
        </view>
        <view class="result error" v-if="errorMessage">{{ errorMessage }}</view>
        <view class="result success" v-else-if="validateRemark">验证通过</view>
      </view>
    </view>

    <!-- 字数限制 -->
    <view class="demo-section">
      <view class="section-title">字数限制</view>
      <view class="demo-item">
        <zx-order-remark 
          v-model="limitRemark" 
          title="订单备注" 
          :maxlength="100"
          show-count
          show-maxlength-in-count
        />
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <view class="section-title">自定义样式</view>
      <view class="demo-item">
        <zx-order-remark 
          v-model="styleRemark" 
          title="自定义样式备注" 
          border="bottom"
          background-color="#f8f9fa"
          border-color="#409eff"
          border-radius="12rpx"
          font-size="16px"
          color="#303133"
          padding="32rpx"
          height="160rpx"
        />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <view class="section-title">禁用状态</view>
      <view class="demo-item">
        <zx-order-remark 
          v-model="disabledRemark" 
          title="禁用状态" 
          disabled
          :quick-phrases="quickPhrases"
        />
        <view class="button-group">
          <button class="btn" @click="toggleDisabled">{{ isDisabled ? '启用' : '禁用' }}</button>
        </view>
      </view>
    </view>

    <!-- 无边框样式 -->
    <view class="demo-section">
      <view class="section-title">无边框样式</view>
      <view class="demo-item">
        <zx-order-remark 
          v-model="noBorderRemark" 
          title="无边框备注" 
          border="none"
          background-color="#f5f5f5"
          placeholder="无边框样式的备注输入"
        />
      </view>
    </view>

    <!-- 高度自适应 -->
    <view class="demo-section">
      <view class="section-title">高度自适应</view>
      <view class="demo-item">
        <zx-order-remark 
          v-model="autoHeightRemark" 
          title="自适应高度" 
          auto-height
          height="80rpx"
          placeholder="输入多行文本查看高度自适应效果"
        />
      </view>
    </view>

    <!-- 完整配置示例 -->
    <view class="demo-section">
      <view class="section-title">完整配置示例</view>
      <view class="demo-item">
        <zx-order-remark 
          ref="fullConfigRef"
          v-model="fullConfigRemark" 
          title="完整配置" 
          required
          :quick-phrases="extendedPhrases"
          phrases-title="配送要求"
          :maxlength="200"
          :min-length="10"
          show-count
          show-maxlength-in-count
          clearable
          auto-height
          height="120rpx"
          placeholder="请详细描述您的配送要求和注意事项"
          :error-message="fullConfigError"
          @validate="onFullConfigValidate"
          @phrase-select="onFullConfigPhraseSelect"
          @focus="onFullConfigFocus"
          @blur="onFullConfigBlur"
        />
        <view class="button-group">
          <button class="btn" @click="validateFullConfig">验证</button>
          <button class="btn" @click="clearFullConfig">清空</button>
          <button class="btn" @click="focusFullConfig">聚焦</button>
        </view>
        <view class="result" v-if="fullConfigStatus">{{ fullConfigStatus }}</view>
      </view>
    </view>

    <!-- 实际应用场景 -->
    <view class="demo-section">
      <view class="section-title">实际应用场景</view>
      <view class="demo-item">
        <view class="order-form">
          <view class="form-item">
            <text class="label">收货地址</text>
            <text class="value">北京市朝阳区xxx街道xxx号</text>
          </view>
          <view class="form-item">
            <text class="label">配送时间</text>
            <text class="value">工作日 09:00-18:00</text>
          </view>
          <view class="form-item full">
            <zx-order-remark 
              v-model="orderRemark" 
              title="订单备注" 
              required
              :quick-phrases="orderPhrases"
              phrases-title="配送要求"
              :maxlength="150"
              :min-length="5"
              placeholder="请输入配送要求或其他备注信息"
              :error-message="orderError"
              @validate="onOrderValidate"
            />
          </view>
          <view class="form-actions">
            <button class="submit-btn" @click="submitOrder" :disabled="!canSubmit">提交订单</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// 基础用法
const basicRemark = ref('')

// 快捷短语
const phraseRemark = ref('')
const selectedPhrase = ref('')
const quickPhrases = [
  '尽快发货',
  '包装仔细一点',
  '送货上门',
  '工作日配送',
  '周末配送',
  '节假日不配送'
]

// 表单验证
const validateRemark = ref('')
const errorMessage = ref('')
const validateRef = ref()

// 字数限制
const limitRemark = ref('')

// 自定义样式
const styleRemark = ref('')

// 禁用状态
const disabledRemark = ref('这是禁用状态的默认内容')
const isDisabled = ref(true)

// 无边框
const noBorderRemark = ref('')

// 高度自适应
const autoHeightRemark = ref('')

// 完整配置
const fullConfigRemark = ref('')
const fullConfigError = ref('')
const fullConfigStatus = ref('')
const fullConfigRef = ref()
const extendedPhrases = [
  '请在工作日配送',
  '请在周末配送',
  '请放在门卫处',
  '请直接送到家',
  '包装请仔细一些',
  '易碎物品请小心',
  '请尽快发货',
  '不着急，慢慢来'
]

// 实际应用
const orderRemark = ref('')
const orderError = ref('')
const orderPhrases = [
  '请在工作日9-18点配送',
  '请放在小区门卫处',
  '请直接送到家门口',
  '包装请仔细一些',
  '易碎品请小心轻放',
  '收到货请及时联系'
]

// 计算属性
const canSubmit = computed(() => {
  return orderRemark.value.length >= 5 && !orderError.value
})

// 事件处理
const onBasicInput = (value) => {
  console.log('基础输入:', value)
}

const onBasicChange = (value) => {
  console.log('基础变化:', value)
}

const onPhraseSelect = (phrase) => {
  selectedPhrase.value = phrase
  console.log('选择短语:', phrase)
}

const onValidate = (result) => {
  if (!result.valid) {
    errorMessage.value = result.message
  } else {
    errorMessage.value = ''
  }
  console.log('验证结果:', result)
}

const manualValidate = () => {
  if (validateRef.value) {
    const isValid = validateRef.value.validate()
    console.log('手动验证结果:', isValid)
  }
}

const clearValidate = () => {
  if (validateRef.value) {
    validateRef.value.clear()
  }
}

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
}

const onFullConfigValidate = (result) => {
  if (!result.valid) {
    fullConfigError.value = result.message
    fullConfigStatus.value = `验证失败: ${result.message}`
  } else {
    fullConfigError.value = ''
    fullConfigStatus.value = '验证通过'
  }
}

const onFullConfigPhraseSelect = (phrase) => {
  fullConfigStatus.value = `选择了短语: ${phrase}`
}

const onFullConfigFocus = () => {
  fullConfigStatus.value = '获得焦点'
}

const onFullConfigBlur = () => {
  fullConfigStatus.value = '失去焦点'
}

const validateFullConfig = () => {
  if (fullConfigRef.value) {
    const isValid = fullConfigRef.value.validate()
    fullConfigStatus.value = isValid ? '手动验证通过' : '手动验证失败'
  }
}

const clearFullConfig = () => {
  if (fullConfigRef.value) {
    fullConfigRef.value.clear()
    fullConfigStatus.value = '已清空'
  }
}

const focusFullConfig = () => {
  if (fullConfigRef.value) {
    fullConfigRef.value.focus()
  }
}

const onOrderValidate = (result) => {
  if (!result.valid) {
    orderError.value = result.message
  } else {
    orderError.value = ''
  }
}

const submitOrder = () => {
  if (canSubmit.value) {
    uni.showToast({
      title: '订单提交成功',
      icon: 'success'
    })
    console.log('提交订单，备注:', orderRemark.value)
  } else {
    uni.showToast({
      title: '请完善订单备注',
      icon: 'none'
    })
  }
}
</script>

<style scoped>
.page {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 60rpx;
}

.page-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #303133;
  margin-bottom: 16rpx;
}

.page-desc {
  display: block;
  font-size: 28rpx;
  color: #909399;
}

.demo-section {
  margin-bottom: 60rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
  margin-bottom: 32rpx;
  padding-left: 16rpx;
  border-left: 8rpx solid #409eff;
}

.demo-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.result {
  margin-top: 24rpx;
  padding: 16rpx 24rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #606266;
}

.result.error {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fbc4c4;
}

.result.success {
  background-color: #f0f9ff;
  color: #67c23a;
  border: 1px solid #c2e7b0;
}

.button-group {
  display: flex;
  gap: 24rpx;
  margin-top: 24rpx;
}

.btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.btn:active {
  background-color: #337ecc;
}

.order-form {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1px solid #f0f0f0;
}

.form-item.full {
  display: block;
  padding: 0;
}

.form-item:last-child {
  border-bottom: none;
}

.label {
  width: 160rpx;
  font-size: 28rpx;
  color: #303133;
  font-weight: 500;
}

.value {
  flex: 1;
  font-size: 28rpx;
  color: #606266;
}

.form-actions {
  padding: 32rpx;
  background-color: #f8f9fa;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 500;
}

.submit-btn:disabled {
  background-color: #c0c4cc;
  color: #fff;
}

.submit-btn:active:not(:disabled) {
  background-color: #337ecc;
}

/* 响应式适配 */
@media (max-width: 750rpx) {
  .page {
    padding: 24rpx;
  }
  
  .demo-item {
    padding: 24rpx;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .btn {
    flex: none;
  }
}
</style>