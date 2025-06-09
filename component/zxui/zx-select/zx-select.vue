<template>
	<view class="zx-select" @click.stop>
		<!-- 选择器输入框 -->
		<view class="zx-select__header">
			<text v-if="label" class="zx-select__label">{{ label }}：</text>
			<view :class="['zx-select__input', {
				'zx-select__input--focus': showOptions,
				'zx-select__input--disabled': disabled
			}]" @click="handleFocus">
				<!-- 前缀图标/内容 -->
				<slot name="prefix"></slot>

				<!-- 已选值显示区域 -->
				<view class="zx-select__input-box" v-if="!multiple">
					<view v-if="modelValue && selected" class="zx-select__input-text"
						:style="{ color: showOptions ? activeColor : '' }">{{ getSelectedLabel }}</view>
					<view v-else class="zx-select__input-text zx-select__input-placeholder">{{ placeholder }}</view>
				</view>

				<!-- 多选标签区域 -->
				<view class="zx-select__tags" v-else>
					<view v-if="modelValue && modelValue.length > 0" class="zx-select__tags-wrap">
						<view v-for="(item, index) in selectedOptions" :key="index" class="zx-select__tag">
							<slot name="tag" :item="item">
								<text class="zx-select__tag-text">{{ item[labelKey] }}</text>
								<zx-icon name="close" @click.stop="removeTag(item)" size="24rpx" color="#999999"></zx-icon>
							</slot>
						</view>
					</view>
					<view v-else class="zx-select__input-text zx-select__input-placeholder">{{ placeholder }}</view>
				</view>

				<!-- 清除图标 -->
				<view class="zx-select__clear" v-if="clear && modelValue && !disabled" @click.stop="clearSelection">
					<zx-icon name="close" size="32rpx" color="#c0c4cc"></zx-icon>
				</view>

				<!-- 箭头图标 -->
				<view class="zx-select__arrow">
					<zx-icon name="arrow-down" size="28rpx" color="#c0c4cc"></zx-icon>
				</view>
			</view>
		</view>

		<!-- 下拉选项面板 -->
		<view v-if="showOptions" class="zx-select__mask" @click.stop="handleMaskClick"></view>

		<view v-if="showOptions" class="zx-select__dropdown" :class="{ 'zx-select__dropdown--top': placement === 'top' }"
			:style="{ maxHeight: maxHeight + 'rpx' }">
			<!-- 顶部插槽 -->
			<slot name="header"></slot>

			<!-- 搜索框 -->
			<view class="zx-select__search-wrap" v-if="filterable">
				<zx-input class="zx-select__search" v-model="query" :placeholder="searchPlaceholder" confirm-type="search"
					@input="handleQueryChange" @confirm="handleQueryConfirm" />
			</view>

			<!-- 选项列表 -->
			<scroll-view class="zx-select__dropdown-list" scroll-y :scroll-top="scrollTop" @scroll="handleScroll">
				<!-- 空状态 -->
				<view v-if="mixinDatacomResData.length === 0" class="zx-select__empty">
					<slot name="empty">
						<text class="zx-select__empty-text">{{ emptyText }}</text>
					</slot>
				</view>

				<!-- 选项内容 -->
				<slot>
					<block v-for="(group, groupIndex) in groupedOptions" :key="groupIndex">
						<!-- 分组标题 -->
						<view class="zx-select__group-title" v-if="group.label">
							<text>{{ group.label }}</text>
						</view>

						<!-- 选项列表 -->
						<view v-for="(item, index) in group.options" :key="index" :class="['zx-select__item', {
							'zx-select__item--selected': isSelected(item),
							'zx-select__item--disabled': item.disabled || item.disable
						}]" @click.stop="handleOptionClick(item)">
							<slot name="option" :item="item">
								<text class="zx-select__item-label">{{ formatItemName(item) }}</text>
								<text v-if="isSelected(item) && !multiple" class="zx-select__item-check">✓</text>
								<view v-else-if="multiple" class="zx-select__checkbox"
									:class="{ 'zx-select__checkbox--checked': isSelected(item) }">
									<text v-if="isSelected(item)" class="zx-select__checkbox-inner">✓</text>
								</view>
							</slot>
						</view>
					</block>
				</slot>
			</scroll-view>

			<!-- 底部插槽 -->
			<slot name="footer"></slot>

			<!-- 底部按钮区域 - 多选时使用 -->
			<view v-if="multiple && showConfirmButton" class="zx-select__footer">
				<zx-button type="default" @click.stop="handleCancel">
					{{ cancelButtonText }}
				</zx-button>
				<zx-button type="primary" @click.stop="handleConfirm">
					{{ confirmButtonText }}
				</zx-button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';
import zxInput from '@tanzhenxing/zx-input/zx-input.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';

// 定义props
const props = defineProps({
	modelValue: {
		type: [String, Number, Array, Object],
		default: ''
	},
	localdata: {
		type: Array,
		default: () => []
	},
	collection: {
		type: String,
		default: ''
	},
	field: {
		type: String,
		default: ''
	},
	where: {
		type: [String, Object],
		default: ''
	},
	orderby: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: '请选择'
	},
	searchPlaceholder: {
		type: String,
		default: '搜索选项'
	},
	emptyText: {
		type: String,
		default: '暂无数据'
	},
	disabled: {
		type: Boolean,
		default: false
	},
	clear: {
		type: Boolean,
		default: true
	},
	multiple: {
		type: Boolean,
		default: false
	},
	filterable: {
		type: Boolean,
		default: false
	},
	showConfirmButton: {
		type: Boolean,
		default: true
	},
	confirmButtonText: {
		type: String,
		default: '确定'
	},
	cancelButtonText: {
		type: String,
		default: '取消'
	},
	valueKey: {
		type: String,
		default: 'value'
	},
	labelKey: {
		type: String,
		default: 'text'
	},
	groupKey: {
		type: String,
		default: 'group'
	},
	maxHeight: {
		type: [Number, String],
		default: 400
	},
	activeColor: {
		type: String,
		default: '#2979ff'
	},
	defItem: {
		type: Number,
		default: 0
	},
	format: {
		type: String,
		default: ''
	},
	placement: {
		type: String,
		default: 'bottom'
	},
	pageSize: {
		type: Number,
		default: 20
	},
	pageCurrent: {
		type: Number,
		default: 1
	}
});

// 定义emit事件
const emit = defineEmits([
	'update:modelValue',
	'change',
	'visible-change',
	'remove-tag',
	'clear',
	'focus',
	'blur',
	'search',
	'confirm',
	'cancel'
]);

// 内部状态
const showOptions = ref(false);
const query = ref('');
const scrollTop = ref(0);
const selectedOptions = ref([]);
const selected = ref(null);
const mixinDatacomResData = ref([]);
const mixinDatacomLoading = ref(false);
const lastSelectedValue = ref('');
const cacheKey = "zx-select-cache-key";

// 获取数据
const getData = async () => {
	// 如果有本地数据，直接使用
	if (props.localdata && props.localdata.length) {
		mixinDatacomResData.value = normalizeOptions(props.localdata);
		return;
	}

	// 如果有collection，尝试从云端获取数据
	if (props.collection) {
		try {
			mixinDatacomLoading.value = true;

			// 这里需要实现从uniCloud获取数据的逻辑
			// 由于我们没有完整的uniCloud环境，这里只做简单模拟
			// 实际使用时需要替换为真实的uniCloud数据获取逻辑

			const db = uniCloud?.database?.();
			if (db) {
				let query = db.collection(props.collection);

				// 添加条件
				if (props.where) {
					query = typeof props.where === 'string'
						? query.where(JSON.parse(props.where))
						: query.where(props.where);
				}

				// 添加排序
				if (props.orderby) {
					query = query.orderBy(props.orderby);
				}

				// 添加分页
				query = query.skip((props.pageCurrent - 1) * props.pageSize).limit(props.pageSize);

				// 添加字段映射
				if (props.field) {
					query = query.field(props.field);
				}

				const res = await query.get();
				if (res.result && res.result.data) {
					mixinDatacomResData.value = normalizeOptions(res.result.data);
				}
			}
		} catch (e) {
			console.error('获取数据失败', e);
		} finally {
			mixinDatacomLoading.value = false;
		}
	}
};

// 处理选项格式化
const normalizeOptions = (options) => {
	if (!options || !options.length) return [];

	return options.map(item => {
		if (typeof item === 'string' || typeof item === 'number') {
			return {
				[props.labelKey]: item,
				[props.valueKey]: item
			};
		} else if (typeof item === 'object') {
			// 确保有标准的label和value字段
			const normalizedItem = { ...item };

			// 如果没有指定的labelKey，尝试使用其他字段
			if (!normalizedItem[props.labelKey]) {
				normalizedItem[props.labelKey] = item.text || item.label || item.name || item[props.valueKey];
			}

			// 如果没有指定的valueKey，尝试使用其他字段
			if (normalizedItem[props.valueKey] === undefined) {
				normalizedItem[props.valueKey] = item.value || item.id;
			}

			return normalizedItem;
		}
		return item;
	});
};

// 根据搜索条件过滤选项
const filteredOptions = computed(() => {
	const options = mixinDatacomResData.value;
	if (!query.value) return options;

	return options.filter(item => {
		const label = item[props.labelKey] || '';
		return String(label).toLowerCase().includes(query.value.toLowerCase());
	});
});

// 是否选中某个选项
const isSelected = (option) => {
	const value = option[props.valueKey];
	if (props.multiple && Array.isArray(props.modelValue)) {
		return props.modelValue.some(val => {
			if (typeof val === 'object') {
				return val[props.valueKey] === value;
			}
			return val === value;
		});
	} else {
		if (typeof props.modelValue === 'object') {
			return props.modelValue[props.valueKey] === value;
		}
		return props.modelValue === value;
	}
};

// 获取选中项的标签
const getSelectedLabel = computed(() => {
	if (!props.modelValue) return '';

	if (selected.value) {
		return formatItemName(selected.value);
	}

	return '';
});

// 分组选项
const groupedOptions = computed(() => {
	const options = filteredOptions.value;
	const groups = [];
	const defaultGroup = { options: [] };

	options.forEach(option => {
		if (option[props.groupKey]) {
			let group = groups.find(g => g.label === option[props.groupKey]);
			if (!group) {
				group = { label: option[props.groupKey], options: [] };
				groups.push(group);
			}
			group.options.push(option);
		} else {
			defaultGroup.options.push(option);
		}
	});

	if (defaultGroup.options.length) {
		groups.unshift(defaultGroup);
	}

	return groups;
});

// 格式化显示项名称
const formatItemName = (item) => {
	if (!item) return '';

	const labelValue = item[props.labelKey];

	if (props.format) {
		// 格式化输出
		let str = props.format;
		for (let key in item) {
			str = str.replace(new RegExp(`{${key}}`, "g"), item[key]);
		}
		return str;
	}

	return labelValue || '';
};

// 获取当前选中的所有选项
const updateSelectedOptions = () => {
	if (props.multiple && Array.isArray(props.modelValue)) {
		selectedOptions.value = props.modelValue.map(value => {
			if (typeof value === 'object') {
				return value;
			}

			const option = mixinDatacomResData.value.find(item => item[props.valueKey] === value);
			return option || { [props.valueKey]: value, [props.labelKey]: value };
		});
	} else if (props.modelValue) {
		const option = mixinDatacomResData.value.find(item => {
			if (typeof props.modelValue === 'object') {
				return item[props.valueKey] === props.modelValue[props.valueKey];
			}
			return item[props.valueKey] === props.modelValue;
		});

		selected.value = option || null;
	} else {
		selected.value = null;
		selectedOptions.value = [];
	}
};

// 初始化默认值
const initDefVal = () => {
	let defValue = '';

	if ((props.modelValue || props.modelValue === 0) && !isDisabled(props.modelValue)) {
		defValue = props.modelValue;
	} else {
		let storedValue = null;

		// 尝试从缓存获取
		if (props.collection) {
			storedValue = getCache(props.collection);
		}

		if (storedValue || storedValue === 0) {
			defValue = storedValue;
		} else if (props.defItem > 0 && props.defItem <= mixinDatacomResData.value.length) {
			defValue = mixinDatacomResData.value[props.defItem - 1][props.valueKey];
		}

		if (defValue || defValue === 0) {
			emit('update:modelValue', defValue);
			emit('change', defValue);
		}
	}

	const def = mixinDatacomResData.value.find(item => item[props.valueKey] === defValue);
	selected.value = def || null;
};

// 判断值是否被禁用
const isDisabled = (value) => {
	let isDisabled = false;

	mixinDatacomResData.value.forEach(item => {
		if (item[props.valueKey] === value) {
			isDisabled = item.disabled || item.disable;
		}
	});

	return isDisabled;
};

// 缓存相关方法
const getCache = (key) => {
	try {
		const data = uni.getStorageSync(cacheKey) || {};
		return data[key];
	} catch (e) {
		return null;
	}
};

const setCache = (key, value) => {
	try {
		const data = uni.getStorageSync(cacheKey) || {};
		data[key] = value;
		uni.setStorageSync(cacheKey, data);
	} catch (e) {
		console.error('缓存设置失败', e);
	}
};

const removeCache = (key) => {
	try {
		const data = uni.getStorageSync(cacheKey) || {};
		delete data[key];
		uni.setStorageSync(cacheKey, data);
	} catch (e) {
		console.error('缓存删除失败', e);
	}
};

// 打开下拉框
const handleFocus = () => {
	if (props.disabled) return;

	showOptions.value = true;
	query.value = '';

	emit('visible-change', true);
	emit('focus');
};

// 隐藏下拉框
const hideOptions = () => {
	showOptions.value = false;
	query.value = '';
	emit('visible-change', false);
	emit('blur');
};

// 点击选项
const handleOptionClick = (option) => {
	if (option.disabled || option.disable) return;

	if (props.multiple) {
		const value = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
		const optionValue = option[props.valueKey];

		const index = value.findIndex(val => {
			if (typeof val === 'object') {
				return val[props.valueKey] === optionValue;
			}
			return val === optionValue;
		});

		if (index === -1) {
			value.push(optionValue);
		} else {
			value.splice(index, 1);
		}

		emit('update:modelValue', value);
		emit('change', value);

		// 多选不关闭下拉框
	} else {
		const value = option[props.valueKey];
		emit('update:modelValue', value);
		emit('change', value);

		// 单选选择后关闭下拉框
		hideOptions();

		// 缓存选中值
		if (props.collection) {
			setCache(props.collection, value);
		}
	}
};

// 移除标签
const removeTag = (tag) => {
	if (props.disabled) return;

	const value = [...props.modelValue];
	const index = value.findIndex(val => {
		if (typeof val === 'object') {
			return val[props.valueKey] === tag[props.valueKey];
		}
		return val === tag[props.valueKey];
	});

	if (index !== -1) {
		value.splice(index, 1);
		emit('update:modelValue', value);
		emit('change', value);
		emit('remove-tag', tag[props.valueKey]);
	}
};

// 清空选择
const clearSelection = () => {
	emit('update:modelValue', props.multiple ? [] : '');
	emit('change', props.multiple ? [] : '');
	emit('clear');

	if (props.collection) {
		removeCache(props.collection);
	}
};

// 确认多选
const handleConfirm = () => {
	emit('confirm', props.modelValue);
	hideOptions();

	// 缓存选中值
	if (props.collection && props.modelValue) {
		setCache(props.collection, props.modelValue);
	}
};

// 取消多选
const handleCancel = () => {
	emit('cancel');
	hideOptions();
};

// 搜索框内容变化
const handleQueryChange = (e) => {
	emit('search', query.value);
};

// 搜索确认
const handleQueryConfirm = () => {
	// 如果只有一个匹配项，自动选择
	if (filteredOptions.value.length === 1 && !props.multiple) {
		handleOptionClick(filteredOptions.value[0]);
	}
};

// 滚动处理
const handleScroll = (e) => {
	scrollTop.value = e.detail.scrollTop;
};

// 监听modelValue变化
watch(() => props.modelValue, () => {
	updateSelectedOptions();
}, { immediate: true, deep: true });

// 监听数据变化
watch([() => props.localdata, () => props.collection], () => {
	getData();
}, { immediate: true });

// 监听数据加载完成
watch(() => mixinDatacomResData.value, (val) => {
	if (val.length) {
		initDefVal();
	}
}, { deep: true });

// 组件挂载
onMounted(() => {
	getData();
});

// 组件卸载
onBeforeUnmount(() => {
	// 清理工作
});

// 点击遮罩层
const handleMaskClick = () => {
	hideOptions();
};
</script>

<style lang="scss">
.zx-select {
	position: relative;
	width: 100%;
	box-sizing: border-box;
	font-size: 28rpx;
}

.zx-select__header {
	display: flex;
	align-items: center;
}

.zx-select__label {
	font-size: 28rpx;
	font-weight: bold;
	color: #666;
	margin-right: 10rpx;
	flex-shrink: 0;
}

.zx-select__input {
	width: 100%;
	height: 80rpx;
	border: 1px solid #e4e7ed;
	border-radius: 8rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
	position: relative;
	box-sizing: border-box;
	flex: 1;
	transition: all 0.2s;
}

.zx-select__input--focus {
	border-color: #2979ff;
	box-shadow: 0 0 0 2px rgba(41, 121, 255, 0.1);
}

.zx-select__input--disabled {
	background-color: #f5f7fa;
	cursor: not-allowed;
	opacity: 0.7;
}

.zx-select__input-box {
	flex: 1;
	overflow: hidden;
}

.zx-select__input-text {
	width: 100%;
	color: #333;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.zx-select__input-placeholder {
	color: #909399;
}

.zx-select__arrow {
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.zx-select__arrow-icon {
	font-size: 20rpx;
	color: #909399;
	transition: transform 0.3s;
}

.zx-select__arrow-icon--reverse {
	transform: rotate(180deg);
}

.zx-select__clear {
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #c0c4cc;
	margin-right: 10rpx;
}

.zx-select__clear-icon {
	font-size: 28rpx;
}

.zx-select__mask {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 998;
	background-color: rgba(0, 0, 0, 0.5);
}

.zx-select__dropdown {
	position: fixed;
	left: 30rpx;
	right: 30rpx;
	z-index: 999;
	max-height: 600rpx;
	overflow: hidden;
	border-radius: 12rpx;
	background-color: #fff;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	top: 160rpx;
}

.zx-select__dropdown--top {
	bottom: 160rpx;
	top: auto;
}

.zx-select__search-wrap {
	padding: 16rpx;
	border-bottom: 1px solid #f0f0f0;
}

.zx-select__search {
	width: 100%;
	height: 70rpx;
	border: 1px solid #e4e7ed;
	border-radius: 8rpx;
	padding: 0 16rpx;
	font-size: 28rpx;
	background-color: #f5f7fa;
}

.zx-select__dropdown-list {
	flex: 1;
	overflow-y: auto;
}

.zx-select__empty {
	padding: 40rpx 0;
	text-align: center;
	color: #909399;
}

.zx-select__empty-text {
	font-size: 28rpx;
}

.zx-select__group-title {
	padding: 20rpx 30rpx;
	font-size: 26rpx;
	color: #909399;
	background-color: #fafafa;
	font-weight: bold;
}

.zx-select__item {
	padding: 24rpx 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #f5f5f5;
	transition: background-color 0.2s;
}

.zx-select__item:active {
	background-color: #f5f7fa;
}

.zx-select__item--selected {
	color: #2979ff;
	font-weight: 500;
	background-color: rgba(41, 121, 255, 0.05);
}

.zx-select__item--disabled {
	color: #c0c4cc;
	cursor: not-allowed;
}

.zx-select__item-label {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 28rpx;
}

.zx-select__item-check {
	margin-left: 16rpx;
	color: #2979ff;
	font-size: 32rpx;
}

.zx-select__checkbox {
	width: 36rpx;
	height: 36rpx;
	border: 1px solid #dcdfe6;
	border-radius: 4rpx;
	margin-left: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.zx-select__checkbox--checked {
	background-color: #2979ff;
	border-color: #2979ff;
}

.zx-select__checkbox-inner {
	color: #fff;
	font-size: 24rpx;
}

.zx-select__tags {
	flex: 1;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	overflow: hidden;
}

.zx-select__tags-wrap {
	display: flex;
	flex-wrap: wrap;
	max-width: 100%;
}

.zx-select__tag {
	display: flex;
	align-items: center;
	height: 48rpx;
	padding: 0 14rpx;
	margin: 4rpx;
	background-color: #f0f2f5;
	border-radius: 6rpx;
	max-width: 100%;
}

.zx-select__tag-text {
	font-size: 24rpx;
	color: #606266;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 160rpx;
}

.zx-select__tag-close {
	margin-left: 8rpx;
	font-size: 24rpx;
	color: #909399;
}

.zx-select__footer {
	display: flex;
	padding: 20rpx;
	border-top: 1px solid #f0f0f0;
}

.zx-select__btn {
	flex: 1;
	height: 70rpx;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 10rpx;
}

.zx-select__btn--cancel {
	border: 1px solid #dcdfe6;
	color: #606266;
}

.zx-select__btn--confirm {
	background-color: #2979ff;
	color: #ffffff;
}

/* 下拉箭头 */
.zx-select__arrow-bottom,
.zx-select__arrow-top {
	position: absolute;
	display: block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 12rpx;
	filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}

.zx-select__arrow-bottom {
	top: -12rpx;
	left: 10%;
	border-top-width: 0;
	border-bottom-color: #fff;
}

.zx-select__arrow-top {
	bottom: -12rpx;
	left: 10%;
	border-bottom-width: 0;
	border-top-color: #fff;
}
</style>
