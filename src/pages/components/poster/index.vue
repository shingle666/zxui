<template>
  <view class="container">
    <zx-poster
      ref="posterRef"
      :width="800"
      :height="1200"
      :pixel="2"
      @ready="onReady"
    />
    <button @click="drawPoster">生成海报</button>
    <button @click="savePoster">保存到相册</button>
    <image v-if="posterUrl" :src="posterUrl" mode="widthFix" style="width: 300px; margin-top: 20px;" />
  </view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const posterRef = ref(null)
const posterUrl = ref('')

function onReady() {
  // 组件初始化完成
}

function drawPoster() {
  const drawData = [
    {
      type: 'rect',
      style: {
        left: 0,
        top: 0,
        width: 800,
        height: 1200,
        backgroundColor: '#fff',
        borderRadius: 20
      }
    },
    {
      type: 'image',
      src: 'https://img.yzcdn.cn/vant/cat.jpeg',
      imgType: 2,
      style: {
        left: 100,
        top: 100,
        width: 600,
        height: 400,
        borderRadius: 20
      }
    },
    {
      type: 'text',
      text: '海报标题',
      style: {
        left: 100,
        top: 550,
        fontSize: 40,
        color: '#333',
        fontWeight: 'bold',
        width: 600,
        rows: 1
      }
    },
    {
      type: 'line',
      style: {
        left: 100,
        top: 600,
        endLeft: 700,
        endTop: 600,
        color: '#eee',
        width: 4
      }
    }
  ]
  posterRef.value.draw(drawData, url => {
    posterUrl.value = url
  })
}

function savePoster() {
  if (posterUrl.value) {
    posterRef.value.save(posterUrl.value)
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style> 