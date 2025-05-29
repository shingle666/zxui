<template>
  <view class="container">
    <view class="title">zx-button 按钮组件</view>

    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="button-group">
        <view v-for="btn in basicButtons" :key="btn.label">
          <zx-button :type="btn.type" @click="onClick(btn.label)">{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 镂空按钮 -->
    <view class="section">
      <view class="section-title">镂空按钮</view>
      <view class="button-group">
        <view v-for="btn in plainButtons" :key="btn.label">
          <zx-button :type="btn.type" plain @click="onClick(btn.label)">{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 文本按钮 -->
    <view class="section">
      <view class="section-title">文本按钮</view>
      <view class="button-group">
        <view v-for="btn in textButtons" :key="btn.label">
          <zx-button :type="btn.type" text @click="onClick(btn.label)">{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in textBgButtons" :key="btn.label">
          <zx-button :type="btn.type" text bg @click="onClick(btn.label)">{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 链接按钮 -->
    <view class="section">
      <view class="section-title">链接按钮</view>
      <view class="button-group">
        <view v-for="btn in linkButtons" :key="btn.label">
          <zx-button :type="btn.type" link @click="onClick(btn.label)">{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="section">
      <view class="section-title">禁用状态</view>
      <view class="button-group">
        <view v-for="btn in disabledButtons" :key="btn.label">
          <zx-button :type="btn.type" :plain="btn.plain" :text="btn.text" :link="btn.link" disabled>{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in disabledExtraButtons" :key="btn.label">
          <zx-button :type="btn.type" :text="btn.text" :link="btn.link" disabled>{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="section">
      <view class="section-title">加载状态</view>
      <view class="button-group">
        <view v-for="btn in loadingButtons" :key="btn.id">
          <zx-button :type="btn.type" loading>{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in loadingExtraButtons" :key="btn.id">
          <zx-button :type="btn.type" :text="btn.text" loading>{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 按钮尺寸 -->
    <view class="section">
      <view class="section-title">按钮尺寸</view>
      <view class="button-group">
        <view v-for="btn in sizeButtons" :key="btn.label">
          <zx-button :type="btn.type" :size="btn.size" :icon="btn.icon">{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in sizeIconButtons" :key="btn.label">
          <zx-button :type="btn.type" :size="btn.size" :icon="btn.icon">{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in customSizeButtons" :key="btn.label">
          <zx-button :type="btn.type" :size="btn.size">{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 按钮形状 -->
    <view class="section">
      <view class="section-title">按钮形状</view>
      <view class="button-group">
        <view v-for="btn in shapeButtons" :key="btn.label">
          <zx-button :type="btn.type" :round="btn.round" :circle="btn.circle" :icon="btn.icon">{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in shapeExtraButtons" :key="btn.label">
          <zx-button :type="btn.type" :round="btn.round">{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in shapeCircleButtons" :key="btn.label">
          <zx-button :type="btn.type" circle :icon="btn.icon"></zx-button>
        </view>
      </view>
    </view>

    <!-- 带图标的按钮 -->
    <view class="section">
      <view class="section-title">带图标的按钮</view>
      <view class="button-group">
        <view v-for="btn in iconButtons" :key="btn.label">
          <zx-button :type="btn.type" :icon="btn.icon">{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in iconTextButtons" :key="btn.label">
          <zx-button :type="btn.type" :icon="btn.icon" text>{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="button-group">
        <view v-for="btn in customStyleButtons" :key="btn.label">
          <zx-button
            :color="btn.color"
            :backgroundColor="btn.backgroundColor"
            :style="btn.style"
            :round="btn.round"
            :plain="btn.plain"
            @click="onClick(btn.label)"
          >{{ btn.label }}</zx-button>
        </view>
      </view>
      <view class="button-group" style="margin-top: 20rpx">
        <view v-for="btn in customStyleExtraButtons" :key="btn.label">
          <zx-button
            :color="btn.color"
            :style="btn.style"
            :round="btn.round"
            :plain="btn.plain"
            @click="onClick(btn.label)"
          >{{ btn.label }}</zx-button>
        </view>
      </view>
    </view>

    <!-- 使用插槽 -->
    <view class="section">
      <view class="section-title">使用插槽</view>
      <view class="button-group">
        <zx-button type="primary" @click="onClick('自定义内容')">
          <template #icon>
            <view class="custom-icon">🔍</view>
          </template>
          自定义内容
        </zx-button>
        <zx-button type="success" @click="onClick('自定义加载图标')">
          <template #loading>
            <view style="margin-right: 10rpx">🔄</view>
          </template>
          自定义加载图标
        </zx-button>
      </view>
    </view>

    <!-- 表单提交按钮 -->
    <view class="section">
      <view class="section-title">表单提交按钮</view>
      <form @submit="onSubmit" @reset="onReset">
        <view class="form-item">
          <input name="username" placeholder="请输入用户名" />
        </view>
        <view class="button-group">
          <zx-button form-type="submit" type="primary">提交表单</zx-button>
          <zx-button form-type="reset">重置表单</zx-button>
        </view>
      </form>
    </view>

    <!-- 开放能力按钮 -->
    <view class="section">
      <view class="section-title">开放能力按钮</view>
      <view class="button-group">
        <zx-button open-type="share" type="primary">分享</zx-button>
        <zx-button open-type="contact" type="success" @contact="onContact"
          >联系客服</zx-button
        >
        <!-- 注：部分开放能力在不同平台可能不支持 -->
      </view>
    </view>

    <!-- 事件按钮 -->
    <view class="section">
      <view class="section-title">事件按钮</view>
      <view class="button-group">
        <zx-button type="primary" @click="onButtonClick('点击按钮')">点击按钮</zx-button>
      </view>
      <view v-if="clickInfo" class="event-info">
        <text>上次点击：{{ clickInfo }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const clickInfo = ref("");

const basicButtons = [
  { label: "默认按钮", type: "" },
  { label: "主要按钮", type: "primary" },
  { label: "警告按钮", type: "warn" },
  { label: "成功按钮", type: "success" },
  { label: "提醒按钮", type: "warning" },
  { label: "危险按钮", type: "danger" },
  { label: "信息按钮", type: "info" },
];

const plainButtons = [
  { label: "镂空按钮", type: "" },
  { label: "镂空主要按钮", type: "primary" },
  { label: "镂空成功按钮", type: "success" },
  { label: "镂空危险按钮", type: "danger" },
  { label: "镂空提醒按钮", type: "warning" },
];

const textButtons = [
  { label: "默认文本按钮", type: "" },
  { label: "主要文本按钮", type: "primary" },
  { label: "成功文本按钮", type: "success" },
  { label: "危险文本按钮", type: "danger" },
];
const textBgButtons = [
  { label: "背景色文本按钮", type: "" },
  { label: "背景色主要文本按钮", type: "primary" },
];

const linkButtons = [
  { label: "默认链接按钮", type: "" },
  { label: "主要链接按钮", type: "primary" },
  { label: "成功链接按钮", type: "success" },
  { label: "危险链接按钮", type: "danger" },
];

const disabledButtons = [
  { label: "禁用按钮", type: "" },
  { label: "禁用主要按钮", type: "primary" },
  { label: "禁用镂空按钮", type: "primary", plain: true },
];
const disabledExtraButtons = [
  { label: "禁用文本按钮", type: "", text: true },
  { label: "禁用链接按钮", type: "primary", link: true },
];

const loadingButtons = [
  { id: "loading-default", label: "加载中", type: "" },
  { id: "loading-primary", label: "加载中", type: "primary" },
  { id: "loading-success", label: "加载中", type: "success" },
];
const loadingExtraButtons = [
  { id: "loading-primary-text", label: "加载中", type: "primary", text: true },
  { id: "loading-success-text", label: "加载中", type: "success", text: true },
];

const sizeButtons = [
  { label: "大尺寸", type: "primary", size: "large" },
  { label: "默认尺寸", type: "primary" },
  { label: "小尺寸", type: "primary", size: "mini" },
];
const sizeIconButtons = [
  { label: "大尺寸图标按钮", type: "primary", size: "large", icon: "search" },
  { label: "默认尺寸图标按钮", type: "primary", icon: "search" },
  { label: "小尺寸图标按钮", type: "primary", size: "mini", icon: "search" },
];
const customSizeButtons = [
  { label: "自定义高度120rpx", type: "primary", size: "120rpx" },
];

const shapeButtons = [
  { label: "默认形状", type: "primary" },
  { label: "圆角按钮", type: "primary", round: true },
  { label: "", type: "primary", circle: true, icon: "close" },
];
const shapeExtraButtons = [
  { label: "成功圆角按钮", type: "success", round: true },
  { label: "警告圆角按钮", type: "warning", round: true },
  { label: "危险圆角按钮", type: "danger", round: true },
];
const shapeCircleButtons = [
  { label: "", type: "success", circle: true, icon: "checkmark" },
  { label: "", type: "warning", circle: true, icon: "star" },
  { label: "", type: "info", circle: true, icon: "info" },
];

const iconButtons = [
  { label: "搜索", type: "primary", icon: "search" },
  { label: "确认", type: "success", icon: "check" },
  { label: "关闭", type: "danger", icon: "close" },
];
const iconTextButtons = [
  { label: "搜索", type: "", icon: "search" },
  { label: "确认", type: "success", icon: "check" },
  { label: "关闭", type: "danger", icon: "close" },
];

const customStyleButtons = [
  { label: "自定义样式", color: "#333", backgroundColor: "#8a2be2", style: { boxShadow: "0 4rpx 10rpx rgba(138, 43, 226, 0.4)" } },
  { label: "渐变背景", color: "#fff", style: { background: "linear-gradient(to right, #4facfe, #00f2fe)", border: "none" } },
];
const customStyleExtraButtons = [
  { label: "自定义圆角", color: "#fff", round: true, style: { background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)", border: "none", boxShadow: "0 4rpx 10rpx rgba(255, 154, 158, 0.5)" } },
  { label: "纯色按钮", color: "#673ab7", plain: true, style: { borderWidth: "2rpx" } },
];

// 普通点击事件
const onClick = (msg) => {
  uni.showToast({
    title: `点击了【${msg}】按钮`,
    icon: "none",
  });
};

// 特定按钮点击事件
const onButtonClick = (e) => {
  clickInfo.value = `${new Date().toLocaleTimeString()}`;
  console.log("按钮点击事件", e);
};

// 表单提交
const onSubmit = (e) => {
  uni.showModal({
    title: "表单提交",
    content: `提交的内容：${JSON.stringify(e.detail.value)}`,
    showCancel: false,
  });
};

// 表单重置
const onReset = () => {
  uni.showToast({
    title: "表单已重置",
    icon: "none",
  });
};

// 联系客服
const onContact = (e) => {
  console.log("客服消息事件", e);
};
</script>

<style lang="scss">
.container {
  padding: 20rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin: 30rpx 0;
}

.section {
  margin-bottom: 50rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  position: relative;
  padding-left: 30rpx;
  color: #303133;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8rpx;
    height: 32rpx;
    background-color: #2979ff;
    border-radius: 4rpx;
  }
}

.button-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20rpx;
  align-items: center;
  justify-content: space-between;
}

.form-item {
  margin-bottom: 30rpx;

  input {
    border: 1px solid #dcdfe6;
    height: 80rpx;
    padding: 0 20rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      border-color: #409eff;
    }
  }
}

.event-info {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #606266;
  padding: 10rpx 20rpx;
  background-color: #f5f7fa;
  border-radius: 6rpx;
}

.custom-icon {
  font-size: 36rpx;
  margin-right: 10rpx;
}
</style>
