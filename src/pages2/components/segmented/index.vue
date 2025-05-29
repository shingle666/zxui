<template>
  <view class="container">
    <view class="title">zx-segmented 分段控制器</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <zx-segmented v-model="basicValue" :options="basicOptions" />
    </view>
    
    <!-- 尺寸设置 -->
    <view class="section">
      <view class="section-title">尺寸设置</view>
      <view class="demo-item">
        <zx-segmented v-model="sizeValue" :options="sizeOptions" size="large" />
      </view>
      <view class="demo-item">
        <zx-segmented v-model="sizeValue" :options="sizeOptions" />
      </view>
      <view class="demo-item">
        <zx-segmented v-model="sizeValue" :options="sizeOptions" size="small" />
      </view>
    </view>
    
    <!-- 方向设置 -->
    <view class="section">
      <view class="section-title">方向设置</view>
      <view class="direction-demo">
        <zx-segmented 
          v-model="directionValue" 
          :options="directionOptions" 
          direction="vertical" 
        />
      </view>
    </view>
    
    <!-- 禁用状态 -->
    <view class="section">
      <view class="section-title">禁用状态</view>
      <view class="demo-item">
        <zx-segmented v-model="disabledValue1" :options="basicOptions" disabled />
      </view>
      <view class="demo-item">
        <zx-segmented v-model="disabledValue2" :options="itemDisabledOptions" />
      </view>
    </view>
    
    <!-- 自定义配置选项 -->
    <view class="section">
      <view class="section-title">自定义配置选项</view>
      <zx-segmented 
        v-model="customPropsValue" 
        :options="customPropsOptions" 
        :props="customProps" 
      />
    </view>
    
    <!-- Block 分段选择器 -->
    <view class="section">
      <view class="section-title">Block 分段选择器</view>
      <zx-segmented v-model="blockValue" :options="blockOptions" block />
    </view>
    
    <!-- 自定义内容 -->
    <view class="section">
      <view class="section-title">自定义内容</view>
      <zx-segmented v-model="customContentValue" :options="customContentOptions">
        <template #default="scope">
          <view class="custom-item">
            <text class="custom-icon">{{ scope.item.icon }}</text>
            <text class="custom-label">{{ scope.item.label }}</text>
          </view>
        </template>
      </zx-segmented>
    </view>
    
    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="custom-style">
        <zx-segmented v-model="customStyleValue" :options="customStyleOptions" />
      </view>
    </view>
    
    <!-- 事件演示 -->
    <view class="section">
      <view class="section-title">事件演示</view>
      <view class="demo-item">
        <zx-segmented 
          v-model="eventValue" 
          :options="eventOptions" 
          @change="handleChange"
        />
      </view>
      <view class="event-info" v-if="eventInfo">
        <text>已选择: {{ eventInfo }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const basicValue = ref('Mon');
const basicOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// 尺寸设置
const sizeValue = ref('Default');
const sizeOptions = ['Large', 'Default', 'Small'];

// 方向设置
const directionValue = ref('Horizontal');
const directionOptions = ['Horizontal', 'Vertical', 'Auto'];

// 禁用状态
const disabledValue1 = ref('Mon');
const disabledValue2 = ref('Tue');
const itemDisabledOptions = [
  { label: 'Mon', value: 'Mon', disabled: true },
  { label: 'Tue', value: 'Tue' },
  { label: 'Wed', value: 'Wed', disabled: true },
  { label: 'Thu', value: 'Thu' },
  { label: 'Fri', value: 'Fri', disabled: true }
];

// 自定义配置选项
const customPropsValue = ref('Mon');
const customProps = {
  label: 'myLabel',
  value: 'myValue',
  disabled: 'myDisabled'
};
const customPropsOptions = [
  { myLabel: 'Mon', myValue: 'Mon', myDisabled: true },
  { myLabel: 'Tue', myValue: 'Tue' },
  { myLabel: 'Wed', myValue: 'Wed', myDisabled: true },
  { myLabel: 'Thu', myValue: 'Thu' },
  { myLabel: 'Fri', myValue: 'Fri' }
];

// Block 分段选择器
const blockValue = ref('选项1');
const blockOptions = ['选项1', '选项2', '超长选项文本测试超长选项文本测试'];

// 自定义内容
const customContentValue = ref('Fruit');
const customContentOptions = [
  { label: 'Fruit', value: 'Fruit', icon: '🍎' },
  { label: 'Vegetable', value: 'Vegetable', icon: '🥦' },
  { label: 'Meat', value: 'Meat', icon: '🍖' },
  { label: 'Seafood', value: 'Seafood', icon: '🦐' }
];

// 自定义样式
const customStyleValue = ref('选项1');
const customStyleOptions = ['选项1', '选项2', '选项3', '选项4'];

// 事件演示
const eventValue = ref('Option 1');
const eventOptions = ['Option 1', 'Option 2', 'Option 3'];
const eventInfo = ref('');

const handleChange = (val) => {
  eventInfo.value = val;
  uni.showToast({
    title: `选择了: ${val}`,
    icon: 'none'
  });
};
</script>

<style lang="scss">
.container {
  padding: 30rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 40rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
}

.demo-item {
  margin-bottom: 20rpx;
}

.direction-demo {
  width: 200rpx;
}

.custom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx;
  
  .custom-icon {
    font-size: 36rpx;
    margin-bottom: 4rpx;
  }
  
  .custom-label {
    font-size: 24rpx;
  }
}

.custom-style {
  .zx-segmented {
    --segmented-item-selected-color: #333;
    --segmented-item-selected-bg-color: #ffd100;
    --segmented-item-radius: 30rpx;
    --segmented-item-bg-color: #f8f8f8;
  }
}

.event-info {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}
</style> 