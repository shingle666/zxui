<template>
  <view class="container">
    <zx-navbar title="FloatingBubble 浮动气泡"></zx-navbar>
    <view class="content">
      <zx-group title="基础用法">
        <zx-floating-bubble icon="chat-o" @click="onClickBasic" />
      </zx-group>

      <zx-group title="自由拖拽和磁吸 (xy轴拖拽, x轴磁吸)">
        <zx-floating-bubble
          icon="scan"
          axis="xy"
          magnetic="x"
          :offset="offsetXY"
          @offset-change="onOffsetChangeXY"
          @click="onClickDrag"
        />
      </zx-group>

      <zx-group title="Y轴拖拽和磁吸 (y轴磁吸)">
        <zx-floating-bubble
          icon="star-o"
          axis="y"
          magnetic="y"
          :offset="offsetY"
          @offset-change="onOffsetChangeY"
          @click="onClickDragY"
        />
      </zx-group>

      <zx-group title="双向绑定 offset">
        <zx-floating-bubble v-model:offset="dynamicOffset" axis="xy" icon="setting-o" @click="onClickBind" />
        <view class="offset-display">
          当前位置: x: {{ dynamicOffset.x.toFixed(0) }}, y: {{ dynamicOffset.y.toFixed(0) }}
        </view>
        <zx-button type="primary" size="small" @click="resetPosition">重置位置</zx-button>
        <zx-button type="primary" size="small" @click="toggleBubble" style="margin-left: 10px;">{{ bubbleVisible ? '隐藏' : '显示' }}气泡</zx-button>
      </zx-group>

       <zx-group title="自定义内容">
        <zx-floating-bubble :offset="customOffset" axis="xy" @click="onClickCustom">
          <view style="font-size: 12px; color: white;">客服</view>
        </zx-floating-bubble>
      </zx-group>

    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxFloatingBubble from '@/components/zx-floating-bubble/zx-floating-bubble.vue';
import zxNavbar from '@/components/zx-navbar/zx-navbar.vue';
import zxGroup from '@/components/zx-group/zx-group.vue';
import zxButton from '@/components/zx-button/zx-button.vue';

const onClickBasic = () => {
  uni.showToast({
    title: '点击了基础气泡',
    icon: 'none'
  });
};

const offsetXY = ref({ x: 50, y: 150 });
const onOffsetChangeXY = (offset) => {
  console.log('自由拖拽 offset:', offset);
  uni.showToast({
    title: `自由拖拽 x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`,
    icon: 'none'
  });
};
const onClickDrag = () => {
  uni.showToast({
    title: '点击了自由拖拽气泡',
    icon: 'none'
  });
};

const offsetY = ref({ x: -1, y: 250 }); // x: -1 表示默认右侧
const onOffsetChangeY = (offset) => {
  console.log('Y轴拖拽 offset:', offset);
  uni.showToast({
    title: `Y轴拖拽 y: ${offset.y.toFixed(0)}`,
    icon: 'none'
  });
};
const onClickDragY = () => {
  uni.showToast({
    title: '点击了Y轴拖拽气泡',
    icon: 'none'
  });
};

const dynamicOffset = ref({ x: 100, y: 350 });
const bubbleVisible = ref(true);
const onClickBind = () => {
  uni.showToast({
    title: '点击了双向绑定气泡',
    icon: 'none'
  });
};
const resetPosition = () => {
  dynamicOffset.value = { x: 20, y: 400 };
};
const toggleBubble = () => {
  //  需要通过组件实例调用，或者让组件支持 v-model:visible
  //  这里我们先简单用一个变量控制，实际组件可能需要暴露方法或支持v-model
  //  在zx-floating-bubble.vue中已添加 defineExpose 和 v-model:modelValue 支持
  bubbleVisible.value = !bubbleVisible.value;
  //  假设组件实例名为 bubbleRef
  //  const bubbleComponent = instance.refs.bubbleRef; // 获取组件实例的方式，具体看vue版本和写法
  //  if (bubbleComponent) {
  //    bubbleComponent.toggle();
  //  }
};

const customOffset = ref({ x: 150, y: 500 });
const onClickCustom = () => {
  uni.showToast({
    title: '点击了自定义气泡',
    icon: 'none'
  });
};

</script>

<style lang="scss" scoped>
.container {
  background-color: #f7f8fa;
  min-height: 100vh;
}
.content {
  padding: 10px;
}
.offset-display {
  font-size: 12px;
  color: #666;
  margin: 10px 0;
}
</style>