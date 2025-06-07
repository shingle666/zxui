<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-cell 单元格</text>
			<text class="description">单元格组件用于列表展示或表单输入</text>
		</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<zx-cell-group>
				<zx-cell title="单元格" value="内容"></zx-cell>
				<zx-cell title="单元格" value="内容" label="描述信息"></zx-cell>
			</zx-cell-group>
		</view>
		
		<!-- 图标用法 -->
		<view class="section">
			<view class="section-title">图标用法</view>
			<zx-cell-group>
				<zx-cell title="单元格" icon="home"></zx-cell>
				<zx-cell title="单元格" icon="user" value="内容"></zx-cell>
			</zx-cell-group>
		</view>
		
		<!-- 链接用法 -->
		<view class="section">
			<view class="section-title">链接用法</view>
			<zx-cell-group>
				<zx-cell title="链接" is-link></zx-cell>
				<zx-cell title="URL跳转" is-link url="/pages/index/index"></zx-cell>
				<zx-cell title="箭头方向" is-link arrow-direction="down"></zx-cell>
			</zx-cell-group>
		</view>
		
		<!-- 自定义插槽 -->
		<view class="section">
			<view class="section-title">自定义插槽</view>
			<zx-cell-group>
				<zx-cell title="自定义图标">
					<template #icon>
						<view class="custom-icon">🔥</view>
					</template>
				</zx-cell>
				<zx-cell title="自定义右侧内容">
					<template #value>
						<view class="custom-value">
							<text class="custom-text">自定义</text>
						</view>
					</template>
				</zx-cell>
			</zx-cell-group>
		</view>
		
		<!-- 垂直居中 -->
		<view class="section">
			<view class="section-title">垂直居中</view>
			<zx-cell-group>
				<zx-cell title="单元格" value="内容" label="描述信息" center></zx-cell>
				<zx-cell title="单元格" value="内容" label="描述信息" center icon="star"></zx-cell>
			</zx-cell-group>
		</view>
		
		<!-- 尺寸设置 -->
		<view class="section">
			<view class="section-title">尺寸设置</view>
			<zx-cell-group>
				<zx-cell title="默认尺寸" value="内容"></zx-cell>
				<zx-cell title="大号尺寸" value="内容" size="large"></zx-cell>
			</zx-cell-group>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">禁用状态</view>
			<zx-cell-group>
				<zx-cell title="禁用单元格" value="内容" disabled></zx-cell>
				<zx-cell title="禁用单元格" value="内容" label="描述信息" disabled></zx-cell>
			</zx-cell-group>
		</view>
		
		<!-- 点击事件 -->
		<view class="section">
			<view class="section-title">点击事件</view>
			<zx-cell-group>
				<zx-cell title="点击单元格" value="内容" clickable @click="onCellClick"></zx-cell>
				<zx-cell title="带参数点击" value="内容" clickable name="cell1" @click="onCellClick"></zx-cell>
			</zx-cell-group>
			<view class="event-result" v-if="lastClickInfo">
				<text>最后点击: {{ lastClickInfo }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import zxCellGroup from '@tanzhenxing/zx-cell-group/zx-cell-group.vue';
import zxCell from '@tanzhenxing/zx-cell/zx-cell.vue';


const lastClickInfo = ref('');

const onCellClick = (e) => {
	lastClickInfo.value = e.name ? `单元格 ${e.name}` : '单元格';
	uni.showToast({
		title: `点击了${lastClickInfo.value}`,
		icon: 'none'
	});
};
</script>

<style lang="scss">
.container {
	padding: 20rpx;
}

.header {
	padding: 30rpx 0;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.description {
		font-size: 28rpx;
		color: #666;
		display: block;
	}
}

.section {
	margin-bottom: 30rpx;
	
	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		padding: 20rpx 0;
	}
}

.custom-icon {
	font-size: 36rpx;
}

.custom-value {
	display: flex;
	align-items: center;
	
	.custom-text {
		color: #2979ff;
		font-weight: bold;
	}
}

.event-result {
	margin-top: 20rpx;
	padding: 20rpx;
	background-color: #f0f0f0;
	border-radius: 8rpx;
	font-size: 28rpx;
	color: #666;
}
</style>