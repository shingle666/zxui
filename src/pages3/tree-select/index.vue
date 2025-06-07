<template>
  <view class="container">
    <zx-navbar title="TreeSelect 分类选择"></zx-navbar>

    <view class="demo-block">
      <zx-title type="line" title="基本用法"></zx-title>
      <zx-tree-select
        :items="items"
        v-model:main-active-index="activeIndex1"
        v-model:active-id="activeId1"
        @click-nav="onClickNav"
        @click-item="onClickItem"
      />
    </view>

    <view class="demo-block">
      <zx-title type="line" title="多选模式"></zx-title>
      <zx-tree-select
        :items="items"
        v-model:main-active-index="activeIndex2"
        v-model:active-id="activeIds2"
        :max="2"
      />
    </view>

    <view class="demo-block">
      <zx-title type="line" title="自定义内容"></zx-title>
      <zx-tree-select :items="itemsSimple" v-model:main-active-index="activeIndex3" height="200px">
        <template #content>
          <view v-if="activeIndex3 === 0" class="custom-content">
            <image style="width: 100%; height: 100px;" src="https://img.yzcdn.cn/vant/apple-1.jpg" mode="aspectFit" />
          </view>
          <view v-if="activeIndex3 === 1" class="custom-content">
             <image style="width: 100%; height: 100px;" src="https://img.yzcdn.cn/vant/apple-2.jpg" mode="aspectFit" />
          </view>
        </template>
      </zx-tree-select>
    </view>

    <view class="demo-block">
      <zx-title type="line" title="徽标提示"></zx-title>
      <zx-tree-select
        :items="itemsWithBadge"
        v-model:main-active-index="activeIndex4"
        v-model:active-id="activeId4"
      />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxTreeSelect from '@tanzhenxing/zx-tree-select/zx-tree-select.vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';
import zxTitle from '@tanzhenxing/zx-title/zx-title.vue';

const activeIndex1 = ref(0);
const activeId1 = ref(1);

const activeIndex2 = ref(0);
const activeIds2 = ref([1, 2]);

const activeIndex3 = ref(0);

const activeIndex4 = ref(0);
const activeId4 = ref(null);

const items = ref([
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 1 },
      { text: '温州', id: 2 },
      { text: '宁波', id: 3, disabled: true },
      { text: '义乌', id: 7 },
      { text: '绍兴', id: 8 },
      { text: '金华', id: 9 },
      { text: '嘉兴', id: 10 },
      { text: '湖州', id: 11 },
      { text: '舟山', id: 12 },
      { text: '台州', id: 13 },
      { text: '丽水', id: 14 },
      { text: '衢州', id: 15 },
    ]
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 }
    ]
  },
  { text: '福建', disabled: true, children: [] }
]);

const itemsSimple = ref([
  { text: '分组 1' }, 
  { text: '分组 2' }
]);

const itemsWithBadge = ref([
  {
    text: '浙江',
    dot: true,
    children: [
      { text: '杭州', id: 1 },
      { text: '温州', id: 2 },
      { text: '宁波', id: 3, disabled: true }
    ]
  },
  {
    text: '江苏',
    badge: 5,
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 }
    ]
  },
  { text: '福建', disabled: true, children: [] }
]);

const onClickNav = ({index, item}) => {
  console.log('clickNav:', index, item);
  uni.showToast({ title: `点击了导航：${item.text}`, icon: 'none' });
};

const onClickItem = (item) => {
  console.log('clickItem:', item);
  uni.showToast({ title: `点击了选项：${item.text}`, icon: 'none' });
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 20px;
}
.demo-block {
  margin-bottom: 20px;
  padding: 0 15px;
}
.custom-content {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; // Ensure it takes full height if needed
}
</style>