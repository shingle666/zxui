<template>
  <view :class="[
    'zx-receive-invoice-list',
    customClass,
    { 'zx-receive-invoice-list--loading': loading }
  ]" :style="[customStyle]">
    <!-- 头部插槽 -->
    <slot name="header" />

    <!-- 发票列表 -->
    <view class="zx-receive-invoice-list__content">
      <!-- 空状态 -->
      <view v-if="!loading && internalList.length === 0" class="zx-receive-invoice-list__empty">
        <slot name="empty">
          <view class="zx-receive-invoice-list__empty-content">
            <text class="zx-receive-invoice-list__empty-icon">📄</text>
            <text class="zx-receive-invoice-list__empty-text">{{ emptyText }}</text>
          </view>
        </slot>
      </view>

      <!-- 发票项列表 -->
      <view v-for="(item, index) in internalList" :key="item[keyField] || index" class="zx-receive-invoice-list__item"
        @click="handleItemClick(item, index)">
        <slot name="item" :item="item" :index="index">
          <!-- 默认发票卡片 -->
          <view class="zx-receive-invoice-list__card">
            <!-- 发票类型图标 -->
            <view class="zx-receive-invoice-list__icon">
              <text class="zx-receive-invoice-list__icon-text">
                {{ getInvoiceTypeIcon(item[typeField]) }}
              </text>
            </view>

            <!-- 发票信息 -->
            <view class="zx-receive-invoice-list__info">
              <!-- 发票抬头 -->
              <view class="zx-receive-invoice-list__title">
                <text class="zx-receive-invoice-list__title-text" :style="{ color: titleColor }">
                  {{ item[titleField] || '未设置抬头' }}
                </text>
                <!-- 发票类型标签 -->
                <view v-if="item[typeField]" class="zx-receive-invoice-list__type-tag" :style="{
                  color: tagColor,
                  backgroundColor: tagBgColor
                }">
                  <text class="zx-receive-invoice-list__type-text">
                    {{ getInvoiceTypeText(item[typeField]) }}
                  </text>
                </view>
              </view>

              <!-- 税号 -->
              <view v-if="item[taxNumberField] && showTaxNumber" class="zx-receive-invoice-list__tax-number">
                <text class="zx-receive-invoice-list__tax-number-text" :style="{ color: descColor }">
                  税号：{{ item[taxNumberField] }}
                </text>
              </view>

              <!-- 地址信息 -->
              <view v-if="item[addressField] && showAddress" class="zx-receive-invoice-list__address">
                <text class="zx-receive-invoice-list__address-text" :style="{ color: descColor }">
                  地址：{{ item[addressField] }}
                </text>
              </view>

              <!-- 电话信息 -->
              <view v-if="item[phoneField] && showPhone" class="zx-receive-invoice-list__phone">
                <text class="zx-receive-invoice-list__phone-text" :style="{ color: descColor }">
                  电话：{{ item[phoneField] }}
                </text>
              </view>

              <!-- 银行信息 -->
              <view v-if="item[bankField] && showBank" class="zx-receive-invoice-list__bank">
                <text class="zx-receive-invoice-list__bank-text" :style="{ color: descColor }">
                  开户行：{{ item[bankField] }}
                </text>
              </view>

              <!-- 银行账号 -->
              <view v-if="item[accountField] && showAccount" class="zx-receive-invoice-list__account">
                <text class="zx-receive-invoice-list__account-text" :style="{ color: descColor }">
                  账号：{{ item[accountField] }}
                </text>
              </view>
            </view>

            <!-- 操作按钮 -->
            <view class="zx-receive-invoice-list__actions">
              <!-- 默认状态标识 -->
              <view v-if="item[defaultField] && showDefault" class="zx-receive-invoice-list__default-tag" :style="{
                color: defaultTagColor,
                backgroundColor: defaultTagBgColor
              }">
                <text class="zx-receive-invoice-list__default-text">默认</text>
              </view>

              <!-- 选择状态 -->
              <view v-if="selectable" class="zx-receive-invoice-list__checkbox" @click.stop="handleSelect(item, index)">
                <text class="zx-receive-invoice-list__checkbox-icon" :style="{
                  color: item[selectedField] ? selectedColor : '#ddd',
                  borderColor: item[selectedField] ? selectedColor : '#ddd'
                }">
                  {{ item[selectedField] ? '✓' : '' }}
                </text>
              </view>

              <!-- 编辑按钮 -->
              <view v-if="showEdit" class="zx-receive-invoice-list__edit-btn" @click.stop="handleEdit(item, index)">
                <text class="zx-receive-invoice-list__edit-text">编辑</text>
              </view>

              <!-- 删除按钮 -->
              <view v-if="showDelete" class="zx-receive-invoice-list__delete-btn"
                @click.stop="handleDelete(item, index)">
                <text class="zx-receive-invoice-list__delete-text">删除</text>
              </view>
            </view>
          </view>
        </slot>
      </view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="zx-receive-invoice-list__loading">
      <slot name="loading">
        <view class="zx-receive-invoice-list__loading-content">
          <text class="zx-receive-invoice-list__loading-icon">⏳</text>
          <text class="zx-receive-invoice-list__loading-text" :style="{ color: loadingColor }">
            {{ loadingText }}
          </text>
        </view>
      </slot>
    </view>

    <!-- 加载更多 -->
    <view v-if="showLoadMore && !loading && !finished && internalList.length > 0"
      class="zx-receive-invoice-list__load-more" @click="handleLoadMore">
      <slot name="loadMore">
        <text class="zx-receive-invoice-list__load-more-text" :style="{ color: loadingColor }">
          {{ loadMoreText }}
        </text>
      </slot>
    </view>

    <!-- 加载完成 -->
    <view v-if="finished && internalList.length > 0" class="zx-receive-invoice-list__finished">
      <text class="zx-receive-invoice-list__finished-text" :style="{ color: finishedColor }">
        {{ finishedText }}
      </text>
    </view>

    <!-- 底部插槽 -->
    <slot name="footer" />
  </view>
</template>

<script>
export default {
  name: 'zx-receive-invoice-list',
  props: {
    // 基础数据
    list: {
      type: Array,
      default: () => []
    },

    // 字段映射
    keyField: {
      type: String,
      default: 'id'
    },
    titleField: {
      type: String,
      default: 'title'
    },
    typeField: {
      type: String,
      default: 'type'
    },
    taxNumberField: {
      type: String,
      default: 'taxNumber'
    },
    addressField: {
      type: String,
      default: 'address'
    },
    phoneField: {
      type: String,
      default: 'phone'
    },
    bankField: {
      type: String,
      default: 'bank'
    },
    accountField: {
      type: String,
      default: 'account'
    },
    defaultField: {
      type: String,
      default: 'isDefault'
    },
    selectedField: {
      type: String,
      default: 'selected'
    },

    // 显示控制
    showTaxNumber: {
      type: Boolean,
      default: true
    },
    showAddress: {
      type: Boolean,
      default: true
    },
    showPhone: {
      type: Boolean,
      default: true
    },
    showBank: {
      type: Boolean,
      default: true
    },
    showAccount: {
      type: Boolean,
      default: true
    },
    showDefault: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },

    // 交互控制
    selectable: {
      type: Boolean,
      default: false
    },

    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    showLoadMore: {
      type: Boolean,
      default: true
    },

    // 文本配置
    emptyText: {
      type: String,
      default: '暂无发票信息'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    loadMoreText: {
      type: String,
      default: '点击加载更多'
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },

    // 颜色配置
    titleColor: {
      type: String,
      default: '#333'
    },
    descColor: {
      type: String,
      default: '#666'
    },
    tagColor: {
      type: String,
      default: '#fff'
    },
    tagBgColor: {
      type: String,
      default: '#007aff'
    },
    defaultTagColor: {
      type: String,
      default: '#fff'
    },
    defaultTagBgColor: {
      type: String,
      default: '#ff4757'
    },
    selectedColor: {
      type: String,
      default: '#007aff'
    },
    loadingColor: {
      type: String,
      default: '#007aff'
    },
    finishedColor: {
      type: String,
      default: '#999'
    },

    // 自定义样式
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: [Object, String],
      default: () => ({})
    }
  },

  emits: [
    'item-click',
    'select',
    'edit',
    'delete',
    'load-more'
  ],

  computed: {
    internalList() {
      return this.list || []
    }
  },

  methods: {
    // 获取发票类型图标
    getInvoiceTypeIcon(type) {
      const iconMap = {
        'personal': '👤',
        'company': '🏢',
        'special': '⭐'
      }
      return iconMap[type] || '📄'
    },

    // 获取发票类型文本
    getInvoiceTypeText(type) {
      const textMap = {
        'personal': '个人',
        'company': '企业',
        'special': '专票'
      }
      return textMap[type] || '普票'
    },

    // 处理项目点击
    handleItemClick(item, index) {
      this.$emit('item-click', { item, index })
    },

    // 处理选择
    handleSelect(item, index) {
      this.$emit('select', { item, index })
    },

    // 处理编辑
    handleEdit(item, index) {
      this.$emit('edit', { item, index })
    },

    // 处理删除
    handleDelete(item, index) {
      this.$emit('delete', { item, index })
    },

    // 处理加载更多
    handleLoadMore() {
      this.$emit('load-more')
    }
  }
}
</script>

<style lang="scss" scoped>
.zx-receive-invoice-list {
  width: 100%;

  &--loading {
    opacity: 0.6;
  }

  &__content {
    padding: 0 32rpx;
  }

  &__empty {
    padding: 120rpx 0;
    text-align: center;

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;
    }

    &-icon {
      font-size: 80rpx;
      opacity: 0.3;
    }

    &-text {
      font-size: 28rpx;
      color: #999;
    }
  }

  &__item {
    margin-bottom: 24rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__card {
    background: #fff;
    border-radius: 16rpx;
    padding: 32rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: flex-start;
    gap: 24rpx;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.12);
    }
  }

  &__icon {
    width: 80rpx;
    height: 80rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &-text {
      font-size: 32rpx;
      color: #fff;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 12rpx;

    &-text {
      font-size: 32rpx;
      font-weight: 600;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__type-tag {
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
    flex-shrink: 0;

    &-text {
      font-size: 20rpx;
      font-weight: 500;
    }
  }

  &__tax-number,
  &__address,
  &__phone,
  &__bank,
  &__account {
    margin-bottom: 8rpx;

    &:last-child {
      margin-bottom: 0;
    }

    &-text {
      font-size: 24rpx;
      line-height: 1.4;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12rpx;
    flex-shrink: 0;
  }

  &__default-tag {
    padding: 6rpx 12rpx;
    border-radius: 8rpx;

    &-text {
      font-size: 20rpx;
      font-weight: 500;
    }
  }

  &__checkbox {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      width: 32rpx;
      height: 32rpx;
      border: 2rpx solid;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20rpx;
      font-weight: bold;
      transition: all 0.3s ease;
    }
  }

  &__edit-btn,
  &__delete-btn {
    padding: 8rpx 16rpx;
    border-radius: 8rpx;

    &-text {
      font-size: 24rpx;
    }
  }

  &__edit-btn {
    background: #f8f9fa;

    &-text {
      color: #007aff;
    }
  }

  &__delete-btn {
    background: #fff5f5;

    &-text {
      color: #ff4757;
    }
  }

  &__loading {
    padding: 60rpx 0;
    text-align: center;

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;
    }

    &-icon {
      font-size: 48rpx;
      animation: rotate 1s linear infinite;
    }

    &-text {
      font-size: 28rpx;
    }
  }

  &__load-more {
    padding: 40rpx 0;
    text-align: center;

    &-text {
      font-size: 28rpx;
      padding: 16rpx 32rpx;
      border: 2rpx solid currentColor;
      border-radius: 50rpx;
      transition: all 0.3s ease;
    }

    &:active &-text {
      transform: scale(0.95);
      opacity: 0.8;
    }
  }

  &__finished {
    padding: 40rpx 0;
    text-align: center;

    &-text {
      font-size: 24rpx;
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 60rpx;
        height: 1rpx;
        background: currentColor;
        opacity: 0.3;
      }

      &::before {
        right: 100%;
        margin-right: 20rpx;
      }

      &::after {
        left: 100%;
        margin-left: 20rpx;
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>