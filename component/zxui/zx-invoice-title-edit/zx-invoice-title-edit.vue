<template>
  <view class="zx-invoice-title-edit">
    <!-- 表单容器 -->
    <zx-form ref="formRef" :model="formData" :rules="formRules" label-position="top">
      <!-- 发票类型选择 -->
      <zx-form-item label="发票类型" prop="type" required>
        <zx-radio-group v-model="formData.type" direction="horizontal">
          <zx-radio 
            v-for="item in invoiceTypes" 
            :key="item.value" 
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </zx-radio>
        </zx-radio-group>
      </zx-form-item>

      <!-- 发票抬头 -->
      <zx-form-item label="发票抬头" prop="title" required>
        <zx-input
          v-model="formData.title"
          placeholder="请输入发票抬头"
          :maxlength="100"
          clearable
          show-word-limit
        />
      </zx-form-item>

      <!-- 纳税人识别号 -->
      <zx-form-item label="纳税人识别号" prop="taxNumber" :required="isCompanyInvoice">
        <zx-input
          v-model="formData.taxNumber"
          placeholder="请输入纳税人识别号"
          :maxlength="20"
          clearable
        />
      </zx-form-item>

      <!-- 注册地址（企业发票时显示） -->
      <zx-form-item 
        v-if="isCompanyInvoice" 
        label="注册地址" 
        prop="address"
      >
        <zx-input
          v-model="formData.address"
          placeholder="请输入注册地址"
          :maxlength="200"
          clearable
        />
      </zx-form-item>

      <!-- 注册电话（企业发票时显示） -->
      <zx-form-item 
        v-if="isCompanyInvoice" 
        label="注册电话" 
        prop="phone"
      >
        <zx-input
          v-model="formData.phone"
          placeholder="请输入注册电话"
          :maxlength="20"
          clearable
        />
      </zx-form-item>

      <!-- 开户银行（企业发票时显示） -->
      <zx-form-item 
        v-if="isCompanyInvoice" 
        label="开户银行" 
        prop="bankName"
      >
        <zx-input
          v-model="formData.bankName"
          placeholder="请输入开户银行"
          :maxlength="100"
          clearable
        />
      </zx-form-item>

      <!-- 银行账号（企业发票时显示） -->
      <zx-form-item 
        v-if="isCompanyInvoice" 
        label="银行账号" 
        prop="bankAccount"
      >
        <zx-input
          v-model="formData.bankAccount"
          placeholder="请输入银行账号"
          :maxlength="30"
          clearable
        />
      </zx-form-item>

      <!-- 设为默认 -->
      <zx-form-item label="设为默认">
        <zx-switch v-model="formData.isDefault" />
      </zx-form-item>
    </zx-form>

    <!-- 底部按钮 -->
    <view class="zx-invoice-title-edit__footer" v-if="!hideFooter">
      <zx-button 
        v-if="!hideCancel"
        :block="true" 
        @click="handleCancel"
        :style="{ marginBottom: '24rpx' }"
      >
        {{ cancelText }}
      </zx-button>
      <zx-button 
        type="primary" 
        :block="true" 
        :loading="submitLoading"
        @click="handleSubmit"
      >
        {{ submitText }}
      </zx-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-invoice-title-edit'

const emit = defineEmits([
  'update:modelValue',
  'submit',
  'cancel',
  'change'
])

const props = defineProps({
  // 表单数据
  modelValue: {
    type: Object,
    default: () => ({})
  },
  // 发票类型选项
  invoiceTypes: {
    type: Array,
    default: () => [
      { label: '个人', value: 'personal' },
      { label: '企业', value: 'company' }
    ]
  },
  // 是否隐藏底部按钮
  hideFooter: {
    type: Boolean,
    default: false
  },
  // 是否隐藏取消按钮
  hideCancel: {
    type: Boolean,
    default: false
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  // 提交按钮文字
  submitText: {
    type: String,
    default: '保存'
  },
  // 提交按钮加载状态
  submitLoading: {
    type: Boolean,
    default: false
  },
  // 是否编辑模式
  isEdit: {
    type: Boolean,
    default: false
  }
})

// 表单引用
const formRef = ref(null)

// 表单数据
const formData = ref({
  type: 'personal', // 发票类型：personal-个人，company-企业
  title: '', // 发票抬头
  taxNumber: '', // 纳税人识别号
  address: '', // 注册地址
  phone: '', // 注册电话
  bankName: '', // 开户银行
  bankAccount: '', // 银行账号
  isDefault: false // 是否默认
})

// 是否为企业发票
const isCompanyInvoice = computed(() => {
  return formData.value.type === 'company'
})

// 表单验证规则
const formRules = computed(() => {
  const rules = {
    type: [
      { required: true, message: '请选择发票类型' }
    ],
    title: [
      { required: true, message: '请输入发票抬头' },
      { min: 2, max: 100, message: '发票抬头长度为2-100个字符' }
    ]
  }

  // 企业发票需要纳税人识别号
  if (isCompanyInvoice.value) {
    rules.taxNumber = [
      { required: true, message: '请输入纳税人识别号' },
      { 
        pattern: /^[A-Z0-9]{15,20}$/, 
        message: '纳税人识别号格式不正确' 
      }
    ]
  }

  return rules
})

// 监听props变化，更新表单数据
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && typeof newVal === 'object') {
      formData.value = {
        type: 'personal',
        title: '',
        taxNumber: '',
        address: '',
        phone: '',
        bankName: '',
        bankAccount: '',
        isDefault: false,
        ...newVal
      }
    }
  },
  { immediate: true, deep: true }
)

// 监听表单数据变化
watch(
  formData,
  (newVal) => {
    emit('update:modelValue', newVal)
    emit('change', newVal)
  },
  { deep: true }
)

// 监听发票类型变化，清空企业相关字段
watch(
  () => formData.value.type,
  (newType) => {
    if (newType === 'personal') {
      formData.value.taxNumber = ''
      formData.value.address = ''
      formData.value.phone = ''
      formData.value.bankName = ''
      formData.value.bankAccount = ''
    }
  }
)

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    emit('submit', formData.value)
  } catch (error) {
    console.log('表单验证失败:', error)
  }
}

// 取消操作
const handleCancel = () => {
  emit('cancel')
}

// 重置表单
const resetForm = () => {
  formData.value = {
    type: 'personal',
    title: '',
    taxNumber: '',
    address: '',
    phone: '',
    bankName: '',
    bankAccount: '',
    isDefault: false
  }
  formRef.value?.clearValidate()
}

// 验证表单
const validate = () => {
  return formRef.value?.validate()
}

// 清除验证
const clearValidate = () => {
  formRef.value?.clearValidate()
}

// 暴露方法
defineExpose({
  resetForm,
  validate,
  clearValidate,
  formData
})
</script>

<style lang="scss" scoped>
.zx-invoice-title-edit {
  background-color: #fff;
  
  &__footer {
    padding: 32rpx;
    background-color: #fff;
    border-top: 1px solid #ebedf0;
  }
}

// 表单项样式调整
:deep(.zx-form-item) {
  margin-bottom: 32rpx;
  
  .zx-form-item__label {
    font-size: 28rpx;
    font-weight: 500;
    color: #323233;
    margin-bottom: 16rpx;
  }
  
  .zx-form-item__content {
    .zx-input {
      border: 1px solid #ebedf0;
      border-radius: 12rpx;
      background-color: #fafafa;
      
      &.zx-input--focus {
        border-color: #1989fa;
        background-color: #fff;
      }
    }
    
    .zx-radio-group {
      .zx-radio {
        margin-right: 32rpx;
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>