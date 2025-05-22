<template>
  <button
    :form-type="formType"
    :open-type="openType"
    :type="realType"
    :plain="plain"
    :disabled="disabled"
    :hover-class="getHoverClass"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :hover-stop-propagation="hoverStopPropagation"
    :app-parameter="appParameter"
    :lang="lang"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :group-id="groupId"
    :guild-id="guildId"
    :public-id="publicId"
    :data-im-id="dataImId"
    :data-im-type="dataImType"
    :data-goods-id="dataGoodsId"
    :data-order-id="dataOrderId"
    :data-biz-line="dataBizLine"
    :size="sizeToStandard"
    :class="[
      'zx-button',
      `zx-button--${realTypeName}`,
      {
        'zx-button--text': text, 
        'zx-button--link': link, 
        'zx-button--round': round, 
        'zx-button--circle': circle, 
        'zx-button--plain': plain,
        'zx-button--large': size === 'large',
        'zx-button--mini': size === 'mini',
        'is-disabled': disabled || loading, 
        'is-loading': loading
      }
    ]"
    :style="buttonStyle"
    @getphonenumber="getPhoneNumber"
    @getuserinfo="getUserInfo"
    @error="error"
    @opensetting="openSetting"
    @launchapp="launchApp"
    @contact="contact"
    @chooseavatar="chooseAvatar"
    @agreeprivacyauthorization="agreePrivacyAuthorization"
    @addgroupapp="addGroupApp"
    @chooseaddress="chooseAddress"
    @chooseinvoicetitle="chooseInvoiceTitle"
    @subscribe="subscribe"
    @login="login"
    @im="im"
    @click="click"
  >
    <view class="zx-button__content">
      <!-- 加载图标 -->
      <slot name="loading" v-if="loading">
        <view class="zx-button__loading" :style="{marginRight: $slots.default ? '10rpx' : '0'}">
          <view class="zx-button__loading-spinner"></view>
        </view>
      </slot>
      <!-- 图标 -->
      <slot name="icon" v-else-if="icon">
        <view class="zx-button__icon" :style="{ marginRight: $slots.default ? '10rpx' : '0' }">
          <zx-icon :name="icon" :size="iconSize" :color="iconColorComputed"></zx-icon>
        </view>
      </slot>
      <!-- 文本 -->
      <slot></slot>
    </view>
  </button>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, computed, defineEmits, defineExpose } from "vue";

const { proxy } = getCurrentInstance();

// 设置组件名称
proxy.$options = proxy.$options || {};
proxy.$options.name = 'zx-button';

const props = defineProps({
  // 按钮的大小
  size: {
    type: String,
    default: "default", // default, mini, large
  },
  // 按钮的样式类型: default, primary, warn, success, warning, danger, info
  type: {
    type: String,
    default: "default",
  },
  // 按钮是否镂空，背景色透明
  plain: {
    type: Boolean,
    default: false,
  },
  // 是否为文本按钮
  text: {
    type: Boolean,
    default: false,
  },
  // 是否为链接按钮
  link: {
    type: Boolean,
    default: false,
  },
  // 是否圆角按钮
  round: {
    type: Boolean,
    default: false,
  },
  // 是否圆形按钮
  circle: {
    type: Boolean,
    default: false,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 名称前是否带 loading 图标
  loading: {
    type: Boolean,
    default: false,
  },
  // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
  formType: {
    type: String,
    default: "",
  },
  // 开放能力
  openType: {
    type: String,
    default: "",
  },
  // 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
  hoverClass: {
    type: String,
    default: "button-hover",
  },
  // 按住后多久出现点击态，单位毫秒
  hoverStartTime: {
    type: Number,
    default: 20,
  },
  // 手指松开后点击态保留时间，单位毫秒
  hoverStayTime: {
    type: Number,
    default: 70,
  },
  // 指定是否阻止本节点的祖先节点出现点击态
  hoverStopPropagation: {
    type: Boolean,
    default: false,
  },
  // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
  appParameter: {
    type: String,
    default: "",
  },
  // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
  lang: {
    type: String,
    default: "zh_CN",
  },
  // 会话来源，open-type="contact"时有效
  sessionFrom: {
    type: String,
    default: "",
  },
  // 会话内消息卡片标题，open-type="contact"时有效
  sendMessageTitle: {
    type: String,
    default: "",
  },
  // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
  sendMessagePath: {
    type: String,
    default: "",
  },
  // 会话内消息卡片图片，open-type="contact"时有效
  sendMessageImg: {
    type: String,
    default: "",
  },
  // 是否显示会话内消息卡片
  showMessageCard: {
    type: Boolean,
    default: false,
  },
  // 打开群资料卡时，传递的群号
  groupId: {
    type: String,
    default: "",
  },
  // 打开频道页面时，传递的频道号
  guildId: {
    type: String,
    default: "",
  },
  // 打开公众号资料卡时，传递的号码
  publicId: {
    type: String,
    default: "",
  },
  // 客服的抖音号
  dataImId: {
    type: String,
    default: "",
  },
  // IM卡片类型
  dataImType: {
    type: String,
    default: "",
  },
  // 商品的id
  dataGoodsId: {
    type: String,
    default: "",
  },
  // 订单的id
  dataOrderId: {
    type: String,
    default: "",
  },
  // 商品类型
  dataBizLine: {
    type: String,
    default: "",
  },
  // 按钮形状：square, circle, round (已弃用，请使用 round 和 circle 属性)
  shape: {
    type: String,
    default: "",
  },
  // 文字颜色
  color: {
    type: String,
    default: "",
  },
  // 按钮背景色
  backgroundColor: {
    type: String,
    default: "",
  },
  // 是否显示文字按钮的背景色
  bg: {
    type: Boolean,
    default: false,
  },
  // 图标名称
  icon: {
    type: String,
    default: "",
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: "",
  },
  // 图标大小
  iconSize: {
    type: String,
    default: "36rpx",
  },
  // 是否自动在两个中文字符之间插入空格
  autoInsertSpace: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

// 计算属性：处理尺寸转换
const sizeToStandard = computed(() => {
  if (props.size === "default" || props.size === "mini" || props.size === "large") {
    return props.size;
  }
  return "";
});

// 计算属性：处理按钮类型
const realType = computed(() => {
  if (["default", "primary", "warn"].includes(props.type)) {
    return props.type;
  }
  return "default";
});

// 计算属性：获取类型名称，用于CSS类
const realTypeName = computed(() => {
  return props.type || 'default';
});

// 计算属性：获取hover类
const getHoverClass = computed(() => {
  if (props.hoverClass === "none") return "none";
  if (props.text || props.link) return "zx-button--hover-text";
  return props.hoverClass;
});

// 计算属性：图标颜色
const iconColorComputed = computed(() => {
  if (props.iconColor) return props.iconColor;
  
  // 文字按钮或链接按钮的图标颜色跟随按钮颜色
  if (props.text || props.link) {
    if (props.color) return props.color;
    
    // 根据按钮类型设置默认图标颜色
    switch (props.type) {
      case 'primary': return '#2979ff';
      case 'success': return '#67c23a';
      case 'warn':
      case 'warning': return '#e6a23c';
      case 'danger': return '#f56c6c';
      case 'info': return '#909399';
      default: return '#606266';
    }
  }
  
  // 普通按钮的图标颜色
  if (props.plain) {
    // 镂空按钮图标颜色跟随文字颜色
    switch (props.type) {
      case 'primary': return '#2979ff';
      case 'success': return '#67c23a';
      case 'warn':
      case 'warning': return '#e6a23c';
      case 'danger': return '#f56c6c';
      case 'info': return '#909399';
      default: return '#606266';
    }
  }
  
  // 默认为白色
  return '#ffffff';
});

// 计算属性：按钮样式
const buttonStyle = computed(() => {
  const style = { ...getStyle.value };
  
  // 处理自定义颜色和背景色
  if (props.link || props.text) {
    // 文本按钮和链接按钮样式
    if (props.color) {
      style.color = props.color;
    }
    
    if (props.bg && !props.disabled) {
      style.backgroundColor = 'rgba(64, 158, 255, 0.1)';
    }
  } else if (props.color && !props.plain && !props.disabled) {
    // 带自定义颜色的按钮
    style.backgroundColor = props.color;
    style.borderColor = props.color;
    style.color = '#ffffff';
  } else if (props.backgroundColor && !props.disabled) {
    // 自定义背景色
    style.backgroundColor = props.backgroundColor;
  }
  
  return style;
});

const getStyle = ref({});

onMounted(() => {
  updateStyle();
  // 如果父组件是zx-label，则需要将自己注册到父组件中
  const parent = getParent();
  if (parent && parent.childrens) {
    parent.childrens.value.push(proxy);
  }
});

// 更新样式处理函数
const updateStyle = () => {
  // 处理旧版形状属性兼容
  if (props.shape) {
    if (props.shape === "circle") {
      getStyle.value.borderRadius = "50%";
      
      // 如果设置了具体尺寸，保证按钮是正方形
      if (!isStandardSize() && props.size) {
        getStyle.value.height = props.size;
        getStyle.value.width = props.size;
        getStyle.value.padding = "0";
      }
    } else if (props.shape === "round") {
      getStyle.value.borderRadius = "9999rpx";
      
      if (!isStandardSize() && props.size) {
        getStyle.value.height = props.size;
      }
    }
  }

  // 处理新版圆角和圆形属性
  if (props.circle) {
    getStyle.value.borderRadius = "50%";
    
    if (!isStandardSize() && props.size) {
      getStyle.value.height = props.size;
      getStyle.value.width = props.size;
      getStyle.value.padding = "0";
    }
  } else if (props.round) {
    getStyle.value.borderRadius = "9999rpx";
    
    if (!isStandardSize() && props.size) {
      getStyle.value.height = props.size;
    }
  }
  
  // 自定义尺寸 (仅非标准尺寸应用)
  if (!isStandardSize() && props.size) {
    getStyle.value.height = props.size;
    
    // 如果是圆形按钮，设置宽度等于高度
    if (props.circle || props.shape === "circle") {
      getStyle.value.width = props.size;
    }
  }
};

// 判断是否为标准尺寸 (default/mini/large)
const isStandardSize = () => {
  return ["default", "mini", "large"].includes(props.size);
};

// 事件处理简化为一个函数
const emitEvent = (eventName, e) => {
  emit(eventName, e);
};

// 事件处理函数
const getPhoneNumber = (e) => emitEvent("getPhoneNumber", e);
const getUserInfo = (e) => emitEvent("getUserInfo", e);
const error = (e) => emitEvent("error", e);
const openSetting = (e) => emitEvent("openSetting", e);
const launchApp = (e) => emitEvent("launchApp", e);
const contact = (e) => emitEvent("contact", e);
const chooseAvatar = (e) => emitEvent("chooseAvatar", e);
const agreePrivacyAuthorization = (e) => emitEvent("agreePrivacyAuthorization", e);
const addGroupApp = (e) => emitEvent("addGroupApp", e);
const chooseAddress = (e) => emitEvent("chooseAddress", e);
const chooseInvoiceTitle = (e) => emitEvent("chooseInvoiceTitle", e);
const subscribe = (e) => emitEvent("subscribe", e);
const login = (e) => emitEvent("login", e);
const im = (e) => emitEvent("im", e);
const click = (e) => emitEvent("click", e);

// 获取父组件
const getParent = () => {
  let parent = proxy.$parent;
  while (parent) {
    if (parent.$options && parent.$options.name === 'zx-label') {
      return parent;
    }
    parent = parent.$parent;
  }
  return null;
};

// 暴露给父组件的方法
defineExpose({
  labelClick: click
});
</script>

<style lang="scss" scoped>
/* BEM命名规范的按钮样式 */
.zx-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 76rpx;
  white-space: nowrap;
  cursor: pointer;
  padding: 0 30rpx;
  border-radius: 8rpx;
  border: 1px solid;
  font-weight: 500;
  user-select: none;
  outline: none;
  text-align: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  font-size: 28rpx;
  
  /* 清除uni-app按钮的默认样式 */
  &:after {
    border: none;
  }
  
  /* 尺寸变体 */
  &--large {
    height: 90rpx;
    padding: 0 40rpx;
    font-size: 32rpx;
  }
  
  &--mini {
    height: 56rpx;
    padding: 0 20rpx;
    font-size: 24rpx;
  }
  
  /* 形状变体 */
  &--round {
    border-radius: 9999rpx;
  }
  
  &--circle {
    border-radius: 50%;
    padding: 0;
    
    &[size="default"], &:not([size]) {
      width: 76rpx;
      height: 76rpx;
    }
    
    &[size="mini"] {
      width: 56rpx;
      height: 56rpx;
    }
    
    &[size="large"] {
      width: 90rpx;
      height: 90rpx;
    }
  }
  
  /* 内容布局 */
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* 加载状态 */
  &__loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  &__loading-spinner {
    width: 28rpx;
    height: 28rpx;
    border: 2rpx solid currentColor;
    border-radius: 50%;
    border-right-color: transparent;
    animation: zx-button-loading-rotate 1s linear infinite;
  }
  
  /* 按钮类型 */
  &--default {
    color: #606266;
    background: #ffffff;
    border-color: #dcdfe6;
    
    &.button-hover {
      color: #409eff;
      background-color: #ecf5ff;
      border-color: #c6e2ff;
    }
  }
  
  &--primary {
    color: #ffffff;
    background-color: #2979ff;
    border-color: #2979ff;
    
    &.button-hover {
      background-color: #1d6efd;
      border-color: #1d6efd;
    }
  }
  
  &--warn, &--warning {
    color: #ffffff;
    background-color: #e6a23c;
    border-color: #e6a23c;
    
    &.button-hover {
      background-color: #b88230;
      border-color: #b88230;
    }
  }
  
  &--success {
    color: #ffffff;
    background-color: #67c23a;
    border-color: #67c23a;
    
    &.button-hover {
      background-color: #529b2e;
      border-color: #529b2e;
    }
  }
  
  &--danger {
    color: #ffffff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    
    &.button-hover {
      background-color: #c45656;
      border-color: #c45656;
    }
  }
  
  &--info {
    color: #ffffff;
    background-color: #909399;
    border-color: #909399;
    
    &.button-hover {
      background-color: #73767a;
      border-color: #73767a;
    }
  }
  
  /* 镂空按钮 */
  &--plain {
    background-color: transparent;
    
    &.zx-button--default {
      color: #606266;
      border-color: #dcdfe6;
      
      &.button-hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: rgba(236, 245, 255, 0.3);
      }
    }
    
    &.zx-button--primary {
      color: #2979ff;
      border-color: #a0cfff;
      
      &.button-hover {
        color: #1d6efd;
        border-color: #1d6efd;
        background-color: rgba(29, 110, 253, 0.1);
      }
    }
    
    &.zx-button--warn, &.zx-button--warning {
      color: #e6a23c;
      border-color: #f3d19e;
      
      &.button-hover {
        color: #b88230;
        border-color: #b88230;
        background-color: rgba(184, 130, 48, 0.1);
      }
    }
    
    &.zx-button--success {
      color: #67c23a;
      border-color: #c2e7b0;
      
      &.button-hover {
        color: #529b2e;
        border-color: #529b2e;
        background-color: rgba(82, 155, 46, 0.1);
      }
    }
    
    &.zx-button--danger {
      color: #f56c6c;
      border-color: #fbc4c4;
      
      &.button-hover {
        color: #c45656;
        border-color: #c45656;
        background-color: rgba(196, 86, 86, 0.1);
      }
    }
    
    &.zx-button--info {
      color: #909399;
      border-color: #d3d4d6;
      
      &.button-hover {
        color: #73767a;
        border-color: #73767a;
        background-color: rgba(115, 118, 122, 0.1);
      }
    }
  }
  
  /* 文本按钮 */
  &--text {
    border-color: transparent;
    background: transparent;
    padding: 0;
    height: auto;
    
    &.zx-button--default {
      color: #606266;
      
      &.button-hover {
        color: #409eff;
      }
    }
    
    &.zx-button--primary {
      color: #2979ff;
      
      &.button-hover {
        color: #1d6efd;
      }
    }
    
    &.zx-button--success {
      color: #67c23a;
      
      &.button-hover {
        color: #529b2e;
      }
    }
    
    &.zx-button--warn, &.zx-button--warning {
      color: #e6a23c;
      
      &.button-hover {
        color: #b88230;
      }
    }
    
    &.zx-button--danger {
      color: #f56c6c;
      
      &.button-hover {
        color: #c45656;
      }
    }
    
    &.zx-button--info {
      color: #909399;
      
      &.button-hover {
        color: #73767a;
      }
    }
  }
  
  /* 链接按钮 */
  &--link {
    border-color: transparent;
    background: transparent;
    padding: 0;
    height: auto;
    text-decoration: none;
    
    &.zx-button--default {
      color: #2979ff;
      
      &.button-hover {
        color: #1d6efd;
      }
    }
    
    &.zx-button--primary {
      color: #2979ff;
      
      &.button-hover {
        color: #1d6efd;
      }
    }
    
    &.zx-button--success {
      color: #67c23a;
      
      &.button-hover {
        color: #529b2e;
      }
    }
    
    &.zx-button--warn, &.zx-button--warning {
      color: #e6a23c;
      
      &.button-hover {
        color: #b88230;
      }
    }
    
    &.zx-button--danger {
      color: #f56c6c;
      
      &.button-hover {
        color: #c45656;
      }
    }
    
    &.zx-button--info {
      color: #909399;
      
      &.button-hover {
        color: #73767a;
      }
    }
  }
  
  /* 禁用状态 */
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    
    &:active {
      opacity: 0.6;
    }
    
    &.zx-button--text, &.zx-button--link {
      border-color: transparent;
      background: transparent;
    }
  }
  
  /* 加载状态 */
  &.is-loading {
    pointer-events: none;
    
    .zx-button__loading-spinner {
      border-width: 2rpx;
    }
    
    &.zx-button--text, &.zx-button--link {
      .zx-button__loading-spinner {
        border-width: 1rpx;
      }
    }
  }
  
  /* 文字按钮背景效果 */
  &--text.bg:not(.is-disabled) {
    background-color: rgba(64, 158, 255, 0.1);
  }
  
  /* 文字按钮hover效果 */
  &--hover-text {
    background-color: rgba(64, 158, 255, 0.1);
    opacity: 0.8;
  }
}

/* 加载动画 */
@keyframes zx-button-loading-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
