<template>
  <view class="container">
    <view class="header">
      <text class="title">文件上传案例</text>
      <text class="desc">使用 zx-file 组件实现文件上传功能</text>
    </view>

    <view class="upload-area">
      <zx-file 
        ref="fileUploader"
        buttonText="选择文件"
        :multiple="true"
        :limit="5"
        :maxSize="10 * 1024 * 1024"
        @select="onFileSelect"
        @change="onFileChange"
        @exceed-size="onExceedSize"
        @exceed-limit="onExceedLimit"
      >
        <template #button>
          <view class="upload-button">
            <text class="upload-icon">+</text>
            <text class="upload-text">点击选择文件</text>
            <text class="upload-desc">支持各种类型文件，单个文件不超过10MB</text>
          </view>
        </template>
      </zx-file>
    </view>

    <view class="upload-list" v-if="fileList.length > 0">
      <view class="upload-list-header">
        <text class="upload-list-title">上传列表</text>
        <text class="upload-list-clear" @click="clearFiles">清空</text>
      </view>
      
      <view class="upload-item" v-for="(file, index) in fileList" :key="index">
        <view class="upload-item-info">
          <view class="upload-item-icon" :class="getFileIconClass(file.type)">
            <text class="icon-text">{{ getFileIconText(file.type) }}</text>
          </view>
          <view class="upload-item-detail">
            <text class="upload-item-name">{{ file.name }}</text>
            <text class="upload-item-size">{{ formatSize(file.size) }}</text>
          </view>
        </view>
        
        <view class="upload-item-status">
          <view v-if="file.status === 'ready'" class="upload-item-actions">
            <text class="upload-item-action" @click="uploadFile(file, index)">上传</text>
            <text class="upload-item-action upload-item-delete" @click="removeFile(index)">删除</text>
          </view>
          <view v-else-if="file.status === 'uploading'" class="upload-item-progress">
            <progress :percent="file.progress || 0" active stroke-width="3" />
            <text class="progress-text">{{ file.progress || 0 }}%</text>
          </view>
          <view v-else-if="file.status === 'success'" class="upload-item-actions">
            <text class="upload-item-action upload-item-success">已上传</text>
            <text class="upload-item-action" @click="openFile(file)">查看</text>
          </view>
          <view v-else-if="file.status === 'error'" class="upload-item-actions">
            <text class="upload-item-action upload-item-error">上传失败</text>
            <text class="upload-item-action" @click="uploadFile(file, index)">重试</text>
          </view>
        </view>
      </view>

      <view class="upload-actions">
        <button class="upload-all-btn" @click="uploadAllFiles" :disabled="!hasReadyFiles">上传全部</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import ZxFile from '@/components/zx-file/zx-file.vue';

const fileUploader = ref(null);
const fileList = ref([]);

// 检查是否有待上传的文件
const hasReadyFiles = computed(() => {
  return fileList.value.some(file => file.status === 'ready');
});

// 监听文件选择事件
const onFileSelect = (files) => {
  console.log('选择的文件:', files);
};

// 监听文件变化事件
const onFileChange = (files) => {
  // 为新添加的文件设置状态
  const updatedFiles = files.map(file => {
    // 如果文件已经有状态，保持原状态
    if (file.status) return file;
    
    // 否则设置为准备上传状态
    return {
      ...file,
      status: 'ready', // ready, uploading, success, error
      progress: 0
    };
  });
  
  fileList.value = updatedFiles;
};

// 监听文件大小超出限制事件
const onExceedSize = (data) => {
  uni.showToast({
    title: `文件大小不能超过${formatSize(data.maxSize)}`,
    icon: 'none'
  });
};

// 监听文件数量超出限制事件
const onExceedLimit = (data) => {
  uni.showToast({
    title: `最多只能选择${data.limit}个文件`,
    icon: 'none'
  });
};

// 清空文件列表
const clearFiles = () => {
  fileList.value = [];
  fileUploader.value.clearFiles();
};

// 移除文件
const removeFile = (index) => {
  fileUploader.value.removeFile(index);
};

// 打开文件
const openFile = (file) => {
  fileUploader.value.openFile(file);
};

// 上传单个文件
const uploadFile = (file, index) => {
  if (!file || file.status === 'uploading' || file.status === 'success') return;
  
  // 更新文件状态为上传中
  fileList.value[index] = {
    ...file,
    status: 'uploading',
    progress: 0
  };
  
  // 模拟上传进度
  const timer = setInterval(() => {
    const currentFile = fileList.value[index];
    if (!currentFile) {
      clearInterval(timer);
      return;
    }
    
    if (currentFile.progress >= 100) {
      clearInterval(timer);
      
      // 随机模拟成功或失败
      const isSuccess = Math.random() > 0.2; // 80%概率成功
      
      fileList.value[index] = {
        ...currentFile,
        status: isSuccess ? 'success' : 'error',
        progress: isSuccess ? 100 : currentFile.progress
      };
      
      // 显示提示
      uni.showToast({
        title: isSuccess ? '上传成功' : '上传失败',
        icon: isSuccess ? 'success' : 'none'
      });
      
      return;
    }
    
    // 更新进度
    const increment = Math.floor(Math.random() * 10) + 1;
    const newProgress = Math.min(currentFile.progress + increment, 100);
    
    fileList.value[index] = {
      ...currentFile,
      progress: newProgress
    };
  }, 300);
  
  // 实际项目中，使用以下代码替代模拟上传：
  /*
  uni.uploadFile({
    url: 'https://your-upload-api.com/upload',
    filePath: file.path,
    name: 'file',
    formData: {
      // 额外的表单数据
      fileName: file.name,
      fileType: file.type
    },
    success: (res) => {
      // 解析服务器返回数据
      const data = JSON.parse(res.data);
      if (res.statusCode === 200 && data.success) {
        // 上传成功
        fileList.value[index] = {
          ...fileList.value[index],
          status: 'success',
          progress: 100,
          url: data.url // 服务器返回的文件URL
        };
      } else {
        // 上传失败
        fileList.value[index] = {
          ...fileList.value[index],
          status: 'error',
          error: data.message || '上传失败'
        };
      }
    },
    fail: (err) => {
      // 上传失败
      fileList.value[index] = {
        ...fileList.value[index],
        status: 'error',
        error: err.errMsg || '上传失败'
      };
    },
    complete: () => {
      // 完成上传
    }
  });
  */
};

// 上传所有文件
const uploadAllFiles = () => {
  fileList.value.forEach((file, index) => {
    if (file.status === 'ready') {
      uploadFile(file, index);
    }
  });
};

// 获取文件图标样式
const getFileIconClass = (fileType) => {
  if (!fileType) return 'file-other';
  
  if (fileType === 'image') return 'file-image';
  if (fileType === 'video') return 'file-video';
  if (fileType === 'audio') return 'file-audio';
  if (fileType === 'document' || 
      ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt'].includes(fileType)) {
    return 'file-document';
  }
  
  return 'file-other';
};

// 获取文件图标文本
const getFileIconText = (fileType) => {
  if (!fileType) return '?';
  
  if (fileType === 'image') return '图';
  if (fileType === 'video') return '视';
  if (fileType === 'audio') return '音';
  if (fileType === 'document') return '文';
  if (['doc', 'docx'].includes(fileType)) return 'W';
  if (['xls', 'xlsx'].includes(fileType)) return 'X';
  if (['ppt', 'pptx'].includes(fileType)) return 'P';
  if (fileType === 'pdf') return 'PDF';
  if (fileType === 'txt') return 'TXT';
  
  return fileType.substring(0, 1).toUpperCase();
};

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
</script>

<style>
.container {
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.desc {
  font-size: 14px;
  color: #666;
  display: block;
}

.upload-area {
  margin-bottom: 20px;
}

.upload-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  border: 2px dashed #dcdfe6;
  border-radius: 6px;
  background-color: #f8f9fb;
  cursor: pointer;
}

.upload-icon {
  font-size: 28px;
  color: #c0c4cc;
  margin-bottom: 10px;
}

.upload-text {
  font-size: 16px;
  color: #606266;
  margin-bottom: 6px;
}

.upload-desc {
  font-size: 12px;
  color: #909399;
}

.upload-list {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.upload-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #ebeef5;
}

.upload-list-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.upload-list-clear {
  font-size: 12px;
  color: #909399;
  cursor: pointer;
}

.upload-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #ebeef5;
}

.upload-item:last-child {
  border-bottom: none;
}

.upload-item-info {
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
}

.upload-item-icon {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #fff;
  font-size: 14px;
}

.file-image {
  background-color: #67c23a;
}

.file-video {
  background-color: #f56c6c;
}

.file-audio {
  background-color: #e6a23c;
}

.file-document {
  background-color: #409eff;
}

.file-other {
  background-color: #909399;
}

.upload-item-detail {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.upload-item-name {
  font-size: 14px;
  color: #303133;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.upload-item-size {
  font-size: 12px;
  color: #909399;
}

.upload-item-status {
  width: 100px;
}

.upload-item-actions {
  display: flex;
  justify-content: flex-end;
}

.upload-item-action {
  font-size: 12px;
  color: #409eff;
  margin-left: 10px;
  cursor: pointer;
}

.upload-item-delete {
  color: #f56c6c;
}

.upload-item-success {
  color: #67c23a;
}

.upload-item-error {
  color: #f56c6c;
}

.upload-item-progress {
  width: 100%;
}

.progress-text {
  font-size: 12px;
  color: #909399;
  text-align: right;
  margin-top: 4px;
}

.upload-actions {
  display: flex;
  justify-content: center;
  padding: 15px;
  border-top: 1px solid #ebeef5;
}

.upload-all-btn {
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  border-radius: 4px;
  border: none;
}

.upload-all-btn[disabled] {
  background-color: #a0cfff;
  cursor: not-allowed;
}
</style> 