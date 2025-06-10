<template>
  <view class="zx-combox" :class="border ? '' : 'zx-combox__no-border'">
    <view v-if="label" class="zx-combox__label" :style="labelStyle">
      <text>{{ label }}</text>
    </view>
    <view class="zx-combox__input-box">
      <zx-input class="zx-combox__input" type="text" :placeholder="placeholder" placeholder-class="zx-combox__input-plac"
        v-model="inputVal" @input="onInput" @focus="onFocus" @blur="onBlur" />
      <zx-icon :type="showSelector ? 'top' : 'bottom'" size="14" color="#999" @click="toggleSelector">
      </zx-icon>
    </view>
    <view class="zx-combox__selector" v-if="showSelector">
      <view class="zx-popper__arrow"></view>
      <scroll-view scroll-y="true" class="zx-combox__selector-scroll" @scroll="onScroll">
        <view class="zx-combox__selector-empty" v-if="filterCandidatesLength === 0">
          <text>{{ emptyTips }}</text>
        </view>
        <view class="zx-combox__selector-item" v-for="(item, index) in filterCandidates" :key="index"
          @click="onSelectorClick(index)">
          <text>{{ item }}</text>
        </view>
      </scroll-view>
    </view>
    <!-- 蒙层，点击蒙层时关闭选项显示 -->
    <view class="zx-combox__mask" v-show="showSelector" @click="closeSelector"></view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import zxInput from "@tanzhenxing/zx-input/zx-input.vue";
import zxIcon from "@tanzhenxing/zx-icon/zx-icon.vue";

/**
 * Combox 组合输入框
 * @description 组合输入框一般用于既可以输入也可以选择的场景
 * @property {String} label 左侧文字
 * @property {String} labelWidth 左侧内容宽度
 * @property {String} placeholder 输入框占位符
 * @property {Array} candidates 候选项列表
 * @property {String} emptyTips 筛选结果为空时显示的文字
 * @property {String} modelValue 组合框的值
 * @property {Boolean} border 是否显示边框
 * @event {Function} update:modelValue 组合框值改变时触发
 */

const props = defineProps({
  border: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "",
  },
  labelWidth: {
    type: String,
    default: "auto",
  },
  placeholder: {
    type: String,
    default: "",
  },
  candidates: {
    type: Array,
    default: () => [],
  },
  emptyTips: {
    type: String,
    default: "无匹配项",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "input"]);

// 响应式状态
const showSelector = ref(false);
const inputVal = ref("");
let blurTimer = null;

// 计算属性
const labelStyle = computed(() => {
  if (props.labelWidth === "auto") {
    return "";
  }
  return `width: ${props.labelWidth}`;
});

const filterCandidates = computed(() => {
  if (inputVal.value === 0 || !inputVal.value) {
    return props.candidates;
  }
  return props.candidates.filter((item) => {
    return item.toString().toLowerCase().indexOf(inputVal.value.toLowerCase()) > -1;
  });
});

const filterCandidatesLength = computed(() => {
  return filterCandidates.value.length;
});

// 监听属性变化
watch(
  () => props.modelValue,
  (newVal) => {
    inputVal.value = newVal;
  },
  { immediate: true }
);

// 方法
const toggleSelector = () => {
  showSelector.value = !showSelector.value;
};

const closeSelector = () => {
  showSelector.value = false;
};

const onFocus = () => {
  showSelector.value = true;
};

const onBlur = () => {
  blurTimer = setTimeout(() => {
    showSelector.value = false;
  }, 150);
};

const onScroll = () => {
  // 滚动时将blur的定时器关掉
  if (blurTimer) {
    clearTimeout(blurTimer);
    blurTimer = null;
  }
};

const onSelectorClick = (index) => {
  inputVal.value = filterCandidates.value[index];
  showSelector.value = false;
  emit("update:modelValue", inputVal.value);
  emit("input", inputVal.value); // 兼容Vue2写法
};

const onInput = () => {
  emit("update:modelValue", inputVal.value);
  emit("input", inputVal.value); // 兼容Vue2写法
};
</script>

<style lang="scss">
.zx-combox {
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 6px 10px;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  // height: 40px;
  flex-direction: row;
  align-items: center;
}

.zx-combox__label {
  font-size: 16px;
  line-height: 22px;
  padding-right: 10px;
  color: #999999;
}

.zx-combox__input-box {
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex: 1;
  flex-direction: row;
  align-items: center;
}

.zx-combox__input {
  flex: 1;
  font-size: 14px;
  height: 22px;
  line-height: 22px;
}

.zx-combox__input-plac {
  font-size: 14px;
  color: #999;
}

.zx-combox__selector {
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 3;
  padding: 4px 0;
}

.zx-combox__selector-scroll {
  /* #ifndef APP-NVUE */
  max-height: 200px;
  box-sizing: border-box;
  /* #endif */
}

.zx-combox__selector-empty,
.zx-combox__selector-item {
  /* #ifndef APP-NVUE */
  display: flex;
  cursor: pointer;
  /* #endif */
  line-height: 36px;
  font-size: 14px;
  text-align: center;
  padding: 0px 10px;
}

.zx-combox__selector-item:hover {
  background-color: #f9f9f9;
}

.zx-combox__selector-empty:last-child,
.zx-combox__selector-item:last-child {
  /* #ifndef APP-NVUE */
  border-bottom: none;
  /* #endif */
}

// picker 弹出层通用的指示小三角
.zx-popper__arrow,
.zx-popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 6px;
}

.zx-popper__arrow {
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  top: -6px;
  left: 10%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}

.zx-popper__arrow::after {
  content: " ";
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}

.zx-combox__no-border {
  border: none;
}

.zx-combox__mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
