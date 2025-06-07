<template>
  <!-- pt-10 pb-10 -->
  <view
    :style="{
      background: bgColor,
      height: topHeight + 'px',
      paddingTop: paddingTop,
    }"
    class="byt-top-box"
    :class="borShow ? 'byt-top-box-border' : ''"
  >
    <view @click="backClick" class="byt-top-left">
      <image
        v-if="backShow"
        class="byt-top-left-img"
        src="https://img.yummall.cn/baiyetong/yunmaobms/static/images/pass/fanHui.png"
        mode=""
      ></image>
    </view>
    <slot name="title">
      <text class="byt-center-title">{{ title }}</text>
    </slot>

    <view class="byt-top-right">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import { getNavbarHeight } from "../../../utils/hooks.js";
export default {
  name: "navbar",
  props: {
    // 头部标题
    title: {
      type: String,
      default: "",
    },
    // 是否显示返回按钮
    backShow: {
      type: Boolean,
      default: true,
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "white",
    },
    // 是否显示下边框线
    borShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      topHeight: getNavbarHeight(),
      paddingTop: "0px",
    };
  },
  created() {
    // 获取设备信息
    const systemInfo = uni.getSystemInfoSync();
    // 手机状态栏高度
    this.paddingTop = systemInfo.statusBarHeight
      ? systemInfo.statusBarHeight + "px"
      : "0px";
  },
  methods: {
    // 返回上一页
    backClick() {
      if (this.backShow) {
        uni.navigateBack(-1);
      }
    },
  },
};
</script>

<style scoped>
.byt-top-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.byt-top-box-border {
  border-bottom: 1px solid #f1f1f1;
}

.byt-top-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200rpx;
  height: 60rpx;
  padding-left: 24rpx;
}

.byt-top-left-img {
  width: 34rpx;
  height: 40rpx;
}

.byt-center-title {
  font-size: 36rpx;
  text-align: center;
  white-space: nowrap;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.byt-top-right {
  width: 200rpx;
  height: 60rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 24rpx;
}
</style>
