<template>
  <view v-if="show" class="zx-goods-sku2-mask" @click="onMaskClick">
    <view class="zx-goods-sku2" :class="customClass" :style="customStyle" @click.stop>
      <!-- 商品信息头部 -->
      <view class="zx-goods-sku2-header">
        <view class="zx-goods-sku2-close" @click="close">
          <text class="zx-goods-sku2-close-icon">×</text>
        </view>
        <view class="zx-goods-sku2-goods-info">
          <image v-if="goods.image" :src="goods.image" class="zx-goods-sku2-goods-image" mode="aspectFill" />
          <view class="zx-goods-sku2-goods-content">
            <view class="zx-goods-sku2-goods-title">{{ goods.title || goods.name }}</view>
            <view class="zx-goods-sku2-goods-price">
              <text class="zx-goods-sku2-price-symbol">¥</text>
              <text class="zx-goods-sku2-price-value">{{ currentPrice }}</text>
              <text v-if="priceRange" class="zx-goods-sku2-price-range">{{ priceRange }}</text>
            </view>
            <view v-if="goods.originalPrice && goods.originalPrice > currentPrice" class="zx-goods-sku2-original-price">
              ¥{{ goods.originalPrice }}
            </view>
            <view v-if="selectedSkuText" class="zx-goods-sku2-selected-text">
              已选：{{ selectedSkuText }}
            </view>
            <view v-if="showStock" class="zx-goods-sku2-stock">
              <text :class="stockClass">{{ stockText }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 规格选择区域 -->
      <scroll-view scroll-y class="zx-goods-sku2-content">
        <view class="zx-goods-sku2-content-wrapper">
          <!-- 自定义插槽：规格选择区域上方 -->
          <slot name="sku-select-top" />

          <!-- 规格选择 -->
          <view v-for="(spec, specIndex) in skuList" :key="spec.id" class="zx-goods-sku2-spec">
            <view class="zx-goods-sku2-spec-title">
              {{ spec.name }}
              <text v-if="spec.required" class="zx-goods-sku2-spec-required">*</text>
            </view>
            <view class="zx-goods-sku2-spec-list">
              <view v-for="(option, optionIndex) in spec.list" :key="option.id" class="zx-goods-sku2-spec-item" :class="{
                'zx-goods-sku2-spec-item-active': option.active,
                'zx-goods-sku2-spec-item-disabled': option.disabled,
                'zx-goods-sku2-spec-item-image': option.image
              }" @click="selectSku(specIndex, optionIndex)">
                <image v-if="option.image" :src="option.image" class="zx-goods-sku2-spec-item-img" mode="aspectFill" />
                <text class="zx-goods-sku2-spec-item-text">{{ option.name }}</text>
                <view v-if="option.active" class="zx-goods-sku2-spec-item-check">
                  <text class="zx-goods-sku2-spec-item-check-icon">✓</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 数量选择 -->
          <view class="zx-goods-sku2-stepper">
            <view class="zx-goods-sku2-stepper-header">
              <text class="zx-goods-sku2-stepper-title">{{ stepperTitle }}</text>
              <text v-if="stepperExtraText" class="zx-goods-sku2-stepper-extra">
                {{ typeof stepperExtraText === 'function' ? stepperExtraText(quantity) : stepperExtraText }}
              </text>
            </view>
            <view class="zx-goods-sku2-stepper-content">
              <view class="zx-goods-sku2-stepper-btn"
                :class="{ 'zx-goods-sku2-stepper-btn-disabled': quantity <= stepperMin }" @click="changeQuantity(-1)">
                <text class="zx-goods-sku2-stepper-btn-text">-</text>
              </view>
              <input v-model.number="quantity" class="zx-goods-sku2-stepper-input" type="number" :min="stepperMin"
                :max="stepperMax" @input="onQuantityInput" @blur="onQuantityBlur" />
              <view class="zx-goods-sku2-stepper-btn"
                :class="{ 'zx-goods-sku2-stepper-btn-disabled': quantity >= stepperMax }" @click="changeQuantity(1)">
                <text class="zx-goods-sku2-stepper-btn-text">+</text>
              </view>
            </view>
          </view>

          <!-- 服务保障 -->
          <view v-if="services && services.length" class="zx-goods-sku2-services">
            <view class="zx-goods-sku2-services-title">服务保障</view>
            <view class="zx-goods-sku2-services-list">
              <view v-for="(service, index) in services" :key="index" class="zx-goods-sku2-service-item">
                <text class="zx-goods-sku2-service-icon">{{ service.icon || '✓' }}</text>
                <text class="zx-goods-sku2-service-text">{{ service.text }}</text>
              </view>
            </view>
          </view>

          <!-- 自定义插槽：数量选择区域下方 -->
          <slot name="sku-stepper-bottom" />
        </view>
      </scroll-view>

      <!-- 底部操作按钮 -->
      <view class="zx-goods-sku2-operate">
        <view v-if="btnExtraText" class="zx-goods-sku2-operate-extra">
          {{ btnExtraText }}
        </view>
        <view class="zx-goods-sku2-operate-btns">
          <view v-for="btn in btnOptions" :key="btn" class="zx-goods-sku2-operate-btn" :class="[
            `zx-goods-sku2-operate-btn-${btn}`,
            { 'zx-goods-sku2-operate-btn-disabled': !canOperate }
          ]" @click="onBtnClick(btn)">
            <text class="zx-goods-sku2-operate-btn-text">
              {{ getBtnText(btn) }}
            </text>
          </view>
        </view>
        <!-- 自定义操作按钮插槽 -->
        <slot name="operate-btn" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// Props 定义
const props = defineProps({
  // 是否显示商品规格弹框
  show: {
    type: Boolean,
    default: false
  },
  // 商品 sku 数据
  sku: {
    type: Array,
    default: () => []
  },
  // 商品信息
  goods: {
    type: Object,
    default: () => ({})
  },
  // 设置数量选择器最大值
  stepperMax: {
    type: [String, Number],
    default: 99999
  },
  // 设置数量选择器最小值
  stepperMin: {
    type: [String, Number],
    default: 1
  },
  // 底部按钮设置 ['confirm', 'buy', 'cart']
  btnOptions: {
    type: Array,
    default: () => ['confirm']
  },
  // 按钮上部添加文案
  btnExtraText: {
    type: String,
    default: ''
  },
  // 数量选择组件左侧文案
  stepperTitle: {
    type: String,
    default: '购买数量'
  },
  // 数量选择器与标题之间的文案
  stepperExtraText: {
    type: [Function, Boolean, String],
    default: false
  },
  // 立即购买按钮文案
  buyText: {
    type: String,
    default: '立即购买'
  },
  // 加入购物车按钮文案
  addCartText: {
    type: String,
    default: '加入购物车'
  },
  // 确定按钮文案
  confirmText: {
    type: String,
    default: '确定'
  },
  // 点击遮罩是否关闭
  maskClosable: {
    type: Boolean,
    default: true
  },
  // 是否显示库存
  showStock: {
    type: Boolean,
    default: true
  },
  // 库存不足阈值
  stockThreshold: {
    type: Number,
    default: 10
  },
  // 服务保障列表
  services: {
    type: Array,
    default: () => []
  },
  // 是否启用规格联动
  enableSkuLink: {
    type: Boolean,
    default: true
  },
  // SKU组合数据（用于规格联动）
  skuCombinations: {
    type: Array,
    default: () => []
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

// Emits 定义
const emit = defineEmits([
  'update:show',
  'close',
  'select-sku',
  'change-stepper',
  'click-btn-operate',
  'add',
  'reduce',
  'over-limit',
  'sku-complete',
  'stock-shortage'
])

// 响应式数据
const skuList = ref([])
const quantity = ref(1)
const selectedSku = ref({})
const selectedSkuCombination = ref(null)

// 计算属性
const currentPrice = computed(() => {
  if (selectedSkuCombination.value?.price) {
    return selectedSkuCombination.value.price
  }
  return props.goods.price || '0.00'
})

const priceRange = computed(() => {
  if (!props.skuCombinations.length) return ''

  const prices = props.skuCombinations.map(item => parseFloat(item.price)).filter(price => !isNaN(price))
  if (prices.length <= 1) return ''

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  if (minPrice === maxPrice) return ''
  return `~¥${maxPrice}`
})

const currentStock = computed(() => {
  if (selectedSkuCombination.value?.stock !== undefined) {
    return selectedSkuCombination.value.stock
  }
  return props.goods.stock || 0
})

const stockText = computed(() => {
  const stock = currentStock.value
  if (stock <= 0) return '现货不足'
  if (stock <= props.stockThreshold) return `仅剩${stock}件`
  return `库存${stock}件`
})

const stockClass = computed(() => {
  const stock = currentStock.value
  if (stock <= 0) return 'zx-goods-sku2-stock-empty'
  if (stock <= props.stockThreshold) return 'zx-goods-sku2-stock-low'
  return 'zx-goods-sku2-stock-normal'
})

const selectedSkuText = computed(() => {
  const texts = []
  skuList.value.forEach(spec => {
    const activeOption = spec.list.find(option => option.active)
    if (activeOption) {
      texts.push(activeOption.name)
    }
  })
  return texts.join('，')
})

const canOperate = computed(() => {
  // 检查是否所有必选规格都已选择
  const requiredSpecs = skuList.value.filter(spec => spec.required !== false)
  const selectedRequiredSpecs = requiredSpecs.filter(spec =>
    spec.list.some(option => option.active)
  )

  return selectedRequiredSpecs.length === requiredSpecs.length && currentStock.value > 0
})

// 监听器
watch(() => props.sku, (newSku) => {
  initSkuList(newSku)
}, { immediate: true, deep: true })

watch(() => props.stepperMin, (newMin) => {
  if (quantity.value < Number(newMin)) {
    quantity.value = Number(newMin)
  }
}, { immediate: true })

watch(selectedSku, (newSelectedSku) => {
  updateSelectedSkuCombination()
  updateSkuStatus()
}, { deep: true })

// 方法
function initSkuList(sku) {
  skuList.value = JSON.parse(JSON.stringify(sku || []))
  quantity.value = Number(props.stepperMin)
  selectedSku.value = {}
  selectedSkuCombination.value = null
}

function selectSku(specIndex, optionIndex) {
  const spec = skuList.value[specIndex]
  const option = spec.list[optionIndex]

  if (option.disabled) return

  // 取消当前规格的所有选中状态
  spec.list.forEach(item => {
    item.active = false
  })

  // 设置当前选项为选中状态
  option.active = true

  // 更新选中的 SKU
  selectedSku.value[spec.id] = option.id

  emit('select-sku', {
    sku: option,
    skuIndex: optionIndex,
    parentSku: spec,
    parentIndex: specIndex,
    selectedSku: { ...selectedSku.value }
  })

  // 检查是否所有必选规格都已选择
  checkSkuComplete()
}

function updateSelectedSkuCombination() {
  if (!props.skuCombinations.length) return

  const selectedIds = Object.values(selectedSku.value)
  if (selectedIds.length === 0) {
    selectedSkuCombination.value = null
    return
  }

  // 查找匹配的SKU组合
  const combination = props.skuCombinations.find(item => {
    if (!item.skuIds || !Array.isArray(item.skuIds)) return false

    // 检查是否所有选中的规格都在这个组合中
    return selectedIds.every(id => item.skuIds.includes(id)) &&
      item.skuIds.length === selectedIds.length
  })

  selectedSkuCombination.value = combination || null
}

function updateSkuStatus() {
  if (!props.enableSkuLink || !props.skuCombinations.length) return

  const selectedIds = Object.values(selectedSku.value)

  skuList.value.forEach(spec => {
    spec.list.forEach(option => {
      if (option.active) return // 已选中的不处理

      // 模拟选择这个选项
      const testSelectedIds = [...selectedIds.filter(id => {
        // 排除同规格的其他选项
        return !spec.list.some(item => item.id === id)
      }), option.id]

      // 检查是否有可用的组合
      const hasValidCombination = props.skuCombinations.some(combination => {
        if (!combination.skuIds || !Array.isArray(combination.skuIds)) return false

        // 检查测试的选择是否是某个组合的子集，且该组合有库存
        return testSelectedIds.every(id => combination.skuIds.includes(id)) &&
          (combination.stock === undefined || combination.stock > 0)
      })

      option.disabled = !hasValidCombination
    })
  })
}

function checkSkuComplete() {
  const requiredSpecs = skuList.value.filter(spec => spec.required !== false)
  const selectedRequiredSpecs = requiredSpecs.filter(spec =>
    spec.list.some(option => option.active)
  )

  if (selectedRequiredSpecs.length === requiredSpecs.length) {
    emit('sku-complete', {
      selectedSku: { ...selectedSku.value },
      combination: selectedSkuCombination.value
    })
  }
}

function changeQuantity(delta) {
  const newQuantity = quantity.value + delta
  const min = Number(props.stepperMin)
  const max = Math.min(Number(props.stepperMax), currentStock.value)

  if (newQuantity < min) {
    emit('over-limit', { type: 'min', value: min })
    return
  }

  if (newQuantity > max) {
    emit('over-limit', { type: 'max', value: max })
    if (newQuantity > currentStock.value) {
      emit('stock-shortage', {
        requested: newQuantity,
        available: currentStock.value
      })
    }
    return
  }

  quantity.value = newQuantity

  if (delta > 0) {
    emit('add', quantity.value)
  } else {
    emit('reduce', quantity.value)
  }

  emit('change-stepper', quantity.value)
}

function onQuantityInput(e) {
  const value = parseInt(e.detail.value) || Number(props.stepperMin)
  const min = Number(props.stepperMin)
  const max = Math.min(Number(props.stepperMax), currentStock.value)

  if (value < min) {
    quantity.value = min
  } else if (value > max) {
    quantity.value = max
    if (value > currentStock.value) {
      emit('stock-shortage', {
        requested: value,
        available: currentStock.value
      })
    }
  } else {
    quantity.value = value
  }

  emit('change-stepper', quantity.value)
}

function onQuantityBlur() {
  const min = Number(props.stepperMin)
  const max = Math.min(Number(props.stepperMax), currentStock.value)

  if (quantity.value < min) {
    quantity.value = min
  } else if (quantity.value > max) {
    quantity.value = max
  }
}

function getBtnText(btn) {
  switch (btn) {
    case 'buy':
      return props.buyText
    case 'cart':
      return props.addCartText
    case 'confirm':
    default:
      return props.confirmText
  }
}

function onBtnClick(btn) {
  if (!canOperate.value) {
    // 可以在这里显示提示信息
    return
  }

  emit('click-btn-operate', {
    type: btn,
    value: quantity.value,
    selectedSku: { ...selectedSku.value },
    combination: selectedSkuCombination.value
  })
}

function onMaskClick() {
  if (props.maskClosable) {
    close()
  }
}

function close() {
  emit('update:show', false)
  emit('close')
}

// 暴露方法
defineExpose({
  close,
  getSelectedSku: () => ({ ...selectedSku.value }),
  getSelectedCombination: () => selectedSkuCombination.value,
  getCurrentPrice: () => currentPrice.value,
  getCurrentStock: () => currentStock.value,
  getQuantity: () => quantity.value
})
</script>

<style lang="scss" scoped>
.zx-goods-sku2-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: flex-end;
}

.zx-goods-sku2 {
  width: 100%;
  max-height: 80vh;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.zx-goods-sku2-header {
  position: relative;
  padding: 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.zx-goods-sku2-close {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f8f8f8;
  z-index: 1;
  transition: all 0.2s;
}

.zx-goods-sku2-close:active {
  background-color: #e8e8e8;
}

.zx-goods-sku2-close-icon {
  font-size: 36rpx;
  color: #666;
  line-height: 1;
}

.zx-goods-sku2-goods-info {
  display: flex;
  align-items: flex-start;
}

.zx-goods-sku2-goods-image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 16rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
  border: 1rpx solid #f0f0f0;
}

.zx-goods-sku2-goods-content {
  flex: 1;
  padding-right: 80rpx;
}

.zx-goods-sku2-goods-title {
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
  margin-bottom: 16rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.zx-goods-sku2-goods-price {
  display: flex;
  align-items: baseline;
  margin-bottom: 12rpx;
}

.zx-goods-sku2-price-symbol {
  font-size: 24rpx;
  color: #ff4757;
  font-weight: 500;
}

.zx-goods-sku2-price-value {
  font-size: 40rpx;
  color: #ff4757;
  font-weight: 600;
  margin-left: 4rpx;
}

.zx-goods-sku2-price-range {
  font-size: 28rpx;
  color: #999;
  margin-left: 8rpx;
}

.zx-goods-sku2-original-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 12rpx;
}

.zx-goods-sku2-selected-text {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.zx-goods-sku2-stock {
  font-size: 24rpx;
}

.zx-goods-sku2-stock-normal {
  color: #52c41a;
}

.zx-goods-sku2-stock-low {
  color: #faad14;
}

.zx-goods-sku2-stock-empty {
  color: #ff4d4f;
}

.zx-goods-sku2-content {
  flex: 1;
  overflow-y: auto;
}

.zx-goods-sku2-content-wrapper {
  padding: 0 32rpx 32rpx;
}

.zx-goods-sku2-spec {
  margin-bottom: 48rpx;
}

.zx-goods-sku2-spec-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
}

.zx-goods-sku2-spec-required {
  color: #ff4757;
  margin-left: 4rpx;
}

.zx-goods-sku2-spec-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.zx-goods-sku2-spec-item {
  position: relative;
  padding: 20rpx 24rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 12rpx;
  background-color: #fafafa;
  transition: all 0.3s;
  min-width: 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.zx-goods-sku2-spec-item-image {
  padding: 12rpx;
  min-width: 120rpx;
}

.zx-goods-sku2-spec-item-img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 8rpx;
  margin-bottom: 8rpx;
}

.zx-goods-sku2-spec-item-active {
  border-color: #007aff;
  background-color: #e6f3ff;
  transform: scale(1.02);
}

.zx-goods-sku2-spec-item-disabled {
  opacity: 0.4;
  background-color: #f5f5f5;
  position: relative;
}

.zx-goods-sku2-spec-item-disabled::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rpx;
  height: 80%;
  background-color: #ccc;
  transform: translate(-50%, -50%) rotate(45deg);
}

.zx-goods-sku2-spec-item-text {
  font-size: 26rpx;
  color: #333;
  text-align: center;
  line-height: 1.2;
}

.zx-goods-sku2-spec-item-active .zx-goods-sku2-spec-item-text {
  color: #007aff;
  font-weight: 500;
}

.zx-goods-sku2-spec-item-check {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  width: 32rpx;
  height: 32rpx;
  background-color: #007aff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-goods-sku2-spec-item-check-icon {
  font-size: 20rpx;
  color: #fff;
  line-height: 1;
}

.zx-goods-sku2-stepper {
  margin-bottom: 48rpx;
}

.zx-goods-sku2-stepper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.zx-goods-sku2-stepper-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
}

.zx-goods-sku2-stepper-extra {
  font-size: 24rpx;
  color: #999;
}

.zx-goods-sku2-stepper-content {
  display: flex;
  align-items: center;
}

.zx-goods-sku2-stepper-btn {
  width: 72rpx;
  height: 72rpx;
  border: 2rpx solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: all 0.2s;
}

.zx-goods-sku2-stepper-btn:first-child {
  border-radius: 12rpx 0 0 12rpx;
}

.zx-goods-sku2-stepper-btn:last-child {
  border-radius: 0 12rpx 12rpx 0;
}

.zx-goods-sku2-stepper-btn:active {
  background-color: #f0f0f0;
}

.zx-goods-sku2-stepper-btn-disabled {
  opacity: 0.4;
  background-color: #f8f8f8;
}

.zx-goods-sku2-stepper-btn-text {
  font-size: 36rpx;
  color: #333;
  line-height: 1;
  font-weight: 500;
}

.zx-goods-sku2-stepper-input {
  width: 120rpx;
  height: 72rpx;
  border: 2rpx solid #e8e8e8;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
}

.zx-goods-sku2-services {
  margin-bottom: 32rpx;
}

.zx-goods-sku2-services-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.zx-goods-sku2-services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.zx-goods-sku2-service-item {
  display: flex;
  align-items: center;
  padding: 12rpx 16rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  border: 1rpx solid #e9ecef;
}

.zx-goods-sku2-service-icon {
  font-size: 20rpx;
  color: #52c41a;
  margin-right: 8rpx;
}

.zx-goods-sku2-service-text {
  font-size: 24rpx;
  color: #666;
}

.zx-goods-sku2-operate {
  padding: 32rpx;
  border-top: 1rpx solid #f0f0f0;
  background-color: #fff;
}

.zx-goods-sku2-operate-extra {
  font-size: 24rpx;
  color: #666;
  text-align: center;
  margin-bottom: 24rpx;
}

.zx-goods-sku2-operate-btns {
  display: flex;
  gap: 24rpx;
}

.zx-goods-sku2-operate-btn {
  flex: 1;
  height: 96rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.zx-goods-sku2-operate-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.2s;
}

.zx-goods-sku2-operate-btn:active::before {
  background-color: rgba(255, 255, 255, 0.2);
}

.zx-goods-sku2-operate-btn-confirm {
  background: linear-gradient(135deg, #007aff 0%, #0056cc 100%);
}

.zx-goods-sku2-operate-btn-buy {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
}

.zx-goods-sku2-operate-btn-cart {
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
}

.zx-goods-sku2-operate-btn-disabled {
  opacity: 0.5;
  background: #ccc !important;
}

.zx-goods-sku2-operate-btn-text {
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
  position: relative;
  z-index: 1;
}
</style>