<template>
  <view class="container">
    <scroll-view scroll-y class="content">
      <!-- 基础图片上传 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">基础图片上传</text>
          <text class="subtitle-text">支持多选、预览、删除</text>
        </view>
        <zx-upload
          v-model:fileList="imageList"
          accept="image"
          :maxCount="9"
          :maxSize="5 * 1024 * 1024"
          :multiple="true"
          uploadText="选择图片"
          @change="handleImageChange"
          @exceed="handleExceed"
          @remove="handleImageRemove"
          @preview="handlePreview"
        />
      </view>
      <zx-code
        :sourceCode="imageUploadCode"
        language="vue"
        title="基础图片上传代码"
        :showLineNumber="false"
        :showStats="false"
      />
      <!-- 文件列表模式 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">文件列表模式</text>
          <text class="subtitle-text">以列表形式展示文件</text>
        </view>
        <zx-upload
          v-model:fileList="fileList"
          listType="text"
          accept="file"
          :extensions="['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt']"
          tips="支持 PDF、Word、Excel、文本文件，单个文件不超过 5MB"
          :maxSize="5 * 1024 * 1024"
          @change="handleFileChange"
          @preview="handleFilePreview"
          @remove="handleFileRemove"
        />
      </view>
      <zx-code
        :sourceCode="fileListCode"
        language="vue"
        title="文件列表模式代码"
        :showLineNumber="false"
        :showStats="false"
      />
      <!-- 视频上传 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">视频上传</text>
          <text class="subtitle-text">支持视频选择和预览</text>
        </view>
        <zx-upload
          v-model:fileList="videoList"
          accept="video"
          :maxCount="3"
          :maxSize="50 * 1024 * 1024"
          uploadText="选择视频"
          @change="handleVideoChange"
          @remove="handleVideoRemove"
        />
      </view>
      <zx-code
        :sourceCode="videoUploadCode"
        language="vue"
        title="视频上传代码"
        :showLineNumber="false"
        :showStats="false"
      />
      <!-- 自动上传演示 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">自动上传演示</text>
          <text class="subtitle-text">模拟自动上传到服务器</text>
        </view>
        <zx-upload
          v-model:fileList="autoUploadList"
          :autoUpload="true"
          action="https://httpbin.org/post"
          :headers="uploadHeaders"
          :data="uploadData"
          name="file"
          :showProgress="true"
          :showRetry="true"
          @change="handleAutoUploadChange"
          @progress="handleProgress"
          @success="handleUploadSuccess"
          @error="handleUploadError"
        />
      </view>
      <zx-code
        :sourceCode="autoUploadCode"
        language="vue"
        title="自动上传代码"
        :showLineNumber="false"
        :showStats="false"
      />
      <!-- 严格类型检查 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">文件类型限制</text>
          <text class="subtitle-text">只允许 JPG、PNG 格式图片</text>
        </view>
        <zx-upload
          v-model:fileList="strictList"
          accept="image"
          :extensions="['jpg', 'jpeg', 'png']"
          tips="只允许 JPG、PNG 格式的图片文件"
          @change="handleStrictChange"
          @error="handleStrictError"
        />
      </view>
      <zx-code
        :sourceCode="strictTypeCode"
        language="vue"
        title="文件类型限制代码"
        :showLineNumber="false"
        :showStats="false"
      />
      <!-- 自定义上传按钮 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">自定义上传按钮</text>
          <text class="subtitle-text">使用插槽自定义上传区域</text>
        </view>
        <zx-upload
          v-model:fileList="customList"
          @change="handleCustomChange"
          @remove="handleCustomRemove"
        >
          <view class="custom-upload-btn">
            <zx-icon name="plus-circle" size="32" color="#409eff"></zx-icon>
            <text class="custom-upload-text">点击上传</text>
            <text class="custom-upload-tip">支持多种格式</text>
          </view>
        </zx-upload>
      </view>
      <zx-code
        :sourceCode="customButtonCode"
        language="vue"
        title="自定义上传按钮代码"
        :showLineNumber="false"
        :showStats="false"
      />
      <!-- 禁用状态 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">禁用状态</text>
          <text class="subtitle-text">禁用上传功能</text>
        </view>
        <zx-upload v-model:fileList="disabledList" :disabled="true" uploadText="已禁用" />
      </view>
      <zx-code
        :sourceCode="disabledCode"
        language="vue"
        title="禁用状态代码"
        :showLineNumber="false"
        :showStats="false"
      />
      <!-- 自定义尺寸 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">自定义尺寸</text>
          <text class="subtitle-text">设置不同的组件尺寸</text>
        </view>
        <view class="size-demo">
          <view class="size-item">
            <text class="size-label">小尺寸 (60rpx)</text>
            <zx-upload
              v-model:fileList="smallSizeList"
              :size="60"
              uploadIcon="plus"
              uploadIconColor="#666"
            />
          </view>
          <view class="size-item">
            <text class="size-label">默认尺寸 (80rpx)</text>
            <zx-upload
              v-model:fileList="normalSizeList"
              uploadIcon="camera"
              uploadIconColor="#409EFF"
            />
          </view>
          <view class="size-item">
            <text class="size-label">大尺寸 (120rpx)</text>
            <zx-upload
              v-model:fileList="largeSizeList"
              :size="120"
              uploadIcon="image"
              uploadIconColor="#67C23A"
              uploadText="上传"
            />
          </view>
        </view>
        <zx-code
          :sourceCode="customSizeCode"
          language="vue"
          title="自定义尺寸代码"
          :showLineNumber="false"
          :showStats="false"
        />
      </view>

      <!-- 操作按钮 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">手动控制</text>
        </view>
        <view class="button-group">
          <button class="demo-button primary" @click="clearAll">清空所有</button>
          <button class="demo-button success" @click="addMockFiles">添加模拟文件</button>
          <button class="demo-button info" @click="getAllFiles">获取所有文件</button>
        </view>
      </view>

      <!-- 状态显示 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">组件状态</text>
        </view>
        <view class="status-info">
          <view class="status-row">
            <text class="status-label">图片数量:</text>
            <text class="status-value">{{ imageList.length }}</text>
          </view>
          <view class="status-row">
            <text class="status-label">文件数量:</text>
            <text class="status-value">{{ fileList.length }}</text>
          </view>
          <view class="status-row">
            <text class="status-label">视频数量:</text>
            <text class="status-value">{{ videoList.length }}</text>
          </view>
          <view class="status-row">
            <text class="status-label">自动上传:</text>
            <text class="status-value">{{ autoUploadList.length }}</text>
          </view>
          <view class="status-row">
            <text class="status-label">总文件数:</text>
            <text class="status-value total">{{ totalFiles }}</text>
          </view>
        </view>
      </view>

      <!-- 属性说明 -->
      <view class="demo-section">
        <view class="demo-title">
          <text class="title-text">主要属性</text>
        </view>
        <view class="props-table">
          <view class="props-row header">
            <text class="props-cell">属性</text>
            <text class="props-cell">说明</text>
            <text class="props-cell">类型</text>
            <text class="props-cell">默认值</text>
          </view>
          <view class="props-row">
            <text class="props-cell">accept</text>
            <text class="props-cell">文件类型</text>
            <text class="props-cell">String</text>
            <text class="props-cell">image</text>
          </view>
          <view class="props-row">
            <text class="props-cell">maxCount</text>
            <text class="props-cell">最大数量</text>
            <text class="props-cell">Number</text>
            <text class="props-cell">9</text>
          </view>
          <view class="props-row">
            <text class="props-cell">multiple</text>
            <text class="props-cell">多选</text>
            <text class="props-cell">Boolean</text>
            <text class="props-cell">false</text>
          </view>
          <view class="props-row">
            <text class="props-cell">listType</text>
            <text class="props-cell">列表类型</text>
            <text class="props-cell">String</text>
            <text class="props-cell">picture</text>
          </view>
          <view class="props-row">
            <text class="props-cell">autoUpload</text>
            <text class="props-cell">自动上传</text>
            <text class="props-cell">Boolean</text>
            <text class="props-cell">true</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";

// 页面标题
uni.setNavigationBarTitle({
  title: "Upload 上传组件",
});

// 各种文件列表
const imageList = ref([]);
const fileList = ref([]);
const videoList = ref([]);
const autoUploadList = ref([]);
const strictList = ref([]);
const customList = ref([]);
const smallSizeList = ref([]);
const normalSizeList = ref([]);
const largeSizeList = ref([]);
const disabledList = ref([
  {
    uid: "demo1",
    url: "https://via.placeholder.com/200x200/ddd/999?text=Disabled",
    name: "disabled-image.jpg",
    size: 1024 * 100,
    type: "image",
    status: "success",
  },
]);

// 上传配置
const uploadHeaders = ref({
  Authorization: "Bearer demo-token",
  "Content-Type": "multipart/form-data",
});

const uploadData = ref({
  userId: 123,
  category: "demo",
});

// 计算属性
const totalFiles = computed(() => {
  return (
    imageList.value.length +
    fileList.value.length +
    videoList.value.length +
    autoUploadList.value.length +
    strictList.value.length +
    customList.value.length +
    smallSizeList.value.length +
    normalSizeList.value.length +
    largeSizeList.value.length
  );
});

// 事件处理函数
const handleImageChange = (data) => {
  console.log("图片列表变化:", data);
  uni.showToast({
    title: `已选择 ${data.file.length || 1} 张图片`,
    icon: "none",
  });
};

const handleImageRemove = (data) => {
  console.log("删除图片:", data);
  uni.showToast({
    title: "图片已删除",
    icon: "success",
  });
};

const handleFileChange = (data) => {
  console.log("文件列表变化:", data);
  uni.showToast({
    title: `已选择文件: ${data.file[0]?.name || ""}`,
    icon: "none",
  });
};

const handleFileRemove = (data) => {
  console.log("删除文件:", data);
  uni.showToast({
    title: "文件已删除",
    icon: "success",
  });
};

const handleVideoChange = (data) => {
  console.log("视频列表变化:", data);
  uni.showToast({
    title: "视频已选择",
    icon: "success",
  });
};

const handleVideoRemove = (data) => {
  console.log("删除视频:", data);
  uni.showToast({
    title: "视频已删除",
    icon: "success",
  });
};

const handleAutoUploadChange = (data) => {
  console.log("自动上传文件变化:", data);
};

const handleStrictChange = (data) => {
  console.log("严格模式文件变化:", data);
  uni.showToast({
    title: "文件类型符合要求",
    icon: "success",
  });
};

const handleCustomChange = (data) => {
  console.log("自定义上传变化:", data);
  uni.showToast({
    title: "自定义上传成功",
    icon: "success",
  });
};

const handleCustomRemove = (data) => {
  console.log("删除自定义文件:", data);
};

const handleProgress = (data) => {
  console.log("上传进度:", data);
  const { progressEvent } = data;
  if (progressEvent.progress % 20 === 0) {
    // 每20%显示一次进度
    uni.showToast({
      title: `上传进度 ${progressEvent.progress}%`,
      icon: "none",
      duration: 500,
    });
  }
};

const handleUploadSuccess = (data) => {
  console.log("上传成功:", data);
  uni.showToast({
    title: "上传成功",
    icon: "success",
  });
};

const handleUploadError = (data) => {
  console.error("上传失败:", data);
  uni.showToast({
    title: "上传失败",
    icon: "error",
  });
};

const handleExceed = (data) => {
  console.log("超出文件数量限制:", data);
  uni.showToast({
    title: `最多只能选择${data.limit}个文件`,
    icon: "none",
  });
};

const handlePreview = (data) => {
  console.log("预览文件:", data);
  uni.showToast({
    title: "预览图片",
    icon: "none",
  });
};

const handleFilePreview = (data) => {
  console.log("预览文件:", data);
  uni.showToast({
    title: `预览文件: ${data.file.name}`,
    icon: "none",
  });
};

const handleStrictError = (data) => {
  console.error("文件类型错误:", data);
  uni.showToast({
    title: "文件类型不符合要求",
    icon: "error",
  });
};

// 工具函数
const clearAll = () => {
  imageList.value = [];
  fileList.value = [];
  videoList.value = [];
  autoUploadList.value = [];
  strictList.value = [];
  customList.value = [];
  smallSizeList.value = [];
  normalSizeList.value = [];
  largeSizeList.value = [];

  uni.showToast({
    title: "已清空所有文件",
    icon: "success",
  });
};

const addMockFiles = () => {
  // 添加模拟图片
  imageList.value.push({
    uid: `mock_image_${Date.now()}`,
    url: "https://via.placeholder.com/200x200/4CAF50/white?text=Mock+Image",
    thumb: "https://via.placeholder.com/200x200/4CAF50/white?text=Mock+Image",
    name: "mock-image.jpg",
    size: 1024 * 200,
    type: "image",
    status: "success",
  });

  // 添加模拟文件
  fileList.value.push({
    uid: `mock_file_${Date.now()}`,
    url: "https://example.com/mock-document.pdf",
    name: "mock-document.pdf",
    size: 1024 * 1024 * 2,
    type: "file",
    status: "success",
  });

  uni.showToast({
    title: "已添加模拟文件",
    icon: "success",
  });
};

const getAllFiles = () => {
  const allFiles = [
    ...imageList.value,
    ...fileList.value,
    ...videoList.value,
    ...autoUploadList.value,
    ...strictList.value,
    ...customList.value,
    ...smallSizeList.value,
    ...normalSizeList.value,
    ...largeSizeList.value,
  ];

  console.log("所有文件:", allFiles);

  uni.showModal({
    title: "文件统计",
    content: `共 ${allFiles.length} 个文件\n图片: ${imageList.value.length}\n文件: ${fileList.value.length}\n视频: ${videoList.value.length}\n自动上传: ${autoUploadList.value.length}`,
    showCancel: false,
  });
};

// 代码示例字符串
const imageUploadCode = ref(`<zx-upload 
	v-model:fileList="imageList"
	accept="image"
	:maxCount="9"
	:maxSize="5 * 1024 * 1024"
	:multiple="true"
	uploadText="选择图片"
	@change="handleImageChange"
	@remove="handleImageRemove"
/>`);

const fileListCode = ref(`<zx-upload 
	v-model:fileList="fileList"
	listType="text"
	accept="file"
	:extensions="['pdf', 'doc', 'docx']"
	tips="支持 PDF、Word、Excel 文件"
	@change="handleFileChange"
/>`);

const videoUploadCode = ref(`<zx-upload 
	v-model:fileList="videoList"
	accept="video"
	:maxCount="3"
	:maxSize="50 * 1024 * 1024"
	uploadText="选择视频"
	@change="handleVideoChange"
/>`);

const autoUploadCode = ref(`<zx-upload 
	v-model:fileList="autoUploadList"
	:autoUpload="true"
	action="https://your-server.com/upload"
	:headers="uploadHeaders"
	:showProgress="true"
	@progress="handleProgress"
	@success="handleUploadSuccess"
/>`);

const strictTypeCode = ref(`<zx-upload 
	v-model:fileList="strictList"
	accept="image"
	:extensions="['jpg', 'jpeg', 'png']"
	tips="只允许 JPG、PNG 格式的图片文件"
	@change="handleStrictChange"
/>`);

const customButtonCode = ref(`<zx-upload v-model:fileList="customList">
	<view class="custom-upload-btn">
		<zx-icon name="plus-circle" size="32"></zx-icon>
		<text>点击上传</text>
	</view>
</zx-upload>`);

const disabledCode = ref(`<zx-upload 
	v-model:fileList="disabledList"
	:disabled="true"
	uploadText="已禁用"
/>`);

const customSizeCode = ref(`<zx-upload 
	v-model:fileList="fileList"
	:size="120"
	uploadIcon="camera"
	uploadIconColor="#409EFF"
	uploadText="上传"
/>`);
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f8f9fa;
}

.content {
  height: calc(100vh - 88rpx);
  padding: 20rpx;
}

.demo-section {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.demo-title {
  margin-bottom: 20rpx;

  .title-text {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8rpx;
  }

  .subtitle-text {
    display: block;
    font-size: 24rpx;
    color: #666;
    line-height: 1.4;
  }
}

.custom-upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160rpx;
  height: 160rpx;
  border: 2rpx dashed #409eff;
  border-radius: 12rpx;
  background-color: rgba(64, 158, 255, 0.05);
  transition: all 0.3s ease;

  &:active {
    border-color: #66b3ff;
    background-color: rgba(64, 158, 255, 0.1);
  }
}

.custom-upload-text {
  font-size: 24rpx;
  color: #409eff;
  margin-top: 8rpx;
  font-weight: 500;
}

.custom-upload-tip {
  font-size: 20rpx;
  color: #999;
  margin-top: 4rpx;
}

.size-demo {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.size-item {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.size-label {
  font-size: 26rpx;
  color: #666;
  min-width: 200rpx;
}

.button-group {
  display: flex;
  gap: 20rpx;
  flex-wrap: wrap;
}

.demo-button {
  flex: 1;
  min-width: 200rpx;
  height: 80rpx;
  color: white;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 500;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.success {
    background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  }

  &.info {
    background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  }

  &:active {
    opacity: 0.9;
  }
}

.status-info {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12rpx;
  padding: 20rpx;
  border-left: 6rpx solid #409eff;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rpx 0;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
    padding-top: 12rpx;
  }
}

.status-label {
  font-size: 26rpx;
  color: #666;
}

.status-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;

  &.total {
    color: #409eff;
    font-weight: 600;
    font-size: 32rpx;
  }
}

.props-table {
  border: 1rpx solid #e4e7ed;
  border-radius: 8rpx;
  overflow: hidden;
}

.props-row {
  display: flex;
  border-bottom: 1rpx solid #e4e7ed;

  &:last-child {
    border-bottom: none;
  }

  &.header {
    background-color: #f8f9fa;
    font-weight: 600;
  }
}

.props-cell {
  flex: 1;
  padding: 16rpx 12rpx;
  font-size: 24rpx;
  color: #333;
  border-right: 1rpx solid #e4e7ed;
  text-align: center;

  &:last-child {
    border-right: none;
  }

  &:first-child {
    color: #409eff;
    font-weight: 500;
  }
}

/* 响应式设计 */
@media screen and (max-width: 750rpx) {
  .demo-section {
    padding: 20rpx;
    margin-bottom: 16rpx;
  }

  .button-group {
    flex-direction: column;
    gap: 16rpx;
  }

  .demo-button {
    width: 100%;
    min-width: auto;
  }

  .size-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12rpx;
  }

  .props-row {
    flex-direction: column;
  }

  .props-cell {
    border-right: none;
    border-bottom: 1rpx solid #e4e7ed;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
