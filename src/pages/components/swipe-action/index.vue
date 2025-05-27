<script setup>
import { ref } from 'vue'

// 右侧操作选项配置
const options1 = ref([
  {
    text: '取消',
    style: {
      backgroundColor: '#007aff'
    }
  },
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d'
    }
  }
])

// 左侧操作选项配置
const options2 = ref([
  {
    text: '置顶',
    style: {
      backgroundColor: '#ff9900'
    }
  }
])

// 滑动列表数据
const swipeList = ref([
  {
    id: '0',
    content: '列表项 1',
    options: [
      {
        text: '删除',
        style: {
          backgroundColor: '#dd524d'
        }
      }
    ]
  },
  {
    id: '1',
    content: '列表项 2',
    options: [
      {
        text: '置顶',
        style: {
          backgroundColor: '#ff9900'
        }
      },
      {
        text: '删除',
        style: {
          backgroundColor: '#dd524d'
        }
      }
    ]
  },
  {
    id: '2',
    content: '列表项 3',
    options: [
      {
        text: '标记',
        style: {
          backgroundColor: '#007aff'
        }
      },
      {
        text: '删除',
        style: {
          backgroundColor: '#dd524d'
        }
      }
    ]
  }
])

// 控制开关状态
const isOpened = ref(false)

// 绑定点击事件
function bindClick(e) {
  console.log('点击选项', e)
  uni.showToast({
    title: `${e.position} - ${e.content.text}`,
    icon: 'none'
  })
}

// 点击内容
function contentClick() {
  console.log('点击内容')
  uni.showToast({
    title: '点击内容',
    icon: 'none'
  })
}

// 状态变化
function change(e) {
  console.log('状态变化', e)
}

// 设置打开状态
function setOpened() {
  isOpened.value = !isOpened.value
}

// 列表滑动变化
function swipeChange(e, index) {
  console.log(`第 ${index + 1} 项状态变化`, e)
}

// 列表选项点击
function swipeClick(e, index) {
  console.log(`点击第 ${index + 1} 项`, e)
  uni.showToast({
    title: `${e.content.text} - ${swipeList.value[index].content}`,
    icon: 'none'
  })
}
</script>

<template>
  <view class="container">
    <view class="title">
      <text>滑动操作组件示例</text>
    </view>
    
    <view class="section">
      <view class="section-title">基本用法</view>
      <zx-swipe-action>
        <zx-swipe-action-item 
          :left-options="options2"
          :right-options="options1"
          :threshold="0"
          @click="bindClick"
        >
          <view class="content-box" @click="contentClick">
            <text class="content-text">使用数据填充</text>
          </view>
        </zx-swipe-action-item>
        
        <zx-swipe-action-item @click="bindClick">
          <template #left>
            <view class="slot-button">
              <text 
                class="slot-button-text"
                @click="bindClick({position:'left', content:{text:'置顶'}})"
              >置顶</text>
            </view>
          </template>
          <view class="content-box" @click="contentClick">
            <text class="content-text">使用左右插槽</text>
          </view>
          <template #right>
            <view class="slot-button" @click="bindClick({position:'right', content:{text:'删除'}})">
              <text class="slot-button-text">删除</text>
            </view>
          </template>
        </zx-swipe-action-item>
        
        <zx-swipe-action-item
          :right-options="options1"
          @click="bindClick"
        >
          <template #left>
            <view class="slot-button">
              <text
                class="slot-button-text"
                @click="bindClick({position:'left', content:{text:'置顶'}})"
              >置顶</text>
            </view>
          </template>
          <view class="content-box" @click="contentClick">
            <text class="content-text">数据与插槽混合使用</text>
          </view>
        </zx-swipe-action-item>
      </zx-swipe-action>
    </view>
    
    <view class="section">
      <view class="section-title">禁止滑动</view>
      <zx-swipe-action>
        <zx-swipe-action-item :disabled="true">
          <view class="content-box">
            <text class="content-text">禁止左右滑动</text>
          </view>
        </zx-swipe-action-item>
      </zx-swipe-action>
    </view>
    
    <view class="section">
      <view class="section-title">使用变量控制开关</view>
      <view class="example-body">
        <view
          class="button"
          @click="setOpened"
        >
          <text class="button-text">当前状态：{{ isOpened ? '打开' : '关闭' }}</text>
        </view>
      </view>
      <zx-swipe-action>
        <zx-swipe-action-item
          :left-options="options2"
          :right-options="options2"
          :show="isOpened ? 'right' : 'none'"
          :auto-close="false"
          @change="change"
          @click="bindClick"
        >
          <view class="content-box">
            <text class="content-text">使用变量控制组件的开启状态</text>
          </view>
        </zx-swipe-action-item>
      </zx-swipe-action>
    </view>
    
    <view class="section">
      <view class="section-title">滑动列表</view>
      <zx-swipe-action>
        <zx-swipe-action-item
          v-for="(item, index) in swipeList"
          :key="item.id"
          :right-options="item.options"
          @change="(e) => swipeChange(e, index)"
          @click="(e) => swipeClick(e, index)"
        >
          <view class="content-box">
            <text class="content-text">{{ item.content }}</text>
          </view>
        </zx-swipe-action-item>
      </zx-swipe-action>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  padding: 20rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  text-align: center;
}

.section {
  margin-bottom: 60rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  padding-left: 20rpx;
  border-left: 8rpx solid #007aff;
}

.content-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30rpx 20rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #e6e6e6;
}

.content-text {
  font-size: 28rpx;
}

.slot-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 30rpx;
  background-color: #ff9900;
}

.slot-button-text {
  color: #ffffff;
  font-size: 28rpx;
}

.example-body {
  margin-bottom: 20rpx;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  background-color: #007aff;
  border-radius: 8rpx;
}

.button-text {
  color: #ffffff;
  font-size: 28rpx;
}
</style> 