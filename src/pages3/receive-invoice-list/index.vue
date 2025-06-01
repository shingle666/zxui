<template>
  <view class="page">
    <!-- 页面标题 -->
    <zx-navbar title="收货发票列表" />
    
    <!-- 示例选项卡 -->
    <zx-tabs 
      v-model="activeTab" 
      :list="tabList" 
      @change="handleTabChange"
    />
    
    <!-- 基础用法 -->
    <view v-if="activeTab === 0" class="demo-section">
      <zx-section title="基础用法" desc="展示基本的发票列表功能">
        <zx-receive-invoice-list
          :list="basicList"
          @item-click="handleItemClick"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </zx-section>
    </view>
    
    <!-- 选择模式 -->
    <view v-if="activeTab === 1" class="demo-section">
      <zx-section title="选择模式" desc="支持单选和多选操作">
        <view class="demo-controls">
          <zx-button 
            size="small" 
            type="primary" 
            @click="selectAll"
          >
            全选
          </zx-button>
          <zx-button 
            size="small" 
            @click="clearSelection"
          >
            清空
          </zx-button>
          <text class="selected-count">已选择: {{ selectedCount }} 项</text>
        </view>
        
        <zx-receive-invoice-list
          :list="selectableList"
          :selectable="true"
          @select="handleSelect"
          @item-click="handleSelectableItemClick"
        />
      </zx-section>
    </view>
    
    <!-- 自定义显示 -->
    <view v-if="activeTab === 2" class="demo-section">
      <zx-section title="自定义显示" desc="控制字段显示和隐藏">
        <view class="demo-controls">
          <zx-checkbox-group v-model="displayOptions" @change="handleDisplayChange">
            <zx-checkbox name="taxNumber" shape="square">显示税号</zx-checkbox>
            <zx-checkbox name="address" shape="square">显示地址</zx-checkbox>
            <zx-checkbox name="phone" shape="square">显示电话</zx-checkbox>
            <zx-checkbox name="bank" shape="square">显示银行</zx-checkbox>
            <zx-checkbox name="account" shape="square">显示账号</zx-checkbox>
          </zx-checkbox-group>
        </view>
        
        <zx-receive-invoice-list
          :list="customDisplayList"
          :show-tax-number="displayOptions.includes('taxNumber')"
          :show-address="displayOptions.includes('address')"
          :show-phone="displayOptions.includes('phone')"
          :show-bank="displayOptions.includes('bank')"
          :show-account="displayOptions.includes('account')"
        />
      </zx-section>
    </view>
    
    <!-- 加载状态 -->
    <view v-if="activeTab === 3" class="demo-section">
      <zx-section title="加载状态" desc="展示加载和分页功能">
        <view class="demo-controls">
          <zx-button 
            size="small" 
            type="primary" 
            @click="toggleLoading"
          >
            {{ loading ? '停止加载' : '开始加载' }}
          </zx-button>
          <zx-button 
            size="small" 
            @click="resetLoadingList"
          >
            重置列表
          </zx-button>
          <zx-button 
            size="small" 
            @click="toggleFinished"
          >
            {{ finished ? '未完成' : '已完成' }}
          </zx-button>
        </view>
        
        <zx-receive-invoice-list
          :list="loadingList"
          :loading="loading"
          :finished="finished"
          loading-text="正在加载发票信息..."
          finished-text="已加载全部发票"
          @load-more="handleLoadMore"
        />
      </zx-section>
    </view>
    
    <!-- 自定义样式 -->
    <view v-if="activeTab === 4" class="demo-section">
      <zx-section title="自定义样式" desc="自定义颜色和样式">
        <zx-receive-invoice-list
          :list="styledList"
          title-color="#2c3e50"
          desc-color="#7f8c8d"
          tag-color="#fff"
          tag-bg-color="#e74c3c"
          default-tag-color="#fff"
          default-tag-bg-color="#f39c12"
          selected-color="#27ae60"
        />
      </zx-section>
    </view>
    
    <!-- 自定义插槽 -->
    <view v-if="activeTab === 5" class="demo-section">
      <zx-section title="自定义插槽" desc="使用插槽自定义内容">
        <zx-receive-invoice-list :list="slotList">
          <template #header>
            <view class="custom-header">
              <text class="header-title">我的发票抬头</text>
              <text class="header-subtitle">管理您的发票信息</text>
            </view>
          </template>
          
          <template #item="{ item, index }">
            <view class="custom-invoice-card" @click="handleCustomClick(item, index)">
              <view class="custom-card-header">
                <view class="custom-icon">
                  <text class="custom-icon-text">
                    {{ item.type === 'company' ? '🏢' : '👤' }}
                  </text>
                </view>
                <view class="custom-info">
                  <text class="custom-title">{{ item.title }}</text>
                  <text class="custom-type">
                    {{ item.type === 'company' ? '企业发票' : '个人发票' }}
                  </text>
                </view>
                <view v-if="item.isDefault" class="custom-default-badge">
                  <text class="custom-default-text">默认</text>
                </view>
              </view>
              <view v-if="item.taxNumber" class="custom-tax">
                <text class="custom-tax-text">税号：{{ item.taxNumber }}</text>
              </view>
            </view>
          </template>
          
          <template #footer>
            <view class="custom-footer">
              <text class="footer-text">— 发票信息仅用于开具发票 —</text>
            </view>
          </template>
        </zx-receive-invoice-list>
      </zx-section>
    </view>
    
    <!-- 空状态 -->
    <view v-if="activeTab === 6" class="demo-section">
      <zx-section title="空状态" desc="展示空状态效果">
        <zx-receive-invoice-list :list="[]">
          <template #empty>
            <view class="custom-empty">
              <text class="empty-icon">📄</text>
              <text class="empty-title">暂无发票抬头</text>
              <text class="empty-desc">请添加发票抬头信息</text>
              <zx-button 
                type="primary" 
                size="small" 
                @click="addInvoice"
              >
                添加发票抬头
              </zx-button>
            </view>
          </template>
        </zx-receive-invoice-list>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 选项卡数据
const activeTab = ref(0)
const tabList = ref([
  { title: '基础用法' },
  { title: '选择模式' },
  { title: '自定义显示' },
  { title: '加载状态' },
  { title: '自定义样式' },
  { title: '自定义插槽' },
  { title: '空状态' }
])

// 基础列表数据
const basicList = ref([
  {
    id: 1,
    title: '北京京东世纪贸易有限公司',
    type: 'company',
    taxNumber: '91110000123456789X',
    address: '北京市朝阳区北辰西路8号院',
    phone: '010-12345678',
    bank: '中国工商银行北京分行',
    account: '1234567890123456789',
    isDefault: true
  },
  {
    id: 2,
    title: '张三',
    type: 'personal',
    isDefault: false
  },
  {
    id: 3,
    title: '上海阿里巴巴网络技术有限公司',
    type: 'special',
    taxNumber: '91310000987654321Y',
    address: '上海市浦东新区世纪大道1号',
    phone: '021-87654321',
    bank: '中国建设银行上海分行',
    account: '9876543210987654321',
    isDefault: false
  }
])

// 可选择列表数据
const selectableList = ref([
  {
    id: 1,
    title: '腾讯科技（深圳）有限公司',
    type: 'company',
    taxNumber: '91440300123456789Z',
    selected: false
  },
  {
    id: 2,
    title: '李四',
    type: 'personal',
    selected: true
  },
  {
    id: 3,
    title: '百度在线网络技术（北京）有限公司',
    type: 'company',
    taxNumber: '91110000456789123A',
    selected: false
  }
])

// 自定义显示选项
const displayOptions = ref(['taxNumber', 'address', 'phone'])
const customDisplayList = ref([
  {
    id: 1,
    title: '华为技术有限公司',
    type: 'company',
    taxNumber: '91440300567890123B',
    address: '广东省深圳市龙岗区坂田华为基地',
    phone: '0755-12345678',
    bank: '中国银行深圳分行',
    account: '1357924680135792468'
  }
])

// 加载状态数据
const loadingList = ref([
  {
    id: 1,
    title: '小米科技有限责任公司',
    type: 'company',
    taxNumber: '91110000678901234C'
  }
])
const loading = ref(false)
const finished = ref(false)

// 自定义样式数据
const styledList = ref([
  {
    id: 1,
    title: '字节跳动有限公司',
    type: 'company',
    taxNumber: '91110000789012345D',
    isDefault: true
  },
  {
    id: 2,
    title: '王五',
    type: 'personal'
  }
])

// 自定义插槽数据
const slotList = ref([
  {
    id: 1,
    title: '美团网络科技有限公司',
    type: 'company',
    taxNumber: '91110000890123456E',
    isDefault: true
  },
  {
    id: 2,
    title: '赵六',
    type: 'personal'
  }
])

// 计算选中数量
const selectedCount = computed(() => {
  return selectableList.value.filter(item => item.selected).length
})

// 事件处理
const handleTabChange = (index) => {
  activeTab.value = index
}

const handleItemClick = ({ item, index }) => {
  uni.showToast({
    title: `点击了: ${item.title}`,
    icon: 'none'
  })
}

const handleEdit = ({ item, index }) => {
  uni.showModal({
    title: '编辑发票',
    content: `编辑发票: ${item.title}`,
    showCancel: false
  })
}

const handleDelete = ({ item, index }) => {
  uni.showModal({
    title: '删除确认',
    content: `确定要删除发票 "${item.title}" 吗？`,
    success: (res) => {
      if (res.confirm) {
        basicList.value.splice(index, 1)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

const handleSelect = ({ item, index }) => {
  item.selected = !item.selected
  uni.showToast({
    title: item.selected ? '已选择' : '已取消',
    icon: 'none'
  })
}

const handleSelectableItemClick = ({ item, index }) => {
  uni.showToast({
    title: `点击了: ${item.title}`,
    icon: 'none'
  })
}

const selectAll = () => {
  selectableList.value.forEach(item => {
    item.selected = true
  })
  uni.showToast({
    title: '已全选',
    icon: 'success'
  })
}

const clearSelection = () => {
  selectableList.value.forEach(item => {
    item.selected = false
  })
  uni.showToast({
    title: '已清空选择',
    icon: 'success'
  })
}

const handleDisplayChange = (values) => {
  displayOptions.value = values
}

const toggleLoading = () => {
  loading.value = !loading.value
}

const resetLoadingList = () => {
  loadingList.value = [
    {
      id: 1,
      title: '小米科技有限责任公司',
      type: 'company',
      taxNumber: '91110000678901234C'
    }
  ]
  finished.value = false
}

const toggleFinished = () => {
  finished.value = !finished.value
}

const handleLoadMore = () => {
  if (loading.value || finished.value) return
  
  loading.value = true
  
  // 模拟加载
  setTimeout(() => {
    const newItems = [
      {
        id: loadingList.value.length + 1,
        title: `新发票 ${loadingList.value.length + 1}`,
        type: 'company',
        taxNumber: `9111000${loadingList.value.length}${Math.random().toString().slice(2, 11)}`
      }
    ]
    
    loadingList.value.push(...newItems)
    loading.value = false
    
    if (loadingList.value.length >= 5) {
      finished.value = true
    }
  }, 1000)
}

const handleCustomClick = (item, index) => {
  uni.showToast({
    title: `自定义点击: ${item.title}`,
    icon: 'none'
  })
}

const addInvoice = () => {
  uni.showModal({
    title: '添加发票',
    content: '这里可以跳转到发票添加页面',
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
.page {
  background: #f8f9fa;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 32rpx;
}

.demo-controls {
  padding: 24rpx 32rpx;
  background: #fff;
  margin-bottom: 16rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex-wrap: wrap;
  
  .selected-count {
    font-size: 24rpx;
    color: #666;
    margin-left: auto;
  }
}

// 自定义头部样式
.custom-header {
  padding: 40rpx 32rpx;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  .header-title {
    display: block;
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
  }
  
  .header-subtitle {
    font-size: 24rpx;
    opacity: 0.8;
  }
}

// 自定义发票卡片样式
.custom-invoice-card {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  border-radius: 20rpx;
  padding: 32rpx;
  margin: 0 32rpx 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(255, 154, 158, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
  
  .custom-card-header {
    display: flex;
    align-items: center;
    gap: 24rpx;
    margin-bottom: 16rpx;
  }
  
  .custom-icon {
    width: 80rpx;
    height: 80rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &-text {
      font-size: 32rpx;
    }
  }
  
  .custom-info {
    flex: 1;
    
    .custom-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 4rpx;
    }
    
    .custom-type {
      font-size: 24rpx;
      color: #666;
    }
  }
  
  .custom-default-badge {
    background: rgba(255, 255, 255, 0.9);
    padding: 8rpx 16rpx;
    border-radius: 20rpx;
    
    .custom-default-text {
      font-size: 20rpx;
      color: #ff4757;
      font-weight: bold;
    }
  }
  
  .custom-tax {
    padding-top: 16rpx;
    border-top: 1rpx solid rgba(255, 255, 255, 0.3);
    
    &-text {
      font-size: 24rpx;
      color: #666;
    }
  }
}

// 自定义底部样式
.custom-footer {
  padding: 40rpx;
  text-align: center;
  
  .footer-text {
    font-size: 24rpx;
    color: #999;
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

// 自定义空状态样式
.custom-empty {
  padding: 120rpx 0;
  text-align: center;
  
  .empty-icon {
    display: block;
    font-size: 80rpx;
    margin-bottom: 16rpx;
    opacity: 0.3;
  }
  
  .empty-title {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
    color: #333;
  }
  
  .empty-desc {
    display: block;
    font-size: 24rpx;
    color: #666;
    margin-bottom: 32rpx;
  }
}
</style>