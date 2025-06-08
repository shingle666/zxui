<template>
  <view :class="bem()" :style="{ height: addUnit(height) }">
    <scroll-view :class="bem('nav')" :scroll-y="true">
      <view
        v-for="(item, index) in items"
        :key="index"
        :class="[
          bem('nav-item'),
          item.className,
          { [bem('nav-item', 'active')]: mainActiveIndex === index },
          { [bem('nav-item', 'disabled')]: item.disabled }
        ]"
        @click="onClickNav(index, item)"
      >
        <view class="van-ellipsis">
          {{ item.text }}
          <view v-if="item.dot" :class="bem('nav-dot')"></view>
          <view v-else-if="item.badge" :class="bem('nav-badge')">{{ item.badge }}</view>
        </view>
      </view>
    </scroll-view>
    <scroll-view :class="bem('content')" :scroll-y="true">
      <slot name="content">
        <view
          v-for="item in subItems"
          :key="item.id"
          :class="[
            'van-ellipsis',
            bem('item', { active: isActiveItem(item.id), disabled: item.disabled })
          ]"
          @click="onClickItem(item)"
        >
          {{ item.text }}
          <zx-icon
            v-if="isActiveItem(item.id)"
            :name="selectedIcon"
            :class="bem('selected')"
            size="16px"
          />
        </view>
      </slot>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { addUnit, createNamespace } from '../../utils/index.js';
import zxIcon from '../zx-icon/zx-icon.vue';

const [name, bem] = createNamespace('tree-select');

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  mainActiveIndex: {
    type: [Number, String],
    default: 0
  },
  activeId: {
    type: [Number, String, Array],
    default: 0
  },
  max: {
    type: [Number, String],
    default: Infinity
  },
  height: {
    type: [Number, String],
    default: 300
  },
  selectedIcon: {
    type: String,
    default: 'success'
  }
});

const emit = defineEmits([
  'click-nav',
  'click-item',
  'update:mainActiveIndex',
  'update:activeId'
]);

const subItems = computed(() => {
  const selectedNav = props.items[props.mainActiveIndex] || {};
  return selectedNav.children || [];
});

const isActiveItem = (id) => {
  if (Array.isArray(props.activeId)) {
    return props.activeId.includes(id);
  }
  return props.activeId === id;
};

const onClickNav = (index, item) => {
  if (item.disabled) {
    return;
  }
  emit('update:mainActiveIndex', index);
  emit('click-nav', { index, item });
};

const onClickItem = (item) => {
  if (item.disabled) {
    return;
  }

  const isActive = isActiveItem(item.id);

  if (Array.isArray(props.activeId)) {
    let newActiveId = [...props.activeId];
    if (isActive) {
      newActiveId = newActiveId.filter((id) => id !== item.id);
    } else if (newActiveId.length < props.max) {
      newActiveId.push(item.id);
    }
    emit('update:activeId', newActiveId);
  } else {
    emit('update:activeId', isActive ? null : item.id);
  }
  emit('click-item', item);
};

watch(
  () => props.items,
  () => {
    // Ensure mainActiveIndex is valid
    if (props.mainActiveIndex >= props.items.length || props.mainActiveIndex < 0) {
      emit('update:mainActiveIndex', 0);
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.mainActiveIndex,
  (newIndex) => {
    // If activeId is not in the current subItems, and it's not multi-select, reset it.
    // For multi-select, we keep the selections across different main categories.
    if (!Array.isArray(props.activeId)) {
      const currentSubItems = props.items[newIndex]?.children || [];
      const isActiveIdInCurrentSubItems = currentSubItems.some(item => item.id === props.activeId);
      if (!isActiveIdInCurrentSubItems && props.activeId !== null && props.activeId !== 0) {
        // emit('update:activeId', null); // Or 0, depending on desired default
      }
    }
  }
);

</script>

<style lang="scss" scoped>
// Import a base style similar to vant's tree-select
// Variables can be customized according to zxui's theme

$van-tree-select-font-size: var(--zx-font-size-md, 14px);
$van-tree-select-nav-background: var(--zx-background-color, #f7f8fa);
$van-tree-select-content-background: var(--zx-background-color-light, #ffffff);
$van-tree-select-nav-item-padding: 14px var(--zx-padding-sm, 12px);
$van-tree-select-item-height: 48px;
$van-tree-select-item-active-color: var(--zx-primary-color, #1989fa);
$van-tree-select-item-disabled-color: var(--zx-text-color-3, #c8c9cc);
$van-tree-select-item-selected-size: 16px;
$van-active-color: var(--zx-active-color, #e8f2ff);

.zx-tree-select {
  position: relative;
  display: flex;
  font-size: $van-tree-select-font-size;
  user-select: none;

  &__nav {
    flex: 1;
    overflow-y: auto;
    background-color: $van-tree-select-nav-background;
    // For better scrolling on mobile
    -webkit-overflow-scrolling: touch;
    height: 100%;
  }

  &__nav-item {
    padding: $van-tree-select-nav-item-padding;
    position: relative;

    &--active {
      background-color: $van-tree-select-content-background;
      color: $van-tree-select-item-active-color;
      font-weight: 500;
    }

    &--disabled {
      color: $van-tree-select-item-disabled-color;
      cursor: not-allowed;
      background-color: transparent; // Ensure disabled items don't get active background
       &:active {
        background-color: transparent;
      }
    }

    &:active {
      background-color: var(--zx-bg-color-hover, #f2f3f5);
    }
  }

  &__nav-dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background-color: var(--zx-danger-color, #ee0a24);
    border-radius: 100%;
  }

  &__nav-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 10px;
    padding: 0 3px;
    color: #fff;
    background-color: var(--zx-danger-color, #ee0a24);
    border-radius: 10px;
    min-width: 16px;
    line-height: 1.2;
    text-align: center;
    box-sizing: border-box;
  }

  &__content {
    flex: 2;
    overflow-y: auto;
    background-color: $van-tree-select-content-background;
    -webkit-overflow-scrolling: touch;
    height: 100%;
  }

  &__item {
    position: relative;
    padding: 0 32px 0 var(--zx-padding-md, 16px);
    font-weight: bold;
    line-height: $van-tree-select-item-height;
    height: $van-tree-select-item-height;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--active {
      color: $van-tree-select-item-active-color;
    }

    &:active {
      background-color: $van-active-color;
    }

    &--disabled {
      color: $van-tree-select-item-disabled-color;
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }
    }
  }

  &__selected {
    // position: absolute;
    // top: 50%;
    // right: var(--zx-padding-md, 16px);
    // margin-top: calc(var(--zx-padding-xs, 8px) * -1);
    font-size: $van-tree-select-item-selected-size;
    line-height: $van-tree-select-item-height; // Ensure icon is vertically centered
  }
}

.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>