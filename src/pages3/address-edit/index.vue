<template>
  <view class="content">
    <zx-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
// import { showToast } from 'vant'; // uni-app中没有vant的showToast，需要替换为uni.showToast

// 模拟省市区数据，实际项目中应从后端获取或使用静态数据
const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  city_list: {
    110100: '北京市',
    120100: '天津市'
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    120101: '和平区',
    120102: '河东区'
  }
};

const searchResult = ref([]);

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