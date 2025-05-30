<template>
  <view
    class="zx-contact-card"
    :class="[`zx-contact-card--${type}`, !editable && 'zx-contact-card--disabled']"
    :style="[customStyle]"
    :hover-class="editable ? 'zx-contact-card--clickable' : ''"
    :hover-stay-time="250"
    @tap="clickHandler"
  >
    <view class="zx-contact-card__body">
      <view class="zx-contact-card__left-icon">
        <zx-icon
          :name="type === 'add' ? 'plus-circle' : 'user'"
          :size="iconSize"
          :color="type === 'add' ? addIconColor : iconColor"
        ></zx-icon>
      </view>
      <view class="zx-contact-card__content">
        <view class="zx-contact-card__title" v-if="type === 'add'">
          <text class="zx-contact-card__title-text">{{ addText || '添加联系人' }}</text>
        </view>
        <view class="zx-contact-card__info" v-else>
          <view class="zx-contact-card__name" v-if="name">
            <text class="zx-contact-card__name-text">姓名：{{ name }}</text>
          </view>
          <view class="zx-contact-card__tel" v-if="tel">
            <text class="zx-contact-card__tel-text">电话：{{ tel }}</text>
          </view>
        </view>
      </view>
      <view class="zx-contact-card__right-icon" v-if="editable">
        <zx-icon
          name="arrow-right"
          :size="arrowSize"
          :color="arrowColor"
        ></zx-icon>
      </view>
    </view>
    <view class="zx-contact-card__border" v-if="type === 'add'"></view>
  </view>
</template>

<script setup>
/**
 * contact-card 联系人卡片
 * @description 以卡片的形式展示联系人信息，支持添加和编辑两种模式
 * @tutorial https://zxui.org/components/contact-card
 * @property {String} type 卡片类型，可选值为 add、edit (默认 'add')
 * @property {String} name 联系人姓名
 * @property {String} tel 联系人手机号
 * @property {String} addText 添加时的文案提示 (默认 '添加联系人')
 * @property {Boolean} editable 是否可以编辑联系人 (默认 true)
 * @property {String} iconSize 图标大小 (默认 '40rpx')
 * @property {String} iconColor 图标颜色 (默认 '#666')
 * @property {String} addIconColor 添加图标颜色 (默认 '#1989fa')
 * @property {String} arrowSize 箭头大小 (默认 '32rpx')
 * @property {String} arrowColor 箭头颜色 (默认 '#c8c9cc')
 * @property {Object} customStyle 自定义样式
 *
 * @event {Function} click 点击时触发
 * @example <zx-contact-card type="add" @click="onAdd" />
 */
import { computed } from 'vue'

const props = defineProps({
  // 卡片类型，可选值为 add、edit
  type: {
    type: String,
    default: 'add'
  },
  // 联系人姓名
  name: {
    type: String,
    default: ''
  },
  // 联系人手机号
  tel: {
    type: String,
    default: ''
  },
  // 添加时的文案提示
  addText: {
    type: String,
    default: '添加联系人'
  },
  // 是否可以编辑联系人
  editable: {
    type: Boolean,
    default: true
  },
  // 图标大小
  iconSize: {
    type: String,
    default: '40rpx'
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: '#666'
  },
  // 添加图标颜色
  addIconColor: {
    type: String,
    default: '#1989fa'
  },
  // 箭头大小
  arrowSize: {
    type: String,
    default: '32rpx'
  },
  // 箭头颜色
  arrowColor: {
    type: String,
    default: '#c8c9cc'
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])

// 点击处理
function clickHandler(event) {
  if (!props.editable) {
    return
  }
  emit('click', event)
}
</script>

<style lang="scss" scoped>
$zx-contact-card-padding: 15px !default;
$zx-contact-card-font-size: 14px !default;
$zx-contact-card-line-height: 20px !default;
$zx-contact-card-color: #333 !default;
$zx-contact-card-background: #fff !default;
$zx-contact-card-border-color: #ebedf0 !default;
$zx-contact-card-border-radius: 8px !default;
$zx-contact-card-clickable-color: #f7f8fa !default;
$zx-contact-card-disabled-color: #c8c9cc !default;
$zx-contact-card-add-border-width: 2px !default;
$zx-contact-card-add-border-color: #1989fa !default;
$zx-contact-card-add-border-style: dashed !default;
$zx-contact-card-title-font-size: 16px !default;
$zx-contact-card-title-color: #1989fa !default;
$zx-contact-card-name-font-size: 15px !default;
$zx-contact-card-name-color: #333 !default;
$zx-contact-card-tel-font-size: 14px !default;
$zx-contact-card-tel-color: #666 !default;
$zx-contact-card-icon-margin-right: 12px !default;
$zx-contact-card-arrow-margin-left: 12px !default;

.zx-contact-card {
  position: relative;
  background: $zx-contact-card-background;
  border: 1px solid $zx-contact-card-border-color;
  border-radius: $zx-contact-card-border-radius;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  overflow: hidden;

  &__body {
    display: flex;
    align-items: center;
    padding: $zx-contact-card-padding;
    font-size: $zx-contact-card-font-size;
    line-height: $zx-contact-card-line-height;
    color: $zx-contact-card-color;
  }

  &__left-icon {
    display: flex;
    align-items: center;
    margin-right: $zx-contact-card-icon-margin-right;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    display: flex;
    align-items: center;

    &-text {
      font-size: $zx-contact-card-title-font-size;
      color: $zx-contact-card-title-color;
      font-weight: 500;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__name {
    margin-bottom: 4px;

    &-text {
      font-size: $zx-contact-card-name-font-size;
      color: $zx-contact-card-name-color;
      font-weight: 500;
    }
  }

  &__tel {
    &-text {
      font-size: $zx-contact-card-tel-font-size;
      color: $zx-contact-card-tel-color;
    }
  }

  &__right-icon {
    display: flex;
    align-items: center;
    margin-left: $zx-contact-card-arrow-margin-left;
  }

  &__border {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: $zx-contact-card-add-border-width $zx-contact-card-add-border-style $zx-contact-card-add-border-color;
    border-radius: $zx-contact-card-border-radius;
    pointer-events: none;
  }

  &--add {
    border-color: transparent;
  }

  &--clickable {
    background-color: $zx-contact-card-clickable-color;
  }

  &--disabled {
    color: $zx-contact-card-disabled-color;
    /* #ifndef APP-NVUE */
    cursor: not-allowed;
    /* #endif */

    .zx-contact-card__title-text,
    .zx-contact-card__name-text,
    .zx-contact-card__tel-text {
      color: $zx-contact-card-disabled-color;
    }
  }
}
</style>