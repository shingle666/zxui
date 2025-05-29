<template>
  <view class="page">
    <view class="page-title">统计数值组件</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="row">
        <view class="col">
          <zx-statistic title="日活跃用户" :value="268500" />
        </view>
        <view class="col">
          <zx-statistic :value="138">
            <template #title>
              <view style="display: inline-flex; align-items: center">
                男女比例
              </view>
            </template>
            <template #suffix>/100</template>
          </zx-statistic>
        </view>
        <view class="col">
          <zx-statistic title="今日交易总额" :value="outputValue" />
        </view>
        <view class="col">
          <zx-statistic title="反馈数量" :value="562">
            <template #suffix>
              <zx-icon name="chat" size="28rpx" color="#909399"></zx-icon>
            </template>
          </zx-statistic>
        </view>
      </view>
    </view>
    
    <!-- 倒计时 -->
    <view class="section">
      <view class="section-title">倒计时</view>
      <view class="row">
        <view class="col">
          <zx-statistic title="开始抢购" :value="value" is-countdown />
        </view>
        <view class="col">
          <zx-statistic
            title="剩余VIP时间"
            format="HH:mm:ss"
            :value="value1"
            is-countdown
          />
          <button class="btn" type="primary" size="mini" @click="reset">重置</button>
        </view>
        <view class="col">
          <zx-statistic format="DD [days] HH:mm:ss" :value="value2" is-countdown>
            <template #title>
              <view style="display: inline-flex; align-items: center">
                <zx-icon name="calendar" size="28rpx" color="#909399" style="margin-right: 4rpx;"></zx-icon>
                距离下个月还有
              </view>
            </template>
          </zx-statistic>
          <view class="countdown-footer">{{ formatDate(value2) }}</view>
        </view>
      </view>
    </view>
    
    <!-- 统计卡片 -->
    <view class="section">
      <view class="section-title">统计卡片</view>
      <view class="row">
        <view class="col">
          <view class="statistic-card">
            <zx-statistic :value="98500">
              <template #title>
                <view style="display: inline-flex; align-items: center">
                  日活跃用户
                  <zx-icon name="warning" size="24rpx" color="#909399" style="margin-left: 4rpx;"></zx-icon>
                </view>
              </template>
            </zx-statistic>
            <view class="statistic-footer">
              <view class="footer-item">
                <text>较昨日</text>
                <text class="green">
                  24% <zx-icon name="top" size="24rpx" color="#67C23A"></zx-icon>
                </text>
              </view>
            </view>
          </view>
        </view>
        <view class="col">
          <view class="statistic-card">
            <zx-statistic :value="693700">
              <template #title>
                <view style="display: inline-flex; align-items: center">
                  月活跃用户
                  <zx-icon name="warning" size="24rpx" color="#909399" style="margin-left: 4rpx;"></zx-icon>
                </view>
              </template>
            </zx-statistic>
            <view class="statistic-footer">
              <view class="footer-item">
                <text>同比上月</text>
                <text class="red">
                  12% <zx-icon name="bottom" size="24rpx" color="#F56C6C"></zx-icon>
                </text>
              </view>
            </view>
          </view>
        </view>
        <view class="col">
          <view class="statistic-card">
            <zx-statistic :value="72000" title="今日新增交易" />
            <view class="statistic-footer">
              <view class="footer-item">
                <text>较昨日</text>
                <text class="green">
                  16% <zx-icon name="top" size="24rpx" color="#67C23A"></zx-icon>
                </text>
              </view>
              <view class="footer-item">
                <zx-icon name="arrow-right" size="24rpx" color="#909399"></zx-icon>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 自动递增数值效果
const source = ref(0);
const outputValue = ref(0);
let timer = null;

// 目标时间（当前时间加上7小时）
const value = ref(Date.now() + 1000 * 60 * 60 * 7);
// 目标时间（当前时间加上2天）
const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2);
// 目标时间（下个月的第一天）
const value2 = ref(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime());

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 重置倒计时
const reset = () => {
  value1.value = Date.now() + 1000 * 60 * 60 * 24 * 2;
};

// 数值动画效果
const animate = () => {
  const targetValue = 172000;
  const duration = 1500; // 1.5秒
  const step = Math.ceil(targetValue / (duration / 16)); // 假设每16ms更新一次
  
  clearInterval(timer);
  
  timer = setInterval(() => {
    if (outputValue.value >= targetValue) {
      outputValue.value = targetValue;
      clearInterval(timer);
    } else {
      outputValue.value += step;
      if (outputValue.value > targetValue) {
        outputValue.value = targetValue;
      }
    }
  }, 16);
};

onMounted(() => {
  animate();
});
</script>

<style>
.page {
  padding: 30rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  color: #303133;
}

.section {
  margin-bottom: 40rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 30rpx;
  color: #303133;
  margin-bottom: 30rpx;
  font-weight: bold;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20rpx;
}

.col {
  width: calc(50% - 40rpx);
  margin: 0 20rpx 40rpx;
  text-align: center;
}

.btn {
  margin-top: 16rpx;
  font-size: 24rpx;
}

.countdown-footer {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #909399;
}

.statistic-card {
  height: 100%;
  padding: 20rpx;
  border-radius: 8rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 24rpx;
  color: #606266;
  margin-top: 30rpx;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green {
  color: #67C23A;
}

.red {
  color: #F56C6C;
}
</style> 