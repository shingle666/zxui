<template>
  <view class="container">
    <view class="content">
      <zx-title type="line" title="基础用法"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">添加联系人</text>
          <zx-contact-card type="add" @click="onAdd" />
        </view>
        
        <view class="demo-item">
          <text class="demo-label">编辑联系人</text>
          <zx-contact-card 
            type="edit" 
            name="张三" 
            tel="13000000000" 
            @click="onEdit" 
          />
        </view>
      </view>

      <zx-title type="line" title="不可编辑"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <zx-contact-card 
            type="edit" 
            name="李四" 
            tel="13100000000" 
            :editable="false" 
          />
        </view>
      </view>

      <zx-title type="line" title="自定义文案"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <zx-contact-card 
            type="add" 
            add-text="选择联系人" 
            @click="onSelectContact" 
          />
        </view>
        
        <view class="demo-item">
          <zx-contact-card 
            type="add" 
            add-text="添加紧急联系人" 
            @click="onAddEmergency" 
          />
        </view>
      </view>

      <zx-title type="line" title="自定义样式"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">大图标</text>
          <zx-contact-card 
            type="add" 
            icon-size="50rpx"
            add-icon-color="#ff6b6b"
            @click="onAdd" 
          />
        </view>
        
        <view class="demo-item">
          <text class="demo-label">自定义颜色</text>
          <zx-contact-card 
            type="edit" 
            name="王五" 
            tel="13200000000" 
            icon-color="#52c41a"
            arrow-color="#52c41a"
            @click="onEdit" 
          />
        </view>
      </view>

      <zx-title type="line" title="完整信息展示"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <zx-contact-card 
            type="edit" 
            name="赵小明" 
            tel="13300000000" 
            @click="onEditContact" 
          />
        </view>
        
        <view class="demo-item">
          <zx-contact-card 
            type="edit" 
            name="钱小红" 
            tel="13400000000" 
            @click="onEditContact" 
          />
        </view>
        
        <view class="demo-item">
          <zx-contact-card 
            type="edit" 
            name="孙小华" 
            tel="13500000000" 
            @click="onEditContact" 
          />
        </view>
      </view>

      <zx-title type="line" title="列表模式"></zx-title>
      <view class="demo-section">
        <view class="contact-list">
          <zx-contact-card 
            v-for="contact in contactList" 
            :key="contact.id"
            type="edit" 
            :name="contact.name" 
            :tel="contact.tel" 
            @click="() => onSelectFromList(contact)" 
          />
          <zx-contact-card 
            type="add" 
            add-text="添加新联系人" 
            @click="onAddToList" 
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import zxTitle from '@tanzhenxing/zx-title/zx-title.vue'
import zxContactCard from '@tanzhenxing/zx-contact-card/zx-contact-card.vue'

// 联系人列表数据
const contactList = ref([
  {
    id: 1,
    name: '张三',
    tel: '13000000000'
  },
  {
    id: 2,
    name: '李四',
    tel: '13100000000'
  },
  {
    id: 3,
    name: '王五',
    tel: '13200000000'
  }
])

// 添加联系人
function onAdd() {
  uni.showToast({
    title: '添加联系人',
    icon: 'none'
  })
}

// 编辑联系人
function onEdit() {
  uni.showToast({
    title: '编辑联系人',
    icon: 'none'
  })
}

// 选择联系人
function onSelectContact() {
  uni.showToast({
    title: '选择联系人',
    icon: 'none'
  })
}

// 添加紧急联系人
function onAddEmergency() {
  uni.showToast({
    title: '添加紧急联系人',
    icon: 'none'
  })
}

// 编辑联系人详情
function onEditContact() {
  uni.showToast({
    title: '编辑联系人详情',
    icon: 'none'
  })
}

// 从列表中选择联系人
function onSelectFromList(contact) {
  uni.showToast({
    title: `选择了 ${contact.name}`,
    icon: 'none'
  })
}

// 添加到列表
function onAddToList() {
  const newContact = {
    id: contactList.value.length + 1,
    name: `新联系人${contactList.value.length + 1}`,
    tel: `1${(3000000000 + contactList.value.length).toString()}`
  }
  contactList.value.push(newContact)
  
  uni.showToast({
    title: '添加成功',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20rpx;
}

.demo-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.demo-item {
  margin-bottom: 20rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 16rpx;
  font-weight: 500;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
</style>