<template>
  <view class="demo-container">
    <view class="demo-title">zx-radio 单选框组件演示</view>
    
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="demo-group">
        <zx-radio-group v-model="basicValue" @change="onBasicChange">
          <zx-radio value="1">选项1</zx-radio>
          <zx-radio value="2">选项2</zx-radio>
          <zx-radio value="3">选项3</zx-radio>
        </zx-radio-group>
        <view class="result">当前选中: {{ basicValue }}</view>
      </view>
    </view>
    
    <!-- 水平布局 -->
    <view class="demo-section">
      <view class="section-title">水平布局</view>
      <view class="demo-group">
        <zx-radio-group v-model="horizontalValue" placement="row">
          <zx-radio value="male">男</zx-radio>
          <zx-radio value="female">女</zx-radio>
        </zx-radio-group>
        <view class="result">选中性别: {{ horizontalValue }}</view>
      </view>
    </view>
    
    <!-- 禁用状态 -->
    <view class="demo-section">
      <view class="section-title">禁用状态</view>
      <view class="demo-group">
        <zx-radio-group v-model="disabledValue">
          <zx-radio value="1">正常选项</zx-radio>
          <zx-radio value="2" :disabled="true">禁用选项</zx-radio>
          <zx-radio value="3">另一个选项</zx-radio>
        </zx-radio-group>
      </view>
    </view>
    
    <!-- 自定义颜色 -->
    <view class="demo-section">
      <view class="section-title">自定义颜色</view>
      <view class="demo-group">
        <zx-radio-group v-model="colorValue">
          <zx-radio 
            value="red" 
            color="#ff4757"
            active-background-color="#ff4757"
            active-border-color="#ff4757"
          >
            红色主题
          </zx-radio>
          <zx-radio 
            value="green"
            color="#2ed573"
            active-background-color="#2ed573"
            active-border-color="#2ed573"
          >
            绿色主题
          </zx-radio>
          <zx-radio 
            value="purple"
            color="#a55eea"
            active-background-color="#a55eea"
            active-border-color="#a55eea"
          >
            紫色主题
          </zx-radio>
        </zx-radio-group>
      </view>
    </view>
    
    <!-- 自定义大小 -->
    <view class="demo-section">
      <view class="section-title">自定义大小</view>
      <view class="demo-group">
        <zx-radio-group v-model="sizeValue" placement="row">
          <zx-radio value="small" :size="16">小号 16px</zx-radio>
          <zx-radio value="medium" :size="20">中号 20px</zx-radio>
          <zx-radio value="large" :size="24">大号 24px</zx-radio>
        </zx-radio-group>
      </view>
    </view>
    
    <!-- 单独使用 -->
    <view class="demo-section">
      <view class="section-title">单独使用</view>
      <view class="demo-group">
        <zx-radio 
          v-model:checked="singleChecked1" 
          value="agree"
          @change="onSingleChange"
        >
          我已阅读并同意协议
        </zx-radio>
        <zx-radio 
          v-model:checked="singleChecked2" 
          value="subscribe"
          color="#ff6b35"
        >
          订阅邮件通知
        </zx-radio>
        <view class="result">
          协议状态: {{ singleChecked1 ? '已同意' : '未同意' }}<br>
          订阅状态: {{ singleChecked2 ? '已订阅' : '未订阅' }}
        </view>
      </view>
    </view>
    
    <!-- 自定义样式 -->
    <view class="demo-section">
      <view class="section-title">自定义样式</view>
      <view class="demo-group">
        <zx-radio-group v-model="customValue">
          <zx-radio 
            value="1"
            background-color="#f8f9fa"
            border-color="#6c757d"
            active-background-color="#007bff"
            active-border-color="#007bff"
            icon-color="#ffffff"
            :size="22"
          >
            Bootstrap 风格
          </zx-radio>
          <zx-radio 
            value="2"
            background-color="#ffeaa7"
            border-color="#fdcb6e"
            active-background-color="#e84393"
            active-border-color="#e84393"
            icon-color="#ffffff"
            :size="22"
          >
            渐变风格
          </zx-radio>
        </zx-radio-group>
      </view>
    </view>
    
    <!-- 表单示例 -->
    <view class="demo-section">
      <view class="section-title">表单示例</view>
      <view class="demo-group">
        <view class="form-item">
          <text class="label">选择支付方式:</text>
          <zx-radio-group v-model="paymentMethod" name="payment">
            <zx-radio value="alipay">支付宝</zx-radio>
            <zx-radio value="wechat">微信支付</zx-radio>
            <zx-radio value="bank">银行卡</zx-radio>
          </zx-radio-group>
        </view>
        
        <view class="form-item">
          <text class="label">配送方式:</text>
          <zx-radio-group v-model="deliveryMethod" name="delivery" placement="row">
            <zx-radio value="standard">标准配送</zx-radio>
            <zx-radio value="express">快速配送</zx-radio>
          </zx-radio-group>
        </view>
        
        <view class="form-summary">
          <text>支付方式: {{ getPaymentText(paymentMethod) }}</text><br>
          <text>配送方式: {{ getDeliveryText(deliveryMethod) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 基础用法
const basicValue = ref('1')
const onBasicChange = (e) => {
  console.log('基础选择变化:', e.value)
}

// 水平布局
const horizontalValue = ref('male')

// 禁用状态
const disabledValue = ref('1')

// 自定义颜色
const colorValue = ref('red')

// 自定义大小
const sizeValue = ref('medium')

// 单独使用
const singleChecked1 = ref(false)
const singleChecked2 = ref(false)
const onSingleChange = (e) => {
  console.log('单选变化:', e)
}

// 自定义样式
const customValue = ref('1')

// 表单示例
const paymentMethod = ref('alipay')
const deliveryMethod = ref('standard')

const getPaymentText = (value) => {
  const map = {
    'alipay': '支付宝',
    'wechat': '微信支付',
    'bank': '银行卡'
  }
  return map[value] || '未选择'
}

const getDeliveryText = (value) => {
  const map = {
    'standard': '标准配送',
    'express': '快速配送'
  }
  return map[value] || '未选择'
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.demo-section {
  margin-bottom: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #007AFF;
  padding-bottom: 5px;
}

.demo-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
  color: #666;
  font-size: 14px;
}

.form-item {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-summary {
  margin-top: 20px;
  padding: 15px;
  background-color: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.form-summary text {
  color: #1976d2;
  font-size: 14px;
  line-height: 1.6;
}
</style> 