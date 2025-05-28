<template>
  <view class="container">
    <zx-title title="基础用法"></zx-title>
    <view style="height: 400px; margin: 20rpx;">
      <zx-table-v2
        :columns="columns"
        :data="basicData"
        :width="710"
        :height="400"
        fixed
        border
        stripe
      />
    </view>

    <zx-title title="自定义单元格"></zx-title>
    <view style="height: 300px; margin: 20rpx;">
      <zx-table-v2
        :columns="customRenderColumns"
        :data="customData"
        :width="710"
        :height="300"
        :row-height="60"
        fixed
      />
    </view>

    <zx-title title="大量数据 (10000条)"></zx-title>
    <view style="height: 500px; margin: 20rpx;">
      <zx-table-v2
        :columns="columns"
        :data="largeData"
        :width="710"
        :height="500"
        fixed
        show-scrollbar
      />
    </view>

    <zx-title title="空数据状态"></zx-title>
    <view style="height: 200px; margin: 20rpx;">
      <zx-table-v2
        :columns="columns"
        :data="emptyData"
        :width="710"
        :height="200"
        fixed
        empty-text="这里什么都没有哦~"
      />
    </view>

    <zx-title title="加载中状态"></zx-title>
    <view style="height: 200px; margin: 20rpx;">
      <zx-table-v2
        :columns="columns"
        :data="emptyData" 
        :width="710"
        :height="200"
        fixed
        loading
      />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';

const columns = ref([
  { key: 'id', dataKey: 'id', title: 'ID', width: 100, align: 'center' },
  { key: 'name', dataKey: 'name', title: '姓名', width: 150 },
  { key: 'job', dataKey: 'job', title: '职业', width: 180 },
  { key: 'age', dataKey: 'age', title: '年龄', width: 80, align: 'right' },
  { key: 'city', dataKey: 'city', title: '城市', width: 150 },
]);

const basicData = ref([]);
const customData = ref([]);
const largeData = ref([]);
const emptyData = ref([]);

const generateData = (count) => {
  const data = [];
  const jobs = ['工程师', '设计师', '产品经理', '运营', '测试', '前端开发', '后端开发', '数据分析师'];
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'];
  for (let i = 0; i < count; i++) {
    data.push({
      id: `user-${i + 1}`,
      name: `用户 ${i + 1}`,
      job: jobs[Math.floor(Math.random() * jobs.length)],
      age: Math.floor(Math.random() * 40) + 20,
      city: cities[Math.floor(Math.random() * cities.length)],
      desc: `这是一段关于用户 ${i + 1} 的描述信息，可能会比较长。`,
    });
  }
  return data;
};

const customRenderColumns = ref([
  { 
    key: 'name',
    dataKey: 'name',
    title: '姓名 (自定义)', 
    width: 200,
    renderCell: ({ row }) => {
      // 在 uniapp 中，h 函数通常用于更底层的渲染，如果 zx-text 这样的组件可用，会更符合 uniapp 的习惯
      // return h('view', { style: { color: 'blue', fontWeight: 'bold' } }, row.name);
      // 尝试使用 template string 或更 uniapp 化的方式，如果 h 不被直接支持或引起问题
      // 这里暂时保持 h, 但实际项目中可能需要调整为 uniapp 支持的渲染方式
      return h('text', { style: 'color: blue; font-weight: bold;' }, row.name);
    }
  },
  {
    key: 'action',
    title: '操作',
    width: 250,
    align: 'center',
    renderCell: ({ row }) => {
      // 同样，这里的 h(zxButton, ...) 依赖于 zxButton 的实现和 h 的上下文
      // 如果 zxButton 是一个标准 uniapp 组件，通常通过 <zx-button> 标签使用
      // 在 render 函数中动态创建组件实例可能需要特殊处理或 vue 的 render API 支持
      // 为了简单起见，这里假设 h 和组件能够按预期工作
      // 如果不行，自定义渲染单元格可能需要返回一个包含特定 class 的 view/text，然后在 template 中用 v-if/v-for 和 slot 实现
      const editButton = h('button', { 
          // uniapp 的 button 可能不支持直接的 style prop, class 会更好
          // class: 'custom-action-button primary',
          style: 'margin-right: 5px; padding: 2px 5px; font-size: 12px; background-color: #007bff; color: white; border: none; border-radius: 3px;',
          onClick: () => handleEdit(row) 
      }, '编辑');
      const deleteButton = h('button', { 
          // class: 'custom-action-button danger',
          style: 'padding: 2px 5px; font-size: 12px; background-color: #dc3545; color: white; border: none; border-radius: 3px;',
          onClick: () => handleDelete(row) 
      }, '删除');
      return h('view', { style: 'display: flex; justify-content: center; align-items: center;' }, [editButton, deleteButton]);
    }
  },
  { key: 'job', dataKey: 'job', title: '职业', width: 150 },
]);

const handleEdit = (row) => {
  uni.showToast({ title: `编辑: ${row.name}`, icon: 'none' });
  console.log('Edit:', row);
};

const handleDelete = (row) => {
  uni.showToast({ title: `删除: ${row.name}`, icon: 'none' });
  console.log('Delete:', row);
  // 实际项目中，这里会调用接口删除数据，并更新列表
  // basicData.value = basicData.value.filter(item => item.id !== row.id);
  // customData.value = customData.value.filter(item => item.id !== row.id);
};

onMounted(() => {
  basicData.value = generateData(20);
  customData.value = generateData(5);
  
  // 模拟异步加载大量数据
  setTimeout(() => {
    largeData.value = generateData(10000);
  }, 1000);
});

</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50rpx;
}

// 如果 h 函数中的 style prop 不生效，可以定义 class 并在这里写样式
.custom-action-button {
  padding: 2px 5px;
  font-size: 12px;
  border: none;
  border-radius: 3px;
  color: white;
  margin: 0 2px; // 示例间距
}
.primary {
  background-color: #007bff;
}
.danger {
  background-color: #dc3545;
}
</style>