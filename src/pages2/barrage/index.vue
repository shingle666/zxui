<template>
  <view class="page-container">
    <view class="content">
      <zx-group title="基础用法">
        <view class="barrage-container">
          <zx-barrage ref="barrageRef1" v-model="barrageList1" :top="10" :rows="3" :duration="6000">
            <view class="video-placeholder">播放区域</view>
          </zx-barrage>
        </view>
        <view class="controls">
          <zx-button size="small" type="primary" @click="addBarrage(1)">发送弹幕</zx-button>
        </view>
      </zx-group>

      <zx-group title="手动控制播放与循环">
        <view class="barrage-container">
          <zx-barrage
            ref="barrageRef2"
            v-model="barrageList2"
            :auto-play="false"
            :loop="true"
            :rows="5"
            :duration="8000"
            :font-size="14"
            color="#FFD700"
            top="5"
          >
            <view class="video-placeholder" style="height: 200px;">播放区域 (可循环)</view>
          </zx-barrage>
        </view>
        <view class="controls">
          <zx-button size="small" type="success" @click="playBarrage(2)" :disabled="isPlaying2">播放</zx-button>
          <zx-button size="small" type="warning" @click="pauseBarrage(2)" :disabled="!isPlaying2">暂停</zx-button>
          <zx-button size="small" type="primary" @click="addBarrage(2)">添加弹幕</zx-button>
          <zx-button size="small" @click="clearBarrage(2)">清空弹幕</zx-button>
        </view>
      </zx-group>

      <zx-group title="自定义内容与样式">
         <view class="barrage-container">
          <zx-barrage ref="barrageRef3" v-model="barrageList3" :rows="2" :duration="5000" :delay="500">
             <view class="video-placeholder" style="background-color: #333;">
                <text style="color: white; font-size: 18px;">深色背景视频区域</text>
            </view>
          </zx-barrage>
        </view>
        <view class="controls">
          <input class="custom-input" v-model="customText" placeholder="输入弹幕内容" />
          <zx-button size="small" type="primary" @click="addCustomBarrage">发送自定义弹幕</zx-button>
        </view>
      </zx-group>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import zxGroup from '@tanzhenxing/zx-group/zx-group.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxBarrage from '@tanzhenxing/zx-barrage/zx-barrage.vue';

const barrageRef1 = ref(null);
const barrageRef2 = ref(null);
const barrageRef3 = ref(null);

const barrageList1 = ref([
  { id: 1, text: '这是第一条弹幕~' },
  { id: 2, text: 'Hello World!' },
  { id: 3, text: 'ZXUI 弹幕组件' },
  { id: 4, text: 'Vue3 Setup' },
]);

const barrageList2 = ref([
  { id: 101, text: '循环弹幕1', color: 'lightgreen' },
  { id: 102, text: '手动控制播放', color: 'skyblue' },
  { id: 103, text: '可以暂停哦', color: 'pink' },
]);

const barrageList3 = ref([
  { id: 201, text: '自定义弹幕内容', color: '#00FFFF' }, 
  { id: 202, text: '样式也可以调整', color: '#FF69B4', fontSize: 20 },
]);

const isPlaying2 = ref(false);
const customText = ref('');
let barrageCounter = 1000;

const addBarrage = (type) => {
  const text = `新弹幕 ${barrageCounter++}`;
  const newBarrage = { id: barrageCounter, text };
  if (type === 1) {
    // barrageList1.value.push(newBarrage); // 直接修改modelValue
    barrageRef1.value?.add(newBarrage); // 或者通过ref调用add方法
  } else if (type === 2) {
    // barrageList2.value.push(newBarrage);
    barrageRef2.value?.add(newBarrage);
  }
};

const addCustomBarrage = () => {
  if (!customText.value.trim()) return;
  const newBarrage = { id: barrageCounter++, text: customText.value, color: getRandomColor() };
  // barrageList3.value.push(newBarrage);
  barrageRef3.value?.add(newBarrage);
  customText.value = '';
};

const playBarrage = (type) => {
  if (type === 2) {
    barrageRef2.value?.play();
    isPlaying2.value = true;
  }
};

const pauseBarrage = (type) => {
  if (type === 2) {
    barrageRef2.value?.pause();
    isPlaying2.value = false;
  }
};

const clearBarrage = (type) => {
  if (type === 2) {
    barrageRef2.value?.clear();
    isPlaying2.value = false; // 清空后通常是暂停状态
  }
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

onMounted(() => {
  // 可以在这里预添加一些弹幕
  setTimeout(() => {
    addBarrage(1);
  }, 2000);
  setTimeout(() => {
    barrageRef1.value?.add({ id: 'special', text: '延迟添加的弹幕！', color: 'orange' });
  }, 5000);
});

</script>

<style lang="scss" scoped>
.page-container {
  padding-bottom: 20px;
}

.content {
  padding: 0 15px;
}

.barrage-container {
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden; /* 必须，否则弹幕会超出容器 */
}

.video-placeholder {
  width: 100%;
  height: 150px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* uni-app x 不支持 gap，需要用 margin 代替 */
  margin-top: 10px;
  margin-bottom: 20px;

  /* 兼容gap */
  & > ::v-deep .zx-button,
  & > .zx-button,
  & > .custom-input {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.custom-input {
  flex-grow: 1;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  min-width: 150px;
}

/* 如果zx-button等组件是全局注册的，则不需要在此处导入 */
</style>