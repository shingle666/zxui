<template>
  <view class="container">
    <zx-navbar title="InvoiceTitleList 发票抬头列表"></zx-navbar>
    <view class="content">
      <zx-title type="line" title="基础用法"></zx-title>
      <zx-invoice-title-list
        v-model="chosenInvoiceId"
        :list="invoiceList"
        @add="onAdd"
        @edit="onEdit"
        @delete="onDelete"
        @select="onSelect"
        @click-item="onClickItem"
      />

      <zx-title type="line" title="多选模式"></zx-title>
      <zx-invoice-title-list
        v-model="chosenInvoiceIds"
        :list="invoiceList2"
        :multiple="true"
        add-button-text="批量管理"
        @add="onAddMulti"
        @edit="onEditMulti"
        @select="onSelectMulti"
      />

      <zx-title type="line" title="隐藏操作按钮"></zx-title>
      <zx-invoice-title-list
        v-model="chosenInvoiceId2"
        :list="invoiceList"
        :hide-edit="true"
        :hide-delete="true"
        right-icon="arrow"
        @right-icon-click="onRightIconClick"
      />

      <zx-title type="line" title="只读模式"></zx-title>
      <zx-invoice-title-list
        v-model="chosenInvoiceId3"
        :list="readonlyList"
        :hide-edit="true"
        :hide-delete="true"
        :hide-add="true"
      />

      <zx-title type="line" title="自定义内容"></zx-title>
      <zx-invoice-title-list
        v-model="chosenInvoiceId4"
        :list="customList"
      >
        <template #tag="{ item }">
          <zx-tag v-if="item.id === '1'" type="success" size="mini">企业</zx-tag>
          <zx-tag v-else-if="item.id === '2'" type="warning" size="mini">个体</zx-tag>
        </template>
        
        <template #item-content="{ item }">
          <view style="font-size: 24rpx; color: #999; margin-top: 8rpx;" v-if="item.createTime">
            创建时间: {{ formatDate(item.createTime) }}
          </view>
          <view style="font-size: 24rpx; color: #999; margin-top: 4rpx;" v-if="item.address">
            地址: {{ item.address }}
          </view>
        </template>
        
        <template #bottom>
          <view style="text-align: center; padding: 20rpx; color: #999; font-size: 24rpx; background-color: #f7f8fa;">
            最多可添加10个发票抬头
          </view>
        </template>
      </zx-invoice-title-list>

      <zx-title type="line" title="空状态"></zx-title>
      <zx-invoice-title-list
        v-model="emptyValue"
        :list="[]"
        @add="onAddEmpty"
      >
        <template #empty>
          <view style="text-align: center; padding: 80rpx 32rpx; color: #999;">
            <zx-icon name="file-text" size="96rpx" color="#ddd" />
            <view style="margin-top: 20rpx; font-size: 28rpx;">暂无发票抬头</view>
            <view style="margin-top: 8rpx; font-size: 24rpx;">点击下方按钮添加发票抬头</view>
          </view>
        </template>
      </zx-invoice-title-list>

      <zx-title type="line" title="禁用状态"></zx-title>
      <zx-invoice-title-list
        v-model="disabledValue"
        :list="disabledList"
        @select="onSelectDisabled"
      />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const chosenInvoiceId = ref('1');
const invoiceList = ref([
  {
    id: '1',
    title: '个人',
    type: 'normal',
    taxNumber: '',
    isDefault: true,
  },
  {
    id: '2',
    title: '北京某某科技有限公司',
    type: 'special',
    taxNumber: '91110000123456789X',
  },
  {
    id: '3',
    title: '上海某某贸易有限公司',
    type: 'electronic',
    taxNumber: '91310000987654321Y',
  },
]);

// 多选模式
const chosenInvoiceIds = ref(['1']);
const invoiceList2 = ref([
  {
    id: '1',
    title: '个人发票',
    type: 2,
    isDefault: true,
  },
  {
    id: '2',
    title: '公司发票A',
    type: 1,
    taxNumber: '91110000111111111A',
  },
  {
    id: '3',
    title: '公司发票B',
    type: 3,
    taxNumber: '91110000222222222B',
  },
]);

// 隐藏操作按钮
const chosenInvoiceId2 = ref('2');

// 只读模式
const chosenInvoiceId3 = ref('1');
const readonlyList = ref([
  {
    id: '1',
    title: '默认发票抬头',
    type: 'normal',
    isDefault: true,
  },
  {
    id: '2',
    title: '企业发票抬头',
    type: 'special',
    taxNumber: '91110000123456789X',
  },
]);

// 自定义内容
const chosenInvoiceId4 = ref('1');
const customList = ref([
  {
    id: '1',
    title: '北京科技有限公司',
    type: 'special',
    taxNumber: '91110000123456789X',
    createTime: '2024-01-15',
    address: '北京市朝阳区建国路100号',
    isDefault: true,
  },
  {
    id: '2',
    title: '张三个体工商户',
    type: 'normal',
    taxNumber: '92110000123456789Y',
    createTime: '2024-01-10',
    address: '北京市海淀区中关村大街1号',
  },
]);

// 空状态
const emptyValue = ref('');

// 禁用状态
const disabledValue = ref('1');
const disabledList = ref([
  {
    id: '1',
    title: '可用发票抬头',
    type: 'normal',
    isDefault: true,
  },
  {
    id: '2',
    title: '已禁用的发票抬头',
    type: 'special',
    taxNumber: '91110000123456789X',
    disabled: true,
  },
]);

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 事件处理函数
const onAdd = () => {
  console.log('添加发票抬头');
  uni.showToast({
    title: '跳转到添加页面',
    icon: 'none'
  });
};

const onEdit = (item, index) => {
  console.log('编辑发票抬头', item, index);
  uni.showToast({
    title: `编辑: ${item.title}`,
    icon: 'none'
  });
};

const onDelete = (item, index) => {
  console.log('删除发票抬头', item, index);
  uni.showModal({
    title: '确认删除',
    content: `确定要删除发票抬头"${item.title}"吗？`,
    success: (res) => {
      if (res.confirm) {
        invoiceList.value.splice(index, 1);
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        });
      }
    }
  });
};

const onSelect = (item, index) => {
  console.log('选择发票抬头', item, index);
  uni.showToast({
    title: `已选择: ${item.title}`,
    icon: 'none'
  });
};

const onClickItem = (item, index) => {
  console.log('点击发票抬头项', item, index);
};

// 多选模式事件
const onAddMulti = () => {
  console.log('多选模式添加');
  uni.showToast({
    title: '批量管理模式',
    icon: 'none'
  });
};

const onEditMulti = (item, index) => {
  console.log('多选模式编辑', item, index);
  uni.showToast({
    title: `编辑: ${item.title}`,
    icon: 'none'
  });
};

const onSelectMulti = (item, index) => {
  console.log('多选模式选择', item, index);
  const selectedCount = chosenInvoiceIds.value.length;
  uni.showToast({
    title: `已选择 ${selectedCount} 项`,
    icon: 'none'
  });
};

// 右侧图标点击
const onRightIconClick = (item, index) => {
  console.log('右侧图标点击', item, index);
  uni.showToast({
    title: `查看详情: ${item.title}`,
    icon: 'none'
  });
};

// 空状态添加
const onAddEmpty = () => {
  console.log('空状态添加');
  uni.showToast({
    title: '添加第一个发票抬头',
    icon: 'none'
  });
};

// 禁用状态选择
const onSelectDisabled = (item, index) => {
  console.log('禁用状态选择', item, index);
  if (item.disabled) {
    uni.showToast({
      title: '该发票抬头已禁用',
      icon: 'none'
    });
  } else {
    uni.showToast({
      title: `选择: ${item.title}`,
      icon: 'none'
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding-bottom: 40rpx;
}

.zx-title {
  margin-top: 40rpx;
  margin-bottom: 20rpx;
}
</style>