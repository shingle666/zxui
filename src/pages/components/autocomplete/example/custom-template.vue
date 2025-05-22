<template>
  <view class="example-container">
    <view class="title">自定义模板示例</view>
    <view class="demo-block">
      <zx-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请输入"
        @select="handleSelect"
      >
        <template #default="{ item }">
          <view class="custom-suggestion-item">
            <view class="name">{{ item.value }}</view>
            <view class="addr">{{ item.address }}</view>
          </view>
        </template>
      </zx-autocomplete>
    </view>
    <view class="subtitle">输入结果</view>
    <view class="result">
      <text>{{ result }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const state = ref('')
const restaurants = ref([])
const result = ref('')

onMounted(() => {
  restaurants.value = loadAll()
})

const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // 调用 callback 返回建议列表的数据
  cb(results)
}

const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const loadAll = () => {
  return [
    { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
    { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
    { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
    { value: '泷千家(天山西路店)', address: '天山西路438号' }
  ]
}

const handleSelect = (item) => {
  result.value = `选中：${JSON.stringify(item)}`
}
</script>

<style lang="scss">
.example-container {
  padding: 30rpx;
  
  .title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
  }
  
  .subtitle {
    font-size: 28rpx;
    margin: 30rpx 0 10rpx;
  }
  
  .demo-block {
    padding: 20rpx;
    border: 1px solid #ebeef5;
    border-radius: 8rpx;
  }
  
  .result {
    padding: 20rpx;
    background-color: #f5f7fa;
    border-radius: 8rpx;
    font-size: 26rpx;
    word-break: break-all;
  }
  
  .custom-suggestion-item {
    padding: 6rpx 0;
    
    .name {
      font-size: 28rpx;
      color: #606266;
    }
    
    .addr {
      font-size: 22rpx;
      color: #b4b4b4;
    }
  }
}
</style> 