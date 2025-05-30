<template>
	<view class="zx-container">
		<zx-navbar title="CheckTag 可选标签"></zx-navbar>
		<zx-title title="基本用法" type="line"></zx-title>
		<view class="zx-content-box">
			<zx-check-tag v-model:checked="checked1" text="标签1" @change="handleChange"></zx-check-tag>
			<zx-check-tag v-model:checked="checked2" text="标签2" type="success" style="margin-left: 10px;"></zx-check-tag>
			<view class="zx-text">选中状态1: {{ checked1 }}</view>
			<view class="zx-text">选中状态2: {{ checked2 }}</view>
		</view>

		<zx-title title="不同类型" type="line"></zx-title>
		<view class="zx-content-box">
			<zx-check-tag v-model:checked="typeChecked.primary" text="Primary" type="primary"></zx-check-tag>
			<zx-check-tag v-model:checked="typeChecked.success" text="Success" type="success" style="margin-left: 10px;"></zx-check-tag>
			<zx-check-tag v-model:checked="typeChecked.info" text="Info" type="info" style="margin-left: 10px;"></zx-check-tag>
			<zx-check-tag v-model:checked="typeChecked.warning" text="Warning" type="warning" style="margin-left: 10px; margin-top:10px;"></zx-check-tag>
			<zx-check-tag v-model:checked="typeChecked.danger" text="Danger" type="danger" style="margin-left: 10px; margin-top:10px;"></zx-check-tag>
		</view>

		<zx-title title="不同尺寸" type="line"></zx-title>
		<view class="zx-content-box">
			<zx-check-tag v-model:checked="sizeChecked.large" text="Large" size="large"></zx-check-tag>
			<zx-check-tag v-model:checked="sizeChecked.default" text="Default" size="default" style="margin-left: 10px;"></zx-check-tag>
			<zx-check-tag v-model:checked="sizeChecked.small" text="Small" size="small" style="margin-left: 10px;"></zx-check-tag>
		</view>

		<zx-title title="禁用状态" type="line"></zx-title>
		<view class="zx-content-box">
			<zx-check-tag v-model:checked="disabledChecked1" text="未选禁用" disabled></zx-check-tag>
			<zx-check-tag v-model:checked="disabledChecked2" text="选中禁用" disabled style="margin-left: 10px;"></zx-check-tag>
		</view>

		<zx-title title="自定义颜色" type="line"></zx-title>
		<view class="zx-content-box">
			<zx-check-tag
				v-model:checked="customColorChecked"
				text="自定义"
				bg-color="#f0f8ff"
				color="#4682b4"
				border-color="#add8e6"
			></zx-check-tag>
			<zx-check-tag
				v-model:checked="customColorCheckedActive"
				text="自定义激活"
				bg-color="#e6e6fa"
				color="#9370db"
				border-color="#dda0dd"
				style="margin-left: 10px;"
			></zx-check-tag>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

const checked1 = ref(false);
const checked2 = ref(true);

const typeChecked = reactive({
	primary: false,
	success: true,
	info: false,
	warning: true,
	danger: false
});

const sizeChecked = reactive({
	large: false,
	default: true,
	small: false
});

const disabledChecked1 = ref(false);
const disabledChecked2 = ref(true);

const customColorChecked = ref(false);
const customColorCheckedActive = ref(true);

const handleChange = (isChecked) => {
	uni.showToast({
		title: `标签1选中状态: ${isChecked}`,
		icon: 'none'
	});
};
</script>

<style lang="scss" scoped>
.zx-container {
	padding: 10px;
}

.zx-content-box {
	margin-bottom: 20px;
	padding: 10px;
	background-color: #fff;
	border-radius: 5px;
}

.zx-text {
	font-size: 14px;
	color: #666;
	margin-top: 10px;
}

/* 如果需要，可以在这里添加更多针对 zx-check-tag 的间距或布局样式 */
.zx-check-tag {
  margin-right: 5px; /* 给标签之间添加一些右边距 */
  margin-bottom: 5px; /* 给标签之间添加一些下边距，以处理换行 */
}
</style>