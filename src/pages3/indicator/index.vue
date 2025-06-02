<template>
  <view class="container">
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">显示一个任务或流程的进度，常用于开通流程。</view>
          <view class="demo-block">
            <view class="demo-item">
              <view class="demo-label">步骤 1/5</view>
              <zx-indicator :size="5" :current="1" />
            </view>
            <view class="demo-item">
              <view class="demo-label">步骤 3/5</view>
              <zx-indicator :size="5" :current="3" />
            </view>
            <view class="demo-item">
              <view class="demo-label">步骤 5/5</view>
              <zx-indicator :size="5" :current="5" />
            </view>
          </view>
        </view>

        <!-- 块级布局 -->
        <view class="demo-section">
          <view class="demo-title">块级布局</view>
          <view class="demo-desc">通过 block 属性启用块级布局，并可通过 align 属性设置对齐方式。</view>
          <view class="demo-block">
            <view class="demo-item">
              <view class="demo-label">左对齐</view>
              <zx-indicator block align="left" :size="6" :current="5" />
            </view>
            <view class="demo-item">
              <view class="demo-label">居中对齐</view>
              <zx-indicator block align="center" :size="6" :current="5" />
            </view>
            <view class="demo-item">
              <view class="demo-label">右对齐</view>
              <zx-indicator block align="right" :size="6" :current="5" />
            </view>
          </view>
        </view>

        <!-- 不补零 -->
        <view class="demo-section">
          <view class="demo-title">不补零</view>
          <view class="demo-desc">通过 fill-zero 属性控制单数前面是否补 0。</view>
          <view class="demo-block">
            <view class="demo-item">
              <view class="demo-label">补零（默认）</view>
              <zx-indicator :size="6" :current="5" />
            </view>
            <view class="demo-item">
              <view class="demo-label">不补零</view>
              <zx-indicator :fill-zero="false" :size="6" :current="5" />
            </view>
          </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="demo-section">
          <view class="demo-title">自定义颜色</view>
          <view class="demo-desc">通过 bg-color、dot-color、text-color 属性自定义颜色。</view>
          <view class="demo-block">
            <view class="demo-item">
              <view class="demo-label">红色主题</view>
              <zx-indicator 
                :size="5" 
                :current="3" 
                bg-color="#ff6b6b"
                dot-color="#ffd93d"
                text-color="#ffffff"
              />
            </view>
            <view class="demo-item">
              <view class="demo-label">绿色主题</view>
              <zx-indicator 
                :size="5" 
                :current="3" 
                bg-color="#51cf66"
                dot-color="#ced4da"
                text-color="#ffffff"
              />
            </view>
            <view class="demo-item">
              <view class="demo-label">紫色主题</view>
              <zx-indicator 
                :size="5" 
                :current="3" 
                bg-color="#9775fa"
                dot-color="#e9ecef"
                text-color="#ffffff"
              />
            </view>
          </view>
        </view>

        <!-- 自定义大小 -->
        <view class="demo-section">
          <view class="demo-title">自定义大小</view>
          <view class="demo-desc">通过 indicator-size 属性自定义指示器大小。</view>
          <view class="demo-block">
            <view class="demo-item">
              <view class="demo-label">小尺寸（14px）</view>
              <zx-indicator :size="5" :current="3" indicator-size="14" />
            </view>
            <view class="demo-item">
              <view class="demo-label">默认尺寸（18px）</view>
              <zx-indicator :size="5" :current="3" />
            </view>
            <view class="demo-item">
              <view class="demo-label">大尺寸（24px）</view>
              <zx-indicator :size="5" :current="3" indicator-size="24" />
            </view>
            <view class="demo-item">
              <view class="demo-label">超大尺寸（32px）</view>
              <zx-indicator :size="5" :current="3" indicator-size="32" />
            </view>
          </view>
        </view>

        <!-- 动态演示 -->
        <view class="demo-section">
          <view class="demo-title">动态演示</view>
          <view class="demo-desc">通过按钮控制当前步骤的变化。</view>
          <view class="demo-block">
            <view class="demo-item">
              <view class="demo-label">当前步骤：{{ dynamicCurrent }}/{{ dynamicSize }}</view>
              <zx-indicator :size="dynamicSize" :current="dynamicCurrent" />
            </view>
            <view class="demo-actions">
              <zx-button 
                @click="prevStep" 
                :disabled="dynamicCurrent <= 1"
                type="primary" 
                size="mini"
              >
                上一步
              </zx-button>
              <zx-button 
                @click="nextStep" 
                :disabled="dynamicCurrent >= dynamicSize"
                type="primary" 
                size="mini"
              >
                下一步
              </zx-button>
              <zx-button 
                @click="resetStep" 
                type="default" 
                size="mini"
              >
                重置
              </zx-button>
            </view>
          </view>
        </view>

        <!-- 实际应用场景 -->
        <view class="demo-section">
          <view class="demo-title">实际应用场景</view>
          <view class="demo-desc">模拟实际的流程步骤场景。</view>
          <view class="demo-block">
            <view class="demo-item">
              <view class="demo-label">注册流程</view>
              <view class="step-info">
                <text class="step-text">{{ getStepText(registerStep) }}</text>
              </view>
              <zx-indicator 
                block 
                align="center" 
                :size="4" 
                :current="registerStep" 
                bg-color="#52c41a"
              />
              <view class="demo-actions">
                <zx-button 
                  @click="simulateRegister" 
                  :disabled="registerStep >= 4"
                  type="success" 
                  size="mini"
                >
                  {{ registerStep >= 4 ? '注册完成' : '下一步' }}
                </zx-button>
                <zx-button 
                  @click="resetRegister" 
                  type="default" 
                  size="mini"
                >
                  重新开始
                </zx-button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 动态演示数据
const dynamicCurrent = ref(1)
const dynamicSize = ref(6)

// 注册流程数据
const registerStep = ref(1)

// 动态演示方法
const prevStep = () => {
  if (dynamicCurrent.value > 1) {
    dynamicCurrent.value--
  }
}

const nextStep = () => {
  if (dynamicCurrent.value < dynamicSize.value) {
    dynamicCurrent.value++
  }
}

const resetStep = () => {
  dynamicCurrent.value = 1
}

// 注册流程方法
const simulateRegister = () => {
  if (registerStep.value < 4) {
    registerStep.value++
  }
}

const resetRegister = () => {
  registerStep.value = 1
}

// 获取步骤文本
const getStepText = (step) => {
  const texts = {
    1: '填写基本信息',
    2: '验证手机号码',
    3: '设置登录密码',
    4: '注册成功'
  }
  return texts[step] || ''
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

.demo-title {
  padding: 15px 20px 10px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  border-bottom: 1px solid #f0f0f0;
}

.demo-desc {
  padding: 10px 20px 15px;
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
}

.demo-block {
  padding: 20px;
}

.demo-item {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  margin-bottom: 10px;
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.demo-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.step-info {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: center;
}

.step-text {
  font-size: 14px;
  color: #495057;
  font-weight: 500;
}
</style>