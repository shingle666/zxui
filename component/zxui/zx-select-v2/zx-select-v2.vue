<template>
  <view class="zx-select-v2" :class="{ 'zx-select-v2--disabled': disabled }">
    <!-- 选择器触发器 -->
    <view class="zx-select-v2__wrapper" @click="handleTriggerClick">
      <view class="zx-select-v2__input-wrapper">
        <!-- 单选模式展示 -->
        <template v-if="!multiple">
          <view v-if="selectedLabel" class="zx-select-v2__single">
            <text class="zx-select-v2__label">{{ selectedLabel }}</text>
          </view>
          <view v-else class="zx-select-v2__placeholder">
            <text>{{ placeholder }}</text>
          </view>
        </template>
        
        <!-- 多选模式展示 -->
        <template v-else>
          <scroll-view v-if="selectedValues.length" scroll-x class="zx-select-v2__tags">
            <view v-if="collapseTags && selectedValues.length > 1" class="zx-select-v2__tags-wrapper">
              <view class="zx-select-v2__tag" :style="{ backgroundColor: tagColor }">
                <text>{{ selectedLabels[0] }}</text>
                <text class="zx-select-v2__tag-close" @click.stop="handleTagClose(selectedValues[0])">×</text>
              </view>
              <view class="zx-select-v2__tag" :style="{ backgroundColor: tagColor }">
                <text>+{{ selectedValues.length - 1 }}</text>
              </view>
            </view>
            <template v-else>
              <view v-for="(item, index) in selectedValues" :key="index" class="zx-select-v2__tag" :style="{ backgroundColor: tagColor }">
                <text>{{ getLabel(item) }}</text>
                <text class="zx-select-v2__tag-close" @click.stop="handleTagClose(item)">×</text>
              </view>
            </template>
          </scroll-view>
          <view v-else class="zx-select-v2__placeholder">
            <text>{{ placeholder }}</text>
          </view>
        </template>
      </view>
      
      <!-- 后缀图标 -->
      <view class="zx-select-v2__suffix">
        <view v-if="clearable && (multiple ? selectedValues.length > 0 : modelValue !== undefined && modelValue !== '')" class="zx-select-v2__clear" @click.stop="handleClear">
          <text class="zx-select-v2__clear-icon">×</text>
        </view>
        <view v-else class="zx-select-v2__arrow" :class="{ 'is-reverse': isDropdownVisible }">
          <text class="zx-select-v2__arrow-icon">▼</text>
        </view>
      </view>
    </view>
    
    <!-- 下拉菜单 -->
    <view v-if="isDropdownVisible" class="zx-select-v2__dropdown" :class="{ 'zx-select-v2__dropdown--up': dropDirection === 'up' }">
      <!-- 自定义头部插槽 -->
      <slot name="header"></slot>
      
      <!-- 过滤输入框 -->
      <view v-if="filterable" class="zx-select-v2__filter">
        <input
          class="zx-select-v2__filter-input"
          type="text"
          v-model="filterText"
          :placeholder="filterPlaceholder"
          @input="handleFilterInput"
          @focus="handleFilterFocus"
          @blur="handleFilterBlur"
        />
      </view>
      
      <!-- 选项列表 -->
      <scroll-view
        class="zx-select-v2__list"
        scroll-y
        :style="{ height: `${listHeight}px` }"
        @scroll="handleScroll"
      >
        <view v-if="loading" class="zx-select-v2__loading">
          <slot name="loading">
            <view class="zx-select-v2__loading-indicator"></view>
            <text class="zx-select-v2__loading-text">加载中...</text>
          </slot>
        </view>
        
        <template v-else-if="filteredOptions.length > 0">
          <!-- 渲染分组 -->
          <template v-if="groupKey">
            <block v-for="(group, groupIndex) in filteredOptions" :key="groupIndex">
              <view class="zx-select-v2__group-title">{{ group[groupLabelKey] }}</view>
              <view 
                v-for="(option, optionIndex) in group[groupOptionsKey]" 
                :key="getValueKey(option)"
                class="zx-select-v2__option"
                :class="{ 
                  'zx-select-v2__option--selected': isOptionSelected(option),
                  'zx-select-v2__option--disabled': isOptionDisabled(option)
                }"
                @click="!isOptionDisabled(option) && handleOptionSelect(option)"
              >
                <slot name="default" :option="option">
                  <!-- 多选复选框 -->
                  <view v-if="multiple" class="zx-select-v2__checkbox">
                    <view v-if="isOptionSelected(option)" class="zx-select-v2__checkbox--checked"></view>
                  </view>
                  <!-- 选项内容 -->
                  <text class="zx-select-v2__option-label">{{ getOptionLabel(option) }}</text>
                </slot>
              </view>
            </block>
          </template>
          
          <!-- 渲染普通选项 -->
          <template v-else>
            <view 
              v-for="(option, index) in filteredOptions" 
              :key="getValueKey(option)"
              class="zx-select-v2__option"
              :class="{ 
                'zx-select-v2__option--selected': isOptionSelected(option),
                'zx-select-v2__option--disabled': isOptionDisabled(option)
              }"
              @click="!isOptionDisabled(option) && handleOptionSelect(option)"
            >
              <slot name="default" :option="option">
                <!-- 多选复选框 -->
                <view v-if="multiple" class="zx-select-v2__checkbox">
                  <view v-if="isOptionSelected(option)" class="zx-select-v2__checkbox--checked"></view>
                </view>
                <!-- 选项内容 -->
                <text class="zx-select-v2__option-label">{{ getOptionLabel(option) }}</text>
              </slot>
            </view>
          </template>
        </template>
        
        <!-- 无数据展示 -->
        <view v-else class="zx-select-v2__empty">
          <slot name="empty">
            <text class="zx-select-v2__empty-text">无数据</text>
          </slot>
        </view>
      </scroll-view>
      
      <!-- 自定义底部插槽 -->
      <slot name="footer"></slot>
      
      <!-- 创建选项按钮 -->
      <view v-if="allowCreate && filterText && !loading" class="zx-select-v2__create" @click="handleCreateOption">
        <text>创建 "{{ filterText }}"</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, toRaw } from 'vue';

// 定义组件属性
const props = defineProps({
  // 基础属性
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: undefined
  },
  multiple: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'default' // large, default, small
  },
  clearable: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  
  // 选项相关
  options: {
    type: Array,
    default: () => []
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  disabledKey: {
    type: String,
    default: 'disabled'
  },
  
  // 分组相关
  groupKey: {
    type: String,
    default: ''
  },
  groupLabelKey: {
    type: String,
    default: 'label'
  },
  groupOptionsKey: {
    type: String,
    default: 'options'
  },
  
  // 过滤相关
  filterable: {
    type: Boolean,
    default: false
  },
  filterMethod: {
    type: Function,
    default: null
  },
  filterPlaceholder: {
    type: String,
    default: '请输入关键词'
  },
  
  // UI相关
  collapseTags: {
    type: Boolean,
    default: false
  },
  tagColor: {
    type: String,
    default: '#f0f2f5'
  },
  listHeight: {
    type: Number,
    default: 300
  },
  loading: {
    type: Boolean,
    default: false
  },
  allowCreate: {
    type: Boolean,
    default: false
  },
  remote: {
    type: Boolean,
    default: false
  },
  remoteMethod: {
    type: Function,
    default: null
  }
});

// 定义事件
const emit = defineEmits([
  'update:modelValue', 
  'change', 
  'visible-change', 
  'remove-tag', 
  'clear', 
  'blur',
  'focus'
]);

// 内部状态
const isDropdownVisible = ref(false);
const filterText = ref('');
const selectedValues = ref([]);
const selectedLabels = ref([]);
const dropDirection = ref('down');

// 计算属性
// 获取过滤后的选项
const filteredOptions = computed(() => {
  if (!props.options || props.options.length === 0) {
    return [];
  }
  
  // 如果有远程搜索则直接返回
  if (props.remote) {
    return props.options;
  }
  
  // 无过滤直接返回
  if (!props.filterable || !filterText.value) {
    return props.options;
  }
  
  // 使用自定义过滤方法
  if (props.filterMethod && typeof props.filterMethod === 'function') {
    return props.filterMethod(filterText.value, props.options);
  }
  
  // 默认过滤方法
  const query = filterText.value.toLowerCase();
  
  // 处理分组选项
  if (props.groupKey) {
    return props.options.map(group => {
      const filteredGroup = {
        ...group,
        [props.groupOptionsKey]: group[props.groupOptionsKey].filter(option => {
          const label = getOptionLabel(option).toLowerCase();
          return label.includes(query);
        })
      };
      return filteredGroup;
    }).filter(group => group[props.groupOptionsKey].length > 0);
  }
  
  // 处理普通选项
  return props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase();
    return label.includes(query);
  });
});

// 单选模式下的选中标签
const selectedLabel = computed(() => {
  if (props.multiple || props.modelValue === undefined || props.modelValue === '') {
    return '';
  }
  
  const option = props.options.find(opt => {
    if (typeof opt === 'object') {
      return opt[props.valueKey] === props.modelValue;
    }
    return opt === props.modelValue;
  });
  
  return option ? getOptionLabel(option) : '';
});

// 工具方法
// 获取选项的标签
const getOptionLabel = (option) => {
  if (option === null || option === undefined) return '';
  if (typeof option === 'object') {
    return option[props.labelKey] || '';
  }
  return String(option);
};

// 获取选项的值
const getOptionValue = (option) => {
  if (option === null || option === undefined) return '';
  if (typeof option === 'object') {
    return option[props.valueKey];
  }
  return option;
};

// 获取选项的键值
const getValueKey = (item) => {
  return typeof item === 'object' ? getOptionValue(item) : item;
};

// 获取指定值对应的标签
const getLabel = (value) => {
  const option = props.options.find(opt => {
    if (typeof opt === 'object') {
      return opt[props.valueKey] === value;
    }
    return opt === value;
  });
  
  return option ? getOptionLabel(option) : value;
};

// 判断选项是否被选中
const isOptionSelected = (option) => {
  const value = getOptionValue(option);
  if (props.multiple) {
    return selectedValues.value.includes(value);
  }
  return props.modelValue === value;
};

// 判断选项是否被禁用
const isOptionDisabled = (option) => {
  if (typeof option === 'object' && props.disabledKey in option) {
    return Boolean(option[props.disabledKey]);
  }
  return false;
};

// 事件处理方法
// 处理触发器点击
const handleTriggerClick = () => {
  if (props.disabled) return;
  isDropdownVisible.value = !isDropdownVisible.value;
  emit('visible-change', isDropdownVisible.value);
  
  if (isDropdownVisible.value) {
    nextTick(() => {
      // 这里可以添加获取元素位置的逻辑
      // 决定下拉菜单是向上还是向下展示
    });
  }
};

// 处理选项选择
const handleOptionSelect = (option) => {
  const value = getOptionValue(option);
  
  if (props.multiple) {
    const index = selectedValues.value.indexOf(value);
    if (index > -1) {
      // 已选中，取消选择
      selectedValues.value.splice(index, 1);
      selectedLabels.value.splice(index, 1);
    } else {
      // 未选中，添加选择
      selectedValues.value.push(value);
      selectedLabels.value.push(getOptionLabel(option));
    }
    
    emit('update:modelValue', [...selectedValues.value]);
  } else {
    // 单选模式
    emit('update:modelValue', value);
    isDropdownVisible.value = false;
  }
  
  emit('change', props.multiple ? [...selectedValues.value] : value);
  
  // 选择后清空过滤文本
  if (props.filterable && !props.multiple) {
    filterText.value = '';
  }
};

// 处理标签关闭
const handleTagClose = (value) => {
  if (props.disabled) return;
  
  const index = selectedValues.value.indexOf(value);
  if (index > -1) {
    selectedValues.value.splice(index, 1);
    selectedLabels.value.splice(index, 1);
    
    emit('update:modelValue', [...selectedValues.value]);
    emit('remove-tag', value);
    emit('change', [...selectedValues.value]);
  }
};

// 处理清空
const handleClear = () => {
  if (props.disabled) return;
  
  if (props.multiple) {
    selectedValues.value = [];
    selectedLabels.value = [];
    emit('update:modelValue', []);
  } else {
    emit('update:modelValue', undefined);
  }
  
  emit('clear');
  emit('change', props.multiple ? [] : undefined);
};

// 处理过滤输入
const handleFilterInput = () => {
  if (props.remote && props.remoteMethod) {
    props.remoteMethod(filterText.value);
  }
};

// 处理过滤框聚焦
const handleFilterFocus = () => {
  emit('focus');
};

// 处理过滤框失焦
const handleFilterBlur = () => {
  emit('blur');
};

// 处理滚动事件，可用于实现虚拟滚动
const handleScroll = (e) => {
  // 虚拟滚动逻辑可以在这里实现
};

// 处理创建选项
const handleCreateOption = () => {
  const value = filterText.value;
  
  // 如果是对象数组，创建新对象
  const newOption = typeof props.options[0] === 'object' 
    ? { [props.labelKey]: value, [props.valueKey]: value } 
    : value;
  
  // 添加到选项中 (注意：这里仅是示例，实际中可能需要传递事件通知父组件添加)
  if (props.multiple) {
    selectedValues.value.push(getOptionValue(newOption));
    selectedLabels.value.push(getOptionLabel(newOption));
    emit('update:modelValue', [...selectedValues.value]);
  } else {
    emit('update:modelValue', getOptionValue(newOption));
    isDropdownVisible.value = false;
  }
  
  emit('change', props.multiple ? [...selectedValues.value] : getOptionValue(newOption));
  filterText.value = '';
};

// 初始化选中状态
const initSelected = () => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    selectedValues.value = [...props.modelValue];
    
    // 初始化已选标签
    selectedLabels.value = selectedValues.value.map(value => {
      return getLabel(value);
    });
  }
};

// 监听modelValue变化
watch(() => props.modelValue, (newVal) => {
  if (props.multiple && Array.isArray(newVal)) {
    selectedValues.value = [...newVal];
    
    // 更新已选标签
    selectedLabels.value = selectedValues.value.map(value => {
      return getLabel(value);
    });
  }
}, { deep: true, immediate: true });

// 监听下拉框显示状态
watch(isDropdownVisible, (visible) => {
  if (!visible) {
    filterText.value = '';
  }
});

// 生命周期钩子
onMounted(() => {
  initSelected();
});

// 对外暴露的方法
defineExpose({
  focus: () => {
    isDropdownVisible.value = true;
    emit('visible-change', true);
    emit('focus');
  },
  blur: () => {
    isDropdownVisible.value = false;
    emit('visible-change', false);
    emit('blur');
  },
  selectedLabel: computed(() => {
    if (props.multiple) {
      return selectedLabels.value;
    } else {
      return selectedLabel.value;
    }
  })
});
</script>

<style>
.zx-select-v2 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
}

.zx-select-v2--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.zx-select-v2__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70rpx;
  padding: 0 20rpx;
  border: 1px solid #dcdfe6;
  border-radius: 8rpx;
  background-color: #fff;
}

.zx-select-v2__input-wrapper {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.zx-select-v2__single {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.zx-select-v2__placeholder {
  color: #999;
}

.zx-select-v2__tags {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.zx-select-v2__tags-wrapper {
  display: flex;
  flex-wrap: nowrap;
}

.zx-select-v2__tag {
  display: inline-flex;
  align-items: center;
  padding: 0 16rpx;
  height: 48rpx;
  margin-right: 10rpx;
  border-radius: 6rpx;
  font-size: 24rpx;
  white-space: nowrap;
}

.zx-select-v2__tag-close {
  margin-left: 8rpx;
  color: #666;
  font-size: 20rpx;
}

.zx-select-v2__suffix {
  display: flex;
  align-items: center;
  margin-left: 10rpx;
}

.zx-select-v2__arrow {
  transition: transform 0.3s;
  font-size: 24rpx;
  color: #999;
}

.zx-select-v2__arrow.is-reverse {
  transform: rotate(180deg);
}

.zx-select-v2__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  color: #999;
}

.zx-select-v2__clear-icon {
  font-size: 36rpx;
}

.zx-select-v2__dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: 75rpx;
  z-index: 9999;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8rpx;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-height: 600rpx;
  overflow: hidden;
}

.zx-select-v2__dropdown--up {
  top: auto;
  bottom: 75rpx;
}

.zx-select-v2__filter {
  padding: 20rpx;
  border-bottom: 1px solid #ebeef5;
}

.zx-select-v2__filter-input {
  width: 100%;
  height: 60rpx;
  border: 1px solid #dcdfe6;
  border-radius: 6rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.zx-select-v2__list {
  width: 100%;
  overflow-y: auto;
}

.zx-select-v2__option {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  height: 80rpx;
  cursor: pointer;
}

.zx-select-v2__option:hover {
  background-color: #f5f7fa;
}

.zx-select-v2__option--selected {
  color: #409eff;
  font-weight: bold;
  background-color: #f5f7fa;
}

.zx-select-v2__option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zx-select-v2__checkbox {
  width: 32rpx;
  height: 32rpx;
  border: 1px solid #dcdfe6;
  border-radius: 4rpx;
  margin-right: 10rpx;
  position: relative;
}

.zx-select-v2__checkbox--checked {
  position: absolute;
  top: 6rpx;
  left: 6rpx;
  width: 20rpx;
  height: 20rpx;
  background-color: #409eff;
  border-radius: 2rpx;
}

.zx-select-v2__option-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.zx-select-v2__empty, 
.zx-select-v2__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  color: #999;
}

.zx-select-v2__loading-indicator {
  width: 30rpx;
  height: 30rpx;
  border: 2px solid #409eff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: zx-select-loading 0.8s linear infinite;
  margin-right: 10rpx;
}

.zx-select-v2__create {
  padding: 20rpx;
  border-top: 1px solid #ebeef5;
  color: #409eff;
  cursor: pointer;
}

.zx-select-v2__group-title {
  padding: 10rpx 20rpx;
  font-size: 24rpx;
  color: #999;
  background-color: #f5f7fa;
}

@keyframes zx-select-loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
