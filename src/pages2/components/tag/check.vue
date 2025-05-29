<template>
	<view class="demo-page">
		<view class="demo-header">
			<text class="demo-title">CheckTag 可选中标签</text>
			<text class="demo-description">可选中的标签组件，类似复选框但具有按钮式的样式</text>
		</view>

		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="demo-section-title">基础用法</view>
			<view class="demo-content">
				<zx-check-tag v-model:checked="basicChecked" text="可选标签" @change="handleBasicChange" />
				<text class="demo-result">当前状态：{{ basicChecked ? '已选中' : '未选中' }}</text>
			</view>
		</view>

		<!-- 主题类型 -->
		<view class="demo-section">
			<view class="demo-section-title">主题类型</view>
			<view class="demo-content">
				<view class="demo-row">
					<zx-check-tag v-model:checked="typeChecked.primary" text="Primary" type="primary" />
					<zx-check-tag v-model:checked="typeChecked.success" text="Success" type="success" />
					<zx-check-tag v-model:checked="typeChecked.info" text="Info" type="info" />
				</view>
				<view class="demo-row">
					<zx-check-tag v-model:checked="typeChecked.warning" text="Warning" type="warning" />
					<zx-check-tag v-model:checked="typeChecked.danger" text="Danger" type="danger" />
				</view>
			</view>
		</view>

		<!-- 尺寸大小 -->
		<view class="demo-section">
			<view class="demo-section-title">尺寸大小</view>
			<view class="demo-content">
				<view class="demo-row">
					<zx-check-tag v-model:checked="sizeChecked.small" text="小尺寸" size="small" />
					<zx-check-tag v-model:checked="sizeChecked.default" text="默认尺寸" size="default" />
					<zx-check-tag v-model:checked="sizeChecked.large" text="大尺寸" size="large" />
				</view>
			</view>
		</view>

		<!-- 禁用状态 -->
		<view class="demo-section">
			<view class="demo-section-title">禁用状态</view>
			<view class="demo-content">
				<view class="demo-row">
					<zx-check-tag :checked="false" text="禁用未选中" disabled />
					<zx-check-tag :checked="true" text="禁用已选中" disabled />
				</view>
			</view>
		</view>

		<!-- 自定义颜色 -->
		<view class="demo-section">
			<view class="demo-section-title">自定义颜色</view>
			<view class="demo-content">
				<view class="demo-row">
					<zx-check-tag 
						v-model:checked="customColorChecked.red" 
						text="红色主题" 
						bg-color="#ff6b6b"
						color="#ffffff"
						border-color="#ff6b6b"
					/>
					<zx-check-tag 
						v-model:checked="customColorChecked.purple" 
						text="紫色主题" 
						bg-color="#8c7ae6"
						color="#ffffff"
						border-color="#8c7ae6"
					/>
				</view>
				<view class="demo-row">
					<zx-check-tag 
						v-model:checked="customColorChecked.orange" 
						text="橙色主题" 
						bg-color="#ffa726"
						color="#ffffff"
						border-color="#ffa726"
					/>
					<zx-check-tag 
						v-model:checked="customColorChecked.teal" 
						text="青色主题" 
						bg-color="#26a69a"
						color="#ffffff"
						border-color="#26a69a"
					/>
				</view>
			</view>
		</view>

		<!-- 自定义内容 -->
		<view class="demo-section">
			<view class="demo-section-title">自定义内容</view>
			<view class="demo-content">
				<view class="demo-row">
					<zx-check-tag v-model:checked="customContentChecked.emoji">
						<view class="custom-content">
							<text class="emoji">🎉</text>
							<text>庆祝</text>
						</view>
					</zx-check-tag>
					<zx-check-tag v-model:checked="customContentChecked.icon">
						<view class="custom-content">
							<text class="icon">★</text>
							<text>收藏</text>
						</view>
					</zx-check-tag>
					<zx-check-tag v-model:checked="customContentChecked.badge">
						<view class="custom-content">
							<text>VIP</text>
							<view class="badge">NEW</view>
						</view>
					</zx-check-tag>
				</view>
			</view>
		</view>

		<!-- 多选场景 -->
		<view class="demo-section">
			<view class="demo-section-title">多选场景</view>
			<view class="demo-content">
				<view class="demo-subtitle">选择你的兴趣爱好：</view>
				<view class="demo-row wrap">
					<zx-check-tag 
						v-for="hobby in hobbies" 
						:key="hobby.id"
						v-model:checked="hobby.checked" 
						:text="hobby.name" 
						:type="hobby.type"
						size="small"
						@change="handleHobbyChange(hobby)"
					/>
				</view>
				<text class="demo-result">
					已选择：{{ selectedHobbies.length > 0 ? selectedHobbies.join('、') : '暂无选择' }}
				</text>
			</view>
		</view>

		<!-- 全选/取消全选 -->
		<view class="demo-section">
			<view class="demo-section-title">全选操作</view>
			<view class="demo-content">
				<view class="demo-row">
					<zx-check-tag 
						:checked="isAllSelected" 
						text="全选" 
						type="primary" 
						@change="handleSelectAll"
					/>
					<button class="demo-btn" @tap="handleClearAll">清空选择</button>
				</view>
				<view class="demo-subtitle">技能标签：</view>
				<view class="demo-row wrap">
					<zx-check-tag 
						v-for="skill in skills" 
						:key="skill.id"
						v-model:checked="skill.checked" 
						:text="skill.name" 
						type="info"
						size="small"
					/>
				</view>
			</view>
		</view>

		<!-- 事件监听 -->
		<view class="demo-section">
			<view class="demo-section-title">事件监听</view>
			<view class="demo-content">
				<zx-check-tag 
					v-model:checked="eventChecked" 
					text="监听事件" 
					type="warning"
					@change="handleEventChange"
				/>
				<view class="demo-log">
					<text class="demo-log-title">事件日志：</text>
					<view v-for="(log, index) in eventLogs" :key="index" class="demo-log-item">
						<text>{{ log }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 基础用法
const basicChecked = ref(false)

// 主题类型
const typeChecked = ref({
	primary: true,
	success: false,
	info: true,
	warning: false,
	danger: true
})

// 尺寸大小
const sizeChecked = ref({
	small: false,
	default: true,
	large: false
})

// 自定义颜色
const customColorChecked = ref({
	red: false,
	purple: true,
	orange: false,
	teal: true
})

// 自定义内容
const customContentChecked = ref({
	emoji: false,
	icon: true,
	badge: false
})

// 兴趣爱好数据
const hobbies = ref([
	{ id: 1, name: '读书', checked: false, type: 'primary' },
	{ id: 2, name: '运动', checked: true, type: 'success' },
	{ id: 3, name: '音乐', checked: false, type: 'info' },
	{ id: 4, name: '旅行', checked: true, type: 'warning' },
	{ id: 5, name: '摄影', checked: false, type: 'danger' },
	{ id: 6, name: '编程', checked: true, type: 'primary' },
	{ id: 7, name: '绘画', checked: false, type: 'success' },
	{ id: 8, name: '烹饪', checked: false, type: 'info' }
])

// 技能标签数据
const skills = ref([
	{ id: 1, name: 'Vue.js', checked: false },
	{ id: 2, name: 'JavaScript', checked: true },
	{ id: 3, name: 'TypeScript', checked: false },
	{ id: 4, name: 'Node.js', checked: true },
	{ id: 5, name: 'Python', checked: false },
	{ id: 6, name: 'React', checked: false }
])

// 事件监听
const eventChecked = ref(false)
const eventLogs = ref([])

// 计算已选择的兴趣爱好
const selectedHobbies = computed(() => {
	return hobbies.value.filter(hobby => hobby.checked).map(hobby => hobby.name)
})

// 计算是否全选
const isAllSelected = computed(() => {
	return skills.value.every(skill => skill.checked)
})

// 基础用法事件处理
const handleBasicChange = (checked) => {
	console.log('基础标签状态改变：', checked)
}

// 兴趣爱好变化处理
const handleHobbyChange = (hobby) => {
	console.log(`${hobby.name} 状态改变：`, hobby.checked)
}

// 全选操作
const handleSelectAll = (checked) => {
	skills.value.forEach(skill => {
		skill.checked = checked
	})
}

// 清空选择
const handleClearAll = () => {
	skills.value.forEach(skill => {
		skill.checked = false
	})
}

// 事件监听处理
const handleEventChange = (checked) => {
	const timestamp = new Date().toLocaleTimeString()
	const log = `${timestamp} - 状态变更为：${checked ? '选中' : '未选中'}`
	eventLogs.value.unshift(log)
	
	// 最多保留 5 条日志
	if (eventLogs.value.length > 5) {
		eventLogs.value = eventLogs.value.slice(0, 5)
	}
}
</script>

<style lang="scss" scoped>
.demo-page {
	padding: 20px;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-header {
	margin-bottom: 30px;
	text-align: center;
}

.demo-title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 10px;
}

.demo-description {
	font-size: 14px;
	color: #666;
	display: block;
}

.demo-section {
	background-color: #fff;
	margin-bottom: 20px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.demo-section-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	padding: 15px 20px;
	background-color: #fafafa;
	border-bottom: 1px solid #eee;
}

.demo-content {
	padding: 20px;
}

.demo-subtitle {
	font-size: 14px;
	color: #666;
	margin-bottom: 10px;
}

.demo-row {
	display: flex;
	gap: 10px;
	margin-bottom: 15px;
	align-items: center;
	
	&.wrap {
		flex-wrap: wrap;
	}
	
	&:last-child {
		margin-bottom: 0;
	}
}

.demo-result {
	font-size: 14px;
	color: #2979ff;
	background-color: #f0f8ff;
	padding: 8px 12px;
	border-radius: 4px;
	margin-top: 10px;
	display: block;
}

.demo-btn {
	background-color: #ff9900;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 6px 12px;
	font-size: 13px;
	cursor: pointer;
}

.custom-content {
	display: flex;
	align-items: center;
	gap: 4px;
}

.emoji {
	font-size: 14px;
}

.icon {
	color: #ffd700;
	font-size: 12px;
}

.badge {
	background-color: #ff4757;
	color: #fff;
	font-size: 10px;
	padding: 1px 4px;
	border-radius: 2px;
	margin-left: 2px;
}

.demo-log {
	margin-top: 15px;
	padding: 10px;
	background-color: #f9f9f9;
	border-radius: 4px;
	border-left: 3px solid #ff9900;
}

.demo-log-title {
	font-size: 13px;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 8px;
}

.demo-log-item {
	font-size: 12px;
	color: #666;
	margin-bottom: 4px;
	
	&:last-child {
		margin-bottom: 0;
	}
}
</style>
