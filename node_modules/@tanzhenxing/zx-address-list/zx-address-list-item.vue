<template>
  <view class="zx-address-list-item" :class="{ 'zx-address-list-item--disabled': disabled }" @click="onClick">
    <view class="zx-address-list-item__wrapper">
      <view class="zx-address-list-item__content">
        <view v-if="switchable && !disabled" class="zx-address-list-item__radio-checkbox">
          <radio 
            v-if="singleChoice" 
            :value="address.id.toString()" 
            :checked="isChecked" 
            :disabled="disabled"
            color="#1989fa" 
            style="transform:scale(0.8)"
          />
          <checkbox 
            v-else 
            :value="address.id.toString()" 
            :checked="isChecked" 
            :disabled="disabled"
            color="#1989fa"
            style="transform:scale(0.8)"
          />
        </view>
        <view class="zx-address-list-item__info">
          <view class="zx-address-list-item__title">
            <text class="zx-address-list-item__name">{{ address.name }}</text>
            <text class="zx-address-list-item__tel">{{ address.tel }}</text>
            <zx-tag v-if="address.isDefault && defaultTagText" type="primary" size="mini" custom-class="zx-address-list-item__tag">{{ defaultTagText }}</zx-tag>
            <slot name="tag" :item="address"></slot>
          </view>
          <view class="zx-address-list-item__address">{{ address.address }}</view>
        </view>
      </view>
      <view v-if="!disabled" class="zx-address-list-item__edit" @click.stop="onEdit">
        <zx-icon :name="rightIcon" size="20"></zx-icon>
      </view>
    </view>
    <slot name="bottom" :item="address" :disabled="disabled"></slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import ZxIcon from '../zx-icon/zx-icon.vue'; // Assuming zx-icon component
import ZxTag from '../zx-tag/zx-tag.vue'; // Assuming zx-tag component

const props = defineProps({
  address: {
    type: Object,
    required: true,
  },
  disabled: Boolean,
  switchable: Boolean,
  singleChoice: Boolean,
  defaultTagText: String,
  rightIcon: {
    type: String,
    default: 'edit-pen',
  },
  modelValue: [String, Number, Array] // Added for checking selection status
});

const emit = defineEmits(['edit', 'click', 'select']);

const isChecked = computed(() => {
  if (!props.switchable) return false;
  if (props.singleChoice) {
    return props.modelValue === props.address.id;
  }
  return Array.isArray(props.modelValue) && props.modelValue.includes(props.address.id);
});

const onClick = (event) => {
  if (props.switchable && !props.disabled) {
    emit('select');
  }
  emit('click', event);
};

const onEdit = () => {
  emit('edit');
};

</script>

<style lang="scss" scoped>

.zx-address-list-item {
  padding: var(--uni-spacing-col-sm, 8px) var(--uni-spacing-row-sm, 8px);
  background-color: #fff; // Or your theme's background color
  border-radius: var(--uni-border-radius-lg, 8px);
  margin-bottom: var(--uni-spacing-col-sm, 8px);
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &--disabled {
    .zx-address-list-item__name,
    .zx-address-list-item__tel,
    .zx-address-list-item__address {
      color: var(--uni-text-color-disable, #c0c4cc);
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__content {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  &__radio-checkbox {
    margin-right: var(--uni-spacing-row-sm, 8px);
    display: flex;
    align-items: center;
  }

  &__info {
    flex: 1;
  }

  &__title {
    display: flex;
    align-items: center;
    margin-bottom: var(--uni-spacing-col-xs, 4px);
    font-size: var(--uni-font-size-lg, 16px);
    line-height: var(--uni-line-height-lg, 24px);
  }

  &__name {
    font-weight: bold;
    margin-right: var(--uni-spacing-row-sm, 8px);
  }

  &__tel {
    color: var(--uni-text-color-grey, #999);
    margin-right: var(--uni-spacing-row-sm, 8px);
  }

  &__tag {
    // margin-left: $uni-spacing-row-xs;
  }

  &__address {
    color: var(--uni-text-color-grey, #999);
    font-size: var(--uni-font-size-base, 14px); // Adjusted from 13px to base
    line-height: var(--uni-line-height-base, 20px);
  }

  &__edit {
    // position: absolute;
    // top: 50%;
    // right: var(--uni-spacing-row-md, 12px);
    // transform: translateY(-50%);
    padding-left: var(--uni-spacing-row-sm, 8px); // Add some space if not absolutely positioned
    color: var(--uni-text-color-placeholder, #c0c0c0); // van-gray-6 equivalent
    display: flex;
    align-items: center;
  }
}
</style>