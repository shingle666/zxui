<template>
	<view class="zx-collapse" :class="{ 'zx-collapse--border': border }">
		<view
			v-for="(item, index) in items"
			:key="item.name || index"
			class="zx-collapse-item"
			:class="{
				'zx-collapse-item--active': isActive(item.name || index),
				'zx-collapse-item--disabled': item.disabled,
				'zx-collapse-item--border': border && index > 0
			}"
		>
			<!-- 折叠面板头部 -->
			<view
				class="zx-collapse-item__header"
				:class="{
					'zx-collapse-item__header--active': isActive(item.name || index),
					'zx-collapse-item__header--disabled': item.disabled
				}"
				@click="handleHeaderClick(item, index)"
				:hover-class="item.disabled ? '' : 'zx-collapse-item__header--hover'"
			>
				<!-- 图标 -->
				<view 
					class="zx-collapse-item__arrow"
					:class="{
						'zx-collapse-item__arrow--active': isActive(item.name || index),
						'zx-collapse-item__arrow--left': expandIconPosition === 'left',
						'zx-collapse-item__arrow--right': expandIconPosition === 'right'
					}"
				>
					<slot name="icon" :item="item" :isActive="isActive(item.name || index)">
						<zx-icon 
							:name="item.icon || 'arrow-right'" 
							:size="iconSize"
							:color="item.disabled ? disabledColor : (isActive(item.name || index) ? activeColor : normalColor)"
						></zx-icon>
					</slot>
				</view>
				
				<!-- 标题 -->
				<view 
					class="zx-collapse-item__title"
					:style="{
						'font-size': titleSize + 'rpx',
						'color': item.disabled ? disabledColor : (isActive(item.name || index) ? activeColor : titleColor),
						'font-weight': titleBold ? 'bold' : 'normal'
					}"
				>
					<slot name="title" :item="item" :isActive="isActive(item.name || index)">
						{{ item.title }}
					</slot>
				</view>
				
				<!-- 右侧额外内容 -->
				<view v-if="item.extra || $slots.extra" class="zx-collapse-item__extra">
					<slot name="extra" :item="item" :isActive="isActive(item.name || index)">
						<text :style="{ color: extraColor }">{{ item.extra }}</text>
					</slot>
				</view>
			</view>
			
			<!-- 折叠面板内容 -->
			<view 
				class="zx-collapse-item__wrap"
				:class="{ 'zx-collapse-item__wrap--active': isActive(item.name || index) }"
				:style="{ 
					height: isActive(item.name || index) ? 'auto' : '0',
					overflow: 'hidden',
					transition: `all ${animationDuration}ms ease-in-out`
				}"
			>
				<view 
					class="zx-collapse-item__content"
					:style="{ 
						padding: contentPadding,
						'font-size': contentSize + 'rpx',
						'color': contentColor
					}"
				>
					<slot :name="'content-' + (item.name || index)" :item="item" :index="index">
						<slot name="default" :item="item" :index="index">
							{{ item.content }}
						</slot>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * Collapse 折叠面板
	 * @description 可以折叠/展开的内容区域，用于展示层级结构信息
	 * @tutorial 
	 * @property {Array} items 折叠面板数据数组
	 * @property {String|Array} modelValue/v-model 当前激活的面板，手风琴模式下为字符串，否则为数组
	 * @property {Boolean} accordion 是否开启手风琴模式，开启后每次最多展开一个面板
	 * @property {Boolean} border 是否显示边框
	 * @property {String} expandIconPosition 展开图标位置，可选值：left/right
	 * @property {String} titleColor 标题颜色
	 * @property {String} contentColor 内容颜色
	 * @property {String} activeColor 激活状态颜色
	 * @property {String} normalColor 普通状态颜色
	 * @property {String} disabledColor 禁用状态颜色
	 * @property {String} extraColor 额外信息颜色
	 * @property {Number|String} titleSize 标题字体大小，单位rpx
	 * @property {Number|String} contentSize 内容字体大小，单位rpx
	 * @property {Number|String} iconSize 图标大小，单位rpx
	 * @property {Boolean} titleBold 标题是否加粗
	 * @property {String} contentPadding 内容内边距
	 * @property {Number} animationDuration 动画持续时间，单位ms
	 * @event {Function} change 切换面板时触发，返回当前激活的面板标识
	 * @event {Function} item-click 点击面板项时触发，返回点击的面板项和索引
	 */

	// 定义组件名称
	defineOptions({
		name: 'zx-collapse'
	})

	// 定义事件
	const emit = defineEmits(['update:modelValue', 'change', 'item-click'])

	// 定义 props
	const props = defineProps({
		// 折叠面板数据
		items: {
			type: Array,
			default: () => []
		},
		// 当前激活的面板
		modelValue: {
			type: [String, Number, Array],
			default: () => []
		},
		// 是否手风琴模式
		accordion: {
			type: Boolean,
			default: false
		},
		// 是否显示边框
		border: {
			type: Boolean,
			default: true
		},
		// 展开图标位置
		expandIconPosition: {
			type: String,
			default: 'right',
			validator: (value) => ['left', 'right'].includes(value)
		},
		// 标题颜色
		titleColor: {
			type: String,
			default: '#303133'
		},
		// 内容颜色
		contentColor: {
			type: String,
			default: '#606266'
		},
		// 激活状态颜色
		activeColor: {
			type: String,
			default: '#409EFF'
		},
		// 普通状态颜色
		normalColor: {
			type: String,
			default: '#909399'
		},
		// 禁用状态颜色
		disabledColor: {
			type: String,
			default: '#C0C4CC'
		},
		// 额外信息颜色
		extraColor: {
			type: String,
			default: '#909399'
		},
		// 标题字体大小
		titleSize: {
			type: [Number, String],
			default: 28
		},
		// 内容字体大小
		contentSize: {
			type: [Number, String],
			default: 26
		},
		// 图标大小
		iconSize: {
			type: [Number, String],
			default: 24
		},
		// 标题是否加粗
		titleBold: {
			type: Boolean,
			default: false
		},
		// 内容内边距
		contentPadding: {
			type: String,
			default: '20rpx'
		},
		// 动画持续时间
		animationDuration: {
			type: Number,
			default: 300
		}
	})

	// 判断面板是否激活
	const isActive = (name) => {
		if (props.accordion) {
			return props.modelValue === name
		} else {
			return Array.isArray(props.modelValue) && props.modelValue.includes(name)
		}
	}

	// 处理头部点击
	const handleHeaderClick = (item, index) => {
		if (item.disabled) return

		const name = item.name || index
		let newValue

		if (props.accordion) {
			// 手风琴模式
			newValue = isActive(name) ? '' : name
		} else {
			// 普通模式
			const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
			const activeIndex = currentValue.indexOf(name)
			
			if (activeIndex > -1) {
				currentValue.splice(activeIndex, 1)
			} else {
				currentValue.push(name)
			}
			newValue = currentValue
		}

		emit('update:modelValue', newValue)
		emit('change', newValue)
		emit('item-click', item, index)
	}
</script>

<style lang="scss" scoped>
	.zx-collapse {
		border-radius: 8rpx;
		overflow: hidden;
		
		&--border {
			border: 1px solid #EBEEF5;
		}
	}

	.zx-collapse-item {
		background-color: #fff;
		
		&--border {
			border-top: 1px solid #EBEEF5;
		}
		
		&--disabled {
			.zx-collapse-item__header {
				cursor: not-allowed;
			}
		}
	}

	.zx-collapse-item__header {
		display: flex;
		align-items: center;
		padding: 20rpx;
		min-height: 88rpx;
		cursor: pointer;
		transition: background-color 0.3s ease;
		
		&--hover {
			background-color: #F5F7FA;
		}
		
		&--active {
			color: #409EFF;
		}
		
		&--disabled {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}

	.zx-collapse-item__arrow {
		display: flex;
		align-items: center;
		transition: transform 0.3s ease;
		
		&--left {
			order: 1;
			margin-right: 16rpx;
		}
		
		&--right {
			order: 3;
			margin-left: auto;
		}
		
		&--active {
			transform: rotate(90deg);
		}
	}

	.zx-collapse-item__title {
		flex: 1;
		order: 2;
		line-height: 1.5;
	}

	.zx-collapse-item__extra {
		order: 3;
		margin-left: 16rpx;
		font-size: 24rpx;
	}

	.zx-collapse-item__wrap {
		transition: all 0.3s ease-in-out;
		overflow: hidden;
	}

	.zx-collapse-item__content {
		line-height: 1.6;
	}
</style>
