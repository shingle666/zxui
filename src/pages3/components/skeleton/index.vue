<template>
	<view class="page">
		<view class="page-title">骨架屏组件示例</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="section-desc">基础的骨架效果</view>
			<zx-skeleton :loading="loading1" />
			<zx-skeleton :loading="false" style="margin-top: 20rpx;">
				<view class="content-card">这是真实内容区域</view>
			</zx-skeleton>
		</view>
		
		<!-- 更多参数 -->
		<view class="section">
			<view class="section-title">更多参数</view>
			<view class="section-desc">可以配置骨架屏段落数量</view>
			<zx-skeleton :loading="loading2" :rows="5" />
		</view>
		
		<!-- 动画效果 -->
		<view class="section">
			<view class="section-title">动画效果</view>
			<view class="section-desc">开启动画效果的骨架屏</view>
			<zx-skeleton :loading="loading3" :rows="3" animated />
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">自定义样式</view>
			<view class="section-desc">使用自定义模板构建骨架屏</view>
			<zx-skeleton :loading="loading4" animated>
				<template #template>
					<view class="custom-skeleton">
						<zx-skeleton-item variant="image" :width="'480rpx'" :height="'240rpx'" animated />
						<view class="skeleton-content">
							<zx-skeleton-item variant="h3" :width="'50%'" animated />
							<view class="skeleton-desc">
								<zx-skeleton-item variant="text" :width="'100%'" animated />
								<zx-skeleton-item variant="text" :width="'80%'" animated />
								<zx-skeleton-item variant="text" :width="'60%'" animated />
							</view>
							<view class="skeleton-actions">
								<zx-skeleton-item variant="button" :width="'120rpx'" animated />
								<zx-skeleton-item variant="button" :width="'120rpx'" animated />
							</view>
						</view>
					</view>
				</template>
			</zx-skeleton>
		</view>
		
		<!-- 加载状态切换 -->
		<view class="section">
			<view class="section-title">加载状态切换</view>
			<view class="section-desc">通过loading属性控制显示骨架屏或真实内容</view>
			<view class="control-panel">
				<zx-button @click="toggleLoading" size="small">
					切换加载状态 (当前: {{ switchLoading ? '加载中' : '已加载' }})
				</zx-button>
			</view>
			<zx-skeleton :loading="switchLoading" animated>
				<template #template>
					<view class="card-skeleton">
						<zx-skeleton-item variant="image" :width="'240rpx'" :height="'240rpx'" animated />
						<view class="card-info">
							<zx-skeleton-item variant="h3" :width="'50%'" animated />
							<view class="card-desc">
								<zx-skeleton-item variant="text" :width="'100%'" animated />
								<zx-skeleton-item variant="text" :width="'70%'" animated />
							</view>
							<view class="card-footer">
								<zx-skeleton-item variant="text" :width="'30%'" animated />
								<zx-skeleton-item variant="button" :width="'100rpx'" animated />
							</view>
						</view>
					</view>
				</template>
				<template #default>
					<view class="real-card">
						<image 
							class="real-card__image" 
							src="https://cdn.uviewui.com/uview/album/1.jpg"
							mode="aspectFill"
						/>
						<view class="real-card__content">
							<text class="real-card__title">美味汉堡</text>
							<text class="real-card__desc">精选优质牛肉，搭配新鲜蔬菜，口感丰富层次分明</text>
							<view class="real-card__footer">
								<text class="real-card__time">{{ currentDate }}</text>
								<view class="real-card__btn">查看详情</view>
							</view>
						</view>
					</view>
				</template>
			</zx-skeleton>
		</view>
		
		<!-- 渲染多条数据 -->
		<view class="section">
			<view class="section-title">渲染多条数据</view>
			<view class="section-desc">利用count属性控制渲染多少条骨架数据</view>
			<view class="control-panel">
				<zx-button @click="reloadMultiple" size="small">重新加载</zx-button>
			</view>
			<zx-skeleton 
				:loading="multipleLoading" 
				animated 
				:count="3"
			>
				<template #template>
					<view class="list-skeleton">
						<zx-skeleton-item variant="circle" :size="80" animated />
						<view class="list-content">
							<zx-skeleton-item variant="h3" :width="'60%'" animated />
							<zx-skeleton-item variant="text" :width="'100%'" animated />
							<zx-skeleton-item variant="text" :width="'40%'" animated />
						</view>
					</view>
				</template>
				<template #default>
					<view class="real-list">
						<view v-for="item in listData" :key="item.id" class="list-item">
							<image class="list-item__avatar" :src="item.avatar" mode="aspectFill" />
							<view class="list-item__content">
								<text class="list-item__name">{{ item.name }}</text>
								<text class="list-item__desc">{{ item.desc }}</text>
								<text class="list-item__time">{{ item.time }}</text>
							</view>
						</view>
					</view>
				</template>
			</zx-skeleton>
		</view>
		
		<!-- 防止渲染抖动 -->
		<view class="section">
			<view class="section-title">防止渲染抖动</view>
			<view class="section-desc">使用throttle控制切换时的平滑过渡</view>
			<view class="control-panel">
				<zx-button @click="toggleThrottle" size="small">
					切换加载状态 (有节流)
				</zx-button>
			</view>
			<zx-skeleton 
				:loading="throttleLoading" 
				animated 
				:throttle="{ leading: 500, trailing: 500, initVal: true }"
			>
				<template #template>
					<view class="throttle-skeleton">
						<zx-skeleton-item variant="image" :width="'240rpx'" :height="'265rpx'" animated />
						<view class="throttle-content">
							<zx-skeleton-item variant="h3" :width="'50%'" animated />
							<view class="throttle-desc">
								<zx-skeleton-item variant="text" :width="'100%'" animated />
								<zx-skeleton-item variant="text" :width="'80%'" animated />
							</view>
						</view>
					</view>
				</template>
				<template #default>
					<view class="throttle-real">
						<image 
							class="throttle-real__image" 
							src="https://cdn.uviewui.com/uview/album/2.jpg"
							mode="aspectFill"
						/>
						<view class="throttle-real__content">
							<text class="throttle-real__title">节流效果演示</text>
							<text class="throttle-real__desc">这个示例演示了使用节流控制骨架屏切换时的平滑过渡效果，避免页面抖动</text>
						</view>
					</view>
				</template>
			</zx-skeleton>
		</view>
		
		<!-- 不同类型的骨架元素 -->
		<view class="section">
			<view class="section-title">不同类型的骨架元素</view>
			<view class="section-desc">展示各种骨架元素类型</view>
			<view class="skeleton-types">
				<view class="type-item">
					<text class="type-label">文本:</text>
					<zx-skeleton-item variant="text" animated />
				</view>
				<view class="type-item">
					<text class="type-label">标题:</text>
					<zx-skeleton-item variant="h3" animated />
				</view>
				<view class="type-item">
					<text class="type-label">段落:</text>
					<zx-skeleton-item variant="p" animated />
				</view>
				<view class="type-item">
					<text class="type-label">圆形:</text>
					<zx-skeleton-item variant="circle" :size="60" animated />
				</view>
				<view class="type-item">
					<text class="type-label">图片:</text>
					<zx-skeleton-item variant="image" :height="120" animated />
				</view>
				<view class="type-item">
					<text class="type-label">按钮:</text>
					<zx-skeleton-item variant="button" animated />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// 基础状态
const loading1 = ref(true)
const loading2 = ref(true)
const loading3 = ref(true)
const loading4 = ref(true)
const switchLoading = ref(true)
const multipleLoading = ref(true)
const throttleLoading = ref(false)

// 当前时间
const currentDate = new Date().toLocaleDateString()

// 列表数据
const listData = reactive([
	{
		id: 1,
		name: '张三',
		desc: '这是一段描述信息，展示用户的基本情况',
		time: '2023-10-15 10:30',
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg'
	},
	{
		id: 2,
		name: '李四',
		desc: '另一段描述信息，用于演示列表效果',
		time: '2023-10-15 11:15',
		avatar: 'https://cdn.uviewui.com/uview/album/2.jpg'
	},
	{
		id: 3,
		name: '王五',
		desc: '第三个用户的描述信息',
		time: '2023-10-15 12:00',
		avatar: 'https://cdn.uviewui.com/uview/album/3.jpg'
	}
])

// 切换加载状态
const toggleLoading = () => {
	switchLoading.value = !switchLoading.value
}

// 重新加载多条数据
const reloadMultiple = () => {
	multipleLoading.value = true
	setTimeout(() => {
		multipleLoading.value = false
	}, 2000)
}

// 切换节流加载
const toggleThrottle = () => {
	throttleLoading.value = !throttleLoading.value
}

// 页面加载完成后的处理
onMounted(() => {
	// 模拟基础示例加载完成
	setTimeout(() => {
		loading1.value = false
	}, 1000)
	
	setTimeout(() => {
		loading2.value = false
	}, 1500)
	
	setTimeout(() => {
		loading3.value = false
	}, 2000)
	
	setTimeout(() => {
		loading4.value = false
	}, 2500)
	
	// 多条数据加载
	setTimeout(() => {
		multipleLoading.value = false
	}, 3000)
})
</script>

<style lang="scss" scoped>
.page {
	padding: 30rpx;
	
	&-title {
		font-size: 44rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 50rpx;
	}
}

.section {
	margin-bottom: 60rpx;
	
	&-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 16rpx;
	}
	
	&-desc {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 30rpx;
	}
}

.content-card {
	padding: 30rpx;
	background: #f8f9fa;
	border-radius: 12rpx;
	font-size: 28rpx;
	color: #666;
}

.control-panel {
	margin-bottom: 30rpx;
}

// 自定义骨架样式
.custom-skeleton {
	display: flex;
	flex-direction: column;
	width: 480rpx;
	
	.skeleton-content {
		padding: 28rpx;
		
		.skeleton-desc {
			margin: 24rpx 0;
			
			.zx-skeleton-item {
				margin-bottom: 16rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		
		.skeleton-actions {
			display: flex;
			gap: 20rpx;
		}
	}
}

// 卡片骨架样式
.card-skeleton {
	display: flex;
	align-items: flex-start;
	padding: 20rpx;
	
	.card-info {
		flex: 1;
		margin-left: 24rpx;
		
		.card-desc {
			margin: 24rpx 0;
			
			.zx-skeleton-item {
				margin-bottom: 16rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		
		.card-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}

// 真实卡片样式
.real-card {
	display: flex;
	align-items: flex-start;
	padding: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	
	&__image {
		width: 240rpx;
		height: 240rpx;
		border-radius: 8rpx;
	}
	
	&__content {
		flex: 1;
		margin-left: 24rpx;
	}
	
	&__title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 16rpx;
		display: block;
	}
	
	&__desc {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
		margin-bottom: 24rpx;
		display: block;
	}
	
	&__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	&__time {
		font-size: 24rpx;
		color: #999;
	}
	
	&__btn {
		padding: 8rpx 24rpx;
		background: #007aff;
		color: #fff;
		border-radius: 20rpx;
		font-size: 24rpx;
	}
}

// 列表骨架样式
.list-skeleton {
	display: flex;
	align-items: center;
	padding: 20rpx 0;
	
	.list-content {
		flex: 1;
		margin-left: 24rpx;
		
		.zx-skeleton-item {
			margin-bottom: 12rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}

// 真实列表样式
.real-list {
	.list-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
		
		&:last-child {
			border-bottom: none;
		}
		
		&__avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		
		&__content {
			flex: 1;
			margin-left: 24rpx;
		}
		
		&__name {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 8rpx;
			display: block;
		}
		
		&__desc {
			font-size: 28rpx;
			color: #666;
			margin-bottom: 8rpx;
			display: block;
		}
		
		&__time {
			font-size: 24rpx;
			color: #999;
		}
	}
}

// 节流骨架样式
.throttle-skeleton {
	display: flex;
	flex-direction: column;
	width: 240rpx;
	
	.throttle-content {
		padding: 28rpx;
		
		.throttle-desc {
			margin-top: 24rpx;
			
			.zx-skeleton-item {
				margin-bottom: 16rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
}

// 节流真实内容
.throttle-real {
	width: 240rpx;
	background: #fff;
	border-radius: 12rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	overflow: hidden;
	
	&__image {
		width: 240rpx;
		height: 265rpx;
	}
	
	&__content {
		padding: 28rpx;
	}
	
	&__title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 16rpx;
		display: block;
	}
	
	&__desc {
		font-size: 26rpx;
		color: #666;
		line-height: 1.5;
		display: block;
	}
}

// 骨架类型展示
.skeleton-types {
	.type-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.type-label {
		width: 120rpx;
		font-size: 28rpx;
		color: #666;
		margin-right: 20rpx;
	}
	
	.zx-skeleton-item {
		flex: 1;
	}
}
</style> 