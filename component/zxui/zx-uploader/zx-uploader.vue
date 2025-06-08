<template>
  <view class="zx-uploader">
    <view class="zx-uploader__wrapper">
      <!-- 预览列表 -->
      <view v-for="(item, index) in innerFileList" :key="item.id || item.url || index" class="zx-uploader__preview"
        :style="previewStyle" @click="onClickPreview(item, index)">
        <!-- 图片预览 -->
        <image v-if="item.isImage || (item.type && item.type.indexOf('image') === 0) || isImageUrl(item.url)"
          :src="item.url || item.tempFilePath" :mode="imageFit" class="zx-uploader__preview-image" :style="previewStyle"
          @error="(e) => onPreviewImageError(item, index, e)" />
        <!-- 文件预览 -->
        <view v-else class="zx-uploader__file" :style="previewStyle">
          <zx-icon name="file-text-o" class="zx-uploader__file-icon" />
          <text class="zx-uploader__file-name van-ellipsis">{{ item.name || getFileName(item.url) }}</text>
        </view>

        <!-- 上传状态 -->
        <view v-if="item.status && item.status !== 'done'" class="zx-uploader__mask">
          <zx-icon v-if="item.status === 'failed'" name="close" class="zx-uploader__mask-icon" />
          <zx-loading v-else-if="item.status === 'uploading'" class="zx-uploader__loading-icon" />
          <text v-if="item.message" class="zx-uploader__mask-message">{{ item.message }}</text>
        </view>

        <!-- 删除按钮 -->
        <view v-if="deletable && !disabled && !readonly && item.status !== 'uploading'"
          class="zx-uploader__preview-delete" @click.stop="deleteFile(item, index)">
          <slot name="preview-delete" :file="item" :index="index">
            <view class="zx-uploader__preview-delete--shadow">
              <zx-icon name="close" class="zx-uploader__preview-delete-icon" />
            </view>
          </slot>
        </view>

        <!-- 覆盖内容 -->
        <slot name="preview-cover" :file="item" :index="index"></slot>
      </view>

      <!-- 上传按钮 -->
      <template v-if="showUploadButton">
        <slot>
          <view class="zx-uploader__upload" :style="previewStyle" :class="{ 'zx-uploader__upload--disabled': disabled }"
            @click="onClickUpload">
            <zx-icon :name="uploadIcon" class="zx-uploader__upload-icon" />
            <text v-if="uploadText" class="zx-uploader__upload-text">{{ uploadText }}</text>
          </view>
        </slot>
      </template>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';
import zxLoading from '@tanzhenxing/zx-loading/zx-loading.vue';
import { isImageUrl, isPlainObject } from '@/utils/utils.js'; // 假设有这个工具函数

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: 'image', // 'image', 'video', 'media', 'all', or specific mime types
  },
  // #ifdef H5
  capture: {
    type: [String, Array],
    default: null, // 'user', 'environment'
  },
  // #endif
  // #ifndef H5
  capture: {
    type: [String, Array],
    default: () => ['album', 'camera'],
  },
  // #endif
  multiple: {
    type: Boolean,
    default: false,
  },
  maxCount: {
    type: [Number, String],
    default: Infinity,
  },
  maxSize: {
    type: [Number, String],
    default: Infinity, // bytes
  },
  deletable: {
    type: Boolean,
    default: true,
  },
  showUpload: {
    type: Boolean,
    default: true,
  },
  previewSize: {
    type: [Number, String],
    default: '160rpx',
  },
  previewImage: {
    type: Boolean,
    default: true, // uni-app 中主要通过 accept 控制，此属性可辅助判断
  },
  imageFit: {
    type: String,
    default: 'aspectFill',
  },
  uploadText: {
    type: String,
    default: '',
  },
  uploadIcon: {
    type: String,
    default: 'photograph',
  },
  name: {
    type: [String, Number],
    default: '',
  },
  beforeRead: Function,
  beforeDelete: Function,
});

const emit = defineEmits([
  'update:modelValue',
  'after-read',
  'delete',
  'oversize',
  'click-preview',
  'click-upload',
  'error',
]);

const instance = getCurrentInstance();

// 将 modelValue 转换为内部状态，方便添加临时属性如 id
const innerFileList = ref([]);

let uniqueIdCounter = 0;
const getUniqueId = () => `zxupload_${Date.now()}_${uniqueIdCounter++}`;

const formatFileList = (list) => {
  return list.map(item => {
    if (!isPlainObject(item)) {
      item = { url: item }; // 简单字符串url转为对象
    }
    return {
      ...item,
      id: item.id || getUniqueId(),
      // 确保 isImage 属性存在，便于模板判断
      isImage: typeof item.isImage === 'boolean' ? item.isImage : (item.type ? item.type.indexOf('image') === 0 : isImageUrl(item.url)),
      // 确保 status 和 message 存在
      status: item.status || '',
      message: item.message || '',
    };
  });
};

watch(
  () => props.modelValue,
  (newList) => {
    // 避免不必要的更新，只有在实际内容变化时才更新
    // 简单比较长度和url，更复杂的比较可能需要深比较或比较id
    if (newList.length !== innerFileList.value.length || newList.some((newItem, i) => newItem.url !== (innerFileList.value[i] || {}).url)) {
      innerFileList.value = formatFileList(newList);
    }
  },
  { immediate: true, deep: true }
);

const previewStyle = computed(() => {
  const size = props.previewSize;
  if (typeof size === 'number' || (typeof size === 'string' && /^[0-9]+$/.test(size))) {
    return {
      width: uni.upx2px(parseInt(size)) + 'px',
      height: uni.upx2px(parseInt(size)) + 'px',
    };
  }
  return {
    width: size,
    height: size,
  };
});

const showUploadButton = computed(() => {
  return props.showUpload && !props.readonly && innerFileList.value.length < Number(props.maxCount);
});

const getDetail = (index) => ({
  name: props.name,
  index,
});

const onPreviewImageError = (item, index, event) => {
  emit('error', { type: 'preview', error: event, file: item, ...getDetail(index) });
}

const getFileName = (url) => {
  if (!url) return '';
  const segments = url.split('/');
  return segments[segments.length - 1];
}

// --- 选择文件逻辑 ---
const chooseFile = () => {
  if (props.disabled || props.readonly) return;

  const count = props.multiple ? (Number(props.maxCount) - innerFileList.value.length) : 1;
  if (count <= 0) return;

  let chooseFilePromise;

  // #ifdef H5
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = props.multiple;
  let acceptValue = '';
  if (props.accept === 'image') acceptValue = 'image/*';
  else if (props.accept === 'video') acceptValue = 'video/*';
  else if (props.accept === 'media') acceptValue = 'image/*,video/*';
  else if (props.accept !== 'all') acceptValue = props.accept;
  input.accept = acceptValue;
  if (props.capture && typeof props.capture === 'string') {
    input.capture = props.capture;
  }
  input.style.display = 'none';
  document.body.appendChild(input);
  chooseFilePromise = new Promise((resolve, reject) => {
    input.onchange = (event) => {
      const files = Array.from(event.target.files);
      document.body.removeChild(input);
      if (files.length > 0) {
        resolve({ tempFiles: files, tempFilePaths: files.map(f => URL.createObjectURL(f)) });
      } else {
        reject({ errMsg: 'chooseFile:fail cancel' });
      }
    };
    input.oncancel = () => { // H5 input 没有标准 oncancel，但可以模拟
      document.body.removeChild(input);
      reject({ errMsg: 'chooseFile:fail cancel' });
    }
    input.click();
  });
  // #endif

  // #ifndef H5
  const mediaTypeMap = {
    image: 'image',
    video: 'video',
    media: ['image', 'video'], // uni.chooseMedia 支持
    all: ['image', 'video', 'file'] // chooseFile 不支持混合，需要分别调用或用 chooseMedia
  };
  let mediaType = mediaTypeMap[props.accept] || ['image']; // 默认图片
  if (props.accept === 'all') {
    // uni.chooseFile 对 sourceType 的支持有限，优先使用 chooseMedia
    // 如果需要严格的 'all' (包括任意文件)，可能需要条件编译或特定API
    // 这里简化为优先图片和视频
    if (uni.chooseMedia) {
      mediaType = ['image', 'video'];
    } else {
      mediaType = ['image']; // 降级
    }
  }

  if (uni.chooseMedia && (props.accept === 'media' || props.accept === 'video' || (props.accept === 'image' && props.multiple))) {
    // chooseMedia 更灵活，支持混合选择和更细致的控制
    chooseFilePromise = uni.chooseMedia({
      count: Math.min(count, 9), // 小程序chooseMedia图片和视频最多9个
      mediaType: Array.isArray(mediaType) ? mediaType : [mediaType],
      sourceType: props.capture,
      sizeType: ['original', 'compressed'], // 允许用户选择
      camera: props.capture.includes('camera') ? 'back' : undefined,
    });
  } else if (props.accept === 'image') {
    chooseFilePromise = uni.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'],
      sourceType: props.capture,
    });
  } else if (props.accept === 'video' && uni.chooseVideo) {
    chooseFilePromise = uni.chooseVideo({
      count: count, // chooseVideo 通常只选一个
      sourceType: props.capture,
      compressed: true, // 建议压缩
      maxDuration: 60,
    });
  } else {
    // 对于其他文件类型或不支持 chooseMedia 的情况，尝试 chooseFile (仅 App 和 H5 支持 filePath)
    // #ifdef APP-PLUS || H5
    if (uni.chooseFile) {
      chooseFilePromise = uni.chooseFile({
        count: count,
        type: props.accept === 'all' ? 'all' : props.accept, // 'all', 'image', 'video', 'audio', 'file'
        // extension: [] // 可指定后缀名
      });
    } else {
      chooseFilePromise = Promise.reject({ errMsg: 'API uni.chooseFile not supported or accept type not image/video' });
    }
    // #endif
    // #ifdef MP
    // 小程序 chooseFile 仅支持聊天记录，不适用于此场景
    chooseFilePromise = Promise.reject({ errMsg: 'File type not supported in Mini Program for general selection, try image or video.' });
    // #endif
  }
  // #endif

  chooseFilePromise
    .then(async (res) => {
      let filesToProcess = [];
      // #ifdef H5
      // res.tempFiles 是 File 对象数组
      filesToProcess = res.tempFiles.map((file, i) => ({
        file: file,
        url: res.tempFilePaths[i], // Blob URL
        name: file.name,
        type: file.type,
        size: file.size,
        isImage: file.type.indexOf('image') === 0,
        tempFilePath: res.tempFilePaths[i] // H5 也用 tempFilePath 统一
      }));
      // #endif
      // #ifndef H5
      // res.tempFiles 是包含 tempFilePath, size, (name, type - H5/App) 的对象数组
      // res.tempFilePaths 仅在 chooseImage 时是字符串数组
      let tempFiles = res.tempFiles || [];
      if (typeof res.tempFilePaths === 'string' && !res.tempFiles) { // chooseVideo 返回 tempFilePath
        tempFiles = [{ tempFilePath: res.tempFilePath, size: res.size, name: res.name, type: res.type }];
      } else if (Array.isArray(res.tempFilePaths) && !res.tempFiles) { // chooseImage 返回 tempFilePaths
        tempFiles = res.tempFilePaths.map(path => ({ tempFilePath: path }));
        // chooseImage 不直接返回size, name, type, 需要通过 uni.getFileInfo 获取
        // 为了简化，这里暂时不获取，可在 afterRead 后由用户获取
      }

      filesToProcess = tempFiles.map(file => ({
        file: file, // 保留原始 file 对象
        url: file.tempFilePath, // 预览用本地路径
        tempFilePath: file.tempFilePath,
        name: file.name || getFileName(file.tempFilePath),
        type: file.type || (file.tempFilePath && file.tempFilePath.indexOf('.mp4') > -1 ? 'video/mp4' : ''), // 简单推断
        size: file.size,
        isImage: file.type ? file.type.indexOf('image') === 0 : (file.tempFilePath ? isImageUrl(file.tempFilePath) : false),
      }));
      // #endif

      // 文件大小和数量检查
      let oversizedFiles = [];
      let validFiles = [];

      for (const file of filesToProcess) {
        if (file.size > Number(props.maxSize)) {
          oversizedFiles.push(file);
        } else {
          validFiles.push(file);
        }
      }

      if (oversizedFiles.length > 0) {
        emit('oversize', { file: props.multiple ? oversizedFiles : oversizedFiles[0], ...getDetail() });
        if (validFiles.length === 0) return; // 如果所有文件都超大，则不继续
      }

      // beforeRead 钩子
      if (props.beforeRead) {
        const result = await props.beforeRead(props.multiple ? validFiles : validFiles[0], getDetail());
        if (result === false) {
          return;
        } else if (result && typeof result === 'object') {
          // 允许 beforeRead 修改文件对象或列表
          validFiles = Array.isArray(result) ? result : [result];
        }
      }

      // 更新 v-model
      const newFileEntries = formatFileList(validFiles.map(f => ({ ...f, status: 'uploading', message: '等待上传' })));
      const updatedList = [...innerFileList.value, ...newFileEntries];
      emit('update:modelValue', updatedList.map(f => ({ ...f }))); // 传回纯净数据

      emit('after-read', { file: props.multiple ? newFileEntries : newFileEntries[0], ...getDetail() });
    })
    .catch((err) => {
      if (err.errMsg && err.errMsg.includes('cancel')) {
        // 用户取消选择
      } else {
        emit('error', { type: 'choose', error: err });
      }
    });
};

const onClickUpload = (event) => {
  emit('click-upload', event);
  if (!props.disabled && !props.readonly) {
    chooseFile();
  }
};

const deleteFile = async (file, index) => {
  if (props.disabled || props.readonly) return;

  if (props.beforeDelete) {
    const result = await props.beforeDelete(file, getDetail(index));
    if (result === false) {
      return;
    }
  }

  const newList = innerFileList.value.slice();
  newList.splice(index, 1);
  emit('update:modelValue', newList.map(f => ({ ...f }))); // 传回纯净数据
  emit('delete', { file, ...getDetail(index) });
};

const onClickPreview = (item, index) => {
  emit('click-preview', { file: item, ...getDetail(index) });
  // 可以在这里添加默认的图片预览逻辑，如果需要的话
  // uni.previewImage({ urls: [item.url || item.tempFilePath] })
};

// 暴露方法给父组件
defineExpose({
  chooseFile,
  getInnerFiles: () => innerFileList.value
});

</script>

<style lang="scss" scoped>
// 引入 Vant Uploader 的基础样式，并做 uniapp 适配
// 这里仅作演示，实际项目中可能需要更细致的样式调整

:root,
:host {
  --van-uploader-size: 160rpx; // 对应 props.previewSize 默认值
  --van-uploader-icon-size: 48rpx;
  --van-uploader-icon-color: #dcdee0;
  --van-uploader-text-color: #969799;
  --van-uploader-text-font-size: 24rpx;
  --van-uploader-upload-background: #f7f8fa;
  --van-uploader-upload-active-color: #f2f3f5;
  --van-uploader-delete-color: #fff;
  --van-uploader-delete-icon-size: 28rpx;
  --van-uploader-delete-background: rgba(0, 0, 0, 0.7);
  --van-uploader-file-background: #f7f8fa;
  --van-uploader-file-icon-size: 40rpx;
  --van-uploader-file-icon-color: #646566;
  --van-uploader-file-name-padding: 0 8rpx;
  --van-uploader-file-name-margin-top: 16rpx;
  --van-uploader-file-name-font-size: 24rpx;
  --van-uploader-file-name-text-color: #646566;
  --van-uploader-mask-text-color: #fff;
  --van-uploader-mask-background: rgba(50, 50, 51, 0.88);
  --van-uploader-mask-icon-size: 44rpx;
  --van-uploader-mask-message-font-size: 24rpx;
  --van-uploader-mask-message-line-height: 28rpx;
  --van-uploader-loading-icon-size: 44rpx;
  --van-uploader-loading-icon-color: #fff;
  --van-uploader-disabled-opacity: 0.5;
  --van-uploader-border-radius: 8rpx;
}

.zx-uploader {
  position: relative;
  display: inline-block; // 改为 block 或 flex 可能更适合页面布局

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  &__preview {
    position: relative;
    margin: 0 16rpx 16rpx 0;
    cursor: pointer;
    border-radius: var(--van-uploader-border-radius);
    overflow: hidden; // 确保圆角生效
  }

  &__preview-image {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--van-uploader-file-background);
    box-sizing: border-box;
    padding: 8rpx;
  }

  &__file-icon {
    color: var(--van-uploader-file-icon-color);
    font-size: var(--van-uploader-file-icon-size) !important; // 强制覆盖zx-icon内部可能的大小
    margin-bottom: 8rpx;
  }

  &__file-name {
    box-sizing: border-box;
    width: 100%;
    margin-top: var(--van-uploader-file-name-margin-top);
    padding: var(--van-uploader-file-name-padding);
    color: var(--van-uploader-file-name-text-color);
    font-size: var(--van-uploader-file-name-font-size);
    text-align: center;
    // van-ellipsis in uni-app
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--van-uploader-mask-text-color);
    background: var(--van-uploader-mask-background);
  }

  &__mask-icon {
    font-size: var(--van-uploader-mask-icon-size) !important;
    color: var(--van-uploader-mask-text-color);
  }

  &__loading-icon {
    // zx-loading 可能需要调整大小和颜色
    // font-size: var(--van-uploader-loading-icon-size);
    // color: var(--van-uploader-loading-icon-color);
  }

  &__mask-message {
    margin-top: 12rpx;
    padding: 0 8rpx;
    font-size: var(--van-uploader-mask-message-font-size);
    line-height: var(--van-uploader-mask-message-line-height);
    text-align: center;
  }

  &__preview-delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 36rpx;
    height: 36rpx;
    // background-color: var(--van-uploader-delete-background);
    // border-radius: 0 0 0 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &--shadow {
      background: var(--van-uploader-delete-background);
      border-radius: 0 0 0 var(--van-uploader-border-radius); // 左下角圆角
      width: auto;
      height: auto;
      min-width: 32rpx;
      min-height: 32rpx;
      padding: 4rpx;
    }
  }

  &__preview-delete-icon {
    color: var(--van-uploader-delete-color);
    font-size: var(--van-uploader-delete-icon-size) !important;
    // transform: scale(0.7) translate(10%, -10%); // Vant的微调，uni-app中可能不需要或方式不同
  }

  &__upload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: var(--van-uploader-upload-background);
    border-radius: var(--van-uploader-border-radius);
    margin: 0 16rpx 16rpx 0; // 与preview保持一致

    &:active {
      background-color: var(--van-uploader-upload-active-color);
    }

    &--disabled {
      opacity: var(--van-uploader-disabled-opacity);
      cursor: not-allowed;

      &:active {
        background-color: var(--van-uploader-upload-background);
      }
    }
  }

  &__upload-icon {
    color: var(--van-uploader-icon-color);
    font-size: var(--van-uploader-icon-size) !important;
  }

  &__upload-text {
    margin-top: 16rpx;
    color: var(--van-uploader-text-color);
    font-size: var(--van-uploader-text-font-size);
  }
}

// 辅助的 van-ellipsis (如果项目中没有全局定义)
.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>