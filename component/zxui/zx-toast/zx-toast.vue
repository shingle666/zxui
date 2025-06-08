<template>
	<view class="zx-toast">
		<zx-overlay :show="isShow=true" :custom-style="overlayStyle">
			<view class="zx-toast__content" :style="[contentStyle]"
				:class="['zx-type-' + currentConfig.type, currentConfig.type === 'loading' || currentConfig.loading ? 'zx-toast__content--loading' : '']">
				<zx-loading-icon v-if="currentConfig.type === 'loading'" mode="circle" color="rgb(255, 255, 255)"
					inactiveColor="rgb(120, 120, 120)" size="25"></zx-loading-icon>
				<zx-icon v-if="currentConfig.type !== 'loading'" :name="currentConfig.icon" size="34rpx" :color="currentConfig.type"
					:customStyle="iconStyle"></zx-icon>
				<zx-gap v-if="currentConfig.type === 'loading' || currentConfig.loading" height="12" bgColor="transparent"></zx-gap>
				<text class="zx-toast__content__text" :class="['zx-toast__content__text--' + currentConfig.type]"
					style="max-width: 400rpx;">{{ currentConfig.message }}</text>
			</view>
		</zx-overlay>
	</view>
</template>

<script setup>
	/**
	 * toast 消息提示
	 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
	 * @tutorial https://zxui.org/components/toast
	 * @property {String | Number}	zIndex		toast展示时的zIndex值 (默认 10090 )
	 * @property {Boolean}			loading		是否加载中 （默认 false ）
	 * @property {String | Number}	message		显示的文字内容
	 * @property {String}			icon		图标，或者绝对路径的图片
	 * @property {String}			type		主题类型 （默认 default）
	 * @property {Boolean}			show		是否显示该组件 （默认 false）
	 * @property {Boolean}			overlay		是否显示透明遮罩，防止点击穿透 （默认 false ）
	 * @property {String}			position	位置 （默认 'center' ）
	 * @property {Object}			params		跳转的参数
	 * @property {String | Number}  duration	展示时间，单位ms （默认 2000 ）
	 * @property {Boolean}			isTab		是否返回的为tab页面 （默认 false ）
	 * @property {String}			url			toast消失后是否跳转页面，有则跳转，优先级高于back参数
	 * @property {Boolean}			back		结束toast是否自动返回上一页 （默认 false ）
	 * @property {Object}			customStyle	组件的样式，对象形式
	 * @event {Function}            show        显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
	 * @example <zx-toast ref="toast"></zx-toast>
	 */
	import {
		computed,
		getCurrentInstance,
		onBeforeUnmount,
		ref,
		watch,
		defineProps,
		defineExpose
	} from 'vue';
	const {
		proxy
	} = getCurrentInstance();
	const props = defineProps({
		// 'primary', 'success', 'error', 'warning', 'default', 'loading'
		type: {
			type: String,
			default: 'default'
		},
		zIndex: {
			type: [String, Number],
			default: '10090'
		},
		// 是否加载中状态
		loading: {
			type: Boolean,
			default: false
		},
		// 显示文本
		message: {
			type: [String, Number],
			default: ''
		},
		// 显示的图标
		icon: {
			type: String,
			default: ''
		},
		// 是否防止触摸穿透
		overlay: {
			type: Boolean,
			default: false
		},
		// toast出现的位置
		position: {
			type: String,
			default: 'center'
		},
		params: {
			type: Object,
			default: () => ({})
		},
		// 显示的时间，毫秒
		duration: {
			type: [String, Number],
			default: 2000
		},
		isTab: {
			type: Boolean,
			default: false
		},
		url: {
			type: String,
			default: ''
		},
		back: {
			type: Boolean,
			default: false
		},
		customStyle: {
			type: Object,
			default: () => ({})
		},
		show: {
			type: Boolean,
			default: false
		}
	})

	const isShow = ref(props.show)
	const timer = ref(null) // 定时器
	
	// 内部配置状态，用于动态修改 toast 配置
	const internalConfig = ref({
		type: props.type,
		message: props.message,
		icon: props.icon,
		duration: props.duration,
		position: props.position,
		overlay: props.overlay,
		zIndex: props.zIndex,
		customStyle: props.customStyle,
		url: props.url,
		back: props.back,
		params: props.params,
		loading: props.loading,
		isTab: props.isTab
	})
	
	// 当前有效的配置（优先使用内部配置）
	const currentConfig = computed(() => ({
		type: internalConfig.value.type,
		message: internalConfig.value.message,
		icon: internalConfig.value.icon,
		duration: internalConfig.value.duration,
		position: internalConfig.value.position,
		overlay: internalConfig.value.overlay,
		zIndex: internalConfig.value.zIndex,
		customStyle: internalConfig.value.customStyle,
		url: internalConfig.value.url,
		back: internalConfig.value.back,
		params: internalConfig.value.params,
		loading: internalConfig.value.loading,
		isTab: internalConfig.value.isTab
	}))

	const overlayStyle = computed(() => {
		return {
			justifyContent: 'center',
			alignItems: 'center',
			display: 'flex',
			backgroundColor: currentConfig.value.overlay ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)',
			zIndex: currentConfig.value.zIndex,
		};
	})
	const iconStyle = computed(() => {
		const style = { marginRight: '4px' };
		// #ifdef APP-NVUE
		try {
			if (uni.getDeviceInfo().platform.toLowerCase() === 'ios') {
				style.marginTop = '-1px';
			}
		} catch (e) {}
		// #endif
		return style;
	})
	// 内容盒子的样式
	const contentStyle = computed(() => {
		let value = 0;
		let windowHeight = 600;
		try {
			windowHeight = uni.getWindowInfo().windowHeight;
		} catch (e) {}
		if (currentConfig.value.position === 'top') {
			value = -windowHeight * 0.25;
		} else if (currentConfig.value.position === 'bottom') {
			value = windowHeight * 0.25;
		}
		return {
			transform: `translateY(${value}px)`,
			...currentConfig.value.customStyle,
			zIndex: currentConfig.value.zIndex,
		};
	});

	// 监听props.show
	watch(() => props.show, (val) => {
		if (val) {
			show();
		} else {
			hide();
		}
	});

	onBeforeUnmount(() => {
		clearTimer();
	});

	// 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
	function show(options = {}) {
		clearTimer();
		// 更新内部配置
		if (typeof options === 'object') {
			Object.assign(internalConfig.value, options);
		}
		isShow.value = true;
		if (currentConfig.value.duration > 0) {
			timer.value = setTimeout(() => {
				hide();
			}, Number(currentConfig.value.duration));
		}
	}
	// 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
	function hide() {
		clearTimer();
		isShow.value = false;
		// 跳转逻辑
		if (currentConfig.value.url) {
			uni.navigateTo({ url: currentConfig.value.url, ...currentConfig.value.params });
		} else if (currentConfig.value.back) {
			uni.navigateBack();
		}
	}

	function clearTimer() {
		if (timer.value) {
			clearTimeout(timer.value);
			timer.value = null;
		}
	}

	defineExpose({ show, hide });
</script>

<style lang="scss" scoped>
	$zx-toast-color: #fff !default;
	$zx-toast-border-radius: 4px !default;
	$zx-toast-border-background-color: #585858 !default;
	$zx-toast-border-font-size: 14px !default;
	$zx-toast-border-padding: 12px 20px !default;
	$zx-toast-loading-border-padding: 20px 20px !default;
	$zx-toast-content-text-color: #fff !default;
	$zx-toast-content-text-font-size: 15px !default;
	$zx-toast-u-icon: 10rpx !default;
	$zx-toast-zx-type-primary-color: #3c9cff !default;
	$zx-toast-zx-type-primary-background-color: #ecf5ff !default;
	$zx-toast-zx-type-primary-border-color: rgb(215, 234, 254) !default;
	$zx-toast-zx-type-primary-border-width: 1px !default;
	$zx-toast-zx-type-success-color: #5ac725 !default;
	$zx-toast-zx-type-success-background-color: #dbf1e1 !default;
	$zx-toast-zx-type-success-border-color: #bef5c8 !default;
	$zx-toast-zx-type-success-border-width: 1px !default;
	$zx-toast-zx-type-error-color: #f56c6c !default;
	$zx-toast-zx-type-error-background-color: #fef0f0 !default;
	$zx-toast-zx-type-error-border-color: #fde2e2 !default;
	$zx-toast-zx-type-error-border-width: 1px !default;
	$zx-toast-zx-type-warning-color: #f9ae3d !default;
	$zx-toast-zx-type-warning-background-color: #fdf6ec !default;
	$zx-toast-zx-type-warning-border-color: #faecd8 !default;
	$zx-toast-zx-type-warning-border-width: 1px !default;
	$zx-toast-zx-type-default-color: #fff !default;
	$zx-toast-zx-type-default-background-color: #585858 !default;

	.zx-toast {
		&__content {
			display: flex;
			padding: $zx-toast-border-padding;
			border-radius: $zx-toast-border-radius;
			background-color: $zx-toast-border-background-color;
			color: $zx-toast-color;
			align-items: center;
			/* #ifndef APP-NVUE */
			max-width: 600rpx;
			/* #endif */
			position: relative;

			&--loading {
				flex-direction: column;
				padding: $zx-toast-loading-border-padding;
			}

			&__text {
				color: $zx-toast-content-text-color;
				font-size: $zx-toast-content-text-font-size;
				line-height: $zx-toast-content-text-font-size;

				&--default {
					color: $zx-toast-content-text-color;
				}

				&--error {
					color: #f56c6c;
				}

				&--primary {
					color: #3c9cff;
				}

				&--success {
					color: #5ac725;
				}

				&--warning {
					color: #f9ae3d;
				}
			}
		}
	}

	.zx-type-primary {
		color: $zx-toast-zx-type-primary-color;
		background-color: $zx-toast-zx-type-primary-background-color;
		border-color: $zx-toast-zx-type-primary-border-color;
		border-width: $zx-toast-zx-type-primary-border-width;
	}

	.zx-type-success {
		color: $zx-toast-zx-type-success-color;
		background-color: $zx-toast-zx-type-success-background-color;
		border-color: $zx-toast-zx-type-success-border-color;
		border-width: 1px;
	}

	.zx-type-error {
		color: $zx-toast-zx-type-error-color;
		background-color: $zx-toast-zx-type-error-background-color;
		border-color: $zx-toast-zx-type-error-border-color;
		border-width: $zx-toast-zx-type-error-border-width;
	}

	.zx-type-warning {
		color: $zx-toast-zx-type-warning-color;
		background-color: $zx-toast-zx-type-warning-background-color;
		border-color: $zx-toast-zx-type-warning-border-color;
		border-width: 1px;
	}

	.zx-type-default {
		color: $zx-toast-zx-type-default-color;
		background-color: $zx-toast-zx-type-default-background-color;
	}
</style>