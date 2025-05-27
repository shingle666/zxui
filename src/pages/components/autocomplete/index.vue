<template>
  <view class="container">
    <view class="header">
      <text class="title">ZxAutocomplete 自动补全组件</text>
      <text class="desc">根据输入内容提供对应的输入建议</text>
    </view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">基础用法</text>
        <text class="section-desc">Autocomplete 组件提供输入建议功能</text>
      </view>
      <view class="example-box">
        <zx-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        />
      </view>
      <view class="result-box" v-if="result1">
        <text class="result-title">选中结果：</text>
        <text class="result-content">{{ result1 }}</text>
      </view>
    </view>
    
    <!-- 自定义模板 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">自定义模板</text>
        <text class="section-desc">可自定义输入建议的显示模板</text>
      </view>
      <view class="example-box">
        <zx-autocomplete
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect2"
        >
          <template #default="{ item }">
            <view class="custom-item">
              <view class="item-name">{{ item.value }}</view>
              <view class="item-addr">{{ item.address }}</view>
            </view>
          </template>
        </zx-autocomplete>
      </view>
      <view class="result-box" v-if="result2">
        <text class="result-title">选中结果：</text>
        <text class="result-content">{{ result2 }}</text>
      </view>
    </view>
    
    <!-- 远程搜索 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">远程搜索</text>
        <text class="section-desc">从服务端搜索数据</text>
      </view>
      <view class="example-box">
        <zx-autocomplete
          v-model="state3"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect3"
        />
      </view>
      <view class="result-box" v-if="result3">
        <text class="result-title">选中结果：</text>
        <text class="result-content">{{ result3 }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 基础用法
const state1 = ref('')
const result1 = ref('')

// 自定义模板
const state2 = ref('')
const result2 = ref('')

// 远程搜索
const state3 = ref('')
const result3 = ref('')

// 数据源
const restaurants = ref([])

onMounted(() => {
  restaurants.value = loadAll()
})

// 基础搜索
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}

// 异步搜索
const querySearchAsync = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
    
  // 模拟异步请求
  setTimeout(() => {
    cb(results)
  }, 1000)
}

// 过滤函数
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

// 加载所有数据
const loadAll = () => {
  return [
    { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
    { value: 'Hot honey 首尔炸鸡', address: '上海市长宁区淞虹路661号' },
    { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号' },
    { value: '泷千家(天山西路店)', address: '天山西路438号' },
    { value: '胖仙女纸杯蛋糕', address: '上海市长宁区金钟路968号' },
    { value: '贡茶', address: '上海市长宁区金钟路633号' },
    { value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路1685号' },
    { value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
    { value: '十二泷町', address: '上海市北翟路1444弄81号' },
    { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' }
  ]
}

// 选择事件处理
const handleSelect = (item) => {
  result1.value = item.value
}

const handleSelect2 = (item) => {
  result2.value = `${item.value} - ${item.address}`
}

const handleSelect3 = (item) => {
  result3.value = item.value
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  margin-bottom: 40rpx;
  
  .title {
    display: block;
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  
  .desc {
    display: block;
    font-size: 28rpx;
    color: #606266;
  }
}

.section {
  margin-bottom: 50rpx;
  background-color: #fff;
  border-radius: 8rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.1);
  
  .section-header {
    margin-bottom: 30rpx;
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    
    .section-desc {
      display: block;
      font-size: 26rpx;
      color: #909399;
    }
  }
  
  .example-box {
    margin-bottom: 20rpx;
  }
  
  .result-box {
    margin-top: 30rpx;
    background-color: #f5f7fa;
    padding: 20rpx;
    border-radius: 6rpx;
    
    .result-title {
      font-size: 26rpx;
      color: #606266;
      margin-right: 10rpx;
    }
    
    .result-content {
      font-size: 26rpx;
      color: #409eff;
    }
  }
}

.custom-item {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 28rpx;
  color: #606266;
}

.item-addr {
  font-size: 24rpx;
  color: #b4b4b4;
}
</style>
