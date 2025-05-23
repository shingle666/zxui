<template>
	<view class="demo-page">
		<view class="demo-header">
			<text class="demo-title">zx-code 验证码组件演示</text>
		</view>
		
		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="section-title">1. 基础用法</view>
			<view class="demo-item">
				<zx-code 
					ref="basicRef"
					@start="handleBasicStart"
					@end="handleBasicEnd"
					@change="handleBasicChange"
					@tick="handleBasicTick"
				/>
			</view>
			<view class="demo-desc">默认60秒倒计时，点击按钮开始</view>
		</view>
		
		<!-- 自定义配置 -->
		<view class="demo-section">
			<view class="section-title">2. 自定义配置</view>
			<view class="demo-item">
				<zx-code 
					:seconds="30"
					start-text="发送验证码"
					change-text="X秒后可重发"
					end-text="重新发送"
					@start="handleCustomStart"
				/>
			</view>
			<view class="demo-desc">30秒倒计时，自定义文字</view>
		</view>
		
		<!-- 自定义UI -->
		<view class="demo-section">
			<view class="section-title">3. 自定义UI界面</view>
			<view class="demo-item">
				<zx-code 
					:seconds="60"
					@start="handleCustomUIStart"
				>
					<template #default="{ text, canGetCode, start }">
						<view 
							:class="['custom-btn', { 'custom-btn--disabled': !canGetCode }]"
							@click="start"
						>
							<text class="custom-btn-text">{{ text }}</text>
						</view>
					</template>
				</zx-code>
			</view>
			<view class="demo-desc">使用插槽自定义按钮样式</view>
		</view>
		
		<!-- 手动控制 -->
		<view class="demo-section">
			<view class="section-title">4. 手动控制倒计时</view>
			<view class="demo-item">
				<zx-code 
					ref="manualRef" 
					:auto-start="false"
					:seconds="45"
				/>
			</view>
			<view class="control-buttons">
				<button class="control-btn" @click="startManual">开始</button>
				<button class="control-btn" @click="pauseManual">暂停</button>
				<button class="control-btn" @click="resumeManual">恢复</button>
				<button class="control-btn" @click="resetManual">重置</button>
				<button class="control-btn" @click="getManualStatus">状态</button>
			</view>
			<view class="demo-desc">通过方法手动控制倒计时</view>
		</view>
		
		<!-- 页面刷新继续倒计时 -->
		<view class="demo-section">
			<view class="section-title">5. 页面刷新继续倒计时</view>
			<view class="demo-item">
				<zx-code 
					:seconds="120"
					:keep-running="true"
					unique-key="demo_persistent_timer"
					start-text="开始持久化倒计时"
					change-text="X秒后结束（支持刷新）"
					@start="handlePersistentStart"
				/>
			</view>
			<view class="demo-desc">启用keepRunning，页面刷新后倒计时继续</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="demo-section">
			<view class="section-title">6. 禁用状态</view>
			<view class="demo-item">
				<zx-code 
					:disabled="isDisabled"
					:seconds="60"
				/>
			</view>
			<view class="control-buttons">
				<button class="control-btn" @click="toggleDisabled">
					{{ isDisabled ? '启用' : '禁用' }}组件
				</button>
			</view>
			<view class="demo-desc">动态控制组件禁用状态</view>
		</view>
		
		<!-- 自动开始 -->
		<view class="demo-section">
			<view class="section-title">7. 自动开始倒计时</view>
			<view class="demo-item">
				<zx-code 
					:auto-start="true"
					:seconds="15"
					start-text="自动开始"
					change-text="自动倒计时 X秒"
					@start="handleAutoStart"
				/>
			</view>
			<view class="demo-desc">组件加载完成后自动开始倒计时</view>
		</view>
		
		<!-- 日志显示 -->
		<view class="demo-section">
			<view class="section-title">事件日志</view>
			<view class="log-container">
				<view 
					v-for="(log, index) in logs" 
					:key="index" 
					class="log-item"
				>
					{{ log }}
				</view>
			</view>
			<button class="control-btn clear-btn" @click="clearLogs">清空日志</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 引用
const basicRef = ref()
const manualRef = ref()

// 响应式数据
const isDisabled = ref(false)
const logs = ref([])

// 添加日志
const addLog = (message) => {
	const timestamp = new Date().toLocaleTimeString()
	logs.value.unshift(`[${timestamp}] ${message}`)
	
	// 限制日志条数
	if (logs.value.length > 50) {
		logs.value = logs.value.slice(0, 50)
	}
}

// 基础用法事件处理
const handleBasicStart = () => {
	addLog('基础组件：开始倒计时')
	// 模拟发送验证码API
	setTimeout(() => {
		addLog('基础组件：验证码发送成功')
	}, 500)
}

const handleBasicEnd = () => {
	addLog('基础组件：倒计时结束')
}

const handleBasicChange = (text) => {
	addLog(`基础组件：文字变化 -> ${text}`)
}

const handleBasicTick = (remainingTime) => {
	addLog(`基础组件：剩余时间 ${remainingTime}秒`)
}

// 自定义配置事件处理
const handleCustomStart = () => {
	addLog('自定义组件：开始倒计时')
}

// 自定义UI事件处理
const handleCustomUIStart = () => {
	addLog('自定义UI组件：开始倒计时')
}

// 手动控制方法
const startManual = () => {
	const success = manualRef.value.start()
	addLog(`手动控制：${success ? '成功开始' : '开始失败'}`)
}

const pauseManual = () => {
	manualRef.value.pause()
	addLog('手动控制：暂停倒计时')
}

const resumeManual = () => {
	manualRef.value.resume()
	addLog('手动控制：恢复倒计时')
}

const resetManual = () => {
	manualRef.value.reset()
	addLog('手动控制：重置倒计时')
}

const getManualStatus = () => {
	const status = manualRef.value.getStatus()
	addLog(`手动控制：当前状态 -> ${JSON.stringify(status)}`)
}

// 持久化倒计时事件处理
const handlePersistentStart = () => {
	addLog('持久化组件：开始倒计时（支持页面刷新）')
}

// 切换禁用状态
const toggleDisabled = () => {
	isDisabled.value = !isDisabled.value
	addLog(`禁用状态组件：${isDisabled.value ? '已禁用' : '已启用'}`)
}

// 自动开始事件处理
const handleAutoStart = () => {
	addLog('自动开始组件：自动开始倒计时')
}

// 清空日志
const clearLogs = () => {
	logs.value = []
	addLog('日志已清空')
}

// 页面加载
onMounted(() => {
	addLog('页面加载完成，开始演示')
})
</script>

<style lang="scss" scoped>
.demo-page {
	padding: 20px;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-header {
	text-align: center;
	margin-bottom: 30px;
}

.demo-title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
}

.demo-section {
	background-color: #ffffff;
	border-radius: 8px;
	padding: 20px;
	margin-bottom: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	color: #007aff;
	margin-bottom: 15px;
}

.demo-item {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
}

.demo-desc {
	font-size: 14px;
	color: #666;
	text-align: center;
	font-style: italic;
}

.custom-btn {
	padding: 12px 24px;
	background: linear-gradient(45deg, #007aff, #00d4ff);
	color: white;
	border-radius: 25px;
	text-align: center;
	box-shadow: 0 4px 8px rgba(0, 122, 255, 0.3);
	transition: all 0.3s ease;
	
	&:active {
		transform: scale(0.95);
	}
	
	&--disabled {
		background: #cccccc;
		box-shadow: none;
		transform: none;
	}
}

.custom-btn-text {
	font-size: 14px;
	font-weight: 500;
}

.control-buttons {
	display: flex;
	justify-content: center;
	gap: 10px;
	margin: 15px 0;
	flex-wrap: wrap;
}

.control-btn {
	padding: 8px 16px;
	background-color: #007aff;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	
	&:hover {
		background-color: #0056cc;
	}
	
	&:active {
		transform: scale(0.95);
	}
}

.clear-btn {
	background-color: #ff4757;
	
	&:hover {
		background-color: #ff3742;
	}
}

.log-container {
	background-color: #1e1e1e;
	border-radius: 4px;
	padding: 15px;
	max-height: 300px;
	overflow-y: auto;
	margin-bottom: 10px;
}

.log-item {
	color: #a0a0a0;
	font-size: 12px;
	font-family: 'Courier New', monospace;
	line-height: 1.4;
	margin-bottom: 2px;
	
	&:first-child {
		color: #00ff88;
	}
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
	.demo-page {
		padding: 10px;
	}
	
	.control-buttons {
		justify-content: center;
	}
	
	.control-btn {
		font-size: 12px;
		padding: 6px 12px;
	}
}
</style> 