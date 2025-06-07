<template>
  <view :class="itemClass" :style="itemStyle">
    <!-- 文件图标或预览图 -->
    <view class="zx-attachment-item__icon">
      <image 
        v-if="isImage && previewUrl"
        :src="previewUrl"
        :class="imageClass"
        :style="imageStyle"
        mode="aspectFill"
        @click="handlePreview"
      />
      <view v-else :class="fileIconClass" :style="fileIconStyle">
        <text class="zx-attachment-item__icon-text">{{ fileExtension }}</text>
      </view>
    </view>
    
    <!-- 文件信息 -->
    <view class="zx-attachment-item__content">
      <view class="zx-attachment-item__name" @click="handlePreview">
        {{ fileName }}
      </view>
      <view v-if="fileSize" class="zx-attachment-item__size">
        {{ formattedSize }}
      </view>
      
      <!-- 上传进度 -->
      <view v-if="showProgress" class="zx-attachment-item__progress">
        <view class="zx-attachment-item__progress-bar">
          <view 
            class="zx-attachment-item__progress-fill"
            :style="{ width: `${percent}%` }"
          ></view>
        </view>
        <text class="zx-attachment-item__progress-text">{{ percent }}%</text>
      </view>
      
      <!-- 状态信息 -->
      <view v-if="statusText" class="zx-attachment-item__status">
        <text :class="statusClass">{{ statusText }}</text>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view v-if="!disabled" class="zx-attachment-item__actions">
      <view 
        class="zx-attachment-item__remove"
        @click.stop="handleRemove"
      >
        <text class="zx-attachment-item__remove-icon">×</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

// 定义组件名称
defineOptions({
  name: 'ZxAttachmentItem'
});

// 定义 Props
const props = defineProps({
  // 附件信息
  item: {
    type: Object,
    required: true
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 图片属性配置
  imageProps: {
    type: Object,
    default: () => ({})
  }
});

// 定义 Emits
const emit = defineEmits([
  'remove',
  'preview'
]);

// 文件类型判断
const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'];
const isImageFileType = (type) => type && type.indexOf('image/') === 0;

// 计算属性
const fileName = computed(() => {
  return props.item.name || '未知文件';
});

const fileSize = computed(() => {
  return props.item.size;
});

const fileExtension = computed(() => {
  const name = fileName.value;
  const lastDotIndex = name.lastIndexOf('.');
  if (lastDotIndex === -1) return 'FILE';
  const ext = name.substring(lastDotIndex + 1).toUpperCase();
  return ext.length > 4 ? ext.substring(0, 4) : ext;
});

const isImage = computed(() => {
  const name = fileName.value;
  const ext = name.split('.').pop()?.toLowerCase();
  return ext && IMG_EXTS.includes(ext) || isImageFileType(props.item.type);
});

const previewUrl = computed(() => {
  return props.item.url || props.item.thumbUrl || props.item.preview;
});

const percent = computed(() => {
  return props.item.percent || 0;
});

const status = computed(() => {
  return props.item.status || 'done';
});

const showProgress = computed(() => {
  return status.value === 'uploading' && percent.value < 100;
});

const statusText = computed(() => {
  switch (status.value) {
    case 'error':
      return '上传失败';
    case 'uploading':
      return percent.value < 100 ? '上传中...' : '上传完成';
    case 'done':
      return '';
    default:
      return '';
  }
});

const formattedSize = computed(() => {
  if (!fileSize.value) return '';
  
  const size = fileSize.value;
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let retSize = size;
  
  while (retSize >= 1024 && unitIndex < units.length - 1) {
    retSize /= 1024;
    unitIndex++;
  }
  
  return `${retSize.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
});

// 样式类名
const itemClass = computed(() => {
  const classes = ['zx-attachment-item'];
  
  if (props.disabled) {
    classes.push('zx-attachment-item--disabled');
  }
  
  if (status.value === 'error') {
    classes.push('zx-attachment-item--error');
  }
  
  return classes.join(' ');
});

const itemStyle = computed(() => {
  return {};
});

const imageClass = computed(() => {
  return 'zx-attachment-item__image';
});

const imageStyle = computed(() => {
  return props.imageProps.style || {};
});

const fileIconClass = computed(() => {
  const classes = ['zx-attachment-item__file-icon'];
  
  // 根据文件类型添加不同的样式
  const ext = fileExtension.value.toLowerCase();
  if (['pdf'].includes(ext)) {
    classes.push('zx-attachment-item__file-icon--pdf');
  } else if (['doc', 'docx'].includes(ext)) {
    classes.push('zx-attachment-item__file-icon--word');
  } else if (['xls', 'xlsx'].includes(ext)) {
    classes.push('zx-attachment-item__file-icon--excel');
  } else if (['ppt', 'pptx'].includes(ext)) {
    classes.push('zx-attachment-item__file-icon--ppt');
  } else if (['zip', 'rar', '7z'].includes(ext)) {
    classes.push('zx-attachment-item__file-icon--archive');
  } else {
    classes.push('zx-attachment-item__file-icon--default');
  }
  
  return classes.join(' ');
});

const fileIconStyle = computed(() => {
  return {};
});

const statusClass = computed(() => {
  const classes = ['zx-attachment-item__status-text'];
  
  if (status.value === 'error') {
    classes.push('zx-attachment-item__status-text--error');
  } else if (status.value === 'uploading') {
    classes.push('zx-attachment-item__status-text--uploading');
  }
  
  return classes.join(' ');
});

// 方法
const handleRemove = () => {
  if (props.disabled) return;
  emit('remove', props.item);
};

const handlePreview = () => {
  emit('preview', props.item);
};
</script>

<style lang="scss" scoped>
.zx-attachment-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background-color: #fff;
  transition: all 0.3s;
  
  &:hover {
    border-color: #1677ff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      border-color: #e8e8e8;
      box-shadow: none;
    }
  }
  
  &--error {
    border-color: #ff4d4f;
    background-color: #fff2f0;
  }
}

.zx-attachment-item__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 4px;
  overflow: hidden;
}

.zx-attachment-item__image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
}

.zx-attachment-item__file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  
  &--pdf {
    background-color: #ff4d4f;
    color: #fff;
  }
  
  &--word {
    background-color: #1677ff;
    color: #fff;
  }
  
  &--excel {
    background-color: #22b35e;
    color: #fff;
  }
  
  &--ppt {
    background-color: #ff6e31;
    color: #fff;
  }
  
  &--archive {
    background-color: #fab714;
    color: #fff;
  }
  
  &--default {
    background-color: #8c8c8c;
    color: #fff;
  }
}

.zx-attachment-item__icon-text {
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
}

.zx-attachment-item__content {
  flex: 1;
  min-width: 0;
}

.zx-attachment-item__name {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  &:hover {
    color: #1677ff;
  }
}

.zx-attachment-item__size {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 2px;
}

.zx-attachment-item__progress {
  display: flex;
  align-items: center;
  margin-top: 4px;
  gap: 8px;
}

.zx-attachment-item__progress-bar {
  flex: 1;
  height: 4px;
  background-color: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
}

.zx-attachment-item__progress-fill {
  height: 100%;
  background-color: #1677ff;
  border-radius: 2px;
  transition: width 0.3s;
}

.zx-attachment-item__progress-text {
  font-size: 12px;
  color: #8c8c8c;
  min-width: 32px;
  text-align: right;
}

.zx-attachment-item__status {
  margin-top: 2px;
}

.zx-attachment-item__status-text {
  font-size: 12px;
  
  &--error {
    color: #ff4d4f;
  }
  
  &--uploading {
    color: #1677ff;
  }
}

.zx-attachment-item__actions {
  flex-shrink: 0;
  margin-left: 8px;
}

.zx-attachment-item__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4f;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #ff7875;
    transform: scale(1.1);
  }
}

.zx-attachment-item__remove-icon {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  line-height: 1;
}
</style>