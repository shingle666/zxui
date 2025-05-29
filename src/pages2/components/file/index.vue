<template>
  <view class="container">
    <view class="header">
      <text class="title">文件操作组件</text>
      <text class="desc">支持多平台文件选择、保存、预览等操作</text>
    </view>

    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-block">
        <zx-file ref="basicFile" @select="onFileSelect" @change="onFileChange"></zx-file>
      </view>
      <view class="result" v-if="selectedFiles.length > 0">
        <text class="result-title">选择的文件：</text>
        <view class="result-content">
          <text class="result-item" v-for="(file, index) in selectedFiles" :key="index">
            {{ file.name }} - {{ formatSize(file.size) }}
          </text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自定义按钮</view>
      <view class="demo-block">
        <zx-file ref="customFile" buttonText="选择文档" fileType="document">
          <template #button>
            <button class="custom-button">
              <text class="button-icon">📄</text>
              <text class="button-text">自定义上传按钮</text>
            </button>
          </template>
        </zx-file>
      </view>
    </view>

    <view class="section">
      <view class="section-title">限制文件类型</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="item-label">图片文件：</text>
          <zx-file ref="imageFile" buttonText="选择图片" fileType="image"></zx-file>
        </view>
        <view class="demo-item">
          <text class="item-label">视频文件：</text>
          <zx-file ref="videoFile" buttonText="选择视频" fileType="video"></zx-file>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">限制文件大小</view>
      <view class="demo-block">
        <zx-file 
          ref="limitSizeFile" 
          buttonText="选择文件(限制2MB)" 
          :maxSize="2 * 1024 * 1024"
          @exceed-size="onExceedSize"
        ></zx-file>
      </view>
    </view>

    <view class="section">
      <view class="section-title">多选文件</view>
      <view class="demo-block">
        <zx-file 
          ref="multipleFile" 
          buttonText="多选文件" 
          :multiple="true"
          :limit="3"
          @exceed-limit="onExceedLimit"
        ></zx-file>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自动保存文件</view>
      <view class="demo-block">
        <zx-file 
          ref="autoSaveFile" 
          buttonText="选择并保存" 
          :autoSave="true"
          @success="onSaveSuccess"
        ></zx-file>
      </view>
    </view>

    <view class="section">
      <view class="section-title">获取已保存的文件</view>
      <view class="demo-block">
        <button class="action-button" @click="getSavedFiles">获取已保存文件</button>
        <view class="saved-files" v-if="savedFiles.length > 0">
          <view class="saved-file" v-for="(file, index) in savedFiles" :key="index">
            <text class="saved-file-name">{{ file.name }}</text>
            <text class="saved-file-size">{{ formatSize(file.size) }}</text>
            <text class="saved-file-action" @click="openSavedFile(file)">查看</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const basicFile = ref(null);
const customFile = ref(null);
const imageFile = ref(null);
const videoFile = ref(null);
const limitSizeFile = ref(null);
const multipleFile = ref(null);
const autoSaveFile = ref(null);

const selectedFiles = ref([]);
const savedFiles = ref([]);

// 监听文件选择事件
const onFileSelect = (files) => {
  console.log('选择的文件:', files);
};

// 监听文件变化事件
const onFileChange = (files) => {
  selectedFiles.value = files;
};

// 监听文件大小超出限制事件
const onExceedSize = (data) => {
  console.log(`文件大小超出限制: ${formatSize(data.maxSize)}`, data.files);
  uni.showToast({
    title: `文件大小不能超过${formatSize(data.maxSize)}`,
    icon: 'none'
  });
};

// 监听文件数量超出限制事件
const onExceedLimit = (data) => {
  console.log(`文件数量超出限制: ${data.limit}`, data.files);
  uni.showToast({
    title: `最多只能选择${data.limit}个文件`,
    icon: 'none'
  });
};

// 监听文件保存成功事件
const onSaveSuccess = (data) => {
  console.log('文件保存成功:', data.files);
  uni.showToast({
    title: '文件保存成功',
    icon: 'success'
  });
};

// 获取已保存的文件
const getSavedFiles = () => {
  // 在非H5平台获取已保存的文件
  // #ifndef H5
  uni.getSavedFileList({
    success: (res) => {
      savedFiles.value = res.fileList.map(file => ({
        name: file.filePath.substring(file.filePath.lastIndexOf('/') + 1),
        path: file.filePath,
        size: file.size,
        createTime: file.createTime
      }));
    },
    fail: (err) => {
      console.error('获取已保存文件失败:', err);
      uni.showToast({
        title: '获取已保存文件失败',
        icon: 'none'
      });
    }
  });
  // #endif

  // 在H5平台显示提示
  // #ifdef H5
  uni.showToast({
    title: 'H5平台不支持此操作',
    icon: 'none'
  });
  // #endif
};

// 打开已保存的文件
const openSavedFile = (file) => {
  if (!file || !file.path) return;

  // #ifndef H5
  uni.openDocument({
    filePath: file.path,
    success: () => {
      console.log('打开文件成功');
    },
    fail: (err) => {
      console.error('打开文件失败:', err);
      uni.showToast({
        title: '打开文件失败',
        icon: 'none'
      });
    }
  });
  // #endif

  // 在H5平台尝试直接打开
  // #ifdef H5
  window.open(file.path);
  // #endif
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

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.demo-block {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 6px;
}

.demo-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.demo-item:last-child {
  margin-bottom: 0;
}

.item-label {
  width: 100px;
  font-size: 14px;
  color: #333;
}

.result {
  margin-top: 15px;
}

.result-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.result-content {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
}

.result-item {
  font-size: 13px;
  color: #606266;
  margin-bottom: 5px;
  display: block;
}

.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 40px;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  border: none;
}

.button-icon {
  margin-right: 5px;
  font-size: 16px;
}

.button-text {
  font-size: 14px;
}

.action-button {
  background-color: #67c23a;
  color: #fff;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  padding: 0 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  border: none;
}

.saved-files {
  margin-top: 15px;
}

.saved-file {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.saved-file-name {
  flex: 1;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.saved-file-size {
  font-size: 12px;
  color: #999;
  margin: 0 10px;
}

.saved-file-action {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}
</style> 