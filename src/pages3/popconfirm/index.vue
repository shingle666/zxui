<template>
  <view class="container">
    <view class="header">
      <text class="title">气泡确认框 Popconfirm</text>
      <text class="description">点击元素弹出气泡确认框，常用于操作确认</text>
    </view>

    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="section-content">
        <zx-popconfirm title="确定要删除这条记录吗？">
          <template #reference>
            <button class="demo-button">删除</button>
          </template>
        </zx-popconfirm>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自定义按钮文字</view>
      <view class="section-content">
        <zx-popconfirm 
          title="确定要执行此操作吗？" 
          confirm-button-text="是的" 
          cancel-button-text="取消操作"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <template #reference>
            <button class="demo-button">执行操作</button>
          </template>
        </zx-popconfirm>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自定义图标和颜色</view>
      <view class="section-content">
        <zx-popconfirm 
          title="此操作需要确认" 
          icon="info-filled" 
          icon-color="#409EFF"
        >
          <template #reference>
            <button class="demo-button">信息确认</button>
          </template>
        </zx-popconfirm>
        
        <zx-popconfirm 
          title="是否继续？" 
          icon="warning-filled" 
          icon-color="#E6A23C"
        >
          <template #reference>
            <button class="demo-button warning">警告确认</button>
          </template>
        </zx-popconfirm>
        
        <zx-popconfirm 
          title="此操作不可逆，是否继续？" 
          icon="error-filled" 
          icon-color="#F56C6C"
        >
          <template #reference>
            <button class="demo-button danger">危险操作</button>
          </template>
        </zx-popconfirm>
      </view>
    </view>

    <view class="section">
      <view class="section-title">不同位置</view>
      <view class="section-content placement-demo">
        <view class="placement-row">
          <zx-popconfirm title="提示信息" placement="top-start">
            <template #reference>
              <button class="demo-button small">上左</button>
            </template>
          </zx-popconfirm>
          
          <zx-popconfirm title="提示信息" placement="top">
            <template #reference>
              <button class="demo-button small">上中</button>
            </template>
          </zx-popconfirm>
          
          <zx-popconfirm title="提示信息" placement="top-end">
            <template #reference>
              <button class="demo-button small">上右</button>
            </template>
          </zx-popconfirm>
        </view>
        
        <view class="placement-row">
          <view class="placement-col">
            <zx-popconfirm title="提示信息" placement="left-start">
              <template #reference>
                <button class="demo-button small">左上</button>
              </template>
            </zx-popconfirm>
            
            <zx-popconfirm title="提示信息" placement="left">
              <template #reference>
                <button class="demo-button small">左中</button>
              </template>
            </zx-popconfirm>
            
            <zx-popconfirm title="提示信息" placement="left-end">
              <template #reference>
                <button class="demo-button small">左下</button>
              </template>
            </zx-popconfirm>
          </view>
          
          <view class="placement-col right">
            <zx-popconfirm title="提示信息" placement="right-start">
              <template #reference>
                <button class="demo-button small">右上</button>
              </template>
            </zx-popconfirm>
            
            <zx-popconfirm title="提示信息" placement="right">
              <template #reference>
                <button class="demo-button small">右中</button>
              </template>
            </zx-popconfirm>
            
            <zx-popconfirm title="提示信息" placement="right-end">
              <template #reference>
                <button class="demo-button small">右下</button>
              </template>
            </zx-popconfirm>
          </view>
        </view>
        
        <view class="placement-row">
          <zx-popconfirm title="提示信息" placement="bottom-start">
            <template #reference>
              <button class="demo-button small">下左</button>
            </template>
          </zx-popconfirm>
          
          <zx-popconfirm title="提示信息" placement="bottom">
            <template #reference>
              <button class="demo-button small">下中</button>
            </template>
          </zx-popconfirm>
          
          <zx-popconfirm title="提示信息" placement="bottom-end">
            <template #reference>
              <button class="demo-button small">下右</button>
            </template>
          </zx-popconfirm>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自定义按钮类型</view>
      <view class="section-content">
        <zx-popconfirm 
          title="确认操作？" 
          confirm-button-type="success" 
          cancel-button-type="info"
        >
          <template #reference>
            <button class="demo-button">自定义按钮类型</button>
          </template>
        </zx-popconfirm>
      </view>
    </view>

    <view class="section">
      <view class="section-title">自定义操作插槽</view>
      <view class="section-content">
        <zx-popconfirm title="确认删除所选项目？">
          <template #reference>
            <button class="demo-button danger">批量删除</button>
          </template>
          <template #actions="{ confirm, cancel }">
            <button class="custom-action-btn cancel" @click="cancel">我再想想</button>
            <button class="custom-action-btn confirm" @click="confirm">确定删除</button>
          </template>
        </zx-popconfirm>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const handleConfirm = () => {
  uni.showToast({
    title: '已确认操作',
    icon: 'success'
  });
};

const handleCancel = () => {
  uni.showToast({
    title: '已取消操作',
    icon: 'none'
  });
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
  display: block;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #606266;
  display: block;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  padding-left: 12px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  height: 16px;
  width: 4px;
  background-color: #409eff;
  border-radius: 2px;
}

.section-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.demo-button {
  padding: 8px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.demo-button.small {
  padding: 6px 12px;
  font-size: 12px;
}

.demo-button.warning {
  background-color: #e6a23c;
}

.demo-button.danger {
  background-color: #f56c6c;
}

.placement-demo {
  padding: 30px 20px;
}

.placement-row {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.placement-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  margin: 0 60px;
}

.custom-action-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
}

.custom-action-btn.cancel {
  background-color: #f4f4f5;
  color: #909399;
  border: 1px solid #d3d4d6;
}

.custom-action-btn.confirm {
  background-color: #f56c6c;
  color: #fff;
  border: none;
}
</style> 