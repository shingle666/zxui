<template>
  <view class="demo-indexed-list">
    <view class="demo-section">
      <text class="demo-title">基础用法</text>
      <zx-indexed-list :options="airportList" @click="onClick" />
    </view>
    <view class="demo-section">
      <text class="demo-title">选择模式（多选）</text>
      <zx-indexed-list :options="airportListSelect" :showSelect="true" @click="onSelectClick" />
    </view>
    <view class="demo-section">
      <text class="demo-title">事件响应</text>
      <text>最近点击：{{ lastClick ? lastClick.item.name : '无' }}</text>
      <text>已选中：{{ selectedNames }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const airportList = ref([
  {
    letter: 'A',
    data: ['阿克苏机场', '阿拉山口机场', '阿勒泰机场', '阿里昆莎机场', '安庆天柱山机场', '澳门国际机场']
  },
  {
    letter: 'B',
    data: ['保山机场', '包头机场', '北海福成机场', '北京南苑机场', '北京首都国际机场']
  },
  {
    letter: 'C',
    data: ['长春龙嘉机场', '常德桃花源机场', '常州奔牛机场', '朝阳机场', '成都双流国际机场']
  }
]);

const airportListSelect = ref([
  {
    letter: 'A',
    data: [
      { name: '阿克苏机场', checked: false },
      { name: '阿拉山口机场', checked: false },
      { name: '阿勒泰机场', checked: false }
    ]
  },
  {
    letter: 'B',
    data: [
      { name: '保山机场', checked: false },
      { name: '包头机场', checked: false }
    ]
  }
]);

const lastClick = ref(null);
const selectedNames = ref('');

function onClick(e) {
  lastClick.value = e;
}
function onSelectClick(e) {
  lastClick.value = e;
  selectedNames.value = e.select.map(i => i.name).join(', ');
}
</script>

<style scoped>
.demo-indexed-list {
  padding: 16px;
}
.demo-section {
  margin-bottom: 32px;
}
.demo-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}
</style> 