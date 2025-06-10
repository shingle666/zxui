<template>
  <view :class="[ 'zx-row', typeClass, justifyClass, alignClass ]" :style="rowStyle">
    <slot></slot>
  </view>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  type: String,
  gutter: Number,
  justify: {
    type: String,
    default: 'start'
  },
  align: {
    type: String,
    default: 'top'
  },
  width: {
    type: [String, Number],
    default: 750
  }
});

const { type, gutter, justify, align } = toRefs(props);

const marginValue = computed(() => {
  if (gutter.value) {
    return -(gutter.value / 2);
  }
  return 0;
});

const rowStyle = computed(() => ({
  marginLeft: `${marginValue.value}rpx`,
  marginRight: `${marginValue.value}rpx`
}));

const typeClass = computed(() => type.value === 'flex' ? 'zx-row--flex' : '');
const justifyClass = computed(() => justify.value !== 'start' ? `zx-row--flex-justify-${justify.value}` : '');
const alignClass = computed(() => align.value !== 'top' ? `zx-row--flex-align-${align.value}` : '');
</script>

<style lang="scss" scoped>
.zx-row {
  position: relative;
  box-sizing: border-box;
  /* #ifndef APP-NVUE */
  // Clearfix for floated children when not in flex mode
  &::after {
    content: "";
    display: table;
    clear: both;
  }
  /* #endif */
}

.zx-row--flex {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  flex-direction: row; // Ensure flex-direction is row for flex type
}

.zx-row--flex {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.zx-row--flex-justify-center {
  justify-content: center;
}
.zx-row--flex-justify-end {
  justify-content: flex-end;
}
.zx-row--flex-justify-space-between {
  justify-content: space-between;
}
.zx-row--flex-justify-space-around {
  justify-content: space-around;
}
.zx-row--flex-align-middle {
  align-items: center;
}
.zx-row--flex-align-bottom {
  align-items: flex-end;
}
</style>
