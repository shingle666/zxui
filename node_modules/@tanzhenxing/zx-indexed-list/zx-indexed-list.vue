<template>
  <view class="zx-indexed-list" ref="list">
    <scroll-view :scroll-into-view="scrollViewId" class="zx-indexed-list__scroll" scroll-y>
      <view v-for="(group, idx) in lists" :key="group.key" :id="'zx-indexed-list-' + idx">
        <view class="zx-indexed-list__title">{{ group.key }}</view>
        <view v-for="(item, index) in group.items" :key="item.name" class="zx-indexed-list__item" @click="onItemClick(idx, index)">
          <view v-if="showSelect" class="zx-indexed-list__checkbox">
            <zx-icon :name="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#C0C0C0'" size="24" />
          </view>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </scroll-view>
    <view class="zx-indexed-list__menu" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend="touchEnd" @mousedown.stop="mouseStart" @mousemove.stop.prevent="mouseMove" @mouseleave.stop="mouseLeave">
      <view v-for="(group, key) in lists" :key="key" class="zx-indexed-list__menu-item" :class="touchmoveIndex === key ? 'zx-indexed-list__menu--active' : ''">
        <text class="zx-indexed-list__menu-text" :class="touchmoveIndex === key ? 'zx-indexed-list__menu-text--active' : ''">{{ group.key }}</text>
      </view>
    </view>
    <view v-if="touchmove" class="zx-indexed-list__alert-wrapper">
      <text class="zx-indexed-list__alert">{{ lists[touchmoveIndex]?.key }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed, nextTick,onMounted } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  showSelect: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['click']);

const lists = ref([]);
const scrollViewId = ref('');
const touchmove = ref(false);
const touchmoveIndex = ref(-1);
const winOffsetY = ref(0);
const winHeight = ref(0);
const itemHeight = ref(0);
const loaded = ref(false);

watch(() => props.options, () => {
  setList();
}, { deep: true });

onMounted(() => {
  setTimeout(() => {
    setList();
  }, 50);
  setTimeout(() => {
    loaded.value = true;
  }, 300);
});

function setList() {
  let index = 0;
  const arr = [];
  props.options.forEach((value, idx) => {
    if (!value.data || value.data.length === 0) return;
    const items = value.data.map(item => ({
      key: value.letter,
      name: typeof item === 'string' ? item : item.name,
      itemIndex: idx,
      checked: item.checked || false
    }));
    arr.push({
      title: value.letter,
      key: value.letter,
      items,
      itemIndex: idx
    });
  });
  lists.value = arr;
  nextTick(() => {
    uni.createSelectorQuery().in(this).select('.zx-indexed-list').boundingClientRect(data => {
      winOffsetY.value = data?.top || 0;
      winHeight.value = data?.height || 0;
      itemHeight.value = lists.value.length ? winHeight.value / lists.value.length : 0;
    }).exec();
  });
}

function touchStart(e) {
  touchmove.value = true;
  const pageY = e.touches ? e.touches[0].pageY : e.pageY;
  const index = Math.floor((pageY - winOffsetY.value) / itemHeight.value);
  if (lists.value[index]) {
    scrollViewId.value = 'zx-indexed-list-' + index;
    touchmoveIndex.value = index;
  }
}
function touchMove(e) {
  const pageY = e.touches ? e.touches[0].pageY : e.pageY;
  const index = Math.floor((pageY - winOffsetY.value) / itemHeight.value);
  if (touchmoveIndex.value === index) return;
  if (lists.value[index]) {
    scrollViewId.value = 'zx-indexed-list-' + index;
    touchmoveIndex.value = index;
  }
}
function touchEnd() {
  touchmove.value = false;
}
function mouseStart(e) { touchStart(e); }
function mouseMove(e) { touchMove(e); }
function mouseLeave(e) { touchEnd(e); }

function onItemClick(idx, index) {
  const item = lists.value[idx].items[index];
  let select = [];
  if (props.showSelect) {
    item.checked = !item.checked;
    lists.value.forEach(group => {
      group.items.forEach(i => {
        if (i.checked) select.push({ ...i });
      });
    });
  }
  emit('click', { item: { ...item }, select });
}
</script>

<style lang="scss" scoped>
.zx-indexed-list {
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: row;
}
.zx-indexed-list__scroll {
  flex: 1;
}
.zx-indexed-list__title {
  background: #f7f7f7;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 500;
}
.zx-indexed-list__item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  border-bottom: 1px solid #dedede;
  font-size: 14px;
  color: #191919;
}
.zx-indexed-list__checkbox {
  margin-right: 20rpx;
}
.zx-indexed-list__menu {
  width: 24px;
  display: flex;
  flex-direction: column;
}
.zx-indexed-list__menu-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zx-indexed-list__menu-text {
  font-size: 12px;
  text-align: center;
  color: #aaa;
}
.zx-indexed-list__menu-text--active {
  border-radius: 16px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  background-color: #007aff;
  color: #fff;
}
.zx-indexed-list__alert-wrapper {
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zx-indexed-list__alert {
  width: 80px;
  height: 80px;
  border-radius: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 35px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
