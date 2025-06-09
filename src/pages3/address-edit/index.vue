<template>
  <view class="content">
    <zx-navbar title="address-edit"></zx-navbar>
    <view>
      <zx-address-edit :area-list="areaList" show-delete show-set-default show-search-result
        :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
        @delete="onDelete" @change-detail="onChangeDetail" />
    </view>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import zxAddressEdit from '@tanzhenxing/zx-address-edit/zx-address-edit.vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';
//import zxAddressEdit from '../../../component/zxui/zx-address-edit/zx-address-edit.vue';

const { proxy } = getCurrentInstance();


const areaList = ref(null);

const searchResult = ref([]);

onLoad(async () => {
  await getAreaList();
})

const getAreaList = async () => {
  const res = await proxy.$request.get('/json/area.json', {}, {
    baseUrl: 'https://cdn.mp.ac.cn'
  });
  areaList.value = res;
}

const onSave = (info) => {
  console.log('save', info);
  uni.showToast({ title: '保存成功', icon: 'none' });
};

const onDelete = (info) => {
  console.log('delete', info);
  uni.showToast({ title: '删除成功', icon: 'none' });
};

const onChangeDetail = (val) => {
  console.log('changeDetail', val);
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区',
      },
    ];
  } else {
    searchResult.value = [];
  }
};


</script>

<style lang="scss" scoped>
.content {
  padding: 20rpx;
}
</style>