<template>
  <view class="example-container">
    <view class="title">基础用法示例</view>
    <view class="demo-block">
      <zx-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
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
    { value: '泷千家(天山西路店)', address: '天山西路438号' },
    { value: '胖仙女纸杯蛋糕（上海凯德龙之梦店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
    { value: '贡茶', address: '上海市长宁区金钟路633号' },
    { value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路曹安路1685号' },
    { value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
    { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
    { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
    { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
    { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
    { value: 'Monica摩托主题咖啡店', address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' }
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