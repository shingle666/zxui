<template>
  <view class="zx-goods-card" @click="onClick">
    <view class="zx-goods-card__header">
      <slot name="thumb">
        <view class="zx-goods-card__thumb" @click.stop="onClickThumb">
          <image v-if="thumb" :src="thumb" mode="aspectFit" class="zx-goods-card__thumb-image" :lazy-load="lazyLoad" />
          <view v-if="tag || $slots.tag" class="zx-goods-card__tag">
            <slot name="tag">
              <text class="zx-goods-card__tag-text">{{ tag }}</text>
            </slot>
          </view>
        </view>
      </slot>
      <view class="zx-goods-card__content" :class="{ 'zx-goods-card__content--centered': centered }">
        <view>
          <slot name="title">
            <text v-if="title" class="zx-goods-card__title zx-ellipsis--l2">{{ title }}</text>
          </slot>
          <slot name="desc">
            <text v-if="desc" class="zx-goods-card__desc zx-ellipsis">{{ desc }}</text>
          </slot>
          <slot name="tags"></slot>
        </view>
        <view class="zx-goods-card__bottom">
          <slot name="price-top"></slot>
          <view class="zx-goods-card__price-wrapper">
            <slot name="price">
              <text v-if="price !== undefined" class="zx-goods-card__price">
                <text class="zx-goods-card__price-currency">{{ currency }}</text>
                <text class="zx-goods-card__price-integer">{{ priceInteger }}</text>
                <text v-if="priceDecimal" class="zx-goods-card__price-decimal">.{{ priceDecimal }}</text>
              </text>
            </slot>
            <slot name="origin-price">
              <text v-if="originPrice !== undefined" class="zx-goods-card__origin-price">{{ currency }}{{ originPrice }}</text>
            </slot>
          </view>
          <slot name="num">
            <text v-if="num !== undefined" class="zx-goods-card__num">x{{ num }}</text>
          </slot>
          <slot name="bottom"></slot>
        </view>
      </view>
    </view>
    <slot name="footer">
      <view v-if="$slots.footer" class="zx-goods-card__footer">
        <slot name="footer"></slot>
      </view>
    </slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  desc: String,
  thumb: String,
  num: [String, Number],
  price: [String, Number],
  originPrice: [String, Number],
  tag: String,
  currency: {
    type: String,
    default: '¥',
  },
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String, // Not directly used in template, but good for API consistency
});

const emit = defineEmits(['click', 'clickThumb']);

const priceArr = computed(() => {
  if (props.price === undefined || props.price === null || props.price === '') {
    return [];
  }
  return String(props.price).split('.');
});

const priceInteger = computed(() => priceArr.value[0]);
const priceDecimal = computed(() => priceArr.value[1]);

const onClick = (event) => {
  emit('click', event);
};

const onClickThumb = (event) => {
  emit('clickThumb', event);
  if (props.thumbLink) {
    // In a real uniapp scenario, you'd use uni.navigateTo or similar
    console.log('Navigating to:', props.thumbLink);
  }
};
</script>

<style lang="scss" scoped>
.zx-goods-card {
  position: relative;
  box-sizing: border-box;
  padding: 16rpx 24rpx;
  color: #323233;
  font-size: 24rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 20rpx;

  &__header {
    display: flex;
  }

  &__thumb {
    position: relative;
    flex: none;
    width: 176rpx;
    height: 176rpx;
    margin-right: 16rpx;
    border-radius: 12rpx;
    overflow: hidden;
  }

  &__thumb-image {
    width: 100%;
    height: 100%;
  }

  &__tag {
    position: absolute;
    top: 4rpx;
    left: 0;
    background-color: rgba(0,0,0,0.5); // Default tag style, can be overridden by slot
    color: white;
    padding: 4rpx 8rpx;
    font-size: 20rpx;
    border-top-right-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
  }
  &__tag-text{
    color: #fff;
  }

  &__content {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    min-height: 176rpx; // Match thumb height

    &--centered {
      justify-content: center;
    }
  }

  &__title {
    font-weight: bold;
    line-height: 32rpx;
    font-size: 28rpx;
    margin-bottom: 8rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    color: #646566;
    line-height: 32rpx;
    font-size: 24rpx;
    margin-bottom: 8rpx;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* Show only one line for desc */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__bottom {
    line-height: 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__price-wrapper {
    display: flex;
    align-items: baseline;
  }

  &__price {
    display: inline-block;
    color: #ee0a24; // Vant's red color
    font-weight: bold;
    font-size: 28rpx;
  }

  &__price-currency {
    font-size: 24rpx;
  }

  &__price-integer {
    font-size: 36rpx; // Larger integer part
  }

  &__price-decimal {
    font-size: 24rpx;
  }

  &__origin-price {
    display: inline-block;
    margin-left: 10rpx;
    color: #969799;
    font-size: 20rpx;
    text-decoration: line-through;
  }

  &__num {
    color: #969799;
    font-size: 24rpx;
  }

  &__footer {
    flex: none;
    text-align: right;
    margin-top: 16rpx;
    // Example: Add padding if you have buttons in footer
    // .zx-button {
    //   margin-left: 10rpx;
    // }
  }
}

.zx-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.zx-ellipsis--l2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>