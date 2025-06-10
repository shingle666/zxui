<template>
  <view :class="mergedClass" :style="mergedStyle" @click="handleClick">
    <!-- 文件列表 -->
    <view v-if="items.length > 0" :class="listClass" :style="listStyle">
      <view v-for="(item, index) in items" :key="item.uid || index" :class="itemClass" :style="itemStyle">
        <zx-attachment-item :item="item" :disabled="disabled" :image-props="imageProps" @remove="handleRemove"
          @preview="handlePreview" />
      </view>
    </view>

    <!-- 占位内容 -->
    <view v-else-if="placeholder" :class="placeholderClass" :style="placeholderStyle">
      <slot name="placeholder" :type="'inline'">
        <zx-attachment-placeholder :placeholder="placeholder" :disabled="disabled" />
      </slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import ZxAttachmentItem from './zx-attachment-item.vue';
import ZxAttachmentPlaceholder from './zx-attachment-placeholder.vue';

// 定义 Props
const props = defineProps({
  // 附件列表
  items: {
    type: Array,
    default: () => []
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 文件列表超出时样式
  overflow: {
    type: String, // 'wrap' | 'scrollX' | 'scrollY'
    default: 'wrap',
    validator: (value) => ['wrap', 'scrollX', 'scrollY'].includes(value)
  },
  // 没有文件时的占位信息
  placeholder: {
    type: [String, Object],
    default: null
  },
  // 图片属性配置
  imageProps: {
    type: Object,
    default: () => ({})
  },
  // 自定义样式类名
  customClass: {
    type: String,
    default: ''
  },
  // 自定义样式对象
  customStyle: {
    type: [String, Object],
    default: ''
  },
  // 语义化样式类名
  classNames: {
    type: Object,
    default: () => ({})
  },
  // 语义化样式对象
  styles: {
    type: Object,
    default: () => ({})
  }
});

// 定义 Emits
const emit = defineEmits([
  'remove', // 点击移除文件时触发
  'preview', // 点击预览文件时触发
  'click' // 点击组件时触发
]);

// 计算属性
const mergedClass = computed(() => {
  const baseClass = 'zx-ai-attachments';
  const classes = [baseClass, props.customClass];

  if (props.disabled) {
    classes.push(`${baseClass}--disabled`);
  }

  if (props.overflow !== 'wrap') {
    classes.push(`${baseClass}--overflow-${props.overflow}`);
  }

  return classes.filter(Boolean).join(' ');
});

const mergedStyle = computed(() => {
  if (typeof props.customStyle === 'string') {
    return props.customStyle;
  }
  return props.customStyle;
});

const listClass = computed(() => {
  const baseClass = 'zx-ai-attachments__list';
  const classes = [baseClass];

  if (props.overflow !== 'wrap') {
    classes.push(`${baseClass}--${props.overflow}`);
  }

  if (props.classNames.list) {
    classes.push(props.classNames.list);
  }

  return classes.join(' ');
});

const listStyle = computed(() => {
  return props.styles.list || {};
});

const itemClass = computed(() => {
  const baseClass = 'zx-ai-attachments__item';
  const classes = [baseClass];

  if (props.classNames.item) {
    classes.push(props.classNames.item);
  }

  return classes.join(' ');
});

const itemStyle = computed(() => {
  return props.styles.item || {};
});

const placeholderClass = computed(() => {
  const baseClass = 'zx-ai-attachments__placeholder';
  const classes = [baseClass];

  if (props.classNames.placeholder) {
    classes.push(props.classNames.placeholder);
  }

  return classes.join(' ');
});

const placeholderStyle = computed(() => {
  return props.styles.placeholder || {};
});

// 方法
const handleRemove = (item) => {
  if (props.disabled) return;
  emit('remove', item);
};

const handlePreview = (item) => {
  emit('preview', item);
};

const handleClick = () => {
  if (props.disabled) return;
  emit('click');
};

// 暴露方法
defineExpose({
  // 可以暴露一些内部方法供父组件调用
});
</script>

<style lang="scss" scoped>
.zx-ai-attachments {
  display: flex;
  flex-direction: column;
  width: 100%;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--overflow-scrollX {
    .zx-ai-attachments__list {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
    }
  }

  &--overflow-scrollY {
    .zx-ai-attachments__list {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 200px;
    }
  }
}

.zx-ai-attachments__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &--scrollX {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;

    .zx-ai-attachments__item {
      flex-shrink: 0;
    }
  }

  &--scrollY {
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 200px;
  }
}

.zx-ai-attachments__item {
  flex-shrink: 0;
}

.zx-ai-attachments__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  padding: 16px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background-color: #fafafa;
  transition: all 0.3s;

  &:hover {
    border-color: #1677ff;
    background-color: #f0f8ff;
  }
}
</style>