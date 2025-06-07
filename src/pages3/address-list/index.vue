<template>
  <view class="container">
    <zx-navbar title="AddressList 地址列表"></zx-navbar>
    <view class="content">
      <zx-title type="line" title="基础用法"></zx-title>
      <zx-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
        @click-item="onClickItem"
        @edit-disabled="onEditDisabled"
        @select-disabled="onSelectDisabled"
      />

      <zx-title type="line" title="多选模式"></zx-title>
      <zx-address-list
        v-model="chosenAddressIds"
        :list="list2"
        add-button-text="去结算"
        @add="onAddMulti"
        @edit="onEditMulti"
        @select="onSelectMulti"
      />

      <zx-title type="line" title="自定义右侧图标"></zx-title>
      <zx-address-list
        v-model="chosenAddressId2"
        :list="list"
        right-icon="arrow"
        @add="onAdd"
        @edit="onEdit"
      />

      <zx-title type="line" title="自定义内容"></zx-title>
      <zx-address-list v-model="chosenAddressId3" :list="list">
        <template #tag="{ item }">
          <zx-tag v-if="item.id === '1'" type="success" size="mini">公司</zx-tag>
        </template>
        <template #item-bottom="{ item, disabled }">
          <view style="font-size: 12px; color: #999; padding: 5px 15px 0;">
            最后编辑于: {{ new Date().toLocaleDateString() }} ({{ disabled ? '不可选' : '可选' }})
          </view>
        </template>
        <template #default>
          <view style="text-align: center; padding: 10px; color: #999; font-size: 12px;">
            没有更多地址了
          </view>
        </template>
      </zx-address-list>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import ZxAddressList from '@tanzhenxing/zx-address-list/zx-address-list.vue';
import ZxTitle from '@tanzhenxing/zx-title/zx-title.vue';
import ZxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';
import ZxTag from '@tanzhenxing/zx-tag/zx-tag.vue';


const chosenAddressId = ref('1');
const chosenAddressIds = ref(['1']);
const chosenAddressId2 = ref('2');
const chosenAddressId3 = ref('1');

const list = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '13100000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号',
  },
]);

const list2 = ref([
  {
    id: '1',
    name: '王小明',
    tel: '18000000000',
    address: '北京市朝阳区建国路100号',
    isDefault: true,
  },
  {
    id: '2',
    name: '赵小红',
    tel: '18100000000',
    address: '上海市浦东新区世纪大道200号',
  },
  {
    id: '4',
    name: '孙小刚',
    tel: '18200000000',
    address: '广东省深圳市南山区科技园300号',
  },
]);

const disabledList = ref([
  {
    id: '3',
    name: '王五',
    tel: '13200000000',
    address: '浙江省杭州市滨江区江南大道 15 号',
  },
]);

const showToast = (title) => {
  uni.showToast({
    title,
    icon: 'none',
  });
};

const onAdd = () => showToast('新增地址');
const onEdit = (item, index) => showToast(`编辑地址: ${item.name} (索引: ${index})`);
const onSelect = (item, index) => showToast(`选中地址: ${item.name} (索引: ${index})`);
const onClickItem = (item, index, event) => {
  console.log('click-item', item, index, event);
  showToast(`点击了: ${item.name}`);
};
const onEditDisabled = (item, index) => showToast(`编辑禁用地址: ${item.name} (索引: ${index})`);
const onSelectDisabled = (item, index) => showToast(`选中禁用地址: ${item.name} (索引: ${index})`);

const onAddMulti = () => showToast('去结算, 选中ID: ' + chosenAddressIds.value.join(', '));
const onEditMulti = (item, index) => showToast(`多选编辑: ${item.name} (索引: ${index})`);
const onSelectMulti = (item, index) => showToast(`多选选中: ${item.name} (索引: ${index}), 当前选中: ${chosenAddressIds.value.join(', ')}`);

</script>

<style lang="scss" scoped>
.container {
  // padding-bottom: calc(50px + env(safe-area-inset-bottom)); // If using a global tabbar or fixed bottom bar
}
.content {
  padding: 0 15px 15px;
}

// Add some spacing between address list instances for better visual separation in the demo
.zx-address-list {
  margin-bottom: 20px;
}
</style>