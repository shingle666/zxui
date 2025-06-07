<template>
	<view class="container">
		<zx-navbar>
			<template #content>
				<text>Number Keyboard</text>
			</template>
		</zx-navbar>

		<view class="demo-section">
			<text class="section-title">默认样式</text>
			<input class="input-field" type="text" :value="value1" placeholder="点击弹出默认键盘" @focus="showKeyboard1 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard1"
				v-model="value1"
				@blur="showKeyboard1 = false"
				@input="onInput"
				@delete="onDelete"
			></zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">带右侧栏的键盘</text>
			<input class="input-field" type="text" :value="value2" placeholder="点击弹出带右侧栏的键盘" @focus="showKeyboard2 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard2"
				theme="custom"
				extra-key="."
				close-button-text="完成"
				v-model="value2"
				@blur="showKeyboard2 = false"
				@input="onInput"
				@delete="onDelete"
			></zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">身份证号键盘</text>
			<input class="input-field" type="text" :value="value3" placeholder="点击弹出身份证号键盘" @focus="showKeyboard3 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard3"
				extra-key="X"
				close-button-text="完成"
				v-model="value3"
				@blur="showKeyboard3 = false"
				@input="onInput"
				@delete="onDelete"
			></zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">键盘标题</text>
			<input class="input-field" type="text" :value="value4" placeholder="点击弹出带标题的键盘" @focus="showKeyboard4 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard4"
				title="请输入密码"
				extra-key="."
				close-button-text="完成"
				v-model="value4"
				@blur="showKeyboard4 = false"
				@input="onInput"
				@delete="onDelete"
			></zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">配置多个按键（自定义主题）</text>
			<input class="input-field" type="text" :value="value5" placeholder="点击弹出配置多个按键的键盘" @focus="showKeyboard5 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard5"
				theme="custom"
				:extra-key="['00', '.']"
				close-button-text="完成"
				v-model="value5"
				@blur="showKeyboard5 = false"
				@input="onInput"
				@delete="onDelete"
			></zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">随机数字键盘</text>
			<input class="input-field" type="text" :value="value6" placeholder="点击弹出随机数字键盘" @focus="showKeyboard6 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard6"
				random-key-order
				v-model="value6"
				@blur="showKeyboard6 = false"
				@input="onInput"
				@delete="onDelete"
			></zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">双向绑定与最大长度</text>
			<input class="input-field" type="text" :value="value7" placeholder="双向绑定,最多6位" @focus="showKeyboard7 = true" readonly />
			<zx-number-keyboard
				v-model="value7"
				:show="showKeyboard7"
				:maxlength="6"
				@blur="showKeyboard7 = false"
			></zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">自定义删除按键内容</text>
			<input class="input-field" type="text" :value="value8" placeholder="自定义删除按键" @focus="showKeyboard8 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard8"
				v-model="value8"
				@blur="showKeyboard8 = false"
			>
				<template #delete>
					<text style="color: red; font-size: 14px;">Del</text>
				</template>
			</zx-number-keyboard>
		</view>

		<view class="demo-section">
			<text class="section-title">自定义额外按键内容 (theme='custom')</text>
			<input class="input-field" type="text" :value="value9" placeholder="自定义额外按键" @focus="showKeyboard9 = true" readonly />
			<zx-number-keyboard
				:show="showKeyboard9"
				theme="custom"
				:extra-key="['OK']"
				v-model="value9"
				@blur="showKeyboard9 = false"
			>
				<template #extra-key>
					<text style="color: green; font-size: 18px;">OK</text>
				</template>
			</zx-number-keyboard>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'; 
import zxNumberKeyboard from '@tanzhenxing/zx-number-keyboard/zx-number-keyboard.vue';

const showToast = (msg) => {
	uni.showToast({
		title: String(msg),
		icon: 'none'
	});
};

const value1 = ref('');
const showKeyboard1 = ref(false);

const value2 = ref('');
const showKeyboard2 = ref(false);

const value3 = ref('');
const showKeyboard3 = ref(false);

const value4 = ref('');
const showKeyboard4 = ref(false);

const value5 = ref('');
const showKeyboard5 = ref(false);

const value6 = ref('');
const showKeyboard6 = ref(false);

const value7 = ref('');
const showKeyboard7 = ref(false);

const value8 = ref('');
const showKeyboard8 = ref(false);

const value9 = ref('');
const showKeyboard9 = ref(false);

const onInput = (value) => {
	// showToast(`输入: ${value}`);
	console.log('input', value);
};

const onDelete = () => {
	// showToast('删除');
	console.log('delete');
};

</script>

<style lang="scss" scoped>
.container {
	padding: 10px;
	padding-bottom: 50px; /* Ensure space for the last keyboard */
}

.demo-section {
	margin-bottom: 20px;
	padding: 10px;
	border: 1px solid #eee;
	border-radius: 5px;
}

.section-title {
	display: block;
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 10px;
}

.input-field {
	width: 100%;
	height: 40px;
	line-height: 40px;
	padding: 0 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	margin-bottom: 10px;
}
</style>