<template>
	<view class="container">
		<view class="title">ZX-Text 文本组件演示</view>
		<view class="demo-section">
			<view class="section-title">基础用法</view>
			<view class="demo-item">
				<zx-text text="基础文本"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">主题颜色</view>
			<view class="demo-item">
				<zx-text text="默认颜色" type="black"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="主要颜色" type="primary"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="成功颜色" type="success"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="警告颜色" type="warning"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="危险颜色" type="danger"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="灰色" type="gray"></zx-text>
			</view>
			<view class="demo-item" style="background-color: #333;">
				<zx-text text="白色" type="white"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">文本处理模式</view>
			<view class="demo-item">
				<view class="item-label">价格模式（默认符号）：</view>
				<zx-text text="99.99" mode="price" type="primary"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">价格模式（千分位）：</view>
				<zx-text text="1234.56" mode="price" type="primary"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">价格模式（自定义符号）：</view>
				<zx-text text="1234.56" mode="price" symbol="$" type="primary"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">姓名脱敏（两个字）：</view>
				<zx-text text="张三" mode="name"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">姓名脱敏（多个字）：</view>
				<zx-text text="张三李" mode="name"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">手机号码脱敏：</view>
				<zx-text text="13812345678" mode="mobile"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">可拨打电话的手机号：</view>
				<zx-text text="13812345678" mode="mobile" call></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">日期格式化（普通日期）：</view>
				<zx-text text="2023-05-20" mode="date"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">日期格式化（时间戳）：</view>
				<zx-text :text="1684569600" mode="date"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">日期格式化（带时分秒）：</view>
				<zx-text text="2023-05-20 08:30:00" mode="date"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">链接模式（内部页面）：</view>
				<zx-text text="跳转到首页" mode="link" href="/pages/index/index"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">链接模式（外部链接）：</view>
				<zx-text text="访问示例网站" mode="link" href="https://uniapp.dcloud.io"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">链接模式（新窗口打开）：</view>
				<zx-text text="在新窗口打开文档" mode="link" href="https://uniapp.dcloud.io/component/" target="_blank"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">链接模式（自定义颜色）：</view>
				<zx-text text="自定义颜色链接" mode="link" href="https://uniapp.dcloud.io" color="#ff7900"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">排版样式</view>
			<view class="demo-item">
				<view class="item-label">左对齐：</view>
				<zx-text text="左对齐文本" align="left" block></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">居中对齐：</view>
				<zx-text text="居中对齐文本" align="center" block></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">右对齐：</view>
				<zx-text text="右对齐文本" align="right" block></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">文本修饰</view>
			<view class="demo-item">
				<view class="item-label">加粗：</view>
				<zx-text text="粗体文本" bold></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">下划线：</view>
				<zx-text text="带下划线文本" decoration="underline"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">中划线：</view>
				<zx-text text="带中划线文本" decoration="line-through"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">尺寸与行高</view>
			<view class="demo-item">
				<view class="item-label">默认大小：</view>
				<zx-text text="默认大小文本"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">自定义大小：</view>
				<zx-text text="36rpx大小文本" size="36rpx"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">自定义行高：</view>
				<zx-text text="自定义行高文本，行高设置为60rpx" lineHeight="60rpx"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">自定义颜色</view>
			<view class="demo-item">
				<zx-text text="红色文本" color="#FF0000"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="蓝色文本" color="#0000FF"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="绿色文本" color="#00FF00"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">文本截断</view>
			<view class="demo-item">
				<view class="item-label">单行省略：</view>
				<zx-text text="这是一段很长的文本，设置为单行显示，超出部分将会显示省略号，这是一段很长的文本，设置为单行显示，超出部分将会显示省略号。" lines="1"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">两行省略：</view>
				<zx-text text="这是一段很长的文本，设置为两行显示，超出部分将会显示省略号，这是一段很长的文本，设置为两行显示，超出部分将会显示省略号，这是一段很长的文本，设置为两行显示，超出部分将会显示省略号。" lines="2"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">可选择文本</view>
			<view class="demo-item">
				<view class="item-label">普通文本：</view>
				<zx-text text="这段文本不可选择"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">可选择文本：</view>
				<zx-text text="这段文本可以被选择（长按试试）" selectable></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">文本间距</view>
			<view class="demo-item">
				<view class="item-label">普通间距：</view>
				<zx-text text="普通间距文本 示例"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">ensp 空格：</view>
				<zx-text text="ensp 空格文本 示例" space="ensp"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">emsp 空格：</view>
				<zx-text text="emsp 空格文本 示例" space="emsp"></zx-text>
			</view>
			<view class="demo-item">
				<view class="item-label">nbsp 空格：</view>
				<zx-text text="nbsp 空格文本 示例" space="nbsp"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">组合使用</view>
			<view class="demo-item">
				<zx-text text="组合样式展示" type="primary" bold size="36rpx"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="199.99" mode="price" type="danger" bold size="40rpx"></zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="带链接的粗体文本" mode="link" href="https://uniapp.dcloud.io" bold type="primary"></zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">插槽使用</view>
			<view class="demo-item">
				<zx-text text="带左侧插槽">
					<template #left>
						<view class="slot-icon">🔍</view>
					</template>
				</zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="带右侧插槽">
					<template #right>
						<view class="slot-icon">🔔</view>
					</template>
				</zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="左右都有插槽">
					<template #left>
						<view class="slot-icon">👈</view>
					</template>
					<template #right>
						<view class="slot-icon">👉</view>
					</template>
				</zx-text>
			</view>
			<view class="demo-item">
				<zx-text text="链接带图标" mode="link" href="https://uniapp.dcloud.io">
					<template #left>
						<view class="slot-icon">🔗</view>
					</template>
				</zx-text>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">事件响应</view>
			<view class="demo-item">
				<view class="item-label">点击事件：</view>
				<zx-text text="点击我触发事件" @click="handleClick" type="primary" bold></zx-text>
			</view>
			<view class="demo-item" v-if="lastClickText">
				<view class="item-label">上次点击的文本：</view>
				<zx-text :text="lastClickText" type="success"></zx-text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 最后点击的文本
const lastClickText = ref('');

// 处理点击事件
function handleClick(e) {
	lastClickText.value = e.text;
	uni.showToast({
		title: '点击了：' + e.text,
		icon: 'none'
	});
}

</script>

<style scoped>
.container {
	padding: 20rpx;
	padding-bottom: 60rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 30rpx;
}

.demo-section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	position: relative;
	padding-left: 20rpx;
	border-left: 8rpx solid #5677fc;
}

.demo-item {
	padding: 16rpx 0;
	border-bottom: 1px solid #f5f5f5;
}

.demo-item:last-child {
	border-bottom: none;
}

.item-label {
	font-size: 28rpx;
	color: #999;
	margin-bottom: 10rpx;
}

.slot-icon {
	margin: 0 10rpx;
	font-size: 36rpx;
}

.doc-link {
	padding: 20rpx 0;
	display: flex;
	justify-content: center;
	margin-bottom: 20rpx;
}

.doc-btn {
	background-color: #5677fc;
	color: #fff;
	border-radius: 8rpx;
	padding: 16rpx 30rpx;
	font-size: 28rpx;
}
</style> 