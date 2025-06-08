<template>
  <view class="zx-address-list">
    <slot name="top"></slot>
    <zx-radio-group v-if="singleChoice && list && list.length > 0" @change="onRadioChange">
      <view v-for="(item, index) in list" :key="item.id">
        <zx-address-list-item
          :address="item"
          :single-choice="singleChoice"
          :switchable="switchable"
          :default-tag-text="defaultTagText"
          :right-icon="rightIcon"
          @edit="onEdit(item, index)"
          @click="onClickItem(item, index, $event)"
          @select="onSelect(item, index)"
        >
          <template #tag v-if="slots.tag">
            <slot name="tag" :item="item"></slot>
          </template>
          <template #bottom v-if="slots['item-bottom']">
            <slot name="item-bottom" :item="item" :disabled="false"></slot>
          </template>
        </zx-address-list-item>
      </view>
    </zx-radio-group>
    <zx-checkbox-group v-else-if="!singleChoice && list && list.length > 0" @change="onCheckboxChange">
       <view v-for="(item, index) in list" :key="item.id">
        <zx-address-list-item
          :address="item"
          :single-choice="singleChoice"
          :switchable="switchable"
          :default-tag-text="defaultTagText"
          :right-icon="rightIcon"
          @edit="onEdit(item, index)"
          @click="onClickItem(item, index, $event)"
          @select="onSelect(item, index)"
        >
          <template #tag v-if="slots.tag">
            <slot name="tag" :item="item"></slot>
          </template>
          <template #bottom v-if="slots['item-bottom']">
            <slot name="item-bottom" :item="item" :disabled="false"></slot>
          </template>
        </zx-address-list-item>
      </view>
    </zx-checkbox-group>

    <view v-if="disabledText && disabledList && disabledList.length > 0" class="zx-address-list__disabled-text">
      {{ disabledText }}
    </view>
    <view v-if="disabledList && disabledList.length > 0">
      <view v-for="(item, index) in disabledList" :key="item.id">
        <zx-address-list-item
          :address="item"
          :disabled="true"
          :switchable="switchable"
          :default-tag-text="defaultTagText"
          :right-icon="rightIcon"
          @edit="onEditDisabled(item, index)"
          @click="onClickItem(item, index, $event)"
          @select="onSelectDisabled(item, index)"
        >
          <template #tag v-if="slots.tag">
            <slot name="tag" :item="item"></slot>
          </template>
          <template #bottom v-if="slots['item-bottom']">
            <slot name="item-bottom" :item="item" :disabled="true"></slot>
          </template>
        </zx-address-list-item>
      </view>
    </view>

    <slot></slot>

    <view v-if="showAddButton" class="zx-address-list__bottom safe-area-inset-bottom">
      <zx-button round block type="primary" @click="onAdd" class="zx-address-list__add">
        {{ addButtonText || '新增地址' }}
      </zx-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, useSlots } from 'vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxAddressListItem from './zx-address-list-item.vue';
import zxCheckboxGroup from '@tanzhenxing/zx-checkbox-group/zx-checkbox-group.vue';
import zxRadioGroup from '@tanzhenxing/zx-radio-group/zx-radio-group.vue';

const props = defineProps({
  modelValue: [String, Number, Array],
  list: {
    type: Array,
    default: () => [],
  },
  disabledList: {
    type: Array,
    default: () => [],
  },
  disabledText: String,
  switchable: {
    type: Boolean,
    default: true,
  },
  showAddButton: {
    type: Boolean,
    default: true,
  },
  addButtonText: String,
  defaultTagText: String,
  rightIcon: {
    type: String,
    default: 'edit-pen',
  },
});

const emit = defineEmits([
  'update:modelValue',
  'add',
  'edit',
  'select',
  'click-item',
  'edit-disabled',
  'select-disabled',
]);

const slots = useSlots();

const singleChoice = computed(() => !Array.isArray(props.modelValue));

const onRadioChange = (event) => {
  emit('update:modelValue', event.detail.value);
};

const onCheckboxChange = (event) => {
  emit('update:modelValue', event.detail.value);
};

const onAdd = () => {
  emit('add');
};

const onEdit = (item, index) => {
  emit('edit', item, index);
};

const onEditDisabled = (item, index) => {
  emit('edit-disabled', item, index);
};

const onClickItem = (item, index, event) => {
  emit('click-item', item, index, event);
};

const onSelect = (item, index) => {
  emit('select', item, index);
  if (props.switchable) {
    if (singleChoice.value) {
      emit('update:modelValue', item.id);
    } else {
      const value = [...(props.modelValue || [])];
      const itemIndex = value.indexOf(item.id);
      if (itemIndex > -1) {
        value.splice(itemIndex, 1);
      } else {
        value.push(item.id);
      }
      emit('update:modelValue', value);
    }
  }
};

const onSelectDisabled = (item, index) => {
  emit('select-disabled', item, index);
};

</script>

<style lang="scss" scoped>
.zx-address-list {
  box-sizing: border-box;
  height: 100%;
  padding: var(--uni-spacing-col-sm, 8px) var(--uni-spacing-row-sm, 8px) calc(80px + env(safe-area-inset-bottom));
  position: relative;

  &__disabled-text {
    padding: calc(var(--uni-spacing-col-base, 0px) * 2.5) 0 var(--uni-spacing-col-md, 0px);
    color: var(--uni-text-color-grey, #999);
    font-size: var(--uni-font-size-md, 14px);
    line-height: var(--uni-line-height-md, 20px);
  }

  &__bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
    padding: 5px var(--uni-spacing-row-md, 12px) env(safe-area-inset-bottom);
    background-color: #fff; // Or your theme's background color
    border-top: 1px solid var(--uni-border-color, #e5e5e5);
  }

  &__add {
    height: 40px;
    // margin: 5px 0; // Handled by zx-button potentially
  }
}

.safe-area-inset-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>