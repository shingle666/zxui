<template>
  <view class="container">
    <zx-navbar title="Address 地址选择" back></zx-navbar>
    
    <view class="demo-section">
      <zx-title title="基础用法" type="line"></zx-title>
      <zx-cell-group>
        <zx-cell title="选择自定义地址" :value="selectedAddress1" is-link @click="showAddress1">
          <template #icon>
            <zx-icon name="location-o" size="16" color="#1989fa"></zx-icon>
          </template>
        </zx-cell>
      </zx-cell-group>
    </view>

    <view class="demo-section">
      <zx-title title="选择已有地址" type="line"></zx-title>
      <zx-cell-group>
        <zx-cell title="选择已有地址" :value="selectedAddress2" is-link @click="showAddress2">
          <template #icon>
            <zx-icon name="location-o" size="16" color="#1989fa"></zx-icon>
          </template>
        </zx-cell>
      </zx-cell-group>
    </view>

    <view class="demo-section">
      <zx-title title="自定义图标" type="line"></zx-title>
      <zx-cell-group>
        <zx-cell title="自定义图标" :value="selectedAddress3" is-link @click="showAddress3">
          <template #icon>
            <zx-icon name="location-o" size="16" color="#1989fa"></zx-icon>
          </template>
        </zx-cell>
      </zx-cell-group>
    </view>

    <view class="demo-section">
      <zx-title title="自定义地址与已有地址切换" type="line"></zx-title>
      <zx-cell-group>
        <zx-cell title="地址切换" :value="selectedAddress4" is-link @click="showAddress4">
          <template #icon>
            <zx-icon name="location-o" size="16" color="#1989fa"></zx-icon>
          </template>
        </zx-cell>
      </zx-cell-group>
    </view>

    <!-- 基础用法 -->
    <zx-address
      v-model="showPopup1"
      :province="province"
      :city="city"
      :country="country"
      :town="town"
      custom-address-title="请选择所在地区"
      type="custom"
      @change="onChange1"
      @close="onClose1"
    />

    <!-- 选择已有地址 -->
    <zx-address
      v-model="showPopup2"
      type="exist"
      :exist-address="existAddress"
      exist-address-title="配送至"
      :is-show-custom-address="false"
      @selected="onSelected2"
      @close="onClose2"
    />

    <!-- 自定义图标 -->
    <zx-address
      v-model="showPopup3"
      type="exist"
      :exist-address="existAddress"
      :default-icon="defaultIcon"
      :selected-icon="selectedIcon"
      @selected="onSelected3"
      @close="onClose3"
    />

    <!-- 自定义地址与已有地址切换 -->
    <zx-address
      v-model="showPopup4"
      type="all"
      :province="province"
      :city="city"
      :country="country"
      :town="town"
      :exist-address="existAddress"
      :show-tabs="true"
      @change="onChange4"
      @selected="onSelected4"
      @close="onClose4"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ZxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import ZxTitle from '@tanzhenxing/zx-title/zx-title.vue'
import ZxCellGroup from '@tanzhenxing/zx-cell-group/zx-cell-group.vue'
import ZxCell from '@tanzhenxing/zx-cell/zx-cell.vue'
import ZxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import ZxAddress from '@tanzhenxing/zx-address/zx-address.vue'

// 弹窗显示状态
const showPopup1 = ref(false)
const showPopup2 = ref(false)
const showPopup3 = ref(false)
const showPopup4 = ref(false)

// 选中的地址显示文本
const selectedAddress1 = ref('请选择地址')
const selectedAddress2 = ref('请选择地址')
const selectedAddress3 = ref('请选择地址')
const selectedAddress4 = ref('请选择地址')

// 省市区数据
const province = ref([
  { id: 1, name: '北京' },
  { id: 2, name: '广西' },
  { id: 3, name: '江西' },
  { id: 4, name: '四川' },
  { id: 5, name: '广东' },
  { id: 6, name: '浙江' }
])

const city = ref([
  { id: 7, name: '朝阳区' },
  { id: 8, name: '崇文区' },
  { id: 9, name: '昌平区' },
  { id: 6, name: '石景山区' },
  { id: 10, name: '海淀区' },
  { id: 11, name: '丰台区' }
])

const country = ref([
  { id: 3, name: '八里庄街道' },
  { id: 9, name: '北苑' },
  { id: 4, name: '常营乡' },
  { id: 12, name: '望京街道' },
  { id: 13, name: '三里屯街道' }
])

const town = ref([
  { id: 14, name: '八里庄社区' },
  { id: 15, name: '红庙社区' },
  { id: 16, name: '甜水园社区' }
])

// 已有地址数据
const existAddress = ref([
  {
    id: 1,
    name: '张三',
    tel: '13800138000',
    addressDetail: 'xx小区xx号楼xx单元xx室',
    cityName: '石景山区',
    countyName: '城区',
    provinceName: '北京',
    townName: '',
    selectedAddress: true
  },
  {
    id: 2,
    name: '李四',
    tel: '13900139000',
    addressDetail: 'yy大厦yy层yy室',
    cityName: '朝阳区',
    countyName: '建外街道',
    provinceName: '北京',
    townName: '',
    selectedAddress: false
  },
  {
    id: 3,
    name: '王五',
    tel: '13700137000',
    addressDetail: 'zz商场zz层zz号',
    cityName: '海淀区',
    countyName: '中关村街道',
    provinceName: '北京',
    townName: '',
    selectedAddress: false
  },
  {
    id: 4,
    name: '赵六',
    tel: '13600136000',
    addressDetail: 'aa写字楼aa层aa室',
    cityName: '丰台区',
    countyName: '丰台街道',
    provinceName: '北京',
    townName: '',
    selectedAddress: false
  }
])

// 自定义图标
const defaultIcon = ref('circle')
const selectedIcon = ref('success')

// 方法
const showAddress1 = () => {
  showPopup1.value = true
}

const showAddress2 = () => {
  showPopup2.value = true
}

const showAddress3 = () => {
  showPopup3.value = true
}

const showAddress4 = () => {
  showPopup4.value = true
}

// 基础用法事件处理
const onChange1 = (data) => {
  console.log('地址改变1:', data)
  // 模拟根据选择的层级动态加载下一级数据
  if (data.next === 'city') {
    // 这里可以根据选中的省份加载对应的城市数据
    console.log('需要加载城市数据')
  } else if (data.next === 'country') {
    // 这里可以根据选中的城市加载对应的区县数据
    console.log('需要加载区县数据')
  } else if (data.next === 'town') {
    // 这里可以根据选中的区县加载对应的乡镇数据
    console.log('需要加载乡镇数据')
  } else if (data.next === '') {
    // 选择完成
    console.log('选择完成')
    showPopup1.value = false
  }
}

const onClose1 = (data) => {
  console.log('关闭弹窗1:', data)
  if (data.type === 'custom' && data.data && data.data.addressStr) {
    selectedAddress1.value = data.data.addressStr
  }
}

// 选择已有地址事件处理
const onSelected2 = (item, index, list) => {
  console.log('选中地址2:', item, index, list)
  selectedAddress2.value = `${item.provinceName}${item.cityName}${item.countyName}${item.townName}${item.addressDetail}`
}

const onClose2 = (data) => {
  console.log('关闭弹窗2:', data)
}

// 自定义图标事件处理
const onSelected3 = (item, index, list) => {
  console.log('选中地址3:', item, index, list)
  selectedAddress3.value = `${item.provinceName}${item.cityName}${item.countyName}${item.townName}${item.addressDetail}`
}

const onClose3 = (data) => {
  console.log('关闭弹窗3:', data)
}

// 地址切换事件处理
const onChange4 = (data) => {
  console.log('地址改变4:', data)
  if (data.next === '') {
    showPopup4.value = false
  }
}

const onSelected4 = (item, index, list) => {
  console.log('选中地址4:', item, index, list)
  selectedAddress4.value = `${item.provinceName}${item.cityName}${item.countyName}${item.townName}${item.addressDetail}`
}

const onClose4 = (data) => {
  console.log('关闭弹窗4:', data)
  if (data.type === 'custom' && data.data && data.data.addressStr) {
    selectedAddress4.value = data.data.addressStr
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f7f8fa;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 32rpx;
  
  &:first-child {
    margin-top: 32rpx;
  }
}

:deep(.zx-cell__value) {
  color: #969799;
  font-size: 28rpx;
}

:deep(.zx-cell__title) {
  font-size: 28rpx;
}
</style>