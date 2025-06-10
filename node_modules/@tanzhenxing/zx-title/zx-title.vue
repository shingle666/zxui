<template>
	<view class="zx-title" :style="[containerStyle]">
		<view v-if="iconShow" :style="[customIconWidth]" class="zx-title__icon">
			<zx-icon v-if="icon" :name="icon" :color="iconColor" :size="iconSize"></zx-icon>
			<text v-else class="linefont linefont-line" :style="{ color: iconColor, fontSize: iconSize }"></text>
		</view>
		<view class="zx-title__content" :style="contentStyle">
			<zx-text :text="title" :size="getSize" :align="align" :color="color" :bold="bold"></zx-text>
			<zx-text v-if="subtitle" :text="subtitle" :size="getSubtitleSize" :align="align" :color="subtitleColor" :bold="false" class="zx-title__subtitle"></zx-text>
		</view>
		<view v-if="$slots.right || rightText" class="zx-title__right">
			<slot name="right">
				<zx-text v-if="rightText" :text="rightText" :size="rightTextSize" :color="rightTextColor" @click="onRightClick"></zx-text>
			</slot>
		</view>
	</view>
</template>

<script setup>
/**
 * Title 标题
 * @description 标题组件
 * @tutorial
 * @property {String} type  标题类型 [h1|h2|h3|h4|h5] 标题类型
 * @property {String} title 标题内容
 * @property {String} subtitle 副标题内容
 * @property {String} align 对齐方式 [left|center|right]
 * @property {String} color 字体颜色
 * @property {String} bold  是否为粗体
 * @property {String} rightText 右侧文本
 * @property {String} rightTextColor 右侧文本颜色
 * @property {String} rightTextSize 右侧文本大小
 * @property {String} margin 外边距
 * @property {String} padding 内边距
 * @property {String} background 背景色
 * @property {String} borderRadius 圆角
 * @event {Function} onRight 点击右侧文本时触发
 */
import { ref, getCurrentInstance, computed } from 'vue';
import zxText from "@tanzhenxing/zx-text/zx-text.vue";
import zxIcon from "@tanzhenxing/zx-icon/zx-icon.vue";

const { proxy } = getCurrentInstance();

const props = defineProps({
	type: {
		type: String,
		default: 'h2'
	},
	title: {
		type: String,
		default: ''
	},
	subtitle: {
		type: String,
		default: ''
	},
	align: {
		type: String,
		default: 'left'
	},
	color: {
		type: String,
		default: '#333333'
	},
	subtitleColor: {
		type: String,
		default: '#666666'
	},
	bold: {
		type: Boolean,
		default: true
	},
	icon: {
		type: String,
		default: ''
	},
	iconShow: {
		type: Boolean,
		default: false
	},
	iconColor: {
		type: String,
		default: '#3c9cff'
	},
	iconSize: {
		type: String,
		default: '40rpx'
	},
	iconWidth: {
		type: String,
		default: ''
	},
	rightText: {
		type: String,
		default: ''
	},
	rightTextColor: {
		type: String,
		default: '#3c9cff'
	},
	rightTextSize: {
		type: String,
		default: '28rpx'
	},
	margin: {
		type: String,
		default: '0'
	},
	padding: {
		type: String,
		default: '15rpx 0'
	},
	background: {
		type: String,
		default: 'transparent'
	},
	borderRadius: {
		type: String,
		default: '0'
	}
});

const emit = defineEmits(['right']);

const onRightClick = () => {
	emit('right');
};

const getSize = computed(() => {
	let fontSize = '30rpx';
	switch (props.type.toLowerCase()) {
		case 'h1':
			fontSize = '44rpx';
			break;
		case 'h2':
			fontSize = '40rpx';
			break;
		case 'h3':
			fontSize = '36rpx';
			break;
		case 'h4':
			fontSize = '32rpx';
			break;
		case 'h5':
			fontSize = '28rpx';
			break;
	}
	return fontSize;
});

const getSubtitleSize = computed(() => {
	// 副标题比主标题小一号
	let fontSize = '24rpx';
	switch (props.type.toLowerCase()) {
		case 'h1':
			fontSize = '32rpx';
			break;
		case 'h2':
			fontSize = '28rpx';
			break;
		case 'h3':
			fontSize = '26rpx';
			break;
		case 'h4':
			fontSize = '24rpx';
			break;
		case 'h5':
			fontSize = '22rpx';
			break;
	}
	return fontSize;
});

const containerStyle = computed(() => {
	return {
		margin: props.margin,
		padding: props.padding,
		backgroundColor: props.background,
		borderRadius: props.borderRadius
	};
});

const contentStyle = computed(() => {
	return {
		flex: 1,
		textAlign: props.align
	};
});

const customIconWidth = computed(() => {
	return props.iconWidth ? { width: props.iconWidth } : { marginRight: '10rpx' };
});
</script>

<style scoped lang="scss">
@font-face {
	font-family: 'linefont'; /* Project id 4017099 */
	src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAJ8AAsAAAAABkQAAAIxAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACCcAo0UgE2AiQDCAsGAAQgBYRnBzsbmQURBfTJfh7YLtOWYmpHqfx0UzwyiUaT3ud4eBr337kz82EsmIUkJIBtHaFWoRSMtvnlXgHz1nRVMj2/ZS3LT/8j/935S9OlcQqlEBIhMYqcY3U36lL+BvTAC2JfS0K9UoIVDyjvAcmDpnZLKBOiTARiHAX1Wl8DkBGPCNRbbIW0bsPGnZrPHLxyTr/CDgZZZ5w5efygWp1TFNqsFarRnUU8VkW6k8aj6PPx29KoJanK7HO2Hlt/xOtvvsm3KrfIbwQBgd6XUIWM+SjEzu7aZlk08Vl9rBin3UXwTaUSRMWuPaH+Oru9EQzSevCNt1CABLc1URNaR72BaLp674Vy6/ndl9HtV2OHeOzdGHi3ZhD/s4r+LB3JYwLB5d9kf8uy/7UNBXzY38fILbAEtStHwp8w9oDEYuRJpUnQo0nTztV6p0iFnWr3bqzdccZWqNUxIlFjIENWa5wq3FxUabAU1WotR7151u9v0OGCLEpVh2kvgtDqjaTZE2StPlThvqjS7Ydqrf6otzuaTmswHebAqAQt6B0aQ6NzLYnCXtHPveK68hN5amgRijQvNy84Ik+xZlp8KeLAMQ1wlvdh3xMEphaNpLVIqLLMNb0kNTREBwwpAllA24GGQUYuIEvx+66QN+spDFLPGps0NDwopHKAuugjNHQnz0wWXkkIBziMDMBZT0O9HgGheVoLGSJVj6gElcwhOVRP1zeHTzsG9WwnhbMta7tcz1ujxsRQ2H0vigAA')
		format('woff2');
}

.linefont {
	font-family: 'linefont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.linefont-line:before {
	content: '\e600';
}

.zx-title {
	display: flex;
	flex-direction: row;
	flex: 1;
	align-items: center;
	
	&__icon {
		display: flex;
		align-items: center;
	}
	
	&__content {
		display: flex;
		flex-direction: column;
	}
	
	&__subtitle {
		margin-top: 5rpx;
	}
	
	&__right {
		margin-left: 20rpx;
	}
}
</style>
