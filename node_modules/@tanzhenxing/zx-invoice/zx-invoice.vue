<template>
  <view class="zx-invoice" :style="customStyle">
    <zx-form ref="formRef" :model="formValue" :rules="rules" :label-position="labelPosition">
      <zx-form-item
        v-for="(item, index) in dataList"
        :key="index"
        :label="item.label"
        :required="item.required"
        :rules="item.rules"
        :prop="item.formItemProp"
      >
        <template v-if="item.type === 'radio'">
          <zx-radio-group v-model="formValue[item.formItemProp]">
            <zx-radio
              v-for="(radioItem, radioIndex) in item.radioLabel"
              :key="radioIndex"
              :label="radioItem.value"
              :disabled="radioItem.disabled"
            >
              {{ radioItem.label }}
            </zx-radio>
          </zx-radio-group>
        </template>
        <template v-else>
          <zx-input
            v-model="formValue[item.formItemProp]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :type="item.inputType || 'text'"
            :maxlength="item.maxlength"
            :clearable="item.clearable"
          />
        </template>
      </zx-form-item>
    </zx-form>
    
    <view v-if="submit" class="zx-invoice__submit">
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

const props = defineProps({
  // 发票数据配置
  data: {
    type: Array,
    default: () => []
  },
  // 表单数据对象
  formValue: {
    type: Object,
    default: () => ({})
  },
  // 表单验证规则
  rules: {
    type: Object,
    default: () => ({})
  },
  // 是否显示提交按钮
  submit: {
    type: Boolean,
    default: true
  },
  // 提交按钮文字
  submitText: {
    type: String,
    default: '提交审批'
  },
  // 提交按钮加载状态
  submitLoading: {
    type: Boolean,
    default: false
  },
  // 表单标签位置
  labelPosition: {
    type: String,
    default: 'left'
  },
  // 自定义样式
  customStyle: {
    type: [String, Object],
    default: ''
  }
})

const emit = defineEmits([
  'update:formValue',
  'submit',
  'validate',
  'change'
])

const formRef = ref(null)
const dataList = ref([])

// 内部表单数据
const internalFormValue = ref({})

// 计算属性：处理表单数据
const formValue = computed({
  get() {
    return { ...props.formValue, ...internalFormValue.value }
  },
  set(value) {
    internalFormValue.value = value
    emit('update:formValue', value)
    emit('change', value)
  }
})

// 初始化数据
const init = () => {
  dataList.value = props.data.map(item => ({
    type: 'input',
    label: '',
    placeholder: '',
    formItemProp: '',
    required: false,
    rules: [],
    disabled: false,
    clearable: true,
    inputType: 'text',
    maxlength: -1,
    radioLabel: [],
    ...item
  }))
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) {
    console.warn('表单引用不存在')
    return
  }
  
  try {
    const valid = await formRef.value.validate()
    emit('submit', {
      valid: true,
      values: formValue.value
    })
  } catch (errors) {
    emit('submit', {
      valid: false,
      errors,
      values: formValue.value
    })
  }
}

// 验证表单
const validate = async () => {
  if (!formRef.value) {
    return Promise.reject('表单引用不存在')
  }
  
  try {
    const result = await formRef.value.validate()
    emit('validate', { valid: true, values: formValue.value })
    return result
  } catch (errors) {
    emit('validate', { valid: false, errors, values: formValue.value })
    throw errors
  }
}

// 重置表单
const resetFields = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 清空验证
const clearValidate = (props) => {
  if (formRef.value) {
    formRef.value.clearValidate(props)
  }
}

// 监听数据变化
watch(
  () => props.data,
  () => {
    init()
  },
  { immediate: true, deep: true }
)

// 监听formValue变化，同步到内部状态
watch(
  () => props.formValue,
  (newVal) => {
    if (newVal) {
      internalFormValue.value = { ...newVal }
    }
  },
  { immediate: true, deep: true }
)

// 暴露方法给父组件
defineExpose({
  validate,
  resetFields,
  clearValidate,
  formRef
})

// 组件挂载时初始化
init()
</script>

<style lang="scss" scoped>
.zx-invoice {
  position: relative;
  width: 100%;
  
  &__submit {
    position: fixed;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    left: 0;
    right: 0;
    z-index: 999;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20rpx;
    background: #fff;
    border-top: 1rpx solid #ebeef5;
    
    // 适配深色模式
    @media (prefers-color-scheme: dark) {
      background: #1d1e1f;
      border-top-color: #414243;
    }
  }
}

// 当有提交按钮时，给表单添加底部间距
.zx-invoice:has(.zx-invoice__submit) {
  padding-bottom: 120rpx;
}

// 兼容性处理：不支持:has选择器的情况
.zx-invoice.has-submit {
  padding-bottom: 120rpx;
}
</style>