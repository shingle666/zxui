<template>
  <view class="page-container">
    <view class="page-header">
      <text class="page-title">富文本编辑器示例</text>
      <text class="page-desc">展示 zx-editor 组件的完整功能和配置选项</text>
    </view>
    
    <!-- 配置选项 -->
    <view class="config-container">
      <view class="config-header">
        <text class="config-title">配置选项</text>
      </view>
      <view class="config-content">
        <view class="config-item">
          <text class="config-label">显示状态栏</text>
          <switch :checked="config.showStatusBar" @change="onConfigChange('showStatusBar', $event)" />
        </view>
        <view class="config-item">
          <text class="config-label">默认富文本模式</text>
          <switch :checked="config.defaultUseEditor" @change="onConfigChange('defaultUseEditor', $event)" />
        </view>
        <view class="config-item">
          <text class="config-label">最大字符数</text>
          <input 
            type="number" 
            :value="config.maxLength" 
            @input="onMaxLengthChange"
            placeholder="输入最大字符数，-1为无限制"
            class="config-input" />
        </view>
      </view>
    </view>
    
    <!-- 编辑器容器 -->
    <view class="editor-container">
      <zx-editor 
        ref="editorRef"
        :showStatusBar="config.showStatusBar"
        :defaultUseEditor="config.defaultUseEditor"
        :maxLength="config.maxLength"
      />
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-container">
      <view class="action-row">
        <button class="action-btn primary" @tap="setDefaultContent">设置默认内容</button>
        <button class="action-btn" @tap="setRichContent">设置富文本内容</button>
        <button class="action-btn" @tap="clearContent">清空内容</button>
      </view>
      <view class="action-row">
        <button class="action-btn success" @tap="getEditorContent">获取内容</button>
        <button class="action-btn warning" @tap="validateContent">验证内容</button>
        <button class="action-btn info" @tap="toggleEditorMode">切换模式</button>
      </view>
      <view class="action-row">
        <button class="action-btn" @tap="getSelectionText">获取选中文本</button>
        <button class="action-btn" @tap="blurEditor">编辑器失焦</button>
        <button class="action-btn" @tap="updateWordCount">更新字数</button>
      </view>
    </view>
    
    <!-- 编辑器信息 -->
    <view class="info-container" v-if="editorInfo">
      <view class="info-header">
        <text class="info-title">编辑器状态</text>
      </view>
      <view class="info-content">
        <view class="info-item">
          <text class="info-label">当前模式：</text>
          <text class="info-value">{{ editorInfo.mode === 'editor' ? '富文本模式' : '传统模式' }}</text>
        </view>
        <view class="info-item" v-if="editorInfo.wordCount !== undefined">
          <text class="info-label">字数统计：</text>
          <text class="info-value">{{ editorInfo.wordCount }} 字</text>
        </view>
        <view class="info-item" v-if="editorInfo.selectedText">
          <text class="info-label">选中文本：</text>
          <text class="info-value">{{ editorInfo.selectedText }}</text>
        </view>
      </view>
    </view>
    
    <!-- 内容预览 -->
    <view class="preview-container" v-if="previewContent">
      <view class="preview-header">
        <text class="preview-title">内容预览</text>
        <button class="preview-close" @tap="closePreview">
          <zx-icon name="close" size="20" color="#666" />
        </button>
      </view>
      <view class="preview-content">
        <view class="preview-item">
          <text class="preview-label">标题：</text>
          <text class="preview-text">{{ previewContent.title || '未设置标题' }}</text>
        </view>
        
        <view class="preview-item">
          <text class="preview-label">模式：</text>
          <text class="preview-text">{{ previewContent.mode === 'editor' ? '富文本模式' : '传统模式' }}</text>
        </view>
        
        <view class="preview-item" v-if="previewContent.wordCount">
          <text class="preview-label">字数：</text>
          <text class="preview-text">{{ previewContent.wordCount }} 字</text>
        </view>
        
        <view class="preview-item" v-if="previewContent.html">
          <text class="preview-label">HTML 内容：</text>
          <scroll-view class="preview-code-scroll">
            <text class="preview-code">{{ previewContent.html }}</text>
          </scroll-view>
        </view>
        
        <view class="preview-item" v-if="previewContent.text">
          <text class="preview-label">纯文本：</text>
          <scroll-view class="preview-text-scroll">
            <text class="preview-text-content">{{ previewContent.text }}</text>
          </scroll-view>
        </view>
        
        <view class="preview-item" v-if="previewContent.contents && previewContent.contents.length > 0">
          <text class="preview-label">内容块 ({{ previewContent.contents.length }} 个)：</text>
          <view class="preview-blocks">
            <view class="preview-block" v-for="(item, index) in previewContent.contents" :key="index">
              <view class="preview-block-header">
                <text class="preview-block-type">{{ getBlockTypeName(item.type) }}</text>
                <text class="preview-block-index">#{{ index + 1 }}</text>
              </view>
              <text class="preview-block-content" v-if="item.content">{{ item.content }}</text>
              <text class="preview-block-empty" v-else>（空内容）</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 使用说明 -->
    <view class="help-container">
      <view class="help-header">
        <text class="help-title">使用说明</text>
      </view>
      <view class="help-content">
        <view class="help-item">
          <text class="help-text">• 支持传统分块编辑和富文本编辑两种模式</text>
        </view>
        <view class="help-item">
          <text class="help-text">• 可通过工具栏切换模式，内容会自动转换</text>
        </view>
        <view class="help-item">
          <text class="help-text">• 富文本模式支持撤销/重做、格式化、插入图片等</text>
        </view>
        <view class="help-item">
          <text class="help-text">• 传统模式支持分块管理，每种内容类型独立编辑</text>
        </view>
        <view class="help-item">
          <text class="help-text">• 支持字数统计、内容验证、状态监控等功能</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

// 组件引用
const editorRef = ref(null);

// 配置选项
const config = reactive({
  showStatusBar: true,
  defaultUseEditor: false,
  maxLength: 1000
});

// 预览内容
const previewContent = ref(null);

// 编辑器信息
const editorInfo = ref(null);

// 配置项变更处理
const onConfigChange = (key, event) => {
  config[key] = event.detail.value;
  uni.showToast({
    title: `${key} 已${event.detail.value ? '开启' : '关闭'}`,
    icon: 'none'
  });
};

// 最大字符数变更
const onMaxLengthChange = (event) => {
  const value = parseInt(event.detail.value) || -1;
  config.maxLength = value;
};

// 设置传统模式默认内容
const setDefaultContent = () => {
  editorRef.value.setDefault({
    title: '示例文章标题',
    contents: [
      { type: 'h3', content: '欢迎使用 zx-editor 富文本编辑器', focusin: false },
      { type: 'txt', content: '这是一个功能强大的富文本编辑器组件，支持多种编辑模式和丰富的格式化选项。', focusin: false },
      { type: 'center', content: '居中显示的重要提示', focusin: false },
      { type: 'quote', content: '这是一段引用文本，可以用来展示重要信息或引用他人观点。引用块通常用来突出显示特殊内容。', focusin: false },
      { type: 'code', content: 'function example() {\n  console.log("代码示例");\n  return "Hello World";\n}', focusin: false },
      { type: 'strong', content: '这是一段加粗的重要文本', focusin: false },
      { type: 'link', content: 'https://uniapp.dcloud.net.cn/', focusin: false },
      { type: 'spline', content: '', focusin: false },
      { type: 'txt', content: '您可以使用底部工具栏添加不同类型的内容，也可以切换到富文本模式体验更丰富的编辑功能。', focusin: false }
    ]
  });
  
  updateEditorInfo();
  uni.showToast({
    title: '传统模式内容已设置',
    icon: 'success'
  });
};

// 设置富文本内容
const setRichContent = () => {
  const htmlContent = `
    <h1>富文本编辑器示例</h1>
    <p>这是一个使用 <strong>富文本模式</strong> 的示例内容。</p>
    <h2>功能特点</h2>
    <ul>
      <li>支持多种文本格式：<strong>加粗</strong>、<em>斜体</em>、<u>下划线</u></li>
      <li>支持标题层级：H1 到 H6</li>
      <li>支持列表：有序列表和无序列表</li>
      <li>支持文本对齐方式</li>
    </ul>
    <h3>代码块示例</h3>
    <pre><code>function hello() {
  console.log("Hello, zx-editor!");
}</code></pre>
    <div>
      <p>这是一个引用块，用来展示引用内容。</p>
    </div>
    <p style="text-align: center;">居中对齐的文本</p>
    <hr>
    <p>感谢使用 zx-editor 组件！</p>
  `;
  
  editorRef.value.setData({
    title: '富文本模式示例',
    html: htmlContent,
    mode: 'editor'
  });
  
  updateEditorInfo();
  uni.showToast({
    title: '富文本内容已设置',
    icon: 'success'
  });
};

// 清空内容
const clearContent = () => {
  editorRef.value.clear();
  previewContent.value = null;
  editorInfo.value = null;
  
  uni.showToast({
    title: '内容已清空',
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

// 验证内容
const validateContent = () => {
  const isValid = editorRef.value.validate();
  
  uni.showModal({
    title: '验证结果',
    content: isValid ? '内容验证通过！' : '内容验证失败，请检查必填项。',
    showCancel: false
  });
};

// 切换编辑模式
const toggleEditorMode = () => {
  editorRef.value.toggleMode();
  setTimeout(() => {
    updateEditorInfo();
  }, 500);
};

// 获取选中文本
const getSelectionText = async () => {
  try {
    const text = await editorRef.value.getSelectionText();
    editorInfo.value = {
      ...editorInfo.value,
      selectedText: text || '无选中文本'
    };
    
    uni.showToast({
      title: text ? `选中了 ${text.length} 个字符` : '没有选中文本',
      icon: 'none'
    });
  } catch (error) {
    console.error('获取选中文本失败:', error);
    uni.showToast({
      title: '获取选中文本失败',
      icon: 'none'
    });
  }
};

// 编辑器失焦
const blurEditor = () => {
  editorRef.value.blurEditor();
  uni.showToast({
    title: '编辑器已失焦',
    icon: 'none'
  });
};

// 更新字数统计
const updateWordCount = () => {
  editorRef.value.updateWordCount();
  setTimeout(() => {
    updateEditorInfo();
  }, 200);
  
  uni.showToast({
    title: '字数统计已更新',
    icon: 'none'
  });
};

// 更新编辑器信息
const updateEditorInfo = async () => {
  try {
    const data = await editorRef.value.getData();
    editorInfo.value = {
      mode: data.mode,
      wordCount: data.wordCount,
      selectedText: editorInfo.value?.selectedText || ''
    };
  } catch (error) {
    console.error('更新编辑器信息失败:', error);
  }
};

// 关闭预览
const closePreview = () => {
  previewContent.value = null;
};

// 获取块类型名称
const getBlockTypeName = (type) => {
  const typeNames = {
    'h3': '标题',
    'txt': '文本',
    'center': '居中文本',
    'img': '图片',
    'quote': '引用',
    'code': '代码',
    'strong': '加粗',
    'link': '链接',
    'spline': '分割线'
  };
  return typeNames[type] || type;
};

// 页面加载时初始化
onMounted(() => {
  // 延迟更新编辑器信息
  setTimeout(() => {
    updateEditorInfo();
  }, 1000);
});
</script>

<style scoped>
.page-container {
  padding: 30rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30rpx;
  text-align: center;
}

.page-title {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
  color: #333;
}

.page-desc {
  font-size: 28rpx;
  color: #666;
  display: block;
}

/* 配置选项样式 */
.config-container {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.config-header {
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.config-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.config-content {
  padding: 20rpx 30rpx;
}

.config-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.config-item:last-child {
  margin-bottom: 0;
}

.config-label {
  font-size: 28rpx;
  color: #333;
}

.config-input {
  width: 300rpx;
  height: 60rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  padding: 0 15rpx;
  font-size: 26rpx;
  text-align: right;
}

/* 编辑器容器 */
.editor-container {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

/* 操作按钮样式 */
.action-container {
  margin-bottom: 30rpx;
}

.action-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.action-row:last-child {
  margin-bottom: 0;
}

.action-btn {
  flex: 1;
  margin: 0 10rpx;
  font-size: 26rpx;
  padding: 20rpx 0;
  border-radius: 8rpx;
  background-color: #f8f8f8;
  color: #333;
  border: none;
}

.action-btn:first-child {
  margin-left: 0;
}

.action-btn:last-child {
  margin-right: 0;
}

.action-btn.primary {
  background-color: #007aff;
  color: #fff;
}

.action-btn.success {
  background-color: #4cd964;
  color: #fff;
}

.action-btn.warning {
  background-color: #ff9500;
  color: #fff;
}

.action-btn.info {
  background-color: #5ac8fa;
  color: #fff;
}

/* 编辑器信息样式 */
.info-container {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.info-header {
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.info-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.info-content {
  padding: 20rpx 30rpx;
}

.info-item {
  display: flex;
  margin-bottom: 15rpx;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 28rpx;
  color: #666;
  min-width: 160rpx;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  flex: 1;
  word-break: break-all;
}

/* 预览容器样式 */
.preview-container {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.preview-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.preview-close {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.preview-content {
  padding: 20rpx 30rpx;
}

.preview-item {
  margin-bottom: 25rpx;
}

.preview-item:last-child {
  margin-bottom: 0;
}

.preview-label {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
  color: #333;
}

.preview-text {
  font-size: 28rpx;
  word-break: break-all;
  color: #666;
}

.preview-code-scroll,
.preview-text-scroll {
  max-height: 400rpx;
  background-color: #f8f8f8;
  border-radius: 8rpx;
  padding: 20rpx;
}

.preview-code {
  font-size: 24rpx;
  font-family: monospace;
  word-break: break-all;
  white-space: pre-wrap;
  color: #333;
}

.preview-text-content {
  font-size: 26rpx;
  word-break: break-all;
  white-space: pre-wrap;
  color: #333;
}

.preview-blocks {
  max-height: 500rpx;
  overflow-y: auto;
}

.preview-block {
  margin-bottom: 15rpx;
  padding: 15rpx;
  background-color: #f8f8f8;
  border-radius: 8rpx;
  border-left: 4rpx solid #007aff;
}

.preview-block:last-child {
  margin-bottom: 0;
}

.preview-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.preview-block-type {
  font-size: 24rpx;
  color: #007aff;
  background-color: rgba(0, 122, 255, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  font-weight: bold;
}

.preview-block-index {
  font-size: 22rpx;
  color: #999;
}

.preview-block-content {
  font-size: 26rpx;
  color: #333;
  word-break: break-all;
  white-space: pre-wrap;
}

.preview-block-empty {
  font-size: 24rpx;
  color: #999;
  font-style: italic;
}

/* 帮助说明样式 */
.help-container {
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.help-header {
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.help-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.help-content {
  padding: 20rpx 30rpx;
}

.help-item {
  margin-bottom: 15rpx;
}

.help-item:last-child {
  margin-bottom: 0;
}

.help-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}
</style>
