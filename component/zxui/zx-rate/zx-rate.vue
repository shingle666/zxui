<template>
  <view class="zx-rate" :id="elId" ref="zx-rate" :style="[customStyle]">
    <view class="zx-rate__content" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
      <view class="zx-rate__content__item" v-for="(item, index) in Number(max)" :key="index" :class="[elClass]">
        <view class="zx-rate__content__item__icon-wrap" ref="zx-rate__content__item__icon-wrap"
          @tap.stop="clickHandler($event, index + 1)">
          <zx-icon :name="getIconName(index)" :color="getIconColor(index)" :style="{
            'padding-left': parseInt(gutter) / 2 + 'rpx',
            'padding-right': parseInt(gutter) / 2 + 'rpx',
          }" :size="actualSize"></zx-icon>
        </view>
        <view v-if="allowHalf" @tap.stop="clickHandler($event, index + 0.5)"
          class="zx-rate__content__item__icon-wrap zx-rate__content__item__icon-wrap--half" :style="[
            {
              width: parseInt(rateWidth) / 2 + 'rpx',
            },
          ]" ref="zx-rate__content__item__icon-wrap">
          <zx-icon :name="getIconName(index)" :color="getIconColor(index)" :style="{
            'padding-left': parseInt(gutter) / 2 + 'rpx',
            'padding-right': parseInt(gutter) / 2 + 'rpx',
          }" :size="actualSize"></zx-icon>
        </view>
      </view>
    </view>
    <!-- 辅助文字 -->
    <view v-if="showText && !showScore" class="zx-rate__text" :style="{ color: textColor }">
      {{ getCurrentText() }}
    </view>
    <!-- 分数显示 -->
    <view v-if="showScore && !showText" class="zx-rate__score" :style="{ color: textColor }">
      {{ getScoreText() }}
    </view>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, watch } from "vue";
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'


const { proxy } = getCurrentInstance();

/**
 * rate 评分
 * @description 评分组件，用于星型评分场景
 * @tutorial https://zxui.org/components/rate
 * @property {String | Number}	modelValue		用于v-model双向绑定选中的评分值 (默认 0 )
 * @property {String | Number}	max				最大分值 （默认 5 ）
 * @property {String}			size			尺寸，可选值 large/default/small （默认 'default' ）
 * @property {Boolean}			disabled		是否为只读 （默认 false ）
 * @property {Boolean}			allowHalf		是否允许半选 （默认 false ）
 * @property {Number}			lowThreshold	低分和中等分数的界限值 （默认 2 ）
 * @property {Number}			highThreshold	高分和中等分数的界限值 （默认 4 ）
 * @property {Array|Object}		colors			icon的颜色，可传入数组或对象 （默认 ['#f7ba2a', '#f7ba2a', '#f7ba2a'] ）
 * @property {String}			voidColor		未选中icon的颜色 （默认 '#c6d1de' ）
 * @property {String}			disabledVoidColor 只读时未选中icon的颜色 （默认 '#eff2f7' ）
 * @property {Array|Object}		icons			图标组件，可传入数组或对象
 * @property {String}			voidIcon		未被选中的图标名 （默认 'star' ）
 * @property {String}			disabledVoidIcon 禁用状态的未选择图标 （默认 'star' ）
 * @property {Boolean}			showText		是否显示辅助文字 （默认 false ）
 * @property {Boolean}			showScore		是否显示当前分数 （默认 false ）
 * @property {String}			textColor		辅助文字的颜色 （默认 '' ）
 * @property {Array}			texts			辅助文字数组 （默认 ['极差', '失望', '一般', '满意', '惊喜'] ）
 * @property {String}			scoreTemplate	分数显示模板 （默认 '{value}' ）
 * @property {Boolean}			clearable		是否可以重置值为0 （默认 false ）
 * @property {String | Number}	gutter			图标之间的距离 （默认 '8rpx' ）
 * @property {Boolean}			touchable		是否可以通过滑动手势选择评分 （默认 true ）
 * @property {Object}			customStyle		组件的样式，对象形式
 * @event {Function} change 选中的星星发生变化时触发
 * @example <zx-rate v-model="value" :max="5"></zx-rate>
 */

const props = defineProps({
  // 用于v-model双向绑定选中的评分值
  modelValue: {
    type: [String, Number],
    default: 0,
  },
  // 最大分值
  max: {
    type: [String, Number],
    default: 5,
  },
  // 尺寸
  size: {
    type: String,
    default: "default",
  },
  // 是否为只读
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否允许半选
  allowHalf: {
    type: Boolean,
    default: false,
  },
  // 低分和中等分数的界限值
  lowThreshold: {
    type: Number,
    default: 2,
  },
  // 高分和中等分数的界限值
  highThreshold: {
    type: Number,
    default: 4,
  },
  // icon的颜色
  colors: {
    type: [Array, Object],
    default: () => ["#f7ba2a", "#f7ba2a", "#f7ba2a"],
  },
  // 未选中icon的颜色
  voidColor: {
    type: String,
    default: "#c6d1de",
  },
  // 只读时未选中icon的颜色
  disabledVoidColor: {
    type: String,
    default: "#eff2f7",
  },
  // 图标组件
  icons: {
    type: [Array, Object],
    default: () => ["star-fill", "star-fill", "star-fill"],
  },
  // 未被选中的图标
  voidIcon: {
    type: String,
    default: "star",
  },
  // 禁用状态的未选择图标
  disabledVoidIcon: {
    type: String,
    default: "star",
  },
  // 是否显示辅助文字
  showText: {
    type: Boolean,
    default: false,
  },
  // 是否显示当前分数
  showScore: {
    type: Boolean,
    default: false,
  },
  // 辅助文字的颜色
  textColor: {
    type: String,
    default: "",
  },
  // 辅助文字数组
  texts: {
    type: Array,
    default: () => ["极差", "失望", "一般", "满意", "惊喜"],
  },
  // 分数显示模板
  scoreTemplate: {
    type: String,
    default: "{value}",
  },
  // 是否可以重置值为0
  clearable: {
    type: Boolean,
    default: false,
  },
  // 图标之间的间距
  gutter: {
    type: [String, Number],
    default: "8rpx",
  },
  // 是否可以通过滑动手势选择评分
  touchable: {
    type: Boolean,
    default: true,
  },
  customStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

// 生成一个唯一id，否则一个页面多个评分组件，会造成冲突
const elId = proxy.$util.getNonceStr();
const elClass = "zx-rate-" + proxy.$util.getNonceStr();
const rateBoxLeft = ref(0); // 评分盒子左边到屏幕左边的距离，用于滑动选择时计算距离
const currentValue = ref(0);
currentValue.value = Number(props.modelValue);
const rateWidth = ref(0); // 每个星星的宽度
// 标识是否正在滑动，由于iOS事件上touch比click先触发，导致快速滑动结束后，接着触发click，导致事件混乱而出错
const moving = ref(false);

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newVal) => {
    currentValue.value = Number(newVal);
  }
);

// 计算实际尺寸
const actualSize = computed(() => {
  const sizeMap = {
    large: "40rpx",
    default: "36rpx",
    small: "32rpx",
  };
  return sizeMap[props.size] || props.size;
});

// 获取图标名称
const getIconName = (index) => {
  if (currentValue.value > index) {
    // 已选中状态
    if (Array.isArray(props.icons)) {
      if (currentValue.value <= props.lowThreshold) return props.icons[0];
      if (currentValue.value <= props.highThreshold) return props.icons[1];
      return props.icons[2];
    } else if (typeof props.icons === "object") {
      // 对象形式的icons配置
      const keys = Object.keys(props.icons)
        .map(Number)
        .sort((a, b) => a - b);
      for (let key of keys) {
        if (currentValue.value <= key) {
          return props.icons[key];
        }
      }
      return props.icons[keys[keys.length - 1]];
    }
    return "star-fill";
  } else {
    // 未选中状态
    return props.disabled ? props.disabledVoidIcon : props.voidIcon;
  }
};

// 获取图标颜色
const getIconColor = (index) => {
  if (props.disabled) {
    return currentValue.value > index ? "#c8c9cc" : props.disabledVoidColor;
  }

  if (currentValue.value > index) {
    // 已选中状态
    if (Array.isArray(props.colors)) {
      if (currentValue.value <= props.lowThreshold) return props.colors[0];
      if (currentValue.value <= props.highThreshold) return props.colors[1];
      return props.colors[2];
    } else if (typeof props.colors === "object") {
      // 对象形式的colors配置
      const keys = Object.keys(props.colors)
        .map(Number)
        .sort((a, b) => a - b);
      for (let key of keys) {
        if (currentValue.value <= key) {
          return props.colors[key];
        }
      }
      return props.colors[keys[keys.length - 1]];
    }
    return "#f7ba2a";
  } else {
    // 未选中状态
    return props.voidColor;
  }
};

// 获取当前文字
const getCurrentText = () => {
  if (props.texts && props.texts.length > 0) {
    const index = Math.ceil(currentValue.value) - 1;
    return props.texts[index] || "";
  }
  return "";
};

// 获取分数文本
const getScoreText = () => {
  return props.scoreTemplate.replace("{value}", currentValue.value);
};

const init = () => {
  proxy.$util.sleep().then(() => {
    getRateItemRect();
    getRateIconWrapRect();
  });
};

// 获取评分组件盒子的布局信息
const getRateItemRect = async () => {
  await proxy.$util.sleep();
  uni
    .createSelectorQuery()
    .in(proxy)
    .select(`#${elId}`)
    .boundingClientRect((res) => {
      if (res) {
        rateBoxLeft.value = res.left;
      }
    })
    .exec();
};

// 获取单个星星的尺寸
const getRateIconWrapRect = () => {
  uni
    .createSelectorQuery()
    .in(proxy)
    .select(`.${elClass}`)
    .boundingClientRect((res) => {
      if (res) {
        rateWidth.value = res.width;
      }
    })
    .exec();
};

// 手指滑动
const touchMove = (e) => {
  if (!props.touchable || props.disabled) {
    return;
  }
  preventEvent(e);
  const x = e.changedTouches[0].pageX;
  getActiveIndex(x);
};

// 停止滑动
const touchEnd = (e) => {
  if (!props.touchable || props.disabled) {
    return;
  }
  const x = e.changedTouches[0].pageX;
  getActiveIndex(x);
};

// 通过点击，直接选中
const clickHandler = (e, index) => {
  // ios上，moving状态取消事件触发
  if (proxy.$util.os() === "ios" && moving.value) {
    return;
  }

  if (props.disabled) {
    return;
  }

  // 如果开启clearable且点击相同的值，则重置为0
  if (props.clearable && currentValue.value === index) {
    setCurrentValue(0);
    return;
  }

  let x = 0;
  x = e.changedTouches[0].pageX;
  getActiveIndex(x, true);
};

// 获取当前激活的评分图标
const getActiveIndex = (x, isClick = false) => {
  if (props.disabled) {
    return;
  }

  // 判断当前操作的点的x坐标值，是否在允许的边界范围内
  const allRateWidth = rateWidth.value * props.max + rateBoxLeft.value;
  // 如果小于第一个图标的左边界，设置为最小值，如果大于所有图标的宽度，则设置为最大值
  x = range(rateBoxLeft.value, allRateWidth, x) - rateBoxLeft.value;
  // 滑动点相对于评分盒子左边的距离
  const distance = x;
  // 滑动的距离，相当于多少颗星星
  let index;

  // 判断是否允许半星
  if (props.allowHalf) {
    index = Math.floor(distance / rateWidth.value);
    // 取余，判断小数的区间范围
    const decimal = distance % rateWidth.value;
    if (decimal <= rateWidth.value / 2 && decimal > 0) {
      index += 0.5;
    } else if (decimal > rateWidth.value / 2) {
      index++;
    }
  } else {
    index = Math.floor(distance / rateWidth.value);
    // 取余，判断小数的区间范围
    const decimal = distance % rateWidth.value;
    // 非半星时，只有超过了图标的一半距离，才认为是选择了这颗星
    if (isClick) {
      if (decimal > 0) index++;
    } else {
      if (decimal > rateWidth.value / 2) index++;
    }
  }

  const finalIndex = Math.min(index, props.max);
  setCurrentValue(finalIndex);

  // 设置延时为了让click事件在touchmove之前触发
  setTimeout(() => {
    moving.value = true;
  }, 10);
  // 一定时间后，取消标识为移动中状态，是为了让click事件无效
  setTimeout(() => {
    moving.value = false;
  }, 10);
};

// 设置当前值
const setCurrentValue = (value) => {
  if (currentValue.value === value) {
    return;
  }
  currentValue.value = value;
  emit("update:modelValue", value);
  emit("change", value);
};

// 重置当前值
const resetCurrentValue = () => {
  setCurrentValue(0);
};

// 阻止事件冒泡
const preventEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const range = (min = 0, max = 0, value = 0) => {
  return Math.max(min, Math.min(max, Number(value)));
};

// 暴露方法给父组件
defineExpose({
  setCurrentValue,
  resetCurrentValue,
});

init();
</script>

<style lang="scss" scoped>
$zx-rate-margin: 0 !default;
$zx-rate-padding: 0 !default;
$zx-rate-item-icon-wrap-half-top: 0 !default;
$zx-rate-item-icon-wrap-half-left: 0 !default;

.zx-rate {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: $zx-rate-margin;
  padding: $zx-rate-padding;
  touch-action: none;

  &__content {
    display: flex;
    flex-direction: row;

    &__item {
      position: relative;

      &__icon-wrap {
        &--half {
          position: absolute;
          overflow: hidden;
          top: $zx-rate-item-icon-wrap-half-top;
          left: $zx-rate-item-icon-wrap-half-left;
        }
      }
    }
  }

  &__text,
  &__score {
    margin-left: 16rpx;
    font-size: 28rpx;
    line-height: 1;
  }
}

.zx-icon {
  box-sizing: border-box;
}
</style>
