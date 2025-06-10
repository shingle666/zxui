<template>
  <view v-if="show" class="zx-notice-bar" :style="{ backgroundColor }" @click="onClick">
    <slot name="icon">
      <uni-icons v-if="showIcon" class="zx-notice-bar-icon" type="sound" :color="color" :size="fontSize * 1.5" />
    </slot>
    <view class="zx-notice-bar__content-wrapper" :class="{
      'zx-notice-bar__content-wrapper--scrollable': scrollable,
      'zx-notice-bar__content-wrapper--single': !scrollable && (single || moreText)
    }" :style="{ height: scrollable ? fontSize * 1.5 + 'px' : 'auto' }">
      <view class="zx-notice-bar__content" :class="{
        'zx-notice-bar__content--scrollable': scrollable,
        'zx-notice-bar__content--single': !scrollable && (single || moreText)
      }">
        <text class="zx-notice-bar__content-text"
          :class="{
            'zx-notice-bar__content-text--scrollable': scrollable,
            'zx-notice-bar__content-text--single': !scrollable && (single || showGetMore)
          }"
          :style="{
            color: color,
            fontSize: fontSize + 'px',
            lineHeight: fontSize * 1.5 + 'px',
            width: wrapWidth,
            animationDuration: animationDuration,
            animationPlayState: animationPlayState,
            animationDelay: animationDelay
          }"
        >{{ text }}</text>
      </view>
    </view>
    <view v-if="isShowGetMore" class="zx-notice-bar__more" @click.stop="clickMore">
      <text v-if="moreText.length > 0" :style="{ color: moreColor, fontSize: fontSize + 'px' }">{{ moreText }}</text>
      <uni-icons v-else type="right" :color="moreColor" :size="fontSize * 1.1" />
    </view>
    <view class="zx-notice-bar-close" v-if="isShowClose">
      <uni-icons type="closeempty" :color="color" :size="fontSize * 1.1" @click.stop="close" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { onMounted } from 'vue';
import UniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';

const props = defineProps({
  text: { type: String, default: '' },
  moreText: { type: String, default: '' },
  backgroundColor: { type: String, default: '#FFF9EA' },
  speed: { type: Number, default: 100 },
  color: { type: String, default: '#FF9A43' },
  fontSize: { type: Number, default: 14 },
  moreColor: { type: String, default: '#FF9A43' },
  single: { type: [Boolean, String], default: false },
  scrollable: { type: [Boolean, String], default: false },
  showIcon: { type: [Boolean, String], default: false },
  showGetMore: { type: [Boolean, String], default: false },
  showClose: { type: [Boolean, String], default: false }
});

const emit = defineEmits(['click', 'getmore', 'close']);

const show = ref(true);
const animationDuration = ref('none');
const animationPlayState = ref('paused');
const animationDelay = ref('0s');
const wrapWidth = ref('auto');

const isShowGetMore = computed(() => props.showGetMore === true || props.showGetMore === 'true');
const isShowClose = computed(() => (props.showClose === true || props.showClose === 'true') && !isShowGetMore.value);

function clickMore() {
  emit('getmore');
}
function close() {
  show.value = false;
  emit('close');
}
function onClick() {
  emit('click');
}

watch(() => props.text, () => {
  initAnimation();
});

function initAnimation() {
  if (props.scrollable) {
    // 由于不使用DOM，采用简单的定时器模拟动画（兼容多端）
    animationDuration.value = `${Math.max(props.text.length * 0.15, 2)}s`;
    animationDelay.value = '0s';
    animationPlayState.value = 'running';
    wrapWidth.value = 'auto';
  } else {
    animationDuration.value = 'none';
    animationPlayState.value = 'paused';
    animationDelay.value = '0s';
    wrapWidth.value = '100%';
  }
}

onMounted(() => {
  nextTick(() => {
    initAnimation();
  });
});
</script>

<style lang="scss" scoped>
.zx-notice-bar {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 10px;
}
.zx-notice-bar-icon {
  margin-right: 5px;
}
.zx-notice-bar__content-wrapper {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
}
.zx-notice-bar__content-wrapper--single {
  line-height: 18px;
}
.zx-notice-bar__content-wrapper--single,
.zx-notice-bar__content-wrapper--scrollable {
  flex-direction: row;
}
.zx-notice-bar__content--scrollable {
  flex: 1;
  display: block;
  overflow: hidden;
}
.zx-notice-bar__content--single {
  display: flex;
  flex: none;
  width: 100%;
  justify-content: center;
}
.zx-notice-bar__content-text {
  font-size: 14px;
  line-height: 18px;
  word-break: break-all;
}
.zx-notice-bar__content-text--single {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.zx-notice-bar__content-text--scrollable {
  position: relative;
  display: block;
  height: 18px;
  line-height: 18px;
  white-space: nowrap;
  padding-left: 100%;
  animation: zx-notice-scroll linear infinite both;
  animation-duration: v-bind(animationDuration);
  animation-play-state: v-bind(animationPlayState);
  animation-delay: v-bind(animationDelay);
}
.zx-notice-bar__more {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-left: 5px;
}
.zx-notice-bar-close {
  margin-left: 8px;
  margin-right: 5px;
}
@keyframes zx-notice-scroll {
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
