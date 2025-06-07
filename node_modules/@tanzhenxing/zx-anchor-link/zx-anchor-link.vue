<template>
  <view class="zx-anchor-link" :class="{ active }">
    <view class="zx-anchor-link-title" @click="handleClick">
      <zx-text v-if="title">{{ title }}</zx-text>
      <slot v-else></slot>
    </view>
    <view class="zx-anchor-link-sublink" v-if="$slots['sub-link']">
      <slot name="sub-link"></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, inject, watch, onMounted, onBeforeUnmount } from 'vue'
import zxText from '@tanzhenxing/zx-text/zx-text.vue'

const props = defineProps({
  href: {
    type: String,
    default: '#'
  },
  title: {
    type: String,
    default: ''
  }
})

const zxAnchor = inject('zxAnchor', null)
const active = ref(false)

watch(() => props.href, () => {
  updateActiveStatus()
})

onMounted(() => {
  zxAnchor?.registerLink({
    href: props.href,
    updateActiveStatus
  })
  updateActiveStatus()
})

onBeforeUnmount(() => {
  zxAnchor?.unregisterLink({
    href: props.href
  })
})

function handleClick(e) {
  zxAnchor?.handleLinkClick(props.href, e)
}

function updateActiveStatus() {
  if (zxAnchor) {
    active.value = zxAnchor.currentLink === props.href
  }
}
</script>

<style scoped>
.zx-anchor-link {
  padding: 4px 0;
  line-height: 1.5;
}

.zx-anchor-link-title {
  position: relative;
  display: block;
  margin-bottom: 6px;
  color: #606266;
  transition: all 0.3s;
  text-decoration: none;
  cursor: pointer;
}

.zx-anchor-link-title:hover {
  color: var(--el-color-primary, #409eff);
}

.zx-anchor-link.active>.zx-anchor-link-title {
  color: var(--el-color-primary, #409eff);
  font-weight: 500;
}

.zx-anchor-link-sublink {
  padding-left: 16px;
}

/* 水平模式的样式 */
.zx-anchor.horizontal .zx-anchor-link {
  padding: 0 16px 16px 0;
}

.zx-anchor.horizontal .zx-anchor-link-sublink {
  display: none;
}
</style>