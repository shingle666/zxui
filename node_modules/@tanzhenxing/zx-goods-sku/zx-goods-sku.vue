<template>
  <view v-if="show" class="zx-goods-sku-mask" @click="onMaskClick">
    <view class="zx-goods-sku" :class="customClass" :style="customStyle" @click.stop>
      <!-- 商品信息头部 -->
      <view class="zx-goods-sku-header">
        <view class="zx-goods-sku-close" @click="close">
          <zx-icon class="zx-goods-sku-close-icon">×</zx-icon>
        </view>
        <view class="zx-goods-sku-goods-info">
          <image v-if="goods.image" :src="goods.image" class="zx-goods-sku-goods-image" mode="aspectFill" />
          <view class="zx-goods-sku-goods-content">
            <view class="zx-goods-sku-goods-price">
              <text class="zx-goods-sku-price-symbol">¥</text>
              <text class="zx-goods-sku-price-value">{{ currentPrice }}</text>
            </view>
            <view v-if="goods.originalPrice" class="zx-goods-sku-original-price">
              ¥{{ goods.originalPrice }}
            </view>
            <view v-if="selectedSkuText" class="zx-goods-sku-selected-text">
              已选：{{ selectedSkuText }}
            </view>
            <view v-if="goods.stock !== undefined" class="zx-goods-sku-stock">
              库存：{{ currentStock }}件
            </view>
          </view>
        </view>
      </view>

      <!-- 规格选择区域 -->
      <scroll-view scroll-y class="zx-goods-sku-content">
        <view class="zx-goods-sku-content-wrapper">
          <!-- 自定义插槽：规格选择区域上方 -->
          <slot name="sku-select-top" />

          <!-- 规格选择 -->
          <view v-for="(spec, specIndex) in skuList" :key="spec.id" class="zx-goods-sku-spec">
            <view class="zx-goods-sku-spec-title">{{ spec.name }}</view>
            <view class="zx-goods-sku-spec-list">
              <view v-for="(option, optionIndex) in spec.list" :key="option.id" class="zx-goods-sku-spec-item" :class="{
                'zx-goods-sku-spec-item-active': option.active,
                'zx-goods-sku-spec-item-disabled': option.disabled
              }" @click="selectSku(specIndex, optionIndex)">
                <text class="zx-goods-sku-spec-item-text">{{ option.name }}</text>
              </view>
            </view>
          </view>

          <!-- 数量选择 -->
          <view class="zx-goods-sku-stepper">
            <view class="zx-goods-sku-stepper-title">{{ stepperTitle }}</view>
            <view class="zx-goods-sku-stepper-content">
              <view class="zx-goods-sku-stepper-btn"
                :class="{ 'zx-goods-sku-stepper-btn-disabled': quantity <= stepperMin }" @click="changeQuantity(-1)">
                <text class="zx-goods-sku-stepper-btn-text">-</text>
              </view>
              <input v-model.number="quantity" class="zx-goods-sku-stepper-input" type="number" :min="stepperMin"
                :max="stepperMax" @input="onQuantityInput" @blur="onQuantityBlur" />
              <view class="zx-goods-sku-stepper-btn"
                :class="{ 'zx-goods-sku-stepper-btn-disabled': quantity >= stepperMax }" @click="changeQuantity(1)">
                <text class="zx-goods-sku-stepper-btn-text">+</text>
              </view>
            </view>
            <view v-if="stepperExtraText" class="zx-goods-sku-stepper-extra">
              {{ typeof stepperExtraText === 'function' ? stepperExtraText(quantity) : stepperExtraText }}
            </view>
          </view>

          <!-- 自定义插槽：数量选择区域下方 -->
          <slot name="sku-stepper-bottom" />
        </view>
      </scroll-view>

      <!-- 底部操作按钮 -->
      <view class="zx-goods-sku-operate">
        <view v-if="btnExtraText" class="zx-goods-sku-operate-extra">
          {{ btnExtraText }}
        </view>
        <view class="zx-goods-sku-operate-btns">
          <view v-for="btn in btnOptions" :key="btn" class="zx-goods-sku-operate-btn"
            :class="`zx-goods-sku-operate-btn-${btn}`" @click="onBtnClick(btn)">
            <text class="zx-goods-sku-operate-btn-text">
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
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

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
  'over-limit'
])

// 响应式数据
const skuList = ref([])
const quantity = ref(1)
const selectedSku = ref({})

// 计算属性
const currentPrice = computed(() => {
  // 根据选中的 SKU 计算当前价格
  const selected = getCurrentSelectedSku()
  return selected?.price || props.goods.price || '0.00'
})

const currentStock = computed(() => {
  // 根据选中的 SKU 计算当前库存
  const selected = getCurrentSelectedSku()
  return selected?.stock !== undefined ? selected.stock : props.goods.stock || 0
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

// 监听器
watch(() => props.sku, (newSku) => {
  initSkuList(newSku)
}, { immediate: true, deep: true })

watch(() => props.stepperMin, (newMin) => {
  if (quantity.value < Number(newMin)) {
    quantity.value = Number(newMin)
  }
}, { immediate: true })

// 方法
function initSkuList(sku) {
  skuList.value = JSON.parse(JSON.stringify(sku || []))
  quantity.value = Number(props.stepperMin)
  selectedSku.value = {}
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

  // 更新其他规格的可选状态
  updateSkuStatus()

  emit('select-sku', {
    sku: option,
    skuIndex: optionIndex,
    parentSku: spec,
    parentIndex: specIndex,
    selectedSku: { ...selectedSku.value }
  })
}

function updateSkuStatus() {
  // 这里可以根据业务需求实现 SKU 联动逻辑
  // 例如：某些规格组合不可选时，禁用相应选项
}

function getCurrentSelectedSku() {
  // 根据当前选中的规格组合，返回对应的 SKU 信息
  // 这里需要根据实际的数据结构来实现
  return null
}

function changeQuantity(delta) {
  const newQuantity = quantity.value + delta
  const min = Number(props.stepperMin)
  const max = Number(props.stepperMax)

  if (newQuantity < min) {
    emit('over-limit', { type: 'min', value: min })
    return
  }

  if (newQuantity > max) {
    emit('over-limit', { type: 'max', value: max })
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
  const max = Number(props.stepperMax)

  if (value < min) {
    quantity.value = min
  } else if (value > max) {
    quantity.value = max
  } else {
    quantity.value = value
  }

  emit('change-stepper', quantity.value)
}

function onQuantityBlur() {
  const min = Number(props.stepperMin)
  const max = Number(props.stepperMax)

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
  emit('click-btn-operate', {
    type: btn,
    value: quantity.value,
    selectedSku: { ...selectedSku.value }
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
  close
})
</script>

<style lang="scss" scoped>
.zx-goods-sku-mask {
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

.zx-goods-sku {
  width: 100%;
  max-height: 75vh;
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.zx-goods-sku-header {
  position: relative;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.zx-goods-sku-close {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.zx-goods-sku-close-icon {
  font-size: 40rpx;
  color: #999;
  line-height: 1;
}

.zx-goods-sku-goods-info {
  display: flex;
  align-items: flex-start;
}

.zx-goods-sku-goods-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.zx-goods-sku-goods-content {
  flex: 1;
  padding-right: 60rpx;
}

.zx-goods-sku-goods-price {
  display: flex;
  align-items: baseline;
  margin-bottom: 12rpx;
}

.zx-goods-sku-price-symbol {
  font-size: 24rpx;
  color: #ff4757;
  font-weight: 500;
}

.zx-goods-sku-price-value {
  font-size: 36rpx;
  color: #ff4757;
  font-weight: 600;
  margin-left: 4rpx;
}

.zx-goods-sku-original-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 12rpx;
}

.zx-goods-sku-selected-text {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.zx-goods-sku-stock {
  font-size: 24rpx;
  color: #999;
}

.zx-goods-sku-content {
  flex: 1;
  overflow-y: auto;
}

.zx-goods-sku-content-wrapper {
  padding: 0 30rpx;
}

.zx-goods-sku-spec {
  margin-bottom: 40rpx;
}

.zx-goods-sku-spec-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 24rpx;
}

.zx-goods-sku-spec-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.zx-goods-sku-spec-item {
  padding: 16rpx 24rpx;
  border: 2rpx solid #e5e5e5;
  border-radius: 8rpx;
  background-color: #f8f8f8;
  transition: all 0.2s;
}

.zx-goods-sku-spec-item-active {
  border-color: #007aff;
  background-color: #e6f3ff;
}

.zx-goods-sku-spec-item-disabled {
  opacity: 0.5;
  background-color: #f5f5f5;
}

.zx-goods-sku-spec-item-text {
  font-size: 26rpx;
  color: #333;
}

.zx-goods-sku-spec-item-active .zx-goods-sku-spec-item-text {
  color: #007aff;
}

.zx-goods-sku-stepper {
  margin-bottom: 40rpx;
}

.zx-goods-sku-stepper-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 24rpx;
}

.zx-goods-sku-stepper-content {
  display: flex;
  align-items: center;
}

.zx-goods-sku-stepper-btn {
  width: 60rpx;
  height: 60rpx;
  border: 2rpx solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: all 0.2s;
}

.zx-goods-sku-stepper-btn:first-child {
  border-radius: 8rpx 0 0 8rpx;
}

.zx-goods-sku-stepper-btn:last-child {
  border-radius: 0 8rpx 8rpx 0;
}

.zx-goods-sku-stepper-btn-disabled {
  opacity: 0.5;
  background-color: #f5f5f5;
}

.zx-goods-sku-stepper-btn-text {
  font-size: 32rpx;
  color: #333;
  line-height: 1;
}

.zx-goods-sku-stepper-input {
  width: 100rpx;
  height: 60rpx;
  border: 2rpx solid #e5e5e5;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
}

.zx-goods-sku-stepper-extra {
  font-size: 24rpx;
  color: #999;
  margin-top: 12rpx;
}

.zx-goods-sku-operate {
  padding: 30rpx;
  border-top: 1rpx solid #f5f5f5;
  background-color: #fff;
}

.zx-goods-sku-operate-extra {
  font-size: 24rpx;
  color: #666;
  text-align: center;
  margin-bottom: 20rpx;
}

.zx-goods-sku-operate-btns {
  display: flex;
  gap: 20rpx;
}

.zx-goods-sku-operate-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.zx-goods-sku-operate-btn-confirm {
  background: linear-gradient(135deg, #007aff 0%, #0056cc 100%);
}

.zx-goods-sku-operate-btn-buy {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
}

.zx-goods-sku-operate-btn-cart {
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
}

.zx-goods-sku-operate-btn-text {
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
}
</style>