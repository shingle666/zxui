<template>
  <view class="container">
    <view class="page-section">
      <view class="page-section-title">水平菜单</view>
      <zx-menu
        mode="horizontal"
        default-active="1"
        background-color="#ffffff"
        text-color="#303133"
        active-text-color="#409EFF"
        @select="handleSelect"
      >
        <zx-menu-item index="1">处理中心</zx-menu-item>
        <zx-submenu index="2">
          <template #title>工作台</template>
          <zx-menu-item index="2-1">选项1</zx-menu-item>
          <zx-menu-item index="2-2">选项2</zx-menu-item>
          <zx-menu-item index="2-3">选项3</zx-menu-item>
          <zx-submenu index="2-4">
            <template #title>选项4</template>
            <zx-menu-item index="2-4-1">选项4-1</zx-menu-item>
            <zx-menu-item index="2-4-2">选项4-2</zx-menu-item>
            <zx-menu-item index="2-4-3">选项4-3</zx-menu-item>
          </zx-submenu>
        </zx-submenu>
        <zx-menu-item index="3" disabled>消息中心</zx-menu-item>
        <zx-menu-item index="4">订单管理</zx-menu-item>
      </zx-menu>
    </view>

    <view class="page-section">
      <view class="page-section-title">垂直菜单</view>
      <zx-menu
        default-active="1"
        background-color="#ffffff"
        text-color="#303133"
        active-text-color="#409EFF"
        @select="handleSelect"
      >
        <zx-menu-item index="1">处理中心</zx-menu-item>
        <zx-submenu index="2">
          <template #title>工作台</template>
          <zx-menu-item-group title="分组一">
            <zx-menu-item index="2-1">选项1</zx-menu-item>
            <zx-menu-item index="2-2">选项2</zx-menu-item>
          </zx-menu-item-group>
          <zx-menu-item-group title="分组二">
            <zx-menu-item index="2-3">选项3</zx-menu-item>
          </zx-menu-item-group>
          <zx-submenu index="2-4">
            <template #title>选项4</template>
            <zx-menu-item index="2-4-1">选项4-1</zx-menu-item>
            <zx-menu-item index="2-4-2">选项4-2</zx-menu-item>
            <zx-menu-item index="2-4-3">选项4-3</zx-menu-item>
          </zx-submenu>
        </zx-submenu>
        <zx-menu-item index="3" disabled>消息中心</zx-menu-item>
        <zx-menu-item index="4">订单管理</zx-menu-item>
      </zx-menu>
    </view>

    <view class="page-section">
      <view class="page-section-title">带路由的菜单</view>
      <zx-menu
        default-active="1"
        background-color="#ffffff"
        text-color="#303133"
        active-text-color="#409EFF"
        @select="handleSelect"
      >
        <zx-menu-item index="1" route="/pages/index/index">首页</zx-menu-item>
        <zx-menu-item index="2" route="/pages/components/index">组件</zx-menu-item>
        <zx-menu-item index="3" route="/pages/about/index">关于</zx-menu-item>
      </zx-menu>
    </view>

    <view class="page-section">
      <view class="page-section-title">折叠菜单</view>
      <button @tap="toggleCollapse" type="primary" size="mini">切换折叠</button>
      <view style="margin-top: 10px;"></view>
      <zx-menu
        default-active="1"
        background-color="#ffffff"
        text-color="#303133"
        active-text-color="#409EFF"
        :collapse="isCollapse"
      >
        <zx-menu-item index="1">
          <view class="menu-icon-container">
            <text class="uni-icons uni-icons-home"></text>
            <text v-if="!isCollapse">首页</text>
          </view>
        </zx-menu-item>
        <zx-menu-item index="2">
          <view class="menu-icon-container">
            <text class="uni-icons uni-icons-gear"></text>
            <text v-if="!isCollapse">设置</text>
          </view>
        </zx-menu-item>
        <zx-menu-item index="3">
          <view class="menu-icon-container">
            <text class="uni-icons uni-icons-info"></text>
            <text v-if="!isCollapse">关于</text>
          </view>
        </zx-menu-item>
      </zx-menu>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 折叠状态
const isCollapse = ref(false);

// 切换折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

// 菜单选择事件处理
const handleSelect = (index, indexPath, item) => {
  console.log('选中的菜单项:', index);
  console.log('菜单路径:', indexPath);
  console.log('菜单项对象:', item);
};
</script>

<style>
.container {
  padding: 20px;
}

.page-section {
  margin-bottom: 30px;
}

.page-section-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.menu-icon-container {
  display: flex;
  align-items: center;
}

.menu-icon-container text {
  margin-right: 5px;
}
</style> 