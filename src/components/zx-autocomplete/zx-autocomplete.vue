<template>
  <view class="zx-autocomplete">
    <view class="zx-autocomplete__wrapper">
      <input
        v-model="currentValue"
        class="zx-autocomplete__input"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{ 'is-disabled': disabled }"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :focus="isFocus"
      />
      <view
        class="zx-autocomplete__suffix"
        v-if="clearable && currentValue"
        @tap="onClear"
      >
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
      <view v-if="loading && !hideLoading" class="zx-autocomplete__loading">
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
          @tap="() => onSelect(item)"
        >
          <slot :item="item">
            <text>{{ item[valueKey] }}</text>
          </slot>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed, nextTick, onMounted } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "请输入" },
  disabled: { type: Boolean, default: false },
  valueKey: { type: String, default: "value" },
  clearable: { type: Boolean, default: false },
  fetchSuggestions: { type: Function, default: () => [] },
  triggerOnFocus: { type: Boolean, default: true },
  debounce: { type: Number, default: 300 },
  hideLoading: { type: Boolean, default: false },
  highlightFirstItem: { type: Boolean, default: false },
  fitInputWidth: { type: Boolean, default: false },
});
const emit = defineEmits([
  "update:modelValue",
  "input",
  "change",
  "focus",
  "blur",
  "clear",
  "select",
]);

const currentValue = ref(props.modelValue);
const suggestions = ref([]);
const loading = ref(false);
const highlightedIndex = ref(-1);
const suggestionVisible = ref(false);
const dropdownWidth = ref("auto");
const isFocus = ref(false);
let debounceTimer = null;

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = val;
  }
);

watch(currentValue, (val) => {
  emit("update:modelValue", val);
  if (props.triggerOnFocus || val) {
    debouncedGetData(val);
  } else {
    suggestions.value = [];
    suggestionVisible.value = false;
  }
});

function onInput() {
  emit("input", currentValue.value);
  emit("change", currentValue.value);
}
function onFocus() {
  isFocus.value = true;
  emit("focus", currentValue.value);
  if (props.triggerOnFocus) {
    debouncedGetData(currentValue.value);
  }
}
function onBlur() {
  isFocus.value = false;
  setTimeout(() => {
    suggestionVisible.value = false;
  }, 100);
  emit("blur", currentValue.value);
}
function onClear() {
  currentValue.value = "";
  emit("clear");
  suggestions.value = [];
  suggestionVisible.value = false;
}
function onSelect(item) {
  currentValue.value = item[props.valueKey];
  emit("select", item);
  suggestions.value = [];
  suggestionVisible.value = false;
}
function debouncedGetData(val) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    getData(val);
  }, props.debounce);
}
function getData(val) {
  if (props.fetchSuggestions) {
    loading.value = true;
    const cb = (list) => {
      loading.value = false;
      if (Array.isArray(list)) {
        suggestions.value = list;
        suggestionVisible.value = list.length > 0;
        highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
      } else {
        suggestions.value = [];
        suggestionVisible.value = false;
        highlightedIndex.value = -1;
        // 这里不抛异常，兼容多端
      }
    };
    if (props.fetchSuggestions.length <= 1) {
      const result = props.fetchSuggestions(val);
      if (result && typeof result.then === "function") {
        result.then(cb);
      } else {
        cb(result);
      }
    } else {
      props.fetchSuggestions(val, cb);
    }
  } else {
    suggestions.value = [];
    suggestionVisible.value = false;
  }
}
function highlight(index) {
  if (suggestions.value.length === 0 || !suggestionVisible.value) return;
  if (index < 0) {
    highlightedIndex.value = suggestions.value.length - 1;
  } else if (index >= suggestions.value.length) {
    highlightedIndex.value = 0;
  } else {
    highlightedIndex.value = index;
  }
}
function close() {
  suggestionVisible.value = false;
}

// 下拉宽度适配，仅在 fitInputWidth 时生效
onMounted(() => {
  if (props.fitInputWidth) {
    nextTick(() => {
      // 兼容多端 selectorQuery
      uni
        .createSelectorQuery()
        .in(getCurrentInstance().proxy)
        .select(".zx-autocomplete__wrapper")
        .boundingClientRect((data) => {
          if (data) {
            dropdownWidth.value = `${data.width}px`;
          }
        })
        .exec();
    });
  }
});
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
