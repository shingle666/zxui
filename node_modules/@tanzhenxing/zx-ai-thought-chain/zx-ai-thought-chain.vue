<template>
  <view :class="mergedCls" :style="mergedStyle">
    <view v-for="(item, index) in items" :key="item.key || `key_${index}`" :class="getItemCls(item, index)"
      :style="getItemStyle(item)">
      <!-- Header -->
      <view :class="getHeaderCls()" :style="getHeaderStyle()" @click="onItemClick(item, index)">
        <!-- Avatar/Icon -->
        <view :class="getIconCls()">
          <slot name="icon" :item="item" :index="index">
            <text v-if="typeof getItemIcon(item, index) === 'string' || typeof getItemIcon(item, index) === 'number'">
              {{ getItemIcon(item, index) }}
            </text>
          </slot>
        </view>

        <!-- Header Content -->
        <view :class="getHeaderBoxCls(item)">
          <!-- Title -->
          <view :class="getTitleCls()">
            <!-- Collapse Icon -->
            <text v-if="enableCollapse && item.content && !isRTL" :class="getCollapseIconCls(item)"
              :style="getCollapseIconStyle(item)">
              ▶
            </text>
            <text v-if="enableCollapse && item.content && isRTL" :class="getCollapseIconCls(item)"
              :style="getCollapseIconStyle(item)">
              ◀
            </text>
            <text :class="getTitleTextCls()">{{ item.title }}</text>
          </view>

          <!-- Description -->
          <view v-if="item.description" :class="getDescCls()">
            <text :class="getDescTextCls()">{{ item.description }}</text>
          </view>
        </view>

        <!-- Extra -->
        <view v-if="item.extra" :class="getExtraCls()">
          <slot name="extra" :item="item" :index="index">
            <text>{{ item.extra }}</text>
          </slot>
        </view>
      </view>

      <!-- Content -->
      <view v-if="item.content && getContentVisible(item)" :class="getContentCls()" :style="getContentStyle()">
        <view :class="getContentBoxCls()" :style="getContentBoxStyle()">
          <slot name="content" :item="item" :index="index">
            <text>{{ item.content }}</text>
          </slot>
        </view>
      </view>

      <!-- Footer -->
      <view v-if="item.footer" :class="getFooterCls()" :style="getFooterStyle()">
        <slot name="footer" :item="item" :index="index">
          <text>{{ item.footer }}</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

// 思维链节点状态枚举
const THOUGHT_CHAIN_ITEM_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
}

// Props 定义
const props = defineProps({
  // 思维节点集合
  items: {
    type: Array,
    default: () => []
  },
  // 是否可折叠
  collapsible: {
    type: [Boolean, Object],
    default: false
  },
  // 组件大小
  size: {
    type: String,
    default: 'middle',
    validator: (value) => ['large', 'middle', 'small'].includes(value)
  },
  // 自定义前缀
  prefixCls: {
    type: String,
    default: 'zx-thought-chain'
  },
  // 自定义根类名
  rootClassName: {
    type: String,
    default: ''
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 自定义样式
  customStyle: {
    type: [Object, String],
    default: () => ({})
  },
  // 语义化结构样式
  styles: {
    type: Object,
    default: () => ({})
  },
  // 语义化结构类名
  classNames: {
    type: Object,
    default: () => ({})
  },
  // RTL 支持
  direction: {
    type: String,
    default: 'ltr',
    validator: (value) => ['ltr', 'rtl'].includes(value)
  }
})

// Emits 定义
const emit = defineEmits(['itemClick', 'itemExpand'])

// 响应式数据
const expandedKeys = ref([])

// 计算属性
const enableCollapse = computed(() => {
  if (typeof props.collapsible === 'boolean') {
    return props.collapsible
  }
  if (typeof props.collapsible === 'object' && props.collapsible !== null) {
    return true
  }
  return false
})

const isRTL = computed(() => props.direction === 'rtl')

const mergedCls = computed(() => {
  const cls = [
    props.prefixCls,
    props.rootClassName,
    props.customClass,
    `${props.prefixCls}-${props.size}`
  ]

  if (isRTL.value) {
    cls.push(`${props.prefixCls}-rtl`)
  }

  return cls.filter(Boolean).join(' ')
})

const mergedStyle = computed(() => {
  if (typeof props.customStyle === 'string') {
    return props.customStyle
  }
  return props.customStyle || {}
})

// 监听 collapsible 变化
watch(
  () => props.collapsible,
  (newVal) => {
    if (typeof newVal === 'object' && newVal !== null) {
      if (newVal.defaultExpandedKeys) {
        expandedKeys.value = [...newVal.defaultExpandedKeys]
      }
      if (newVal.expandedKeys) {
        expandedKeys.value = [...newVal.expandedKeys]
      }
    }
  },
  { immediate: true }
)

// 方法定义
const getItemIcon = (item, index) => {
  return item.icon !== undefined ? item.icon : index + 1
}

const getContentVisible = (item) => {
  if (!enableCollapse.value) return true
  const key = item.key || `key_${props.items.indexOf(item)}`
  return expandedKeys.value.includes(key)
}

const onItemClick = (item, index) => {
  const key = item.key || `key_${index}`

  emit('itemClick', { item, index, key })

  if (enableCollapse.value && item.content) {
    const currentIndex = expandedKeys.value.indexOf(key)
    if (currentIndex > -1) {
      expandedKeys.value.splice(currentIndex, 1)
    } else {
      expandedKeys.value.push(key)
    }

    emit('itemExpand', {
      item,
      index,
      key,
      expanded: expandedKeys.value.includes(key),
      expandedKeys: [...expandedKeys.value]
    })
  }
}

// 样式类名方法
const getItemCls = (item, index) => {
  const cls = [`${props.prefixCls}-item`]

  if (item.status) {
    const nextStatus = props.items[index + 1]?.status
    cls.push(`${props.prefixCls}-item-${item.status}${nextStatus ? `-${nextStatus}` : ''}`)
  }

  if (props.classNames.item) {
    cls.push(props.classNames.item)
  }

  return cls.join(' ')
}

const getItemStyle = (item) => {
  return props.styles.item || {}
}

const getHeaderCls = () => {
  const cls = [`${props.prefixCls}-item-header`]
  if (props.classNames.itemHeader) {
    cls.push(props.classNames.itemHeader)
  }
  return cls.join(' ')
}

const getHeaderStyle = () => {
  return props.styles.itemHeader || {}
}

const getIconCls = () => {
  return `${props.prefixCls}-item-icon`
}

const getHeaderBoxCls = (item) => {
  const cls = [`${props.prefixCls}-item-header-box`]
  if (enableCollapse.value && item.content) {
    cls.push(`${props.prefixCls}-item-collapsible`)
  }
  return cls.join(' ')
}

const getTitleCls = () => {
  return `${props.prefixCls}-item-title`
}

const getTitleTextCls = () => {
  return `${props.prefixCls}-item-title-text`
}

const getCollapseIconCls = (item) => {
  return `${props.prefixCls}-item-collapse-icon`
}

const getCollapseIconStyle = (item) => {
  const key = item.key || `key_${props.items.indexOf(item)}`
  const isExpanded = expandedKeys.value.includes(key)

  return {
    transform: isRTL.value
      ? `rotate(${isExpanded ? -90 : 0}deg)`
      : `rotate(${isExpanded ? 90 : 0}deg)`,
    transition: 'transform 0.2s ease'
  }
}

const getDescCls = () => {
  return `${props.prefixCls}-item-desc`
}

const getDescTextCls = () => {
  return `${props.prefixCls}-item-desc-text`
}

const getExtraCls = () => {
  return `${props.prefixCls}-item-extra`
}

const getContentCls = () => {
  return `${props.prefixCls}-item-content`
}

const getContentStyle = () => {
  return {}
}

const getContentBoxCls = () => {
  const cls = [`${props.prefixCls}-item-content-box`]
  if (props.classNames.itemContent) {
    cls.push(props.classNames.itemContent)
  }
  return cls.join(' ')
}

const getContentBoxStyle = () => {
  return props.styles.itemContent || {}
}

const getFooterCls = () => {
  const cls = [`${props.prefixCls}-item-footer`]
  if (props.classNames.itemFooter) {
    cls.push(props.classNames.itemFooter)
  }
  return cls.join(' ')
}

const getFooterStyle = () => {
  return props.styles.itemFooter || {}
}

// 暴露方法给父组件
defineExpose({
  expandedKeys,
  expandItem: (key) => {
    if (!expandedKeys.value.includes(key)) {
      expandedKeys.value.push(key)
    }
  },
  collapseItem: (key) => {
    const index = expandedKeys.value.indexOf(key)
    if (index > -1) {
      expandedKeys.value.splice(index, 1)
    }
  },
  toggleItem: (key) => {
    const index = expandedKeys.value.indexOf(key)
    if (index > -1) {
      expandedKeys.value.splice(index, 1)
    } else {
      expandedKeys.value.push(key)
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-thought-chain {
  display: flex;
  flex-direction: column;
  gap: 0;

  &-large {
    .zx-thought-chain-item {
      &-header {
        padding: 16px;
      }

      &-content-box {
        padding: 16px;
      }

      &-footer {
        padding: 16px;
      }
    }
  }

  &-middle {
    .zx-thought-chain-item {
      &-header {
        padding: 12px;
      }

      &-content-box {
        padding: 12px;
      }

      &-footer {
        padding: 12px;
      }
    }
  }

  &-small {
    .zx-thought-chain-item {
      &-header {
        padding: 8px;
      }

      &-content-box {
        padding: 8px;
      }

      &-footer {
        padding: 8px;
      }
    }
  }

  &-item {
    position: relative;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 100%;
      width: 2px;
      height: 8px;
      background: #e8e8e8;
      transform: translateX(-50%);
      z-index: 1;
    }

    &:last-child::before {
      display: none;
    }

    &-pending {
      border-left: 4px solid #faad14;

      .zx-thought-chain-item-icon {
        background: #faad14;
        color: #fff;
      }
    }

    &-success {
      border-left: 4px solid #52c41a;

      .zx-thought-chain-item-icon {
        background: #52c41a;
        color: #fff;
      }
    }

    &-error {
      border-left: 4px solid #ff4d4f;

      .zx-thought-chain-item-icon {
        background: #ff4d4f;
        color: #fff;
      }
    }

    &-header {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #fafafa;
      }
    }

    &-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #1890ff;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      flex-shrink: 0;
    }

    &-header-box {
      flex: 1;
      min-width: 0;
    }

    &-collapsible {
      .zx-thought-chain-item-title {
        cursor: pointer;
      }
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;

      &-text {
        font-size: 16px;
        font-weight: 600;
        color: #262626;
        line-height: 1.5;
      }
    }

    &-collapse-icon {
      font-size: 12px;
      color: #8c8c8c;
      transition: transform 0.2s ease;
    }

    &-desc {
      &-text {
        font-size: 14px;
        color: #8c8c8c;
        line-height: 1.5;
      }
    }

    &-extra {
      flex-shrink: 0;
    }

    &-content {
      overflow: hidden;

      &-box {
        background: #fafafa;
        border-radius: 6px;
        margin: 0 12px 12px 56px;

        text {
          font-size: 14px;
          color: #595959;
          line-height: 1.6;
        }
      }
    }

    &-footer {
      margin: 0 12px 12px 56px;

      text {
        font-size: 12px;
        color: #8c8c8c;
        line-height: 1.5;
      }
    }
  }

  &-rtl {
    .zx-thought-chain-item {
      &-content-box {
        margin: 0 56px 12px 12px;
      }

      &-footer {
        margin: 0 56px 12px 12px;
      }
    }
  }
}
</style>