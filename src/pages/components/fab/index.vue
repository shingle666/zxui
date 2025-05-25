<template>
	<view class="container">
		<view class="header">
			<text class="title">ZX-FAB 悬浮按钮组件</text>
			<text class="subtitle">点击可展开一个图形按钮菜单</text>
		</view>
		
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">基础用法</text>
			</view>
			<view class="demo-box">
				<view class="demo-info">
					<text>默认在左下角，水平方向展开</text>
				</view>
				<view class="view-box">
					<zx-fab 
						:content="basicItems" 
						@trigger="handleTrigger('basic', $event)"
						@fabClick="handleFabClick"
						@open="handleOpen"
						@close="handleClose"/>
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">不同位置</text>
			</view>
			<view class="demo-box">
				<view class="view-box">
					<radio-group @change="handlePositionChange">
						<label v-for="(position, index) in positions" :key="index" class="radio-label">
							<radio :value="position.value" :checked="index === currentPosition" />
							<text>{{ position.label }}</text>
						</label>
					</radio-group>
					
					<zx-fab 
						:content="positionItems" 
						:horizontal="currentHorizontal"
						:vertical="currentVertical"
						@trigger="handleTrigger('position', $event)"/>
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">不同方向</text>
			</view>
			<view class="demo-box">
				<view class="view-box">
					<radio-group @change="handleDirectionChange">
						<label v-for="(dir, index) in directions" :key="index" class="radio-label">
							<radio :value="dir.value" :checked="index === currentDirection" />
							<text>{{ dir.label }}</text>
						</label>
					</radio-group>
					
					<zx-fab 
						:content="directionItems" 
						:direction="currentDirectionValue"
						@trigger="handleTrigger('direction', $event)"/>
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">自定义样式</text>
			</view>
			<view class="demo-box">
				<view class="view-box">
					<view class="style-controls">
						<view class="style-control-item">
							<text>主按钮颜色：</text>
							<view class="color-picker">
								<view 
									v-for="(color, index) in buttonColors" 
									:key="index" 
									class="color-item" 
									:style="{ backgroundColor: color }"
									@click="handleButtonColorChange(color)">
								</view>
							</view>
						</view>
						<view class="style-control-item">
							<text>按钮大小：</text>
							<slider :min="40" :max="70" :value="currentButtonSize" @change="handleButtonSizeChange" show-value />
						</view>
					</view>
					
					<zx-fab 
						:content="styleItems" 
						:pattern="currentPattern"
						:mainButtonSize="currentButtonSize"
						:itemButtonSize="currentButtonSize - 10"
						@trigger="handleTrigger('style', $event)"/>
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">动画效果</text>
			</view>
			<view class="demo-box">
				<view class="view-box">
					<radio-group @change="handleAnimationChange">
						<label v-for="(anim, index) in animations" :key="index" class="radio-label">
							<radio :value="anim.value" :checked="index === currentAnimation" />
							<text>{{ anim.label }}</text>
						</label>
					</radio-group>
					
					<zx-fab 
						:content="animationItems" 
						:animationType="currentAnimationType"
						:animationDuration="currentAnimationDuration"
						@trigger="handleTrigger('animation', $event)"/>
				</view>
				
				<view class="style-control-item" style="margin-top: 20px;">
					<text>动画时长：{{ currentAnimationDuration }}ms</text>
					<slider :min="100" :max="1000" :value="currentAnimationDuration" @change="handleAnimationDurationChange" step="100" show-value />
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">
				<text class="section-title-text">程序控制</text>
			</view>
			<view class="demo-box">
				<view class="view-box">
					<view class="button-group">
						<button @click="openFab" type="primary" size="mini">打开菜单</button>
						<button @click="closeFab" type="default" size="mini">关闭菜单</button>
					</view>
					
					<zx-fab 
						ref="fabRef"
						:content="controlItems" 
						:mainIcon="currentMainIcon"
						@trigger="handleTrigger('control', $event)"/>
				</view>
				
				<view class="style-control-item" style="margin-top: 20px;">
					<text>主按钮图标：</text>
					<radio-group @change="handleIconChange">
						<label v-for="(icon, index) in mainIcons" :key="index" class="radio-label">
							<radio :value="icon.value" :checked="currentMainIcon === icon.value" />
							<text>{{ icon.label }}</text>
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		
		<view class="result-section">
			<view class="section-title">
				<text class="section-title-text">事件结果</text>
			</view>
			<view class="result-box">
				<scroll-view scroll-y style="height: 150px;">
					<view v-for="(item, index) in eventLogs" :key="index" class="event-log">
						<text>{{ item }}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 占位，防止被悬浮按钮遮挡 -->
		<view style="height: 150px;"></view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// 基础示例
const basicItems = ref([
	{
		icon: 'star',
		text: '收藏',
		active: false
	},
	{
		icon: 'share',
		text: '分享',
		active: false
	},
	{
		icon: 'heart',
		text: '喜欢',
		active: false,
		selectedIcon: 'heart-fill'
	}
]);

// 位置示例
const positionItems = ref([
	{
		icon: 'location',
		text: '位置',
		active: false
	},
	{
		icon: 'map',
		text: '地图',
		active: false
	}
]);

const positions = [
	{ label: '左下角', value: 'leftBottom' },
	{ label: '右下角', value: 'rightBottom' },
	{ label: '左上角', value: 'leftTop' },
	{ label: '右上角', value: 'rightTop' }
];

const currentPosition = ref(0);
const currentHorizontal = computed(() => {
	return ['leftBottom', 'leftTop'].includes(positions[currentPosition.value].value) ? 'left' : 'right';
});
const currentVertical = computed(() => {
	return ['leftBottom', 'rightBottom'].includes(positions[currentPosition.value].value) ? 'bottom' : 'top';
});

// 方向示例
const directionItems = ref([
	{
		icon: 'arrow-left',
		text: '左',
		active: false
	},
	{
		icon: 'arrow-right',
		text: '右',
		active: false
	},
	{
		icon: 'arrow-up',
		text: '上',
		active: false
	}
]);

const directions = [
	{ label: '水平方向', value: 'horizontal' },
	{ label: '垂直方向', value: 'vertical' }
];

const currentDirection = ref(0);
const currentDirectionValue = computed(() => directions[currentDirection.value].value);

// 样式示例
const styleItems = ref([
	{
		icon: 'palette',
		text: '样式',
		active: false
	},
	{
		icon: 'color',
		text: '颜色',
		active: false
	}
]);

const buttonColors = ['#007AFF', '#FF9500', '#4CD964', '#FF2D55', '#8E8E93'];
const currentButtonColor = ref(buttonColors[0]);
const currentButtonSize = ref(55);

const currentPattern = computed(() => {
	return {
		buttonColor: currentButtonColor.value,
		iconColor: '#fff',
		color: '#333',
		selectedColor: currentButtonColor.value,
		backgroundColor: '#fff'
	};
});

// 动画示例
const animationItems = ref([
	{
		icon: 'play',
		text: '播放',
		active: false
	},
	{
		icon: 'pause',
		text: '暂停',
		active: false
	},
	{
		icon: 'stop',
		text: '停止',
		active: false
	}
]);

const animations = [
	{ label: '缩放', value: 'scale' },
	{ label: '淡入淡出', value: 'fade' },
	{ label: '滑动', value: 'slide' }
];

const currentAnimation = ref(0);
const currentAnimationType = computed(() => animations[currentAnimation.value].value);
const currentAnimationDuration = ref(300);

// 程序控制示例
const controlItems = ref([
	{
		icon: 'settings',
		text: '设置',
		active: false
	},
	{
		icon: 'user',
		text: '用户',
		active: false
	}
]);

const mainIcons = [
	{ label: '加号', value: 'plus' },
	{ label: '菜单', value: 'menu' },
	{ label: '更多', value: 'more' }
];

const currentMainIcon = ref('plus');
const fabRef = ref(null);

// 事件日志
const eventLogs = ref([]);

// 事件处理
const handleTrigger = (type, { index, item }) => {
	const log = `[${type}] 点击了 ${item.text} 菜单项`;
	eventLogs.value.unshift(log);
	
	// 切换激活状态
	if (type === 'basic') {
		basicItems.value[index].active = !basicItems.value[index].active;
	} else if (type === 'position') {
		positionItems.value[index].active = !positionItems.value[index].active;
	} else if (type === 'direction') {
		directionItems.value[index].active = !directionItems.value[index].active;
	} else if (type === 'style') {
		styleItems.value[index].active = !styleItems.value[index].active;
	} else if (type === 'animation') {
		animationItems.value[index].active = !animationItems.value[index].active;
	} else if (type === 'control') {
		controlItems.value[index].active = !controlItems.value[index].active;
	}
};

const handleFabClick = () => {
	const log = '点击了主按钮';
	eventLogs.value.unshift(log);
};

const handleOpen = () => {
	const log = '菜单打开了';
	eventLogs.value.unshift(log);
};

const handleClose = () => {
	const log = '菜单关闭了';
	eventLogs.value.unshift(log);
};

// 位置变更
const handlePositionChange = (e) => {
	const value = e.detail.value;
	const index = positions.findIndex(item => item.value === value);
	currentPosition.value = index;
};

// 方向变更
const handleDirectionChange = (e) => {
	const value = e.detail.value;
	const index = directions.findIndex(item => item.value === value);
	currentDirection.value = index;
};

// 样式变更
const handleButtonColorChange = (color) => {
	currentButtonColor.value = color;
};

const handleButtonSizeChange = (e) => {
	currentButtonSize.value = e.detail.value;
};

// 动画变更
const handleAnimationChange = (e) => {
	const value = e.detail.value;
	const index = animations.findIndex(item => item.value === value);
	currentAnimation.value = index;
};

const handleAnimationDurationChange = (e) => {
	currentAnimationDuration.value = e.detail.value;
};

// 图标变更
const handleIconChange = (e) => {
	currentMainIcon.value = e.detail.value;
};

// 程序控制
const openFab = () => {
	if (fabRef.value) {
		fabRef.value.open();
	}
};

const closeFab = () => {
	if (fabRef.value) {
		fabRef.value.close();
	}
};
</script>

<style lang="scss">
.container {
	padding: 20rpx;
}

.header {
	padding: 20rpx 0;
	margin-bottom: 30rpx;
	border-bottom: 1px solid #eee;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	display: block;
	text-align: center;
}

.subtitle {
	font-size: 28rpx;
	color: #666;
	display: block;
	text-align: center;
	margin-top: 10rpx;
}

.section {
	margin-bottom: 40rpx;
}

.section-title {
	margin-bottom: 16rpx;
}

.section-title-text {
	font-size: 32rpx;
	font-weight: bold;
	position: relative;
	padding-left: 20rpx;
}

.section-title-text::before {
	content: '';
	position: absolute;
	left: 0;
	top: 6rpx;
	bottom: 6rpx;
	width: 6rpx;
	background-color: #007AFF;
	border-radius: 3rpx;
}

.demo-box {
	background: #f8f8f8;
	border-radius: 12rpx;
	padding: 20rpx;
}

.demo-info {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 16rpx;
}

.view-box {
	position: relative;
	min-height: 200rpx;
}

.radio-label {
	display: inline-block;
	margin-right: 30rpx;
	margin-bottom: 20rpx;
	font-size: 28rpx;
}

.style-controls {
	margin-bottom: 20rpx;
}

.style-control-item {
	margin-bottom: 16rpx;
	font-size: 28rpx;
}

.color-picker {
	display: flex;
	flex-wrap: wrap;
	margin-top: 10rpx;
}

.color-item {
	width: 60rpx;
	height: 60rpx;
	border-radius: 30rpx;
	margin-right: 16rpx;
	margin-bottom: 16rpx;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
}

.button-group {
	display: flex;
	gap: 20rpx;
	margin-bottom: 20rpx;
}

.result-section {
	margin-top: 30rpx;
}

.result-box {
	background: #f8f8f8;
	border-radius: 12rpx;
	padding: 20rpx;
}

.event-log {
	font-size: 26rpx;
	color: #666;
	padding: 8rpx 0;
	border-bottom: 1px solid #eee;
}
</style>
