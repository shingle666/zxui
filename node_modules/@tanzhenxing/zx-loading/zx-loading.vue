<template>
  <view v-if="show" :class="['zx-loading', vertical ? 'zx-loading--vertical' : '']">
    <view :class="['zx-loading__spinner', `zx-loading__spinner--${type}`]" :style="spinnerStyle">
      <template v-if="type === 'spinner'">
        <view v-for="item in 12" :key="item" class="zx-loading__line" :style="lineStyle(item)"></view>
      </template>
      <template v-else-if="type === 'circular'">
        <svg class="zx-loading__circular" viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" fill="none" />
        </svg>
      </template>
      <slot name="icon"></slot>
    </view>
    <view v-if="text || $slots.default" class="zx-loading__text" :style="textStyle">
      <slot>{{ text }}</slot>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

/**
 * zx-loading 加载组件
 * @description 加载数据时显示动效，支持H5、小程序、App。
 * @property {Boolean} show - 是否显示加载组件，默认true
 * @property {String} type - 加载图标类型，可选值为 'circular', 'spinner'，默认'circular'
 * @property {String} color - 加载图标颜色，默认'#c9c9c9'
 * @property {String | Number} size - 加载图标大小，默认'30px'
 * @property {String} text - 显示的文本
 * @property {String | Number} textSize - 文本大小，默认'14px'
 * @property {String} textColor - 文本颜色，默认'#c9c9c9'
 * @property {Boolean} vertical - 是否垂直排列图标和文字内容，默认false
 */

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'circular', // circular, spinner
    validator: (value) => ['circular', 'spinner'].includes(value)
  },
  color: {
    type: String,
    default: '#c9c9c9'
  },
  size: {
    type: [String, Number],
    default: '30px'
  },
  text: {
    type: String,
    default: ''
  },
  textSize: {
    type: [String, Number],
    default: '14px'
  },
  textColor: {
    type: String,
    default: '#c9c9c9'
  },
  vertical: {
    type: Boolean,
    default: false
  }
});

const addUnit = (value) => {
  if (value == null) {
    return undefined;
  }
  return /^-?\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : String(value);
};

const spinnerStyle = computed(() => {
  return {
    color: props.color,
    width: addUnit(props.size),
    height: addUnit(props.size)
  };
});

const lineStyle = (index) => {
  // For spinner type, Vant uses opacity and transform rotate.
  // Here we simplify it a bit for cross-platform compatibility.
  // A more sophisticated animation might be needed for perfect replication.
  return {
    // Opacity and rotation can be dynamically calculated if needed
    // For now, we rely on CSS animations defined in the style section
  };
};

const textStyle = computed(() => {
  return {
    fontSize: addUnit(props.textSize),
    color: props.textColor || props.color // Fallback to spinner color if textColor is not set
  };
});

</script>

<style lang="scss" scoped>
.zx-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--zx-loading-spinner-color, #c9c9c9);
  font-size: 0;
  vertical-align: middle;

  &--vertical {
    flex-direction: column;
  }

  &__spinner {
    position: relative;
    display: inline-block;
    width: var(--zx-loading-spinner-size, 30px);
    max-width: 100%;
    height: var(--zx-loading-spinner-size, 30px);
    max-height: 100%;
    vertical-align: middle;
    animation: zx-rotate 0.8s linear infinite;

    &--spinner {
      animation-timing-function: steps(12);
    }

    &--circular {
      animation-duration: 2s;
    }
  }

  &__line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &::before {
      display: block;
      width: 2px;
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
      content: ' ';
    }
  }

  // Dynamically generate spinner lines styles
  @for $i from 1 through 12 {
    .zx-loading__spinner--spinner .zx-loading__line:nth-child(#{$i}) {
      transform: rotate(#{30 * ($i - 1)}deg);
      opacity: #{1 - calc(0.75 / 12) * ($i - 1)};
    }
  }

  &__circular {
    display: block;
    width: 100%;
    height: 100%;
    circle {
      animation: zx-circular 1.5s ease-in-out infinite;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
    }
  }

  &__text {
    display: inline-block;
    margin-left: var(--zx-padding-xs, 8px);
    color: var(--zx-loading-text-color, #c9c9c9);
    font-size: var(--zx-loading-text-font-size, 14px);
    vertical-align: middle;
  }

  &--vertical &__text {
    margin: var(--zx-padding-xs, 8px) 0 0;
  }
}

@keyframes zx-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes zx-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
