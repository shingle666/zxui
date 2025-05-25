<template>
  <view class="zx-file">
    <slot name="button">
      <button class="zx-file-button" :disabled="disabled" @click="handleClick">{{ buttonText }}</button>
    </slot>
    <view v-if="showFileList && fileList.length > 0" class="zx-file-list">
      <view v-for="(file, index) in fileList" :key="index" class="zx-file-item">
        <view class="zx-file-info">
          <text class="zx-file-name">{{ file.name || '未命名文件' }}</text>
          <text v-if="file.size" class="zx-file-size">{{ formatSize(file.size) }}</text>
        </view>
        <view class="zx-file-actions">
          <text v-if="file.path" class="zx-file-action" @click="openFile(file)">查看</text>
          <text class="zx-file-action zx-file-delete" @click="removeFile(index)">删除</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  // 按钮文本
  buttonText: {
    type: String,
    default: '选择文件'
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示文件列表
  showFileList: {
    type: Boolean,
    default: true
  },
  // 是否可多选
  multiple: {
    type: Boolean,
    default: false
  },
  // 接受的文件类型
  accept: {
    type: String,
    default: '*'
  },
  // 文件大小限制（字节）
  maxSize: {
    type: Number,
    default: 0 // 0表示不限制
  },
  // 文件数量限制
  limit: {
    type: Number,
    default: 0 // 0表示不限制
  },
  // 是否自动保存文件
  autoSave: {
    type: Boolean,
    default: false
  },
  // 选择文件来源
  sourceType: {
    type: Array,
    default: () => ['album', 'camera']
  },
  // 文件类型，image/video/all
  fileType: {
    type: String,
    default: 'all'
  }
});

const emit = defineEmits([
  'change', 
  'select', 
  'success', 
  'fail', 
  'delete', 
  'exceed-size', 
  'exceed-limit',
  'open'
]);

const fileList = ref([]);

// 格式化文件大小
const formatSize = (size) => {
  if (size < 1024) {
    return size + 'B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }
};

// 检查平台
const isH5 = computed(() => {
  // #ifdef H5
  return true;
  // #endif
  return false;
});

const isApp = computed(() => {
  // #ifdef APP-PLUS
  return true;
  // #endif
  return false;
});

const isMp = computed(() => {
  // #ifdef MP
  return true;
  // #endif
  return false;
});

// 选择文件方法
const chooseFile = () => {
  // 根据fileType选择不同的选择方法
  if (props.fileType === 'image') {
    chooseImage();
  } else if (props.fileType === 'video') {
    chooseVideo();
  } else {
    // 在APP和H5平台可以选择任意文件类型
    if (isH5.value || isApp.value) {
      chooseLocalFile();
    } else {
      // 小程序平台默认使用选择图片
      chooseImage();
    }
  }
};

// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: props.multiple ? (props.limit > 0 ? props.limit : 9) : 1,
    sourceType: props.sourceType,
    success: (res) => {
      handleChooseSuccess(res.tempFilePaths, res.tempFiles);
    },
    fail: (err) => {
      emit('fail', err);
    }
  });
};

// 选择视频
const chooseVideo = () => {
  uni.chooseVideo({
    sourceType: props.sourceType,
    success: (res) => {
      const tempFile = {
        path: res.tempFilePath,
        size: res.size,
        name: res.name || '视频文件',
        duration: res.duration,
        width: res.width,
        height: res.height
      };
      handleChooseSuccess([res.tempFilePath], [tempFile]);
    },
    fail: (err) => {
      emit('fail', err);
    }
  });
};

// 选择本地文件（仅App和H5平台支持）
const chooseLocalFile = () => {
  // #ifdef APP-PLUS || H5
  uni.chooseFile({
    count: props.multiple ? (props.limit > 0 ? props.limit : 99) : 1,
    extension: props.accept.split(','),
    success: (res) => {
      handleChooseSuccess(res.tempFilePaths, res.tempFiles);
    },
    fail: (err) => {
      emit('fail', err);
    }
  });
  // #endif
  
  // #ifdef MP
  // 小程序平台不支持chooseFile，回退到chooseImage
  uni.showToast({
    title: '当前平台不支持选择此类型文件',
    icon: 'none'
  });
  // #endif
};

// 处理选择文件成功
const handleChooseSuccess = (paths, files) => {
  // 检查文件数量限制
  if (props.limit > 0 && fileList.value.length + paths.length > props.limit) {
    emit('exceed-limit', { limit: props.limit, files });
    uni.showToast({
      title: `最多只能选择${props.limit}个文件`,
      icon: 'none'
    });
    return;
  }

  // 检查文件大小限制
  if (props.maxSize > 0) {
    const oversizeFiles = files.filter(file => file.size > props.maxSize);
    if (oversizeFiles.length > 0) {
      emit('exceed-size', { maxSize: props.maxSize, files: oversizeFiles });
      uni.showToast({
        title: `文件大小不能超过${formatSize(props.maxSize)}`,
        icon: 'none'
      });
      return;
    }
  }

  // 处理文件
  const newFiles = files.map((file, index) => {
    return {
      name: file.name || `文件${fileList.value.length + index + 1}`,
      path: paths[index],
      size: file.size,
      type: file.type || getFileType(paths[index]),
      tempPath: paths[index],
      lastModified: file.lastModified || new Date().getTime()
    };
  });

  // 是否自动保存文件（仅支持App和小程序）
  if (props.autoSave && !isH5.value) {
    saveFiles(newFiles);
  } else {
    // 直接添加到文件列表
    if (props.multiple) {
      fileList.value = [...fileList.value, ...newFiles];
    } else {
      fileList.value = newFiles;
    }
    
    emit('select', newFiles);
    emit('change', fileList.value);
    emit('success', { tempFilePaths: paths, tempFiles: files });
  }
};

// 根据文件路径获取文件类型
const getFileType = (path) => {
  if (!path) return '';
  const ext = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
  
  // 图片类型
  if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(ext)) {
    return 'image';
  }
  // 视频类型
  if (['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'm4v'].includes(ext)) {
    return 'video';
  }
  // 文档类型
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt'].includes(ext)) {
    return 'document';
  }
  // 音频类型
  if (['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(ext)) {
    return 'audio';
  }
  
  return ext;
};

// 保存文件（仅支持App和小程序）
const saveFiles = (files) => {
  // #ifndef H5
  const tasks = files.map(file => {
    return new Promise((resolve, reject) => {
      uni.saveFile({
        tempFilePath: file.tempPath,
        success: (res) => {
          resolve({
            ...file,
            path: res.savedFilePath,
            savedPath: res.savedFilePath
          });
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  });

  Promise.allSettled(tasks).then(results => {
    const savedFiles = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
    
    // 更新文件列表
    if (props.multiple) {
      fileList.value = [...fileList.value, ...savedFiles];
    } else {
      fileList.value = savedFiles;
    }
    
    emit('change', fileList.value);
    emit('success', { files: savedFiles });
  });
  // #endif
  
  // #ifdef H5
  uni.showToast({
    title: 'H5平台不支持保存文件',
    icon: 'none'
  });
  // #endif
};

// 打开文件
const openFile = (file) => {
  if (!file || !file.path) return;
  
  const filePath = file.path || file.tempPath;
  const fileType = file.type || getFileType(filePath);
  
  if (['document', 'pdf'].includes(fileType) || filePath.endsWith('.pdf')) {
    // 打开文档类型
    // #ifndef H5
    uni.openDocument({
      filePath,
      success: () => {
        emit('open', file);
      },
      fail: (err) => {
        uni.showToast({
          title: '打开文件失败',
          icon: 'none'
        });
        emit('fail', err);
      }
    });
    // #endif
    
    // #ifdef H5
    window.open(filePath);
    // #endif
  } else if (fileType === 'image') {
    // 预览图片
    uni.previewImage({
      urls: [filePath],
      current: filePath
    });
  } else if (fileType === 'video') {
    // 打开视频
    // 这里可以根据实际需求进行处理
    uni.navigateTo({
      url: `/pages/video/index?src=${encodeURIComponent(filePath)}`
    });
  } else {
    // 其他类型文件
    // #ifndef H5
    uni.openDocument({
      filePath,
      success: () => {
        emit('open', file);
      },
      fail: (err) => {
        uni.showToast({
          title: '打开文件失败',
          icon: 'none'
        });
        emit('fail', err);
      }
    });
    // #endif
    
    // #ifdef H5
    window.open(filePath);
    // #endif
  }
};

// 获取已保存的文件列表
const getSavedFileList = () => {
  // #ifndef H5
  uni.getSavedFileList({
    success: (res) => {
      const savedFiles = res.fileList.map(file => ({
        name: file.filePath.substring(file.filePath.lastIndexOf('/') + 1),
        path: file.filePath,
        size: file.size,
        type: getFileType(file.filePath),
        createTime: file.createTime
      }));
      
      fileList.value = savedFiles;
      emit('change', fileList.value);
    },
    fail: (err) => {
      emit('fail', err);
    }
  });
  // #endif
  
  // #ifdef H5
  uni.showToast({
    title: 'H5平台不支持此操作',
    icon: 'none'
  });
  // #endif
};

// 删除文件
const removeFile = (index) => {
  const file = fileList.value[index];
  
  if (file.savedPath || file.path && !file.path.includes('tmp')) {
    // 删除已保存的文件
    // #ifndef H5
    uni.removeSavedFile({
      filePath: file.savedPath || file.path,
      success: () => {
        fileList.value.splice(index, 1);
        emit('delete', { index, file });
        emit('change', fileList.value);
      },
      fail: (err) => {
        // 即使删除文件失败，也从列表中移除
        fileList.value.splice(index, 1);
        emit('delete', { index, file, error: err });
        emit('change', fileList.value);
      }
    });
    // #endif
  } else {
    // 直接从列表中移除临时文件
    fileList.value.splice(index, 1);
    emit('delete', { index, file });
    emit('change', fileList.value);
  }
};

// 清空文件列表
const clearFiles = () => {
  fileList.value = [];
  emit('change', fileList.value);
};

// 获取文件信息
const getFileInfo = (filePath) => {
  return new Promise((resolve, reject) => {
    uni.getFileInfo({
      filePath,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

// 对外暴露的方法
defineExpose({
  fileList,
  chooseFile,
  openFile,
  removeFile,
  clearFiles,
  getSavedFileList,
  getFileInfo,
  saveFiles
});

// 按钮点击事件
const handleClick = () => {
  if (props.disabled) return;
  chooseFile();
};
</script>

<style>
.zx-file {
  display: flex;
  flex-direction: column;
}

.zx-file-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  font-size: 14px;
  height: 32px;
  line-height: 1;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #ffffff;
  color: #606266;
  cursor: pointer;
}

.zx-file-list {
  margin-top: 10px;
}

.zx-file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.zx-file-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.zx-file-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.zx-file-size {
  font-size: 12px;
  color: #999;
}

.zx-file-actions {
  display: flex;
  align-items: center;
}

.zx-file-action {
  font-size: 12px;
  color: #409eff;
  margin-left: 10px;
  cursor: pointer;
}

.zx-file-delete {
  color: #f56c6c;
}
</style>
