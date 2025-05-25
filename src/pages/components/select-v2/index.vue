<template>
  <view class="content">
    <view class="title">zx-select-v2 虚拟化选择器</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="select-container">
        <zx-select-v2
          v-model="basicValue"
          :options="basicOptions"
          placeholder="请选择"
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 不同尺寸 -->
    <view class="section">
      <view class="section-title">不同尺寸</view>
      <view class="select-container">
        <zx-select-v2
          v-model="sizeValue"
          :options="basicOptions"
          placeholder="大号"
          size="large"
          style="width: 100%; margin-bottom: 20rpx;"
        />
        <zx-select-v2
          v-model="sizeValue"
          :options="basicOptions"
          placeholder="默认"
          style="width: 100%; margin-bottom: 20rpx;"
        />
        <zx-select-v2
          v-model="sizeValue"
          :options="basicOptions"
          placeholder="小号"
          size="small"
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 多选 -->
    <view class="section">
      <view class="section-title">多选模式</view>
      <view class="select-container">
        <zx-select-v2
          v-model="multipleValue"
          :options="basicOptions"
          placeholder="请选择多个选项"
          multiple
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 多选并折叠标签 -->
    <view class="section">
      <view class="section-title">折叠标签</view>
      <view class="select-container">
        <zx-select-v2
          v-model="collapseValue"
          :options="basicOptions"
          placeholder="请选择多个选项"
          multiple
          collapse-tags
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 可过滤 -->
    <view class="section">
      <view class="section-title">可过滤</view>
      <view class="select-container">
        <zx-select-v2
          v-model="filterValue"
          :options="manyOptions"
          placeholder="请选择"
          filterable
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 可过滤多选 -->
    <view class="section">
      <view class="section-title">可过滤多选</view>
      <view class="select-container">
        <zx-select-v2
          v-model="filterMultipleValue"
          :options="manyOptions"
          placeholder="请选择多个选项"
          multiple
          filterable
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 禁用状态 -->
    <view class="section">
      <view class="section-title">禁用状态</view>
      <view class="select-container">
        <zx-select-v2
          v-model="disabledValue"
          :options="basicOptions"
          placeholder="禁用选择器"
          disabled
          style="width: 100%; margin-bottom: 20rpx;"
        />
        <zx-select-v2
          v-model="disabledOptionValue"
          :options="disabledOptions"
          placeholder="带禁用选项的选择器"
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 分组 -->
    <view class="section">
      <view class="section-title">选项分组</view>
      <view class="select-container">
        <zx-select-v2
          v-model="groupValue"
          :options="groupOptions"
          placeholder="请选择"
          group-key="options"
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 可清空 -->
    <view class="section">
      <view class="section-title">可清空选择器</view>
      <view class="select-container">
        <zx-select-v2
          v-model="clearableValue"
          :options="basicOptions"
          placeholder="请选择"
          clearable
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 创建选项 -->
    <view class="section">
      <view class="section-title">创建新选项</view>
      <view class="select-container">
        <zx-select-v2
          v-model="createValue"
          :options="createOptions"
          placeholder="请输入或选择"
          filterable
          allow-create
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 远程搜索 -->
    <view class="section">
      <view class="section-title">远程搜索</view>
      <view class="select-container">
        <zx-select-v2
          v-model="remoteValue"
          :options="remoteOptions"
          placeholder="请输入关键词搜索"
          filterable
          remote
          :loading="remoteLoading"
          :remote-method="remoteSearch"
          style="width: 100%;"
        />
      </view>
    </view>
    
    <!-- 选择结果 -->
    <view class="result-section">
      <view class="section-title">选择结果</view>
      <view class="result-container">
        <view v-if="Object.keys(allResults).length === 0" class="no-result">暂无选择结果</view>
        <view v-else class="result-list">
          <view 
            v-for="(value, key) in allResults" 
            :key="key" 
            class="result-item"
          >
            <text class="result-label">{{ key }}:</text>
            <text class="result-value">{{ JSON.stringify(value) }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// 基础选择器
const basicValue = ref('');
const basicOptions = ref([]);

// 初始化选项数据 - 模拟大量数据
for (let i = 0; i < 1000; i++) {
  basicOptions.value.push({
    value: `option-${i}`,
    label: `选项 ${i}`,
  });
}

// 尺寸选择器
const sizeValue = ref('');

// 多选选择器
const multipleValue = ref([]);

// 折叠标签
const collapseValue = ref([]);

// 可过滤选择器
const filterValue = ref('');
const manyOptions = ref([]);

// 生成更多的选项用于过滤测试
for (let i = 0; i < 200; i++) {
  manyOptions.value.push({
    value: `filter-${i}`,
    label: `过滤选项 ${i}`,
  });
}

// 可过滤多选
const filterMultipleValue = ref([]);

// 禁用选择器
const disabledValue = ref('');
const disabledOptionValue = ref('');
const disabledOptions = ref([
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2', disabled: true },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4', disabled: true },
  { value: 'option5', label: '选项5' },
]);

// 分组选择器
const groupValue = ref('');
const groupOptions = ref([
  {
    label: '热门城市',
    options: [
      { value: 'shanghai', label: '上海' },
      { value: 'beijing', label: '北京' },
    ],
  },
  {
    label: '城市名',
    options: [
      { value: 'chengdu', label: '成都' },
      { value: 'shenzhen', label: '深圳' },
      { value: 'guangzhou', label: '广州' },
      { value: 'hangzhou', label: '杭州' },
    ],
  },
]);

// 可清空选择器
const clearableValue = ref('');

// 创建选项
const createValue = ref('');
const createOptions = ref([
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]);

// 远程搜索
const remoteValue = ref('');
const remoteOptions = ref([]);
const remoteLoading = ref(false);

// 远程搜索方法
const remoteSearch = (query) => {
  if (query) {
    remoteLoading.value = true;
    
    // 模拟异步请求
    setTimeout(() => {
      remoteOptions.value = Array.from({ length: 10 }).map((_, idx) => ({
        value: `remote-${query}-${idx}`,
        label: `${query} 结果 ${idx}`,
      }));
      remoteLoading.value = false;
    }, 1000);
  } else {
    remoteOptions.value = [];
  }
};

// 汇总所有结果
const allResults = computed(() => {
  return {
    基础选择: basicValue.value,
    尺寸选择: sizeValue.value,
    多选选择: multipleValue.value,
    折叠标签: collapseValue.value,
    可过滤: filterValue.value,
    可过滤多选: filterMultipleValue.value,
    禁用选项: disabledOptionValue.value,
    分组选择: groupValue.value,
    可清空: clearableValue.value,
    创建选项: createValue.value,
    远程搜索: remoteValue.value,
  };
});

// 监听选项变化
watch([
  basicValue,
  sizeValue,
  multipleValue,
  collapseValue,
  filterValue,
  filterMultipleValue,
  disabledOptionValue,
  groupValue,
  clearableValue,
  createValue,
  remoteValue
], () => {
  // 实际项目中可能需要在这里做一些操作
  console.log('选项变化', allResults.value);
});
</script>

<style>
.content {
  padding: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  text-align: center;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.select-container {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.05);
}

.result-section {
  margin-top: 60rpx;
}

.result-container {
  background-color: #f5f7fa;
  padding: 20rpx;
  border-radius: 8rpx;
  min-height: 150rpx;
}

.no-result {
  color: #909399;
  text-align: center;
  line-height: 150rpx;
}

.result-list {
  display: flex;
  flex-direction: column;
}

.result-item {
  display: flex;
  margin-bottom: 10rpx;
  line-height: 1.5;
}

.result-label {
  font-weight: bold;
  margin-right: 10rpx;
  min-width: 120rpx;
}

.result-value {
  flex: 1;
  word-break: break-all;
}
</style> 