<template>
	<view class="container">
		<zx-navbar title="Tag 标签" left-icon="arrow-left" @leftClick="$zx.route()"></zx-navbar>
		
		<view class="demo-wrap">
			<!-- 基础用法 -->
			<view title="基础用法">
				<view class="flex-wrap gap-10">
					<zx-tag text="Primary" type="primary" />
					<zx-tag text="Success" type="success" />
					<zx-tag text="Info" type="info" />
					<zx-tag text="Warning" type="warning" />
					<zx-tag text="Danger" type="danger" />
				</view>
			</view>

			<!-- 不同主题 -->
			<view title="不同主题">
				<view class="demo-item">
					<view class="demo-item-title">Dark 主题</view>
					<view class="flex-wrap gap-10">
						<zx-tag text="Primary" type="primary" effect="dark" />
						<zx-tag text="Success" type="success" effect="dark" />
						<zx-tag text="Info" type="info" effect="dark" />
						<zx-tag text="Warning" type="warning" effect="dark" />
						<zx-tag text="Danger" type="danger" effect="dark" />
					</view>
				</view>
				
				<view class="demo-item">
					<view class="demo-item-title">Light 主题（默认）</view>
					<view class="flex-wrap gap-10">
						<zx-tag text="Primary" type="primary" effect="light" />
						<zx-tag text="Success" type="success" effect="light" />
						<zx-tag text="Info" type="info" effect="light" />
						<zx-tag text="Warning" type="warning" effect="light" />
						<zx-tag text="Danger" type="danger" effect="light" />
					</view>
				</view>
				
				<view class="demo-item">
					<view class="demo-item-title">Plain 主题</view>
					<view class="flex-wrap gap-10">
						<zx-tag text="Primary" type="primary" effect="plain" />
						<zx-tag text="Success" type="success" effect="plain" />
						<zx-tag text="Info" type="info" effect="plain" />
						<zx-tag text="Warning" type="warning" effect="plain" />
						<zx-tag text="Danger" type="danger" effect="plain" />
					</view>
				</view>
			</view>

			<!-- 不同尺寸 -->
			<view title="不同尺寸">
				<view class="flex-wrap gap-10 align-center">
					<zx-tag text="Large" type="primary" size="large" />
					<zx-tag text="Default" type="primary" size="default" />
					<zx-tag text="Small" type="primary" size="small" />
				</view>
			</view>

			<!-- 圆形标签 -->
			<view title="圆形标签">
				<view class="demo-item">
					<view class="demo-item-title">Dark 主题</view>
					<view class="flex-wrap gap-10">
						<zx-tag text="Primary" type="primary" effect="dark" round />
						<zx-tag text="Success" type="success" effect="dark" round />
						<zx-tag text="Info" type="info" effect="dark" round />
					</view>
				</view>
				
				<view class="demo-item">
					<view class="demo-item-title">Light 主题</view>
					<view class="flex-wrap gap-10">
						<zx-tag text="Primary" type="primary" effect="light" round />
						<zx-tag text="Success" type="success" effect="light" round />
						<zx-tag text="Info" type="info" effect="light" round />
					</view>
				</view>
				
				<view class="demo-item">
					<view class="demo-item-title">Plain 主题</view>
					<view class="flex-wrap gap-10">
						<zx-tag text="Primary" type="primary" effect="plain" round />
						<zx-tag text="Success" type="success" effect="plain" round />
						<zx-tag text="Info" type="info" effect="plain" round />
					</view>
				</view>
			</view>

			<!-- 可移除标签 -->
			<view title="可移除标签">
				<view class="flex-wrap gap-10">
					<zx-tag 
						v-for="(tag, index) in removableTags" 
						:key="index"
						:text="tag.name"
						:type="tag.type"
						:name="index"
						closable 
						@close="handleRemove"
					/>
				</view>
			</view>

			<!-- 动态编辑标签 -->
			<view title="动态编辑标签">
				<view class="flex-wrap gap-10 align-center">
					<zx-tag 
						v-for="(tag, index) in dynamicTags" 
						:key="index"
						:text="tag"
						:name="index"
						type="primary"
						closable 
						@close="handleDynamicRemove"
					/>
					<input 
						v-if="inputVisible" 
						v-model="inputValue" 
						class="tag-input"
						@blur="handleInputConfirm"
						@keydown.enter="handleInputConfirm"
						placeholder="输入标签名"
						maxlength="20"
					/>
					<zx-tag 
						v-else 
						text="+ New Tag" 
						type="info" 
						effect="plain"
						@click="showInput"
					/>
				</view>
			</view>

			<!-- 可选中标签 (CheckTag) -->
			<view title="可选中标签 (CheckTag)">
				<view class="demo-item">
					<view class="demo-item-title">基础用法</view>
					<view class="flex-wrap gap-10">
						<zx-check-tag text="Checked" :checked="true" />
						<zx-check-tag v-model:checked="checked1" text="Toggle me" @change="handleCheck" />
						<zx-check-tag text="Disabled" disabled />
					</view>
				</view>
				
				<view class="demo-item">
					<view class="demo-item-title">不同类型</view>
					<view class="flex-wrap gap-10">
						<zx-check-tag v-model:checked="checked2" text="Primary" type="primary" />
						<zx-check-tag v-model:checked="checked3" text="Success" type="success" />
						<zx-check-tag v-model:checked="checked4" text="Info" type="info" />
						<zx-check-tag v-model:checked="checked5" text="Warning" type="warning" />
						<zx-check-tag v-model:checked="checked6" text="Danger" type="danger" />
					</view>
				</view>
			</view>

			<!-- 带图标的标签 -->
			<view title="带图标的标签">
				<view class="flex-wrap gap-10">
					<zx-tag text="收藏" type="warning" icon="star" />
					<zx-tag text="设置" type="info" icon="setting" />
					<zx-tag text="删除" type="danger" icon="trash" />
					<zx-tag text="用户" type="success" icon="account" />
				</view>
			</view>

			<!-- 边框描边 -->
			<view title="边框描边">
				<view class="flex-wrap gap-10">
					<zx-tag text="Primary" type="primary" hit />
					<zx-tag text="Success" type="success" hit />
					<zx-tag text="Warning" type="warning" hit />
					<zx-tag text="Danger" type="danger" hit />
				</view>
			</view>

			<!-- 禁用状态 -->
			<view title="禁用状态">
				<view class="flex-wrap gap-10">
					<zx-tag text="Disabled" type="primary" disabled />
					<zx-tag text="Disabled" type="success" disabled />
					<zx-tag text="Disabled" type="warning" disabled closable />
					<zx-tag text="Disabled" type="danger" disabled />
				</view>
			</view>

			<!-- 自定义颜色 -->
			<view title="自定义颜色">
				<view class="flex-wrap gap-10">
					<zx-tag text="自定义背景" bgColor="#ff6b6b" color="#ffffff" />
					<zx-tag text="自定义边框" effect="plain" borderColor="#ff9f43" color="#ff9f43" />
					<zx-tag text="渐变背景" bgColor="linear-gradient(45deg, #667eea 0%, #764ba2 100%)" color="#ffffff" />
				</view>
			</view>

			<!-- 兼容旧版本 -->
			<view title="兼容旧版本">
				<view class="demo-item">
					<view class="demo-item-title">尺寸兼容</view>
					<view class="flex-wrap gap-10 align-center">
						<zx-tag text="Mini" type="primary" size="mini" />
						<zx-tag text="Medium" type="primary" size="medium" />
					</view>
				</view>
				
				<view class="demo-item">
					<view class="demo-item-title">类型兼容</view>
					<view class="flex-wrap gap-10">
						<zx-tag text="Error (兼容)" type="error" />
						<zx-tag text="Plain (旧版)" type="primary" plain />
						<zx-tag text="Plain Fill" type="success" plain plainFill />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// 可移除标签
const removableTags = ref([
	{ name: 'Tag 1', type: 'primary' },
	{ name: 'Tag 2', type: 'success' },
	{ name: 'Tag 3', type: 'info' },
	{ name: 'Tag 4', type: 'warning' },
	{ name: 'Tag 5', type: 'danger' }
])

// 动态标签
const dynamicTags = ref(['标签一', '标签二', '标签三'])
const inputVisible = ref(false)
const inputValue = ref('')

// 可选中标签状态
const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(true)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(true)

// 移除标签
const handleRemove = (index) => {
	removableTags.value.splice(index, 1)
	uni.showToast({
		title: `移除了第 ${index + 1} 个标签`,
		icon: 'none'
	})
}

// 动态移除标签
const handleDynamicRemove = (index) => {
	const tagName = dynamicTags.value[index]
	dynamicTags.value.splice(index, 1)
	uni.showToast({
		title: `移除了"${tagName}"`,
		icon: 'none'
	})
}

// 显示输入框
const showInput = () => {
	inputVisible.value = true
	nextTick(() => {
		// 在真实项目中，可以使用 ref 获取输入框并聚焦
	})
}

// 确认输入
const handleInputConfirm = () => {
	if (inputValue.value.trim()) {
		dynamicTags.value.push(inputValue.value.trim())
		uni.showToast({
			title: `添加了"${inputValue.value.trim()}"`,
			icon: 'none'
		})
	}
	inputVisible.value = false
	inputValue.value = ''
}

// 选中状态变化
const handleCheck = (checked) => {
	uni.showToast({
		title: `选中状态: ${checked}`,
		icon: 'none'
	})
}
</script>

<style lang="scss" scoped>
.container {
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-wrap {
	padding: 0 30rpx 40rpx;
}

.demo-item {
	margin-bottom: 30rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}

.demo-item-title {
	font-size: 28rpx;
	color: #606266;
	margin-bottom: 20rpx;
	font-weight: 500;
}

.flex-wrap {
	display: flex;
	flex-wrap: wrap;
}

.gap-10 {
	gap: 20rpx;
}

.align-center {
	align-items: center;
}

.tag-input {
	width: 160rpx;
	height: 56rpx;
	line-height: 52rpx;
	border: 1px solid #dcdfe6;
	border-radius: 8rpx;
	padding: 0 20rpx;
	font-size: 26rpx;
	outline: none;
	box-sizing: border-box;
	
	&:focus {
		border-color: #409eff;
	}
}
</style>
