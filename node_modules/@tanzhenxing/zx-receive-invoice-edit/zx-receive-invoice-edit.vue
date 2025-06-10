<template>
  <view :class="[
    'zx-receive-invoice-edit',
    customClass
  ]" :style="[customStyle]">
    <zx-form ref="formRef" :model="formData" :rules="formRules">
      <!-- 发票类型选择 -->
      <view class="zx-receive-invoice-edit__section">
        <zx-form-item label="发票类型" name="type" required>
          <zx-radio-group v-model="formData.type" direction="horizontal" @change="onTypeChange">
            <zx-radio v-for="item in invoiceTypes" :key="item.value" :name="item.value" :disabled="item.disabled">
              {{ item.label }}
            </zx-radio>
          </zx-radio-group>
        </zx-form-item>
      </view>

      <!-- 个人发票信息 -->
      <view v-if="formData.type === 'personal'" class="zx-receive-invoice-edit__section">
        <zx-form-item label="发票抬头" name="title" required>
          <zx-input v-model="formData.title" placeholder="请输入发票抬头" :maxlength="titleMaxlength"
            @input="onInputChange('title', $event)" @focus="onFocus('title')" @blur="onBlur('title')" />
        </zx-form-item>
      </view>

      <!-- 企业发票信息 -->
      <view v-if="formData.type === 'company'" class="zx-receive-invoice-edit__section">
        <zx-form-item label="发票抬头" name="title" required>
          <zx-input v-model="formData.title" placeholder="请输入企业名称" :maxlength="titleMaxlength"
            @input="onInputChange('title', $event)" @focus="onFocus('title')" @blur="onBlur('title')" />
        </zx-form-item>

        <zx-form-item label="纳税人识别号" name="taxNumber" required>
          <zx-input v-model="formData.taxNumber" placeholder="请输入纳税人识别号" :maxlength="taxNumberMaxlength"
            @input="onInputChange('taxNumber', $event)" @focus="onFocus('taxNumber')" @blur="onBlur('taxNumber')" />
        </zx-form-item>

        <!-- 详细信息展开 -->
        <view v-if="showDetailInfo" class="zx-receive-invoice-edit__detail">
          <zx-form-item label="注册地址" name="address">
            <zx-textarea v-model="formData.address" placeholder="请输入注册地址" :maxlength="addressMaxlength"
              :rows="addressRows" auto-height @input="onInputChange('address', $event)" @focus="onFocus('address')"
              @blur="onBlur('address')" />
          </zx-form-item>

          <zx-form-item label="注册电话" name="phone">
            <zx-input v-model="formData.phone" type="tel" placeholder="请输入注册电话" :maxlength="phoneMaxlength"
              @input="onInputChange('phone', $event)" @focus="onFocus('phone')" @blur="onBlur('phone')" />
          </zx-form-item>

          <zx-form-item label="开户银行" name="bank">
            <zx-input v-model="formData.bank" placeholder="请输入开户银行" :maxlength="bankMaxlength"
              @input="onInputChange('bank', $event)" @focus="onFocus('bank')" @blur="onBlur('bank')" />
          </zx-form-item>

          <zx-form-item label="银行账号" name="account">
            <zx-input v-model="formData.account" placeholder="请输入银行账号" :maxlength="accountMaxlength"
              @input="onInputChange('account', $event)" @focus="onFocus('account')" @blur="onBlur('account')" />
          </zx-form-item>
        </view>

        <!-- 详细信息切换 -->
        <zx-cell :title="showDetailInfo ? '收起详细信息' : '填写详细信息'" :border="false" clickable @click="toggleDetailInfo">
          <template #right-icon>
            <zx-icon :name="showDetailInfo ? 'arrow-up' : 'arrow-down'" size="16" color="#999" />
          </template>
        </zx-cell>
      </view>

      <!-- 设为默认 -->
      <view v-if="showSetDefault" class="zx-receive-invoice-edit__section">
        <zx-cell title="设为默认发票" :border="false">
          <template #right-icon>
            <zx-switch :model-value="formData.isDefault" @update:modelValue="onDefaultChange" />
          </template>
        </zx-cell>
      </view>

      <!-- 自定义插槽 -->
      <slot />

      <!-- 操作按钮 -->
      <view v-if="!hideButtons" class="zx-receive-invoice-edit__buttons">
        <zx-button block round type="primary" :loading="isSaving" :disabled="!isFormValid" @click="onSave">
          {{ saveButtonText }}
        </zx-button>

        <zx-button v-if="showDelete" block round :loading="isDeleting" custom-style="margin-top: 20rpx;"
          @click="onDelete">
          {{ deleteButtonText }}
        </zx-button>
      </view>
    </zx-form>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import zxForm from '@tanzhenxing/zx-form/zx-form.vue'
import zxFormItem from '@tanzhenxing/zx-form-item/zx-form-item.vue'
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'
import zxTextarea from '@tanzhenxing/zx-textarea/zx-textarea.vue'
import zxButton from '@tanzhenxing/zx-button/zx-button.vue'
import zxSwitch from '@tanzhenxing/zx-switch/zx-switch.vue'
import zxCell from '@tanzhenxing/zx-cell/zx-cell.vue'
import zxRadio from '@tanzhenxing/zx-radio/zx-radio.vue'
import zxRadioGroup from '@tanzhenxing/zx-radio-group/zx-radio-group.vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

const props = defineProps({
  // 发票信息
  invoiceInfo: {
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

  // 显示控制
  showSetDefault: {
    type: Boolean,
    default: true
  },
  showDelete: {
    type: Boolean,
    default: false
  },
  hideButtons: {
    type: Boolean,
    default: false
  },

  // 按钮文本
  saveButtonText: {
    type: String,
    default: '保存'
  },
  deleteButtonText: {
    type: String,
    default: '删除'
  },

  // 加载状态
  isSaving: {
    type: Boolean,
    default: false
  },
  isDeleting: {
    type: Boolean,
    default: false
  },

  // 字段长度限制
  titleMaxlength: {
    type: [Number, String],
    default: 100
  },
  taxNumberMaxlength: {
    type: [Number, String],
    default: 20
  },
  addressMaxlength: {
    type: [Number, String],
    default: 200
  },
  phoneMaxlength: {
    type: [Number, String],
    default: 20
  },
  bankMaxlength: {
    type: [Number, String],
    default: 100
  },
  accountMaxlength: {
    type: [Number, String],
    default: 30
  },
  addressRows: {
    type: [Number, String],
    default: 2
  },

  // 自定义样式
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: [Object, String],
    default: () => ({})
  }
})

const emit = defineEmits([
  'save',
  'delete',
  'change',
  'focus',
  'blur',
  'type-change'
])

// 表单引用
const formRef = ref(null)

// 详细信息展开状态
const showDetailInfo = ref(false)

// 表单数据
const formData = reactive({
  type: 'personal',
  title: '',
  taxNumber: '',
  address: '',
  phone: '',
  bank: '',
  account: '',
  isDefault: false
})

// 表单验证规则
const formRules = computed(() => {
  const rules = {
    type: [
      { required: true, message: '请选择发票类型' }
    ],
    title: [
      { required: true, message: '请输入发票抬头' },
      { min: 2, message: '发票抬头至少2个字符' },
      { max: props.titleMaxlength, message: `发票抬头不能超过${props.titleMaxlength}个字符` }
    ]
  }

  // 企业发票需要税号
  if (formData.type === 'company') {
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

// 表单验证状态
const isFormValid = computed(() => {
  if (!formData.type || !formData.title) {
    return false
  }

  if (formData.type === 'company' && !formData.taxNumber) {
    return false
  }

  return true
})

// 监听发票信息变化
watch(
  () => props.invoiceInfo,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      Object.assign(formData, {
        type: 'personal',
        title: '',
        taxNumber: '',
        address: '',
        phone: '',
        bank: '',
        account: '',
        isDefault: false,
        ...newVal
      })
    }
  },
  { immediate: true, deep: true }
)

// 发票类型变化
const onTypeChange = (value) => {
  formData.type = value

  // 切换类型时清空相关字段
  if (value === 'personal') {
    formData.taxNumber = ''
    formData.address = ''
    formData.phone = ''
    formData.bank = ''
    formData.account = ''
    showDetailInfo.value = false
  }

  emit('type-change', value)
  emit('change', { ...formData })
}

// 输入变化
const onInputChange = (field, value) => {
  formData[field] = value
  emit('change', { ...formData })
}

// 焦点事件
const onFocus = (field) => {
  emit('focus', field)
}

// 失焦事件
const onBlur = (field) => {
  emit('blur', field)
}

// 默认状态变化
const onDefaultChange = (value) => {
  formData.isDefault = value
  emit('change', { ...formData })
}

// 切换详细信息
const toggleDetailInfo = () => {
  showDetailInfo.value = !showDetailInfo.value
}

// 保存
const onSave = async () => {
  try {
    const valid = await formRef.value?.validate()
    if (valid) {
      emit('save', { ...formData })
    }
  } catch (error) {
    console.warn('表单验证失败:', error)
  }
}

// 删除
const onDelete = () => {
  emit('delete', { ...formData })
}

// 验证表单
const validate = () => {
  return formRef.value?.validate()
}

// 重置表单
const resetForm = () => {
  Object.assign(formData, {
    type: 'personal',
    title: '',
    taxNumber: '',
    address: '',
    phone: '',
    bank: '',
    account: '',
    isDefault: false
  })
  showDetailInfo.value = false
  formRef.value?.resetFields()
}

// 获取表单数据
const getFormData = () => {
  return { ...formData }
}

// 设置表单数据
const setFormData = (data) => {
  Object.assign(formData, data)
}

// 暴露方法
defineExpose({
  validate,
  resetForm,
  getFormData,
  setFormData
})
</script>

<style lang="scss" scoped>
.zx-receive-invoice-edit {
  width: 100%;
  background: #f8f9fa;

  &__section {
    background: #fff;
    margin-bottom: 20rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__detail {
    border-top: 1rpx solid #ebedf0;
    padding-top: 0;
  }

  &__buttons {
    padding: 40rpx 32rpx;
    background: #fff;
    margin-top: 20rpx;
  }
}

// 表单项样式调整
:deep(.zx-form-item) {
  padding: 24rpx 32rpx;
}

:deep(.zx-form-item__label) {
  font-size: 28rpx;
  color: #323233;
  font-weight: 500;
}

:deep(.zx-form-item__content) {
  margin-top: 16rpx;
}

// 单选组样式
:deep(.zx-radio-group) {
  display: flex;
  gap: 32rpx;
}

:deep(.zx-radio) {
  flex: 1;
}

:deep(.zx-radio__label) {
  font-size: 28rpx;
}

// 输入框样式
:deep(.zx-input__inner) {
  font-size: 28rpx;
  padding: 0;
  border: none;
  background: transparent;
}

:deep(.zx-input__inner::placeholder) {
  color: #c8c9cc;
}

// 文本域样式
:deep(.zx-textarea__inner) {
  font-size: 28rpx;
  padding: 0;
  border: none;
  background: transparent;
}

:deep(.zx-textarea__inner::placeholder) {
  color: #c8c9cc;
}

// 单元格样式
:deep(.zx-cell) {
  padding: 24rpx 32rpx;
}

:deep(.zx-cell__title) {
  font-size: 28rpx;
  color: #323233;
}

// 按钮样式
:deep(.zx-button) {
  height: 88rpx;
  font-size: 32rpx;
  font-weight: 500;
}

:deep(.zx-button--primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

:deep(.zx-button:not(.zx-button--primary)) {
  color: #646566;
  background: #f7f8fa;
  border: 1rpx solid #ebedf0;
}
</style>