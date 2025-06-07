<template>
  <view class="zx-contact-edit" :style="[customStyle]">
    <form class="zx-contact-edit__form" @submit="handleSubmit">
      <!-- 表单字段区域 -->
      <view class="zx-contact-edit__fields">
        <!-- 姓名输入框 -->
        <view class="zx-contact-edit__field">
          <view class="zx-contact-edit__label">
            <text class="zx-contact-edit__label-text">姓名</text>
            <text class="zx-contact-edit__required" v-if="!hideRequiredAsterisk">*</text>
          </view>
          <view class="zx-contact-edit__input-wrapper">
            <input
              class="zx-contact-edit__input"
              v-model="contactData.name"
              type="text"
              :placeholder="namePlaceholder || '请输入姓名'"
              :maxlength="30"
              :disabled="disabled"
              @input="onNameInput"
              @blur="validateName"
            />
            <view 
              class="zx-contact-edit__clear" 
              v-if="clearable && contactData.name && !disabled"
              @click="clearName"
            >
              <text class="zx-contact-edit__clear-icon">×</text>
            </view>
          </view>
        </view>
        
        <!-- 手机号输入框 -->
        <view class="zx-contact-edit__field">
          <view class="zx-contact-edit__label">
            <text class="zx-contact-edit__label-text">手机号</text>
            <text class="zx-contact-edit__required" v-if="!hideRequiredAsterisk">*</text>
          </view>
          <view class="zx-contact-edit__input-wrapper">
            <input
              class="zx-contact-edit__input"
              v-model="contactData.tel"
              type="number"
              :placeholder="telPlaceholder || '请输入手机号'"
              :maxlength="11"
              :disabled="disabled"
              @input="onTelInput"
              @blur="validateTel"
            />
            <view 
              class="zx-contact-edit__clear" 
              v-if="clearable && contactData.tel && !disabled"
              @click="clearTel"
            >
              <text class="zx-contact-edit__clear-icon">×</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 设为默认联系人开关 -->
      <view class="zx-contact-edit__switch-cell" v-if="showSetDefault">
        <view class="zx-contact-edit__switch-label">
          <text class="zx-contact-edit__switch-text">{{ setDefaultLabel || '设为默认联系人' }}</text>
        </view>
        <view class="zx-contact-edit__switch-wrapper">
          <switch
            :checked="contactData.isDefault"
            :disabled="disabled"
            @change="onDefaultChange"
            color="#07c160"
          />
        </view>
      </view>
      
      <!-- 错误提示 -->
      <view class="zx-contact-edit__errors" v-if="errors.length > 0">
        <view 
          class="zx-contact-edit__error" 
          v-for="(error, index) in errors" 
          :key="index"
        >
          <text class="zx-contact-edit__error-text">{{ error }}</text>
        </view>
      </view>
      
      <!-- 按钮区域 -->
      <view class="zx-contact-edit__buttons">
        <!-- 保存按钮 -->
        <button
          class="zx-contact-edit__button zx-contact-edit__button--save"
          :class="{ 'zx-contact-edit__button--loading': isSaving }"
          :disabled="disabled || isSaving"
          form-type="submit"
        >
          <view class="zx-contact-edit__button-content">
            <view class="zx-contact-edit__loading" v-if="isSaving">
              <view class="zx-contact-edit__loading-spinner"></view>
            </view>
            <text class="zx-contact-edit__button-text">{{ saveText || '保存' }}</text>
          </view>
        </button>
        
        <!-- 删除按钮 -->
        <button
          class="zx-contact-edit__button zx-contact-edit__button--delete"
          :class="{ 'zx-contact-edit__button--loading': isDeleting }"
          :disabled="disabled || isDeleting"
          v-if="isEdit"
          @click="handleDelete"
        >
          <view class="zx-contact-edit__button-content">
            <view class="zx-contact-edit__loading" v-if="isDeleting">
              <view class="zx-contact-edit__loading-spinner"></view>
            </view>
            <text class="zx-contact-edit__button-text">{{ deleteText || '删除' }}</text>
          </view>
        </button>
      </view>
    </form>
  </view>
</template>

<script setup>
/**
 * zx-contact-edit 联系人编辑
 * @description 编辑并保存联系人信息，支持添加和编辑模式
 * @tutorial https://zxui.org/components/contact-edit
 * @property {Object} contactInfo - 联系人信息对象 {name: '', tel: '', isDefault: false}
 * @property {Boolean} isEdit - 是否为编辑模式 (默认 false)
 * @property {Boolean} isSaving - 是否显示保存按钮加载状态 (默认 false)
 * @property {Boolean} isDeleting - 是否显示删除按钮加载状态 (默认 false)
 * @property {Boolean} showSetDefault - 是否显示设为默认联系人开关 (默认 false)
 * @property {String} setDefaultLabel - 默认联系人开关标签文本 (默认 '设为默认联系人')
 * @property {Function} telValidator - 手机号验证函数
 * @property {Boolean} disabled - 是否禁用 (默认 false)
 * @property {Boolean} clearable - 是否显示清除按钮 (默认 true)
 * @property {Boolean} hideRequiredAsterisk - 是否隐藏必填星号 (默认 false)
 * @property {String} namePlaceholder - 姓名输入框占位符
 * @property {String} telPlaceholder - 手机号输入框占位符
 * @property {String} saveText - 保存按钮文本 (默认 '保存')
 * @property {String} deleteText - 删除按钮文本 (默认 '删除')
 * @property {Object} customStyle - 自定义样式
 * @event {Function} save - 点击保存按钮时触发，参数为联系人信息
 * @event {Function} delete - 点击删除按钮时触发，参数为联系人信息
 * @event {Function} changeDefault - 切换默认联系人状态时触发，参数为是否默认
 */

import { ref, reactive, computed, watch, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  // 联系人信息
  contactInfo: {
    type: Object,
    default: () => ({
      name: '',
      tel: '',
      isDefault: false
    })
  },
  // 是否为编辑模式
  isEdit: {
    type: Boolean,
    default: false
  },
  // 是否显示保存按钮加载状态
  isSaving: {
    type: Boolean,
    default: false
  },
  // 是否显示删除按钮加载状态
  isDeleting: {
    type: Boolean,
    default: false
  },
  // 是否显示设为默认联系人开关
  showSetDefault: {
    type: Boolean,
    default: false
  },
  // 默认联系人开关标签文本
  setDefaultLabel: {
    type: String,
    default: '设为默认联系人'
  },
  // 手机号验证函数
  telValidator: {
    type: Function,
    default: (tel) => {
      // 简单的手机号验证
      return /^1[3-9]\d{9}$/.test(tel)
    }
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示清除按钮
  clearable: {
    type: Boolean,
    default: true
  },
  // 是否隐藏必填星号
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  // 姓名输入框占位符
  namePlaceholder: {
    type: String,
    default: ''
  },
  // 手机号输入框占位符
  telPlaceholder: {
    type: String,
    default: ''
  },
  // 保存按钮文本
  saveText: {
    type: String,
    default: '保存'
  },
  // 删除按钮文本
  deleteText: {
    type: String,
    default: '删除'
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['save', 'delete', 'changeDefault'])

// 联系人数据
const contactData = reactive({
  name: '',
  tel: '',
  isDefault: false
})

// 错误信息
const errors = ref([])

// 监听 contactInfo 变化
watch(
  () => props.contactInfo,
  (newVal) => {
    if (newVal) {
      contactData.name = newVal.name || ''
      contactData.tel = newVal.tel || ''
      contactData.isDefault = newVal.isDefault || false
    }
  },
  { immediate: true, deep: true }
)

// 姓名输入处理
function onNameInput(e) {
  contactData.name = e.detail.value
  // 清除姓名相关错误
  errors.value = errors.value.filter(error => !error.includes('姓名'))
}

// 手机号输入处理
function onTelInput(e) {
  contactData.tel = e.detail.value
  // 清除手机号相关错误
  errors.value = errors.value.filter(error => !error.includes('手机号'))
}

// 清除姓名
function clearName() {
  contactData.name = ''
  errors.value = errors.value.filter(error => !error.includes('姓名'))
}

// 清除手机号
function clearTel() {
  contactData.tel = ''
  errors.value = errors.value.filter(error => !error.includes('手机号'))
}

// 验证姓名
function validateName() {
  const nameErrors = errors.value.filter(error => !error.includes('姓名'))
  if (!contactData.name.trim()) {
    nameErrors.push('请输入姓名')
  }
  errors.value = nameErrors
  return contactData.name.trim() !== ''
}

// 验证手机号
function validateTel() {
  const telErrors = errors.value.filter(error => !error.includes('手机号'))
  if (!contactData.tel.trim()) {
    telErrors.push('请输入手机号')
  } else if (!props.telValidator(contactData.tel)) {
    telErrors.push('请输入正确的手机号')
  }
  errors.value = telErrors
  return contactData.tel.trim() !== '' && props.telValidator(contactData.tel)
}

// 验证表单
function validateForm() {
  errors.value = []
  const nameValid = validateName()
  const telValid = validateTel()
  return nameValid && telValid
}

// 默认联系人状态改变
function onDefaultChange(e) {
  contactData.isDefault = e.detail.value
  emit('changeDefault', e.detail.value)
}

// 提交表单
function handleSubmit(e) {
  e.preventDefault()
  if (props.isSaving) return
  
  if (validateForm()) {
    emit('save', { ...contactData })
  }
}

// 删除联系人
function handleDelete() {
  if (props.isDeleting) return
  emit('delete', { ...contactData })
}
</script>

<style lang="scss" scoped>
.zx-contact-edit {
  padding: 32rpx;
  background-color: #fff;
  
  &__form {
    width: 100%;
  }
  
  &__fields {
    background-color: #f8f8f8;
    border-radius: 16rpx;
    overflow: hidden;
  }
  
  &__field {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;
    background-color: #fff;
    border-bottom: 1rpx solid #ebedf0;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  &__label {
    width: 164rpx;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    
    &-text {
      font-size: 28rpx;
      color: #323233;
      line-height: 48rpx;
    }
  }
  
  &__required {
    color: #ee0a24;
    font-size: 28rpx;
    margin-left: 4rpx;
  }
  
  &__input-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  &__input {
    flex: 1;
    font-size: 28rpx;
    color: #323233;
    line-height: 48rpx;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    
    &::placeholder {
      color: #c8c9cc;
    }
  }
  
  &__clear {
    width: 32rpx;
    height: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16rpx;
    
    &-icon {
      font-size: 32rpx;
      color: #c8c9cc;
      line-height: 1;
    }
  }
  
  &__switch-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    margin-top: 20rpx;
    background-color: #fff;
    border-radius: 16rpx;
  }
  
  &__switch-label {
    flex: 1;
  }
  
  &__switch-text {
    font-size: 28rpx;
    color: #323233;
    line-height: 48rpx;
  }
  
  &__switch-wrapper {
    margin-left: 24rpx;
  }
  
  &__errors {
    margin-top: 16rpx;
  }
  
  &__error {
    padding: 8rpx 0;
    
    &-text {
      font-size: 24rpx;
      color: #ee0a24;
      line-height: 32rpx;
    }
  }
  
  &__buttons {
    padding: 64rpx 0 0;
  }
  
  &__button {
    width: 100%;
    height: 88rpx;
    border-radius: 44rpx;
    border: none;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 88rpx;
    margin-bottom: 24rpx;
    position: relative;
    overflow: hidden;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &--save {
      background-color: #07c160;
      color: #fff;
      
      &:disabled {
        background-color: #c8c9cc;
        color: #fff;
      }
    }
    
    &--delete {
      background-color: #ee0a24;
      color: #fff;
      
      &:disabled {
        background-color: #c8c9cc;
        color: #fff;
      }
    }
    
    &--loading {
      pointer-events: none;
    }
  }
  
  &__button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  &__button-text {
    line-height: 1;
  }
  
  &__loading {
    margin-right: 16rpx;
  }
  
  &__loading-spinner {
    width: 32rpx;
    height: 32rpx;
    border: 4rpx solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: zx-contact-edit-spin 1s linear infinite;
  }
}

@keyframes zx-contact-edit-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>