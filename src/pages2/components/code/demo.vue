<template>
	<view class="test-page">
		<zx-navbar title="zx-code 组件测试" :border="false"></zx-navbar>
		
		<scroll-view scroll-y class="content">
			<!-- 基础测试 -->
			<view class="test-section">
				<text class="section-title">基础代码展示</text>
				<zx-code 
					:sourceCode="basicCode"
					language="javascript"
					title="JavaScript 示例"
				/>
			</view>

			<!-- Vue 组件代码 -->
			<view class="test-section">
				<text class="section-title">Vue 组件代码</text>
				<zx-code 
					:sourceCode="vueCode"
					language="vue"
					title="Vue 模板"
					:showLineNumber="true"
				/>
			</view>

			<!-- CSS 样式代码 -->
			<view class="test-section">
				<text class="section-title">CSS 样式代码</text>
				<zx-code 
					:sourceCode="cssCode"
					language="css"
					title="样式定义"
					:showLineNumber="false"
					:wrapCode="true"
				/>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 设置页面标题
uni.setNavigationBarTitle({
	title: 'zx-code 测试'
})

// 测试代码内容
const basicCode = ref(`// JavaScript 异步函数示例
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('请求失败:', error);
        return { success: false, error };
    }
}

// 使用示例
fetchData('/api/users').then(result => {
    if (result.success) {
        console.log('数据:', result.data);
    }
});`)

const vueCode = ref(`<template>
  <view class="user-card">
    <image :src="user.avatar" class="avatar" />
    <view class="info">
      <text class="name">{{ user.name }}</text>
      <text class="email">{{ user.email }}</text>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  user: Object
})
<\/script>`)

const cssCode = ref(`.user-card {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.1);
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.info {
  flex: 1;
}

.name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.email {
  font-size: 24rpx;
  color: #666;
  margin-top: 8rpx;
}`)
</script>

<style lang="scss" scoped>
.test-page {
	background-color: #f5f7fa;
	min-height: 100vh;
}

.content {
	height: calc(100vh - 88rpx);
	padding: 20rpx;
}

.test-section {
	background: white;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.section-title {
	display: block;
	font-size: 32rpx;
	font-weight: 600;
	color: #1a1a1a;
	margin-bottom: 20rpx;
}
</style> 