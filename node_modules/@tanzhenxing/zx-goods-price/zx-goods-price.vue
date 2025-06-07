<template>
	<view class="zx-goods-price" :class="[`zx-goods-price--${size}`, { 'zx-goods-price--line-through': lineThrough }]"
		:style="priceStyle">
		<!-- 价格前缀 -->
		<slot name="prefix">
			<text v-if="prefix" class="zx-goods-price__prefix"
				:style="{ color: prefixColor, fontSize: prefixSize + 'rpx' }">
				{{ prefix }}
			</text>
		</slot>

		<!-- 货币符号 -->
		<text class="zx-goods-price__symbol" :style="{ color: color, fontSize: symbolSize + 'rpx' }">
			{{ currency }}
		</text>

		<!-- 整数部分 -->
		<text class="zx-goods-price__integer"
			:style="{ color: color, fontSize: integerSize + 'rpx', fontWeight: fontWeight }">
			{{ integerPart }}
		</text>

		<!-- 小数部分 -->
		<text v-if="showDecimal && decimalPart" class="zx-goods-price__decimal"
			:style="{ color: color, fontSize: decimalSize + 'rpx' }">
			.{{ decimalPart }}
		</text>

		<!-- 价格后缀 -->
		<slot name="suffix">
			<text v-if="suffix" class="zx-goods-price__suffix"
				:style="{ color: suffixColor, fontSize: suffixSize + 'rpx' }">
				{{ suffix }}
			</text>
		</slot>
	</view>
</template>

<script setup>
import { computed } from 'vue'

/**
 * zx-goods-price 商品价格组件
 * @description 用于展示商品价格，支持多种样式和格式化选项
 * @tutorial https://zxui.org/components/goods-price
 * @property {String|Number} price 价格，支持字符串和数字
 * @property {String} currency 货币符号 (默认 ¥)
 * @property {String} prefix 价格前缀文字
 * @property {String} suffix 价格后缀文字
 * @property {Number} decimalLength 小数位数 (默认 2)
 * @property {Boolean} showDecimal 是否显示小数部分 (默认 true)
 * @property {String} size 尺寸大小，可选值：small、normal、large (默认 normal)
 * @property {String} color 价格颜色 (默认 #ee0a24)
 * @property {String} prefixColor 前缀颜色 (默认继承color)
 * @property {String} suffixColor 后缀颜色 (默认继承color)
 * @property {Number} symbolSize 货币符号字体大小 (默认根据size自动计算)
 * @property {Number} integerSize 整数部分字体大小 (默认根据size自动计算)
 * @property {Number} decimalSize 小数部分字体大小 (默认根据size自动计算)
 * @property {Number} prefixSize 前缀字体大小 (默认根据size自动计算)
 * @property {Number} suffixSize 后缀字体大小 (默认根据size自动计算)
 * @property {String} fontWeight 字体粗细 (默认 normal)
 * @property {Boolean} lineThrough 是否显示删除线 (默认 false)
 * @property {String} customStyle 自定义样式
 * @example <zx-goods-price price="99.99" />
 */

const props = defineProps({
	// 价格
	price: {
		type: [String, Number],
		default: 0
	},
	// 货币符号
	currency: {
		type: String,
		default: '¥'
	},
	// 价格前缀
	prefix: {
		type: String,
		default: ''
	},
	// 价格后缀
	suffix: {
		type: String,
		default: ''
	},
	// 小数位数
	decimalLength: {
		type: Number,
		default: 2
	},
	// 是否显示小数部分
	showDecimal: {
		type: Boolean,
		default: true
	},
	// 尺寸
	size: {
		type: String,
		default: 'normal',
		validator: (value) => ['small', 'normal', 'large'].includes(value)
	},
	// 价格颜色
	color: {
		type: String,
		default: '#ee0a24'
	},
	// 前缀颜色
	prefixColor: {
		type: String,
		default: ''
	},
	// 后缀颜色
	suffixColor: {
		type: String,
		default: ''
	},
	// 货币符号字体大小
	symbolSize: {
		type: Number,
		default: 0
	},
	// 整数部分字体大小
	integerSize: {
		type: Number,
		default: 0
	},
	// 小数部分字体大小
	decimalSize: {
		type: Number,
		default: 0
	},
	// 前缀字体大小
	prefixSize: {
		type: Number,
		default: 0
	},
	// 后缀字体大小
	suffixSize: {
		type: Number,
		default: 0
	},
	// 字体粗细
	fontWeight: {
		type: [String, Number],
		default: 'normal'
	},
	// 是否显示删除线
	lineThrough: {
		type: Boolean,
		default: false
	},
	// 自定义样式
	customStyle: {
		type: String,
		default: ''
	}
})

// 格式化价格
const formatPrice = (price) => {
	const num = Number(price) || 0
	return num.toFixed(props.decimalLength)
}

// 价格分割
const priceParts = computed(() => {
	const formatted = formatPrice(props.price)
	return formatted.split('.')
})

// 整数部分
const integerPart = computed(() => priceParts.value[0] || '0')

// 小数部分
const decimalPart = computed(() => priceParts.value[1] || '')

// 尺寸配置
const sizeConfig = computed(() => {
	const configs = {
		small: {
			symbol: 20,
			integer: 24,
			decimal: 20,
			prefix: 20,
			suffix: 20
		},
		normal: {
			symbol: 24,
			integer: 32,
			decimal: 24,
			prefix: 24,
			suffix: 24
		},
		large: {
			symbol: 28,
			integer: 40,
			decimal: 28,
			prefix: 28,
			suffix: 28
		}
	}
	return configs[props.size] || configs.normal
})

// 计算字体大小
const symbolSize = computed(() => props.symbolSize || sizeConfig.value.symbol)
const integerSize = computed(() => props.integerSize || sizeConfig.value.integer)
const decimalSize = computed(() => props.decimalSize || sizeConfig.value.decimal)
const prefixSize = computed(() => props.prefixSize || sizeConfig.value.prefix)
const suffixSize = computed(() => props.suffixSize || sizeConfig.value.suffix)

// 计算颜色
const prefixColor = computed(() => props.prefixColor || props.color)
const suffixColor = computed(() => props.suffixColor || props.color)

// 组件样式
const priceStyle = computed(() => {
	let style = ''
	if (props.customStyle) {
		style += props.customStyle
	}
	return style
})
</script>

<style lang="scss" scoped>
.zx-goods-price {
	display: inline-flex;
	align-items: baseline;
	flex-wrap: nowrap;
	line-height: 1;

	&--line-through {
		text-decoration: line-through;
	}

	&__prefix,
	&__symbol,
	&__integer,
	&__decimal,
	&__suffix {
		line-height: 1;
	}

	&__prefix {
		margin-right: 4rpx;
	}

	&__symbol {
		margin-right: 10rpx;
	}

	&__decimal {
		margin-left: 0;
	}

	&__suffix {
		margin-left: 4rpx;
	}
}
</style>