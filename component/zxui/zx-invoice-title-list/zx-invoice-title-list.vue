<template>
  <view class="zx-invoice-title-list">
    <!-- 发票抬头列表 -->
    <view class="zx-invoice-title-list__list">
      <view v-for="(item, index) in list" :key="item.id || index" class="zx-invoice-title-list__item" :class="{
        'zx-invoice-title-list__item--selected': isSelected(item),
        'zx-invoice-title-list__item--disabled': item.disabled
      }" @click="handleItemClick(item, index)">
        <!-- 左侧选择图标 -->
        <view class="zx-invoice-title-list__radio" v-if="!hideRadio">
          <zx-icon :name="isSelected(item) ? 'check-circle-fill' : 'circle'"
            :color="isSelected(item) ? checkedColor : '#c8c9cc'" size="20" />
        </view>

        <!-- 发票信息内容 -->
        <view class="zx-invoice-title-list__content">
          <!-- 发票抬头 -->
          <view class="zx-invoice-title-list__title">
            {{ item.title || item.name }}
          </view>

          <!-- 发票类型 -->
          <view class="zx-invoice-title-list__type">
            {{ getTypeText(item.type) }}
          </view>

          <!-- 税号 -->
          <view class="zx-invoice-title-list__tax-number" v-if="item.taxNumber">
            税号：{{ item.taxNumber }}
          </view>

          <!-- 自定义内容插槽 -->
          <slot name="item-content" :item="item" :index="index"></slot>

          <!-- 标签 -->
          <view class="zx-invoice-title-list__tags" v-if="item.isDefault || $slots.tag">
            <slot name="tag" :item="item" :index="index">
              <zx-tag v-if="item.isDefault" type="primary" size="mini">{{ defaultTagText }}</zx-tag>
            </slot>
          </view>
        </view>

        <!-- 右侧操作按钮 -->
        <view class="zx-invoice-title-list__actions">
          <!-- 编辑按钮 -->
          <view class="zx-invoice-title-list__edit" @click.stop="handleEdit(item, index)" v-if="!hideEdit">
            <zx-icon name="edit-pen" color="#969799" size="16" />
          </view>

          <!-- 删除按钮 -->
          <view class="zx-invoice-title-list__delete" @click.stop="handleDelete(item, index)" v-if="!hideDelete">
            <zx-icon name="trash" color="#ee0a24" size="16" />
          </view>

          <!-- 自定义右侧图标 -->
          <view class="zx-invoice-title-list__right-icon" v-if="rightIcon"
            @click.stop="handleRightIconClick(item, index)">
            <zx-icon :name="rightIcon" color="#969799" size="16" />
          </view>
        </view>
      </view>
    </view>

    <!-- 添加按钮 -->
    <view class="zx-invoice-title-list__add" @click="handleAdd" v-if="!hideAdd">
      <zx-icon name="plus-circle" color="#1989fa" size="16" />
      <text class="zx-invoice-title-list__add-text">{{ addButtonText }}</text>
    </view>

    <!-- 空状态 -->
    <view class="zx-invoice-title-list__empty" v-if="list.length === 0">
      <slot name="empty">
        <zx-empty description="暂无发票抬头" />
      </slot>
    </view>

    <!-- 底部内容插槽 -->
    <slot name="bottom"></slot>
  </view>
</template>

<script setup>
import { getCurrentInstance, ref, computed } from "vue";
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';
import zxTag from '@tanzhenxing/zx-tag/zx-tag.vue';
import zxEmpty from '@tanzhenxing/zx-empty/zx-empty.vue';


const { proxy } = getCurrentInstance();

// 设置组件名称
proxy.$options = proxy.$options || {};
proxy.$options.name = 'zx-invoice-title-list';

const emit = defineEmits([
  'update:modelValue',
  'select',
  'add',
  'edit',
  'delete',
  'click-item',
  'right-icon-click'
]);

const props = defineProps({
  // 当前选中的发票抬头ID
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
  // 发票抬头列表
  list: {
    type: Array,
    default: () => []
  },
  // 是否隐藏单选按钮
  hideRadio: {
    type: Boolean,
    default: false
  },
  // 是否隐藏编辑按钮
  hideEdit: {
    type: Boolean,
    default: false
  },
  // 是否隐藏删除按钮
  hideDelete: {
    type: Boolean,
    default: false
  },
  // 是否隐藏添加按钮
  hideAdd: {
    type: Boolean,
    default: false
  },
  // 添加按钮文字
  addButtonText: {
    type: String,
    default: '添加发票抬头'
  },
  // 默认标签文字
  defaultTagText: {
    type: String,
    default: '默认'
  },
  // 选中状态颜色
  checkedColor: {
    type: String,
    default: '#1989fa'
  },
  // 右侧图标
  rightIcon: {
    type: String,
    default: ''
  },
  // 是否多选模式
  multiple: {
    type: Boolean,
    default: false
  }
});

// 发票类型映射
const typeMap = {
  1: '增值税专用发票',
  2: '增值税普通发票',
  3: '增值税电子发票',
  'special': '增值税专用发票',
  'normal': '增值税普通发票',
  'electronic': '增值税电子发票'
};

// 获取发票类型文字
const getTypeText = (type) => {
  return typeMap[type] || '增值税普通发票';
};

// 判断是否选中
const isSelected = (item) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(item.id);
  }
  return props.modelValue === item.id;
};

// 处理项目点击
const handleItemClick = (item, index) => {
  if (item.disabled) return;

  let newValue;
  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const itemIndex = currentValue.indexOf(item.id);

    if (itemIndex > -1) {
      currentValue.splice(itemIndex, 1);
    } else {
      currentValue.push(item.id);
    }
    newValue = currentValue;
  } else {
    newValue = item.id;
  }

  emit('update:modelValue', newValue);
  emit('select', item, index);
  emit('click-item', item, index);
};

// 处理添加
const handleAdd = () => {
  emit('add');
};

// 处理编辑
const handleEdit = (item, index) => {
  emit('edit', item, index);
};

// 处理删除
const handleDelete = (item, index) => {
  emit('delete', item, index);
};

// 处理右侧图标点击
const handleRightIconClick = (item, index) => {
  emit('right-icon-click', item, index);
};
</script>

<style lang="scss" scoped>
.zx-invoice-title-list {
  background-color: #fff;

  &__list {
    // 列表容器样式
  }

  &__item {
    display: flex;
    align-items: flex-start;
    padding: 32rpx;
    border-bottom: 1px solid #ebedf0;
    transition: background-color 0.2s;

    &:last-child {
      border-bottom: none;
    }

    &--selected {
      background-color: #f7f8fa;
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:active {
      background-color: #f2f3f5;
    }
  }

  &__radio {
    margin-right: 24rpx;
    margin-top: 4rpx;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 32rpx;
    font-weight: 500;
    color: #323233;
    line-height: 44rpx;
    margin-bottom: 8rpx;
  }

  &__type {
    font-size: 28rpx;
    color: #646566;
    line-height: 40rpx;
    margin-bottom: 8rpx;
  }

  &__tax-number {
    font-size: 24rpx;
    color: #969799;
    line-height: 36rpx;
    margin-bottom: 8rpx;
  }

  &__tags {
    margin-top: 16rpx;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 24rpx;
    margin-left: 24rpx;
  }

  &__edit,
  &__delete,
  &__right-icon {
    padding: 8rpx;
    border-radius: 8rpx;
    transition: background-color 0.2s;

    &:active {
      background-color: #f2f3f5;
    }
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32rpx;
    border-top: 1px solid #ebedf0;
    background-color: #fafafa;
    transition: background-color 0.2s;

    &:active {
      background-color: #f2f3f5;
    }
  }

  &__add-text {
    margin-left: 16rpx;
    font-size: 28rpx;
    color: #1989fa;
  }

  &__empty {
    padding: 80rpx 32rpx;
    text-align: center;
  }
}
</style>