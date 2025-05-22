<template>
  <view class="zx-input-container" :class="[size ? 'zx-input-' + size : '']">
    <!-- 前缀图标 -->
    <view class="zx-input-prefix" v-if="prefixIcon">
      <text :class="prefixIcon" @click="onClickPrefixIcon"></text>
    </view>

    <!-- 输入框 -->
    <input
      class="zx-input"
      :style="getStyle"
      :value="modelValue"
      :type="type"
      :name="name"
      :disabled="disabled"
      :password="showPassword"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :placeholderClass="placeholderClass"
      :maxlength="maxlength"
      :cursorSpacing="cursorSpacing"
      :cursorColor="cursorColor"
      :autoFocus="autoFocus"
      :focus="focus"
      :cursor="cursor"
      :confirmType="confirmType"
      :alwaysEmbed="alwaysEmbed"
      :confirmHold="confirmHold"
      :selectionStart="selectionStart"
      :selectionEnd="selectionEnd"
      :adjustPosition="adjustPosition"
      :holdKeyboard="holdKeyboard"
      :safePasswordCertPath="safePasswordCertPath"
      :safePasswordLength="safePasswordLength"
      :safePasswordTimeStamp="safePasswordTimeStamp"
      :safePasswordNonce="safePasswordNonce"
      :safePasswordSalt="safePasswordSalt"
      :safePasswordCustomHash="safePasswordCustomHash"
      @keyboardheightchange="keyBoardHeightChange"
      @confirm="onConfirm"
      @nicknamereview="nicknameReview"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <!-- 清除按钮 -->
    <view
      class="zx-input-clear"
      v-if="clearable && modelValue && !disabled && isFocused"
      @click="onClear"
    >
      <text class="uni-icon">&#xe434;</text>
    </view>

    <!-- 密码显示切换 -->
    <view
      class="zx-input-password-eye"
      v-if="password && !disabled"
      @click="togglePasswordVisible"
    >
      <text class="uni-icon" :class="showPassword ? '' : 'uni-eye-active'">&#xe568;</text>
    </view>

    <!-- 后缀图标 -->
    <view class="zx-input-suffix" v-if="suffixIcon">
      <text :class="suffixIcon" @click="onClickSuffixIcon"></text>
    </view>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, watch } from "vue";
import validator from "validator";

const { proxy } = getCurrentInstance();

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  // 输入框大小 large,default,small
  size: {
    type: String,
    default: "",
  },
  // 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交
  name: {
    type: String,
    default: "",
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // input的类型 text | number | idcard | digit | tel | safe-password | nickname
  type: {
    type: String,
    default: "text",
  },
  // 是否是密码类型
  password: {
    type: Boolean,
    default: false,
  },
  // 输入框为空时占位符
  placeholder: {
    type: String,
    default: "",
  },
  // 指定 placeholder 的样式
  placeholderStyle: {
    type: String,
    default: "",
  },
  // 指定 placeholder 的样式类
  placeholderClass: {
    type: String,
    default: "",
  },
  // 最大输入长度
  maxlength: {
    type: Number,
    default: 300,
  },
  // 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
  cursorSpacing: {
    type: [String, Number],
    default: 0,
  },
  // 指定光标颜色
  cursorColor: {
    type: String,
    default: "",
  },
  // 自动获取焦点，与focus属性对比，此属性只会首次生效。
  autoFocus: {
    type: Boolean,
    default: false,
  },
  // 获取焦点
  focus: {
    type: Boolean,
    default: false,
  },
  // 指定focus时的光标位置
  cursor: {
    type: Number,
    default: 0,
  },
  // 设置键盘右下角按钮的文字，仅在 type为text 时生效。 send | search | next | go | done
  confirmType: {
    type: String,
    default: "done",
  },
  // 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
  alwaysEmbed: {
    type: Boolean,
    default: false,
  },
  // 点击键盘右下角按钮时是否保持键盘不收起
  confirmHold: {
    type: Boolean,
    default: false,
  },
  // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
  selectionStart: {
    type: Number,
    default: -1,
  },
  // 光标结束位置，自动聚集时有效，需与selection-satrt搭配使用
  selectionEnd: {
    type: Number,
    default: -1,
  },
  // 键盘弹起时，是否自动上推页面
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  // focus时，点击页面的时候不收起键盘
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  // 安全键盘加密公钥的路径，只支持包内路径
  safePasswordCertPath: {
    type: String,
    default: "",
  },
  // 安全键盘输入密码长度
  safePasswordLength: {
    type: Number,
    default: 0,
  },
  // 安全键盘加密时间戳
  safePasswordTimeStamp: {
    type: Number,
    default: 0,
  },
  // 安全键盘加密盐值
  safePasswordNonce: {
    type: String,
    default: "",
  },
  // 安全键盘计算 hash 盐值，若指定custom-hash 则无效
  safePasswordSalt: {
    type: String,
    default: "",
  },
  // 安全键盘计算 hash 的算法表达式
  safePasswordCustomHash: {
    type: String,
    default: "",
  },
  // 数据验证规则，使用validator库中的方法名
  validate: {
    type: String,
    default: "",
  },
  // 边框线条大小
  borderSize: {
    type: String,
    default: "1rpx",
  },
  // 边框线条颜色
  borderColor: {
    type: String,
    default: "#ececec",
  },
  // 聚焦时边框颜色
  borderActiveColor: {
    type: String,
    default: "#2979ff",
  },
  // 验证错误时边框颜色
  borderErrorColor: {
    type: String,
    default: "#ff0000",
  },
  // 边框样式
  borderStyle: {
    type: String,
    default: "solid",
  },
  // 边框圆角
  borderRadius: {
    type: String,
    default: "10rpx",
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: false,
  },
  // 前缀图标
  prefixIcon: {
    type: String,
    default: "",
  },
  // 后缀图标
  suffixIcon: {
    type: String,
    default: "",
  },
});

// 定义事件
const emit = defineEmits([
  "update:modelValue",
  "input",
  "focus",
  "blur",
  "confirm",
  "clear",
  "click-prefix-icon",
  "click-suffix-icon",
]);

const isActive = ref(false);
const isError = ref(false);
const isFocused = ref(false);
const showPassword = ref(props.password);

// 监听焦点状态变化
watch(
  () => props.focus,
  (val) => {
    isFocused.value = val;
  }
);

const getStyle = computed(() => {
  let style = {
    border: `${props.borderSize} ${props.borderStyle} ${props.borderColor}`,
  };
  if (isActive.value) {
    style = {
      border: `${props.borderSize} ${props.borderStyle} ${props.borderActiveColor}`,
    };
  }
  if (isError.value) {
    style = {
      border: `${props.borderSize} ${props.borderStyle} ${props.borderErrorColor}`,
    };
  }
  // 输入框大小
  style.borderRadius = props.borderRadius;

  switch (props.size) {
    case "small":
      style.height = "45rpx";
      style.fontSize = "28rpx";
      style.padding = "15rpx 20rpx";
      break;
    case "large":
      style.height = "80rpx";
      style.fontSize = "34rpx";
      style.padding = "10rpx 20rpx";
      break;
    default:
      style.height = "55rpx";
      style.fontSize = "30rpx";
      style.padding = "15rpx 20rpx";
      break;
  }
  return style;
});

// 输入事件
function onInput(e) {
  const value = e.detail.value;
  emit("update:modelValue", value);
  emit("input", e);
}

// 获取焦点事件
function onFocus(e) {
  isActive.value = true;
  isFocused.value = true;
  emit("focus", e);
}

// 输入框失去焦点时触发
function onBlur(e) {
  isActive.value = false;
  isFocused.value = false;

  // 验证输入内容
  if (
    props.validate &&
    props.validate in validator &&
    !validator[props.validate](e.detail.value)
  ) {
    isError.value = true;
  } else {
    isError.value = false;
  }

  emit("blur", e);
}

// 键盘高度变化事件
function keyBoardHeightChange(e) {
  // 可以在这里处理键盘高度变化
}

// 点击完成按钮事件
function onConfirm(e) {
  emit("confirm", e);
}

// 昵称审核事件
function nicknameReview(e) {
  // 微信小程序昵称审核事件
}

// 清除输入内容
function onClear() {
  emit("update:modelValue", "");
  emit("clear");
}

// 切换密码显示/隐藏
function togglePasswordVisible() {
  showPassword.value = !showPassword.value;
}

// 点击前缀图标
function onClickPrefixIcon(e) {
  emit("click-prefix-icon", e);
}

// 点击后缀图标
function onClickSuffixIcon(e) {
  emit("click-suffix-icon", e);
}
</script>

<style scoped>
.zx-input-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.zx-input {
  flex: 1;
  width: 100%;
}

.zx-input-small {
  font-size: 28rpx;
}

.zx-input-large {
  font-size: 34rpx;
}

.zx-input-prefix,
.zx-input-suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10rpx;
}

.zx-input-clear,
.zx-input-password-eye {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10rpx;
  color: #c0c4cc;
}

.zx-input-clear:active,
.zx-input-password-eye:active {
  opacity: 0.8;
}

.uni-icon {
  font-family: uniicons;
  font-size: 30rpx;
}

.uni-eye-active {
  color: #2979ff;
}
</style>
