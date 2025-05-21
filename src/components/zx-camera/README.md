# zx-camera 相机组件

`zx-camera` 是一个基于uni-app的相机组件，提供了拍照、录制视频等功能，支持多种相机设置如闪光灯控制、前后摄像头切换等。

## 功能特点

- 拍照功能
- 视频录制
- 闪光灯控制（关闭、自动、开启、手电筒）
- 前后摄像头切换
- 相机缩放控制
- 多种输出质量和尺寸设置

## 使用示例

### 基础使用

```vue
<template>
  <view>
    <button @click="openCamera">打开相机</button>
    <zx-camera ref="cameraRef" @close="handleClose" @photo="handlePhoto" @error="handleError"></zx-camera>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const cameraRef = ref(null);

// 打开相机
const openCamera = () => {
  // 可以在此处做一些相机的初始化工作
  // ...
};

// 关闭相机回调
const handleClose = () => {
  console.log('相机已关闭');
};

// 拍照成功回调
const handlePhoto = (result) => {
  console.log('拍照成功:', result.path, result.info);
  // 可以在这里处理照片数据
};

// 错误处理
const handleError = (error) => {
  console.error('相机错误:', error);
};

// 调用相机拍照
const takePhotoAction = () => {
  cameraRef.value.takePhoto();
};

// 调用相机录像
const startRecordAction = () => {
  cameraRef.value.startRecord();
};

// 停止录像
const stopRecordAction = () => {
  cameraRef.value.stopRecord();
};
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| ----- | ---- | ----- | ---- |
| mode | String | 'photo' | 相机模式，可选值：'photo'(拍照)、'video'(视频)、'scan'(扫描) |
| devicePosition | String | 'back' | 摄像头朝向，可选值：'back'(后置)、'front'(前置) |
| frameSize | String | 'large' | 输出尺寸，可选值：'small'(小)、'medium'(中)、'large'(大) |
| quality | String | 'high' | 照片质量，可选值：'low'(低)、'normal'(普通)、'high'(高) |

## 事件说明

| 事件名 | 说明 | 返回参数 |
| ----- | ---- | ------- |
| close | 相机关闭时触发 | - |
| error | 相机出错时触发 | error: 错误信息 |
| photo | 拍照完成时触发 | {path: 照片路径, info: 照片信息} |
| video | 视频录制完成时触发 | {path: 视频路径, thumbPath: 视频缩略图路径} |
| scan | 扫描到内容时触发（需在scan模式下） | 扫描结果 |

## 方法说明

以下方法可通过组件实例调用：

| 方法名 | 说明 | 参数 |
| ----- | ---- | ---- |
| takePhoto | 拍照 | - |
| startRecord | 开始录制视频 | - |
| stopRecord | 停止录制视频 | - |
| setZoom | 设置缩放级别 | zoom: 缩放级别，范围[1, maxZoom] |
| switchFlash | 切换闪光灯模式 | - |
| switchCameraPosition | 切换前后摄像头 | - |

## 关于相机权限

使用本组件需要获取相机权限，请确保在项目的manifest.json中配置了相机权限：

```json
"permission": {
  "scope.camera": {
    "desc": "用于拍照/录像功能"
  }
}
```

## 注意事项

1. 组件基于uni-app的camera组件实现，支持微信小程序、支付宝小程序等平台，但具体表现可能因平台而异
2. 在App端实现OCR等证件识别功能，可在插件市场获取原生插件
3. 使用前请确保已获取用户摄像头授权
