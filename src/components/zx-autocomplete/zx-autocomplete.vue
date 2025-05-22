<template>
  <view class="zx-autocomplete">
    <view class="zx-autocomplete__wrapper">
      <input
        v-model="currentValue"
        class="zx-autocomplete__input"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{ 'is-disabled': disabled }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :focus="isFocus"
      />
      <view class="zx-autocomplete__suffix" v-if="clearable && currentValue" @tap="handleClear">
        <text class="zx-autocomplete__clear-icon">×</text>
      </view>
      <slot name="suffix"></slot>
    </view>
    
    <view
      v-show="suggestionVisible"
      class="zx-autocomplete__suggestion"
      :class="{ 'is-loading': loading }"
      :style="{ width: dropdownWidth }"
    >
      <view v-if="loading" class="zx-autocomplete__loading">
        <slot name="loading">
          <view class="zx-autocomplete__loading-icon"></view>
        </slot>
      </view>
      <scroll-view v-else scroll-y class="zx-autocomplete__list">
        <view v-if="suggestions.length === 0" class="zx-autocomplete__empty">
          无匹配数据
        </view>
        <view
          v-else
          v-for="(item, index) in suggestions"
          :key="index"
          class="zx-autocomplete__item"
          :class="{ 'is-active': highlightedIndex === index }"
          @tap="handleSelect(item)"
        >
          <slot :item="item">
            <text>{{ item[valueKey] }}</text>
          </slot>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ZxAutocomplete',
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear', 'select'],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    fetchSuggestions: {
      type: Function,
      default: () => []
    },
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    debounce: {
      type: Number,
      default: 300
    },
    hideLoading: {
      type: Boolean,
      default: false
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    },
    fitInputWidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activated: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1,
      suggestionVisible: false,
      dropdownWidth: 'auto',
      currentValue: this.modelValue,
      isFocus: false,
      debounceTimer: null
    }
  },
  watch: {
    modelValue(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('update:modelValue', val)
      if (this.triggerOnFocus || val) {
        this.debouncedGetData(val)
      } else {
        this.suggestions = []
        this.suggestionVisible = false
      }
    }
  },
  mounted() {
    // 获取输入框宽度设置下拉框宽度
    if (this.fitInputWidth) {
      uni.createSelectorQuery()
        .in(this)
        .select('.zx-autocomplete__wrapper')
        .boundingClientRect(data => {
          if (data) {
            this.dropdownWidth = `${data.width}px`
          }
        })
        .exec()
    }
  },
  methods: {
    handleInput() {
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    },
    handleFocus() {
      this.isFocus = true
      this.activated = true
      this.$emit('focus', this.currentValue)
      if (this.triggerOnFocus) {
        this.debouncedGetData(this.currentValue)
      }
    },
    handleBlur() {
      this.isFocus = false
      setTimeout(() => {
        this.suggestionVisible = false
      }, 100)
      this.$emit('blur', this.currentValue)
    },
    handleClear() {
      this.currentValue = ''
      this.$emit('clear')
      this.suggestions = []
      this.suggestionVisible = false
    },
    handleSelect(item) {
      this.currentValue = item[this.valueKey]
      this.$emit('select', item)
      this.suggestions = []
      this.suggestionVisible = false
    },
    debouncedGetData(val) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }
      this.debounceTimer = setTimeout(() => {
        this.getData(val)
      }, this.debounce)
    },
    getData(val) {
      if (this.fetchSuggestions) {
        this.loading = true
        
        const cb = (suggestions) => {
          this.loading = false
          if (Array.isArray(suggestions)) {
            this.suggestions = suggestions
            this.suggestionVisible = suggestions.length > 0
            this.highlightedIndex = this.highlightFirstItem ? 0 : -1
          } else {
            console.error('[ZxAutocomplete] 数据源必须是数组')
          }
        }
        
        if (this.fetchSuggestions.length <= 1) {
          const result = this.fetchSuggestions(val)
          if (result && result.then) {
            result.then(cb)
          } else {
            cb(result)
          }
        } else {
          this.fetchSuggestions(val, cb)
        }
      } else {
        this.suggestions = []
        this.suggestionVisible = false
      }
    },
    highlight(index) {
      if (this.suggestions.length === 0 || !this.suggestionVisible) return
      if (index < 0) {
        this.highlightedIndex = this.suggestions.length - 1
      } else if (index >= this.suggestions.length) {
        this.highlightedIndex = 0
      } else {
        this.highlightedIndex = index
      }
    },
    close() {
      this.suggestionVisible = false
    }
  }
}
</script>

<style lang="scss">
.zx-autocomplete {
  position: relative;
  width: 100%;
  
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  &__input {
    width: 100%;
    height: 80rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    border: 2rpx solid #dcdfe6;
    border-radius: 8rpx;
    box-sizing: border-box;
    
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  
  &__suffix {
    position: absolute;
    right: 20rpx;
    display: flex;
    align-items: center;
  }
  
  &__clear-icon {
    font-size: 36rpx;
    color: #c0c4cc;
  }
  
  &__suggestion {
    position: absolute;
    top: 82rpx;
    left: 0;
    z-index: 10;
    width: 100%;
    margin-top: 10rpx;
    background-color: #fff;
    border: 2rpx solid #e4e7ed;
    border-radius: 8rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    max-height: 400rpx;
  }
  
  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
  }
  
  &__loading-icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    border: 4rpx solid #f3f3f3;
    border-top: 4rpx solid #409eff;
    border-radius: 50%;
    animation: zx-loading 1s linear infinite;
  }
  
  &__list {
    max-height: 400rpx;
  }
  
  &__empty {
    padding: 20rpx;
    text-align: center;
    color: #999;
    font-size: 28rpx;
  }
  
  &__item {
    padding: 20rpx;
    font-size: 28rpx;
    color: #606266;
    
    &.is-active {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
}

@keyframes zx-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
