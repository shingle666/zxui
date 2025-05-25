<template>
  <view class="page" @click="handlePageClick">

    <view class="example-section">
      <view class="example-section__title">基础用法</view>
      <view class="example-section__content">
        <zx-dropdown ref="dropdownRef1">
          <view class="dropdown-link">
            下拉菜单
            <zx-icon name="arrow-down" size="14" style="margin-left: 5px;"></zx-icon>
          </view>
          <template #dropdown>
            <zx-dropdown-menu>
              <zx-dropdown-item command="a">选项1</zx-dropdown-item>
              <zx-dropdown-item command="b">选项2</zx-dropdown-item>
              <zx-dropdown-item command="c">选项3</zx-dropdown-item>
              <zx-dropdown-item command="d" disabled>选项4</zx-dropdown-item>
              <zx-dropdown-item command="e" divided>选项5</zx-dropdown-item>
            </zx-dropdown-menu>
          </template>
        </zx-dropdown>
      </view>
    </view>
    
    <view class="example-section">
      <view class="example-section__title">点击触发</view>
      <view class="example-section__content">
        <view class="flex-row">
          <zx-dropdown trigger="click" ref="dropdownRef3">
            <view class="dropdown-link">
              点击展开菜单
              <zx-icon name="arrow-down" size="14" style="margin-left: 5px;"></zx-icon>
            </view>
            <template #dropdown>
              <zx-dropdown-menu>
                <zx-dropdown-item command="a">选项1</zx-dropdown-item>
                <zx-dropdown-item command="b">选项2</zx-dropdown-item>
                <zx-dropdown-item command="c">选项3</zx-dropdown-item>
              </zx-dropdown-menu>
            </template>
          </zx-dropdown>
        </view>
      </view>
    </view>
    
    <view class="example-section">
      <view class="example-section__title">菜单位置</view>
      <view class="example-section__content">
        <view class="placement-grid">
          <view class="placement-grid-row">
            <zx-dropdown placement="top-start" ref="dropdownRef4">
              <view class="dropdown-btn">上左</view>
              <template #dropdown>
                <zx-dropdown-menu>
                  <zx-dropdown-item command="a">选项1</zx-dropdown-item>
                  <zx-dropdown-item command="b">选项2</zx-dropdown-item>
                  <zx-dropdown-item command="c">选项3</zx-dropdown-item>
                </zx-dropdown-menu>
              </template>
            </zx-dropdown>
            
            <zx-dropdown placement="top" ref="dropdownRef5">
              <view class="dropdown-btn">上中</view>
              <template #dropdown>
                <zx-dropdown-menu>
                  <zx-dropdown-item command="a">选项1</zx-dropdown-item>
                  <zx-dropdown-item command="b">选项2</zx-dropdown-item>
                  <zx-dropdown-item command="c">选项3</zx-dropdown-item>
                </zx-dropdown-menu>
              </template>
            </zx-dropdown>
            
            <zx-dropdown placement="top-end" ref="dropdownRef6">
              <view class="dropdown-btn">上右</view>
              <template #dropdown>
                <zx-dropdown-menu>
                  <zx-dropdown-item command="a">选项1</zx-dropdown-item>
                  <zx-dropdown-item command="b">选项2</zx-dropdown-item>
                  <zx-dropdown-item command="c">选项3</zx-dropdown-item>
                </zx-dropdown-menu>
              </template>
            </zx-dropdown>
          </view>
          
          <view class="placement-grid-row">
            <zx-dropdown placement="bottom-start" ref="dropdownRef7">
              <view class="dropdown-btn">下左</view>
              <template #dropdown>
                <zx-dropdown-menu>
                  <zx-dropdown-item command="a">选项1</zx-dropdown-item>
                  <zx-dropdown-item command="b">选项2</zx-dropdown-item>
                  <zx-dropdown-item command="c">选项3</zx-dropdown-item>
                </zx-dropdown-menu>
              </template>
            </zx-dropdown>
            
            <zx-dropdown placement="bottom" ref="dropdownRef8">
              <view class="dropdown-btn">下中</view>
              <template #dropdown>
                <zx-dropdown-menu>
                  <zx-dropdown-item command="a">选项1</zx-dropdown-item>
                  <zx-dropdown-item command="b">选项2</zx-dropdown-item>
                  <zx-dropdown-item command="c">选项3</zx-dropdown-item>
                </zx-dropdown-menu>
              </template>
            </zx-dropdown>
            
            <zx-dropdown placement="bottom-end" ref="dropdownRef9">
              <view class="dropdown-btn">下右</view>
              <template #dropdown>
                <zx-dropdown-menu>
                  <zx-dropdown-item command="a">选项1</zx-dropdown-item>
                  <zx-dropdown-item command="b">选项2</zx-dropdown-item>
                  <zx-dropdown-item command="c">选项3</zx-dropdown-item>
                </zx-dropdown-menu>
              </template>
            </zx-dropdown>
          </view>
        </view>
      </view>
    </view>
    
    <view class="example-section">
      <view class="example-section__title">禁用状态</view>
      <view class="example-section__content">
        <zx-dropdown disabled ref="dropdownRef10">
          <view class="dropdown-link">
            禁用状态
            <zx-icon name="arrow-down" size="14" style="margin-left: 5px;"></zx-icon>
          </view>
          <template #dropdown>
            <zx-dropdown-menu>
              <zx-dropdown-item command="a">选项1</zx-dropdown-item>
              <zx-dropdown-item command="b">选项2</zx-dropdown-item>
              <zx-dropdown-item command="c">选项3</zx-dropdown-item>
            </zx-dropdown-menu>
          </template>
        </zx-dropdown>
      </view>
    </view>
    
    <view class="example-section">
      <view class="example-section__title">事件处理</view>
      <view class="example-section__content">
        <zx-dropdown @command="handleCommand" ref="dropdownRef11">
          <view class="dropdown-link">
            点击选项
            <zx-icon name="arrow-down" size="14" style="margin-left: 5px;"></zx-icon>
          </view>
          <template #dropdown>
            <zx-dropdown-menu>
              <zx-dropdown-item command="view">查看</zx-dropdown-item>
              <zx-dropdown-item command="edit">编辑</zx-dropdown-item>
              <zx-dropdown-item command="delete">删除</zx-dropdown-item>
            </zx-dropdown-menu>
          </template>
        </zx-dropdown>
        
        <view class="command-result" v-if="lastCommand">
          上次点击的命令: {{ lastCommand }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const lastCommand = ref('')
const dropdownRefs = [
  ref(null), ref(null), ref(null), ref(null), ref(null), 
  ref(null), ref(null), ref(null), ref(null), ref(null)
]

const handleCommand = (command) => {
  lastCommand.value = command
  uni.showToast({
    title: `点击了: ${command}`,
    icon: 'none'
  })
}

// 处理页面点击事件，关闭所有下拉菜单
const handlePageClick = (event) => {
  // 阻止事件冒泡，防止触发父组件的点击事件
  event.stopPropagation()
  
  // 关闭所有下拉菜单
  dropdownRefs.forEach(ref => {
    if (ref.value) {
      ref.value.handleClose()
    }
  })
}
</script>

<style>
.page {
  padding: 15px;
}

.example-section {
  margin-bottom: 30px;
}

.example-section__title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.example-section__content {
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
}

.dropdown-link {
  display: flex;
  align-items: center;
  color: #409eff;
  cursor: pointer;
}

.dropdown-btn {
  display: inline-block;
  padding: 8px 15px;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  margin: 5px;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.placement-grid {
  display: flex;
  flex-direction: column;
}

.placement-grid-row {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.command-result {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
}
</style> 