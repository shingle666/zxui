<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-cell-group 单元格组</text>
			<text class="description">单元格组用于将多个单元格组合起来，形成列表区块。</text>
		</view>

		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<zx-cell-group title="个人信息">
				<zx-cell title="姓名" value="张三"></zx-cell>
				<zx-cell title="年龄" value="30" label="出生于1994年"></zx-cell>
				<zx-cell title="职业" value="前端工程师"></zx-cell>
			</zx-cell-group>
		</view>

		<!-- 带边框 -->
		<view class="section">
			<view class="section-title">带边框</view>
			<zx-cell-group title="设置选项" :border="true">
				<zx-cell title="通知设置" is-link></zx-cell>
				<zx-cell title="隐私设置" is-link></zx-cell>
				<zx-cell title="通用设置" is-link></zx-cell>
			</zx-cell-group>
		</view>

		<!-- 无边框 -->
		<view class="section">
			<view class="section-title">无边框</view>
			<zx-cell-group title="其他信息" :border="false">
				<zx-cell title="关于我们" is-link></zx-cell>
				<zx-cell title="版本号" value="1.0.0"></zx-cell>
			</zx-cell-group>
		</view>

		<!-- 自定义标题插槽 -->
		<view class="section">
			<view class="section-title">自定义标题插槽</view>
			<zx-cell-group>
				<template #title>
					<view class="custom-group-title">
						<zx-icon name="tags" size="20" color="#2979ff"></zx-icon>
						<text style="margin-left: 5px; color: #2979ff; font-weight: bold;">自定义分组标题</text>
					</view>
				</template>
				<zx-cell title="自定义内容1" value="可点击" clickable @click="handleCellClick('自定义内容1')"></zx-cell>
				<zx-cell title="自定义内容2" value="带描述" label="这是一段描述信息"></zx-cell>
			</zx-cell-group>
		</view>

		<!-- 嵌套使用 -->
		<view class="section">
			<view class="section-title">嵌套使用</view>
			<zx-cell-group title="外层分组">
				<zx-cell title="外层单元格1"></zx-cell>
				<zx-cell-group title="内层分组" :border="false" custom-style="padding-left: 15px;">
					<zx-cell title="内层单元格A" icon="settings"></zx-cell>
					<zx-cell title="内层单元格B" value="详情" is-link></zx-cell>
				</zx-cell-group>
				<zx-cell title="外层单元格2"></zx-cell>
			</zx-cell-group>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import zxCellGroup from '@tanzhenxing/zx-cell-group/zx-cell-group.vue';
import zxCell from '@tanzhenxing/zx-cell/zx-cell.vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

const handleCellClick = (name) => {
	uni.showToast({
		title: `点击了 ${name}`,
		icon: 'none'
	});
};
</script>

<style lang="scss">
.container {
	padding: 20rpx;
	background-color: #f8f8f8; // 页面背景色调整，使其与cell背景有区分
}

.header {
	padding: 30rpx 0;
	text-align: center; // 标题居中

	.title {
		font-size: 38rpx; // 标题字号加大
		font-weight: bold;
		color: #303133; // 标题颜色调整
		display: block;
		margin-bottom: 15rpx; // 标题与描述间距调整
	}

	.description {
		font-size: 28rpx;
		color: #909399; // 描述文字颜色调整
		display: block;
	}
}

.section {
	margin-bottom: 40rpx; // 区块间距加大
	background-color: #ffffff; // 区块背景设为白色，突出卡片感
	border-radius: 16rpx; // 区块圆角
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08); // 区块阴影

	.section-title {
		font-size: 32rpx; // 区块标题字号调整
		font-weight: 500; // 区块标题字重调整
		color: #303133;
		padding: 25rpx 30rpx; // 区块标题内边距调整
		border-bottom: 1px solid #ebeef5; // 区块标题下边框
	}
}

.custom-group-title {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx; // 自定义标题内边距调整
	background-color: #ecf5ff; // 自定义标题背景色
	border-radius: 8rpx 8rpx 0 0; // 自定义标题圆角，仅上方
}

// 确保zx-cell-group内的zx-cell在无边框组内时，最后一个cell无下边框
.zx-cell-group--no-border .zx-cell:last-child ::v-deep .zx-line {
	display: none;
}
</style>