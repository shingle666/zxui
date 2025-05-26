<template>
  <zx-overlay
    :show="!isConnected"
    :zIndex="zIndex"
    @touchmove.stop.prevent="noop"
    :customStyle="{
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
    }"
  >
    <view class="zx-no-network">
      <zx-icon
        :name="image"
        size="150"
        imgMode="widthFit"
        class="zx-no-network__error-icon"
      ></zx-icon>
      <text class="zx-no-network__tips">{{ tips }}</text>
      <!-- 只有APP平台，才能跳转设置页，因为需要调用plus环境 -->
      <!-- #ifdef APP-PLUS -->
      <view class="zx-no-network__app">
        <text class="zx-no-network__app__setting">请检查网络，或前往</text>
        <text class="zx-no-network__app__to-setting" @tap="openSettings">设置</text>
      </view>
      <!-- #endif -->
      <view class="zx-no-network__retry">
        <zx-button
          size="mini"
          text="重试"
          type="primary"
          plain
          @click="retry"
        ></zx-button>
      </view>
    </view>
  </zx-overlay>
</template>

<script setup>
/**
 * noNetwork 无网络提示
 * @description 该组件无需任何配置，引入即可，内部自动处理所有功能和事件。
 * @tutorial https://zxui.org/components/noNetwork
 * @property {String}			tips 	没有网络时的提示语 （默认：'哎呀，网络信号丢失' ）
 * @property {String | Number}	zIndex	组件的z-index值
 * @property {String}			image	无网络的图片提示，可用的src地址或base64图片
 * @event {Function}			retry	用户点击页面的"重试"按钮时触发
 * @example <zx-no-network></zx-no-network>
 */

import { ref, onMounted, defineProps, defineEmits } from "vue";

const props = defineProps({
  // 页面文字提示
  tips: {
    type: String,
    default: "哎呀，网络信号丢失",
  },
  // 一个z-index值，用于设置没有网络这个组件的层次，因为页面可能会有其他定位的元素层级过高，导致此组件被覆盖
  zIndex: {
    type: [String, Number],
    default: 1000,
  },
  // image 没有网络的图片提示
  image: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["retry", "connected", "disconnected"]);

const isConnected = ref(true);
const networkType = ref("none");
const isIOS = ref(false);

function emitEvent(type) {
  emit(type === "none" ? "disconnected" : "connected");
}

function checkNetwork() {
  uni.getNetworkType({
    success: (res) => {
      networkType.value = res.networkType;
      isConnected.value = res.networkType !== "none";
      emitEvent(res.networkType);
    },
    fail: () => {
      isConnected.value = false;
      networkType.value = "none";
      emitEvent("none");
    },
  });
}

function retry() {
  checkNetwork();
  uni.$u &&
    uni.$u.toast &&
    (isConnected.value ? uni.$u.toast("网络已连接") : uni.$u.toast("无网络连接"));
  emit("retry");
}

function noop() {}

function openSettings() {
  if (networkType.value === "none") {
    openSystemSettings();
  }
}

// #ifdef APP-PLUS
function openSystemSettings() {
  if (isIOS.value) {
    gotoiOSSetting();
  } else {
    gotoAndroidSetting();
  }
}
function gotoiOSSetting() {
  var UIApplication = plus.ios.import("UIApplication");
  var application2 = UIApplication.sharedApplication();
  var NSURL2 = plus.ios.import("NSURL");
  var setting2 = NSURL2.URLWithString("App-prefs:root=General");
  application2.openURL(setting2);
  plus.ios.deleteObject(setting2);
  plus.ios.deleteObject(NSURL2);
  plus.ios.deleteObject(application2);
}
function gotoAndroidSetting() {
  var Intent = plus.android.importClass("android.content.Intent");
  var Settings = plus.android.importClass("android.provider.Settings");
  var mainActivity = plus.android.runtimeMainActivity();
  var intent = new Intent(Settings.ACTION_SETTINGS);
  mainActivity.startActivity(intent);
}
// #endif

onMounted(() => {
  // 判断平台
  // #ifdef APP-PLUS
  isIOS.value = uni.getSystemInfoSync().platform === "ios";
  // #endif
  checkNetwork();
  uni.onNetworkStatusChange((res) => {
    isConnected.value = res.isConnected;
    networkType.value = res.networkType;
    emitEvent(res.networkType);
  });
});
</script>

<style lang="scss" scoped>
.zx-no-network {
  @include flex(column);
  justify-content: center;
  align-items: center;
  margin-top: -100px;

  &__tips {
    color: $zx-tips-color;
    font-size: 14px;
    margin-top: 15px;
  }

  &__app {
    @include flex(row);
    margin-top: 6px;

    &__setting {
      color: $zx-light-color;
      font-size: 13px;
    }

    &__to-setting {
      font-size: 13px;
      color: $zx-primary;
      margin-left: 3px;
    }
  }

  &__retry {
    @include flex(row);
    justify-content: center;
    margin-top: 15px;
  }
}
</style>
