<template>
  <movable-area :class="['zx-movable', customClass]" :style="[containerStyle, customStyle]" :scale-area="scaleArea">
    <movable-view :class="['zx-movable__view', viewClass]" :style="[viewStyle, viewCustomStyle]" :direction="direction"
      :inertia="inertia" :out-of-bounds="outOfBounds" :x="innerX" :y="innerY" :damping="damping" :friction="friction"
      :disabled="disabled" :scale="scale" :scale-min="scaleMin" :scale-max="scaleMax" :scale-value="scaleValue"
      :animation="animation" @change="onChange" @scale="onScale" @htouchmove="onHTouchMove" @vtouchmove="onVTouchMove">
      <slot>
        <view class="zx-movable__default-content">
          {{ content || '可拖拽内容' }}
        </view>
      </slot>
    </movable-view>
  </movable-area>
</template>

<script setup>
import { getCurrentInstance, ref, computed, watch, nextTick } from "vue";

const { proxy } = getCurrentInstance();

// 设置组件名称
proxy.$options = proxy.$options || {};
proxy.$options.name = 'zx-movable';

const emit = defineEmits([
  'change',
  'scale',
  'htouchmove',
  'vtouchmove',
  'update:x',
  'update:y'
]);

const props = defineProps({
  // 容器宽度
  width: {
    type: [String, Number],
    default: 200
  },
  // 容器高度  
  height: {
    type: [String, Number],
    default: 200
  },
  // 可拖拽元素宽度
  viewWidth: {
    type: [String, Number],
    default: 50
  },
  // 可拖拽元素高度
  viewHeight: {
    type: [String, Number],
    default: 50
  },
  // 默认文本内容
  content: {
    type: String,
    default: ''
  },
  // movable-view的移动方向，属性值有all、vertical、horizontal、none
  direction: {
    type: String,
    default: 'all'
  },
  // movable-view是否带有惯性
  inertia: {
    type: Boolean,
    default: false
  },
  // 超过可移动区域后，movable-view是否还可以移动
  outOfBounds: {
    type: Boolean,
    default: false
  },
  // 定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围
  x: {
    type: [String, Number],
    default: 0
  },
  // 定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围  
  y: {
    type: [String, Number],
    default: 0
  },
  // 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快
  damping: {
    type: Number,
    default: 20
  },
  // 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值
  friction: {
    type: Number,
    default: 2
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否支持双指缩放，默认缩放手势生效区域是在movable-view内
  scale: {
    type: Boolean,
    default: false
  },
  // 定义缩放倍数最小值
  scaleMin: {
    type: Number,
    default: 0.5
  },
  // 定义缩放倍数最大值
  scaleMax: {
    type: Number,
    default: 10
  },
  // 定义缩放倍数，取值范围为 0.5 - 10
  scaleValue: {
    type: Number,
    default: 1
  },
  // 是否使用动画
  animation: {
    type: Boolean,
    default: true
  },
  // 当里面的movable-view设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area
  scaleArea: {
    type: Boolean,
    default: false
  },
  // 自定义容器样式类
  customClass: {
    type: String,
    default: ''
  },
  // 自定义容器样式
  customStyle: {
    type: [Object, String],
    default: () => ({})
  },
  // 自定义可拖拽元素样式类
  viewClass: {
    type: String,
    default: ''
  },
  // 自定义可拖拽元素样式
  viewCustomStyle: {
    type: [Object, String],
    default: () => ({})
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: '#f5f5f5'
  },
  // 拖拽元素背景颜色
  viewBackgroundColor: {
    type: String,
    default: '#007aff'
  },
  // 拖拽元素文字颜色
  textColor: {
    type: String,
    default: '#ffffff'
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: true
  },
  // 圆角大小
  borderRadius: {
    type: [String, Number],
    default: 8
  }
});

// 内部状态
const innerX = ref(props.x);
const innerY = ref(props.y);

// 监听外部x,y变化
watch(() => props.x, (newVal) => {
  innerX.value = newVal;
});

watch(() => props.y, (newVal) => {
  innerY.value = newVal;
});

// 计算样式
const containerStyle = computed(() => {
  const width = typeof props.width === 'number' ? `${props.width}rpx` : props.width;
  const height = typeof props.height === 'number' ? `${props.height}rpx` : props.height;

  return {
    width,
    height,
    backgroundColor: props.backgroundColor,
    border: props.border ? '1rpx solid #e0e0e0' : 'none',
    borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}rpx` : props.borderRadius,
    position: 'relative',
    overflow: 'hidden'
  };
});

const viewStyle = computed(() => {
  const width = typeof props.viewWidth === 'number' ? `${props.viewWidth}rpx` : props.viewWidth;
  const height = typeof props.viewHeight === 'number' ? `${props.viewHeight}rpx` : props.viewHeight;

  return {
    width,
    height,
    backgroundColor: props.viewBackgroundColor,
    borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}rpx` : props.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
});

// 事件处理
const onChange = (e) => {
  const { x, y, source } = e.detail;
  innerX.value = x;
  innerY.value = y;

  emit('update:x', x);
  emit('update:y', y);
  emit('change', e);
};

const onScale = (e) => {
  emit('scale', e);
};

const onHTouchMove = (e) => {
  emit('htouchmove', e);
};

const onVTouchMove = (e) => {
  emit('vtouchmove', e);
};

// 暴露方法给父组件
const moveTo = (x, y, animated = true) => {
  innerX.value = x;
  innerY.value = y;

  nextTick(() => {
    emit('update:x', x);
    emit('update:y', y);
  });
};

const reset = () => {
  moveTo(0, 0);
};

defineExpose({
  moveTo,
  reset
});
</script>

<style lang="scss" scoped>
.zx-movable {
  position: relative;

  &__view {
    position: relative;
  }

  &__default-content {
    font-size: 24rpx;
    color: v-bind(textColor);
    text-align: center;
    line-height: 1.2;
    user-select: none;
  }
}
</style>
