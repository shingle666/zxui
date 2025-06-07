<template>
  <view class="zx-cropper__box" @touchmove.stop.prevent="stop">
    <image
      @load="imageLoad"
      @error="imageLoad"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :data-minScale="minScale"
      :data-maxScale="maxScale"
      :style="{
        width: (imgWidth ? imgWidth : width) + 'px',
        height: imgHeight ? imgHeight + 'px' : 'auto',
        transitionDuration: (animation ? 0.3 : 0) + 's',
      }"
      class="zx-cropper__image"
      :class="{ 'zx-cropper__image-hidden': !imageUrl }"
      :src="imageUrl"
      mode="widthFix"
    >
    </image>
    <view
      class="zx-backdrop__cropper"
      :style="{
        width: width + 'px',
        height: height + 'px',
        borderRadius: isRound ? '50%' : '0',
      }"
    >
      <view
        class="zx-cropper__border"
        :style="{ borderRadius: isRound ? '50%' : '0', border: border }"
      ></view>
    </view>
    <canvas
      canvas-id="zx-image__cropper"
      id="zx-image__cropper"
      :disable-scroll="true"
      :style="{ width: width * scaleRatio + 'px', height: height * scaleRatio + 'px' }"
      class="zx-cropper__canvas"
    ></canvas>
    <view class="zx-cropper__tabbar" v-if="!custom">
      <view class="zx-op__btn" @tap.stop="back">取消</view>
      <image :src="rotateImg" class="zx-rotate__img" @tap="setAngle"></image>
      <view class="zx-op__btn" @tap.stop="getImage">完成</view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue";

const emit = defineEmits(["ready", "cropper", "imageLoad", "initAngle"]);
const props = defineProps({
  //图片路径
  imageUrl: {
    type: String,
    default: "",
  },
  //裁剪框高度 px
  height: {
    type: Number,
    default: 280,
  },
  //裁剪框宽度 px
  width: {
    type: Number,
    default: 280,
  },
  //是否为圆形裁剪框
  isRound: {
    type: Boolean,
    default: true,
  },
  //裁剪框边框
  border: {
    type: String,
    default: "1px solid #fff",
  },
  //生成的图片尺寸相对剪裁框的比例
  scaleRatio: {
    type: Number,
    default: 2,
  },
  //图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
  quality: {
    type: Number,
    default: 0.8,
  },
  //图片旋转角度
  rotateAngle: {
    type: Number,
    default: 0,
  },
  //图片最小缩放比
  minScale: {
    type: Number,
    default: 0.5,
  },
  //图片最大缩放比
  maxScale: {
    type: Number,
    default: 2,
  },
  //自定义操作栏（为true时隐藏底部操作栏）
  custom: {
    type: Boolean,
    default: false,
  },
  //值发生改变开始裁剪（custom为true时生效）
  startCutting: {
    type: [Number, Boolean],
    default: 0,
  },
  /**
   * 是否返回base64(H5端默认base64)
   * 支持平台：App，微信小程序，支付宝小程序,H5(默认url就是base64)
   **/
  isBase64: {
    type: Boolean,
    default: false,
  },
  //裁剪时是否显示loadding
  loadding: {
    type: Boolean,
    default: true,
  },
  //旋转icon
  rotateImg: {
    type: String,
    default: "/static/components/cropper/img_rotate.png",
  },
});

const sysInfo = ref({});
const cutX = ref(0);
const cutY = ref(0);
const imgWidth = ref(0);
const imgHeight = ref(0);
const scale = ref(1);
const angle = ref(0);
const animation = ref(false);
const animationTime = ref(null);
const imgTop = ref(0);
const imgLeft = ref(0);
const ctx = ref(null);
const TIME_CUT_CENTER = ref(null);
const sizeChange = ref(0);
const angleChange = ref(0);
const resetChange = ref(0);
const centerChange = ref(0);

const instance = getCurrentInstance();

// 监听图片路径变化
watch(
  () => props.imageUrl,
  (val, oldVal) => {
    imageReset();
    showLoading();
    uni.getImageInfo({
      src: val,
      success: (res) => {
        imgComputeSize(res.width, res.height);
        angleChange.value++;
      },
      fail: (err) => {
        imgComputeSize();
        angleChange.value++;
      },
    });
  }
);

watch(
  () => props.rotateAngle,
  (val) => {
    animation.value = true;
    angle.value = val;
    angleChanged(val);
  }
);

watch(animation, (val) => {
  //开启过渡220毫秒之后自动关闭
  clearTimeout(animationTime.value);
  if (val) {
    animationTime.value = setTimeout(() => {
      animation.value = false;
    }, 220);
  }
});

watch(
  () => props.startCutting,
  (val) => {
    if (props.custom && val) {
      getImage();
    }
  }
);

onMounted(() => {
  sysInfo.value = uni.getWindowInfo();
  imgTop.value = sysInfo.value.windowHeight / 2;
  imgLeft.value = sysInfo.value.windowWidth / 2;
  ctx.value = uni.createCanvasContext("zx-image__cropper", instance?.proxy);
  //初始化
  setTimeout(() => {
    emit("ready", {});
  }, 200);
});

function showLoading() {
  if (props.loadding) {
    uni.showLoading({
      title: "请稍候...",
      mask: true,
    });
  }
}

function imageReset() {
  scale.value = 1;
  angle.value = 0;
  let sys = sysInfo.value.windowHeight ? sysInfo.value : uni.getWindowInfo();
  imgTop.value = sys.windowHeight / 2;
  imgLeft.value = sys.windowWidth / 2;
  resetChange.value++;
  emit("initAngle", {});
}

function imgComputeSize(width, height) {
  //默认按图片最小边 = 对应裁剪框尺寸
  let imgWidth = width,
    imgHeight = height;
  if (imgWidth && imgHeight) {
    if (imgWidth / imgHeight > props.width / props.height) {
      imgHeight = props.height;
      imgWidth = (width / height) * imgHeight;
    } else {
      imgWidth = props.width;
      imgHeight = (height / width) * imgWidth;
    }
  } else {
    let sys = sysInfo.value.windowHeight ? sysInfo.value : uni.getWindowInfo();
    imgWidth = sys.windowWidth;
    imgHeight = 0;
  }
  this.imgWidth = imgWidth;
  this.imgHeight = imgHeight;
  sizeChange.value++;
}

function imageLoad(e) {
  imageReset();
  uni.hideLoading();
  emit("imageLoad", {});
}

function moveStop() {
  clearTimeout(TIME_CUT_CENTER.value);
  TIME_CUT_CENTER.value = setTimeout(() => {
    centerChange.value++;
  }, 666);
}

function moveDuring() {
  clearTimeout(TIME_CUT_CENTER.value);
}

function stop() {}

function back() {
  uni.navigateBack();
}

function angleChanged(val) {
  moveStop();
  if (val % 90) {
    angle.value = Math.round(val / 90) * 90;
  }
  angleChange.value++;
}

function setAngle() {
  animation.value = true;
  angle.value = angle.value + 90;
  angleChanged(angle.value);
}

// 手势相关
let lastTouch = ref([]);
let lastDistance = ref(0);
function onTouchStart(e) {
  const touch = e.touches || e.changedTouches;
  if (touch.length === 1) {
    lastTouch.value = [
      {
        x: touch[0].pageX - imgLeft.value,
        y: touch[0].pageY - imgTop.value,
      },
    ];
  } else if (touch.length === 2) {
    lastTouch.value = [
      { x: touch[0].pageX - imgLeft.value, y: touch[0].pageY - imgTop.value },
      { x: touch[1].pageX - imgLeft.value, y: touch[1].pageY - imgTop.value },
    ];
    lastDistance.value = Math.sqrt(
      Math.pow(touch[0].pageX - touch[1].pageX, 2) +
        Math.pow(touch[0].pageY - touch[1].pageY, 2)
    );
  }
}

function onTouchMove(e) {
  const touch = e.touches || e.changedTouches;
  moveDuring();
  if (touch.length === 1 && lastTouch.value.length === 1) {
    imgLeft.value = touch[0].pageX - lastTouch.value[0].x;
    imgTop.value = touch[0].pageY - lastTouch.value[0].y;
  } else if (touch.length === 2 && lastTouch.value.length === 2) {
    const newDistance = Math.sqrt(
      Math.pow(touch[0].pageX - touch[1].pageX, 2) +
        Math.pow(touch[0].pageY - touch[1].pageY, 2)
    );
    let newScale = scale.value * (newDistance / lastDistance.value);
    newScale = Math.max(props.minScale, Math.min(props.maxScale, newScale));
    scale.value = newScale;
    lastDistance.value = newDistance;
    lastTouch.value = [
      { x: touch[0].pageX - imgLeft.value, y: touch[0].pageY - imgTop.value },
      { x: touch[1].pageX - imgLeft.value, y: touch[1].pageY - imgTop.value },
    ];
  }
}

function onTouchEnd(e) {
  moveStop();
}

// 导出图片
async function getLocalImage(url) {
  return await new Promise((resolve, reject) => {
    uni.downloadFile({
      url: url,
      success: (res) => {
        resolve(res.tempFilePath);
      },
      fail: (res) => {
        reject(false);
      },
    });
  });
}

function getImage() {
  if (!props.imageUrl) {
    uni.showToast({
      title: "请选择图片",
      icon: "none",
    });
    return;
  }
  showLoading();
  const draw = async () => {
    let imgW = imgWidth.value * scale.value * props.scaleRatio;
    let imgH = imgHeight.value * scale.value * props.scaleRatio;
    let xpos = imgLeft.value - cutX.value;
    let ypos = imgTop.value - cutY.value;
    ctx.value.translate(xpos * props.scaleRatio, ypos * props.scaleRatio);
    ctx.value.rotate((angle.value * Math.PI) / 180);
    let imgUrl = props.imageUrl;
    // #ifdef APP-PLUS || MP-WEIXIN
    if (~props.imageUrl.indexOf("https:")) {
      imgUrl = await getLocalImage(props.imageUrl);
    }
    // #endif
    ctx.value.drawImage(imgUrl, -imgW / 2, -imgH / 2, imgW, imgH);
    ctx.value.draw(false, () => {
      let params = {
        width: props.width * props.scaleRatio,
        height: Math.round(props.height * props.scaleRatio),
        destWidth: props.width * props.scaleRatio,
        destHeight: Math.round(props.height) * props.scaleRatio,
        fileType: "png",
        quality: props.quality,
      };
      let data = {
        url: "",
        base64: "",
        width: props.width * props.scaleRatio,
        height: props.height * props.scaleRatio,
      };
      // #ifdef MP-ALIPAY
      if (props.isBase64) {
        ctx.value.toDataURL(params).then((dataURL) => {
          data.base64 = dataURL;
          uni.hideLoading();
          emit("cropper", data);
        });
      } else {
        ctx.value.toTempFilePath({
          ...params,
          success: (res) => {
            data.url = res.apFilePath;
            uni.hideLoading();
            emit("cropper", data);
          },
        });
      }
      // #endif

      // #ifndef MP-ALIPAY
      let isBase64 = props.isBase64;
      // #ifdef MP-BAIDU || MP-TOUTIAO || H5
      isBase64 = false;
      // #endif
      if (isBase64) {
        uni.canvasGetImageData(
          {
            canvasId: "zx-image__cropper",
            x: 0,
            y: 0,
            width: props.width * props.scaleRatio,
            height: Math.round(props.height * props.scaleRatio),
            success: (res) => {
              const arrayBuffer = new Uint8Array(res.data);
              const base64 = uni.arrayBufferToBase64(arrayBuffer);
              data.base64 = base64;
              uni.hideLoading();
              emit("cropper", data);
            },
          },
          instance?.proxy
        );
      } else {
        uni.canvasToTempFilePath(
          {
            ...params,
            canvasId: "zx-image__cropper",
            success: (res) => {
              data.url = res.tempFilePath;
              // #ifdef H5
              data.base64 = res.tempFilePath;
              // #endif
              uni.hideLoading();
              emit("cropper", data);
            },
            fail(res) {
              console.log(res);
            },
          },
          instance?.proxy
        );
      }
      // #endif
    });
  };
  draw();
}
</script>

<style scoped>
.zx-cropper__box {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.zx-cropper__image {
  width: 100%;
  border-style: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-origin: center;
}
.zx-cropper__image-hidden {
  visibility: hidden;
  opacity: 0;
}

.zx-cropper__canvas {
  position: fixed;
  z-index: 10;
  left: -2000px;
  top: -2000px;
  pointer-events: none;
}

.zx-backdrop__cropper {
  position: fixed;
  z-index: 4;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 3000px solid rgba(0, 0, 0, 0.55);
  pointer-events: none;
}

.zx-cropper__border {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  pointer-events: none;
}

.zx-cropper__tabbar {
  width: 100%;
  height: 120rpx;
  padding: 0 40rpx;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 32rpx;
}

.zx-cropper__tabbar::after {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  border-top: 1rpx solid rgba(255, 255, 255, 0.2);
  -webkit-transform: scaleY(0.5) translateZ(0);
  transform: scaleY(0.5) translateZ(0);
  transform-origin: 0 100%;
}

.zx-op__btn {
  height: 80rpx;
  display: flex;
  align-items: center;
}

.zx-rotate__img {
  width: 44rpx;
  height: 44rpx;
}
</style>
