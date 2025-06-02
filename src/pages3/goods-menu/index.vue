<template>
  <view class="container">
    <zx-navbar title="商品菜单" back></zx-navbar>
    
    <view class="page-section">
      <view class="page-section-title">基础用法</view>
      <zx-goods-menu 
        v-model="basicMenu" 
        @change="handleBasicChange"
        @toggle="handleToggle"
      ></zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(basicMenu) }}</text>
      </view>
    </view>

    <view class="page-section">
      <view class="page-section-title">自定义菜单内容</view>
      <zx-goods-menu 
        v-model="customMenu" 
        @change="handleCustomChange"
      >
        <template #content="{ item, options }">
          <view class="custom-content">
            <view class="custom-header">
              <text class="custom-title">{{ item.title }}</text>
              <text class="custom-desc">请选择{{ item.title }}</text>
            </view>
            <view class="custom-options">
              <view 
                v-for="(option, index) in options" 
                :key="index"
                class="custom-option"
                :class="{ 'custom-option--active': option.value === item.value }"
                @click="selectCustomOption(item, option)"
              >
                <image v-if="option.image" :src="option.image" class="custom-option-image"></image>
                <view class="custom-option-info">
                  <text class="custom-option-name">{{ option.text }}</text>
                  <text v-if="option.desc" class="custom-option-desc">{{ option.desc }}</text>
                </view>
                <text 
                  v-if="option.value === item.value" 
                  class="custom-option-check"
                >✓</text>
              </view>
            </view>
          </view>
        </template>
      </zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(customMenu) }}</text>
      </view>
    </view>

    <view class="page-section">
      <view class="page-section-title">一行两列</view>
      <zx-goods-menu 
        v-model="twoColsMenu" 
        :cols="2"
        @change="handleTwoColsChange"
      ></zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(twoColsMenu) }}</text>
      </view>
    </view>

    <view class="page-section">
      <view class="page-section-title">自定义选中态颜色</view>
      <zx-goods-menu 
        v-model="colorMenu" 
        active-color="#07c160"
        @change="handleColorChange"
      ></zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(colorMenu) }}</text>
      </view>
    </view>

    <view class="page-section">
      <view class="page-section-title">自定义图标</view>
      <zx-goods-menu 
        v-model="iconMenu" 
        @change="handleIconChange"
      >
        <template #icon="{ item, index }">
          <text class="custom-icon" :class="item.icon"></text>
        </template>
      </zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(iconMenu) }}</text>
      </view>
    </view>

    <view class="page-section">
      <view class="page-section-title">向上展开</view>
      <view style="height: 200px;"></view>
      <zx-goods-menu 
        v-model="upMenu" 
        direction="up"
        @change="handleUpChange"
      ></zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(upMenu) }}</text>
      </view>
    </view>

    <view class="page-section">
      <view class="page-section-title">禁用菜单</view>
      <zx-goods-menu 
        v-model="disabledMenu" 
        @change="handleDisabledChange"
      ></zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(disabledMenu) }}</text>
      </view>
    </view>

    <view class="page-section">
      <view class="page-section-title">手动控制</view>
      <view class="control-buttons">
        <button @click="openMenu" type="primary" size="mini">打开菜单</button>
        <button @click="closeMenu" type="default" size="mini">关闭菜单</button>
        <button @click="toggleMenu" type="warn" size="mini">切换菜单</button>
      </view>
      <zx-goods-menu 
        ref="controlMenuRef"
        v-model="controlMenu" 
        @change="handleControlChange"
      ></zx-goods-menu>
      <view class="demo-content">
        <text>当前选择：{{ getSelectedText(controlMenu) }}</text>
      </view>
    </view>

    <view style="height: 100px;"></view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 基础用法
const basicMenu = ref([
  {
    title: '全部商品',
    value: '',
    options: [
      { text: '全部商品', value: '' },
      { text: '新款商品', value: 'new' },
      { text: '活动商品', value: 'activity' }
    ]
  },
  {
    title: '销量',
    value: '',
    options: [
      { text: '默认', value: '' },
      { text: '销量从高到低', value: 'desc' },
      { text: '销量从低到高', value: 'asc' }
    ]
  },
  {
    title: '价格',
    value: '',
    options: [
      { text: '默认', value: '' },
      { text: '价格从高到低', value: 'desc' },
      { text: '价格从低到高', value: 'asc' }
    ]
  }
])

// 自定义内容
const customMenu = ref([
  {
    title: '品牌',
    value: '',
    options: [
      { 
        text: '全部品牌', 
        value: '',
        image: '/static/images/brand-all.png',
        desc: '不限品牌'
      },
      { 
        text: 'Apple', 
        value: 'apple',
        image: '/static/images/brand-apple.png',
        desc: '苹果官方'
      },
      { 
        text: 'Samsung', 
        value: 'samsung',
        image: '/static/images/brand-samsung.png',
        desc: '三星电子'
      },
      { 
        text: 'Huawei', 
        value: 'huawei',
        image: '/static/images/brand-huawei.png',
        desc: '华为技术'
      }
    ]
  },
  {
    title: '分类',
    value: '',
    options: [
      { text: '全部分类', value: '', desc: '所有商品' },
      { text: '手机数码', value: 'phone', desc: '手机及配件' },
      { text: '电脑办公', value: 'computer', desc: '电脑及周边' },
      { text: '家用电器', value: 'appliance', desc: '大小家电' }
    ]
  }
])

// 一行两列
const twoColsMenu = ref([
  {
    title: '分类',
    value: '',
    options: [
      { text: '全部', value: '' },
      { text: '手机', value: 'phone' },
      { text: '电脑', value: 'computer' },
      { text: '平板', value: 'tablet' },
      { text: '耳机', value: 'headphone' },
      { text: '音响', value: 'speaker' }
    ]
  },
  {
    title: '价格',
    value: '',
    options: [
      { text: '全部', value: '' },
      { text: '0-100', value: '0-100' },
      { text: '100-500', value: '100-500' },
      { text: '500-1000', value: '500-1000' },
      { text: '1000-5000', value: '1000-5000' },
      { text: '5000以上', value: '5000+' }
    ]
  }
])

// 自定义颜色
const colorMenu = ref([
  {
    title: '排序',
    value: '',
    options: [
      { text: '默认排序', value: '' },
      { text: '价格升序', value: 'price_asc' },
      { text: '价格降序', value: 'price_desc' },
      { text: '销量排序', value: 'sales' },
      { text: '评价排序', value: 'rating' }
    ]
  }
])

// 自定义图标
const iconMenu = ref([
  {
    title: '分类',
    value: '',
    icon: 'uni-icons-list',
    options: [
      { text: '全部分类', value: '' },
      { text: '数码产品', value: 'digital' },
      { text: '服装鞋帽', value: 'clothing' },
      { text: '家居用品', value: 'home' }
    ]
  },
  {
    title: '筛选',
    value: '',
    icon: 'uni-icons-gear',
    options: [
      { text: '默认', value: '' },
      { text: '有库存', value: 'in_stock' },
      { text: '包邮', value: 'free_shipping' },
      { text: '新品', value: 'new' }
    ]
  }
])

// 向上展开
const upMenu = ref([
  {
    title: '地区',
    value: '',
    options: [
      { text: '全部地区', value: '' },
      { text: '北京', value: 'beijing' },
      { text: '上海', value: 'shanghai' },
      { text: '广州', value: 'guangzhou' },
      { text: '深圳', value: 'shenzhen' }
    ]
  }
])

// 禁用菜单
const disabledMenu = ref([
  {
    title: '可用菜单',
    value: '',
    options: [
      { text: '选项1', value: 'option1' },
      { text: '选项2', value: 'option2' }
    ]
  },
  {
    title: '禁用菜单',
    value: '',
    disabled: true,
    options: [
      { text: '选项1', value: 'option1' },
      { text: '选项2', value: 'option2' }
    ]
  }
])

// 手动控制
const controlMenu = ref([
  {
    title: '控制菜单',
    value: '',
    options: [
      { text: '选项1', value: 'option1' },
      { text: '选项2', value: 'option2' },
      { text: '选项3', value: 'option3' }
    ]
  }
])

const controlMenuRef = ref()

// 方法
const getSelectedText = (menu) => {
  const selected = []
  menu.forEach(item => {
    if (item.value) {
      const option = item.options.find(opt => opt.value === item.value)
      if (option) {
        selected.push(`${item.title}: ${option.text}`)
      }
    }
  })
  return selected.length > 0 ? selected.join(', ') : '暂无选择'
}

const selectCustomOption = (item, option) => {
  item.value = option.value
  // 手动触发更新
  customMenu.value = [...customMenu.value]
}

const openMenu = () => {
  controlMenuRef.value?.toggle(true)
}

const closeMenu = () => {
  controlMenuRef.value?.toggle(false)
}

const toggleMenu = () => {
  controlMenuRef.value?.toggle()
}

// 事件处理
const handleBasicChange = (data) => {
  console.log('基础菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleCustomChange = (data) => {
  console.log('自定义菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleTwoColsChange = (data) => {
  console.log('两列菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleColorChange = (data) => {
  console.log('颜色菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleIconChange = (data) => {
  console.log('图标菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleUpChange = (data) => {
  console.log('向上菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleDisabledChange = (data) => {
  console.log('禁用菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleControlChange = (data) => {
  console.log('控制菜单变化:', data)
  uni.showToast({
    title: `选择了: ${data.option.text}`,
    icon: 'none'
  })
}

const handleToggle = (show) => {
  console.log('菜单切换:', show)
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f7f8fa;
  min-height: 100vh;
}

.page-section {
  margin-bottom: 20px;
  background-color: #fff;
  
  &-title {
    padding: 15px;
    font-size: 16px;
    font-weight: 500;
    color: #323233;
    border-bottom: 1px solid #ebedf0;
  }
}

.demo-content {
  padding: 15px;
  background-color: #f7f8fa;
  font-size: 14px;
  color: #646566;
}

.custom-content {
  padding: 15px;
}

.custom-header {
  margin-bottom: 15px;
  
  .custom-title {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 5px;
  }
  
  .custom-desc {
    font-size: 12px;
    color: #969799;
  }
}

.custom-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.custom-option {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f7f8fa;
  border-radius: 6px;
  transition: all 0.3s;
  
  &--active {
    background-color: #fff2f0;
    border: 1px solid #ff6034;
  }
  
  &-image {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  &-info {
    flex: 1;
  }
  
  &-name {
    display: block;
    font-size: 14px;
    color: #323233;
    margin-bottom: 2px;
  }
  
  &-desc {
    font-size: 12px;
    color: #969799;
  }
  
  &-check {
    font-size: 16px;
    color: #ff6034;
    font-weight: bold;
  }
}

.control-buttons {
  display: flex;
  gap: 10px;
  padding: 15px;
  
  button {
    flex: 1;
  }
}

.custom-icon {
  font-size: 16px;
  color: #646566;
}
</style>