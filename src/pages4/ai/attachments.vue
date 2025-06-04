<template>
  <view class="page">
    <view class="page-header">
      <text class="page-title">ZxAiAttachments 组件示例</text>
    </view>
    
    <scroll-view class="page-content" scroll-y>
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="demo-title">基础用法</view>
        <view class="demo-desc">展示基本的附件列表</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="basicItems"
            @remove="handleRemove"
            @preview="handlePreview"
          />
        </view>
      </view>
      
      <!-- 占位信息 -->
      <view class="demo-section">
        <view class="demo-title">占位信息</view>
        <view class="demo-desc">没有附件时显示占位内容</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="[]"
            :placeholder="placeholderConfig"
            @click="handleAddFile"
          />
        </view>
      </view>
      
      <!-- 简单占位文本 -->
      <view class="demo-section">
        <view class="demo-title">简单占位文本</view>
        <view class="demo-desc">使用字符串作为占位内容</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="[]"
            placeholder="请选择要上传的文件"
            @click="handleAddFile"
          />
        </view>
      </view>
      
      <!-- 超出样式 - 横向滚动 -->
      <view class="demo-section">
        <view class="demo-title">横向滚动</view>
        <view class="demo-desc">文件过多时横向滚动显示</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="manyItems"
            overflow="scrollX"
            @remove="handleRemove"
            @preview="handlePreview"
          />
        </view>
      </view>
      
      <!-- 超出样式 - 纵向滚动 -->
      <view class="demo-section">
        <view class="demo-title">纵向滚动</view>
        <view class="demo-desc">文件过多时纵向滚动显示</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="manyItems"
            overflow="scrollY"
            @remove="handleRemove"
            @preview="handlePreview"
          />
        </view>
      </view>
      
      <!-- 禁用状态 -->
      <view class="demo-section">
        <view class="demo-title">禁用状态</view>
        <view class="demo-desc">禁用时不可操作</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="basicItems"
            :disabled="true"
            @remove="handleRemove"
            @preview="handlePreview"
          />
        </view>
      </view>
      
      <!-- 上传状态 -->
      <view class="demo-section">
        <view class="demo-title">上传状态</view>
        <view class="demo-desc">展示不同的上传状态</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="uploadingItems"
            @remove="handleRemove"
            @preview="handlePreview"
          />
        </view>
      </view>
      
      <!-- 自定义样式 -->
      <view class="demo-section">
        <view class="demo-title">自定义样式</view>
        <view class="demo-desc">使用自定义样式类名和样式对象</view>
        <view class="demo-content">
          <zx-ai-attachments
            :items="basicItems"
            custom-class="custom-attachments"
            :custom-style="{ border: '2px solid #1677ff', borderRadius: '12px', padding: '16px' }"
            :class-names="{ list: 'custom-list', item: 'custom-item' }"
            @remove="handleRemove"
            @preview="handlePreview"
          />
        </view>
      </view>
      
      <!-- 操作按钮 -->
      <view class="demo-section">
        <view class="demo-title">操作演示</view>
        <view class="demo-desc">添加和移除文件</view>
        <view class="demo-content">
          <view class="demo-buttons">
            <button class="demo-button" @click="addImageFile">添加图片</button>
            <button class="demo-button" @click="addDocFile">添加文档</button>
            <button class="demo-button" @click="clearFiles">清空文件</button>
          </view>
          <zx-ai-attachments
            :items="dynamicItems"
            :placeholder="{
              icon: '📁',
              title: '暂无文件',
              description: '点击上方按钮添加文件'
            }"
            @remove="handleDynamicRemove"
            @preview="handlePreview"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ZxAiAttachments from '@/components/zx-ai-attachments/zx-ai-attachments.vue';

// 基础附件数据
const basicItems = ref([
  {
    uid: '1',
    name: '产品设计图.png',
    size: 1024 * 1024 * 2.5, // 2.5MB
    type: 'image/png',
    status: 'done',
    url: 'https://via.placeholder.com/300x200/1677ff/ffffff?text=Design'
  },
  {
    uid: '2',
    name: '项目需求文档.pdf',
    size: 1024 * 1024 * 5.2, // 5.2MB
    type: 'application/pdf',
    status: 'done'
  },
  {
    uid: '3',
    name: '数据分析报告.xlsx',
    size: 1024 * 1024 * 3.8, // 3.8MB
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    status: 'done'
  }
]);

// 占位信息配置
const placeholderConfig = {
  icon: '☁️',
  title: '拖拽文件到此处',
  description: '支持图片、文档、音频、视频等格式'
};

// 大量文件数据
const manyItems = ref([
  {
    uid: '1',
    name: '图片1.jpg',
    size: 1024 * 1024 * 2,
    type: 'image/jpeg',
    status: 'done',
    url: 'https://via.placeholder.com/300x200/ff4d4f/ffffff?text=Image1'
  },
  {
    uid: '2',
    name: '图片2.png',
    size: 1024 * 1024 * 1.5,
    type: 'image/png',
    status: 'done',
    url: 'https://via.placeholder.com/300x200/52c41a/ffffff?text=Image2'
  },
  {
    uid: '3',
    name: '文档1.pdf',
    size: 1024 * 1024 * 3,
    type: 'application/pdf',
    status: 'done'
  },
  {
    uid: '4',
    name: '表格1.xlsx',
    size: 1024 * 1024 * 2.5,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    status: 'done'
  },
  {
    uid: '5',
    name: '演示文稿.pptx',
    size: 1024 * 1024 * 8,
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    status: 'done'
  },
  {
    uid: '6',
    name: '压缩包.zip',
    size: 1024 * 1024 * 15,
    type: 'application/zip',
    status: 'done'
  }
]);

// 上传状态数据
const uploadingItems = ref([
  {
    uid: '1',
    name: '上传中的文件.jpg',
    size: 1024 * 1024 * 3,
    type: 'image/jpeg',
    status: 'uploading',
    percent: 65
  },
  {
    uid: '2',
    name: '上传失败的文件.pdf',
    size: 1024 * 1024 * 5,
    type: 'application/pdf',
    status: 'error'
  },
  {
    uid: '3',
    name: '上传完成的文件.docx',
    size: 1024 * 1024 * 2,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    status: 'done'
  }
]);

// 动态文件数据
const dynamicItems = ref([]);

// 文件计数器
let fileCounter = 1;

// 事件处理
const handleRemove = (item) => {
  console.log('移除文件:', item);
  uni.showToast({
    title: `移除文件: ${item.name}`,
    icon: 'none'
  });
};

const handlePreview = (item) => {
  console.log('预览文件:', item);
  uni.showToast({
    title: `预览文件: ${item.name}`,
    icon: 'none'
  });
};

const handleAddFile = () => {
  console.log('点击添加文件');
  uni.showToast({
    title: '点击添加文件',
    icon: 'none'
  });
};

const handleDynamicRemove = (item) => {
  const index = dynamicItems.value.findIndex(file => file.uid === item.uid);
  if (index > -1) {
    dynamicItems.value.splice(index, 1);
  }
};

const addImageFile = () => {
  const newFile = {
    uid: `dynamic-${fileCounter++}`,
    name: `新图片${fileCounter}.jpg`,
    size: Math.floor(Math.random() * 5 * 1024 * 1024), // 随机大小
    type: 'image/jpeg',
    status: 'done',
    url: `https://via.placeholder.com/300x200/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=Image${fileCounter}`
  };
  dynamicItems.value.push(newFile);
};

const addDocFile = () => {
  const types = [
    { ext: 'pdf', type: 'application/pdf' },
    { ext: 'docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { ext: 'xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
  ];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  const newFile = {
    uid: `dynamic-${fileCounter++}`,
    name: `新文档${fileCounter}.${randomType.ext}`,
    size: Math.floor(Math.random() * 10 * 1024 * 1024), // 随机大小
    type: randomType.type,
    status: 'done'
  };
  dynamicItems.value.push(newFile);
};

const clearFiles = () => {
  dynamicItems.value = [];
  uni.showToast({
    title: '已清空所有文件',
    icon: 'success'
  });
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.page-header {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #262626;
}

.page-content {
  height: calc(100vh - 80px);
  padding: 20px;
}

.demo-section {
  margin-bottom: 32px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.demo-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  padding: 16px 20px 8px;
}

.demo-desc {
  font-size: 14px;
  color: #8c8c8c;
  padding: 0 20px 16px;
  line-height: 1.4;
}

.demo-content {
  padding: 0 20px 20px;
}

.demo-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.demo-button {
  padding: 8px 16px;
  font-size: 14px;
  color: #1677ff;
  background-color: #f0f8ff;
  border: 1px solid #1677ff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #1677ff;
    color: #fff;
  }
  
  &:active {
    transform: scale(0.98);
  }
}

// 自定义样式示例
:deep(.custom-attachments) {
  background-color: #f0f8ff;
  
  .custom-list {
    gap: 12px;
  }
  
  .custom-item {
    border-color: #1677ff;
    border-width: 2px;
  }
}
</style>