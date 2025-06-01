<template>
	<view class="page">
		<view class="page-title">商品评论组件示例</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<zx-goods-comment 
				:comment-list="basicComments"
				@reply="handleReply"
				@like="handleLike"
				@image-preview="handleImagePreview"
			/>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">自定义样式</view>
			<zx-goods-comment 
				:comment-list="styledComments"
				username-color="#2979ff"
				content-color="#333333"
				:username-size="32"
				:content-size="30"
				:show-border="false"
				@reply="handleReply"
				@like="handleLike"
			/>
		</view>
		
		<!-- 隐藏功能模块 -->
		<view class="section">
			<view class="section-title">隐藏评分和操作</view>
			<zx-goods-comment 
				:comment-list="noRatingComments"
				:show-rating="false"
				:show-actions="false"
			/>
		</view>
		
		<!-- 图片评论 -->
		<view class="section">
			<view class="section-title">图片评论</view>
			<zx-goods-comment 
				:comment-list="imageComments"
				:max-images="6"
				@reply="handleReply"
				@like="handleLike"
				@image-preview="handleImagePreview"
			/>
		</view>
		
		<!-- 带回复的评论 -->
		<view class="section">
			<view class="section-title">带回复的评论</view>
			<zx-goods-comment 
				:comment-list="replyComments"
				:max-replies="3"
				@reply="handleReply"
				@like="handleLike"
				@more-replies="handleMoreReplies"
			/>
		</view>
		
		<!-- 空状态 -->
		<view class="section">
			<view class="section-title">空状态</view>
			<zx-goods-comment 
				:comment-list="[]"
				empty-text="暂时没有评论，快来抢沙发吧~"
			/>
		</view>
		
		<!-- 加载更多 -->
		<view class="section">
			<view class="section-title">加载更多</view>
			<zx-goods-comment 
				:comment-list="loadMoreComments"
				:show-load-more="true"
				load-more-text="点击加载更多评论"
				@reply="handleReply"
				@like="handleLike"
				@load-more="handleLoadMore"
			/>
		</view>
		
		<!-- 操作反馈 -->
		<view v-if="actionMessage" class="action-message">
			{{ actionMessage }}
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 操作反馈消息
const actionMessage = ref('')

// 显示操作消息
const showMessage = (message) => {
	actionMessage.value = message
	setTimeout(() => {
		actionMessage.value = ''
	}, 2000)
}

// 基础评论数据
const basicComments = ref([
	{
		id: 1,
		username: '张小明',
		avatar: 'https://picsum.photos/80/80?random=1',
		rating: 5,
		content: '商品质量非常好，包装精美，物流速度也很快，非常满意的一次购物体验！',
		createTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
		likeCount: 15,
		isLiked: false
	},
	{
		id: 2,
		username: '李小红',
		avatar: 'https://picsum.photos/80/80?random=2',
		rating: 4,
		content: '整体还不错，就是颜色和图片有一点点差异，但是质量很好。',
		createTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
		likeCount: 8,
		isLiked: true
	}
])

// 自定义样式评论数据
const styledComments = ref([
	{
		id: 3,
		username: '王大华',
		avatar: 'https://picsum.photos/80/80?random=3',
		rating: 5,
		content: '这是一个自定义样式的评论示例，用户名是蓝色的，字体也更大一些。',
		createTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
		likeCount: 23,
		isLiked: false
	}
])

// 无评分评论数据
const noRatingComments = ref([
	{
		id: 4,
		username: '赵小丽',
		avatar: 'https://picsum.photos/80/80?random=4',
		content: '这个评论没有显示评分和操作按钮，适合一些特殊场景使用。',
		createTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
		likeCount: 5,
		isLiked: false
	}
])

// 图片评论数据
const imageComments = ref([
	{
		id: 5,
		username: '孙小军',
		avatar: 'https://picsum.photos/80/80?random=5',
		rating: 5,
		content: '实物和图片一致，质量很好，拍了几张图片给大家参考。',
		createTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
		likeCount: 32,
		isLiked: false,
		images: [
			'https://picsum.photos/300/300?random=10',
			'https://picsum.photos/300/300?random=11',
			'https://picsum.photos/300/300?random=12',
			'https://picsum.photos/300/300?random=13',
			'https://picsum.photos/300/300?random=14',
			'https://picsum.photos/300/300?random=15',
			'https://picsum.photos/300/300?random=16'
		]
	}
])

// 带回复的评论数据
const replyComments = ref([
	{
		id: 6,
		username: '周小芳',
		avatar: 'https://picsum.photos/80/80?random=6',
		rating: 4,
		content: '商品收到了，整体还不错，就是有个小问题想咨询一下。',
		createTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
		likeCount: 12,
		isLiked: false,
		replies: [
			{
				id: 101,
				username: '客服小王',
				content: '您好，请问是什么问题呢？我们会及时为您解决的。'
			},
			{
				id: 102,
				username: '周小芳',
				content: '就是颜色比图片稍微深一点，不过还能接受。'
			},
			{
				id: 103,
				username: '客服小王',
				content: '可能是拍摄光线的原因，如果不满意可以联系我们退换货。'
			},
			{
				id: 104,
				username: '其他用户',
				content: '我买的也是这样，不过质量确实不错。'
			},
			{
				id: 105,
				username: '路人甲',
				content: '同感，颜色稍微有点差异但是可以接受。'
			}
		]
	}
])

// 加载更多评论数据
const loadMoreComments = ref([
	{
		id: 7,
		username: '吴小强',
		avatar: 'https://picsum.photos/80/80?random=7',
		rating: 5,
		content: '第一条评论，商品很好，推荐购买！',
		createTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
		likeCount: 18,
		isLiked: false
	},
	{
		id: 8,
		username: '郑小美',
		avatar: 'https://picsum.photos/80/80?random=8',
		rating: 4,
		content: '第二条评论，质量不错，性价比很高。',
		createTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
		likeCount: 9,
		isLiked: false
	}
])

// 处理回复
const handleReply = ({ comment, index }) => {
	console.log('回复评论:', comment)
	showMessage(`回复用户 ${comment.username} 的评论`)
}

// 处理点赞
const handleLike = ({ comment, index }) => {
	console.log('点赞评论:', comment)
	
	// 模拟点赞/取消点赞
	if (comment.isLiked) {
		comment.isLiked = false
		comment.likeCount--
		showMessage('取消点赞')
	} else {
		comment.isLiked = true
		comment.likeCount++
		showMessage('点赞成功')
	}
}

// 处理图片预览 (H5)
const handleImagePreview = ({ images, index }) => {
	console.log('预览图片:', images, index)
	showMessage(`预览第 ${index + 1} 张图片`)
	// 在实际项目中，这里可以调用自定义的图片预览组件
}

// 处理查看更多回复
const handleMoreReplies = ({ comment, index }) => {
	console.log('查看更多回复:', comment)
	showMessage(`查看 ${comment.username} 的更多回复`)
}

// 处理加载更多
const handleLoadMore = () => {
	console.log('加载更多评论')
	showMessage('正在加载更多评论...')
	
	// 模拟加载更多数据
	setTimeout(() => {
		const newComments = [
			{
				id: Date.now(),
				username: '新用户' + Math.floor(Math.random() * 100),
				avatar: `https://picsum.photos/80/80?random=${Math.floor(Math.random() * 100)}`,
				rating: Math.floor(Math.random() * 5) + 1,
				content: '这是新加载的评论内容，商品质量很好！',
				createTime: new Date().toISOString(),
				likeCount: Math.floor(Math.random() * 20),
				isLiked: false
			}
		]
		loadMoreComments.value.push(...newComments)
		showMessage('加载完成')
	}, 1000)
}
</script>

<style lang="scss">
.page {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.page-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
	margin-bottom: 40rpx;
	padding: 20rpx 0;
}

.section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	padding: 30rpx 30rpx 20rpx;
	border-bottom: 1px solid #f0f0f0;
	background-color: #fafafa;
}

.action-message {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(0, 0, 0, 0.8);
	color: #fff;
	padding: 20rpx 40rpx;
	border-radius: 8rpx;
	font-size: 28rpx;
	z-index: 9999;
	pointer-events: none;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
	width: 6rpx;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
	border-radius: 3rpx;
}

::-webkit-scrollbar-thumb {
	background: #c1c1c1;
	border-radius: 3rpx;
}

::-webkit-scrollbar-thumb:hover {
	background: #a8a8a8;
}
</style>