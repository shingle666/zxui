<template>
  <view class="ecard-demo">
    <!-- 页面标题 -->
    <zx-navbar title="电子卡券组件" back-icon="arrow-left" />
    
    <!-- 基础用法 -->
    <zx-section title="基础用法" sub-title="不同类型的电子卡券">
      <view class="demo-section">
        <!-- 优惠券 -->
        <zx-ecard
          type="coupon"
          title="满减优惠券"
          description="全场通用，满100元可用"
          :value="20"
          condition="满100元可用"
          valid-to="2024-12-31"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
        
        <!-- 代金券 -->
        <zx-ecard
          type="voucher"
          title="代金券"
          description="指定商品可用"
          :value="50"
          condition="仅限指定商品使用"
          valid-to="2024-11-30"
          tag="限时"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
        
        <!-- 折扣券 -->
        <zx-ecard
          type="discount"
          title="折扣券"
          description="全场8折优惠"
          value="8"
          value-symbol=""
          value-unit="折"
          condition="全场商品可用"
          valid-to="2024-10-31"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
        
        <!-- 礼品券 -->
        <zx-ecard
          type="gift"
          title="生日礼品券"
          description="生日专享礼品"
          :value="100"
          condition="生日当月可用"
          valid-to="2024-09-30"
          tag="专享"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
      </view>
    </zx-section>
    
    <!-- 不同状态 -->
    <zx-section title="不同状态" sub-title="可用、已使用、已过期">
      <view class="demo-section">
        <!-- 可用状态 -->
        <zx-ecard
          title="可用优惠券"
          description="正常可用状态"
          :value="15"
          status="available"
          condition="满50元可用"
          valid-to="2024-12-31"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
        
        <!-- 已使用状态 -->
        <zx-ecard
          title="已使用优惠券"
          description="此券已被使用"
          :value="15"
          status="used"
          condition="满50元可用"
          valid-to="2024-12-31"
          button-text="已使用"
          @click="handleCardClick"
        />
        
        <!-- 已过期状态 -->
        <zx-ecard
          title="已过期优惠券"
          description="此券已过期"
          :value="15"
          status="expired"
          condition="满50元可用"
          valid-to="2024-08-31"
          button-text="已过期"
          @click="handleCardClick"
        />
      </view>
    </zx-section>
    
    <!-- 自定义样式 -->
    <zx-section title="自定义样式" sub-title="自定义颜色和尺寸">
      <view class="demo-section">
        <!-- 自定义颜色 -->
        <zx-ecard
          title="自定义样式券"
          description="自定义颜色和字体大小"
          :value="88"
          condition="全场可用"
          valid-to="2024-12-31"
          title-color="#2979ff"
          :title-size="36"
          value-color="#ff6b35"
          :value-size="52"
          button-color="#2979ff"
          tag="特惠"
          tag-color="#ff6b35"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
        
        <!-- 不同按钮类型 -->
        <zx-ecard
          title="次要按钮样式"
          description="使用次要按钮样式"
          :value="25"
          condition="满200元可用"
          valid-to="2024-12-31"
          button-type="secondary"
          button-text="立即领取"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
        
        <!-- 轮廓按钮 -->
        <zx-ecard
          title="轮廓按钮样式"
          description="使用轮廓按钮样式"
          :value="30"
          condition="满150元可用"
          valid-to="2024-12-31"
          button-type="outline"
          button-text="去使用"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
      </view>
    </zx-section>
    
    <!-- 显示底部信息 -->
    <zx-section title="完整信息" sub-title="显示商家和卡券编号">
      <view class="demo-section">
        <zx-ecard
          title="商家优惠券"
          description="指定商家专用优惠券"
          :value="35"
          condition="满300元可用"
          valid-from="2024-01-01"
          valid-to="2024-12-31"
          merchant-name="ZXUI官方旗舰店"
          card-no="ZX202410001"
          :show-footer="true"
          tag="官方"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
      </view>
    </zx-section>
    
    <!-- 禁用和选中状态 -->
    <zx-section title="特殊状态" sub-title="禁用和选中状态">
      <view class="demo-section">
        <!-- 禁用状态 -->
        <zx-ecard
          title="禁用状态券"
          description="此券暂时不可用"
          :value="40"
          condition="满500元可用"
          valid-to="2024-12-31"
          :disabled="true"
          @click="handleCardClick"
        />
        
        <!-- 选中状态 -->
        <zx-ecard
          title="选中状态券"
          description="当前选中的优惠券"
          :value="20"
          condition="满100元可用"
          valid-to="2024-12-31"
          :selected="true"
          button-text="已选择"
          @click="handleCardClick"
          @button-click="handleButtonClick"
        />
      </view>
    </zx-section>
    
    <!-- 隐藏按钮 -->
    <zx-section title="隐藏按钮" sub-title="不显示操作按钮">
      <view class="demo-section">
        <zx-ecard
          title="纯展示券"
          description="仅用于展示，无操作按钮"
          :value="60"
          condition="满800元可用"
          valid-to="2024-12-31"
          :show-button="false"
          :show-status-icon="false"
          @click="handleCardClick"
        />
      </view>
    </zx-section>
    
    <!-- 操作结果提示 -->
    <zx-toast ref="toast" />
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 引用组件
const toast = ref(null)

// 处理卡券点击
const handleCardClick = (cardInfo) => {
  console.log('卡券点击:', cardInfo)
  
  if (cardInfo.status === 'used') {
    showToast('此券已使用', 'warning')
  } else if (cardInfo.status === 'expired') {
    showToast('此券已过期', 'error')
  } else {
    showToast(`点击了${cardInfo.type}类型卡券`, 'success')
  }
}

// 处理按钮点击
const handleButtonClick = (cardInfo) => {
  console.log('按钮点击:', cardInfo)
  
  if (cardInfo.status === 'available') {
    showToast(`使用${cardInfo.value}元优惠券`, 'success')
  } else {
    showToast('卡券不可用', 'warning')
  }
}

// 显示提示
const showToast = (message, type = 'success') => {
  // 使用 uni.showToast 作为备选方案
  uni.showToast({
    title: message,
    icon: type === 'success' ? 'success' : 'none',
    duration: 2000
  })
}
</script>

<style lang="scss">
.ecard-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
  
  .demo-section {
    padding: 0 32rpx;
  }
}
</style>