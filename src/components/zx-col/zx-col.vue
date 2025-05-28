<template>
  <!-- #ifndef APP-NVUE -->
  <view :class="['zx-col', sizeClass, pointClassList]" :style="colStyle">
    <slot></slot>
  </view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  <!-- 设置right正值失效，设置 left 负值 -->
  <view :class="['zx-col']" :style="nvueColStyle">
    <slot></slot>
  </view>
  <!-- #endif -->
</template>

<script setup>
import { computed, inject, watch, ref, toRefs } from "vue";

const props = defineProps({
  span: { type: Number, default: 24 },
  offset: { type: Number, default: -1 },
  pull: { type: Number, default: -1 },
  push: { type: Number, default: -1 },
  xs: [Number, Object],
  sm: [Number, Object],
  md: [Number, Object],
  lg: [Number, Object],
  xl: [Number, Object],
});

const gutter = ref(0);
const sizeClass = ref("");
const parentWidth = ref(0);
const nvueWidth = ref(0);
const marginLeft = ref(0);
const right = ref(0);
const left = ref(0);

// 兼容uni-row父组件
const rowContext = inject("zx-row", null);

// 监听gutter
if (rowContext && rowContext.gutter !== undefined) {
  gutter.value = Number(rowContext.gutter) / 2;
  if (rowContext.gutterWatch) {
    rowContext.gutterWatch((val) => {
      gutter.value = Number(val) / 2;
    });
  }
}

// #ifdef APP-NVUE
if (rowContext && rowContext.width !== undefined) {
  parentWidth.value = rowContext.width;
  if (rowContext.widthWatch) {
    rowContext.widthWatch((val) => {
      parentWidth.value = val;
    });
  }
}
// #endif

const sizeList = computed(() => ({
  span: props.span,
  offset: props.offset,
  pull: props.pull,
  push: props.push,
}));

// 计算class
watch(
  sizeList,
  (newVal) => {
    // #ifndef APP-NVUE
    let classList = [];
    for (let size in newVal) {
      const curSize = newVal[size];
      if ((curSize || curSize === 0) && curSize !== -1) {
        classList.push(
          size === "span" ? `zx-col-${curSize}` : `zx-col-${size}-${curSize}`
        );
      }
    }
    sizeClass.value = classList.join(" ");
    // #endif
    // #ifdef APP-NVUE
    updateNvueWidth();
    // #endif
  },
  { immediate: true }
);

// 响应式断点class
const pointClassList = computed(() => {
  let classList = [];
  ["xs", "sm", "md", "lg", "xl"].forEach((point) => {
    const prop = props[point];
    if (typeof prop === "number") {
      classList.push(`zx-col-${point}-${prop}`);
    } else if (typeof prop === "object" && prop) {
      Object.keys(prop).forEach((key) => {
        classList.push(
          key === "span"
            ? `zx-col-${point}-${prop[key]}`
            : `zx-col-${point}-${key}-${prop[key]}`
        );
      });
    }
  });
  return classList.join(" ");
});

// 普通平台样式
const colStyle = computed(() => ({
  paddingLeft: `${gutter.value}rpx`,
  paddingRight: `${gutter.value}rpx`,
}));

// nvue专用宽度计算
function updateNvueWidth() {
  const width = parentWidth.value;
  ["span", "offset", "pull", "push"].forEach((size) => {
    const curSize = props[size];
    if ((curSize || curSize === 0) && curSize !== -1) {
      let RPX = (1 / 24) * curSize * width;
      RPX = Number(RPX);
      switch (size) {
        case "span":
          nvueWidth.value = RPX;
          break;
        case "offset":
          marginLeft.value = RPX;
          break;
        case "pull":
          right.value = RPX;
          break;
        case "push":
          left.value = RPX;
          break;
      }
    }
  });
}

// nvue平台样式
const nvueColStyle = computed(() => ({
  paddingLeft: `${gutter.value}rpx`,
  paddingRight: `${gutter.value}rpx`,
  width: `${nvueWidth.value}rpx`,
  position: "relative",
  marginLeft: `${marginLeft.value}rpx`,
  left: `${right.value === 0 ? left.value : -right.value}rpx`,
}));

// 断点变化时nvue宽度更新
// #ifdef APP-NVUE
watch(parentWidth, updateNvueWidth);
// #endif
</script>

<style lang="scss" scoped>
/* breakpoints */
$--sm: 768px !default;
$--md: 992px !default;
$--lg: 1200px !default;
$--xl: 1920px !default;

$breakpoints: (
  "xs": (
    max-width: $--sm - 1,
  ),
  "sm": (
    min-width: $--sm,
  ),
  "md": (
    min-width: $--md,
  ),
  "lg": (
    min-width: $--lg,
  ),
  "xl": (
    min-width: $--xl,
  ),
);

$layout-namespace: ".zx-";
$col: $layout-namespace + "col";

@use "sass:meta";
@use "sass:map";

@function getSize($num) {
  @if $num == 0 {
    @return 0%;
  } @else {
    @return percentage($num / 24);
  }
}

@mixin res($key, $map: $breakpoints) {
  @if map.has-key($map, $key) {
    @media screen and #{meta.inspect(map.get($map, $key))} {
      @content;
    }
  } @else {
    @warn "Undeinfed point: `#{$key}`";
  }
}

/* #ifndef APP-NVUE */
#{$col} {
  float: left;
  box-sizing: border-box;
}

#{$col}-0 {
  /* #ifdef APP-NVUE */
  width: 0;
  height: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  /* #endif */
  /* #ifndef APP-NVUE */
  display: none;
  /* #endif */
}

@for $i from 0 through 24 {
  #{$col}-#{$i} {
    width: getSize($i);
  }

  #{$col}-offset-#{$i} {
    margin-left: getSize($i);
  }

  #{$col}-pull-#{$i} {
    position: relative;
    right: getSize($i);
  }

  #{$col}-push-#{$i} {
    position: relative;
    left: getSize($i);
  }
}

@each $point in map.keys($breakpoints) {
  @include res($point) {
    #{$col}-#{$point}-0 {
      display: none;
    }

    @for $i from 0 through 24 {
      #{$col}-#{$point}-#{$i} {
        width: getSize($i);
      }

      #{$col}-#{$point}-offset-#{$i} {
        margin-left: getSize($i);
      }

      #{$col}-#{$point}-pull-#{$i} {
        position: relative;
        right: getSize($i);
      }

      #{$col}-#{$point}-push-#{$i} {
        position: relative;
        left: getSize($i);
      }
    }
  }
}

/* #endif */
</style>
