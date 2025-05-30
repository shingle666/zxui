<template>
  <view class="demo-page">
    <zx-navbar title="IndexBar 索引栏"></zx-navbar>

    <view class="demo-title">基础用法</view>
    <zx-index-bar ref="indexBarRefBasic">
      <view>
        <zx-index-anchor index="A" />
        <view class="demo-cell">文本内容 A1</view>
        <view class="demo-cell">文本内容 A2</view>
        <view class="demo-cell">文本内容 A3</view>

        <zx-index-anchor index="B" />
        <view class="demo-cell">文本内容 B1</view>
        <view class="demo-cell">文本内容 B2</view>
        <view class="demo-cell">文本内容 B3</view>

        <zx-index-anchor index="C" />
        <view class="demo-cell">文本内容 C1</view>
        <view class="demo-cell">文本内容 C2</view>

        <zx-index-anchor index="D" />
        <view class="demo-cell">文本内容 D1</view>

        <zx-index-anchor index="E" />
        <view class="demo-cell">文本内容 E1</view>
        <view class="demo-cell">文本内容 E2</view>
        <view class="demo-cell">文本内容 E3</view>
        <view class="demo-cell">文本内容 E4</view>
        <view class="demo-cell">文本内容 E5</view>
        <view class="demo-cell">文本内容 E6</view>
        <view class="demo-cell">文本内容 E7</view>
        <view class="demo-cell">文本内容 E8</view>
        <view class="demo-cell">文本内容 E9</view>
        <view class="demo-cell">文本内容 E10</view>
        <view class="demo-cell">文本内容 E11</view>
        <view class="demo-cell">文本内容 E12</view>
        <view class="demo-cell">文本内容 E13</view>
        <view class="demo-cell">文本内容 E14</view>
        <view class="demo-cell">文本内容 E15</view>
      </view>
    </zx-index-bar>

    <view class="demo-title">自定义索引列表</view>
    <zx-index-bar :index-list="customIndexList" ref="indexBarRefCustom" @select="onSelect" @change="onChange">
      <view>
        <template v-for="item in customIndexList" :key="item">
          <zx-index-anchor :index="item" />
          <view class="demo-cell">文本内容 {{ item }}-1</view>
          <view class="demo-cell">文本内容 {{ item }}-2</view>
        </template>
      </view>
    </zx-index-bar>

    <view class="demo-title">自定义高亮颜色和吸顶距离</view>
    <zx-index-bar :sticky-offset-top="50" highlight-color="#f00" ref="indexBarRefStyled">
       <view>
        <zx-index-anchor index="A" />
        <view class="demo-cell">文本内容 A1 (吸顶偏移50px)</view>
        <view class="demo-cell">文本内容 A2</view>

        <zx-index-anchor index="B" />
        <view class="demo-cell">文本内容 B1</view>
        <view class="demo-cell">文本内容 B2</view>
         <view class="demo-cell">文本内容 B3</view>
        <view class="demo-cell">文本内容 B4</view>
        <view class="demo-cell">文本内容 B5</view>
        <view class="demo-cell">文本内容 B6</view>
        <view class="demo-cell">文本内容 B7</view>
        <view class="demo-cell">文本内容 B8</view>
        <view class="demo-cell">文本内容 B9</view>
        <view class="demo-cell">文本内容 B10</view>
      </view>
    </zx-index-bar>

    <view style="height: 200px;"></view> <!-- Spacer for scrolling -->
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';

// Define a more specific type for the IndexBar component instance if possible
// This improves type safety and autocompletion.
// Assuming ZxIndexBar exposes a 'scrollTo' method and 'onScroll' if needed externally.
interface ZxIndexBarInstance {
  scrollTo: (index: string | number) => void;
  onScroll?: (event: { scrollTop: number }) => void; // Optional, if used by parent
  // Add other exposed methods/props if necessary
}

const indexList = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26];

const indexBarRef = ref<ZxIndexBarInstance | null>(null);
const indexBarRefCustom = ref<ZxIndexBarInstance | null>(null);
const indexBarRefHighlight = ref<ZxIndexBarInstance | null>(null);

// Page scroll handling: ZxIndexBar is designed to work with a scrollable parent.
// If the page itself is the scrollable container, ZxIndexBar should detect this.
// The onPageScroll here is for demonstrating interaction if needed, but typically
// ZxIndexBar would use its parent scroller. If ZxIndexBar's `scrollParent` prop
// is not set, it might try to use the page as the scroller.
// For this example, we assume ZxIndexBar handles its own scroll detection or
// the scrollable area is within the <zx-index-bar> or its direct parent.
// If `zx-index-bar` needs explicit scroll events from the page:
onPageScroll((e) => {
  // This assumes `zx-index-bar` exposes an `onScroll` method or similar
  // for manual scroll event feeding. This is not standard for such components.
  // More likely, `zx-index-bar` uses `IntersectionObserver` or `uni.createSelectorQuery()`
  // to monitor its anchors relative to its scrollable viewport.

  // If `zx-index-bar` has an exposed `onScroll` method that needs page scroll data:
  // if (indexBarRef.value?.onScroll) {
  //   indexBarRef.value.onScroll(e); // e.g., e.scrollTop
  // }
  // if (indexBarRefCustom.value?.onScroll) {
  //   indexBarRefCustom.value.onScroll(e);
  // }
  // if (indexBarRefHighlight.value?.onScroll) {
  //   indexBarRefHighlight.value.onScroll(e);
  // }
});

const showAlert = (index: string | number) => {
  uni.showToast({
    title: `当前索引：${index}`,
    icon: 'none'
  });
};

onLoad(() => {
  // Example of using scrollTo method
  // setTimeout(() => {
  //   if (indexBarRefBasic.value) {
  //     indexBarRefBasic.value.scrollTo('C');
  //   }
  // }, 2000);
});

</script>

<style lang="scss">
.demo-page {
  background-color: #f7f8fa;
  padding-bottom: 20px; /* Ensure content below IndexBar is visible */
}

.demo-title {
  padding: 15px;
  color: #666;
  font-size: 14px;
}

.demo-cell {
  padding: 10px 15px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
  font-size: 14px;
  color: #333;

  &:last-child {
    border-bottom: none;
  }
}

// For sticky-offset-top demo, ensure navbar or other fixed elements are accounted for
// If using a global navbar with fixed position, its height should be considered.
</style>