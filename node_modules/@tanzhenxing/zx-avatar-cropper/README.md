# zx-avatar-cropper 头像裁剪组件

## 介绍

zx-avatar-cropper 是一个功能强大的头像裁剪组件，支持图片选择、裁剪、旋转、缩放等功能。组件采用纯 JavaScript 实现，兼容 H5、小程序和 App 平台。

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | QQ小程序 | 字节小程序 | 快手小程序 | App |
| --- | --------- | ----------- | --------- | ------- | --------- | --------- | --- |
| ✅  | ✅        | ✅          | ✅        | ✅      | ✅        | ✅        | ✅  |

## 基本使用

### 基础用法

```html
<template>
  <zx-avatar-cropper 
    @confirm="onConfirm" 
    @cancel="onCancel"
    @error="onError"
  ></zx-avatar-cropper>
</template>

<script setup>
const onConfirm = (filePath) => {
  console.log('裁剪完成:', filePath);
  // 可以在此处上传到服务器或进行其他处理
};

const onCancel = () => {
  console.log('取消裁剪');
};

const onError = (error) => {
  console.log('发生错误:', error);
};
</script>
```

### 圆形裁剪

```html
<zx-avatar-cropper 
  shape="circle" 
  :crop-size="300"
  @confirm="onConfirm"
></zx-avatar-cropper>
```

### 方形裁剪

```html
<zx-avatar-cropper 
  shape="square" 
  :crop-size="400"
  @confirm="onConfirm"
></zx-avatar-cropper>
```

### 自定义输出尺寸和质量

```html
<zx-avatar-cropper 
  :output-size="300"
  :quality="0.9"
  @confirm="onConfirm"
></zx-avatar-cropper>
```

### 禁用调整大小

```html
<zx-avatar-cropper 
  :resizable="false"
  @confirm="onConfirm"
></zx-avatar-cropper>
```

### 隐藏操作按钮

```html
<zx-avatar-cropper 
  :show-rotate-btn="false"
  :show-reset-btn="false"
  @confirm="onConfirm"
></zx-avatar-cropper>
```

### 自定义样式

```html
<zx-avatar-cropper 
  mask-color="rgba(0, 0, 0, 0.7)"
  border-color="#ff6600"
  :border-width="3"
  @confirm="onConfirm"
></zx-avatar-cropper>
```

### 预设图片

```html
<zx-avatar-cropper 
  :src="imageUrl"
  @confirm="onConfirm"
></zx-avatar-cropper>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| src | 预设图片地址 | String | '' | - |
| shape | 裁剪框形状 | String | 'circle' | 'circle' / 'square' |
| cropSize | 裁剪框大小，单位rpx | Number | 400 | - |
| outputSize | 输出图片大小，单位px | Number | 200 | - |
| quality | 图片质量，范围0-1 | Number | 0.8 | 0-1 |
| resizable | 是否可调整裁剪框大小 | Boolean | true | true / false |
| showRotateBtn | 是否显示旋转按钮 | Boolean | true | true / false |
| showResetBtn | 是否显示重置按钮 | Boolean | true | true / false |
| selectText | 选择图片按钮文字 | String | '选择图片' | - |
| maskColor | 遮罩颜色 | String | 'rgba(0, 0, 0, 0.5)' | - |
| borderColor | 裁剪框边框颜色 | String | '#ffffff' | - |
| borderWidth | 裁剪框边框宽度 | Number | 2 | - |
| minCropSize | 最小裁剪框大小 | Number | 100 | - |
| maxCropSize | 最大裁剪框大小 | Number | 600 | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 确认裁剪时触发 | filePath: 裁剪后的图片临时路径 |
| cancel | 取消裁剪时触发 | - |
| error | 发生错误时触发 | error: 错误信息 |

## 使用示例

### 完整示例

```html
<template>
  <view class="container">
    <!-- 显示当前头像 -->
    <view class="avatar-preview">
      <zx-avatar 
        :src="currentAvatar" 
        size="200rpx"
        shape="circle"
      ></zx-avatar>
      <text class="avatar-tip">点击下方按钮更换头像</text>
    </view>
    
    <!-- 头像裁剪组件 -->
    <zx-avatar-cropper 
      v-if="showCropper"
      :src="selectedImage"
      shape="circle"
      :crop-size="350"
      :output-size="300"
      :quality="0.9"
      mask-color="rgba(0, 0, 0, 0.6)"
      border-color="#007aff"
      @confirm="onCropConfirm"
      @cancel="onCropCancel"
      @error="onCropError"
    ></zx-avatar-cropper>
    
    <!-- 操作按钮 -->
    <view v-if="!showCropper" class="action-buttons">
      <zx-button 
        type="primary" 
        @click="selectImage"
        :loading="uploading"
      >
        选择头像
      </zx-button>
      
      <zx-button 
        v-if="currentAvatar"
        type="default" 
        @click="previewAvatar"
        style="margin-top: 20rpx;"
      >
        预览头像
      </zx-button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const currentAvatar = ref('https://example.com/default-avatar.jpg');
const selectedImage = ref('');
const showCropper = ref(false);
const uploading = ref(false);

// 选择图片
const selectImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      selectedImage.value = res.tempFilePaths[0];
      showCropper.value = true;
    },
    fail: (err) => {
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      });
    }
  });
};

// 裁剪确认
const onCropConfirm = async (filePath) => {
  try {
    uploading.value = true;
    
    // 这里可以上传到服务器
    // const uploadResult = await uploadToServer(filePath);
    
    // 更新头像
    currentAvatar.value = filePath;
    showCropper.value = false;
    
    uni.showToast({
      title: '头像更新成功',
      icon: 'success'
    });
  } catch (error) {
    uni.showToast({
      title: '上传失败',
      icon: 'none'
    });
  } finally {
    uploading.value = false;
  }
};

// 裁剪取消
const onCropCancel = () => {
  showCropper.value = false;
  selectedImage.value = '';
};

// 裁剪错误
const onCropError = (error) => {
  console.error('裁剪错误:', error);
  uni.showToast({
    title: '裁剪失败',
    icon: 'none'
  });
};

// 预览头像
const previewAvatar = () => {
  uni.previewImage({
    urls: [currentAvatar.value],
    current: currentAvatar.value
  });
};

// 上传到服务器的示例函数
const uploadToServer = (filePath) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: 'https://your-server.com/upload',
      filePath: filePath,
      name: 'avatar',
      formData: {
        userId: 'user123'
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        if (data.success) {
          resolve(data.url);
        } else {
          reject(new Error(data.message));
        }
      },
      fail: reject
    });
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.avatar-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
  
  .avatar-tip {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #666666;
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

## 注意事项

1. **Canvas 支持**: 组件使用 Canvas 进行图片裁剪，请确保目标平台支持 Canvas API

2. **图片格式**: 支持常见的图片格式（jpg、png、gif等），建议使用 jpg 或 png 格式

3. **文件大小**: 建议选择的原图不要过大，以免影响性能和用户体验

4. **权限申请**: 在 App 端使用相机功能时，需要在 manifest.json 中配置相应权限

5. **临时文件**: 裁剪后返回的是临时文件路径，如需永久保存请及时上传到服务器

6. **样式自定义**: 可以通过 CSS 变量或直接修改样式来自定义组件外观

## 常见问题

### Q: 如何上传裁剪后的图片到服务器？

A: 在 `confirm` 事件回调中使用 `uni.uploadFile` API：

```javascript
const onConfirm = (filePath) => {
  uni.uploadFile({
    url: 'https://your-server.com/upload',
    filePath: filePath,
    name: 'avatar',
    success: (res) => {
      console.log('上传成功', res);
    }
  });
};
```

### Q: 如何限制选择图片的大小？

A: 可以在选择图片后检查文件大小：

```javascript
uni.chooseImage({
  success: (res) => {
    uni.getFileInfo({
      filePath: res.tempFilePaths[0],
      success: (fileInfo) => {
        if (fileInfo.size > 5 * 1024 * 1024) { // 5MB
          uni.showToast({
            title: '图片不能超过5MB',
            icon: 'none'
          });
          return;
        }
        // 继续处理...
      }
    });
  }
});
```

### Q: 如何自定义裁剪框的初始位置？

A: 目前裁剪框默认居中显示，如需自定义位置，可以修改组件内部的 `initCropper` 方法。

### Q: 在小程序中使用时有什么注意事项？

A: 
1. 确保在 `pages.json` 中正确配置页面
2. 小程序对 Canvas 的支持可能有差异，建议在真机上测试
3. 部分小程序平台对文件操作有限制，请参考对应平台文档