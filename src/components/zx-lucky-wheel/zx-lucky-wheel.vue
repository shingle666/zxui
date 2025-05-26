<template>
  <view v-if="isShow" class="lucky-box" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
    <canvas
      type="2d"
      id="lucky-wheel"
      canvas-id="lucky-wheel"
      :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }"
    ></canvas>
    <image
      v-if="imgSrc"
      :src="imgSrc"
      @load="clearCanvas()"
      :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }"
    ></image>
    <!-- #ifdef APP-PLUS -->
    <view class="lucky-wheel-btn" @click="toPlay" :style="{ width: btnWidth + 'px', height: btnHeight + 'px' }"></view>
    <!-- #endif -->
    <!-- #ifndef APP-PLUS -->
    <cover-view class="lucky-wheel-btn" @click="toPlay" :style="{ width: btnWidth + 'px', height: btnHeight + 'px' }"></cover-view>
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view v-if="myLucky">
      <div class="lucky-imgs">
        <div v-for="(block, index) in blocks" :key="index">
          <div v-if="block.imgs">
            <image v-for="(img, i) in block.imgs" :key="i" :src="img.src" @load="e => imgBindload(e, 'blocks', index, i)" />
          </div>
        </div>
      </div>
      <div class="lucky-imgs">
        <div v-for="(prize, index) in prizes" :key="index">
          <div v-if="prize.imgs">
            <image v-for="(img, i) in prize.imgs" :key="i" :src="img.src" @load="e => imgBindload(e, 'prizes', index, i)" />
          </div>
        </div>
      </div>
      <div class="lucky-imgs">
        <div v-for="(btn, index) in buttons" :key="index">
          <div v-if="btn.imgs">
            <image v-for="(img, i) in btn.imgs" :key="i" :src="img.src" @load="e => imgBindload(e, 'buttons', index, i)" />
          </div>
        </div>
      </div>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup>
import { ref, watch, nextTick, defineProps, defineEmits } from 'vue'
import { changeUnits, resolveImage, getImage } from './utils.js'
import { LuckyWheel } from './index.esm.js'

const props = defineProps({
  width: { type: String, default: '600rpx' },
  height: { type: String, default: '600rpx' },
  blocks: { type: Array, default: () => [] },
  prizes: { type: Array, default: () => [] },
  buttons: { type: Array, default: () => [] },
  defaultConfig: { type: Object, default: () => ({}) },
  defaultStyle: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['start', 'end'])

const imgSrc = ref('')
const myLucky = ref(null)
const isShow = ref(false)
const boxWidth = ref(100)
const boxHeight = ref(100)
const btnWidth = ref(0)
const btnHeight = ref(0)
const dpr = ref(1)
let myCanvas = null
let ctx = null

function imgBindload(res, name, index, i) {
  const img = props[name][index].imgs[i]
  resolveImage(img, myCanvas)
}

function getLuckyImage() {
  return getImage.call(this, 'lucky-wheel', myCanvas)
}

function clearCanvas() {
  if (myLucky.value && myLucky.value.clearCanvas) {
    myLucky.value.clearCanvas()
  }
}

function hideCanvas() {
  // #ifdef MP
  getLuckyImage().then(res => {
    imgSrc.value = res.tempFilePath
  })
  // #endif
}

function initLucky() {
  boxWidth.value = changeUnits(props.width)
  boxHeight.value = changeUnits(props.height)
  isShow.value = true
  nextTick(() => {
    setTimeout(() => {
      draw()
    })
  })
}

function draw() {
  uni.createSelectorQuery().in(this).select('#lucky-wheel').fields({
    node: true, size: true
  }).exec((res) => {
    if (!res[0] || !res[0].node) return console.error('lucky-canvas 获取不到 canvas 标签')
    const { node, width, height } = res[0]
    myCanvas = node
    ctx = myCanvas.getContext('2d')
    dpr.value = uni.getSystemInfoSync().pixelRatio
    // #ifndef H5
    myCanvas.width = width * dpr.value
    myCanvas.height = height * dpr.value
    ctx.scale(dpr.value, dpr.value)
    // #endif
    const Radius = Math.min(width, height) / 2
    myLucky.value = new LuckyWheel({
      // #ifdef H5
      flag: 'WEB',
      // #endif
      // #ifdef MP
      flag: 'MP-WX',
      // #endif
      ctx,
      dpr: dpr.value,
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      // #ifdef H5
      rAF: requestAnimationFrame,
      // #endif
      unitFunc: (num, unit) => changeUnits(num + unit),
      beforeCreate: function () {
        ctx.translate(Radius, Radius)
      },
      beforeResize: function () {
        ctx.translate(-Radius, -Radius)
      },
      afterInit: function () {
        btnWidth.value = this.maxBtnRadius * 2
        btnHeight.value = this.maxBtnRadius * 2
      },
      afterStart: () => {
        imgSrc.value = ''
      },
    }, {
      ...props,
      width,
      height,
      start: (...rest) => {
        emit('start', ...rest)
      },
      end: (...rest) => {
        emit('end', ...rest)
        hideCanvas()
      },
    })
  })
}

function toPlay() {
  myLucky.value && myLucky.value.startCallback && myLucky.value.startCallback()
}

function init() {
  myLucky.value && myLucky.value.init && myLucky.value.init()
}

function play(...rest) {
  myLucky.value && myLucky.value.play && myLucky.value.play(...rest)
}

function stop(...rest) {
  myLucky.value && myLucky.value.stop && myLucky.value.stop(...rest)
}

watch(() => props.blocks, (newData) => {
  if (myLucky.value) myLucky.value.blocks = newData
})
watch(() => props.prizes, (newData) => {
  if (myLucky.value) myLucky.value.prizes = newData
})
watch(() => props.buttons, (newData) => {
  if (myLucky.value) myLucky.value.buttons = newData
})
watch(() => props.defaultStyle, (newData) => {
  if (myLucky.value) myLucky.value.defaultStyle = newData
})
watch(() => props.defaultConfig, (newData) => {
  if (myLucky.value) myLucky.value.defaultConfig = newData
})

// #ifdef APP-PLUS
console.error('该抽奖插件的最新版暂不支持app端, 请通过npm安装旧版本【npm i uni-luck-draw@1.3.9】')
// #endif
// #ifndef APP-PLUS
initLucky()
// #endif

defineExpose({
  init,
  play,
  stop,
  getLuckyImage,
})
</script>

<style scoped>
.lucky-box {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
.lucky-box canvas {
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 0;
}
.lucky-wheel-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  cursor: pointer;
}
.lucky-imgs {
  width: 0;
  height: 0;
  visibility: hidden;
}
</style>
