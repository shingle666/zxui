<template>
  <view class="container">
    <view class="title">
      <text>Table 表格</text>
    </view>
    
    <view class="section">
      <view class="section-title">基础表格</view>
      <view class="section-content">
        <zx-table :data="tableData">
          <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
          <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
          <zx-table-column prop="address" label="地址"></zx-table-column>
        </zx-table>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">带斑马纹表格</view>
      <view class="section-content">
        <zx-table :data="tableData" stripe>
          <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
          <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
          <zx-table-column prop="address" label="地址"></zx-table-column>
        </zx-table>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">带边框表格</view>
      <view class="section-content">
        <zx-table :data="tableData" border>
          <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
          <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
          <zx-table-column prop="address" label="地址"></zx-table-column>
        </zx-table>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">带状态表格</view>
      <view class="section-content">
        <zx-table :data="tableData" :table-class="customTableClass">
          <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
          <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
          <zx-table-column prop="address" label="地址"></zx-table-column>
        </zx-table>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">自定义列模板</view>
      <view class="section-content">
        <zx-table :data="tableData" border>
          <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
          <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
          <zx-table-column label="操作">
            <template #default="scope">
              <view class="button-group">
                <button class="button button-primary" @tap="handleEdit(scope.row)">编辑</button>
                <button class="button button-danger" @tap="handleDelete(scope.$index, scope.row)">删除</button>
              </view>
            </template>
          </zx-table-column>
        </zx-table>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">表格事件</view>
      <view class="section-content">
        <zx-table :data="tableData" border @row-click="handleRowClick">
          <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
          <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
          <zx-table-column prop="address" label="地址"></zx-table-column>
        </zx-table>
        <view class="event-result" v-if="lastEvent">
          <text>最后点击的行: {{ JSON.stringify(lastEvent) }}</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">空表格</view>
      <view class="section-content">
        <zx-table :data="[]" empty-text="暂无数据">
          <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
          <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
          <zx-table-column prop="address" label="地址"></zx-table-column>
        </zx-table>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 表格数据
const tableData = [
  {
    date: '2023-01-01',
    name: '张三',
    address: '北京市朝阳区芍药居'
  },
  {
    date: '2023-01-02',
    name: '李四',
    address: '上海市浦东新区张江高科'
  },
  {
    date: '2023-01-03',
    name: '王五',
    address: '广州市天河区珠江新城'
  },
  {
    date: '2023-01-04',
    name: '赵六',
    address: '深圳市南山区科技园'
  }
];

// 存储最后一次点击的行数据
const lastEvent = ref(null);

// 行点击事件处理
const handleRowClick = (row, index) => {
  lastEvent.value = { row, index };
};

// 编辑行处理
const handleEdit = (row) => {
  uni.showToast({
    title: `编辑: ${row.name}`,
    icon: 'none'
  });
};

// 删除行处理
const handleDelete = (index, row) => {
  uni.showToast({
    title: `删除: ${row.name}`,
    icon: 'none'
  });
};

// 自定义表格样式类
const customTableClass = 'custom-table';
</script>

<style>
.container {
  padding: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
}

.section {
  margin-bottom: 50rpx;
}

.section-title {
  font-size: 32rpx;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.section-content {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 20rpx;
}

.button-group {
  display: flex;
  justify-content: center;
}

.button {
  padding: 6rpx 20rpx;
  font-size: 24rpx;
  margin: 0 10rpx;
  border-radius: 6rpx;
}

.button-primary {
  background-color: #409eff;
  color: #fff;
}

.button-danger {
  background-color: #f56c6c;
  color: #fff;
}

.event-result {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
  font-size: 24rpx;
}

/* 自定义表格样式 */
.custom-table .zx-table__row:nth-child(1) {
  background-color: rgba(103, 194, 58, 0.1);
}

.custom-table .zx-table__row:nth-child(3) {
  background-color: rgba(245, 108, 108, 0.1);
}
</style> 