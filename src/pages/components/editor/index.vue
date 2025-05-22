<template>
  <view class="page-container">
    <view class="page-header">
      <text class="page-title">富文本编辑器示例</text>
      <text class="page-desc">展示 zx-editor 组件的基本用法和功能</text>
    </view>
    
    <view class="editor-container">
      <zx-editor ref="editorRef"></zx-editor>
    </view>
    
    <view class="action-container">
      <view class="action-item">
        <button class="action-btn" @tap="setDefaultContent">设置默认内容</button>
      </view>
      <view class="action-item">
        <button class="action-btn" @tap="getEditorContent" type="primary">获取编辑器内容</button>
      </view>
      <view class="action-item">
        <button class="action-btn" @tap="clearContent">清空内容</button>
      </view>
    </view>
    
    <view class="preview-container" v-if="previewContent">
      <view class="preview-header">
        <text class="preview-title">内容预览</text>
      </view>
      <view class="preview-content">
        <view class="preview-item">
          <text class="preview-label">标题：</text>
          <text class="preview-text">{{previewContent.title}}</text>
        </view>
        
        <view class="preview-item" v-if="previewContent.html">
          <text class="preview-label">HTML：</text>
          <text class="preview-code">{{previewContent.html}}</text>
        </view>
        
        <view class="preview-item" v-else-if="previewContent.contents">
          <text class="preview-label">内容块：</text>
          <view class="preview-block" v-for="(item, index) in previewContent.contents" :key="index">
            <text class="preview-block-type">{{item.type}}</text>
            <text class="preview-block-content">{{item.content}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ZxEditor from '@/components/zx-editor/zx-editor.vue';

// 组件引用
const editorRef = ref(null);
// 预览内容
const previewContent = ref(null);

// 设置默认内容
const setDefaultContent = () => {
  editorRef.value.setDefault({
    title: '示例文章标题',
    contents: [
      { type: 'h3', content: '欢迎使用 zx-editor 富文本编辑器', focusin: false },
      { type: 'txt', content: '这是一个多功能的富文本编辑器组件，支持传统分块编辑和官方富文本编辑器两种模式。', focusin: false },
      { type: 'center', content: '居中显示的文本内容', focusin: false },
      { type: 'quote', content: '这是一段引用文本，可以用来展示重要的信息或者引用他人的观点。', focusin: false },
      { type: 'code', content: 'function example() {\n  console.log("这是一段代码示例");\n}', focusin: false },
      { type: 'strong', content: '这是一段加粗的文本内容', focusin: false },
      { type: 'link', content: 'https://uniapp.dcloud.net.cn/', focusin: false },
      { type: 'spline', content: '', focusin: false },
      { type: 'txt', content: '您可以点击底部的图标添加更多内容，也可以切换到富文本编辑器模式获得更丰富的编辑体验。', focusin: false }
    ]
  });
  
  uni.showToast({
    title: '默认内容已设置',
    icon: 'success'
  });
};

// 获取编辑器内容
const getEditorContent = async () => {
  try {
    const data = await editorRef.value.getData();
    console.log('编辑器内容:', data);
    previewContent.value = data;
    
    uni.showToast({
      title: '内容已获取',
      icon: 'success'
    });
  } catch (error) {
    console.error('获取内容失败:', error);
    uni.showToast({
      title: '获取内容失败',
      icon: 'error'
    });
  }
};

// 清空内容
const clearContent = () => {
  editorRef.value.setDefault({
    title: '',
    contents: []
  });
  previewContent.value = null;
  
  uni.showToast({
    title: '内容已清空',
    icon: 'success'
  });
};

// 示例：处理图片上传
const handleImageUpload = (index, tempFilePath) => {
  // 实际应用中应该上传图片到服务器
  // 这里仅作为示例，直接设置错误状态
  setTimeout(() => {
    editorRef.value.setError(index);
    uni.showToast({
      title: '图片上传失败示例',
      icon: 'none'
    });
  }, 1500);
};

// 页面加载时设置默认内容
onMounted(() => {
  // 可以根据需要决定是否默认加载内容
  // setDefaultContent();
});
</script>

<style>
.page-container {
  padding: 30rpx;
}

.page-header {
  margin-bottom: 30rpx;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.page-desc {
  font-size: 28rpx;
  color: #666;
  display: block;
}

.editor-container {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.action-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30rpx;
}

.action-item {
  width: 31%;
  margin-bottom: 20rpx;
}

.action-btn {
  width: 100%;
  font-size: 28rpx;
  padding: 12rpx 0;
}

.preview-container {
  background-color: #f8f8f8;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-top: 30rpx;
}

.preview-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 15rpx;
  margin-bottom: 20rpx;
}

.preview-title {
  font-size: 32rpx;
  font-weight: bold;
}

.preview-item {
  margin-bottom: 20rpx;
}

.preview-label {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.preview-text {
  font-size: 28rpx;
  word-break: break-all;
}

.preview-code {
  font-size: 24rpx;
  background-color: #eee;
  padding: 10rpx;
  border-radius: 8rpx;
  display: block;
  word-break: break-all;
  font-family: monospace;
  max-height: 300rpx;
  overflow: auto;
}

.preview-block {
  margin-bottom: 15rpx;
  padding: 10rpx;
  background-color: #fff;
  border-radius: 8rpx;
}

.preview-block-type {
  font-size: 24rpx;
  color: #007AFF;
  background-color: rgba(0, 122, 255, 0.1);
  padding: 4rpx 10rpx;
  border-radius: 6rpx;
  margin-right: 10rpx;
}

.preview-block-content {
  font-size: 26rpx;
  display: block;
  margin-top: 10rpx;
  word-break: break-all;
}
</style>
