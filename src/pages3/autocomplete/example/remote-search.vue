<template>
  <view class="example-container">
    <view class="title">远程搜索示例</view>
    <view class="demo-block">
      <zx-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入"
        @select="handleSelect"
      />
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
const result = ref('')
const restaurants = ref([])

onMounted(() => {
  restaurants.value = loadAll()
})

const querySearchAsync = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  
  // 模拟异步请求
  setTimeout(() => {
    cb(results)
  }, 1000)
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
    { value: '泷千家(天山西路店)', address: '天山西路438号' },
    { value: '胖仙女纸杯蛋糕（上海凯德龙之梦店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
    { value: '贡茶', address: '上海市长宁区金钟路633号' }
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
}
</style> 