<template>
  <view :class="placeholderClass" :style="placeholderStyle">
    <!-- 图标 -->
    <view v-if="iconContent" class="zx-attachment-placeholder__icon">
      <text class="zx-attachment-placeholder__icon-text">{{ iconContent }}</text>
    </view>
    
    <!-- 标题 -->
    <view v-if="titleContent" class="zx-attachment-placeholder__title">
      {{ titleContent }}
    </view>
    
    <!-- 描述 -->
    <view v-if="descriptionContent" class="zx-attachment-placeholder__description">
      {{ descriptionContent }}
    </view>
    
    <!-- 默认内容 -->
    <view v-if="!iconContent && !titleContent && !descriptionContent && defaultText" class="zx-attachment-placeholder__default">
      {{ defaultText }}
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

// 定义组件名称
defineOptions({
  name: 'ZxAttachmentPlaceholder'
});

// 定义 Props
const props = defineProps({
  // 占位信息配置
  placeholder: {
    type: [String, Object],
    default: null
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  }
});

// 计算属性
const placeholderConfig = computed(() => {
  if (typeof props.placeholder === 'string') {
    return {
      title: props.placeholder
    };
  }
  
  if (typeof props.placeholder === 'object' && props.placeholder !== null) {
    return props.placeholder;
  }
  
  return {};
});

const iconContent = computed(() => {
  const config = placeholderConfig.value;
  if (config.icon) {
    // 如果是字符串，直接返回
    if (typeof config.icon === 'string') {
      return config.icon;
    }
    // 如果是对象，尝试获取文本内容
    if (typeof config.icon === 'object' && config.icon.text) {
      return config.icon.text;
    }
  }
  return '📎'; // 默认图标
});

const titleContent = computed(() => {
  const config = placeholderConfig.value;
  return config.title || '';
});

const descriptionContent = computed(() => {
  const config = placeholderConfig.value;
  return config.description || '';
});

const defaultText = computed(() => {
  if (props.placeholder && typeof props.placeholder === 'string') {
    return props.placeholder;
  }
  return '点击或拖拽文件到此处';
});

const placeholderClass = computed(() => {
  const classes = ['zx-attachment-placeholder'];
  
  if (props.disabled) {
    classes.push('zx-attachment-placeholder--disabled');
  }
  
  return classes.join(' ');
});

const placeholderStyle = computed(() => {
  return {};
});
</script>

<style lang="scss" scoped>
.zx-attachment-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  text-align: center;
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.zx-attachment-placeholder__icon {
  margin-bottom: 8px;
}

.zx-attachment-placeholder__icon-text {
  font-size: 32px;
  line-height: 1;
}

.zx-attachment-placeholder__title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 4px;
  line-height: 1.4;
}

.zx-attachment-placeholder__description {
  font-size: 14px;
  color: #8c8c8c;
  line-height: 1.4;
}

.zx-attachment-placeholder__default {
  font-size: 14px;
  color: #8c8c8c;
  line-height: 1.4;
}
</style>