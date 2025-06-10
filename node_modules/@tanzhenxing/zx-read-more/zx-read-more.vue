<template>
  <view class="zx-read-more">
    <view class="zx-read-more__content" :style="{
      height:
        isLongContent.value && status.value === 'close'
          ? addUnit(props.showHeight)
          : addUnit(contentHeight.value),
      textIndent: props.textIndent,
    }">
      <view class="zx-read-more__content__inner" :ref="contentInnerRef" :class="[elId]">
        <slot></slot>
      </view>
    </view>
    <view class="zx-read-more__toggle" :style="[innerShadowStyle.value]" v-if="isLongContent.value">
      <slot name="toggle">
        <view class="zx-read-more__toggle__text" @tap="toggleReadMore">
          <zx-text :text="status.value === 'close' ? props.closeText : props.openText" :color="props.color"
            :size="props.fontSize" :lineHeight="props.fontSize" margin="0 5px 0 0"></zx-text>
          <view class="zx-read-more__toggle__icon">
            <zx-icon :color="props.color" :size="Number(props.fontSize) + 2"
              :name="status.value === 'close' ? 'arrow-down' : 'arrow-up'"></zx-icon>
          </view>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';
import zxText from '@tanzhenxing/zx-text/zx-text.vue';

// 工具函数
function addUnit(val) {
  if (val == null) return '';
  return typeof val === 'number' ? `${val}px` : val;
}
function getPx(val) {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    return Number(val.replace(/px$/, ''));
  }
  return 0;
}
function guid(len = 8) {
  return 'zx-rm-' + Math.random().toString(36).substr(2, len);
}
// 获取元素尺寸（兼容多端）
function uGetRect(selector) {
  return new Promise(resolve => {
    // #ifdef H5 || MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
    uni.createSelectorQuery()
      .select(selector)
      .boundingClientRect(data => {
        resolve(data || { height: 0 });
      })
      .exec();
    // #endif
    // #ifdef APP-NVUE
    const dom = uni.requireNativePlugin('dom');
    dom.getComponentRect(selector, res => {
      resolve(res.size || { height: 0 });
    });
    // #endif
  });
}

const props = defineProps({
  showHeight: { type: [String, Number], default: 400 },
  toggle: { type: Boolean, default: false },
  closeText: { type: String, default: '展开阅读全文' },
  openText: { type: String, default: '收起' },
  color: { type: String, default: '#2979ff' },
  fontSize: { type: [String, Number], default: 14 },
  shadowStyle: {
    type: Object,
    default: () => ({
      // #ifndef APP-NVUE
      backgroundImage: 'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)',
      // #endif
      // #ifdef APP-NVUE
      backgroundImage: 'linear-gradient(to top, #fff, rgba(255, 255, 255, 0.5))',
      // #endif
      paddingTop: '100px',
      marginTop: '-100px',
    }),
  },
  textIndent: { type: String, default: '2em' },
  name: { type: [String, Number], default: '' },
});

const isLongContent = ref(false);
const status = ref('close');
const elId = guid();
const contentHeight = ref(100);
const contentInnerRef = ref(null);

const innerShadowStyle = computed(() => {
  return status.value === 'open' ? {} : props.shadowStyle;
});

async function getContentHeight() {
  await new Promise(r => setTimeout(r, 30));
  // 选择器需带唯一class，避免多实例冲突
  const rect = await uGetRect('.' + elId);
  return rect.height || 0;
}

async function init() {
  await nextTick();
  const height = await getContentHeight();
  contentHeight.value = height;
  if (height > getPx(props.showHeight)) {
    isLongContent.value = true;
    status.value = 'close';
  }
}

function toggleReadMore() {
  status.value = status.value === 'close' ? 'open' : 'close';
  if (!props.toggle) isLongContent.value = false;
  emit('open', props.name);
}

const emit = defineEmits(['open', 'close']);

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
$zx-content-color: #333;

.zx-read-more {
  &__content {
    overflow: hidden;
    color: $zx-content-color;
    font-size: 15px;
    text-align: left;
  }

  &__toggle {
    display: flex;
    justify-content: center;

    &__text {
      display: flex;

      align-items: center;
      justify-content: center;
      margin-top: 5px;
    }
  }
}
</style>
