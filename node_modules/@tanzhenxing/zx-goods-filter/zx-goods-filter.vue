<template>
  <view class="zx-goods-filter" :class="customClass" :style="customStyle">
    <!-- 筛选内容区域 -->
    <scroll-view scroll-y class="zx-goods-filter__content">
      <!-- 地址选择 -->
      <view v-if="showAddress" class="zx-goods-filter__chunk zx-goods-filter__chunk--address">
        <view class="zx-goods-filter__chunk__label">
          <zx-icon name="location" size="16" color="#666"></zx-icon>
          <text>配送至</text>
        </view>
        <view class="zx-goods-filter__chunk__group">
          <view class="zx-goods-filter__chunk__group__address">{{ currentAddress }}</view>
          <view class="zx-goods-filter__chunk__group__modify" @click="handleAddressClick">
            修改
          </view>
        </view>
      </view>

      <!-- 筛选项 -->
      <view v-for="(item, index) in filterData" :key="index" class="zx-goods-filter__chunk">
        <view class="zx-goods-filter__chunk__label">
          <text>{{ item.title }}</text>
        </view>

        <!-- 类型选择 -->
        <view v-if="item.type === 'radio'" class="zx-goods-filter__chunk__type">
          <view 
            v-for="(option, optionIndex) in item.options" 
            :key="optionIndex"
            :class="['zx-goods-filter__chunk__type__item', { active: option.value === item.value }]"
            @click="handleRadioChange(item, option)"
          >
            {{ option.text }}
          </view>
        </view>

        <!-- 多选 -->
        <view v-else-if="item.type === 'checkbox'" class="zx-goods-filter__chunk__groups">
          <view 
            v-for="(option, optionIndex) in getVisibleOptions(item)" 
            :key="optionIndex"
            :class="['zx-goods-filter__chunk__groups--item', { active: isOptionSelected(item, option) }]"
            @click="handleCheckboxChange(item, option)"
          >
            {{ option.text }}
          </view>
          <view 
            v-if="item.options.length > item.showCount && !item.expanded"
            class="zx-goods-filter__chunk__groups--itemmore"
            @click="toggleExpand(item)"
          >
            更多
            <zx-icon name="arrow-down" size="9"></zx-icon>
          </view>
          <view 
            v-if="item.expanded"
            class="zx-goods-filter__chunk__groups--itemmore"
            @click="toggleExpand(item)"
          >
            收起
            <zx-icon name="arrow-up" size="9"></zx-icon>
          </view>
        </view>

        <!-- 价格区间 -->
        <view v-else-if="item.type === 'price'" class="zx-goods-filter__chunk__price">
          <!-- 价格输入 -->
          <view class="zx-goods-filter__chunk__price--range">
            <view class="zx-goods-filter__chunk__price--range__item">
              <view class="zx-goods-filter__chunk__price--range__item--placeholder">最低价</view>
              <input 
                class="input-num" 
                type="number" 
                :value="item.minPrice" 
                @input="handlePriceInput(item, 'min', $event)"
                placeholder="0"
              />
            </view>
            <view class="zx-goods-filter__chunk__price--range__cable"></view>
            <view class="zx-goods-filter__chunk__price--range__item">
              <view class="zx-goods-filter__chunk__price--range__item--placeholder">最高价</view>
              <input 
                class="input-num" 
                type="number" 
                :value="item.maxPrice" 
                @input="handlePriceInput(item, 'max', $event)"
                placeholder="不限"
              />
            </view>
          </view>
          <!-- 推荐价格 -->
          <view v-if="item.recommendPrices" class="zx-goods-filter__chunk__price--recommend">
            <view 
              v-for="(price, priceIndex) in item.recommendPrices" 
              :key="priceIndex"
              :class="['zx-goods-filter__chunk__price--recommend__item', { active: isPriceSelected(item, price) }]"
              @click="handleRecommendPriceClick(item, price)"
            >
              <view>{{ price.text }}</view>
              <view v-if="price.subText">{{ price.subText }}</view>
            </view>
          </view>
        </view>

        <!-- 分隔线 -->
        <view v-if="index < filterData.length - 1" class="zx-goods-filter__chunk__gap"></view>
      </view>
    </scroll-view>

    <!-- 底部操作按钮 -->
    <view class="zx-goods-filter__operate">
      <view class="zx-goods-filter__operate__btn zx-goods-filter__operate__btn--reset" @click="handleReset">
        重置
      </view>
      <view class="zx-goods-filter__operate__btn zx-goods-filter__operate__btn--confirm" @click="handleConfirm">
        确定
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// 组件属性
const props = defineProps({
  // 筛选数据
  filterData: {
    type: Array,
    default: () => []
  },
  // 是否显示地址选择
  showAddress: {
    type: Boolean,
    default: false
  },
  // 当前地址
  currentAddress: {
    type: String,
    default: '请选择地址'
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 自定义样式
  customStyle: {
    type: [String, Object],
    default: ''
  }
})

// 事件定义
const emit = defineEmits([
  'confirm',
  'reset', 
  'address-click',
  'filter-change'
])

// 内部状态
const internalFilterData = ref([])

// 初始化数据
const initData = () => {
  internalFilterData.value = props.filterData.map(item => ({
    ...item,
    expanded: false,
    showCount: item.showCount || 6,
    value: item.value || (item.type === 'checkbox' ? [] : ''),
    minPrice: item.minPrice || '',
    maxPrice: item.maxPrice || ''
  }))
}

// 监听外部数据变化
watch(() => props.filterData, () => {
  initData()
}, { immediate: true, deep: true })

// 获取可见选项
const getVisibleOptions = (item) => {
  if (item.expanded || !item.showCount) {
    return item.options
  }
  return item.options.slice(0, item.showCount)
}

// 判断选项是否被选中
const isOptionSelected = (item, option) => {
  if (item.type === 'checkbox') {
    return Array.isArray(item.value) && item.value.includes(option.value)
  }
  return item.value === option.value
}

// 判断价格是否被选中
const isPriceSelected = (item, price) => {
  return item.minPrice === price.min && item.maxPrice === price.max
}

// 单选处理
const handleRadioChange = (item, option) => {
  const index = internalFilterData.value.findIndex(f => f === item)
  if (index !== -1) {
    internalFilterData.value[index].value = option.value
    emit('filter-change', {
      type: 'radio',
      item: internalFilterData.value[index],
      value: option.value
    })
  }
}

// 多选处理
const handleCheckboxChange = (item, option) => {
  const index = internalFilterData.value.findIndex(f => f === item)
  if (index !== -1) {
    if (!Array.isArray(item.value)) {
      internalFilterData.value[index].value = []
    }
    
    const valueIndex = item.value.indexOf(option.value)
    if (valueIndex > -1) {
      internalFilterData.value[index].value.splice(valueIndex, 1)
    } else {
      internalFilterData.value[index].value.push(option.value)
    }
    
    emit('filter-change', {
      type: 'checkbox',
      item: internalFilterData.value[index],
      value: internalFilterData.value[index].value
    })
  }
}

// 价格输入处理
const handlePriceInput = (item, type, event) => {
  const index = internalFilterData.value.findIndex(f => f === item)
  if (index !== -1) {
    const value = event.detail.value || event.target.value
    if (type === 'min') {
      internalFilterData.value[index].minPrice = value
    } else {
      internalFilterData.value[index].maxPrice = value
    }
    
    emit('filter-change', {
      type: 'price',
      item: internalFilterData.value[index],
      minPrice: internalFilterData.value[index].minPrice,
      maxPrice: internalFilterData.value[index].maxPrice
    })
  }
}

// 推荐价格点击
const handleRecommendPriceClick = (item, price) => {
  const index = internalFilterData.value.findIndex(f => f === item)
  if (index !== -1) {
    internalFilterData.value[index].minPrice = price.min || ''
    internalFilterData.value[index].maxPrice = price.max || ''
    
    emit('filter-change', {
      type: 'price',
      item: internalFilterData.value[index],
      minPrice: price.min,
      maxPrice: price.max
    })
  }
}

// 展开/收起
const toggleExpand = (item) => {
  const index = internalFilterData.value.findIndex(f => f === item)
  if (index !== -1) {
    internalFilterData.value[index].expanded = !internalFilterData.value[index].expanded
  }
}

// 地址点击
const handleAddressClick = () => {
  emit('address-click')
}

// 重置
const handleReset = () => {
  internalFilterData.value.forEach(item => {
    if (item.type === 'checkbox') {
      item.value = []
    } else if (item.type === 'price') {
      item.minPrice = ''
      item.maxPrice = ''
    } else {
      item.value = ''
    }
    item.expanded = false
  })
  emit('reset', internalFilterData.value)
}

// 确定
const handleConfirm = () => {
  const result = internalFilterData.value.map(item => ({
    key: item.key,
    title: item.title,
    type: item.type,
    value: item.value,
    minPrice: item.minPrice,
    maxPrice: item.maxPrice
  }))
  emit('confirm', result)
}
</script>

<style lang="scss" scoped>
.zx-goods-filter {
  height: 100%;
  padding: 0px 0px 120rpx;
  border-radius: 24rpx;
  background: #fff;
  font-size: 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1;
    overflow: auto;
  }

  &__chunk {
    padding: 0 36rpx;
    margin-top: 48rpx;

    &--address {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 20rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: #1a1a1a;
      
      text {
        margin-left: 16rpx;
      }
    }

    &__group {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &__address {
        max-width: 300rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666;
      }

      &__modify {
        margin-left: 16rpx;
        color: #fa2c19;
        font-size: 24rpx;
      }
    }
  }

  &__chunk__type {
    margin-top: 36rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__item {
      margin-bottom: 16rpx;
      width: 168rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      background: rgba(242, 243, 243, 1);
      border: 1px solid rgba(242, 243, 243, 1);
      border-radius: 32rpx;
      font-size: 24rpx;
      color: #666;

      &.active {
        background: rgba(240, 37, 15, 0.05);
        border: 1px solid rgba(242, 39, 12, 1);
        color: rgba(242, 39, 12, 1);
      }
    }
  }

  &__chunk__price {
    &--range {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-top: 36rpx;

      &__item {
        position: relative;
        flex: 1;
        height: 60rpx;
        line-height: 60rpx;
        background: rgba(246, 246, 246, 1);
        border-radius: 32rpx;
        text-align: center;

        &--placeholder {
          display: inline-block;
          width: 80rpx;
          text-align: center;
          color: #999;
          font-size: 20rpx;
        }

        .input-num {
          position: absolute;
          left: 0;
          width: 100%;
          padding: 0 20%;
          text-align: center;
          height: 60rpx;
          border: 0;
          background: transparent;
          font-size: 24rpx;
          font-weight: bold;
          color: #1a1a1a;
        }
      }

      &__cable {
        margin: 0 10rpx;
        width: 20rpx;
        height: 2rpx;
        border: 1px solid rgba(151, 151, 151, 1);
      }
    }

    &--recommend {
      margin-top: 16rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 168rpx;
        height: 80rpx;
        line-height: 28rpx;
        padding: 0 24rpx;
        text-align: center;
        background: rgba(242, 243, 243, 1);
        border: 1px solid rgba(242, 243, 243, 1);
        border-radius: 36rpx;
        font-size: 24rpx;
        margin-bottom: 16rpx;
        color: #666;
        
        &.active {
          background: rgba(240, 37, 15, 0.05);
          border: 1px solid rgba(242, 39, 12, 1);
          color: rgba(242, 39, 12, 1);
        }

        view {
          &:first-child {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
          }

          &:last-child {
            transform: scale(0.9);
            color: #999;
          }
        }
      }
    }
  }

  &__chunk__groups {
    padding-top: 36rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    gap: 16rpx;

    &.PT0 {
      padding-top: 0;
    }

    &--item {
      padding: 0 16rpx;
      width: 168rpx;
      margin-bottom: 16rpx;
      height: 60rpx;
      line-height: 60rpx;
      background: rgba(246, 246, 246, 1);
      border: 1px solid rgba(246, 246, 246, 1);
      border-radius: 32rpx;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 24rpx;
      color: #666;

      &.active {
        background: rgba(240, 37, 15, 0.05);
        border: 1px solid rgba(242, 39, 12, 1);
        color: rgba(242, 39, 12, 1);
      }
    }

    &--itemmore {
      width: 168rpx;
      height: 60rpx;
      line-height: 60rpx;
      margin-bottom: 16rpx;
      text-align: center;
      font-size: 24rpx;
      background: rgba(246, 246, 246, 1);
      border: 1px solid rgba(246, 246, 246, 1);
      border-radius: 32rpx;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__chunk__gap {
    margin-top: 48rpx;
    height: 20rpx;
    width: 100%;
    background-color: #f2f3f3;
  }

  &__operate {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid rgba(243, 243, 243, 1);
    border-radius: 0 0 24rpx 24rpx;
    background: #fff;
    padding: 0 40rpx;
    box-sizing: border-box;

    &__btn {
      width: 260rpx;
      height: 76rpx;
      border-radius: 50rpx;
      font-size: 30rpx;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      line-height: 76rpx;

      &--reset {
        border: 1px solid rgba(155, 155, 155, 1);
        background: #fff;
      }

      &--confirm {
        color: rgba(255, 255, 255, 1);
        background: rgba(242, 39, 12, 1);
      }
    }
  }
}
</style>