<template>
  <!-- #ifdef APP-NVUE -->
  <cell>
    <!-- #endif -->
    <view :hover-class="!clickable && !link ? '' : 'zx-list-chat--hover'" class="zx-list-chat" @click.stop="onClick">
      <view :class="{ 'zx-list--border': border, 'zx-list-chat--first': isFirstChild }"></view>
      <view class="zx-list-chat__container">
        <view class="zx-list-chat__header-warp">
          <view v-if="avatarCircle || avatarList.length === 0" class="zx-list-chat__header"
            :class="{ 'header--circle': avatarCircle }">
            <image class="zx-list-chat__header-image" :class="{ 'header--circle': avatarCircle }" :src="avatarUrl"
              mode="aspectFill"></image>
          </view>
          <!-- 头像组 -->
          <view v-else class="zx-list-chat__header">
            <view v-for="(item, index) in avatarList" :key="index" class="zx-list-chat__header-box"
              :class="computedAvatar" :style="{ width: imageWidth + 'px', height: imageWidth + 'px' }">
              <image class="zx-list-chat__header-image" :style="{ width: imageWidth + 'px', height: imageWidth + 'px' }"
                :src="item.url" mode="aspectFill"></image>
            </view>
          </view>
        </view>
        <!-- #ifndef APP -->
        <view class="slot-header">
          <!-- #endif -->
          <slot name="header"></slot>
          <!-- #ifndef APP -->
        </view>
        <!-- #endif -->
        <view v-if="badgeText && badgePositon === 'left'" class="zx-list-chat__badge zx-list-chat__badge-pos"
          :class="[isSingle]">
          <text class="zx-list-chat__badge-text">{{
            badgeText === "dot" ? "" : badgeText
          }}</text>
        </view>
        <view class="zx-list-chat__content">
          <view class="zx-list-chat__content-main">
            <text class="zx-list-chat__content-title zx-ellipsis">{{ title }}</text>
            <view style="flex-direction: row">
              <text class="draft" v-if="isDraft">[草稿]</text>
              <text class="zx-list-chat__content-note zx-ellipsis">{{
                isDraft ? note.slice(14) : note
              }}</text>
            </view>
          </view>
          <view class="zx-list-chat__content-extra">
            <slot>
              <text class="zx-list-chat__content-extra-text">{{ time }}</text>
              <view v-if="badgeText && badgePositon === 'right'" class="zx-list-chat__badge"
                :class="[isSingle, badgePositon === 'right' ? 'zx-list-chat--right' : '']">
                <text class="zx-list-chat__badge-text">{{
                  badgeText === "dot" ? "" : badgeText
                }}</text>
              </view>
            </slot>
          </view>
        </view>
      </view>
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

const props = defineProps({
  title: { type: String, default: "" },
  note: { type: String, default: "" },
  clickable: { type: Boolean, default: false },
  link: { type: [Boolean, String], default: false },
  to: { type: String, default: "" },
  badgeText: { type: [String, Number], default: "" },
  badgePositon: { type: String, default: "right" },
  time: { type: String, default: "" },
  avatarCircle: { type: Boolean, default: false },
  avatar: { type: String, default: "" },
  avatarList: { type: Array, default: () => [] },
});

const emit = defineEmits(["click"]);

const isFirstChild = ref(false);
const border = ref(true);
const imageWidth = ref(50);
const avatarUrl = ref("");

const isDraft = computed(() => props.note.slice(0, 14) === "[zx-im-draft]");
const isSingle = computed(() => {
  if (props.badgeText === "dot") return "zx-badge--dot";
  const badgeText = props.badgeText.toString();
  if (badgeText.length > 1) return "zx-badge--complex";
  return "zx-badge--single";
});
const computedAvatar = computed(() => {
  if (props.avatarList.length > 4) {
    imageWidth.value = 45 * 0.31;
    return "avatarItem--3";
  } else if (props.avatarList.length > 1) {
    imageWidth.value = 45 * 0.47;
    return "avatarItem--2";
  } else {
    imageWidth.value = 45;
    return "avatarItem--1";
  }
});

watch(
  () => props.avatar,
  (avatar) => {
    if (avatar.substr(0, 8) === "cloud://") {
      uniCloud.getTempFileURL({ fileList: [avatar] }).then((res) => {
        let fileList = res.fileList || res.result.fileList;
        avatarUrl.value = fileList[0].tempFileURL;
      });
    } else {
      avatarUrl.value = avatar;
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
    border.value = list.border;
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
/**
 * 这里是 uni-list 组件内置的常用样式变量
 * 如果需要覆盖样式，这里提供了基本的组件样式变量，您可以尝试修改这里的变量，去完成样式替换，而不用去修改源码
 */
// 背景色
$background-color: #fff;
// 分割线颜色
$divide-line-color: #e5e5e5;
// 默认头像大小，如需要修改此值，注意同步修改 js 中的值 const avatarWidth = xx ，目前只支持方形头像
// nvue 页面不支持修改头像大小
$avatar-width: 45px;
// 头像边框
$avatar-border-radius: 5px;
$avatar-border-color: #eee;
$avatar-border-width: 1px;
// 标题文字样式
$title-size: 16px;
$title-color: #3b4144;
$title-weight: normal;
// 描述文字样式
$note-size: 12px;
$note-color: #999;
$note-weight: normal;
// 右侧额外内容默认样式
$right-text-size: 12px;
$right-text-color: #999;
$right-text-weight: normal;
// 角标样式
// nvue 页面不支持修改圆点位置以及大小
// 角标在左侧时，角标的位置，默认为 0 ，负数左/下移动，正数右/上移动
$badge-left: 0px;
$badge-top: 0px;
// 显示圆点时，圆点大小
$dot-width: 10px;
$dot-height: 10px;
// 显示角标时，角标大小和字体大小
$badge-size: 18px;
$badge-font: 12px;
// 显示角标时，角标前景色
$badge-color: #fff;
// 显示角标时，角标背景色
$badge-background-color: #ff5a5f;
// 显示角标时，角标左右间距
$badge-space: 6px;
// 状态样式
// 选中颜色
$hover: #f5f5f5;
$zx-font-size-lg: 16px;
$zx-spacing-row-lg: 16px;
$zx-spacing-row-base: 10px;

.zx-list-chat {
  font-size: $zx-font-size-lg;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  background-color: $background-color;
}

// .zx-list-chat--disabled {
// 	opacity: 0.3;
// }

.zx-list-chat--hover {
  background-color: $hover;
}

.zx-list--border {
  position: relative;
  margin-left: $zx-spacing-row-lg;
  /* #ifdef APP-PLUS */
  border-top-color: $divide-line-color;
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
  background-color: $divide-line-color;
}

.zx-list-item--first:after {
  height: 0px;
}

/* #endif */

.zx-list-chat--first {
  border-top-width: 0px;
}

.zx-ellipsis {
  /* #ifndef APP-NVUE */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* #endif */
  /* #ifdef APP-NVUE */
  lines: 1;
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
  /* #endif */
}

.zx-list-chat__container {
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  flex: 1;
  padding: $zx-spacing-row-base $zx-spacing-row-lg;
  position: relative;
  overflow: hidden;
}

.zx-list-chat__header-warp {
  position: relative;
}

.zx-list-chat__header {
  /* #ifndef APP-NVUE */
  display: flex;
  align-content: center;
  /* #endif */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap-reverse;
  /* #ifdef APP-NVUE */
  width: 50px;
  height: 50px;
  /* #endif */
  /* #ifndef APP-NVUE */
  width: $avatar-width;
  height: $avatar-width;
  /* #endif */

  border-radius: $avatar-border-radius;
  border-color: $avatar-border-color;
  border-width: $avatar-border-width;
  border-style: solid;
  overflow: hidden;
}

.zx-list-chat__header-box {
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  display: flex;
  width: $avatar-width;
  height: $avatar-width;
  /* #endif */
  /* #ifdef APP-NVUE */
  width: 50px;
  height: 50px;
  /* #endif */
  overflow: hidden;
  border-radius: 2px;
}

.zx-list-chat__header-image {
  margin: 1px;
  /* #ifdef APP-NVUE */
  width: 50px;
  height: 50px;
  /* #endif */
  /* #ifndef APP-NVUE */
  width: $avatar-width;
  height: $avatar-width;
  /* #endif */
}

/* #ifndef APP-NVUE */
.zx-list-chat__header-image {
  display: block;
  width: 100%;
  height: 100%;
}

.avatarItem--1 {
  width: 100%;
  height: 100%;
}

.avatarItem--2 {
  width: 47%;
  height: 47%;
}

.avatarItem--3 {
  width: 32%;
  height: 32%;
}

/* #endif */
.header--circle {
  border-radius: 50%;
}

.zx-list-chat__content {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  padding: 2px 0;
}

.zx-list-chat__content-main {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: space-between;
  padding-left: $zx-spacing-row-base;
  flex: 1;
  overflow: hidden;
}

.zx-list-chat__content-title {
  font-size: $title-size;
  color: $title-color;
  font-weight: $title-weight;
  overflow: hidden;
}

.draft,
.zx-list-chat__content-note {
  margin-top: 3px;
  color: $note-color;
  font-size: $note-size;
  font-weight: $title-weight;
  overflow: hidden;
}

.draft {
  color: #eb3a41;
  /* #ifndef APP-NVUE */
  flex-shrink: 0;
  /* #endif */
  padding-right: 3px;
}

.zx-list-chat__content-extra {
  /* #ifndef APP-NVUE */
  flex-shrink: 0;
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: 5px;
}

.zx-list-chat__content-extra-text {
  color: $right-text-color;
  font-size: $right-text-size;
  font-weight: $right-text-weight;
  overflow: hidden;
}

.zx-list-chat__badge-pos {
  position: absolute;
  /* #ifdef APP-NVUE */
  left: 55px;
  top: 3px;
  /* #endif */
  /* #ifndef APP-NVUE */
  left: calc(#{$avatar-width} + 10px - #{$badge-space} + #{$badge-left});
  top: calc(#{$zx-spacing-row-base}/ 2 + 1px + #{$badge-top});
  /* #endif */
}

.zx-list-chat__badge {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: $badge-background-color;
}

.zx-list-chat__badge-text {
  color: $badge-color;
  font-size: $badge-font;
}

.zx-badge--single {
  /* #ifndef APP-NVUE */
  // left: calc(#{$avatar-width} + 7px + #{$badge-left});
  /* #endif */
  width: $badge-size;
  height: $badge-size;
}

.zx-badge--complex {
  /* #ifdef APP-NVUE */
  left: 50px;
  /* #endif */
  /* #ifndef APP-NVUE */
  width: auto;
  /* #endif */
  height: $badge-size;
  padding: 0 $badge-space;
}

.zx-badge--dot {
  /* #ifdef APP-NVUE */
  left: 60px;
  top: 6px;
  /* #endif */
  /* #ifndef APP-NVUE */
  left: calc(#{$avatar-width} + 15px - #{$dot-width}/ 2 + 1px + #{$badge-left});
  /* #endif */
  width: $dot-width;
  height: $dot-height;
  padding: 0;
}

.zx-list-chat--right {
  /* #ifdef APP-NVUE */
  left: 0;
  /* #endif */
}
</style>
