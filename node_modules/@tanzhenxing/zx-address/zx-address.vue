<template>
  <zx-popup
    v-model="showPopup"
    position="bottom"
    :safe-area-inset-bottom="true"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="onClose"
  >
    <view class="zx-address">
      <!-- 头部 -->
      <view class="zx-address__header">
        <view class="zx-address__title">{{ title }}</view>
        <view class="zx-address__close" @click="onClose">
          <zx-icon name="close" size="18" color="#969799"></zx-icon>
        </view>
      </view>

      <!-- 标签栏 -->
      <view v-if="showTabs" class="zx-address__tabs">
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="zx-address__tab"
          :class="{ 'zx-address__tab--active': activeTab === index }"
          @click="onTabClick(index)"
        >
          {{ tab.title }}
        </view>
      </view>

      <!-- 内容区域 -->
      <view class="zx-address__content">
        <!-- 自定义地址选择 -->
        <view v-if="activeTab === 0" class="zx-address__custom">
          <view class="zx-address__custom-title">{{ customAddressTitle }}</view>
          <view class="zx-address__picker">
            <zx-picker-view
              :value="pickerValue"
              :columns="pickerColumns"
              @change="onPickerChange"
              @confirm="onPickerConfirm"
            />
          </view>
        </view>

        <!-- 已有地址列表 -->
        <view v-if="activeTab === 1" class="zx-address__exist">
          <view class="zx-address__exist-title">{{ existAddressTitle }}</view>
          <scroll-view class="zx-address__exist-list" scroll-y>
            <view 
              v-for="(item, index) in existAddress"
              :key="item.id"
              class="zx-address__exist-item"
              :class="{ 'zx-address__exist-item--selected': item.selectedAddress }"
              @click="onSelectExistAddress(item, index)"
            >
              <view class="zx-address__exist-item-icon">
                <zx-icon 
                  :name="item.selectedAddress ? 'success' : 'circle'"
                  :color="item.selectedAddress ? '#1989fa' : '#c8c9cc'"
                  size="16"
                ></zx-icon>
              </view>
              <view class="zx-address__exist-item-content">
                <view class="zx-address__exist-item-info">
                  <text class="zx-address__exist-item-name">{{ item.name }}</text>
                  <text class="zx-address__exist-item-tel">{{ item.tel }}</text>
                </view>
                <view class="zx-address__exist-item-address">
                  {{ item.provinceName }}{{ item.cityName }}{{ item.countyName }}{{ item.townName }}{{ item.addressDetail }}
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </zx-popup>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  // 控制弹窗显示
  modelValue: {
    type: Boolean,
    default: false
  },
  // 弹窗标题
  title: {
    type: String,
    default: '选择地址'
  },
  // 是否显示标签栏
  showTabs: {
    type: Boolean,
    default: true
  },
  // 自定义地址标题
  customAddressTitle: {
    type: String,
    default: '请选择所在地区'
  },
  // 已有地址标题
  existAddressTitle: {
    type: String,
    default: '配送至'
  },
  // 省份数据
  province: {
    type: Array,
    default: () => []
  },
  // 城市数据
  city: {
    type: Array,
    default: () => []
  },
  // 区县数据
  country: {
    type: Array,
    default: () => []
  },
  // 乡镇数据
  town: {
    type: Array,
    default: () => []
  },
  // 已有地址列表
  existAddress: {
    type: Array,
    default: () => []
  },
  // 是否显示自定义地址
  isShowCustomAddress: {
    type: Boolean,
    default: true
  },
  // 点击遮罩是否关闭
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  // 默认选中的图标
  defaultIcon: {
    type: String,
    default: ''
  },
  // 选中状态的图标
  selectedIcon: {
    type: String,
    default: ''
  },
  // 组件类型：exist-只显示已有地址，custom-只显示自定义地址
  type: {
    type: String,
    default: 'all' // all, exist, custom
  }
})

const emit = defineEmits([
  'update:modelValue',
  'change',
  'close',
  'selected'
])

// 响应式数据
const showPopup = ref(false)
const activeTab = ref(0)
const pickerValue = ref([0, 0, 0, 0])
const currentLevel = ref(0) // 当前选择的层级
const selectedData = ref({
  province: null,
  city: null,
  country: null,
  town: null
})

// 计算属性
const tabs = computed(() => {
  const tabList = []
  if (props.isShowCustomAddress && (props.type === 'all' || props.type === 'custom')) {
    tabList.push({ title: '自定义地址', type: 'custom' })
  }
  if (props.type === 'all' || props.type === 'exist') {
    tabList.push({ title: '已有地址', type: 'exist' })
  }
  return tabList
})

const pickerColumns = computed(() => {
  const columns = []
  
  // 省份列
  if (props.province.length > 0) {
    columns.push(props.province.map(item => ({ text: item.name, value: item.id })))
  }
  
  // 城市列
  if (props.city.length > 0) {
    columns.push(props.city.map(item => ({ text: item.name, value: item.id })))
  }
  
  // 区县列
  if (props.country.length > 0) {
    columns.push(props.country.map(item => ({ text: item.name, value: item.id })))
  }
  
  // 乡镇列
  if (props.town.length > 0) {
    columns.push(props.town.map(item => ({ text: item.name, value: item.id })))
  }
  
  return columns
})

// 监听器
watch(() => props.modelValue, (val) => {
  showPopup.value = val
  if (val) {
    // 初始化标签页
    if (props.type === 'exist') {
      activeTab.value = tabs.value.findIndex(tab => tab.type === 'exist')
    } else {
      activeTab.value = 0
    }
  }
})

watch(showPopup, (val) => {
  emit('update:modelValue', val)
})

// 方法
const onClose = () => {
  showPopup.value = false
  
  // 发送关闭事件
  const closeData = {
    type: activeTab.value === 0 ? 'custom' : 'exist',
    data: activeTab.value === 0 ? {
      addressStr: getAddressString(),
      ...selectedData.value
    } : null
  }
  
  emit('close', closeData)
}

const onTabClick = (index) => {
  activeTab.value = index
}

const onPickerChange = (values, index) => {
  pickerValue.value = values
  currentLevel.value = index
  
  // 更新选中的数据
  const columns = pickerColumns.value
  if (columns[0] && values[0] !== undefined) {
    selectedData.value.province = props.province[values[0]]
  }
  if (columns[1] && values[1] !== undefined) {
    selectedData.value.city = props.city[values[1]]
  }
  if (columns[2] && values[2] !== undefined) {
    selectedData.value.country = props.country[values[2]]
  }
  if (columns[3] && values[3] !== undefined) {
    selectedData.value.town = props.town[values[3]]
  }
  
  // 发送change事件
  const nextLevel = getNextLevel(index)
  emit('change', {
    next: nextLevel,
    value: values,
    selectedData: selectedData.value
  })
}

const onPickerConfirm = () => {
  // 确认选择
  onClose()
}

const onSelectExistAddress = (item, index) => {
  // 更新选中状态
  props.existAddress.forEach((addr, i) => {
    addr.selectedAddress = i === index
  })
  
  // 发送选中事件
  emit('selected', item, index, props.existAddress)
  
  // 关闭弹窗
  nextTick(() => {
    onClose()
  })
}

const getNextLevel = (currentIndex) => {
  const levelMap = ['city', 'country', 'town', '']
  return levelMap[currentIndex] || ''
}

const getAddressString = () => {
  const parts = []
  if (selectedData.value.province) parts.push(selectedData.value.province.name)
  if (selectedData.value.city) parts.push(selectedData.value.city.name)
  if (selectedData.value.country) parts.push(selectedData.value.country.name)
  if (selectedData.value.town) parts.push(selectedData.value.town.name)
  return parts.join('')
}
</script>

<style lang="scss" scoped>
.zx-address {
  background: #fff;
  border-radius: 16rpx 16rpx 0 0;
  max-height: 80vh;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx 32rpx 16rpx;
    border-bottom: 1rpx solid #ebedf0;
  }

  &__title {
    font-size: 32rpx;
    font-weight: 500;
    color: #323233;
  }

  &__close {
    padding: 8rpx;
  }

  &__tabs {
    display: flex;
    border-bottom: 1rpx solid #ebedf0;
  }

  &__tab {
    flex: 1;
    padding: 24rpx 32rpx;
    text-align: center;
    font-size: 28rpx;
    color: #646566;
    position: relative;

    &--active {
      color: #1989fa;
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background: #1989fa;
        border-radius: 2rpx;
      }
    }
  }

  &__content {
    flex: 1;
    overflow: hidden;
  }

  &__custom {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__custom-title {
    padding: 32rpx;
    font-size: 28rpx;
    color: #646566;
    border-bottom: 1rpx solid #ebedf0;
  }

  &__picker {
    flex: 1;
  }

  &__exist {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__exist-title {
    padding: 32rpx;
    font-size: 28rpx;
    color: #646566;
    border-bottom: 1rpx solid #ebedf0;
  }

  &__exist-list {
    flex: 1;
    max-height: 600rpx;
  }

  &__exist-item {
    display: flex;
    align-items: flex-start;
    padding: 32rpx;
    border-bottom: 1rpx solid #ebedf0;

    &--selected {
      background: #f7f8fa;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__exist-item-icon {
    margin-right: 24rpx;
    margin-top: 4rpx;
  }

  &__exist-item-content {
    flex: 1;
  }

  &__exist-item-info {
    display: flex;
    align-items: center;
    margin-bottom: 8rpx;
  }

  &__exist-item-name {
    font-size: 28rpx;
    color: #323233;
    font-weight: 500;
    margin-right: 16rpx;
  }

  &__exist-item-tel {
    font-size: 28rpx;
    color: #646566;
  }

  &__exist-item-address {
    font-size: 26rpx;
    color: #969799;
    line-height: 1.4;
  }
}
</style>