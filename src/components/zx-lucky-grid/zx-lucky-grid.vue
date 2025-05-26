<template>
  <view v-if="isShow" class="lucky-box" :style="{ width: boxWidth + 'px', height: boxHeight + 'px'}">
    <canvas
      type="2d"
      id="lucky-grid"
      canvas-id="lucky-grid"
      :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }"
    ></canvas>
    <image
      v-if="imgSrc"
      :src="imgSrc"
      @load="myLucky && myLucky.clearCanvas && myLucky.clearCanvas()"
      :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }"
    ></image>
    <!-- #ifdef APP-PLUS -->
    <view v-if="btnShow">
      <view class="lucky-grid-btn" v-for="(btn, index) in btns" :key="index" @click="toPlay(btn, index)" :style="{
        top: btn.top + 'px',
        left: btn.left + 'px',
        width: btn.width + 'px',
        height: btn.height + 'px',
      }"></view>
    </view>
    <!-- #endif -->
    <!-- #ifndef APP-PLUS -->
    <view v-if="btnShow">
      <cover-view class="lucky-grid-btn" v-for="(btn, index) in btns" :key="index" @click="toPlay(btn, index)" :style="{
        top: btn.top + 'px',
        left: btn.left + 'px',
        width: btn.width + 'px',
        height: btn.height + 'px',
      }"></cover-view>
    </view>
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view v-if="myLucky">
      <div class="lucky-imgs">
        <div v-for="(block, index) in blocks" :key="index">
          <div v-if="block.imgs">
            <div v-for="(img, i) in block.imgs" :key="i">
              <image :src="img.src" :data-index="index" :data-i="i" @load="e => imgBindload(e, 'blocks')"></image>
              <image :src="img.activeSrc" :data-index="index" :data-i="i" @load="e => imgBindloadActive(e, 'blocks')"></image>
            </div>
          </div>
        </div>
      </div>
      <div class="lucky-imgs">
        <div v-for="(prize, index) in prizes" :key="index">
          <div v-if="prize.imgs">
            <div v-for="(img, i) in prize.imgs" :key="i">
              <image :src="img.src" :data-index="index" :data-i="i" @load="e => imgBindload(e, 'prizes')"></image>
              <image :src="img.activeSrc" :data-index="index" :data-i="i" @load="e => imgBindloadActive(e, 'prizes')"></image>
            </div>
          </div>
        </div>
      </div>
      <div class="lucky-imgs">
        <div v-for="(btn, index) in buttons" :key="index">
          <div v-if="btn.imgs">
            <image v-for="(img, i) in btn.imgs" :key="i" :src="img.src" :data-index="index" :data-i="i" @load="e => imgBindload(e, 'buttons')"></image>
          </div>
        </div>
      </div>
      <div class="lucky-imgs">
        <span v-if="button && button.imgs">
          <image v-for="(img, i) in button.imgs" :key="i" :src="img.src" :data-i="i" @load="e => imgBindloadBtn(e, 'button')"></image>
        </span>
      </div>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, getCurrentInstance } from 'vue'
import { changeUnits, resolveImage, getImage } from './utils.js'
import { LuckyGrid } from './index.esm.js'

const props = defineProps({
  width: { type: String, default: '600rpx' },
  height: { type: String, default: '600rpx' },
  cols: { type: [String, Number], default: 3 },
  rows: { type: [String, Number], default: 3 },
  blocks: { type: Array, default: () => [] },
  prizes: { type: Array, default: () => [] },
  buttons: { type: Array, default: () => [] },
  button: { type: Object, default: undefined },
  defaultConfig: { type: Object, default: () => ({}) },
  defaultStyle: { type: Object, default: () => ({}) },
  activeStyle: { type: Object, default: () => ({}) }
})

const {proxy} = getCurrentInstance()

const imgSrc = ref('')
const myLucky = ref(null)
const isShow = ref(false)
const boxWidth = ref(100)
const boxHeight = ref(100)
const dpr = ref(1)
const btns = ref([])
const btnShow = ref(false)
let myCanvas = null

function imgBindload(res, name) {
  const { index, i } = res.currentTarget.dataset
  const img = props[name][index].imgs[i]
  resolveImage(img, myCanvas)
}
function imgBindloadActive(res, name) {
  const { index, i } = res.currentTarget.dataset
  const img = props[name][index].imgs[i]
  resolveImage(img, myCanvas, 'activeSrc', '$activeResolve')
}
function imgBindloadBtn(res, name) {
  const { i } = res.currentTarget.dataset
  const img = props[name].imgs[i]
  resolveImage(img, myCanvas)
}
function getImageFn() {
  return getImage('lucky-grid', myCanvas)
}
function hideCanvas() {
  // #ifdef MP
  getImageFn().then(res => {
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
  // 安全获取当前实例，避免 proxy 为 null
  const instance = getCurrentInstance()
  if (!instance || !instance.proxy) {
    // 组件未挂载，直接返回
    return
  }
  uni.createSelectorQuery().in(instance.proxy).select('#lucky-grid').fields({
    node: true, size: true
  }).exec((res) => {
    if (!res[0] || !res[0].node) return console.error('lucky-canvas 获取不到 canvas 标签')
    const { node, width, height } = res[0]
    myCanvas = node
    const ctx = node.getContext('2d')
    dpr.value = uni.getSystemInfoSync().pixelRatio
    // #ifndef H5
    node.width = width * dpr.value
    node.height = height * dpr.value
    ctx.scale(dpr.value, dpr.value)
    // #endif
    myLucky.value = new LuckyGrid({
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
      afterInit: function () {
        ;[...props.buttons, props.button].forEach((btn, index) => {
          if (!btn) return
          const [left, top, width, height] = this.getGeometricProperty([
            btn.x,
            btn.y,
            btn.col || 1,
            btn.row || 1
          ])
          btns.value[index] = { top, left, width, height }
        })
      },
      afterStart: () => {
        imgSrc.value = ''
      },
    }, {
      ...props,
      width: width,
      height: height,
      start: (...rest) => {
        emit('start', ...rest)
      },
      end: (...rest) => {
        emit('end', ...rest)
        hideCanvas()
      },
    })
    btnShow.value = true
  })
}
function toPlay(btn, index) {
  myLucky.value.startCallback(btn, props.buttons[index])
}
function init() {
  myLucky.value && myLucky.value.init()
}
function play(...rest) {
  myLucky.value && myLucky.value.play(...rest)
}
function stop(...rest) {
  myLucky.value && myLucky.value.stop(...rest)
}

watch(() => props.cols, (newData) => {
  myLucky.value && (myLucky.value.cols = newData)
})
watch(() => props.rows, (newData) => {
  myLucky.value && (myLucky.value.rows = newData)
})
watch(() => props.blocks, (newData) => {
  myLucky.value && (myLucky.value.blocks = newData)
})
watch(() => props.prizes, (newData) => {
  myLucky.value && (myLucky.value.prizes = newData)
})
watch(() => props.buttons, (newData) => {
  myLucky.value && (myLucky.value.buttons = newData)
})
watch(() => props.button, (newData) => {
  myLucky.value && (myLucky.value.button = newData)
})
watch(() => props.defaultStyle, (newData) => {
  myLucky.value && (myLucky.value.defaultStyle = newData)
})
watch(() => props.defaultConfig, (newData) => {
  myLucky.value && (myLucky.value.defaultConfig = newData)
})
watch(() => props.activeStyle, (newData) => {
  myLucky.value && (myLucky.value.activeStyle = newData)
})

onMounted(() => {
  // #ifdef APP-PLUS
  console.error('该抽奖插件的最新版暂不支持app端, 请通过npm安装旧版本【npm i uni-luck-draw@1.3.9】')
  // #endif
  // #ifndef APP-PLUS
  initLucky()
  // #endif
})

defineExpose({
  init,
  play,
  stop,
  getImage: getImageFn
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
  .lucky-grid-btn {
    position: absolute;
    background: rgba(0, 0, 0, 0);
    border-radius: 0;
    cursor: pointer;
  }
  .lucky-imgs {
    width: 0;
    height: 0;
    visibility: hidden;
  }
</style>
