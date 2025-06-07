<template>
  <view class="container">
    <zx-navbar title="ContactList 联系人列表"></zx-navbar>
    <zx-contact-list
      :list="list"
      v-model="chosenContactId"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxContactList from '@tanzhenxing/zx-contact-list/zx-contact-list.vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';

const chosenContactId = ref('1');
const list = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '13100000000',
  },
  {
    id: '3',
    name: '王五',
    tel: '13200000000',
  },
]);

const showToast = (title) => {
  uni.showToast({
    title: title,
    icon: 'none'
  });
}

const onAdd = () => {
  showToast('新增联系人');
  // Navigate to add contact page or show a modal
  // uni.navigateTo({ url: '/pages/contact-edit/index' });
};

const onEdit = (contact, index) => {
  showToast(`编辑联系人：${contact.name} (ID: ${contact.id}, Index: ${index})`);
  // Navigate to edit contact page or show a modal
  // uni.navigateTo({ url: `/pages/contact-edit/index?id=${contact.id}` });
};

const onSelect = (contact, index) => {
  showToast(`选择了联系人：${contact.name} (ID: ${contact.id}, Index: ${index})`);
  chosenContactId.value = contact.id;
};

</script>

<style lang="scss" scoped>
.container {
  // padding: 20rpx;
  // background-color: #f7f8fa;
  min-height: 100vh; // Ensure the container takes full height
  box-sizing: border-box;
}
</style>