<template>
  <view class="zx-contact-list">
    <zx-radio-group :modelValue="modelValue" @change="onRadioChange" class="zx-contact-list__group">
      <zx-cell v-for="(item, index) in list" :key="item.id" isLink center class="zx-contact-list__item"
        titleClass="zx-contact-list__item-title" @click="onClick(item, index)">
        <template #icon>
          <view class="zx-contact-list__edit-icon-wrapper" @click.stop="onEdit(item, index)">
            <zx-icon name="edit" class="zx-contact-list__edit"></zx-icon>
          </view>
        </template>
        <template #title>
          <view class="zx-contact-list__info">
            <view class="zx-contact-list__name">{{ item.name }}，{{ item.tel }}</view>
            <zx-tag v-if="item.isDefault && defaultTagText" type="primary" round class="zx-contact-list__item-tag">
              {{ defaultTagText }}
            </zx-tag>
          </view>
        </template>
        <template #right-icon>
          <zx-radio :name="item.id" :iconSize="18" class="zx-contact-list__radio"></zx-radio>
        </template>
      </zx-cell>
    </zx-radio-group>
    <view class="zx-contact-list__bottom van-safe-area-bottom">
      <zx-button round block type="primary" class="zx-contact-list__add" @click="onAdd">
        {{ addText || '新建联系人' }}
      </zx-button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxCell from '@tanzhenxing/zx-cell/zx-cell.vue';
import zxRadio from '@tanzhenxing/zx-radio/zx-radio.vue';
import zxRadioGroup from '@tanzhenxing/zx-radio-group/zx-radio-group.vue';
import zxTag from '@tanzhenxing/zx-tag/zx-tag.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  addText: {
    type: String,
    default: ''
  },
  defaultTagText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['add', 'edit', 'select', 'update:modelValue']);

const onClick = (item, index) => {
  emit('update:modelValue', item.id);
  emit('select', item, index);
};

const onRadioChange = (name) => {
  const selectedItem = props.list.find(item => item.id === name);
  if (selectedItem) {
    const index = props.list.indexOf(selectedItem);
    onClick(selectedItem, index)
  }
}

const onAdd = () => {
  emit('add');
};

const onEdit = (item, index) => {
  emit('edit', item, index);
};
</script>

<style lang="scss" scoped>
$uni-spacing-sm: 10px;
$uni-spacing-md: 15px;
$uni-spacing-xl: 20px;
$uni-spacing-xs: 5px;
$uni-border-radius-lg: 10px;
$uni-bg-color-grey: #f7f8fa;
$uni-color-primary: #1989fa;

.zx-contact-list {
  box-sizing: border-box;
  height: 100%;
  padding: $uni-spacing-sm $uni-spacing-sm 80px;

  &__item {
    padding: $uni-spacing-md;
  }

  &__item-title {
    display: flex;
    align-items: center;
    // padding-right: $uni-spacing-xl; // Adjusted by right-icon slot
    // padding-left: $uni-spacing-xs; // Adjusted by icon slot
  }

  &__edit-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    // padding-right: $uni-spacing-sm; // Add some space between icon and text
    margin-right: $uni-spacing-sm;
  }

  &__info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__name {
    // flex: 1; // Ensure name takes available space before tag
  }

  &__item-tag {
    // flex: none; // Prevent tag from shrinking
    margin-left: $uni-spacing-xs;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 1.4em;
  }

  &__group {
    box-sizing: border-box;
    height: 100%;
    // overflow-y: scroll; // Handled by page scroll typically
    // -webkit-overflow-scrolling: touch;
    border-radius: $uni-border-radius-lg;
  }

  &__edit {
    font-size: 16px; // Match Vant's default
    // margin-right: 5px; // Moved to wrapper
  }

  &__radio {
    // Radio styles might need adjustment based on zx-radio component
    // For example, to match Vant's checked color:
    // .zx-radio__icon--checked .zx-icon {
    //   background-color: $uni-color-primary;
    //   border-color: $uni-color-primary;
    // }
  }

  &__bottom {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999; // Match Vant's default
    padding-left: $uni-spacing-md;
    padding-right: $uni-spacing-md;
    background-color: $uni-bg-color-grey; // Or another suitable background
    // van-safe-area-bottom is a class for safe area, UniApp handles this differently
    // Use uni-app's safe area components or styles if needed, e.g. <safe-area-inset-bottom></safe-area-inset-bottom>
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__add {
    height: 40px;
    margin: 5px 0; // Match Vant's default
  }
}

// Import Vant styles as a reference, but adapt to zxui's system
// :root,:host{--van-contact-list-padding: var(--van-padding-sm) var(--van-padding-sm) 80px;--van-contact-list-edit-icon-size: 16px;--van-contact-list-add-button-z-index: 999;--van-contact-list-radio-color: var(--van-primary-color);--van-contact-list-item-padding: var(--van-padding-md)}
// .van-contact-list{box-sizing:border-box;height:100%;padding:var(--van-contact-list-padding)}
// .van-contact-list__item{padding:var(--van-contact-list-item-padding)}
// .van-contact-list__item-title{display:flex;align-items:center;padding-right:var(--van-padding-xl);padding-left:var(--van-padding-xs)}
// .van-contact-list__item-tag{flex:none;margin-left:var(--van-padding-xs);padding-top:0;padding-bottom:0;line-height:1.4em}
// .van-contact-list__group{box-sizing:border-box;height:100%;overflow-y:scroll;-webkit-overflow-scrolling:touch;border-radius:var(--van-radius-lg)}
// .van-contact-list__edit{font-size:var(--van-contact-list-edit-icon-size)}
// .van-contact-list__radio .van-radio__icon--checked .van-icon{background-color:var(--van-contact-list-radio-color);border-color:var(--van-contact-list-radio-color)}
// .van-contact-list__bottom{position:fixed;right:0;bottom:0;left:0;z-index:var(--van-contact-list-add-button-z-index);padding-left:var(--van-padding-md);padding-right:var(--van-padding-md);background-color:var(--van-background-2)}
// .van-contact-list__add{height:40px;margin:5px 0}</style>