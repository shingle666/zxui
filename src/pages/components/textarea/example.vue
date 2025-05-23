	<view class="example-container">
		<view class="title">zx-textarea 组件示例</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<zx-textarea 
				v-model="basicValue" 
				placeholder="请输入内容"
				@input="onInput"
				@change="onChange"
			/>
			<text class="result">输入值: {{ basicValue }}</text>
		</view>
		
		<!-- 带字数统计 -->
		<view class="section">
			<view class="section-title">带字数统计</view>
			<zx-textarea 
				v-model="countValue" 
				placeholder="最多输入100个字符"
				:count="true"
				:maxlength="100"
			/>
		</view>
		
		<!-- 清除按钮 -->
		<view class="section">
			<view class="section-title">清除按钮</view>
			<zx-textarea 
				v-model="clearableValue" 
				placeholder="带清除按钮的输入框"
				:clearable="true"
				@clear="onClear"
			/>
		</view>
		
		<!-- 自适应高度 -->
		<view class="section">
			<view class="section-title">自适应高度</view>
			<zx-textarea 
				v-model="autoHeightValue" 
				placeholder="输入区域高度自适应，不会出现滚动条"
				:auto-height="true"
			/>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">禁用状态</view>
			<zx-textarea 
				v-model="disabledValue" 
				placeholder="禁用状态"
				:disabled="true"
			/>
		</view>
		
		<!-- 不同边框样式 -->
		<view class="section">
			<view class="section-title">不同边框样式</view>
			<view class="border-examples">
				<view class="border-item">
					<text class="border-label">四周边框</text>
					<zx-textarea 
						v-model="borderValue1" 
						placeholder="四周边框"
						border="surround"
					/>
				</view>
				<view class="border-item">
					<text class="border-label">底部边框</text>
					<zx-textarea 
						v-model="borderValue2" 
						placeholder="底部边框"
						border="bottom"
					/>
				</view>
				<view class="border-item">
					<text class="border-label">无边框</text>
					<zx-textarea 
						v-model="borderValue3" 
						placeholder="无边框"
						border="none"
					/>
				</view>
			</view>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">自定义样式</view>
			<zx-textarea 
				v-model="customValue" 
				placeholder="自定义样式的输入框"
				:count="true"
				:maxlength="200"
				fontSize="16px"
				color="#333"
				backgroundColor="#f8f9fa"
				borderColor="#007bff"
				borderRadius="8px"
				padding="12px"
			/>
		</view>
		
		<!-- 不同输入模式 -->
		<view class="section">
			<view class="section-title">不同输入模式</view>
			<view class="input-mode-examples">
				<view class="mode-item">
					<text class="mode-label">数字输入</text>
					<zx-textarea 
						v-model="numericValue" 
						placeholder="数字输入模式"
						inputmode="numeric"
					/>
				</view>
				<view class="mode-item">
					<text class="mode-label">邮箱输入</text>
					<zx-textarea 
						v-model="emailValue" 
						placeholder="邮箱输入模式"
						inputmode="email"
					/>
				</view>
				<view class="mode-item">
					<text class="mode-label">搜索输入</text>
					<zx-textarea 
						v-model="searchValue" 
						placeholder="搜索输入模式"
						inputmode="search"
					/>
				</view>
			</view>
		</view>
		
		<!-- 键盘类型 -->
		<view class="section">
			<view class="section-title">键盘确认按钮类型</view>
			<view class="confirm-examples">
				<view class="confirm-item">
					<text class="confirm-label">发送</text>
					<zx-textarea 
						v-model="sendValue" 
						placeholder="确认按钮显示发送"
						confirm-type="send"
						@confirm="onConfirm"
					/>
				</view>
				<view class="confirm-item">
					<text class="confirm-label">搜索</text>
					<zx-textarea 
						v-model="searchConfirmValue" 
						placeholder="确认按钮显示搜索"
						confirm-type="search"
						@confirm="onConfirm"
					/>
				</view>
			</view>
		</view>
		
		<!-- 自定义占位符样式 -->
		<view class="section">
			<view class="section-title">自定义占位符样式</view>
			<zx-textarea 
				v-model="placeholderStyleValue" 
				placeholder="红色占位符文字"
				placeholder-style="color: #f56c6c; font-style: italic;"
			/>
		</view>
		
		<!-- 事件处理 -->
		<view class="section">
			<view class="section-title">事件处理</view>
			<zx-textarea 
				v-model="eventValue" 
				placeholder="测试各种事件"
				:count="true"
				:clearable="true"
				@focus="onFocus"
				@blur="onBlur"
				@input="onInputEvent"
				@change="onChangeEvent"
				@confirm="onConfirm"
				@clear="onClearEvent"
			/>
			<view class="event-log">
				<text class="log-title">事件日志:</text>
				<text 
					v-for="(log, index) in eventLogs" 
					:key="index" 
					class="log-item"
				>
					{{ log }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import zxTextarea from './zx-textarea.vue';

// 基础用法
const basicValue = ref('');

// 字数统计
const countValue = ref('');

// 清除按钮
const clearableValue = ref('Hello World');

// 自适应高度
const autoHeightValue = ref('');

// 禁用状态
const disabledValue = ref('这是禁用状态的文本内容，无法编辑');

// 不同边框样式
const borderValue1 = ref('');
const borderValue2 = ref('');
const borderValue3 = ref('');

// 自定义样式
const customValue = ref('');

// 不同输入模式
const numericValue = ref('');
const emailValue = ref('');
const searchValue = ref('');

// 键盘类型
const sendValue = ref('');
const searchConfirmValue = ref('');

// 自定义占位符样式
const placeholderStyleValue = ref('');

// 事件处理
const eventValue = ref('');
const eventLogs = ref([]);

// 方法
const onInput = (value) => {
	console.log('输入事件:', value);
};

const onChange = (value) => {
	console.log('变化事件:', value);
};

const onClear = () => {
	console.log('清除事件');
	addEventLog('清除事件触发');
};

const onFocus = (e) => {
	console.log('聚焦事件:', e);
	addEventLog('输入框获得焦点');
};

const onBlur = (e) => {
	console.log('失焦事件:', e);
	addEventLog('输入框失去焦点');
};

const onInputEvent = (value) => {
	addEventLog(`输入事件: ${value}`);
};

const onChangeEvent = (value) => {
	addEventLog(`变化事件: ${value}`);
};

const onConfirm = (e) => {
	console.log('确认事件:', e);
	addEventLog('确认按钮被点击');
};

const onClearEvent = () => {
	addEventLog('清除按钮被点击');
};

const addEventLog = (message) => {
	const timestamp = new Date().toLocaleTimeString();
	eventLogs.value.unshift(`[${timestamp}] ${message}`);
	// 只保留最近10条日志
	if (eventLogs.value.length > 10) {
		eventLogs.value = eventLogs.value.slice(0, 10);
	}
};
</script>

<style lang="scss" scoped>
.example-container {
	padding: 20px;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	text-align: center;
	margin-bottom: 30px;
}

.section {
	margin-bottom: 30px;
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 18px;
	font-weight: 600;
	color: #333;
	margin-bottom: 15px;
	border-left: 4px solid #007bff;
	padding-left: 10px;
}

.result {
	margin-top: 10px;
	padding: 8px 12px;
	background-color: #f8f9fa;
	border-radius: 4px;
	color: #666;
	font-size: 14px;
}

.border-examples {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.border-item {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.border-label {
	font-size: 14px;
	color: #666;
	font-weight: 500;
}

.input-mode-examples,
.confirm-examples {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.mode-item,
.confirm-item {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.mode-label,
.confirm-label {
	font-size: 14px;
	color: #666;
	font-weight: 500;
}

.event-log {
	margin-top: 15px;
	padding: 12px;
	background-color: #f8f9fa;
	border-radius: 4px;
	max-height: 200px;
	overflow-y: auto;
}

.log-title {
	font-size: 14px;
	font-weight: 600;
	color: #333;
	display: block;
	margin-bottom: 8px;
}

.log-item {
	display: block;
	font-size: 12px;
	color: #666;
	margin-bottom: 4px;
	padding: 2px 0;
	border-bottom: 1px solid #eee;
}

/* 响应式设计 */
@media (min-width: 768px) {
	.example-container {
		max-width: 800px;
		margin: 0 auto;
	}
	
	.border-examples,
	.input-mode-examples,
	.confirm-examples {
		flex-direction: row;
		gap: 20px;
	}
	
	.border-item,
	.mode-item,
	.confirm-item {
		flex: 1;
	}
}
</style> 