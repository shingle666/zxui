<template>
  <view class="container">
    <view class="header">
      <view class="title">抽屉 Drawer</view>
      <view class="subtitle">从屏幕边缘滑出的抽屉面板</view>
    </view>
    
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-block">
        <button class="demo-btn" @click="drawer1 = true">从右侧打开</button>
        <zx-drawer v-model="drawer1" title="标题">
          <view class="drawer-content">
            <view class="drawer-item">抽屉内容</view>
            <view class="drawer-item">这是一个基础抽屉示例</view>
          </view>
        </zx-drawer>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">不同方向</view>
      <view class="demo-block">
        <view class="btn-group">
          <button class="demo-btn" @click="openDrawer('ltr')">从左侧打开</button>
          <button class="demo-btn" @click="openDrawer('rtl')">从右侧打开</button>
          <button class="demo-btn" @click="openDrawer('ttb')">从顶部打开</button>
          <button class="demo-btn" @click="openDrawer('btt')">从底部打开</button>
        </view>
        
        <zx-drawer 
          v-model="drawer2" 
          :direction="direction"
          title="自定义方向"
        >
          <view class="drawer-content">
            <view class="drawer-item">方向: {{directionNames[direction]}}</view>
            <view class="drawer-item">通过direction属性设置抽屉的方向</view>
          </view>
        </zx-drawer>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">自定义大小</view>
      <view class="demo-block">
        <button class="demo-btn" @click="drawer3 = true">占据50%宽度</button>
        <zx-drawer v-model="drawer3" title="自定义大小" size="50%">
          <view class="drawer-content">
            <view class="drawer-item">通过size属性设置抽屉的大小</view>
            <view class="drawer-item">可以是像素值或百分比</view>
          </view>
        </zx-drawer>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">自定义头部和底部</view>
      <view class="demo-block">
        <button class="demo-btn" @click="drawer4 = true">含有头部和底部</button>
        <zx-drawer v-model="drawer4">
          <template #header>
            <view class="custom-header">
              <text class="custom-title">自定义头部</text>
            </view>
          </template>
          
          <view class="drawer-content">
            <view class="drawer-item">通过slot自定义内容</view>
            <view class="drawer-item">包括header和footer插槽</view>
          </view>
          
          <template #footer>
            <view class="custom-footer">
              <button class="footer-btn cancel" @click="drawer4 = false">取消</button>
              <button class="footer-btn confirm" @click="handleConfirm">确认</button>
            </view>
          </template>
        </zx-drawer>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">无标题模式</view>
      <view class="demo-block">
        <button class="demo-btn" @click="drawer5 = true">无标题抽屉</button>
        <zx-drawer v-model="drawer5" :with-header="false">
          <view class="drawer-content no-header">
            <view class="close-icon" @click="drawer5 = false">×</view>
            <view class="drawer-item">这是一个没有标题的抽屉</view>
            <view class="drawer-item">通过with-header="false"实现</view>
          </view>
        </zx-drawer>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">嵌套内容</view>
      <view class="demo-block">
        <button class="demo-btn" @click="drawer6 = true">嵌套表单</button>
        <zx-drawer v-model="drawer6" title="表单示例" size="80%">
          <view class="drawer-content">
            <view class="form-item">
              <view class="form-label">姓名</view>
              <input class="form-input" v-model="form.name" placeholder="请输入姓名" />
            </view>
            <view class="form-item">
              <view class="form-label">年龄</view>
              <input class="form-input" v-model="form.age" placeholder="请输入年龄" type="number" />
            </view>
            <view class="form-item">
              <view class="form-label">地区</view>
              <input class="form-input" v-model="form.region" placeholder="请选择地区" />
            </view>
            <view class="form-item">
              <view class="form-label">备注</view>
              <textarea class="form-textarea" v-model="form.remark" placeholder="请输入备注信息" />
            </view>
          </view>
          
          <template #footer>
            <view class="custom-footer">
              <button class="footer-btn cancel" @click="drawer6 = false">取消</button>
              <button class="footer-btn confirm" @click="submitForm">提交</button>
            </view>
          </template>
        </zx-drawer>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 抽屉状态
const drawer1 = ref(false);
const drawer2 = ref(false);
const drawer3 = ref(false);
const drawer4 = ref(false);
const drawer5 = ref(false);
const drawer6 = ref(false);

// 方向控制
const direction = ref('rtl');
const directionNames = {
  ltr: '从左至右',
  rtl: '从右至左',
  ttb: '从上至下',
  btt: '从下至上'
};

// 表单数据
const form = ref({
  name: '',
  age: '',
  region: '',
  remark: ''
});

// 打开不同方向的抽屉
const openDrawer = (dir) => {
  direction.value = dir;
  drawer2.value = true;
};

// 确认按钮回调
const handleConfirm = () => {
  uni.showToast({
    title: '点击了确认按钮',
    icon: 'none'
  });
  drawer4.value = false;
};

// 提交表单
const submitForm = () => {
  uni.showToast({
    title: '表单提交成功',
    icon: 'success'
  });
  drawer6.value = false;
};
</script>

<style>
.container {
  padding: 20rpx;
}

.header {
  margin-bottom: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.demo-block {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.demo-btn {
  background-color: #409eff;
  color: #fff;
  font-size: 28rpx;
  padding: 10rpx 30rpx;
  border-radius: 6rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
}

.drawer-content {
  padding: 20rpx;
}

.drawer-item {
  padding: 20rpx 0;
  border-bottom: 1px solid #eee;
}

.drawer-item:last-child {
  border-bottom: none;
}

.custom-header {
  padding: 20rpx;
  display: flex;
  align-items: center;
}

.custom-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #409eff;
}

.custom-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20rpx;
}

.footer-btn {
  padding: 10rpx 30rpx;
  margin-left: 20rpx;
  border-radius: 6rpx;
  font-size: 28rpx;
}

.cancel {
  background-color: #f5f7fa;
  color: #606266;
}

.confirm {
  background-color: #409eff;
  color: #fff;
}

.no-header {
  position: relative;
  padding-top: 60rpx;
}

.close-icon {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  font-size: 40rpx;
  color: #909399;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-label {
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: #606266;
}

.form-input {
  width: 100%;
  height: 80rpx;
  border: 1px solid #dcdfe6;
  border-radius: 6rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.form-textarea {
  width: 100%;
  height: 200rpx;
  border: 1px solid #dcdfe6;
  border-radius: 6rpx;
  padding: 20rpx;
  box-sizing: border-box;
}
</style> 