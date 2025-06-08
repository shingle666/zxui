<template>
  <!-- #ifdef APP-NVUE -->
  <cell :keep-scroll-position="keepScrollPosition">
    <!-- #endif -->
    <view :class="{ 'zx-list-item--disabled': disabled }" :style="{ 'background-color': customStyle.backgroundColor }"
      :hover-class="(!clickable && !link) || disabled || showSwitch ? '' : 'zx-list-item--hover'
        " class="zx-list-item" @click="onClick">
      <view v-if="!isFirstChild" class="border--left" :class="{ 'zx-list--border': border }"></view>
      <view class="zx-list-item__container" :class="{
        'container--right': showArrow || link,
        'flex--direction': direction === 'column',
      }" :style="{
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: padding.bottom,
        }">
        <slot name="header">
          <view class="zx-list-item__header">
            <view v-if="thumb" class="zx-list-item__icon">
              <image :src="thumb" class="zx-list-item__icon-img" :class="['zx-list--' + thumbSize]" />
            </view>
            <view v-else-if="showExtraIcon" class="zx-list-item__icon">
              <zx-icon :customPrefix="extraIcon.customPrefix" :color="extraIcon.color" :size="extraIcon.size"
                :type="extraIcon.type" />
            </view>
          </view>
        </slot>
        <slot name="body">
          <view class="zx-list-item__content" :class="{
            'zx-list-item__content--center':
              thumb || showExtraIcon || showBadge || showSwitch,
          }">
            <text v-if="title" class="zx-list-item__content-title"
              :class="[ellipsis !== 0 && ellipsis <= 2 ? 'zx-ellipsis-' + ellipsis : '']">{{ title }}</text>
            <text v-if="note" class="zx-list-item__content-note">{{ note }}</text>
          </view>
        </slot>
        <slot name="footer">
          <view v-if="rightText || showBadge || showSwitch" class="zx-list-item__extra"
            :class="{ 'flex--justify': direction === 'column' }">
            <text v-if="rightText" class="zx-list-item__extra-text">{{ rightText }}</text>
            <zx-badge v-if="showBadge" :type="badgeType" :text="badgeText" :custom-style="badgeStyle" />
            <zx-switch v-if="showSwitch" :disabled="disabled" :model-value="switchChecked" @update:modelValue="onSwitchChange" />
          </view>
        </slot>
      </view>
      <zx-icon v-if="showArrow || link" :size="16" class="zx-icon-wrapper" color="#bbb" type="arrowright" />
    </view>
    <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  defineProps,
  defineEmits,
  getCurrentInstance,
} from "vue";

import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import zxBadge from '@tanzhenxing/zx-badge/zx-badge.vue'
import zxSwitch from '@tanzhenxing/zx-switch/zx-switch.vue'

const props = defineProps({
  direction: { type: String, default: "row" },
  title: { type: String, default: "" },
  note: { type: String, default: "" },
  ellipsis: { type: [Number, String], default: 0 },
  disabled: { type: [Boolean, String], default: false },
  clickable: { type: Boolean, default: false },
  showArrow: { type: [Boolean, String], default: false },
  link: { type: [Boolean, String], default: false },
  to: { type: String, default: "" },
  showBadge: { type: [Boolean, String], default: false },
  showSwitch: { type: [Boolean, String], default: false },
  switchChecked: { type: [Boolean, String], default: false },
  badgeText: { type: String, default: "" },
  badgeType: { type: String, default: "success" },
  badgeStyle: { type: Object, default: () => ({}) },
  rightText: { type: String, default: "" },
  thumb: { type: String, default: "" },
  thumbSize: { type: String, default: "base" },
  showExtraIcon: { type: [Boolean, String], default: false },
  extraIcon: {
    type: Object,
    default: () => ({ type: "", color: "#000000", size: 20, customPrefix: "" }),
  },
  border: { type: Boolean, default: true },
  customStyle: {
    type: Object,
    default: () => ({ padding: "", backgroundColor: "#FFFFFF" }),
  },
  keepScrollPosition: { type: Boolean, default: false },
});

const emit = defineEmits(["click", "switchChange"]);

const isFirstChild = ref(false);
const padding = ref({ top: "", right: "", bottom: "", left: "" });

watch(
  () => props.customStyle.padding,
  (val) => {
    let paddingVal = val;
    if (typeof paddingVal === "number") paddingVal += "";
    const arr = (paddingVal || "").split(" ");
    if (arr.length === 1) {
      padding.value = { top: arr[0], right: arr[0], bottom: arr[0], left: arr[0] };
    } else if (arr.length === 2) {
      padding.value = { top: arr[0], right: arr[1], bottom: arr[0], left: arr[1] };
    } else if (arr.length === 4) {
      padding.value = { top: arr[0], right: arr[1], bottom: arr[2], left: arr[3] };
    }
  },
  { immediate: true }
);

function getForm(name = "zxList") {
  let parent = getCurrentInstance()?.proxy?.$parent;
  let parentName = parent?.$options?.name;
  while (parentName !== name) {
    parent = parent?.$parent;
    if (!parent) return false;
    parentName = parent?.$options?.name;
  }
  return parent;
}

onMounted(() => {
  const list = getForm();
  if (list) {
    if (!list.firstChildAppend) {
      list.firstChildAppend = true;
      isFirstChild.value = true;
    }
  }
});

function onClick() {
  if (props.to !== "") {
    openPage();
    return;
  }
  if (props.clickable || props.link) {
    emit("click", { data: {} });
  }
}
function onSwitchChange(e) {
  emit("switchChange", e.detail);
}
function openPage() {
  const api = ["navigateTo", "redirectTo", "reLaunch", "switchTab"].includes(props.link)
    ? props.link
    : "navigateTo";
  pageApi(api);
}
function pageApi(api) {
  const callback = {
    url: props.to,
    success: (res) => emit("click", { data: res }),
    fail: (err) => emit("click", { data: err }),
  };
  switch (api) {
    case "navigateTo":
      uni.navigateTo(callback);
      break;
    case "redirectTo":
      uni.redirectTo(callback);
      break;
    case "reLaunch":
      uni.reLaunch(callback);
      break;
    case "switchTab":
      uni.switchTab(callback);
      break;
    default:
      uni.navigateTo(callback);
  }
}
</script>

<style lang="scss">
$zx-font-size-sm: 12px;
$zx-font-size-base: 14px;
$zx-font-size-lg: 16px;
$zx-spacing-col-lg: 12px;
$zx-spacing-row-lg: 15px;
$zx-img-size-sm: 20px;
$zx-img-size-base: 26px;
$zx-img-size-lg: 40px;
$zx-border-color: #e5e5e5;
$zx-bg-color-hover: #f1f1f1;
$zx-text-color-grey: #999;
$list-item-pd: $zx-spacing-col-lg $zx-spacing-row-lg;

.zx-list-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  font-size: $zx-font-size-lg;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  flex-direction: row;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
}

.zx-list-item--disabled {
  opacity: 0.3;
}

.zx-list-item--hover {
  background-color: $zx-bg-color-hover !important;
}

.zx-list-item__container {
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: $list-item-pd;
  padding-left: $zx-spacing-row-lg;
  flex: 1;
  overflow: hidden;
  // align-items: center;
}

.container--right {
  padding-right: 0;
}

// .border--left {
// 	margin-left: $zx-spacing-row-lg;
// }
.zx-list--border {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  /* #ifdef APP-NVUE */
  border-top-color: $zx-border-color;
  border-top-style: solid;
  border-top-width: 0.5px;
  /* #endif */
}

/* #ifndef APP-NVUE */
.zx-list--border:after {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $zx-border-color;
}

/* #endif */
.zx-list-item__content {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  padding-right: 8px;
  flex: 1;
  color: #3b4144;
  // overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.zx-list-item__content--center {
  justify-content: center;
}

.zx-list-item__content-title {
  font-size: $zx-font-size-base;
  color: #3b4144;
  overflow: hidden;
}

.zx-list-item__content-note {
  margin-top: 6rpx;
  color: $zx-text-color-grey;
  font-size: $zx-font-size-sm;
  overflow: hidden;
}

.zx-list-item__extra {
  // width: 25%;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.zx-list-item__header {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.zx-list-item__icon {
  margin-right: 18rpx;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.zx-list-item__icon-img {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  height: $zx-img-size-base;
  width: $zx-img-size-base;
  margin-right: 10px;
}

.zx-icon-wrapper {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  padding: 0 10px;
}

.flex--direction {
  flex-direction: column;
  /* #ifndef APP-NVUE */
  align-items: initial;
  /* #endif */
}

.flex--justify {
  /* #ifndef APP-NVUE */
  justify-content: initial;
  /* #endif */
}

.zx-list--lg {
  height: $zx-img-size-lg;
  width: $zx-img-size-lg;
}

.zx-list--base {
  height: $zx-img-size-base;
  width: $zx-img-size-base;
}

.zx-list--sm {
  height: $zx-img-size-sm;
  width: $zx-img-size-sm;
}

.zx-list-item__extra-text {
  color: $zx-text-color-grey;
  font-size: $zx-font-size-sm;
}

.zx-ellipsis-1 {
  /* #ifndef APP-NVUE */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* #endif */
  /* #ifdef APP-NVUE */
  lines: 1;
  text-overflow: ellipsis;
  /* #endif */
}

.zx-ellipsis-2 {
  /* #ifndef APP-NVUE */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* #endif */
  /* #ifdef APP-NVUE */
  lines: 2;
  text-overflow: ellipsis;
  /* #endif */
}
</style>
