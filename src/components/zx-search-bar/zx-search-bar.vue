<template>
  <view class="zx-searchbar">
    <view
      class="zx-searchbar__box"
      :style="{ borderRadius: radius + 'px', backgroundColor: bgColor }"
      @click="onBoxClick"
    >
      <view class="zx-searchbar__icon-search">
        <slot name="searchIcon">
          <zx-icon color="#c0c4cc" size="18" name="search" />
        </slot>
      </view>
      <input
        v-if="showInput || modelValue"
        class="zx-searchbar__input"
        :focus="focusSync"
        :disabled="readonly"
        :placeholder="placeholderText"
        :maxlength="maxlength"
        confirm-type="search"
        type="text"
        v-model="inputValue"
        :style="{ color: textColor }"
        @confirm="onConfirm"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
      />
      <text v-else class="zx-searchbar__placeholder">{{ placeholder }}</text>
      <view
        v-if="showInput && (clearButton === 'always' || (clearButton === 'auto' && inputValue !== '')) && !readonly"
        class="zx-searchbar__icon-clear"
        @click.stop="onClear"
      >
        <slot name="clearIcon">
          <zx-icon color="#c0c4cc" size="20" name="clear" />
        </slot>
      </view>
    </view>
    <text
      v-if="cancelButton === 'always' || (showInput && cancelButton === 'auto')"
      class="zx-searchbar__cancel"
      @click="onCancel"
    >{{ cancelTextI18n }}</text>
  </view>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue'
import { initVueI18n } from '@dcloudio/uni-i18n'
import messages from './i18n/index.js'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  radius: {
    type: [Number, String],
    default: 5
  },
  clearButton: {
    type: String,
    default: 'auto' // always | auto | none
  },
  cancelButton: {
    type: String,
    default: 'auto' // always | auto | none
  },
  cancelText: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: '#F8F8F8'
  },
  textColor: {
    type: String,
    default: '#000000'
  },
  maxlength: {
    type: [Number, String],
    default: 100
  },
  focus: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'input',
  'clear',
  'cancel',
  'confirm',
  'blur',
  'focus'
])

const { t } = initVueI18n(messages)

const inputValue = ref(props.modelValue)
const showInput = ref(false)
const focusSync = ref(false)

const placeholderText = computed(() => props.placeholder || t('zx-search-bar.placeholder'))
const cancelTextI18n = computed(() => props.cancelText || t('zx-search-bar.cancel'))

watch(() => props.modelValue, (val) => {
  inputValue.value = val
  if (val) showInput.value = true
})

watch(() => props.focus, (val) => {
  if (val && !props.readonly) {
    showInput.value = true
    nextTick(() => {
      focusSync.value = true
    })
  }
})

watch(inputValue, (val) => {
  emit('update:modelValue', val)
  emit('input', val)
})

function onBoxClick() {
  if (props.readonly) return
  if (!showInput.value) {
    showInput.value = true
    nextTick(() => {
      focusSync.value = true
    })
  }
}

function onClear() {
  inputValue.value = ''
  emit('clear', { value: '' })
}

function onCancel() {
  if (props.readonly) return
  emit('cancel', { value: inputValue.value })
  inputValue.value = ''
  showInput.value = false
  focusSync.value = false
  // 隐藏键盘
  if (typeof uni !== 'undefined' && uni.hideKeyboard) {
    uni.hideKeyboard()
  }
}

function onConfirm() {
  if (typeof uni !== 'undefined' && uni.hideKeyboard) {
    uni.hideKeyboard()
  }
  emit('confirm', { value: inputValue.value })
}

function onBlur() {
  if (typeof uni !== 'undefined' && uni.hideKeyboard) {
    uni.hideKeyboard()
  }
  emit('blur', { value: inputValue.value })
}

function onFocus(e) {
  emit('focus', e?.detail || {})
}

function onInput(e) {
  inputValue.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.zx-searchbar {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 10px;
}
.zx-searchbar__box {
  display: flex;
  box-sizing: border-box;
  justify-content: left;
  overflow: hidden;
  position: relative;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 36px;
  padding: 5px 8px 5px 0px;
}
.zx-searchbar__icon-search {
  display: flex;
  flex-direction: row;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  color: #B3B3B3;
}
.zx-searchbar__input {
  flex: 1;
  font-size: 14px;
  color: #333;
  margin-left: 5px;
  margin-top: 1px;
  background-color: inherit;
}
.zx-searchbar__icon-clear {
  align-items: center;
  line-height: 24px;
  padding-left: 8px;
}
.zx-searchbar__placeholder {
  font-size: 14px;
  color: #B3B3B3;
  margin-left: 5px;
  text-align: left;
}
.zx-searchbar__cancel {
  padding-left: 10px;
  line-height: 36px;
  font-size: 14px;
  color: #333333;
}
</style>
