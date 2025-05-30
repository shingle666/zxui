<template>
	<view class="container">
		<view class="demo-wrap">
			<!-- 基础用法 -->
			<view title="基础用法">
				<zx-breadcrumb separator="/">
					<zx-breadcrumb-item to="/pages/index/index" :replace="true" text="首页"></zx-breadcrumb-item>
					<zx-breadcrumb-item to="/promotion" text="推广管理"></zx-breadcrumb-item>
					<zx-breadcrumb-item to="/promotion/list" text="推广列表"></zx-breadcrumb-item>
					<zx-breadcrumb-item text="推广详情"></zx-breadcrumb-item>
				</zx-breadcrumb>
			</view>

			<!-- 图标分隔符 -->
			<view title="图标分隔符">
				<view class="demo-item">
					<view class="demo-item-title">使用图标分隔符</view>
					<zx-breadcrumb separator-icon="arrow-right">
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="推广管理"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="推广列表"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="推广详情"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>

				<view class="demo-item">
					<view class="demo-item-title">其他图标分隔符</view>
					<zx-breadcrumb separator-icon="arrow-right-double">
						<zx-breadcrumb-item text="主页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="用户管理"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="用户详情"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>

			<!-- 不同尺寸 -->
			<view title="不同尺寸">
				<view class="demo-item">
					<view class="demo-item-title">小号尺寸</view>
					<zx-breadcrumb size="small">
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="列表页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>

				<view class="demo-item">
					<view class="demo-item-title">默认尺寸</view>
					<zx-breadcrumb size="default">
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="列表页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>

				<view class="demo-item">
					<view class="demo-item-title">大号尺寸</view>
					<zx-breadcrumb size="large">
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="列表页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>

			<!-- 自定义分隔符 -->
			<view title="自定义分隔符">
				<view class="demo-item">
					<view class="demo-item-title">箭头分隔符</view>
					<zx-breadcrumb separator=" > ">
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="文档中心"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="API 文档"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>

				<view class="demo-item">
					<view class="demo-item-title">点分隔符</view>
					<zx-breadcrumb separator=" · ">
						<zx-breadcrumb-item to="/" text="Home"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="Products"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="Details"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>

			<!-- 自定义颜色 -->
			<view title="自定义颜色">
				<view class="demo-item">
					<view class="demo-item-title">蓝色主题</view>
					<zx-breadcrumb 
						color="#409eff" 
						active-color="#303133"
						separator-color="#409eff"
					>
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="蓝色主题"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>

				<view class="demo-item">
					<view class="demo-item-title">绿色主题</view>
					<zx-breadcrumb 
						color="#67c23a" 
						active-color="#f56c6c"
						separator-color="#67c23a"
					>
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="绿色主题"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>

			<!-- 禁用状态 -->
			<view title="禁用状态">
				<view class="demo-item">
					<view class="demo-item-title">整体禁用</view>
					<zx-breadcrumb disabled>
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="列表页"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>

				<view class="demo-item">
					<view class="demo-item-title">单项禁用</view>
					<zx-breadcrumb>
						<zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item disabled text="禁用项"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>

			<!-- 路由跳转示例 -->
			<view title="路由跳转示例">
				<view class="demo-item">
					<view class="demo-item-title">点击事件和路由跳转</view>
					<zx-breadcrumb>
						<zx-breadcrumb-item to="/" text="首页" @click="handleBreadcrumbClick('首页')"></zx-breadcrumb-item>
						<zx-breadcrumb-item to="/pages/components/tag/index" text="标签组件" :replace="true"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="面包屑组件"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>

			<!-- 自定义内容 -->
			<view title="自定义内容">
				<view class="demo-item">
					<view class="demo-item-title">带图标的面包屑</view>
					<zx-breadcrumb separator-icon="arrow-right">
						<zx-breadcrumb-item to="/">
							<view class="flex-row align-center gap-5">
								<zx-icon name="home" size="16" color="#409eff"></zx-icon>
								<text>首页</text>
							</view>
						</zx-breadcrumb-item>
						<zx-breadcrumb-item>
							<view class="flex-row align-center gap-5">
								<zx-icon name="folder" size="16" color="#e6a23c"></zx-icon>
								<text>文件夹</text>
							</view>
						</zx-breadcrumb-item>
						<zx-breadcrumb-item>
							<view class="flex-row align-center gap-5">
								<zx-icon name="document" size="16" color="#f56c6c"></zx-icon>
								<text>文档</text>
							</view>
						</zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>

			<!-- 实际场景示例 -->
			<view title="实际场景示例">
				<view class="demo-item">
					<view class="demo-item-title">电商网站导航</view>
					<zx-breadcrumb separator=" > ">
						<zx-breadcrumb-item to="/" text="商城首页"></zx-breadcrumb-item>
						<zx-breadcrumb-item to="/category" text="数码产品"></zx-breadcrumb-item>
						<zx-breadcrumb-item to="/category/phone" text="手机"></zx-breadcrumb-item>
						<zx-breadcrumb-item to="/category/phone/apple" text="苹果手机"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="iPhone 15 Pro"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>

				<view class="demo-item">
					<view class="demo-item-title">后台管理系统</view>
					<zx-breadcrumb separator-icon="arrow-right">
						<zx-breadcrumb-item to="/dashboard" text="控制台"></zx-breadcrumb-item>
						<zx-breadcrumb-item to="/system" text="系统管理"></zx-breadcrumb-item>
						<zx-breadcrumb-item to="/system/user" text="用户管理"></zx-breadcrumb-item>
						<zx-breadcrumb-item text="用户详情"></zx-breadcrumb-item>
					</zx-breadcrumb>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

// 处理面包屑点击事件
const handleBreadcrumbClick = (name) => {
	console.log('点击了面包屑项:', name);
	
	// 这里可以处理具体的业务逻辑
	uni.showToast({
		title: `点击了：${name}`,
		icon: 'none',
		duration: 1500
	});
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #f8f9fa;
}

.demo-wrap {
	padding: 20px;
}

.demo-item {
	margin-bottom: 20px;
	
	&:last-child {
		margin-bottom: 0;
	}
}

.demo-item-title {
	font-size: 14px;
	color: #606266;
	margin-bottom: 10px;
	font-weight: 500;
}

.flex-row {
	display: flex;
	flex-direction: row;
	
	&.align-center {
		align-items: center;
	}
	
	&.gap-5 {
		gap: 5px;
	}
}

/* 标题样式覆盖 */
.demo-wrap view[title] {
	position: relative;
	margin-bottom: 25px;
	padding-bottom: 15px;
	
	&::before {
		content: attr(title);
		display: block;
		font-size: 16px;
		font-weight: 600;
		color: #303133;
		margin-bottom: 15px;
		padding-bottom: 8px;
		border-bottom: 1px solid #ebeef5;
	}
	
	&:first-child {
		margin-top: 0;
	}
}
</style> 